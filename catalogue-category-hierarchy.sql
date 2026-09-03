-- Amaal category hierarchy hardening. Additive/idempotent. No reset/delete/truncate.
BEGIN;
-- Audio belongs to Entertainment; canonical audio product types belong to Audio.
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='entertainment' LIMIT 1),
    status='Active',
    website_visibility='Published',
    updated_at=now()
WHERE slug='audio'
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='entertainment');

-- Audio category names are canonicalized by audio-catalogue-seed.sql.
-- Only reparent the canonical slugs here. Legacy records remain hidden and
-- are never moved back into the live taxonomy.
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='audio' LIMIT 1),
    status='Active',
    website_visibility='Published',
    updated_at=now()
WHERE slug IN (
    'entertainment-audio-woofers',
    'entertainment-audio-party-speakers',
    'entertainment-audio-sound-towers'
  )
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='audio');

-- Computers: Laptops / Desktops / AIO are children of Computers.
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='computers' LIMIT 1),
    status='Active', website_visibility='Published', updated_at=now()
WHERE slug IN ('computers-laptops','computers-desktops','computers-all-in-one','computers-gaming-laptops')
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='computers');
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='computers-laptops' LIMIT 1),
    status='Active', website_visibility='Published', updated_at=now()
WHERE slug IN ('computers-laptops-hp','computers-laptops-lenovo','computers-laptops-apple')
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='computers-laptops');
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='computers-desktops' LIMIT 1),
    status='Active', website_visibility='Published', updated_at=now()
WHERE slug='computers-desktops-brands'
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='computers-desktops');
-- Gaming laptops are a Computers/Laptops specialization, not a separate commerce entity.
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='computers-laptops' LIMIT 1),
    updated_at=now()
WHERE slug='computers-gaming-laptops'
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='computers-laptops');
COMMIT;
