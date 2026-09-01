-- PHASE 17 READ-ONLY PRODUCTION RECONCILIATION
-- This file intentionally contains SELECT statements only.
-- Do not use this file as an import/seed script.

SELECT current_database() AS database_name, current_schema() AS schema_name, version() AS postgres_version;

SELECT table_name
FROM information_schema.tables
WHERE table_schema='public'
ORDER BY table_name;

SELECT b.id, b.name, b.slug
FROM brands b
WHERE lower(trim(b.name)) IN ('global star','lg global star')
   OR lower(trim(b.slug)) IN ('global-star','lg-global-star','lg_global_star')
ORDER BY b.name;

SELECT p.id, p.name, p.slug, p.product_type, p.status, p.website_visibility,
       b.name AS brand_name
FROM products p
LEFT JOIN brands b ON b.id=p.brand_id
WHERE p.product_type ILIKE '%tv%'
   OR b.name ILIKE '%global star%'
ORDER BY b.name, p.name, p.slug;

SELECT b.name AS brand_name, p.slug, COUNT(*) AS product_count
FROM products p
LEFT JOIN brands b ON b.id=p.brand_id
GROUP BY b.name, p.slug
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC, b.name, p.slug;

SELECT lower(trim(COALESCE(b.name,''))) AS brand_key,
       lower(trim(COALESCE(p.model_number,p.name,''))) AS model_key,
       COUNT(*) AS duplicate_count
FROM products p
LEFT JOIN brands b ON b.id=p.brand_id
WHERE p.product_type ILIKE '%tv%'
GROUP BY lower(trim(COALESCE(b.name,''))), lower(trim(COALESCE(p.model_number,p.name,'')))
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, brand_key, model_key;

SELECT lower(trim(v.sku)) AS sku_key, COUNT(*) AS duplicate_count
FROM product_variants v
GROUP BY lower(trim(v.sku))
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, sku_key;

SELECT lower(trim(COALESCE(s.serial_number,''))) AS serial_key,
       COUNT(*) AS duplicate_count
FROM serialized_units s
WHERE COALESCE(s.serial_number,'') <> ''
GROUP BY lower(trim(s.serial_number))
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, serial_key;

SELECT lower(trim(COALESCE(s.imei1,''))) AS imei1_key,
       COUNT(*) AS duplicate_count
FROM serialized_units s
WHERE COALESCE(s.imei1,'') <> ''
GROUP BY lower(trim(s.imei1))
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, imei1_key;

SELECT lower(trim(COALESCE(s.imei2,''))) AS imei2_key,
       COUNT(*) AS duplicate_count
FROM serialized_units s
WHERE COALESCE(s.imei2,'') <> ''
GROUP BY lower(trim(s.imei2))
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC, imei2_key;

SELECT p.id AS product_id, p.name, p.slug,
       COUNT(DISTINCT su.id) AS serialized_units,
       COUNT(DISTINCT oi.id) AS order_items,
       COUNT(DISTINCT si.id) AS sale_items,
       COUNT(DISTINCT grl.id) AS goods_receipt_lines,
       COUNT(DISTINCT rr.id) AS returns,
       COUNT(DISTINCT wc.id) AS warranty_claims
FROM products p
LEFT JOIN serialized_units su ON su.variant_id IN (SELECT id FROM product_variants WHERE product_id=p.id)
LEFT JOIN order_items oi ON oi.variant_id IN (SELECT id FROM product_variants WHERE product_id=p.id)
LEFT JOIN sale_items si ON si.variant_id IN (SELECT id FROM product_variants WHERE product_id=p.id)
LEFT JOIN goods_receipt_lines grl ON grl.variant_id IN (SELECT id FROM product_variants WHERE product_id=p.id)
LEFT JOIN return_items rr ON rr.variant_id IN (SELECT id FROM product_variants WHERE product_id=p.id)
LEFT JOIN warranty_claims wc ON wc.variant_id IN (SELECT id FROM product_variants WHERE product_id=p.id)
WHERE p.product_type ILIKE '%tv%'
GROUP BY p.id,p.name,p.slug
ORDER BY p.name;

SELECT r.name AS role_name, COUNT(rp.permission_id) AS permission_count
FROM roles r
LEFT JOIN role_permissions rp ON rp.role_id=r.id
GROUP BY r.id,r.name
ORDER BY r.name;

SELECT u.id,u.name,u.email,u.status,r.name AS role_name
FROM users u
LEFT JOIN user_roles ur ON ur.user_id=u.id
LEFT JOIN roles r ON r.id=ur.role_id
ORDER BY u.name,r.name;
