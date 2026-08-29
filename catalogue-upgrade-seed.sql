-- Amaal catalogue starter structure. Safe to run repeatedly; does not clear or reset existing records.
BEGIN;
INSERT INTO catalog_collections(name,slug,description,status,website_visibility,featured,sort_order)
VALUES
('New Arrivals','new-arrivals','Recently added products.','Active','Published',true,10),
('Best Sellers','best-sellers','Products customers buy most often.','Active','Published',true,20),
('Featured','featured','Products selected by Amaal for special visibility.','Active','Published',true,30),
('Deals','deals','Current offers and promotional products.','Active','Published',true,40),
('Premium Phones','premium-phones','Premium phones and flagship devices.','Active','Published',false,50),
('Smart TVs','smart-tvs','Smart televisions across supported screen sizes.','Active','Published',false,60)
ON CONFLICT(slug) DO NOTHING;
COMMIT;
