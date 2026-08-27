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
CREATE INDEX IF NOT EXISTS idx_inventory_batches_variant ON inventory_batches(variant_id,received_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_batches_location ON inventory_batches(location_id,received_at DESC);

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
