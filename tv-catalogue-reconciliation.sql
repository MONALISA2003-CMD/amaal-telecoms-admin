-- Amaal Telecoms: TV catalogue reconciliation report
-- READ ONLY. Run against the existing production database before any cleanup.
-- This script never mutates data.

SELECT b.name AS brand, COUNT(*)::int AS tv_products
FROM products p JOIN brands b ON b.id=p.brand_id
WHERE p.product_type='TV'
GROUP BY b.name ORDER BY b.name;

SELECT p.id,p.name,p.slug,b.name AS brand,p.status,p.website_visibility
FROM products p LEFT JOIN brands b ON b.id=p.brand_id
WHERE p.product_type='TV' AND (lower(b.name)='lg global star' OR lower(b.name) NOT IN ('tcl','hisense','chiq','samsung','lg','global star','black ark'))
ORDER BY b.name,p.name;

SELECT lower(trim(COALESCE(p.specifications->>'manufacturer_model',p.name))) AS model_identity,
       COUNT(*)::int AS records, ARRAY_AGG(p.id ORDER BY p.updated_at DESC) AS product_ids
FROM products p
WHERE p.product_type='TV'
GROUP BY lower(trim(COALESCE(p.specifications->>'manufacturer_model',p.name)))
HAVING COUNT(*)>1
ORDER BY records DESC,model_identity;

SELECT p.slug, COUNT(*)::int AS records, ARRAY_AGG(p.id) AS product_ids
FROM products p WHERE p.product_type='TV' GROUP BY p.slug HAVING COUNT(*)>1;

SELECT v.sku, COUNT(*)::int AS records, ARRAY_AGG(v.id) AS variant_ids
FROM product_variants v JOIN products p ON p.id=v.product_id
WHERE p.product_type='TV' GROUP BY v.sku HAVING COUNT(*)>1;
