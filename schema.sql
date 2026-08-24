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


-- Phase 1B: international administration and security foundation
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


-- Phase 2: Product catalog foundation for phones, TVs, appliances, electronics and accessories
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
 movement_type text NOT NULL CHECK(movement_type IN ('RECEIPT','ADJUSTMENT_IN','ADJUSTMENT_OUT','TRANSFER_OUT','TRANSFER_IN','RESERVE','RELEASE','SALE','RETURN','DAMAGE','LOSS')),
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
