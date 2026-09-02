-- Amaal category hierarchy hardening. Additive/idempotent. No reset/delete/truncate.
BEGIN;
-- Audio belongs to Entertainment; audio product types belong to Audio.
UPDATE product_categories child SET parent_id=parent.id, status='Active', website_visibility='Published'
FROM product_categories parent WHERE parent.slug='entertainment' AND child.slug='audio';
UPDATE product_categories child SET parent_id=parent.id, status='Active', website_visibility='Published'
FROM product_categories parent WHERE parent.slug='audio' AND child.slug IN ('audio-woofers','audio-party-speakers','audio-sound-towers');
UPDATE product_categories child SET parent_id=parent.id, status='Active', website_visibility='Published'
FROM product_categories parent WHERE parent.slug='audio' AND child.slug IN ('entertainment-audio-woofers','entertainment-audio-party-speakers','entertainment-audio-sound-towers');
-- Keep legacy duplicate category records hidden rather than deleting them.
UPDATE product_categories SET status='Inactive', website_visibility='Hidden' WHERE slug IN ('audio-woofers','audio-party-speakers','audio-sound-towers');
-- Computers: Laptops / Desktops / AIO are children of Computers.
UPDATE product_categories child SET parent_id=parent.id, status='Active', website_visibility='Published'
FROM product_categories parent WHERE parent.slug='computers' AND child.slug IN ('computers-laptops','computers-desktops','computers-all-in-one','computers-gaming-laptops');
UPDATE product_categories child SET parent_id=parent.id, status='Active', website_visibility='Published'
FROM product_categories parent WHERE parent.slug='computers-laptops' AND child.slug IN ('computers-laptops-hp','computers-laptops-lenovo','computers-laptops-apple');
UPDATE product_categories child SET parent_id=parent.id, status='Active', website_visibility='Published'
FROM product_categories parent WHERE parent.slug='computers-desktops' AND child.slug='computers-desktops-brands';
-- Gaming laptops are a Computers/Laptops specialization, not a separate commerce entity.
UPDATE product_categories child SET parent_id=parent.id WHERE parent.slug='computers-laptops' AND child.slug='computers-gaming-laptops';
COMMIT;
