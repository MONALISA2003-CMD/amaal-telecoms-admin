-- Additive serialized inventory migration.
-- Safe to run repeatedly. It never clears, replaces, or resets existing business data.
CREATE TABLE IF NOT EXISTS inventory_batches(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 batch_number text UNIQUE NOT NULL,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 supplier_name text NOT NULL DEFAULT '',
 supplier_reference text NOT NULL DEFAULT '',
 quantity_received numeric(18,3) NOT NULL DEFAULT 0 CHECK(quantity_received>=0),
 received_at timestamptz NOT NULL DEFAULT now(),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Active';
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS cancelled_at timestamptz;
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS cancelled_by uuid REFERENCES users(id) ON DELETE SET NULL;
DO $$ BEGIN ALTER TABLE inventory_batches DROP CONSTRAINT IF EXISTS inventory_batches_status_check; ALTER TABLE inventory_batches ADD CONSTRAINT inventory_batches_status_check CHECK(status IN ('Active','Cancelled')); END $$;
CREATE INDEX IF NOT EXISTS idx_inventory_batches_variant ON inventory_batches(variant_id,received_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_batches_location ON inventory_batches(location_id,received_at DESC);
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS quantity_rejected numeric(18,3) NOT NULL DEFAULT 0 CHECK(quantity_rejected>=0);
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE SET NULL;
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS purchase_order_line_id uuid REFERENCES purchase_order_lines(id) ON DELETE SET NULL;
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS goods_receipt_id uuid REFERENCES goods_receipts(id) ON DELETE SET NULL;
ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_inventory_batches_po ON inventory_batches(purchase_order_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_batches_grn ON inventory_batches(goods_receipt_id,created_at DESC);

CREATE TABLE IF NOT EXISTS serialized_units(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 location_id uuid REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 serial_number text UNIQUE,
 imei1 text UNIQUE,
 imei2 text UNIQUE,
 status text NOT NULL DEFAULT 'In Stock' CHECK(status IN ('In Stock','Reserved','Sold','Transferred','Damaged','Lost','Returned','Service')),
 unit_cost numeric(18,2) CHECK(unit_cost IS NULL OR unit_cost>=0),
 received_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now(),
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(serial_number IS NOT NULL OR imei1 IS NOT NULL OR imei2 IS NOT NULL)
);
DO $$ BEGIN ALTER TABLE serialized_units DROP CONSTRAINT IF EXISTS serialized_units_status_check; ALTER TABLE serialized_units ADD CONSTRAINT serialized_units_status_check CHECK(status IN ('In Stock','Reserved','Sold','Transferred','Damaged','Lost','Returned','Service','Voided')); END $$;
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS batch_id uuid REFERENCES inventory_batches(id) ON DELETE RESTRICT;
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS barcode text;
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS qr_code text;
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS supplier_name text NOT NULL DEFAULT '';
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS supplier_reference text NOT NULL DEFAULT '';
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS notes text NOT NULL DEFAULT '';
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS received_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS sold_at timestamptz;
CREATE UNIQUE INDEX IF NOT EXISTS uq_serialized_units_barcode ON serialized_units(barcode) WHERE barcode IS NOT NULL AND trim(barcode)<>'';
CREATE UNIQUE INDEX IF NOT EXISTS uq_serialized_units_qr_code ON serialized_units(qr_code) WHERE qr_code IS NOT NULL AND trim(qr_code)<>'';
CREATE INDEX IF NOT EXISTS idx_serialized_units_variant_location ON serialized_units(variant_id,location_id);
CREATE INDEX IF NOT EXISTS idx_serialized_units_status ON serialized_units(status);
CREATE INDEX IF NOT EXISTS idx_serialized_units_batch ON serialized_units(batch_id);
CREATE INDEX IF NOT EXISTS idx_serialized_units_search_serial ON serialized_units(serial_number);
CREATE INDEX IF NOT EXISTS idx_serialized_units_search_imei1 ON serialized_units(imei1);
CREATE INDEX IF NOT EXISTS idx_serialized_units_search_imei2 ON serialized_units(imei2);

ALTER TABLE stock_receipt_lines ADD COLUMN IF NOT EXISTS batch_id uuid REFERENCES inventory_batches(id) ON DELETE RESTRICT;
CREATE INDEX IF NOT EXISTS idx_receipt_lines_batch ON stock_receipt_lines(batch_id);

-- Phase 25 serialized physical-unit lifecycle/history engine.
-- Additive and repeat-safe: preserves all existing serialized units and history.
CREATE TABLE IF NOT EXISTS serialized_unit_status_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 serialized_unit_id uuid NOT NULL REFERENCES serialized_units(id) ON DELETE RESTRICT,
 from_status text,
 to_status text NOT NULL,
 from_location_id uuid REFERENCES inventory_locations(id) ON DELETE SET NULL,
 to_location_id uuid REFERENCES inventory_locations(id) ON DELETE SET NULL,
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 reason text NOT NULL DEFAULT '',
 source_type text NOT NULL DEFAULT '',
 source_id uuid,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_serialized_unit_history_unit_created ON serialized_unit_status_history(serialized_unit_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_serialized_unit_history_status_created ON serialized_unit_status_history(to_status,created_at DESC);

CREATE OR REPLACE FUNCTION record_serialized_unit_lifecycle()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE actor uuid;
BEGIN
  IF TG_OP='INSERT' THEN
    BEGIN actor := NULLIF(current_setting('app.actor_id', true),'')::uuid; EXCEPTION WHEN OTHERS THEN actor := NULL; END;
    INSERT INTO serialized_unit_status_history(serialized_unit_id,from_status,to_status,from_location_id,to_location_id,actor_id,reason,source_type,source_id)
    VALUES(NEW.id,NULL,NEW.status,NULL,NEW.location_id,actor,'Unit created','InventoryReceipt',NEW.batch_id);
    RETURN NEW;
  END IF;
  IF TG_OP='UPDATE' AND (OLD.status IS DISTINCT FROM NEW.status OR OLD.location_id IS DISTINCT FROM NEW.location_id) THEN
    BEGIN actor := NULLIF(current_setting('app.actor_id', true),'')::uuid; EXCEPTION WHEN OTHERS THEN actor := NULL; END;
    INSERT INTO serialized_unit_status_history(serialized_unit_id,from_status,to_status,from_location_id,to_location_id,actor_id,reason,source_type,source_id)
    VALUES(NEW.id,OLD.status,NEW.status,OLD.location_id,NEW.location_id,actor,'Physical-unit lifecycle change', 'SerializedUnit', NEW.id);
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_serialized_unit_lifecycle ON serialized_units;
CREATE TRIGGER trg_serialized_unit_lifecycle
AFTER INSERT OR UPDATE OF status,location_id ON serialized_units
FOR EACH ROW EXECUTE FUNCTION record_serialized_unit_lifecycle();

CREATE OR REPLACE FUNCTION enforce_serialized_unit_transition()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status IS NOT DISTINCT FROM OLD.status THEN RETURN NEW; END IF;
  IF OLD.status='Voided' THEN RAISE EXCEPTION 'Voided physical units cannot change status'; END IF;
  IF NOT (
    (OLD.status='In Stock' AND NEW.status IN ('Reserved','Sold','Transferred','Damaged','Lost','Returned','Service','Voided')) OR
    (OLD.status='Reserved' AND NEW.status IN ('In Stock','Sold','Returned','Service','Damaged','Lost')) OR
    (OLD.status='Sold' AND NEW.status IN ('In Stock','Returned','Service')) OR
    (OLD.status='Transferred' AND NEW.status IN ('In Stock','Lost')) OR
    (OLD.status='Returned' AND NEW.status IN ('In Stock','Sold','Service','Damaged','Lost')) OR
    (OLD.status='Service' AND NEW.status IN ('In Stock','Sold','Returned','Damaged','Lost')) OR
    (OLD.status='Damaged' AND NEW.status IN ('Service','In Stock','Lost')) OR
    (OLD.status='Lost' AND NEW.status IN ('In Stock','Service','Damaged'))
  ) THEN
    RAISE EXCEPTION 'Invalid physical-unit status transition: % -> %', OLD.status, NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS trg_serialized_unit_transition ON serialized_units;
CREATE TRIGGER trg_serialized_unit_transition
BEFORE UPDATE OF status ON serialized_units
FOR EACH ROW EXECUTE FUNCTION enforce_serialized_unit_transition();

-- Establish a non-destructive baseline for units that existed before the lifecycle ledger.
DROP TRIGGER IF EXISTS trg_serialized_unit_lifecycle ON serialized_units;
INSERT INTO serialized_unit_status_history(serialized_unit_id,from_status,to_status,from_location_id,to_location_id,reason,source_type,source_id,created_at)
SELECT s.id,NULL,s.status,NULL,s.location_id,'Historical baseline captured when lifecycle history was introduced','MigrationBaseline',s.id,COALESCE(s.created_at,now())
FROM serialized_units s
WHERE NOT EXISTS (SELECT 1 FROM serialized_unit_status_history h WHERE h.serialized_unit_id=s.id);
CREATE TRIGGER trg_serialized_unit_lifecycle AFTER INSERT OR UPDATE OF status,location_id ON serialized_units FOR EACH ROW EXECUTE FUNCTION record_serialized_unit_lifecycle();
