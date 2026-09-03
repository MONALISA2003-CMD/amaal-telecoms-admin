-- Amaal 2026 public catalogue taxonomy. Additive and idempotent. Never resets or deletes catalogue records.
BEGIN;

-- Entertainment → Audio → Portable speakers
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Portable speakers','entertainment-audio-portable-speakers','Portable Bluetooth speakers for everyday, travel and outdoor listening.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories c WHERE c.name='Portable speakers' AND c.parent_id IS NOT NULL) ON CONFLICT DO NOTHING;
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='audio' LIMIT 1),
    status='Active', website_visibility='Published', updated_at=now()
WHERE slug='entertainment-audio-portable-speakers'
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='audio');

-- Tablets
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Tablets','tablets','Portable screens for work, study, creativity and entertainment.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets') AND NOT EXISTS (SELECT 1 FROM product_categories WHERE lower(name)=lower('Tablets') AND parent_id IS NULL) ON CONFLICT DO NOTHING;
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Apple iPad','tablets-ipad','Apple iPad families and configurations.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets-ipad') AND NOT EXISTS (SELECT 1 FROM product_categories WHERE lower(name)=lower('Apple iPad')) ON CONFLICT DO NOTHING;
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Samsung Galaxy Tab','tablets-samsung-galaxy-tab','Samsung Galaxy Tab families and configurations.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets-samsung-galaxy-tab') AND NOT EXISTS (SELECT 1 FROM product_categories WHERE lower(name)=lower('Samsung Galaxy Tab')) ON CONFLICT DO NOTHING;
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='tablets' LIMIT 1),
    status='Active', website_visibility='Published', updated_at=now()
WHERE slug IN ('tablets-ipad','tablets-samsung-galaxy-tab')
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets');

-- Accessories and useful device-specific groupings
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Accessories','accessories','Useful additions for phones, computers, tablets, audio and gaming.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='accessories') ON CONFLICT DO NOTHING;
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT x.name,x.slug,x.description,'Active','Published' FROM (VALUES
 ('Phone Accessories','accessories-phone','Charging, protection and everyday phone essentials.'),
 ('Computer Accessories','accessories-computer','Keyboards, mice, hubs, webcams and laptop essentials.'),
 ('Tablet Accessories','accessories-tablet','Pens, keyboards, cases and tablet productivity essentials.'),
 ('Audio Accessories','accessories-audio','Useful additions for speakers and listening setups.'),
 ('Gaming Accessories','accessories-gaming','Peripherals and setup essentials for PC gaming.')
) x(name,slug,description)
WHERE NOT EXISTS (SELECT 1 FROM product_categories c WHERE c.slug=x.slug) ON CONFLICT DO NOTHING;
UPDATE product_categories
SET parent_id=(SELECT id FROM product_categories WHERE slug='accessories' LIMIT 1),
    status='Active', website_visibility='Published', updated_at=now()
WHERE slug IN ('accessories-phone','accessories-computer','accessories-tablet','accessories-audio','accessories-gaming')
  AND EXISTS (SELECT 1 FROM product_categories WHERE slug='accessories');

COMMIT;
