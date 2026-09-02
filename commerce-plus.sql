-- AMAAL COMMERCE PLUS — additive, idempotent only. Never resets or deletes existing data.
CREATE TABLE IF NOT EXISTS product_reviews(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
 customer_name text NOT NULL DEFAULT '',
 customer_email text NOT NULL DEFAULT '',
 rating integer NOT NULL CHECK(rating BETWEEN 1 AND 5),
 title text NOT NULL DEFAULT '',
 body text NOT NULL DEFAULT '',
 verified_purchase boolean NOT NULL DEFAULT false,
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Published','Rejected')),
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_status ON product_reviews(product_id,status,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_reviews_order ON product_reviews(order_id);

CREATE TABLE IF NOT EXISTS product_questions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
 customer_name text NOT NULL DEFAULT '',
 customer_email text NOT NULL DEFAULT '',
 question text NOT NULL,
 answer text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Pending' CHECK(status IN ('Pending','Answered','Rejected')),
 answered_by uuid REFERENCES users(id) ON DELETE SET NULL,
 answered_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_product_questions_product_status ON product_questions(product_id,status,created_at DESC);

CREATE INDEX IF NOT EXISTS idx_products_public_search ON products USING gin(to_tsvector('simple',coalesce(name,'')||' '||coalesce(short_description,'')||' '||coalesce(description,'')));
