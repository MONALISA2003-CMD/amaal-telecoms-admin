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
