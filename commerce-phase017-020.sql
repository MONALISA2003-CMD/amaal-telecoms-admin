-- AMAAL PHASE 017-020: discovery, growth, trust and after-sales completion
-- Additive, idempotent and non-destructive. Payment intentionally excluded.
CREATE TABLE IF NOT EXISTS product_bundles(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL, slug text UNIQUE NOT NULL, description text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Active','Inactive','Archived')),
 discount_type text NOT NULL DEFAULT 'None' CHECK(discount_type IN ('None','Percent','Fixed')),
 discount_value numeric(18,2) NOT NULL DEFAULT 0 CHECK(discount_value>=0),
 starts_at timestamptz, ends_at timestamptz,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS product_bundle_items(
 bundle_id uuid NOT NULL REFERENCES product_bundles(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL DEFAULT 1 CHECK(quantity>0),
 sort_order int NOT NULL DEFAULT 0,
 PRIMARY KEY(bundle_id,variant_id)
);
CREATE INDEX IF NOT EXISTS idx_product_bundles_status ON product_bundles(status,starts_at,ends_at);
CREATE INDEX IF NOT EXISTS idx_product_bundle_items_variant ON product_bundle_items(variant_id,bundle_id);

CREATE TABLE IF NOT EXISTS customer_loyalty_accounts(
 customer_id uuid PRIMARY KEY REFERENCES customers(id) ON DELETE CASCADE,
 points_balance bigint NOT NULL DEFAULT 0 CHECK(points_balance>=0),
 tier text NOT NULL DEFAULT 'Member' CHECK(tier IN ('Member','Plus','Premier')),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS customer_loyalty_ledger(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
 points bigint NOT NULL CHECK(points<>0), reason text NOT NULL, reference_type text NOT NULL DEFAULT '', reference_id uuid,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_loyalty_ledger_customer ON customer_loyalty_ledger(customer_id,created_at DESC);

CREATE TABLE IF NOT EXISTS product_registrations(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT, serial_number text NOT NULL DEFAULT '',
 purchase_order_id uuid REFERENCES orders(id) ON DELETE SET NULL, purchase_date date,
 status text NOT NULL DEFAULT 'Registered' CHECK(status IN ('Registered','Pending Review','Cancelled')),
 notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(customer_id,variant_id,serial_number)
);
CREATE INDEX IF NOT EXISTS idx_product_registrations_customer ON product_registrations(customer_id,created_at DESC);

CREATE TABLE IF NOT EXISTS customer_store_credit_ledger(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
 amount numeric(18,2) NOT NULL CHECK(amount<>0), reason text NOT NULL, reference_type text NOT NULL DEFAULT '', reference_id uuid,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_store_credit_customer ON customer_store_credit_ledger(customer_id,created_at DESC);

CREATE TABLE IF NOT EXISTS customer_support_messages(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), case_id uuid NOT NULL REFERENCES support_cases(id) ON DELETE CASCADE,
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL, author_type text NOT NULL CHECK(author_type IN ('Customer','Staff')),
 body text NOT NULL, created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_support_messages_case ON customer_support_messages(case_id,created_at);

CREATE TABLE IF NOT EXISTS buying_guides(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, title text NOT NULL, excerpt text NOT NULL DEFAULT '', body text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Draft' CHECK(status IN ('Draft','Published','Archived')), featured boolean NOT NULL DEFAULT false,
 created_by uuid REFERENCES users(id) ON DELETE SET NULL, updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_buying_guides_public ON buying_guides(status,featured,updated_at DESC);
