-- Amaal catalogue management upgrade.
-- Additive only: no reset, truncate, delete-all or inventory changes.
BEGIN;
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '';
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS banner_url text NOT NULL DEFAULT '';
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS website_visibility text NOT NULL DEFAULT 'Published' CHECK (website_visibility IN ('Published','Hidden'));
ALTER TABLE product_categories ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '';
ALTER TABLE brands ADD COLUMN IF NOT EXISTS banner_url text NOT NULL DEFAULT '';
ALTER TABLE brands ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS website_visibility text NOT NULL DEFAULT 'Published' CHECK (website_visibility IN ('Published','Hidden'));
ALTER TABLE brands ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;
CREATE TABLE IF NOT EXISTS catalog_collections(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 name text NOT NULL,
 slug text UNIQUE NOT NULL,
 description text NOT NULL DEFAULT '',
 image_url text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'Active' CHECK(status IN ('Active','Inactive','Archived')),
 website_visibility text NOT NULL DEFAULT 'Hidden' CHECK(website_visibility IN ('Published','Hidden')),
 featured boolean NOT NULL DEFAULT false,
 sort_order integer NOT NULL DEFAULT 0,
 seo_title text NOT NULL DEFAULT '',
 seo_description text NOT NULL DEFAULT '',
 created_by uuid REFERENCES users(id) ON DELETE SET NULL,
 updated_by uuid REFERENCES users(id) ON DELETE SET NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_catalog_collections_status ON catalog_collections(status,website_visibility,sort_order);
CREATE TABLE IF NOT EXISTS catalog_collection_products(
 collection_id uuid NOT NULL REFERENCES catalog_collections(id) ON DELETE CASCADE,
 product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
 sort_order integer NOT NULL DEFAULT 0,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(collection_id,product_id)
);
CREATE INDEX IF NOT EXISTS idx_collection_products_product ON catalog_collection_products(product_id);
COMMIT;
