CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS roles(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, description text NOT NULL DEFAULT '', system boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS permissions(id text PRIMARY KEY, description text NOT NULL);
CREATE TABLE IF NOT EXISTS role_permissions(role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE, permission_id text NOT NULL REFERENCES permissions(id) ON DELETE CASCADE, PRIMARY KEY(role_id,permission_id));
CREATE TABLE IF NOT EXISTS branches(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, address text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')), created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS users(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text UNIQUE NOT NULL, password_hash text NOT NULL, status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')), failed_attempts int NOT NULL DEFAULT 0, locked_until timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS user_roles(user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE, PRIMARY KEY(user_id,role_id));
CREATE TABLE IF NOT EXISTS user_branches(user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, branch_id uuid NOT NULL REFERENCES branches(id) ON DELETE CASCADE, PRIMARY KEY(user_id,branch_id));
CREATE TABLE IF NOT EXISTS sessions(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash text UNIQUE NOT NULL,
 token_expires_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), last_seen_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL, revoked_at timestamptz, ip text, user_agent text);
CREATE TABLE IF NOT EXISTS audit_logs(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), actor_id uuid REFERENCES users(id) ON DELETE SET NULL, action text NOT NULL, resource_type text NOT NULL, resource_id text, detail text NOT NULL DEFAULT '', before_json jsonb, after_json jsonb, branch_id uuid REFERENCES branches(id) ON DELETE SET NULL, request_id text NOT NULL, ip text, user_agent text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS notifications(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid REFERENCES users(id) ON DELETE CASCADE, title text NOT NULL, body text NOT NULL DEFAULT '', read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS settings(key text PRIMARY KEY, value_json jsonb NOT NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_at timestamptz NOT NULL DEFAULT now());


-- Core Administration & Security: international administration and security foundation
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS employee_id text UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS job_title text NOT NULL DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS department_id uuid;
ALTER TABLE users ADD COLUMN IF NOT EXISTS country_code text NOT NULL DEFAULT 'UG';
ALTER TABLE users ADD COLUMN IF NOT EXISTS locale text NOT NULL DEFAULT 'en-UG';
ALTER TABLE users ADD COLUMN IF NOT EXISTS timezone text NOT NULL DEFAULT 'Africa/Kampala';
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_token_hash text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_expires_at timestamptz;
ALTER TABLE users ADD COLUMN IF NOT EXISTS mfa_enabled boolean NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES users(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS organizations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 legal_name text NOT NULL,
 trading_name text NOT NULL DEFAULT '',
 registration_number text NOT NULL DEFAULT '',
 tax_number text NOT NULL DEFAULT '',
 country_code text NOT NULL DEFAULT 'UG',
 currency text NOT NULL DEFAULT 'UGX',
 timezone text NOT NULL DEFAULT 'Africa/Kampala',
 locale text NOT NULL DEFAULT 'en-UG',
 address text NOT NULL DEFAULT '',
 city text NOT NULL DEFAULT '',
 region text NOT NULL DEFAULT '',
 postal_code text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 website text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS departments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text UNIQUE NOT NULL,
 code text UNIQUE NOT NULL,
 description text NOT NULL DEFAULT '',
 manager_id uuid REFERENCES users(id) ON DELETE SET NULL,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$ BEGIN
 ALTER TABLE users ADD CONSTRAINT users_department_fk FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE TABLE IF NOT EXISTS login_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid REFERENCES users(id) ON DELETE SET NULL,
 email text NOT NULL DEFAULT '',
 success boolean NOT NULL,
 reason text NOT NULL DEFAULT '',
 ip text,
 user_agent text,
 request_id text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS mfa_credentials(
 user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
 secret_encrypted text NOT NULL,
 enabled_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS password_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 password_hash text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS invitations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL,
 name text NOT NULL DEFAULT '',
 role_id uuid REFERENCES roles(id) ON DELETE SET NULL,
 token_hash text UNIQUE NOT NULL,
 token_expires_at timestamptz,
 expires_at timestamptz NOT NULL,
 accepted_at timestamptz,
 revoked_at timestamptz,
 invited_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS feature_flags(
 key text PRIMARY KEY,
 enabled boolean NOT NULL DEFAULT false,
 description text NOT NULL DEFAULT '',
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_actor ON audit_logs(actor_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_login_events_created_at ON login_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_user_active ON sessions(user_id,revoked_at,expires_at);

CREATE TABLE IF NOT EXISTS security_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 event_type text NOT NULL,
 severity text NOT NULL DEFAULT 'info' CHECK(severity IN ('info','warning','critical')),
 detail text NOT NULL DEFAULT '',
 ip text,
 user_agent text,
 request_id text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON security_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department_id);


-- Catalog: product foundation for phones, TVs, appliances, electronics and accessories
CREATE TABLE IF NOT EXISTS product_categories(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 parent_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
 name text NOT NULL,
 slug text UNIQUE NOT NULL,
 description text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 seo_title text NOT NULL DEFAULT '',
 seo_description text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_product_categories_name_parent ON product_categories(lower(name),COALESCE(parent_id,'00000000-0000-0000-0000-000000000000'::uuid));
CREATE TABLE IF NOT EXISTS brands(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text UNIQUE NOT NULL,
 slug text UNIQUE NOT NULL,
 description text NOT NULL DEFAULT '',
 logo_url text NOT NULL DEFAULT '',
 website_url text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS products(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 slug text UNIQUE NOT NULL,
 brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
 category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
 product_type text NOT NULL DEFAULT 'Physical',
 short_description text NOT NULL DEFAULT '',
 description text NOT NULL DEFAULT '',
 specifications jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Active','Inactive','Archived')),
 website_visibility text NOT NULL DEFAULT 'Hidden' CHECK(website_visibility IN ('Hidden','Published')),
 featured boolean NOT NULL DEFAULT false,
 seo_title text NOT NULL DEFAULT '',
 seo_description text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status,website_visibility);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(lower(name));
CREATE TABLE IF NOT EXISTS product_variants(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 sku text UNIQUE NOT NULL,
 barcode text NOT NULL DEFAULT '',
 variant_name text NOT NULL DEFAULT 'Default',
 color text NOT NULL DEFAULT '',
 storage text NOT NULL DEFAULT '',
 size text NOT NULL DEFAULT '',
 cost_price numeric(18,2) NOT NULL DEFAULT 0 CHECK(cost_price>=0),
 selling_price numeric(18,2) NOT NULL DEFAULT 0 CHECK(selling_price>=0),
 compare_at_price numeric(18,2) CHECK(compare_at_price IS NULL OR compare_at_price>=0),
 wholesale_price numeric(18,2) CHECK(wholesale_price IS NULL OR wholesale_price>=0),
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 track_inventory boolean NOT NULL DEFAULT true,
 serialized boolean NOT NULL DEFAULT false,
 weight numeric(12,3) CHECK(weight IS NULL OR weight>=0),
 dimensions jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);
CREATE TABLE IF NOT EXISTS product_images(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL,
 url text NOT NULL,
 alt_text text NOT NULL DEFAULT '',
 sort_order int NOT NULL DEFAULT 0,
 is_primary boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id,sort_order);
CREATE TABLE IF NOT EXISTS product_tags(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text UNIQUE NOT NULL,
 slug text UNIQUE NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS product_tag_links(
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 tag_id uuid NOT NULL REFERENCES product_tags(id) ON DELETE CASCADE,
 PRIMARY KEY(product_id,tag_id)
);
CREATE TABLE IF NOT EXISTS product_revisions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 version_no int NOT NULL,
 snapshot jsonb NOT NULL,
 changed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(product_id,version_no)
);


CREATE TABLE IF NOT EXISTS inventory_locations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 code text UNIQUE NOT NULL,
 type text NOT NULL DEFAULT 'Warehouse' CHECK(type IN ('Warehouse','Store','Service Center','Transit','Other')),
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 address text NOT NULL DEFAULT '',
 notes text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_inventory_locations_status ON inventory_locations(status);

CREATE TABLE IF NOT EXISTS inventory_balances(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE CASCADE,
 on_hand numeric(18,3) NOT NULL DEFAULT 0 CHECK(on_hand>=0),
 reserved numeric(18,3) NOT NULL DEFAULT 0 CHECK(reserved>=0),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(variant_id,location_id),
 CHECK(reserved<=on_hand)
);
CREATE INDEX IF NOT EXISTS idx_inventory_balances_location ON inventory_balances(location_id);
CREATE INDEX IF NOT EXISTS idx_inventory_balances_variant ON inventory_balances(variant_id);

CREATE TABLE IF NOT EXISTS inventory_movements(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 movement_type text NOT NULL CHECK(movement_type IN ('RECEIPT','ADJUSTMENT_IN','ADJUSTMENT_OUT','TRANSFER_OUT','TRANSFER_IN','RESERVE','RELEASE','SALE','RETURN','DAMAGE','LOSS','FOUND','STOCKTAKE_IN','STOCKTAKE_OUT')),
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_cost numeric(18,2) CHECK(unit_cost IS NULL OR unit_cost>=0),
 before_qty numeric(18,3) NOT NULL DEFAULT 0,
 after_qty numeric(18,3) NOT NULL DEFAULT 0,
 reference_type text,
 reference_id uuid,
 reason text NOT NULL DEFAULT '',
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_created ON inventory_movements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_movements_variant_location ON inventory_movements(variant_id,location_id,created_at DESC);

CREATE TABLE IF NOT EXISTS stock_receipts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 receipt_no text UNIQUE NOT NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 supplier_name text NOT NULL DEFAULT '',
 supplier_reference text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Received' CHECK(status IN ('Received','Cancelled')),
 received_at timestamptz NOT NULL DEFAULT now(),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS stock_receipt_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 receipt_id uuid NOT NULL REFERENCES stock_receipts(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(unit_cost>=0),
 serials jsonb NOT NULL DEFAULT '[]'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_receipt_lines_receipt ON stock_receipt_lines(receipt_id);

CREATE TABLE IF NOT EXISTS stock_transfers(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 transfer_no text UNIQUE NOT NULL,
 from_location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 to_location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Submitted','Approved','Shipped','Received','Cancelled')),
 requested_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 shipped_at timestamptz,
 received_at timestamptz,
 notes text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(from_location_id<>to_location_id)
);
CREATE TABLE IF NOT EXISTS stock_transfer_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 transfer_id uuid NOT NULL REFERENCES stock_transfers(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_cost numeric(18,2) CHECK(unit_cost IS NULL OR unit_cost>=0),
 serials jsonb NOT NULL DEFAULT '[]'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_transfer_lines_transfer ON stock_transfer_lines(transfer_id);

CREATE TABLE IF NOT EXISTS stock_adjustments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 adjustment_no text UNIQUE NOT NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 reason text NOT NULL,
 status text NOT NULL DEFAULT 'Applied' CHECK(status IN ('Applied','Cancelled')),
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS stock_adjustment_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 adjustment_id uuid NOT NULL REFERENCES stock_adjustments(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity_change numeric(18,3) NOT NULL CHECK(quantity_change<>0),
 unit_cost numeric(18,2) CHECK(unit_cost IS NULL OR unit_cost>=0),
 reason text NOT NULL DEFAULT ''
);

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
CREATE INDEX IF NOT EXISTS idx_serialized_units_variant_location ON serialized_units(variant_id,location_id);
CREATE INDEX IF NOT EXISTS idx_serialized_units_status ON serialized_units(status);

CREATE TABLE IF NOT EXISTS inventory_reservations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Released','Consumed','Cancelled')),
 reference_type text,
 reference_id uuid,
 expires_at timestamptz,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 released_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_inventory_reservations_active ON inventory_reservations(location_id,variant_id,status);

CREATE TABLE IF NOT EXISTS inventory_stocktakes(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 stocktake_no text UNIQUE NOT NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','In Progress','Completed','Cancelled')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 completed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 completed_at timestamptz
);
CREATE TABLE IF NOT EXISTS inventory_stocktake_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 stocktake_id uuid NOT NULL REFERENCES inventory_stocktakes(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id),
 system_qty numeric(14,3) NOT NULL DEFAULT 0,
 counted_qty numeric(14,3),
 variance numeric(14,3),
 reason text NOT NULL DEFAULT '',
 counted_at timestamptz
);
CREATE UNIQUE INDEX IF NOT EXISTS inventory_stocktake_lines_unique ON inventory_stocktake_lines(stocktake_id,variant_id);
CREATE TABLE IF NOT EXISTS inventory_incidents(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 incident_no text UNIQUE NOT NULL,
 incident_type text NOT NULL CHECK(incident_type IN ('Damage','Loss','Found','Return')),
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 variant_id uuid NOT NULL REFERENCES product_variants(id),
 quantity numeric(14,3) NOT NULL CHECK(quantity>0),
 serials jsonb NOT NULL DEFAULT '[]'::jsonb,
 reason text NOT NULL,
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Resolved','Cancelled')),
 resolution_notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 resolved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 resolved_at timestamptz
);
CREATE TABLE IF NOT EXISTS product_price_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
 cost_price numeric(14,2) NOT NULL,
 selling_price numeric(14,2) NOT NULL,
 wholesale_price numeric(14,2),
 changed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);

-- Suppliers & Procurement
CREATE TABLE IF NOT EXISTS suppliers(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_code text UNIQUE NOT NULL,
 legal_name text NOT NULL,
 trading_name text NOT NULL DEFAULT '',
 registration_no text NOT NULL DEFAULT '',
 tax_id text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 website text NOT NULL DEFAULT '',
 country text NOT NULL DEFAULT 'Uganda',
 default_currency text NOT NULL DEFAULT 'UGX',
 payment_terms_days int NOT NULL DEFAULT 0 CHECK(payment_terms_days>=0),
 tax_profile text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive','Blocked','Pending')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_suppliers_status ON suppliers(status);
CREATE INDEX IF NOT EXISTS idx_suppliers_name ON suppliers(lower(legal_name));

CREATE TABLE IF NOT EXISTS supplier_contacts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
 name text NOT NULL,
 job_title text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 is_primary boolean NOT NULL DEFAULT false,
 notes text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_supplier_contacts_supplier ON supplier_contacts(supplier_id);

CREATE TABLE IF NOT EXISTS supplier_addresses(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
 label text NOT NULL DEFAULT 'Main',
 address_line1 text NOT NULL,
 address_line2 text NOT NULL DEFAULT '',
 city text NOT NULL DEFAULT '',
 region text NOT NULL DEFAULT '',
 country text NOT NULL DEFAULT 'Uganda',
 postal_code text NOT NULL DEFAULT '',
 is_primary boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_supplier_addresses_supplier ON supplier_addresses(supplier_id);

CREATE TABLE IF NOT EXISTS supplier_documents(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
 document_type text NOT NULL,
 document_name text NOT NULL,
 url text NOT NULL,
 expires_at date,
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS supplier_product_pricing(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 supplier_sku text NOT NULL DEFAULT '',
 min_order_qty numeric(18,3) NOT NULL DEFAULT 1 CHECK(min_order_qty>0),
 lead_time_days int NOT NULL DEFAULT 0 CHECK(lead_time_days>=0),
 unit_cost numeric(18,2) NOT NULL CHECK(unit_cost>=0),
 currency text NOT NULL DEFAULT 'UGX',
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 valid_from date NOT NULL DEFAULT current_date,
 valid_to date,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(valid_to IS NULL OR valid_to>=valid_from)
);
CREATE INDEX IF NOT EXISTS idx_supplier_pricing_supplier_variant ON supplier_product_pricing(supplier_id,variant_id,created_at DESC);

CREATE TABLE IF NOT EXISTS purchase_requisitions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 requisition_no text UNIQUE NOT NULL,
 requester_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
 department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Submitted','Approved','Rejected','Cancelled')),
 priority text NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Urgent')),
 needed_by date,
 justification text NOT NULL DEFAULT '',
 notes text NOT NULL DEFAULT '',
 submitted_at timestamptz,
 approved_at timestamptz,
 rejected_at timestamptz,
 cancelled_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_requisitions_status ON purchase_requisitions(status,created_at DESC);

CREATE TABLE IF NOT EXISTS purchase_requisition_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 requisition_id uuid NOT NULL REFERENCES purchase_requisitions(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 estimated_unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(estimated_unit_cost>=0),
 preferred_supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
 notes text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_requisition_lines_req ON purchase_requisition_lines(requisition_id);

CREATE TABLE IF NOT EXISTS procurement_approvals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 entity_type text NOT NULL CHECK(entity_type IN ('Requisition','PurchaseOrder','Invoice')),
 entity_id uuid NOT NULL,
 action text NOT NULL CHECK(action IN ('Submitted','Approved','Rejected','Cancelled','Matched','Disputed')),
 actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
 comments text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_procurement_approvals_entity ON procurement_approvals(entity_type,entity_id,created_at DESC);

CREATE TABLE IF NOT EXISTS purchase_orders(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 po_no text UNIQUE NOT NULL,
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
 requisition_id uuid REFERENCES purchase_requisitions(id) ON DELETE SET NULL,
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Submitted','Approved','Partially Received','Received','Cancelled')),
 currency text NOT NULL DEFAULT 'UGX',
 exchange_rate numeric(18,8) NOT NULL DEFAULT 1 CHECK(exchange_rate>0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 shipping_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(shipping_amount>=0),
 expected_date date,
 notes text NOT NULL DEFAULT '',
 submitted_at timestamptz,
 approved_at timestamptz,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_supplier ON purchase_orders(supplier_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_status ON purchase_orders(status,created_at DESC);

CREATE TABLE IF NOT EXISTS purchase_order_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_price numeric(18,2) NOT NULL CHECK(unit_price>=0),
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 received_qty numeric(18,3) NOT NULL DEFAULT 0 CHECK(received_qty>=0),
 notes text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_purchase_order_lines_po ON purchase_order_lines(purchase_order_id);

CREATE TABLE IF NOT EXISTS purchase_order_attachments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
 name text NOT NULL,
 url text NOT NULL,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS goods_receipts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 grn_no text UNIQUE NOT NULL,
 purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE RESTRICT,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 supplier_delivery_note text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Posted','Cancelled')),
 notes text NOT NULL DEFAULT '',
 received_by uuid REFERENCES users(id) ON DELETE SET NULL,
 received_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_goods_receipts_po ON goods_receipts(purchase_order_id,created_at DESC);

CREATE TABLE IF NOT EXISTS goods_receipt_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 goods_receipt_id uuid NOT NULL REFERENCES goods_receipts(id) ON DELETE CASCADE,
 purchase_order_line_id uuid NOT NULL REFERENCES purchase_order_lines(id) ON DELETE RESTRICT,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 ordered_qty numeric(18,3) NOT NULL DEFAULT 0,
 received_qty numeric(18,3) NOT NULL CHECK(received_qty>0),
 rejected_qty numeric(18,3) NOT NULL DEFAULT 0 CHECK(rejected_qty>=0),
 unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(unit_cost>=0),
 serials jsonb NOT NULL DEFAULT '[]'::jsonb,
 notes text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_goods_receipt_lines_grn ON goods_receipt_lines(goods_receipt_id);

CREATE TABLE IF NOT EXISTS supplier_invoices(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 invoice_no text UNIQUE NOT NULL,
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
 purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE SET NULL,
 invoice_date date NOT NULL DEFAULT current_date,
 due_date date,
 currency text NOT NULL DEFAULT 'UGX',
 subtotal numeric(18,2) NOT NULL DEFAULT 0 CHECK(subtotal>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 total_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(total_amount>=0),
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Matched','Partially Paid','Paid','Disputed','Cancelled')),
 attachment_url text NOT NULL DEFAULT '',
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 matched_by uuid REFERENCES users(id) ON DELETE SET NULL,
 matched_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_supplier_invoices_supplier ON supplier_invoices(supplier_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_supplier_invoices_status ON supplier_invoices(status,created_at DESC);

CREATE TABLE IF NOT EXISTS supplier_invoice_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 invoice_id uuid NOT NULL REFERENCES supplier_invoices(id) ON DELETE CASCADE,
 purchase_order_line_id uuid REFERENCES purchase_order_lines(id) ON DELETE SET NULL,
 variant_id uuid REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL DEFAULT 1 CHECK(quantity>0),
 unit_price numeric(18,2) NOT NULL DEFAULT 0 CHECK(unit_price>=0),
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 line_total numeric(18,2) NOT NULL DEFAULT 0 CHECK(line_total>=0),
 notes text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_supplier_invoice_lines_invoice ON supplier_invoice_lines(invoice_id);

CREATE TABLE IF NOT EXISTS supplier_payments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 payment_no text UNIQUE NOT NULL,
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
 invoice_id uuid REFERENCES supplier_invoices(id) ON DELETE SET NULL,
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 currency text NOT NULL DEFAULT 'UGX',
 payment_date date NOT NULL DEFAULT current_date,
 method text NOT NULL DEFAULT 'Bank Transfer',
 reference text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Completed' CHECK(status IN ('Pending','Completed','Reversed','Cancelled')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_supplier_payments_supplier ON supplier_payments(supplier_id,payment_date DESC);

CREATE TABLE IF NOT EXISTS supplier_performance_reviews(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
 review_period_start date NOT NULL,
 review_period_end date NOT NULL,
 quality_score numeric(5,2) CHECK(quality_score>=0 AND quality_score<=100),
 delivery_score numeric(5,2) CHECK(delivery_score>=0 AND delivery_score<=100),
 price_score numeric(5,2) CHECK(price_score>=0 AND price_score<=100),
 service_score numeric(5,2) CHECK(service_score>=0 AND service_score<=100),
 overall_score numeric(5,2) CHECK(overall_score>=0 AND overall_score<=100),
 comments text NOT NULL DEFAULT '',
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(review_period_end>=review_period_start)
);
CREATE INDEX IF NOT EXISTS idx_supplier_performance_supplier ON supplier_performance_reviews(supplier_id,review_period_end DESC);

-- Link supplier receiving to the inventory receipt ledger without breaking core administration, catalog or inventory.
ALTER TABLE stock_receipts ADD COLUMN IF NOT EXISTS purchase_order_id uuid REFERENCES purchase_orders(id) ON DELETE SET NULL;
ALTER TABLE stock_receipts ADD COLUMN IF NOT EXISTS supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL;
ALTER TABLE stock_receipts ADD COLUMN IF NOT EXISTS goods_receipt_id uuid REFERENCES goods_receipts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_stock_receipts_po ON stock_receipts(purchase_order_id);

-- Compatibility migration for movement types used by reconciliation and incident workflows.
DO $$ BEGIN
  ALTER TABLE inventory_movements DROP CONSTRAINT IF EXISTS inventory_movements_movement_type_check;
  ALTER TABLE inventory_movements ADD CONSTRAINT inventory_movements_movement_type_check CHECK(movement_type IN ('RECEIPT','ADJUSTMENT_IN','ADJUSTMENT_OUT','TRANSFER_OUT','TRANSFER_IN','RESERVE','RELEASE','SALE','RETURN','DAMAGE','LOSS','FOUND','STOCKTAKE_IN','STOCKTAKE_OUT'));
EXCEPTION WHEN undefined_table THEN NULL; END $$;

-- Customers & CRM: customers, support, privacy and customer 360
CREATE TABLE IF NOT EXISTS customers(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_no text UNIQUE NOT NULL,
 name text NOT NULL,
 customer_type text NOT NULL DEFAULT 'Individual' CHECK(customer_type IN ('Individual','Business','Corporate')),
 company_name text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 alternate_phone text NOT NULL DEFAULT '',
 tax_number text NOT NULL DEFAULT '',
 country_code text NOT NULL DEFAULT 'UG',
 preferred_currency text NOT NULL DEFAULT 'UGX',
 address_line1 text NOT NULL DEFAULT '',
 address_line2 text NOT NULL DEFAULT '',
 city text NOT NULL DEFAULT '',
 region text NOT NULL DEFAULT '',
 postal_code text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive','Blocked','Anonymized')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(lower(name));
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(lower(email));
CREATE TABLE IF NOT EXISTS customer_balances(
 customer_id uuid PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
 balance numeric(18,2) NOT NULL DEFAULT 0,
 credit_limit numeric(18,2) NOT NULL DEFAULT 0,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_addresses(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 label text NOT NULL DEFAULT 'Address',
 address_line1 text NOT NULL,
 address_line2 text NOT NULL DEFAULT '',
 city text NOT NULL,
 region text NOT NULL DEFAULT '',
 postal_code text NOT NULL DEFAULT '',
 country_code text NOT NULL DEFAULT 'UG',
 is_default boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer ON customer_addresses(customer_id,is_default DESC);
CREATE TABLE IF NOT EXISTS customer_contacts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 name text NOT NULL,
 role text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 phone text NOT NULL,
 is_primary boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_interactions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 type text NOT NULL,
 subject text NOT NULL DEFAULT '',
 summary text NOT NULL,
 channel text NOT NULL DEFAULT '',
 outcome text NOT NULL DEFAULT '',
 next_follow_up date,
 assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_interactions_customer ON customer_interactions(customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS customer_tags(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text UNIQUE NOT NULL,
 description text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_tag_assignments(
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 tag_id uuid NOT NULL REFERENCES customer_tags(id) ON DELETE CASCADE,
 assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(customer_id,tag_id)
);
CREATE TABLE IF NOT EXISTS support_cases(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 case_no text UNIQUE NOT NULL,
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
 title text NOT NULL,
 description text NOT NULL,
 priority text NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Urgent')),
 channel text NOT NULL DEFAULT 'Phone',
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','In Progress','Pending Customer','Resolved','Closed')),
 assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
 resolution text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 resolved_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_support_cases_status ON support_cases(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_support_cases_customer ON support_cases(customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS customer_consents(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 consent_type text NOT NULL,
 granted boolean NOT NULL DEFAULT false,
 source text NOT NULL DEFAULT 'Admin',
 recorded_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(customer_id,consent_type)
);

-- Sales & POS
CREATE TABLE IF NOT EXISTS sales(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_no text UNIQUE NOT NULL,
 idempotency_key text UNIQUE,
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 status text NOT NULL DEFAULT 'Completed' CHECK(status IN ('Draft','Completed','Voided')),
 subtotal numeric(18,2) NOT NULL DEFAULT 0 CHECK(subtotal>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 grand_total numeric(18,2) NOT NULL DEFAULT 0 CHECK(grand_total>=0),
 currency text NOT NULL DEFAULT 'UGX',
 cashier_id uuid NOT NULL REFERENCES users(id),
 notes text NOT NULL DEFAULT '',
 voided_at timestamptz,
 voided_by uuid REFERENCES users(id),
 void_reason text,
 created_at timestamptz NOT NULL DEFAULT now(),
 completed_at timestamptz DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sale_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id),
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_price numeric(18,2) NOT NULL CHECK(unit_price>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 line_total numeric(18,2) NOT NULL CHECK(line_total>=0),
 cost_price numeric(18,2) NOT NULL DEFAULT 0 CHECK(cost_price>=0),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sale_payments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
 method text NOT NULL CHECK(method IN ('Cash','Mobile Money','Card','Bank Transfer','Online Payment')),
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 reference text NOT NULL DEFAULT '',
 received_by uuid NOT NULL REFERENCES users(id),
 received_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sale_serial_units(
 sale_line_id uuid PRIMARY KEY REFERENCES sale_lines(id) ON DELETE CASCADE,
 serialized_unit_id uuid NOT NULL UNIQUE REFERENCES serialized_units(id)
);
CREATE TABLE IF NOT EXISTS sale_status_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
 status text NOT NULL,
 actor_id uuid REFERENCES users(id),
 notes text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_sales_created ON sales(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sales_customer ON sales(customer_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sales_location ON sales(location_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_sale_lines_sale ON sale_lines(sale_id);
CREATE INDEX IF NOT EXISTS idx_sale_payments_sale ON sale_payments(sale_id);
CREATE INDEX IF NOT EXISTS idx_sale_status_history_sale ON sale_status_history(sale_id,created_at);

-- Orders & E-commerce
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS icon_url text NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS promotion_type text NOT NULL DEFAULT 'None' CHECK(promotion_type IN ('None','Flash Sale','Promotional'));
ALTER TABLE products ADD COLUMN IF NOT EXISTS promotion_label text NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS promotion_start timestamptz;
ALTER TABLE products ADD COLUMN IF NOT EXISTS promotion_end timestamptz;
CREATE INDEX IF NOT EXISTS idx_products_promotion ON products(promotion_type,promotion_start,promotion_end);

CREATE TABLE IF NOT EXISTS orders(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 order_no text UNIQUE NOT NULL,
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 status text NOT NULL DEFAULT 'Pending Payment' CHECK(status IN ('Pending Payment','Paid','Processing','Packed','Ready for Dispatch','Dispatched','Delivered','Cancelled','Refunded','Returned')),
 payment_status text NOT NULL DEFAULT 'Pending' CHECK(payment_status IN ('Pending','Partially Paid','Paid','Failed','Refunded')),
 fulfillment_status text NOT NULL DEFAULT 'Unfulfilled' CHECK(fulfillment_status IN ('Unfulfilled','Processing','Packed','Ready for Dispatch','Dispatched','Delivered','Returned')),
 subtotal numeric(18,2) NOT NULL DEFAULT 0 CHECK(subtotal>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 shipping_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(shipping_amount>=0),
 grand_total numeric(18,2) NOT NULL DEFAULT 0 CHECK(grand_total>=0),
 currency text NOT NULL DEFAULT 'UGX',
 shipping_name text NOT NULL DEFAULT '',
 shipping_phone text NOT NULL DEFAULT '',
 shipping_email text NOT NULL DEFAULT '',
 shipping_address text NOT NULL DEFAULT '',
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 cancelled_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS order_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0), unit_price numeric(18,2) NOT NULL CHECK(unit_price>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0), tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0), line_total numeric(18,2) NOT NULL DEFAULT 0 CHECK(line_total>=0), cost_price numeric(18,2) NOT NULL DEFAULT 0 CHECK(cost_price>=0), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_lines_order ON order_lines(order_id);
CREATE TABLE IF NOT EXISTS order_payments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 method text NOT NULL, amount numeric(18,2) NOT NULL CHECK(amount>0), reference text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'Completed' CHECK(status IN ('Pending','Completed','Failed','Refunded')),
 received_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_payments_order ON order_payments(order_id);
CREATE TABLE IF NOT EXISTS order_status_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 status text NOT NULL, actor_id uuid REFERENCES users(id) ON DELETE SET NULL, notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id,created_at);
CREATE TABLE IF NOT EXISTS order_fulfillments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 method text NOT NULL DEFAULT 'Delivery', carrier text NOT NULL DEFAULT '', tracking_number text NOT NULL DEFAULT '', assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Assigned','Picked Up','In Transit','Delivered','Failed','Cancelled')),
 notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_order_fulfillments_order ON order_fulfillments(order_id,created_at DESC);

CREATE TABLE IF NOT EXISTS order_serial_units(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 order_line_id uuid NOT NULL REFERENCES order_lines(id) ON DELETE CASCADE,
 serialized_unit_id uuid NOT NULL UNIQUE REFERENCES serialized_units(id) ON DELETE RESTRICT,
 assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(order_line_id,serialized_unit_id)
);
CREATE INDEX IF NOT EXISTS idx_order_serial_units_line ON order_serial_units(order_line_id);
-- Web & Hosting: controlled public-web management, staging, publishing, domains, redirects and media
CREATE TABLE IF NOT EXISTS web_sites(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, slug text UNIQUE NOT NULL,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Maintenance','Disabled')),
 primary_domain text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '',
 default_locale text NOT NULL DEFAULT 'en-UG', default_currency text NOT NULL DEFAULT 'UGX',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_pages(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 title text NOT NULL, slug text NOT NULL, template text NOT NULL DEFAULT 'standard', status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','In Review','Approved','Published','Archived')),
 excerpt text NOT NULL DEFAULT '', body_json jsonb NOT NULL DEFAULT '{}'::jsonb, seo_title text NOT NULL DEFAULT '', seo_description text NOT NULL DEFAULT '', canonical_url text NOT NULL DEFAULT '', noindex boolean NOT NULL DEFAULT false,
 version integer NOT NULL DEFAULT 1, published_at timestamptz, created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(site_id,slug)
);
CREATE TABLE IF NOT EXISTS web_navigation(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 menu_key text NOT NULL, label text NOT NULL, url text NOT NULL, sort_order int NOT NULL DEFAULT 0, parent_id uuid REFERENCES web_navigation(id) ON DELETE SET NULL,
 open_new_tab boolean NOT NULL DEFAULT false, enabled boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_banners(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 title text NOT NULL, subtitle text NOT NULL DEFAULT '', image_media_id uuid, link_url text NOT NULL DEFAULT '', placement text NOT NULL DEFAULT 'home-hero', status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Scheduled','Published','Archived')),
 starts_at timestamptz, ends_at timestamptz, sort_order int NOT NULL DEFAULT 0, created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_content_blocks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 key text NOT NULL, title text NOT NULL DEFAULT '', content_json jsonb NOT NULL DEFAULT '{}'::jsonb, status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Approved','Published','Archived')),
 version int NOT NULL DEFAULT 1, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(site_id,key)
);
CREATE TABLE IF NOT EXISTS web_domains(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 hostname text UNIQUE NOT NULL, type text NOT NULL DEFAULT 'Custom' CHECK(type IN ('Primary','Custom','Redirect')),
 verification_token text NOT NULL DEFAULT '', verified_at timestamptz, ssl_status text NOT NULL DEFAULT 'Pending' CHECK(ssl_status IN ('Pending','Provisioned','Error')),
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Active','Disabled')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_redirects(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 source_path text NOT NULL, destination_url text NOT NULL, status_code int NOT NULL DEFAULT 301 CHECK(status_code IN (301,302,307,308)), enabled boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(site_id,source_path)
);
CREATE TABLE IF NOT EXISTS web_media(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid REFERENCES web_sites(id) ON DELETE SET NULL,
 filename text NOT NULL, mime_type text NOT NULL, size_bytes int NOT NULL CHECK(size_bytes>0 AND size_bytes<=5242880), alt_text text NOT NULL DEFAULT '', storage text NOT NULL DEFAULT 'database', data_base64 text NOT NULL,
 status text NOT NULL DEFAULT 'Private' CHECK(status IN ('Private','Published','Archived')), uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_publish_releases(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 release_name text NOT NULL, environment text NOT NULL DEFAULT 'Staging' CHECK(environment IN ('Staging','Production')), status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Approved','Published','Rolled Back')),
 notes text NOT NULL DEFAULT '', snapshot_json jsonb NOT NULL DEFAULT '{}'::jsonb, created_by uuid REFERENCES users(id) ON DELETE SET NULL, approved_by uuid REFERENCES users(id) ON DELETE SET NULL, published_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), approved_at timestamptz, published_at timestamptz
);
CREATE TABLE IF NOT EXISTS web_publish_queue(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), site_id uuid NOT NULL REFERENCES web_sites(id) ON DELETE CASCADE,
 resource_type text NOT NULL, resource_id uuid NOT NULL, action text NOT NULL CHECK(action IN ('publish','unpublish','archive')),
 requested_by uuid REFERENCES users(id) ON DELETE SET NULL, status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Executed','Rejected')),
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL, reviewed_at timestamptz, executed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS web_settings(
 site_id uuid PRIMARY KEY REFERENCES web_sites(id) ON DELETE CASCADE,
 settings_json jsonb NOT NULL DEFAULT '{}'::jsonb, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_web_pages_site_status ON web_pages(site_id,status);
CREATE INDEX IF NOT EXISTS idx_web_banners_site_status ON web_banners(site_id,status);
CREATE INDEX IF NOT EXISTS idx_web_publish_queue_status ON web_publish_queue(site_id,status);
CREATE INDEX IF NOT EXISTS idx_web_media_site_status ON web_media(site_id,status);
CREATE TABLE IF NOT EXISTS price_lists(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 code text UNIQUE NOT NULL,
 customer_type text NOT NULL DEFAULT 'Retail' CHECK(customer_type IN ('Retail','Wholesale','Corporate','VIP','Custom')),
 currency text NOT NULL DEFAULT 'UGX',
 priority int NOT NULL DEFAULT 100,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Draft','Active','Inactive','Archived')),
 valid_from timestamptz,
 valid_to timestamptz,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(valid_to IS NULL OR valid_from IS NULL OR valid_to>valid_from)
);
CREATE TABLE IF NOT EXISTS price_list_items(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 price_list_id uuid NOT NULL REFERENCES price_lists(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
 price numeric(18,2) NOT NULL CHECK(price>=0),
 compare_at_price numeric(18,2) CHECK(compare_at_price IS NULL OR compare_at_price>=0),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(price_list_id,variant_id)
);
CREATE INDEX IF NOT EXISTS idx_price_list_items_variant ON price_list_items(variant_id);
CREATE TABLE IF NOT EXISTS promotions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 code text UNIQUE,
 type text NOT NULL CHECK(type IN ('Percentage','Fixed Amount')),
 value numeric(18,2) NOT NULL CHECK(value>=0),
 scope_type text NOT NULL DEFAULT 'All' CHECK(scope_type IN ('All','Product','Category','Brand')),
 starts_at timestamptz,
 ends_at timestamptz,
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Scheduled','Active','Paused','Expired','Archived')),
 priority int NOT NULL DEFAULT 100,
 stackable boolean NOT NULL DEFAULT false,
 max_uses int CHECK(max_uses IS NULL OR max_uses>0),
 per_customer_limit int CHECK(per_customer_limit IS NULL OR per_customer_limit>0),
 banner_text text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(ends_at IS NULL OR starts_at IS NULL OR ends_at>starts_at),
 CHECK(type<>'Percentage' OR value<=100)
);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(status,starts_at,ends_at,priority);
CREATE TABLE IF NOT EXISTS promotion_products(
 promotion_id uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 PRIMARY KEY(promotion_id,product_id)
);
CREATE TABLE IF NOT EXISTS promotion_categories(
 promotion_id uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
 category_id uuid NOT NULL REFERENCES product_categories(id) ON DELETE CASCADE,
 PRIMARY KEY(promotion_id,category_id)
);
CREATE TABLE IF NOT EXISTS promotion_brands(
 promotion_id uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
 brand_id uuid NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
 PRIMARY KEY(promotion_id,brand_id)
);
CREATE TABLE IF NOT EXISTS coupons(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 code text UNIQUE NOT NULL,
 promotion_id uuid NOT NULL REFERENCES promotions(id) ON DELETE CASCADE,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive','Expired')),
 max_redemptions int CHECK(max_redemptions IS NULL OR max_redemptions>0),
 per_customer_limit int CHECK(per_customer_limit IS NULL OR per_customer_limit>0),
 starts_at timestamptz,
 ends_at timestamptz,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(ends_at IS NULL OR starts_at IS NULL OR ends_at>starts_at)
);
CREATE TABLE IF NOT EXISTS coupon_redemptions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 coupon_id uuid NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
 sale_id uuid REFERENCES sales(id) ON DELETE SET NULL,
 amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(amount>=0),
 redeemed_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_coupon ON coupon_redemptions(coupon_id);
CREATE OR REPLACE FUNCTION amaal_effective_variant_price(p_variant_id uuid,p_customer_type text DEFAULT 'Retail')
RETURNS TABLE(base_price numeric,price_list_price numeric,promotion_id uuid,promotion_name text,discount_amount numeric,final_price numeric) LANGUAGE sql STABLE AS $$
WITH ctx AS (
 SELECT v.selling_price bp,COALESCE((SELECT i.price FROM price_list_items i JOIN price_lists l ON l.id=i.price_list_id WHERE i.variant_id=v.id AND l.status='Active' AND l.customer_type=p_customer_type AND (l.valid_from IS NULL OR l.valid_from<=now()) AND (l.valid_to IS NULL OR l.valid_to>now()) ORDER BY l.priority ASC,l.updated_at DESC LIMIT 1),v.selling_price) pp,
 v.product_id,pd.category_id,pd.brand_id
 FROM product_variants v JOIN products pd ON pd.id=v.product_id WHERE v.id=p_variant_id
), promo AS (
 SELECT p.* FROM promotions p CROSS JOIN ctx
 WHERE p.status IN ('Active','Scheduled') AND (p.starts_at IS NULL OR p.starts_at<=now()) AND (p.ends_at IS NULL OR p.ends_at>now())
 AND (p.scope_type='All' OR (p.scope_type='Product' AND EXISTS(SELECT 1 FROM promotion_products x WHERE x.promotion_id=p.id AND x.product_id=ctx.product_id)) OR (p.scope_type='Category' AND EXISTS(SELECT 1 FROM promotion_categories x WHERE x.promotion_id=p.id AND x.category_id=ctx.category_id)) OR (p.scope_type='Brand' AND EXISTS(SELECT 1 FROM promotion_brands x WHERE x.promotion_id=p.id AND x.brand_id=ctx.brand_id)))
 ORDER BY p.priority ASC,p.updated_at DESC LIMIT 1
)
SELECT ctx.bp,ctx.pp,p.id,p.name,
CASE WHEN p.id IS NULL THEN 0 WHEN p.type='Percentage' THEN round((ctx.pp*p.value/100)::numeric,2) ELSE LEAST(ctx.pp,round(p.value::numeric,2)) END,
GREATEST(0,round((ctx.pp-CASE WHEN p.id IS NULL THEN 0 WHEN p.type='Percentage' THEN ctx.pp*p.value/100 ELSE LEAST(ctx.pp,p.value) END)::numeric,2))
FROM ctx LEFT JOIN promo p ON true;
$$;
