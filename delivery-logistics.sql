-- Delivery & Logistics
CREATE TABLE IF NOT EXISTS delivery_zones(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, region text NOT NULL DEFAULT '', fee numeric(18,2) NOT NULL DEFAULT 0 CHECK(fee>=0), eta_hours int NOT NULL DEFAULT 24 CHECK(eta_hours>0), status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')), created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS delivery_shipments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), shipment_no text UNIQUE NOT NULL, order_id uuid NOT NULL UNIQUE REFERENCES orders(id) ON DELETE RESTRICT, zone_id uuid REFERENCES delivery_zones(id) ON DELETE SET NULL, method text NOT NULL DEFAULT 'Delivery' CHECK(method IN ('Delivery','Pickup')), carrier text NOT NULL DEFAULT '', tracking_number text NOT NULL DEFAULT '', driver_id uuid REFERENCES users(id) ON DELETE SET NULL, status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Assigned','Picked Up','In Transit','Out for Delivery','Delivered','Failed','Returned','Cancelled')), recipient_name text NOT NULL DEFAULT '', recipient_phone text NOT NULL DEFAULT '', address text NOT NULL DEFAULT '', scheduled_at timestamptz, delivered_at timestamptz, failure_reason text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '', created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_delivery_shipments_status ON delivery_shipments(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_delivery_shipments_driver ON delivery_shipments(driver_id,status);
CREATE TABLE IF NOT EXISTS delivery_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), shipment_id uuid NOT NULL REFERENCES delivery_shipments(id) ON DELETE CASCADE, status text NOT NULL, note text NOT NULL DEFAULT '', location_text text NOT NULL DEFAULT '', actor_id uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_delivery_events_shipment ON delivery_events(shipment_id,created_at);
CREATE TABLE IF NOT EXISTS delivery_attempts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), shipment_id uuid NOT NULL REFERENCES delivery_shipments(id) ON DELETE CASCADE, attempt_no int NOT NULL, attempted_at timestamptz NOT NULL DEFAULT now(), outcome text NOT NULL CHECK(outcome IN ('Delivered','Failed','Rescheduled')), recipient_name text NOT NULL DEFAULT '', note text NOT NULL DEFAULT '', created_by uuid REFERENCES users(id) ON DELETE SET NULL, UNIQUE(shipment_id,attempt_no)
);

-- Delivery partners, assignments and unit-cost performance tracking
CREATE TABLE IF NOT EXISTS delivery_partners(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 partner_type text NOT NULL DEFAULT 'Individual' CHECK(partner_type IN ('Individual','Company')),
 phone text NOT NULL DEFAULT '', email text NOT NULL DEFAULT '', address text NOT NULL DEFAULT '', service_area text NOT NULL DEFAULT '',
 default_unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(default_unit_cost>=0),
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')),
 notes text NOT NULL DEFAULT '', created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS partner_id uuid;
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS unit_count numeric(18,3) NOT NULL DEFAULT 0 CHECK(unit_count>=0);
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(unit_cost>=0);
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS total_delivery_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(total_delivery_cost>=0);
DO $$ BEGIN ALTER TABLE delivery_shipments ADD CONSTRAINT delivery_shipments_partner_fk FOREIGN KEY(partner_id) REFERENCES delivery_partners(id) ON DELETE SET NULL; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS idx_delivery_shipments_partner ON delivery_shipments(partner_id,status,created_at DESC);

ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS proof_type text NOT NULL DEFAULT 'None' CHECK(proof_type IN ('None','Recipient','Photo','Signature'));
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS proof_reference text NOT NULL DEFAULT '';
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS proof_notes text NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_delivery_shipments_tracking ON delivery_shipments(tracking_number) WHERE tracking_number<>'';
CREATE INDEX IF NOT EXISTS idx_delivery_shipments_scheduled ON delivery_shipments(scheduled_at,status) WHERE scheduled_at IS NOT NULL;

-- Exact serialized physical units attached to each delivery shipment.
-- Additive and repeat-safe; existing shipments are backfilled from their authoritative order assignments.
CREATE TABLE IF NOT EXISTS delivery_shipment_serial_units(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 shipment_id uuid NOT NULL REFERENCES delivery_shipments(id) ON DELETE RESTRICT,
 serialized_unit_id uuid NOT NULL REFERENCES serialized_units(id) ON DELETE RESTRICT,
 order_serial_unit_id uuid REFERENCES order_serial_units(id) ON DELETE RESTRICT,
 status text NOT NULL DEFAULT 'Assigned' CHECK(status IN ('Assigned','Picked Up','In Transit','Out for Delivery','Delivered','Failed','Returned','Cancelled')),
 created_at timestamptz NOT NULL DEFAULT now(),
 picked_up_at timestamptz,
 delivered_at timestamptz,
 UNIQUE(shipment_id,serialized_unit_id),
 UNIQUE(shipment_id,order_serial_unit_id)
);
CREATE INDEX IF NOT EXISTS idx_delivery_shipment_serial_units_shipment ON delivery_shipment_serial_units(shipment_id,status);
CREATE INDEX IF NOT EXISTS idx_delivery_shipment_serial_units_unit ON delivery_shipment_serial_units(serialized_unit_id,created_at DESC);

INSERT INTO delivery_shipment_serial_units(shipment_id,serialized_unit_id,order_serial_unit_id,status)
SELECT ds.id,os.serialized_unit_id,os.id,CASE WHEN ds.status='Delivered' THEN 'Delivered' WHEN ds.status='Returned' THEN 'Returned' WHEN ds.status='Cancelled' THEN 'Cancelled' ELSE 'Assigned' END
FROM delivery_shipments ds
JOIN order_serial_units os ON os.order_line_id IN (SELECT id FROM order_lines WHERE order_id=ds.order_id)
WHERE NOT EXISTS (SELECT 1 FROM delivery_shipment_serial_units x WHERE x.shipment_id=ds.id AND x.serialized_unit_id=os.serialized_unit_id);
