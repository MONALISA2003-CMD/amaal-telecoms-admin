-- Amaal Phase 014 additive commerce completion. No destructive operations.
CREATE TABLE IF NOT EXISTS customer_access_tokens(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 token_hash text UNIQUE NOT NULL,
 expires_at timestamptz NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 last_used_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_customer_access_tokens_customer ON customer_access_tokens(customer_id,expires_at DESC);
CREATE INDEX IF NOT EXISTS idx_customer_access_tokens_expiry ON customer_access_tokens(expires_at);
CREATE TABLE IF NOT EXISTS search_events(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 query text NOT NULL,
 result_count int NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_search_events_created ON search_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_events_query ON search_events(lower(query));
CREATE TABLE IF NOT EXISTS abandoned_carts(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL DEFAULT '',
 phone text NOT NULL DEFAULT '',
 items jsonb NOT NULL DEFAULT '[]'::jsonb,
 subtotal numeric(18,2) NOT NULL DEFAULT 0,
 last_seen_at timestamptz NOT NULL DEFAULT now(),
 recovered_at timestamptz
);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_last_seen ON abandoned_carts(last_seen_at DESC);

CREATE TABLE IF NOT EXISTS customer_notifications(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 title text NOT NULL, body text NOT NULL DEFAULT '', read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_customer_notifications_customer ON customer_notifications(customer_id,created_at DESC);
CREATE TABLE IF NOT EXISTS customer_wishlist_items(
 customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(customer_id,product_id)
);
CREATE INDEX IF NOT EXISTS idx_customer_wishlist_customer ON customer_wishlist_items(customer_id,created_at DESC);
