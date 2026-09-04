-- Amaal production pricing alignment, 2026-09-04.
-- Non-destructive: updates only existing product_variants by stable UUID + SKU.
-- Values are the already-approved Amaal homepage offer prices.
-- Inventory/location data is intentionally NOT fabricated here.
BEGIN;
UPDATE product_variants SET selling_price=3500000, updated_at=now() WHERE id='33361077-b810-4e47-a727-6cb3e4e2e9a5' AND sku='iphone-16-pro-max-256gb';
UPDATE product_variants SET selling_price=1800000, updated_at=now() WHERE id='007a6e5c-0dd6-4e7d-a36c-849b6ae2b2e5' AND sku='google-pixel-9-256gb-12gb';
UPDATE product_variants SET selling_price=700000, updated_at=now() WHERE id='4c3c6397-6986-436b-8645-e24d4e6b99b2' AND sku='samsung-galaxy-a17-128gb-4gb';
UPDATE product_variants SET selling_price=5500000, updated_at=now() WHERE id='c689f6be-2703-4c7a-8009-6c1331acc4fd' AND sku='google-pixel-11-pro-xl-256gb-12gb';
UPDATE product_variants SET selling_price=6000000, updated_at=now() WHERE id='81053a40-bccf-4f54-88b3-fe547ce5256b' AND sku='google-pixel-11-pro-xl-512gb-16gb';
UPDATE product_variants SET selling_price=6000000, updated_at=now() WHERE id='10eaf439-0762-43bd-b279-22f5ae38ed12' AND sku='samsung-galaxy-z-fold8-256gb-12gb';
UPDATE product_variants SET selling_price=6180000, updated_at=now() WHERE id='f3e60db5-f4c1-4fb3-a774-968e2dbebec9' AND sku='samsung-galaxy-z-fold8-512gb-12gb';
UPDATE product_variants SET selling_price=6450000, updated_at=now() WHERE id='fd30e651-48a3-417e-8247-ba60b5ddd65a' AND sku='samsung-galaxy-z-fold8-ultra-256gb-12gb';
UPDATE product_variants SET selling_price=6900000, updated_at=now() WHERE id='c1986f87-3cd8-431f-ab8f-4f56fbd48ed4' AND sku='samsung-galaxy-z-fold8-ultra-512gb-12gb';
UPDATE product_variants SET selling_price=8600000, updated_at=now() WHERE id='9e0a3d9e-9c15-415d-8096-6aeb3a1a67dd' AND sku='samsung-galaxy-z-fold8-ultra-1tb-16gb';
UPDATE product_variants SET selling_price=1350000, updated_at=now() WHERE id='20576407-f7fc-40b3-8cf8-9da68adf9a0c' AND sku='tecno-camon-50-pro-5g-4g-256gb-8gb';
UPDATE product_variants SET selling_price=1200000, updated_at=now() WHERE id='0c18791b-fdf0-4793-810e-06c2fef2e84e' AND sku='TCL-50-INCH-TV';
UPDATE product_variants SET selling_price=3500000, updated_at=now() WHERE id='10f1c55e-d5eb-4fb8-adce-fffa7acfb6d9' AND sku='TCL-75-INCH-TV';
COMMIT;
