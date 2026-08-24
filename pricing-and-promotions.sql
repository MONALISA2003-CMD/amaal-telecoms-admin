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
