-- Amaal 2026 public catalogue taxonomy. Additive and idempotent. Never resets or deletes catalogue records.
BEGIN;

-- Entertainment → Audio → Portable speakers
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Portable speakers','entertainment-audio-portable-speakers','Portable Bluetooth speakers for everyday, travel and outdoor listening.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='entertainment-audio-portable-speakers') ON CONFLICT DO NOTHING;
UPDATE product_categories child SET parent_id=parent.id,status='Active',website_visibility='Published'
FROM product_categories parent WHERE parent.slug='audio' AND child.slug='entertainment-audio-portable-speakers';

-- Tablets
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Tablets','tablets','Portable screens for work, study, creativity and entertainment.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets') ON CONFLICT DO NOTHING;
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Apple iPad','tablets-ipad','Apple iPad families and configurations.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets-ipad') ON CONFLICT DO NOTHING;
INSERT INTO product_categories(name,slug,description,status,website_visibility)
SELECT 'Samsung Galaxy Tab','tablets-samsung-galaxy-tab','Samsung Galaxy Tab families and configurations.','Active','Published'
WHERE NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='tablets-samsung-galaxy-tab') ON CONFLICT DO NOTHING;
UPDATE product_categories child SET parent_id=parent.id,status='Active',website_visibility='Published'
FROM product_categories parent WHERE parent.slug='tablets' AND child.slug IN ('tablets-ipad','tablets-samsung-galaxy-tab');

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
UPDATE product_categories child SET parent_id=parent.id,status='Active',website_visibility='Published'
FROM product_categories parent WHERE parent.slug='accessories' AND child.slug IN ('accessories-phone','accessories-computer','accessories-tablet','accessories-audio','accessories-gaming');

COMMIT;
