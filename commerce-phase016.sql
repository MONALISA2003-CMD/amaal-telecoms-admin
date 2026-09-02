-- AMAAL PHASE 016 COMMERCE CORE
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- Additive, idempotent and backward compatible. Never resets or deletes existing data.
CREATE TABLE IF NOT EXISTS commerce_carts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 guest_token_hash text UNIQUE,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Converted','Abandoned')),
 currency text NOT NULL DEFAULT 'UGX',
 expires_at timestamptz NOT NULL DEFAULT now()+interval '30 days',
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(customer_id IS NOT NULL OR guest_token_hash IS NOT NULL)
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_commerce_carts_customer_active ON commerce_carts(customer_id) WHERE customer_id IS NOT NULL AND status='Active';
CREATE INDEX IF NOT EXISTS idx_commerce_carts_guest ON commerce_carts(guest_token_hash) WHERE guest_token_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_commerce_carts_updated ON commerce_carts(updated_at DESC);

CREATE TABLE IF NOT EXISTS commerce_cart_items(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 cart_id uuid NOT NULL REFERENCES commerce_carts(id) ON DELETE CASCADE,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
 quantity numeric(18,3) NOT NULL CHECK(quantity>0 AND quantity<=100),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(cart_id,variant_id)
);
CREATE INDEX IF NOT EXISTS idx_commerce_cart_items_cart ON commerce_cart_items(cart_id,updated_at DESC);

CREATE TABLE IF NOT EXISTS product_attributes(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 attribute_key text NOT NULL,
 attribute_value text NOT NULL DEFAULT '',
 unit text NOT NULL DEFAULT '',
 searchable boolean NOT NULL DEFAULT true,
 active boolean NOT NULL DEFAULT true,
 sort_order int NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(product_id,attribute_key)
);
CREATE INDEX IF NOT EXISTS idx_product_attributes_key_value ON product_attributes(lower(attribute_key),lower(attribute_value));
CREATE INDEX IF NOT EXISTS idx_product_attributes_product ON product_attributes(product_id,active,sort_order,attribute_key);

CREATE TABLE IF NOT EXISTS search_synonyms(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 term text UNIQUE NOT NULL,
 synonyms text[] NOT NULL DEFAULT '{}',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS review_helpful_votes(
 review_id uuid NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
 voter_key text NOT NULL,
 helpful boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(review_id,voter_key)
);
CREATE INDEX IF NOT EXISTS idx_review_helpful_review ON review_helpful_votes(review_id,helpful);

CREATE TABLE IF NOT EXISTS product_price_alerts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 email text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 target_price numeric(18,2),
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Triggered','Cancelled')),
 created_at timestamptz NOT NULL DEFAULT now(),
 triggered_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_product_price_alerts_product ON product_price_alerts(product_id,status,created_at DESC);

CREATE TABLE IF NOT EXISTS product_stock_alerts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 variant_id uuid NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
 email text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Triggered','Cancelled')),
 created_at timestamptz NOT NULL DEFAULT now(),
 triggered_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_product_stock_alerts_variant ON product_stock_alerts(variant_id,status,created_at DESC);

CREATE TABLE IF NOT EXISTS saved_searches(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
 guest_key text,
 query text NOT NULL,
 filters jsonb NOT NULL DEFAULT '{}'::jsonb,
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Paused','Cancelled')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(customer_id IS NOT NULL OR guest_key IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_saved_searches_customer ON saved_searches(customer_id,status,updated_at DESC);

CREATE TABLE IF NOT EXISTS commerce_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
 guest_key text,
 event_type text NOT NULL,
 product_id uuid REFERENCES products(id) ON DELETE SET NULL,
 variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL,
 query text NOT NULL DEFAULT '',
 metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_commerce_events_type_created ON commerce_events(event_type,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commerce_events_product ON commerce_events(product_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_commerce_events_guest ON commerce_events(guest_key,created_at DESC) WHERE guest_key IS NOT NULL;

INSERT INTO search_synonyms(term,synonyms) VALUES
 ('iphone',ARRAY['i phone','apple phone']),
 ('samsung',ARRAY['sam sung']),
 ('tv',ARRAY['television','smart tv']),
 ('fridge',ARRAY['refrigerator']),
 ('phone',ARRAY['smartphone','mobile phone']),
 ('laptop',ARRAY['notebook'])
ON CONFLICT(term) DO NOTHING;

-- Backfill only missing top-level attributes from existing verified specification JSON.
-- Existing normalized attributes always win; nothing is deleted or overwritten.
INSERT INTO product_attributes(product_id,attribute_key,attribute_value,sort_order)
SELECT p.id, left(trim(k),120), left(trim(v),500), row_number() OVER (PARTITION BY p.id ORDER BY k)::int
FROM products p
CROSS JOIN LATERAL jsonb_each_text(CASE WHEN jsonb_typeof(p.specifications)='object' THEN p.specifications ELSE '{}'::jsonb END) e(k,v)
WHERE trim(k)<>'' AND trim(v)<>''
ON CONFLICT(product_id,attribute_key) DO NOTHING;

CREATE TABLE IF NOT EXISTS product_compatibility_rules(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 source_product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 source_variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL,
 target_product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 target_variant_id uuid REFERENCES product_variants(id) ON DELETE SET NULL,
 relation_type text NOT NULL DEFAULT 'Compatible' CHECK(relation_type IN ('Compatible','Accessory','Replacement','Required')),
 confidence text NOT NULL DEFAULT 'Verified' CHECK(confidence IN ('Verified','Model-confirmed','General','Unknown')),
 notes text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CHECK(source_product_id<>target_product_id OR COALESCE(source_variant_id::text,'')<>COALESCE(target_variant_id::text,''))
);
CREATE UNIQUE INDEX IF NOT EXISTS ux_product_compatibility_rule ON product_compatibility_rules(source_product_id,COALESCE(source_variant_id,'00000000-0000-0000-0000-000000000000'::uuid),target_product_id,COALESCE(target_variant_id,'00000000-0000-0000-0000-000000000000'::uuid),relation_type);
CREATE INDEX IF NOT EXISTS idx_product_compatibility_source ON product_compatibility_rules(source_product_id,status,relation_type);
CREATE INDEX IF NOT EXISTS idx_product_compatibility_target ON product_compatibility_rules(target_product_id,status);
