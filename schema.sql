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
 updated_at timestamptz NOT NULL DEFAULT now(),
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL
);
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS updated_by uuid REFERENCES users(id) ON DELETE SET NULL;
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

CREATE TABLE IF NOT EXISTS product_relationships(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 related_product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 relation_type text NOT NULL CHECK(relation_type IN ('Related','Cross-sell','Upsell')),
 sort_order int NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(product_id,related_product_id,relation_type),
 CHECK(product_id<>related_product_id)
);
CREATE INDEX IF NOT EXISTS idx_product_relationships_product ON product_relationships(product_id,relation_type,sort_order);
CREATE INDEX IF NOT EXISTS idx_product_relationships_related ON product_relationships(related_product_id);


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

-- Phase 22 inventory controls: replenishment policy and serialized stocktake ledger.
CREATE TABLE IF NOT EXISTS inventory_reorder_rules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 reorder_point numeric(18,3) NOT NULL DEFAULT 0 CHECK(reorder_point>=0),
 reorder_quantity numeric(18,3) NOT NULL DEFAULT 0 CHECK(reorder_quantity>=0),
 max_stock numeric(18,3) CHECK(max_stock IS NULL OR max_stock>=0),
 safety_stock numeric(18,3) NOT NULL DEFAULT 0 CHECK(safety_stock>=0),
 enabled boolean NOT NULL DEFAULT true,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(variant_id,location_id),
 CHECK(max_stock IS NULL OR max_stock>=reorder_point)
);
CREATE INDEX IF NOT EXISTS idx_inventory_reorder_rules_location ON inventory_reorder_rules(location_id,enabled);
CREATE INDEX IF NOT EXISTS idx_inventory_reorder_rules_variant ON inventory_reorder_rules(variant_id,enabled);

CREATE TABLE IF NOT EXISTS inventory_movements(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 location_id uuid NOT NULL REFERENCES inventory_locations(id) ON DELETE RESTRICT,
 movement_type text NOT NULL CHECK(movement_type IN ('RECEIPT','ADJUSTMENT_IN','ADJUSTMENT_OUT','TRANSFER_OUT','TRANSFER_IN','RESERVE','RELEASE','SALE','RETURN','DAMAGE','LOSS','FOUND','STOCKTAKE_IN','STOCKTAKE_OUT','SALE_VOID','ORDER_FULFILLMENT')),
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

-- Phase 22 serialized stocktake ledger.
CREATE TABLE IF NOT EXISTS inventory_stocktake_serial_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 stocktake_id uuid NOT NULL REFERENCES inventory_stocktakes(id) ON DELETE CASCADE,
 serialized_unit_id uuid REFERENCES serialized_units(id) ON DELETE RESTRICT,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 expected_present boolean NOT NULL DEFAULT true,
 counted_present boolean,
 serial_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
 reason text NOT NULL DEFAULT '',
 counted_at timestamptz,
 UNIQUE(stocktake_id,serialized_unit_id)
);
CREATE INDEX IF NOT EXISTS idx_inventory_stocktake_serial_stocktake ON inventory_stocktake_serial_lines(stocktake_id);


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
 requester_id uuid REFERENCES users(id) ON DELETE SET NULL,
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
  ALTER TABLE inventory_movements ADD CONSTRAINT inventory_movements_movement_type_check CHECK(movement_type IN ('RECEIPT','ADJUSTMENT_IN','ADJUSTMENT_OUT','TRANSFER_OUT','TRANSFER_IN','RESERVE','RELEASE','SALE','RETURN','DAMAGE','LOSS','FOUND','STOCKTAKE_IN','STOCKTAKE_OUT','SALE_VOID','ORDER_FULFILLMENT'));
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
 SELECT v.selling_price AS bp,
        COALESCE((SELECT i.price
                  FROM price_list_items i
                  JOIN price_lists l ON l.id=i.price_list_id
                  WHERE i.variant_id=v.id
                    AND l.status='Active'
                    AND l.customer_type=p_customer_type
                    AND (l.valid_from IS NULL OR l.valid_from<=now())
                    AND (l.valid_to IS NULL OR l.valid_to>now())
                  ORDER BY l.priority ASC,l.updated_at DESC
                  LIMIT 1),v.selling_price) AS pp,
        v.product_id,pd.category_id,pd.brand_id
 FROM product_variants v
 JOIN products pd ON pd.id=v.product_id
 WHERE v.id=p_variant_id
), promo AS (
 SELECT pr.id,pr.name,pr.type,pr.value
 FROM promotions pr
 CROSS JOIN ctx
 WHERE pr.status IN ('Active','Scheduled')
   AND (pr.starts_at IS NULL OR pr.starts_at<=now())
   AND (pr.ends_at IS NULL OR pr.ends_at>now())
   AND (
     pr.scope_type='All'
     OR (pr.scope_type='Product' AND EXISTS(SELECT 1 FROM promotion_products x WHERE x.promotion_id=pr.id AND x.product_id=ctx.product_id))
     OR (pr.scope_type='Category' AND EXISTS(SELECT 1 FROM promotion_categories x WHERE x.promotion_id=pr.id AND x.category_id=ctx.category_id))
     OR (pr.scope_type='Brand' AND EXISTS(SELECT 1 FROM promotion_brands x WHERE x.promotion_id=pr.id AND x.brand_id=ctx.brand_id))
   )
 ORDER BY pr.priority ASC,pr.updated_at DESC
 LIMIT 1
)
SELECT ctx.bp,ctx.pp,promo.id,promo.name,
       CASE WHEN promo.id IS NULL THEN 0
            WHEN promo.type='Percentage' THEN round((ctx.pp*promo.value/100)::numeric,2)
            ELSE LEAST(ctx.pp,round(promo.value::numeric,2)) END,
       GREATEST(0,round((ctx.pp-CASE WHEN promo.id IS NULL THEN 0
            WHEN promo.type='Percentage' THEN ctx.pp*promo.value/100
            ELSE LEAST(ctx.pp,promo.value) END)::numeric,2))
FROM ctx
LEFT JOIN promo ON true;
$$;
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
-- Warranty & Repairs
CREATE TABLE IF NOT EXISTS warranty_policies(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, brand_id uuid REFERENCES brands(id) ON DELETE SET NULL, category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL, duration_days int NOT NULL CHECK(duration_days>0), coverage text NOT NULL DEFAULT '', exclusions text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')), created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS warranty_claims(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), claim_no text UNIQUE NOT NULL, customer_id uuid REFERENCES customers(id) ON DELETE SET NULL, order_id uuid REFERENCES orders(id) ON DELETE SET NULL, sale_id uuid REFERENCES sales(id) ON DELETE SET NULL, serialized_unit_id uuid REFERENCES serialized_units(id) ON DELETE SET NULL, variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL, policy_id uuid REFERENCES warranty_policies(id) ON DELETE SET NULL, issue text NOT NULL, status text NOT NULL DEFAULT 'Submitted' CHECK(status IN ('Submitted','Under Review','Approved','Rejected','In Repair','Ready for Collection','Resolved','Cancelled')), warranty_status text NOT NULL DEFAULT 'Pending' CHECK(warranty_status IN ('Pending','Covered','Not Covered','Goodwill')), estimated_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(estimated_cost>=0), approved_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(approved_cost>=0), resolution text NOT NULL DEFAULT '', received_at timestamptz, resolved_at timestamptz, created_by uuid REFERENCES users(id) ON DELETE SET NULL, assigned_to uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_warranty_claims_status ON warranty_claims(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_warranty_claims_customer ON warranty_claims(customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS repair_jobs(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), job_no text UNIQUE NOT NULL, claim_id uuid NOT NULL UNIQUE REFERENCES warranty_claims(id) ON DELETE CASCADE, technician_id uuid REFERENCES users(id) ON DELETE SET NULL, status text NOT NULL DEFAULT 'Queued' CHECK(status IN ('Queued','Diagnosing','Repairing','Awaiting Parts','Quality Check','Completed','Cancelled')), diagnosis text NOT NULL DEFAULT '', work_done text NOT NULL DEFAULT '', parts_used jsonb NOT NULL DEFAULT '[]'::jsonb, labor_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(labor_cost>=0), parts_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(parts_cost>=0), started_at timestamptz, completed_at timestamptz, notes text NOT NULL DEFAULT '', created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS warranty_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), claim_id uuid NOT NULL REFERENCES warranty_claims(id) ON DELETE CASCADE, status text NOT NULL, note text NOT NULL DEFAULT '', actor_id uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_warranty_events_claim ON warranty_events(claim_id,created_at);
-- Returns & Refunds
CREATE TABLE IF NOT EXISTS return_requests(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), return_no text UNIQUE NOT NULL, customer_id uuid REFERENCES customers(id) ON DELETE SET NULL, order_id uuid REFERENCES orders(id) ON DELETE SET NULL, sale_id uuid REFERENCES sales(id) ON DELETE SET NULL, location_id uuid REFERENCES inventory_locations(id) ON DELETE SET NULL, status text NOT NULL DEFAULT 'Requested' CHECK(status IN ('Requested','Approved','Rejected','Received','Inspected','Refund Pending','Refunded','Restocked','Cancelled')), reason text NOT NULL, notes text NOT NULL DEFAULT '', refund_method text NOT NULL DEFAULT 'Original Payment', refund_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(refund_amount>=0), requested_by uuid REFERENCES users(id) ON DELETE SET NULL, approved_by uuid REFERENCES users(id) ON DELETE SET NULL, received_by uuid REFERENCES users(id) ON DELETE SET NULL, inspected_by uuid REFERENCES users(id) ON DELETE SET NULL, refunded_by uuid REFERENCES users(id) ON DELETE SET NULL, approved_at timestamptz, received_at timestamptz, inspected_at timestamptz, refunded_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), CHECK(order_id IS NOT NULL OR sale_id IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_returns_status ON return_requests(status,created_at DESC);
CREATE TABLE IF NOT EXISTS return_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), return_id uuid NOT NULL REFERENCES return_requests(id) ON DELETE CASCADE, variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT, order_line_id uuid REFERENCES order_lines(id) ON DELETE SET NULL, sale_line_id uuid REFERENCES sale_lines(id) ON DELETE SET NULL, serialized_unit_id uuid REFERENCES serialized_units(id) ON DELETE SET NULL, quantity numeric(18,3) NOT NULL CHECK(quantity>0), unit_price numeric(18,2) NOT NULL DEFAULT 0 CHECK(unit_price>=0), reason text NOT NULL DEFAULT '', condition text NOT NULL DEFAULT 'Unknown' CHECK(condition IN ('New','Good','Used','Damaged','Defective','Unknown')), disposition text NOT NULL DEFAULT 'Restock' CHECK(disposition IN ('Restock','Repair','Scrap','Return to Supplier','Quarantine')), refund_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(refund_amount>=0), restocked_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_return_lines_return ON return_lines(return_id);
CREATE TABLE IF NOT EXISTS refund_transactions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), refund_no text UNIQUE NOT NULL, return_id uuid NOT NULL REFERENCES return_requests(id) ON DELETE RESTRICT, amount numeric(18,2) NOT NULL CHECK(amount>0), method text NOT NULL CHECK(method IN ('Cash','Mobile Money','Card','Bank Transfer','Original Payment','Store Credit','Other')), reference text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'Completed' CHECK(status IN ('Pending','Completed','Failed','Reversed')), processed_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS return_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), return_id uuid NOT NULL REFERENCES return_requests(id) ON DELETE CASCADE, status text NOT NULL, note text NOT NULL DEFAULT '', actor_id uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_return_events_return ON return_events(return_id,created_at);
-- Document Management: durable database-backed uploads/downloads
CREATE TABLE IF NOT EXISTS documents(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), entity_type text NOT NULL DEFAULT 'General', entity_id uuid, name text NOT NULL, mime_type text NOT NULL, size_bytes bigint NOT NULL CHECK(size_bytes>0), description text NOT NULL DEFAULT '', visibility text NOT NULL DEFAULT 'Private' CHECK(visibility IN ('Private','Internal','Public')), checksum_sha256 text NOT NULL, storage text NOT NULL DEFAULT 'database' CHECK(storage='database'), created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_documents_entity ON documents(entity_type,entity_id,created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS uq_documents_checksum_entity ON documents(entity_type,entity_id,checksum_sha256);
CREATE TABLE IF NOT EXISTS document_blobs(
 document_id uuid PRIMARY KEY REFERENCES documents(id) ON DELETE CASCADE, data bytea NOT NULL
);

-- Security hardening: device-bound browser sessions and trusted-device MFA challenges
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS device_hash text;
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS user_agent_hash text;
CREATE INDEX IF NOT EXISTS idx_sessions_device_hash ON sessions(user_id,device_hash,revoked_at);
CREATE TABLE IF NOT EXISTS trusted_devices(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 device_hash text NOT NULL,
 label text NOT NULL DEFAULT '',
 first_seen_at timestamptz NOT NULL DEFAULT now(),
 last_seen_at timestamptz NOT NULL DEFAULT now(),
 last_ip text NOT NULL DEFAULT '',
 user_agent text NOT NULL DEFAULT '',
 revoked_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(user_id,device_hash)
);
CREATE INDEX IF NOT EXISTS idx_trusted_devices_user ON trusted_devices(user_id,revoked_at,last_seen_at DESC);

-- Account recovery and email delivery lifecycle
CREATE TABLE IF NOT EXISTS password_reset_tokens(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
 token_hash text UNIQUE NOT NULL,
 expires_at timestamptz NOT NULL,
 used_at timestamptz,
 requested_ip text NOT NULL DEFAULT '',
 user_agent text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_password_reset_user_created ON password_reset_tokens(user_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_password_reset_active ON password_reset_tokens(token_hash,used_at,expires_at);
CREATE TABLE IF NOT EXISTS email_delivery_logs(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid REFERENCES users(id) ON DELETE SET NULL,
 email text NOT NULL,
 purpose text NOT NULL,
 provider text NOT NULL DEFAULT 'resend',
 status text NOT NULL CHECK(status IN ('Queued','Sent','Failed','Skipped')),
 provider_message_id text NOT NULL DEFAULT '',
 error_message text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_email_delivery_created ON email_delivery_logs(created_at DESC);


-- Delivery & Logistics partner management and cost/unit tracking
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS partner_id uuid;
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS unit_count numeric(18,3) NOT NULL DEFAULT 0 CHECK(unit_count>=0);
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(unit_cost>=0);
ALTER TABLE delivery_shipments ADD COLUMN IF NOT EXISTS total_delivery_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(total_delivery_cost>=0);
CREATE TABLE IF NOT EXISTS delivery_partners(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 partner_type text NOT NULL DEFAULT 'Individual' CHECK(partner_type IN ('Individual','Company')),
 phone text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 address text NOT NULL DEFAULT '',
 service_area text NOT NULL DEFAULT '',
 default_unit_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(default_unit_cost>=0),
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$ BEGIN
 ALTER TABLE delivery_shipments ADD CONSTRAINT delivery_shipments_partner_fk FOREIGN KEY(partner_id) REFERENCES delivery_partners(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS idx_delivery_shipments_partner ON delivery_shipments(partner_id,status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_delivery_partners_status ON delivery_partners(status,name);

-- Warranty & Repairs partner management and complete external repair tracking
ALTER TABLE repair_jobs ADD COLUMN IF NOT EXISTS partner_id uuid;
ALTER TABLE repair_jobs ADD COLUMN IF NOT EXISTS item_description text NOT NULL DEFAULT '';
ALTER TABLE repair_jobs ADD COLUMN IF NOT EXISTS repair_location text NOT NULL DEFAULT '';
ALTER TABLE repair_jobs ADD COLUMN IF NOT EXISTS expected_return_at timestamptz;
ALTER TABLE repair_jobs ADD COLUMN IF NOT EXISTS external_reference text NOT NULL DEFAULT '';
ALTER TABLE repair_jobs ADD COLUMN IF NOT EXISTS partner_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(partner_cost>=0);
CREATE TABLE IF NOT EXISTS repair_partners(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 partner_type text NOT NULL DEFAULT 'Repair Centre' CHECK(partner_type IN ('Repair Centre','Technician','Authorized Service Centre')),
 phone text NOT NULL DEFAULT '',
 email text NOT NULL DEFAULT '',
 address text NOT NULL DEFAULT '',
 service_area text NOT NULL DEFAULT '',
 default_labor_cost numeric(18,2) NOT NULL DEFAULT 0 CHECK(default_labor_cost>=0),
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$ BEGIN
 ALTER TABLE repair_jobs ADD CONSTRAINT repair_jobs_partner_fk FOREIGN KEY(partner_id) REFERENCES repair_partners(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS idx_repair_jobs_partner ON repair_jobs(partner_id,status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_repair_partners_status ON repair_partners(status,name);

-- Security policy migration: tighten the legacy 30-minute inactivity default to 10 minutes once.
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM settings WHERE key='securityHardeningVersion') THEN
   UPDATE settings SET value_json='10'::jsonb WHERE key='idleTimeoutMinutes' AND value_json='30'::jsonb;
   INSERT INTO settings(key,value_json) VALUES('securityHardeningVersion','1'::jsonb) ON CONFLICT(key) DO NOTHING;
 END IF;
END $$;
CREATE TABLE IF NOT EXISTS credit_profiles(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL UNIQUE REFERENCES customers(id) ON DELETE CASCADE,
 credit_limit numeric(14,2) NOT NULL DEFAULT 0 CHECK(credit_limit>=0), risk_grade text NOT NULL DEFAULT 'Unrated', status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended','Closed')),
 notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS credit_applications(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), application_no text UNIQUE NOT NULL, customer_id uuid NOT NULL REFERENCES customers(id), requested_amount numeric(14,2) NOT NULL CHECK(requested_amount>0), approved_amount numeric(14,2), down_payment numeric(14,2) NOT NULL DEFAULT 0 CHECK(down_payment>=0), term_months int NOT NULL DEFAULT 1 CHECK(term_months>0), status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Rejected','Cancelled')),
 purpose text NOT NULL DEFAULT '', decision_note text NOT NULL DEFAULT '', applied_at timestamptz NOT NULL DEFAULT now(), decided_at timestamptz, decided_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS credit_accounts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), account_no text UNIQUE NOT NULL, application_id uuid NOT NULL UNIQUE REFERENCES credit_applications(id), customer_id uuid NOT NULL REFERENCES customers(id), principal numeric(14,2) NOT NULL CHECK(principal>0), outstanding_principal numeric(14,2) NOT NULL CHECK(outstanding_principal>=0), status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Paid','Defaulted','Restructured','Cancelled')), opened_at timestamptz NOT NULL DEFAULT now(), closed_at timestamptz
);
CREATE TABLE IF NOT EXISTS credit_installments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE, installment_no int NOT NULL, due_date date NOT NULL, principal_due numeric(14,2) NOT NULL DEFAULT 0, fee_due numeric(14,2) NOT NULL DEFAULT 0, penalty_due numeric(14,2) NOT NULL DEFAULT 0, paid_amount numeric(14,2) NOT NULL DEFAULT 0, status text NOT NULL DEFAULT 'Due' CHECK(status IN ('Due','Partially Paid','Paid','Overdue','Waived')), UNIQUE(credit_account_id,installment_no)
);
CREATE TABLE IF NOT EXISTS credit_payments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), receipt_no text UNIQUE NOT NULL, credit_account_id uuid NOT NULL REFERENCES credit_accounts(id), amount numeric(14,2) NOT NULL CHECK(amount>0), method text NOT NULL DEFAULT 'Cash', reference text NOT NULL DEFAULT '', paid_at timestamptz NOT NULL DEFAULT now(), received_by uuid REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS credit_payment_allocations(
 payment_id uuid NOT NULL REFERENCES credit_payments(id) ON DELETE CASCADE, installment_id uuid NOT NULL REFERENCES credit_installments(id) ON DELETE CASCADE, amount numeric(14,2) NOT NULL CHECK(amount>0), PRIMARY KEY(payment_id,installment_id)
);
CREATE TABLE IF NOT EXISTS credit_collection_tasks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE, assigned_to uuid REFERENCES users(id) ON DELETE SET NULL, due_at timestamptz, status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','In Progress','Resolved','Cancelled')), priority text NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Critical')), note text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(), resolved_at timestamptz
);
CREATE TABLE IF NOT EXISTS credit_restructures(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), credit_account_id uuid NOT NULL REFERENCES credit_accounts(id) ON DELETE CASCADE, old_balance numeric(14,2) NOT NULL, new_term_months int NOT NULL, new_installment_amount numeric(14,2) NOT NULL, reason text NOT NULL, approved_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_credit_installments_due ON credit_installments(due_date,status);
CREATE INDEX IF NOT EXISTS idx_credit_payments_account ON credit_payments(credit_account_id,paid_at);
CREATE TABLE IF NOT EXISTS finance_accounts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), code text UNIQUE NOT NULL, name text NOT NULL, account_type text NOT NULL CHECK(account_type IN ('Asset','Liability','Equity','Revenue','Expense')), parent_id uuid REFERENCES finance_accounts(id) ON DELETE SET NULL, active boolean NOT NULL DEFAULT true, system boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_periods(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, starts_on date NOT NULL, ends_on date NOT NULL, status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Closed')), closed_by uuid REFERENCES users(id) ON DELETE SET NULL, closed_at timestamptz
);
CREATE TABLE IF NOT EXISTS finance_journals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), journal_no text UNIQUE NOT NULL, journal_date date NOT NULL DEFAULT CURRENT_DATE, description text NOT NULL, source_type text NOT NULL DEFAULT 'Manual', source_id text, source_ref text UNIQUE, status text NOT NULL DEFAULT 'Posted' CHECK(status IN ('Draft','Posted','Voided')), created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_journal_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), journal_id uuid NOT NULL REFERENCES finance_journals(id) ON DELETE CASCADE, account_id uuid NOT NULL REFERENCES finance_accounts(id), description text NOT NULL DEFAULT '', debit numeric(14,2) NOT NULL DEFAULT 0 CHECK(debit>=0), credit numeric(14,2) NOT NULL DEFAULT 0 CHECK(credit>=0), customer_id uuid REFERENCES customers(id) ON DELETE SET NULL, supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL, CHECK((debit=0 AND credit>0) OR (credit=0 AND debit>0))
);
CREATE TABLE IF NOT EXISTS finance_cash_accounts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, account_type text NOT NULL DEFAULT 'Cash' CHECK(account_type IN ('Cash','Bank','Mobile Money')), currency text NOT NULL DEFAULT 'UGX', finance_account_id uuid REFERENCES finance_accounts(id), active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_tax_rates(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, rate numeric(7,4) NOT NULL CHECK(rate>=0), code text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true, effective_from date NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE IF NOT EXISTS finance_bank_transactions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), cash_account_id uuid NOT NULL REFERENCES finance_cash_accounts(id), transaction_date date NOT NULL, reference text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', amount numeric(14,2) NOT NULL, direction text NOT NULL CHECK(direction IN ('In','Out')), reconciled boolean NOT NULL DEFAULT false, matched_journal_id uuid REFERENCES finance_journals(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS finance_reconciliations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), cash_account_id uuid NOT NULL REFERENCES finance_cash_accounts(id), statement_date date NOT NULL, statement_balance numeric(14,2) NOT NULL, book_balance numeric(14,2) NOT NULL, difference numeric(14,2) NOT NULL, status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Reconciled')), reconciled_by uuid REFERENCES users(id) ON DELETE SET NULL, reconciled_at timestamptz
);
CREATE TABLE IF NOT EXISTS finance_sync_log(source_type text NOT NULL, source_id text NOT NULL, journal_id uuid NOT NULL REFERENCES finance_journals(id) ON DELETE CASCADE, created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(source_type,source_id));
CREATE INDEX IF NOT EXISTS idx_finance_journal_date ON finance_journals(journal_date);
CREATE INDEX IF NOT EXISTS idx_finance_lines_account ON finance_journal_lines(account_id);
CREATE TABLE IF NOT EXISTS bi_report_snapshots(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), report_key text NOT NULL, period_start date NOT NULL, period_end date NOT NULL, payload jsonb NOT NULL, generated_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_bi_snapshots_key_date ON bi_report_snapshots(report_key,period_end DESC);

-- AI Business Intelligence and Integration Hub
CREATE TABLE IF NOT EXISTS ai_configuration(
 id boolean PRIMARY KEY DEFAULT true,
 enabled boolean NOT NULL DEFAULT true,
 model text NOT NULL DEFAULT 'gemini-3.7-flash',
 system_prompt text NOT NULL DEFAULT 'You are Amaal Telecoms business intelligence assistant. Use only supplied business data. Be concise, factual, and explicit about uncertainty. Never invent transactions, customers, prices, stock or financial figures. Recommend actions but do not execute business mutations.',
 public_system_prompt text NOT NULL DEFAULT 'You are the Amaal Telecoms customer-facing assistant. Answer only from the supplied public catalog and approved public business information. Never reveal private, operational, financial, employee, customer or security information.',
 report_prompt text NOT NULL DEFAULT 'Produce an executive business report with: headline, key movements, risks, opportunities, actions and data-quality caveats. Quantify claims from the supplied data.',
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_training_examples(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, instruction text NOT NULL, expected_behavior text NOT NULL,
 active boolean NOT NULL DEFAULT true, created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_report_schedules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL UNIQUE, report_type text NOT NULL DEFAULT 'executive', cadence_minutes int NOT NULL DEFAULT 1440 CHECK(cadence_minutes>=15),
 enabled boolean NOT NULL DEFAULT true, last_run_at timestamptz, next_run_at timestamptz NOT NULL DEFAULT now(), recipients_json jsonb NOT NULL DEFAULT '[]'::jsonb,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS ai_generated_reports(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), report_type text NOT NULL, period_start date, period_end date, model text NOT NULL, title text NOT NULL DEFAULT 'Amaal Telecoms AI report',
 content text NOT NULL, data_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb, status text NOT NULL DEFAULT 'Completed' CHECK(status IN ('Completed','Failed')), error_message text NOT NULL DEFAULT '',
 generated_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_ai_reports_created ON ai_generated_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_training_active ON ai_training_examples(active,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_schedule_due ON ai_report_schedules(enabled,next_run_at);
INSERT INTO ai_configuration(id) VALUES(true) ON CONFLICT(id) DO NOTHING;
INSERT INTO ai_report_schedules(name,report_type,cadence_minutes,enabled,next_run_at) VALUES('Daily executive report','executive',1440,true,now()) ON CONFLICT(name) DO NOTHING;

CREATE TABLE IF NOT EXISTS integration_connections(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL UNIQUE, provider text NOT NULL, connection_type text NOT NULL DEFAULT 'REST', base_url text NOT NULL DEFAULT '',
 auth_type text NOT NULL DEFAULT 'None' CHECK(auth_type IN ('None','Bearer','API Key','Basic')), auth_header text NOT NULL DEFAULT 'Authorization', secret_encrypted text NOT NULL DEFAULT '', config_json jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Suspended','Error')), last_tested_at timestamptz, last_error text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS integration_webhooks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL UNIQUE, endpoint_key text NOT NULL UNIQUE, direction text NOT NULL DEFAULT 'Outbound' CHECK(direction IN ('Inbound','Outbound')),
 url text NOT NULL DEFAULT '', event_types jsonb NOT NULL DEFAULT '[]'::jsonb, secret_encrypted text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true,
 last_delivery_at timestamptz, last_status_code int, last_error text NOT NULL DEFAULT '', created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS integration_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), event_type text NOT NULL, source_module text NOT NULL, resource_type text, resource_id text, payload jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Recorded' CHECK(status IN ('Recorded','Delivered','Failed','Ignored')), created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS integration_deliveries(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), webhook_id uuid REFERENCES integration_webhooks(id) ON DELETE CASCADE, event_id uuid REFERENCES integration_events(id) ON DELETE CASCADE,
 status_code int, response_ms int, error_message text NOT NULL DEFAULT '', attempted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_integration_connections_status ON integration_connections(status,provider);
CREATE INDEX IF NOT EXISTS idx_integration_webhooks_active ON integration_webhooks(active,direction);
CREATE INDEX IF NOT EXISTS idx_integration_events_created ON integration_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_integration_deliveries_event ON integration_deliveries(event_id,attempted_at DESC);


-- Phase 23 procurement deep-build extensions. Additive only; never reset operational data.
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS qualification_status text NOT NULL DEFAULT 'Pending';
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS risk_rating text NOT NULL DEFAULT 'Unrated';
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS approved_at timestamptz;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS blocked_reason text NOT NULL DEFAULT '';
ALTER TABLE suppliers ADD COLUMN IF NOT EXISTS onboarding_completed_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_suppliers_qualification ON suppliers(qualification_status,risk_rating);

CREATE TABLE IF NOT EXISTS supplier_qualification_records(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 supplier_id uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Rejected','Expired')),
 risk_rating text NOT NULL DEFAULT 'Unrated' CHECK(risk_rating IN ('Unrated','Low','Medium','High','Critical')),
 registration_verified boolean NOT NULL DEFAULT false,
 tax_verified boolean NOT NULL DEFAULT false,
 bank_verified boolean NOT NULL DEFAULT false,
 documents_verified boolean NOT NULL DEFAULT false,
 notes text NOT NULL DEFAULT '',
 reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
 reviewed_at timestamptz,
 expires_at date,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_supplier_qualification_supplier ON supplier_qualification_records(supplier_id,created_at DESC);

CREATE TABLE IF NOT EXISTS procurement_approval_rules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 entity_type text NOT NULL CHECK(entity_type IN ('Requisition','PurchaseOrder','Invoice')),
 department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
 min_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(min_amount>=0),
 max_amount numeric(18,2),
 required_permission text NOT NULL DEFAULT 'procurement.approve',
 active boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(max_amount IS NULL OR max_amount>=min_amount)
);
CREATE INDEX IF NOT EXISTS idx_procurement_approval_rules ON procurement_approval_rules(entity_type,department_id,active,min_amount);

CREATE TABLE IF NOT EXISTS procurement_budgets(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
 starts_on date NOT NULL,
 ends_on date NOT NULL,
 amount numeric(18,2) NOT NULL CHECK(amount>=0),
 active boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 CHECK(ends_on>=starts_on)
);
CREATE INDEX IF NOT EXISTS idx_procurement_budgets_period ON procurement_budgets(department_id,starts_on,ends_on,active);

CREATE TABLE IF NOT EXISTS purchase_order_revisions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
 revision_number int NOT NULL CHECK(revision_number>0),
 reason text NOT NULL DEFAULT '',
 snapshot jsonb NOT NULL,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(purchase_order_id,revision_number)
);
CREATE INDEX IF NOT EXISTS idx_po_revisions_po ON purchase_order_revisions(purchase_order_id,revision_number DESC);

CREATE TABLE IF NOT EXISTS purchase_order_backorders(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 purchase_order_line_id uuid NOT NULL REFERENCES purchase_order_lines(id) ON DELETE CASCADE,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Fulfilled','Cancelled')),
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 resolved_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_po_backorders_line ON purchase_order_backorders(purchase_order_line_id,status);

CREATE TABLE IF NOT EXISTS supplier_payment_allocations(
 payment_id uuid NOT NULL REFERENCES supplier_payments(id) ON DELETE CASCADE,
 invoice_id uuid NOT NULL REFERENCES supplier_invoices(id) ON DELETE RESTRICT,
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(payment_id,invoice_id)
);
CREATE INDEX IF NOT EXISTS idx_supplier_payment_allocations_invoice ON supplier_payment_allocations(invoice_id);

CREATE TABLE IF NOT EXISTS procurement_invoice_match_exceptions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 invoice_id uuid NOT NULL REFERENCES supplier_invoices(id) ON DELETE CASCADE,
 exception_type text NOT NULL,
 field_name text NOT NULL DEFAULT '',
 expected_value text NOT NULL DEFAULT '',
 actual_value text NOT NULL DEFAULT '',
 tolerance numeric(18,4) NOT NULL DEFAULT 0,
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Resolved','Waived')),
 resolution text NOT NULL DEFAULT '',
 resolved_by uuid REFERENCES users(id) ON DELETE SET NULL,
 resolved_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_invoice_match_exceptions ON procurement_invoice_match_exceptions(invoice_id,status);


-- Additional Phase 23 lifecycle controls.
ALTER TABLE purchase_orders DROP CONSTRAINT IF EXISTS purchase_orders_status_check;
ALTER TABLE purchase_orders ADD CONSTRAINT purchase_orders_status_check CHECK(status IN ('Draft','Submitted','Approved','Partially Received','Received','Closed','Cancelled'));
ALTER TABLE purchase_orders ADD COLUMN IF NOT EXISTS supplier_reference text NOT NULL DEFAULT '';
ALTER TABLE supplier_product_pricing ADD COLUMN IF NOT EXISTS is_preferred boolean NOT NULL DEFAULT false;
ALTER TABLE supplier_documents ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'Pending';
ALTER TABLE supplier_documents ADD COLUMN IF NOT EXISTS verified_by uuid REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE supplier_documents ADD COLUMN IF NOT EXISTS verified_at timestamptz;
CREATE INDEX IF NOT EXISTS idx_supplier_documents_expiry ON supplier_documents(expires_at,verification_status);
-- Phase 24 Customers & CRM deep build
CREATE TABLE IF NOT EXISTS customer_tasks(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 title text NOT NULL, description text NOT NULL DEFAULT '',
 assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
 due_at timestamptz, priority text NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Critical')),
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','In Progress','Completed','Cancelled')),
 completed_at timestamptz, created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_tasks_customer ON customer_tasks(customer_id,status,due_at);
CREATE INDEX IF NOT EXISTS idx_customer_tasks_assignee ON customer_tasks(assigned_to,status,due_at);
CREATE TABLE IF NOT EXISTS customer_groups(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text UNIQUE NOT NULL, description text NOT NULL DEFAULT '',
 criteria jsonb NOT NULL DEFAULT '{}'::jsonb, active boolean NOT NULL DEFAULT true,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_group_members(
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 group_id uuid NOT NULL REFERENCES customer_groups(id) ON DELETE CASCADE,
 assigned_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(customer_id,group_id)
);
CREATE INDEX IF NOT EXISTS idx_customer_group_members_group ON customer_group_members(group_id,customer_id);
CREATE TABLE IF NOT EXISTS customer_merge_history(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), survivor_customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
 merged_customer_id uuid NOT NULL, merged_customer_no text NOT NULL, merged_snapshot jsonb NOT NULL,
 moved_counts jsonb NOT NULL DEFAULT '{}'::jsonb, reason text NOT NULL DEFAULT '',
 merged_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_merge_survivor ON customer_merge_history(survivor_customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS customer_notes(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 note text NOT NULL, visibility text NOT NULL DEFAULT 'Internal' CHECK(visibility IN ('Internal','Private')),
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_notes_customer ON customer_notes(customer_id,created_at DESC);

DO $$
DECLARE r record;
BEGIN
  -- PostgreSQL has no min(uuid) aggregate. Use row_number() to choose the
  -- deterministic oldest UUID value when repairing legacy duplicate defaults.
  FOR r IN
    SELECT customer_id, id AS keep_id
    FROM (
      SELECT customer_id, id,
             row_number() OVER (PARTITION BY customer_id ORDER BY id) AS rn,
             count(*) OVER (PARTITION BY customer_id) AS cnt
      FROM customer_addresses
      WHERE is_default
    ) d
    WHERE cnt > 1 AND rn = 1
  LOOP
    UPDATE customer_addresses
    SET is_default=false
    WHERE customer_id=r.customer_id AND id<>r.keep_id;
  END LOOP;

  FOR r IN
    SELECT customer_id, id AS keep_id
    FROM (
      SELECT customer_id, id,
             row_number() OVER (PARTITION BY customer_id ORDER BY id) AS rn,
             count(*) OVER (PARTITION BY customer_id) AS cnt
      FROM customer_contacts
      WHERE is_primary
    ) d
    WHERE cnt > 1 AND rn = 1
  LOOP
    UPDATE customer_contacts
    SET is_primary=false
    WHERE customer_id=r.customer_id AND id<>r.keep_id;
  END LOOP;
END $$;
CREATE UNIQUE INDEX IF NOT EXISTS uq_customer_primary_address ON customer_addresses(customer_id) WHERE is_default=true;
CREATE UNIQUE INDEX IF NOT EXISTS uq_customer_primary_contact ON customer_contacts(customer_id) WHERE is_primary=true;


-- Sales & POS deep-build extensions (safe, additive, preserves existing operational data)
ALTER TABLE sales DROP CONSTRAINT IF EXISTS sales_status_check;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM sales WHERE status IS NULL OR status NOT IN ('Draft','Suspended','Completed','Partially Paid','Paid','Cancelled','Voided','Reversed')) THEN
    ALTER TABLE sales ADD CONSTRAINT sales_status_check CHECK(status IN ('Draft','Suspended','Completed','Partially Paid','Paid','Cancelled','Voided','Reversed'));
  ELSE
    -- Preserve pre-existing operational rows instead of making startup fail. The
    -- application only writes the canonical statuses above.
    ALTER TABLE sales ADD CONSTRAINT sales_status_check CHECK(status IS NOT NULL AND length(trim(status)) > 0);
  END IF;
END $$;

ALTER TABLE sale_payments ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Completed';
ALTER TABLE sale_payments ADD COLUMN IF NOT EXISTS reversed_at timestamptz;
ALTER TABLE sale_payments ADD COLUMN IF NOT EXISTS reversed_by uuid REFERENCES users(id);
ALTER TABLE sale_payments DROP CONSTRAINT IF EXISTS sale_payments_status_check;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM sale_payments WHERE status IS NULL OR status NOT IN ('Pending','Completed','Failed','Refunded','Reversed')) THEN
    ALTER TABLE sale_payments ADD CONSTRAINT sale_payments_status_check CHECK(status IN ('Pending','Completed','Failed','Refunded','Reversed'));
  ELSE
    ALTER TABLE sale_payments ADD CONSTRAINT sale_payments_status_check CHECK(status IS NOT NULL AND length(trim(status)) > 0);
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS sales_controls(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 max_discount_percent numeric(8,4) NOT NULL DEFAULT 5 CHECK(max_discount_percent>=0),
 max_price_override_percent numeric(8,4) NOT NULL DEFAULT 0 CHECK(max_price_override_percent>=0),
 require_discount_approval boolean NOT NULL DEFAULT true,
 require_price_override_approval boolean NOT NULL DEFAULT true,
 updated_by uuid REFERENCES users(id),
 updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO sales_controls(id) VALUES('00000000-0000-0000-0000-000000000001')
ON CONFLICT(id) DO NOTHING;

CREATE TABLE IF NOT EXISTS sales_approvals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid REFERENCES sales(id) ON DELETE CASCADE,
 quote_id uuid,
 approval_type text NOT NULL CHECK(approval_type IN ('Discount','Price Override','Refund','Void','Cash Variance')),
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Approved','Rejected','Cancelled')),
 requested_by uuid NOT NULL REFERENCES users(id),
 approved_by uuid REFERENCES users(id),
 reason text NOT NULL DEFAULT '',
 requested_at timestamptz NOT NULL DEFAULT now(),
 approved_at timestamptz,
 metadata_json jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS idx_sales_approvals_sale ON sales_approvals(sale_id,status,requested_at DESC);

CREATE TABLE IF NOT EXISTS suspended_sales(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 hold_no text UNIQUE NOT NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 cashier_id uuid NOT NULL REFERENCES users(id),
 cart_json jsonb NOT NULL,
 notes text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Suspended' CHECK(status IN ('Suspended','Retrieved','Cancelled')),
 retrieved_at timestamptz,
 retrieved_by uuid REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_suspended_sales_status ON suspended_sales(status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_suspended_sales_cashier ON suspended_sales(cashier_id,status,created_at DESC);

CREATE TABLE IF NOT EXISTS till_shifts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 cashier_id uuid NOT NULL REFERENCES users(id),
 status text NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Closed','Reconciled')),
 opening_cash numeric(18,2) NOT NULL DEFAULT 0 CHECK(opening_cash>=0),
 expected_cash numeric(18,2) NOT NULL DEFAULT 0 CHECK(expected_cash>=0),
 actual_cash numeric(18,2) CHECK(actual_cash>=0),
 variance numeric(18,2),
 variance_reason text NOT NULL DEFAULT '',
 supervisor_id uuid REFERENCES users(id),
 opened_at timestamptz NOT NULL DEFAULT now(),
 closed_at timestamptz,
 reconciled_at timestamptz,
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_open_till_shift_cashier ON till_shifts(cashier_id) WHERE status='Open';
CREATE INDEX IF NOT EXISTS idx_till_shifts_location_date ON till_shifts(location_id,opened_at DESC);

CREATE TABLE IF NOT EXISTS till_cash_movements(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 shift_id uuid NOT NULL REFERENCES till_shifts(id) ON DELETE RESTRICT,
 movement_type text NOT NULL CHECK(movement_type IN ('Cash In','Cash Out','Float Top Up','Petty Cash')),
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 reason text NOT NULL,
 reference text NOT NULL DEFAULT '',
 actor_id uuid NOT NULL REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_till_cash_movements_shift ON till_cash_movements(shift_id,created_at);

CREATE TABLE IF NOT EXISTS sale_receipts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid NOT NULL UNIQUE REFERENCES sales(id) ON DELETE RESTRICT,
 receipt_no text UNIQUE NOT NULL,
 status text NOT NULL DEFAULT 'Issued' CHECK(status IN ('Issued','Cancelled')),
 issued_by uuid NOT NULL REFERENCES users(id),
 issued_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS receipt_reprints(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 receipt_id uuid NOT NULL REFERENCES sale_receipts(id) ON DELETE RESTRICT,
 reason text NOT NULL,
 authorized_by uuid NOT NULL REFERENCES users(id),
 reprinted_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_receipt_reprints_receipt ON receipt_reprints(receipt_id,reprinted_at DESC);

CREATE TABLE IF NOT EXISTS payment_reversals(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_payment_id uuid NOT NULL REFERENCES sale_payments(id) ON DELETE RESTRICT,
 sale_id uuid NOT NULL REFERENCES sales(id) ON DELETE RESTRICT,
 amount numeric(18,2) NOT NULL CHECK(amount>0),
 method text NOT NULL,
 reference text NOT NULL DEFAULT '',
 reason text NOT NULL,
 processed_by uuid NOT NULL REFERENCES users(id),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_payment_reversals_sale ON payment_reversals(sale_id,created_at DESC);

CREATE TABLE IF NOT EXISTS sales_quotes(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 quote_no text UNIQUE NOT NULL,
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 location_id uuid NOT NULL REFERENCES inventory_locations(id),
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Pending Approval','Approved','Expired','Converted','Cancelled')),
 subtotal numeric(18,2) NOT NULL DEFAULT 0 CHECK(subtotal>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 grand_total numeric(18,2) NOT NULL DEFAULT 0 CHECK(grand_total>=0),
 currency text NOT NULL DEFAULT 'UGX',
 valid_until date,
 notes text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 approved_by uuid REFERENCES users(id),
 converted_sale_id uuid REFERENCES sales(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sales_quote_lines(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 quote_id uuid NOT NULL REFERENCES sales_quotes(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0),
 unit_price numeric(18,2) NOT NULL CHECK(unit_price>=0),
 discount_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_amount>=0),
 tax_rate numeric(8,4) NOT NULL DEFAULT 0 CHECK(tax_rate>=0),
 tax_amount numeric(18,2) NOT NULL DEFAULT 0 CHECK(tax_amount>=0),
 line_total numeric(18,2) NOT NULL CHECK(line_total>=0)
);
CREATE INDEX IF NOT EXISTS idx_sales_quote_lines_quote ON sales_quote_lines(quote_id);
CREATE INDEX IF NOT EXISTS idx_sales_quotes_customer ON sales_quotes(customer_id,created_at DESC);

CREATE TABLE IF NOT EXISTS sales_order_links(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sales_id uuid NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
 order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(sales_id,order_id)
);

ALTER TABLE sales ADD COLUMN IF NOT EXISTS quote_id uuid REFERENCES sales_quotes(id) ON DELETE SET NULL;
ALTER TABLE sales ADD COLUMN IF NOT EXISTS order_id uuid REFERENCES orders(id) ON DELETE SET NULL;
ALTER TABLE sales ADD COLUMN IF NOT EXISTS till_shift_id uuid REFERENCES till_shifts(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_sales_quote ON sales(quote_id);
CREATE INDEX IF NOT EXISTS idx_sales_order ON sales(order_id);
CREATE INDEX IF NOT EXISTS idx_sales_till_shift ON sales(till_shift_id,created_at DESC);

-- Keep canonical procurement implementation unchanged.
-- purchase_requisitions is the only canonical procurement requisition entity.
