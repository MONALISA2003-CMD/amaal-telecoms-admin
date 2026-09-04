-- Amaal master catalogue integration: non-destructive, no inventory or SKU fabrication.

-- New products without authoritative SKUs are inserted as Active/Hidden with no variants.

BEGIN;

DO $$
DECLARE
  brand_name text;
  brand_slug text;
  cat_id uuid;
BEGIN
  FOREACH brand_name IN ARRAY ARRAY['Samsung','Apple','Google Pixel','JBL','Harman Kardon'] LOOP
    brand_slug := CASE brand_name
      WHEN 'Google Pixel' THEN 'google-pixel'
      WHEN 'Harman Kardon' THEN 'harman-kardon'
      ELSE lower(regexp_replace(brand_name,'[^a-zA-Z0-9]+','-','g'))
    END;
    INSERT INTO brands(name,slug,status) VALUES (brand_name,brand_slug,'Active')
    ON CONFLICT(name) DO UPDATE SET status='Active', updated_at=now();
  END LOOP;

  IF NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='phones') THEN
    INSERT INTO product_categories(name,slug,status,website_visibility)
    VALUES ('Phones','phones','Active','Published')
    ON CONFLICT(slug) DO NOTHING;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM product_categories WHERE slug='audio') THEN
    INSERT INTO product_categories(name,slug,status,website_visibility)
    VALUES ('Audio','audio','Active','Published')
    ON CONFLICT(slug) DO NOTHING;
  END IF;
END $$;

UPDATE products
SET name='Galaxy A07',
    short_description='Large display · 50MP main camera',
    description='The Galaxy A07 brings the Samsung experience into a beautifully accessible package. Designed for everyday life, it combines a generous display, capable photography and dependable battery endurance with the familiar refinement of the Galaxy ecosystem.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "4G LTE; Android; Samsung ecosystem", "Quick Specs": ["Large display", "50MP main camera", "5,000mAh-class battery", "Dual SIM", "extended storage", "long-lasting battery"], "_amaal_master_price": 470000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-a07';

UPDATE product_variants v
SET selling_price=470000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-a07'
  AND v.status='Active' AND lower(v.storage)=lower('64GB') AND lower(v.variant_name) LIKE lower('%4GB%');

UPDATE product_variants v
SET selling_price=530000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-a07'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%4GB%');

UPDATE products
SET name='Galaxy A17',
    short_description='Super AMOLED · 50MP camera system',
    description='The Galaxy A17 moves everyday smartphone ownership into a more refined class. Its vibrant Super AMOLED experience, optical image stabilisation and polished Galaxy design create a phone that feels considerably more premium in daily use.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "4G LTE; Android; Samsung ecosystem", "Quick Specs": ["Super AMOLED", "50MP camera system", "OIS", "long-lasting battery", "Samsung Knox"], "_amaal_master_price": 650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-a17';

UPDATE product_variants v
SET selling_price=650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-a17'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%4GB%');

UPDATE products
SET name='Galaxy S25 5G',
    short_description='Dynamic AMOLED 2X · Snapdragon 8 Elite for Galaxy',
    description='Small in presence. Serious in capability. Galaxy S25 delivers flagship performance in an elegant, compact form, built around Samsung''s Galaxy AI experience and powerful flagship processing.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; USB-C; Samsung Knox", "Quick Specs": ["Dynamic AMOLED 2X", "Snapdragon 8 Elite for Galaxy", "pro-grade camera system", "12GB RAM", "pro-grade cameras"], "_amaal_master_price": 2500000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s25';

UPDATE product_variants v
SET selling_price=2500000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%8GB%');

UPDATE product_variants v
SET selling_price=2650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy S25+',
    short_description='Large flagship display · Snapdragon 8 Elite for Galaxy',
    description='Galaxy S25+ is where flagship performance meets expansive elegance. Its larger display creates a more immersive canvas for entertainment, productivity and photography.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; Dynamic AMOLED 2X; USB-C", "Quick Specs": ["Large flagship display", "Snapdragon 8 Elite for Galaxy", "12GB RAM", "pro-grade camera system"], "_amaal_master_price": 2850000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s25-plus';

UPDATE product_variants v
SET selling_price=2850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25-plus'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy S25 FE',
    short_description='Flagship-inspired design · large AMOLED display',
    description='The Galaxy S25 FE brings the spirit of Samsung''s flagship S series to a more accessible price point.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; AMOLED; Samsung Knox", "Quick Specs": ["Flagship-inspired design", "large AMOLED display", "advanced camera system"], "_amaal_master_price": 2200000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s25-fe';

UPDATE product_variants v
SET selling_price=2200000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25-fe'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%8GB%');

UPDATE products
SET name='Galaxy S25 Ultra',
    short_description='Titanium · Dynamic AMOLED 2X',
    description='This is the Galaxy experience without compromise. Galaxy S25 Ultra combines sophisticated design with extraordinary imaging capability, S Pen productivity and advanced Galaxy AI.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; S Pen; USB-C; Samsung Knox", "Quick Specs": ["Titanium", "Dynamic AMOLED 2X", "200MP main camera", "advanced telephoto system", "200MP camera", "advanced zoom system", "S Pen"], "_amaal_master_price": 3450000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s25-ultra';

UPDATE product_variants v
SET selling_price=3450000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=3900000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy S25 Edge',
    short_description='Ultra-thin flagship design · 200MP main camera',
    description='The Galaxy S25 Edge is Samsung''s expression of modern minimalism: extraordinary capability inside an exceptionally slim flagship design.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; AMOLED; Samsung Knox", "Quick Specs": ["Ultra-thin flagship design", "200MP main camera", "high-resolution AMOLED"], "_amaal_master_price": 3650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s25-edge';

UPDATE product_variants v
SET selling_price=3650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s25-edge'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy S26',
    short_description='Flagship AMOLED display · 12GB RAM',
    description='Galaxy S26 represents the next evolution of Samsung''s mainstream flagship experience, engineered around intelligent Galaxy AI and flagship-class performance.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; USB-C; Samsung Knox", "Quick Specs": ["Flagship AMOLED display", "12GB RAM", "advanced Galaxy AI", "pro-grade imaging"], "_amaal_master_price": 2700000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s26';

UPDATE product_variants v
SET selling_price=2700000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s26'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy S26 Ultra',
    short_description='Ultra flagship display · advanced multi-camera system',
    description='Galaxy S26 Ultra is engineered for customers who expect their smartphone to operate at the highest level.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; S Pen; USB-C; Samsung Knox", "Quick Specs": ["Ultra flagship display", "advanced multi-camera system", "S Pen", "Flagship display", "advanced cameras", "12GB RAM", "1TB storage", "16GB RAM", "flagship display", "advanced camera system"], "_amaal_master_price": 3700000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-s26-ultra';

UPDATE product_variants v
SET selling_price=3700000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s26-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=4200000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s26-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=5500000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-s26-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('1TB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='Galaxy Z Flip6',
    short_description='Compact foldable design · FlexCam',
    description='Galaxy Z Flip6 transforms the smartphone into an expression of personal style. Its compact foldable form fits effortlessly into everyday life, then opens into a full flagship experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; FlexCam; Galaxy AI; foldable AMOLED", "Quick Specs": ["Compact foldable design", "FlexCam", "Galaxy AI", "Foldable design", "generous storage"], "_amaal_master_price": 2750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-flip6';

UPDATE product_variants v
SET selling_price=2750000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-flip6'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=2950000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-flip6'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy Z Fold6',
    short_description='Expansive foldable display · multitasking',
    description='Galaxy Z Fold6 is not simply a phone that opens—it is a mobile workspace. Open it and the experience expands into a larger canvas for productivity and creativity.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; S Pen support; foldable AMOLED", "Quick Specs": ["Expansive foldable display", "multitasking", "S Pen support", "Large foldable display", "512GB"], "_amaal_master_price": 3650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-fold6';

UPDATE product_variants v
SET selling_price=3650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold6'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=3850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold6'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy Z Flip7',
    short_description='Pocket-sized foldable · expressive photography',
    description='Z Flip7 takes Samsung''s iconic pocket-sized foldable concept into its next generation.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; FlexCam; foldable AMOLED", "Quick Specs": ["Pocket-sized foldable", "expressive photography", "AI", "Foldable design", "512GB", "FlexCam"], "_amaal_master_price": 3150000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-flip7';

UPDATE product_variants v
SET selling_price=3150000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-flip7'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=3300000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-flip7'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy Z Fold7',
    short_description='Large productivity canvas · multitasking',
    description='Galaxy Z Fold7 is Samsung''s vision of what a premium mobile computer can become.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; foldable AMOLED; S Pen ecosystem", "Quick Specs": ["Large productivity canvas", "multitasking", "foldable design", "Expansive foldable workspace", "512GB", "1TB", "16GB RAM", "expansive productivity canvas"], "_amaal_master_price": 5250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-fold7';

UPDATE product_variants v
SET selling_price=5250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold7'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=5750000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold7'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=6950000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold7'
  AND v.status='Active' AND lower(v.storage)=lower('1TB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='Galaxy Z Flip8',
    short_description='Foldable design · FlexCam',
    description='Galaxy Z Flip8 is where fashion, engineering and intelligent mobile technology meet.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; foldable AMOLED; FlexCam", "Quick Specs": ["Foldable design", "FlexCam", "intelligent mobile experience", "512GB"], "_amaal_master_price": 5200000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-flip8';

UPDATE product_variants v
SET selling_price=5200000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-flip8'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=6000000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-flip8'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Galaxy Z Fold8',
    short_description='Expansive foldable canvas · multitasking',
    description='Galaxy Z Fold8 is designed for those who see their smartphone as more than a communication device.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; foldable AMOLED; productivity ecosystem", "Quick Specs": ["Expansive foldable canvas", "multitasking", "premium design", "Large foldable display", "serious multitasking", "512GB", "1TB", "16GB RAM", "expansive foldable display"], "_amaal_master_price": 6100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-fold8';

UPDATE product_variants v
SET selling_price=6100000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold8'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=7700000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold8'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=9200000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold8'
  AND v.status='Active' AND lower(v.storage)=lower('1TB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='Galaxy Z Fold8 Ultra',
    short_description='Ultra foldable design · advanced mobile intelligence',
    description='The Z Fold8 Ultra represents Samsung''s most ambitious expression of the foldable smartphone concept.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Galaxy AI; foldable AMOLED; Ultra foldable platform", "Quick Specs": ["Ultra foldable design", "advanced mobile intelligence", "512GB", "1TB", "16GB RAM"], "_amaal_master_price": 7650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='samsung-galaxy-z-fold8-ultra';

UPDATE product_variants v
SET selling_price=7650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold8-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=8300000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold8-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=10000090, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='samsung-galaxy-z-fold8-ultra'
  AND v.status='Active' AND lower(v.storage)=lower('1TB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='iPhone 15',
    short_description='6.1-inch Super Retina XDR · A16 Bionic',
    description='iPhone 15 delivers the unmistakable Apple experience in an elegant, balanced design.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; USB-C; Face ID; Dynamic Island; MagSafe; 5G; USB-C; MagSafe; Face ID", "Quick Specs": ["6.1-inch Super Retina XDR", "A16 Bionic", "48MP Main", "IP68", "Super Retina XDR"], "_amaal_master_price": 2250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-15';

UPDATE product_variants v
SET selling_price=2250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15'
  AND v.status='Active' AND lower(v.storage)=lower('128GB');

UPDATE product_variants v
SET selling_price=2450000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 15 Plus',
    short_description='Large Super Retina XDR display · A16 Bionic',
    description='iPhone 15 Plus brings Apple''s refined experience to a larger canvas.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; USB-C; Dynamic Island; MagSafe; 5G; USB-C; MagSafe; Face ID", "Quick Specs": ["Large Super Retina XDR display", "A16 Bionic", "48MP camera", "Large display", "advanced camera system"], "_amaal_master_price": 2400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-15-plus';

UPDATE product_variants v
SET selling_price=2400000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-plus'
  AND v.status='Active' AND lower(v.storage)=lower('128GB');

UPDATE product_variants v
SET selling_price=2600000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-plus'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 15 Pro',
    short_description='Titanium · A17 Pro',
    description='iPhone 15 Pro introduced a new level of refinement to Apple''s professional smartphone.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; USB-C; ProMotion; MagSafe; Apple Intelligence support; 5G; USB-C; ProMotion; MagSafe", "Quick Specs": ["Titanium", "A17 Pro", "120Hz ProMotion", "48MP Main", "Pro camera system", "ProMotion", "advanced camera system"], "_amaal_master_price": 2750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-15-pro';

UPDATE product_variants v
SET selling_price=2750000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-pro'
  AND v.status='Active' AND lower(v.storage)=lower('128GB');

UPDATE product_variants v
SET selling_price=2950000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-pro'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 15 Pro Max',
    short_description='6.7-inch ProMotion · titanium',
    description='The iPhone 15 Pro Max is designed for customers who want Apple''s largest professional iPhone experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; USB-C; ProMotion; MagSafe", "Quick Specs": ["6.7-inch ProMotion", "titanium", "A17 Pro", "48MP Main", "5x Telephoto", "Titanium", "professional camera system", "1TB", "ProMotion"], "_amaal_master_price": 3250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-15-pro-max';

UPDATE product_variants v
SET selling_price=3250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE product_variants v
SET selling_price=3450000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('512GB');

UPDATE product_variants v
SET selling_price=3650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-15-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('1TB');

UPDATE products
SET name='iPhone 16',
    short_description='A18 · 48MP Fusion',
    description='iPhone 16 introduces the next generation of Apple''s mainstream iPhone experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Camera Control; Apple Intelligence; USB-C; MagSafe; 5G; Apple Intelligence; Camera Control; USB-C; MagSafe", "Quick Specs": ["A18", "48MP Fusion", "Camera Control", "Action button", "IP68"], "_amaal_master_price": 2750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-16';

UPDATE product_variants v
SET selling_price=2750000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16'
  AND v.status='Active' AND lower(v.storage)=lower('128GB');

UPDATE product_variants v
SET selling_price=3000000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 16 Plus',
    short_description='Large display · A18',
    description='iPhone 16 Plus delivers the latest generation iPhone experience on a larger canvas.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; Camera Control; USB-C; MagSafe", "Quick Specs": ["Large display", "A18", "48MP Fusion", "256GB"], "_amaal_master_price": 3250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-16-plus';

UPDATE product_variants v
SET selling_price=3250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-plus'
  AND v.status='Active' AND lower(v.storage)=lower('128GB');

UPDATE product_variants v
SET selling_price=3550000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-plus'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 16 Pro',
    short_description='Titanium · A18 Pro',
    description='iPhone 16 Pro is precision engineered for the professional side of modern mobile life.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; ProMotion; Camera Control; USB-C; MagSafe; 5G; Apple Intelligence; ProMotion; Camera Control; USB-C", "Quick Specs": ["Titanium", "A18 Pro", "6.3-inch ProMotion", "48MP Fusion", "ProMotion", "advanced camera system"], "_amaal_master_price": 3600000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-16-pro';

UPDATE product_variants v
SET selling_price=3600000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-pro'
  AND v.status='Active' AND lower(v.storage)=lower('128GB');

UPDATE product_variants v
SET selling_price=3950000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-pro'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 16 Pro Max',
    short_description='6.9-inch ProMotion · titanium',
    description='The iPhone 16 Pro Max is Apple''s statement smartphone—large, powerful and uncompromising.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; ProMotion; Camera Control; USB-C; MagSafe; 5G; Apple Intelligence; ProMotion; Camera Control; USB-C", "Quick Specs": ["6.9-inch ProMotion", "titanium", "A18 Pro", "48MP Fusion", "5x Telephoto", "ProMotion", "advanced cameras", "1TB"], "_amaal_master_price": 4100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-16-pro-max';

UPDATE product_variants v
SET selling_price=4100000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE product_variants v
SET selling_price=4500000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('512GB');

UPDATE product_variants v
SET selling_price=4850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-16-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('1TB');

UPDATE products
SET name='iPhone 17',
    short_description='6.3-inch Super Retina XDR · A19',
    description='iPhone 17 brings Apple''s latest generation of performance and display technology into the mainstream iPhone experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; ProMotion; Camera Control; USB-C", "Quick Specs": ["6.3-inch Super Retina XDR", "A19", "48MP Dual Fusion", "120Hz ProMotion", "IP68"], "_amaal_master_price": 3580000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-17';

UPDATE product_variants v
SET selling_price=3580000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-17'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone Air',
    short_description='6.5-inch · A19 Pro',
    description='iPhone Air is Apple''s expression of modern elegance through extreme thinness.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; USB-C; MagSafe; ProMotion; 5G; Apple Intelligence; A19 Pro; USB-C; MagSafe", "Quick Specs": ["6.5-inch", "A19 Pro", "5.64mm", "165g", "48MP Fusion", "IP68", "512GB"], "_amaal_master_price": 3700000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-air';

UPDATE product_variants v
SET selling_price=3700000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-air'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE product_variants v
SET selling_price=3850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-air'
  AND v.status='Active' AND lower(v.storage)=lower('512GB');

UPDATE products
SET name='iPhone 17 Pro',
    short_description='6.3-inch ProMotion · A19 Pro',
    description='iPhone 17 Pro is created for people who treat their smartphone as a serious tool.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; A19 Pro; ProMotion; Camera Control; USB-C", "Quick Specs": ["6.3-inch ProMotion", "A19 Pro", "48MP Pro Fusion", "Pro telephoto"], "_amaal_master_price": 5100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-17-pro';

UPDATE product_variants v
SET selling_price=5100000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-17-pro'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE products
SET name='iPhone 17 Pro Max',
    short_description='Large ProMotion display · A19 Pro',
    description='The iPhone 17 Pro Max is Apple''s flagship statement: maximum screen, maximum Pro capability.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Apple Intelligence; A19 Pro; ProMotion; Camera Control; USB-C; 5G; Apple Intelligence; A19 Pro; ProMotion; USB-C", "Quick Specs": ["Large ProMotion display", "A19 Pro", "48MP Pro Fusion", "ProMotion", "professional camera system", "512GB", "1TB"], "_amaal_master_price": 5650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='apple-iphone-17-pro-max';

UPDATE product_variants v
SET selling_price=5650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-17-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('256GB');

UPDATE product_variants v
SET selling_price=6200000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-17-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('512GB');

UPDATE product_variants v
SET selling_price=6400000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='apple-iphone-17-pro-max'
  AND v.status='Active' AND lower(v.storage)=lower('1TB');

UPDATE products
SET name='Pixel 8a',
    short_description='Computational photography · clean Android',
    description='Pixel 8a delivers Google''s signature approach to smartphone intelligence in a compact, beautifully balanced package.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google Tensor G3; Google AI; Titan M2", "Quick Specs": ["Computational photography", "clean Android", "AI features"], "_amaal_master_price": 1400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-8a';

UPDATE product_variants v
SET selling_price=1400000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-8a'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%8GB%');

UPDATE products
SET name='Pixel 9a',
    short_description='AI-powered photography · clean Android',
    description='Pixel 9a is designed around Google''s philosophy that a great smartphone should feel intelligent, effortless and genuinely useful.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Tensor G4; Google AI; Gemini; Titan M2; 5G; Tensor G4; Google AI; Gemini", "Quick Specs": ["AI-powered photography", "clean Android", "Tensor G4", "256GB"], "_amaal_master_price": 1650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-9a';

UPDATE product_variants v
SET selling_price=1650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-9a'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%8GB%');

UPDATE product_variants v
SET selling_price=1850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-9a'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%8GB%');

UPDATE products
SET name='Pixel 10a',
    short_description='AI-first software · computational photography',
    description='Pixel 10a brings Google''s increasingly intelligent mobile experience into an accessible form.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google Tensor platform; Gemini; Google AI", "Quick Specs": ["AI-first software", "computational photography", "clean Android"], "_amaal_master_price": 1950000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-10a';

UPDATE product_variants v
SET selling_price=1950000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10a'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%8GB%');

UPDATE products
SET name='Pixel 10',
    short_description='AI-first flagship experience · computational photography',
    description='Pixel 10 is Google''s vision of the intelligent everyday flagship.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google AI; Gemini; Tensor platform", "Quick Specs": ["AI-first flagship experience", "computational photography", "256GB", "AI-first software"], "_amaal_master_price": 2650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-10';

UPDATE product_variants v
SET selling_price=2650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10'
  AND v.status='Active' AND lower(v.storage)=lower('128GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE product_variants v
SET selling_price=2850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%12GB%');

UPDATE products
SET name='Pixel 10 Pro',
    short_description='16GB RAM · Pro imaging',
    description='Pixel 10 Pro is built for customers who want Google''s most sophisticated traditional Pixel experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google AI; Gemini; Pro camera system", "Quick Specs": ["16GB RAM", "Pro imaging", "AI ecosystem"], "_amaal_master_price": 3550000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-10-pro';

UPDATE product_variants v
SET selling_price=3550000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10-pro'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='Pixel 10 Pro XL',
    short_description='Large premium form · 16GB RAM',
    description='Pixel 10 Pro XL takes Google''s Pro experience and gives it a larger, more immersive presence.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google AI; Gemini; Pro camera system", "Quick Specs": ["Large premium form", "16GB RAM", "advanced imaging", "512GB"], "_amaal_master_price": 3650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-10-pro-xl';

UPDATE product_variants v
SET selling_price=3650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10-pro-xl'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE product_variants v
SET selling_price=4350000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10-pro-xl'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='Pixel 10 Pro Fold',
    short_description='Foldable display · multitasking',
    description='Pixel 10 Pro Fold brings Google''s intelligence into an entirely different form.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google AI; Gemini; foldable display", "Quick Specs": ["Foldable display", "multitasking", "AI ecosystem", "512GB", "foldable workspace"], "_amaal_master_price": 4850000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-10-pro-fold';

UPDATE product_variants v
SET selling_price=4850000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10-pro-fold'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE product_variants v
SET selling_price=5750000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-10-pro-fold'
  AND v.status='Active' AND lower(v.storage)=lower('512GB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='Pixel 11 Pro XL',
    short_description='Large premium form · 16GB',
    description='Pixel 11 Pro XL represents the next step in Google''s AI-first smartphone philosophy.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology Support": "5G; Google AI; Gemini; Pro camera system", "Quick Specs": ["Large premium form", "16GB", "Pro Pixel ecosystem"], "_amaal_master_price": 5250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='google-pixel-pixel-11-pro-xl';

UPDATE product_variants v
SET selling_price=5250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='google-pixel-pixel-11-pro-xl'
  AND v.status='Active' AND lower(v.storage)=lower('256GB') AND lower(v.variant_name) LIKE lower('%16GB%');

UPDATE products
SET name='JBL Go 5',
    short_description='Palm-sized · up to 10 hours',
    description='Big sound. Small footprint. JBL Go 5 puts unmistakable JBL character into a compact speaker designed to go wherever the day takes you.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; USB-C audio; IP68", "Quick specs": "Palm-sized; up to 10 hours; waterproof; dustproof; drop-proof; Playtime Boost", "_amaal_master_price": 220000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-go-5';

UPDATE product_variants v
SET selling_price=220000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-go-5'
  AND v.status='Active';

UPDATE products
SET name='JBL Clip 5',
    short_description='Integrated carabiner · up to 12 hours plus Playtime Boost',
    description='Your music, wherever the day takes you. JBL Clip 5 is engineered around effortless portability, with an integrated carabiner.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; IP67", "Quick specs": "Integrated carabiner; up to 12 hours plus Playtime Boost; waterproof; dustproof", "_amaal_master_price": 230000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-clip-5';

UPDATE product_variants v
SET selling_price=230000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-clip-5'
  AND v.status='Active';

UPDATE products
SET name='JBL Grip',
    short_description='Compact portable form · JBL Pro Sound',
    description='Compact enough to carry. Bold enough to stand out. JBL Grip combines portable JBL sound with an expressive ambient-light experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; portable wireless audio; ambient lighting", "Quick specs": "Compact portable form; JBL Pro Sound; ambient light", "_amaal_master_price": 320000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-grip';

UPDATE product_variants v
SET selling_price=320000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-grip'
  AND v.status='Active';

UPDATE products
SET name='JBL Flip 7',
    short_description='25W RMS woofer · 10W RMS tweeter',
    description='Portable enough for every day. Powerful enough for the occasion. JBL Flip 7 strikes an exceptional balance between portability and performance.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; AI Sound Boost; IP68", "Quick specs": "25W RMS woofer; 10W RMS tweeter; 60Hz–20kHz; up to 16 hours", "_amaal_master_price": 400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-flip-7';

UPDATE product_variants v
SET selling_price=400000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-flip-7'
  AND v.status='Active';

UPDATE products
SET name='JBL Charge 6',
    short_description='Up to 28 hours · portable design',
    description='More music. More freedom. More battery. JBL Charge 6 is built for customers who do not want their listening experience interrupted.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; AI Sound Boost; power-bank functionality", "Quick specs": "Up to 28 hours; portable design; device charging", "_amaal_master_price": 550000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-charge-6';

UPDATE product_variants v
SET selling_price=550000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-charge-6'
  AND v.status='Active';

UPDATE products
SET name='JBL Horizon 3',
    short_description='Premium bedside speaker · integrated lighting',
    description='Turn your bedside into a better experience. JBL Horizon 3 combines JBL sound with audio, lighting and alarm functionality.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; bedside audio; ambient lighting; alarm functionality", "Quick specs": "Premium bedside speaker; integrated lighting; alarm experience", "_amaal_master_price": 550000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-horizon-3';

UPDATE product_variants v
SET selling_price=550000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-horizon-3'
  AND v.status='Active';

UPDATE products
SET name='JBL Xtreme 4',
    short_description='Powerful portable sound · up to 24 hours',
    description='Bigger portable sound without the compromise. JBL Xtreme 4 is designed for customers who want serious audio performance without a fixed home speaker.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; IP67; power-bank functionality", "Quick specs": "Powerful portable sound; up to 24 hours; waterproof; dustproof", "_amaal_master_price": 990000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-xtreme-4';

UPDATE product_variants v
SET selling_price=990000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-xtreme-4'
  AND v.status='Active';

UPDATE products
SET name='JBL Xtreme 5',
    short_description='Up to 24 hours standard · additional Playtime Boost',
    description='Take powerful JBL sound further. Xtreme 5 is built for customers who want a substantial portable audio experience with the freedom to take it anywhere.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; IP67; Playtime Boost", "Quick specs": "Up to 24 hours standard; additional Playtime Boost; rugged portable design", "_amaal_master_price": 1250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-xtreme-5';

UPDATE product_variants v
SET selling_price=1250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-xtreme-5'
  AND v.status='Active';

UPDATE products
SET name='JBL Authentics 300',
    short_description='Premium home speaker · portable design',
    description='Premium sound designed for the home. JBL Authentics 300 brings a sophisticated aesthetic together with powerful JBL audio.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Wi-Fi; Bluetooth; connected home audio; smart speaker platform", "Quick specs": "Premium home speaker; portable design; high-quality audio", "_amaal_master_price": 1250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-authentics-300';

UPDATE product_variants v
SET selling_price=1250000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-authentics-300'
  AND v.status='Active';

UPDATE products
SET name='JBL PartyBox Encore 2 with Mic',
    short_description='Portable party speaker · wireless microphone',
    description='Turn any gathering into an event. PartyBox Encore 2 brings JBL party sound, dynamic lighting and a wireless microphone together.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; wireless microphone; party lighting; karaoke", "Quick specs": "Portable party speaker; wireless microphone; microphone holder; lighting", "_amaal_master_price": 1500000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-partybox-encore-2-with-mic';

UPDATE product_variants v
SET selling_price=1500000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-partybox-encore-2-with-mic'
  AND v.status='Active';

UPDATE products
SET name='JBL Boombox 4',
    short_description='Powerful portable sound · up to 34 hours with Playtime Boost',
    description='Built for big sound and long sessions. JBL Boombox 4 is for listeners who want a commanding portable speaker.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; Playtime Boost", "Quick specs": "Powerful portable sound; up to 34 hours with Playtime Boost; large-format portable design", "_amaal_master_price": 1800000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-boombox-4';

UPDATE product_variants v
SET selling_price=1800000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-boombox-4'
  AND v.status='Active';

UPDATE products
SET name='JBL PartyBox Stage 320',
    short_description='240W output · up to 18 hours',
    description='Bring the party with you. JBL PartyBox Stage 320 combines serious output with the mobility of a wheeled entertainment system.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Auracast; AI Sound Boost; microphone input; guitar input; party lighting", "Quick specs": "240W output; up to 18 hours; wheels; telescopic handle; splashproof", "_amaal_master_price": 2350000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-partybox-stage-320';

UPDATE product_variants v
SET selling_price=2350000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-partybox-stage-320'
  AND v.status='Active';

UPDATE products
SET name='JBL PartyBox Ultimate',
    short_description='1100W output · Wi-Fi',
    description='When ordinary speakers are not enough. JBL PartyBox Ultimate is engineered for large-scale entertainment.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Wi-Fi; Dolby Atmos; multidimensional lightshow; splashproof", "Quick specs": "1100W output; Wi-Fi; immersive audio; multidimensional lighting", "_amaal_master_price": 4650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-partybox-ultimate';

UPDATE product_variants v
SET selling_price=4650000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-partybox-ultimate'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune 310 USB-C',
    short_description='USB-C wired connection · Pure Bass',
    description='Simple, connected and refined. JBL Tune 310 USB-C delivers JBL Pure Bass through a modern USB-C connection.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "USB-C; Hi-Res Audio; Pure Bass; in-line microphone", "Quick specs": "USB-C wired connection; Pure Bass; Hi-Res Audio; three-button remote", "_amaal_master_price": 70000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-310-usb-c';

UPDATE product_variants v
SET selling_price=70000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-310-usb-c'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune 305C USB-C',
    short_description='Wired USB-C audio · Pure Bass',
    description='A smarter take on everyday wired audio. Tune 305C combines JBL Pure Bass with USB-C connectivity.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "USB-C; Hi-Res Audio; Pure Bass; in-line microphone", "Quick specs": "Wired USB-C audio; Pure Bass; Hi-Res Audio; three-button remote", "_amaal_master_price": 70000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-305c-usb-c';

UPDATE product_variants v
SET selling_price=70000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-305c-usb-c'
  AND v.status='Active';

UPDATE products
SET name='JBL Endurance Run 2 Wireless',
    short_description='Wireless sports earphones · secure fit',
    description='Built to move with you. JBL Endurance Run 2 Wireless combines wireless freedom with a secure, exercise-ready fit.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Wireless Bluetooth; sports-oriented design", "Quick specs": "Wireless sports earphones; secure fit; sweat-resistant design", "_amaal_master_price": 165000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-endurance-run-2-wireless';

UPDATE product_variants v
SET selling_price=165000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-endurance-run-2-wireless'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune 530BT',
    short_description='33mm drivers · up to 76 hours',
    description='Long listening without the constant search for a charger. JBL Tune 530BT combines powerful Pure Bass and exceptional battery endurance.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Pure Bass; beamforming microphones", "Quick specs": "33mm drivers; up to 76 hours; two beamforming microphones", "_amaal_master_price": 190000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-530bt';

UPDATE product_variants v
SET selling_price=190000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-530bt'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune 730BT',
    short_description='Wireless over-ear design · JBL Pure Bass',
    description='Tune 730BT is built for listeners who want a fuller over-ear experience with the freedom of wireless connectivity.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; wireless audio; Pure Bass", "Quick specs": "Wireless over-ear design; JBL Pure Bass; extended battery", "_amaal_master_price": 230000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-730bt';

UPDATE product_variants v
SET selling_price=230000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-730bt'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune 770NC',
    short_description='Over-ear design · ANC',
    description='Put the outside world on pause. JBL Tune 770NC combines wireless JBL sound with active noise cancellation.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; Active Noise Cancelling; wireless audio", "Quick specs": "Over-ear design; ANC; JBL Pure Bass; extended listening", "_amaal_master_price": 300000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-770nc';

UPDATE product_variants v
SET selling_price=300000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-770nc'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune Buds 2',
    short_description='Compact true wireless · ANC',
    description='Small enough to disappear. Sophisticated enough to impress. Tune Buds 2 bring JBL''s personal audio experience into a compact form.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "True wireless; ANC; Spatial Sound; Smart Ambient", "Quick specs": "Compact true wireless; ANC; Spatial Sound; Smart Ambient", "_amaal_master_price": 320000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-buds-2';

UPDATE product_variants v
SET selling_price=320000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-buds-2'
  AND v.status='Active';

UPDATE products
SET name='JBL Tune Beam 2',
    short_description='10mm drivers · Pure Bass',
    description='JBL Tune Beam 2 is engineered for a more immersive personal listening experience.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "True wireless; Adaptive ANC; Spatial Sound; Smart Ambient", "Quick specs": "10mm drivers; Pure Bass; Adaptive ANC; Spatial Sound; six microphones", "_amaal_master_price": 350000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tune-beam-2';

UPDATE product_variants v
SET selling_price=350000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tune-beam-2'
  AND v.status='Active';

UPDATE products
SET name='JBL Soundgear Frames',
    short_description='Open-ear wearable audio · hands-free listening',
    description='Soundgear Frames redefine what personal audio can look like, with open-ear listening and wireless JBL sound.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Open-ear wireless audio; Bluetooth", "Quick specs": "Open-ear wearable audio; hands-free listening; lifestyle design", "_amaal_master_price": 400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-soundgear-frames';

UPDATE product_variants v
SET selling_price=400000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-soundgear-frames'
  AND v.status='Active';

UPDATE products
SET name='JBL Live Flex 3',
    short_description='Open true-wireless · adaptive ANC',
    description='JBL Live Flex 3 delivers an elevated true-wireless experience built around comfort, intelligent control and immersive sound.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "True wireless; ANC; Smart Charging Case; Spatial Sound", "Quick specs": "Open true-wireless; adaptive ANC; Smart Charging Case; Signature Sound", "_amaal_master_price": 600000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-live-flex-3';

UPDATE product_variants v
SET selling_price=600000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-live-flex-3'
  AND v.status='Active';

UPDATE products
SET name='JBL Live Beam 3',
    short_description='10mm dynamic drivers · Signature Sound',
    description='Live Beam 3 turns personal audio into a more complete experience with powerful drivers, ANC, spatial sound and a touchscreen Smart Charging Case.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "True wireless; Adaptive ANC; Spatial Sound; Smart Charging Case", "Quick specs": "10mm dynamic drivers; Signature Sound; Spatial Sound; adaptive ANC; 1.45-inch touchscreen case; up to 48 hours", "_amaal_master_price": 600000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-live-beam-3';

UPDATE product_variants v
SET selling_price=600000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-live-beam-3'
  AND v.status='Active';

UPDATE products
SET name='JBL Tour Pro 3',
    short_description='Premium true-wireless · advanced noise cancellation',
    description='Tour Pro 3 is designed for customers who expect more from their earbuds.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "True wireless; premium ANC; Smart Charging Case; spatial audio", "Quick specs": "Premium true-wireless; advanced noise cancellation; smart case", "_amaal_master_price": 750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tour-pro-3';

UPDATE product_variants v
SET selling_price=750000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tour-pro-3'
  AND v.status='Active';

UPDATE products
SET name='JBL Tour One M3',
    short_description='Flagship over-ear · advanced ANC',
    description='Tour One M3 is JBL''s refined over-ear experience for listeners who take personal audio seriously.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Premium wireless audio; Active Noise Cancelling; high-resolution listening", "Quick specs": "Flagship over-ear; advanced ANC; premium sound", "_amaal_master_price": 1080000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tour-one-m3';

UPDATE product_variants v
SET selling_price=1080000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tour-one-m3'
  AND v.status='Active';

UPDATE products
SET name='JBL Tour One M3 Smart Tx',
    short_description='Premium over-ear · Smart Tx touchscreen transmitter',
    description='Tour One M3 Smart Tx takes premium personal audio beyond the headphones themselves.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Premium wireless audio; Active Noise Cancelling; touchscreen audio transmitter", "Quick specs": "Premium over-ear; Smart Tx touchscreen transmitter; advanced ANC", "_amaal_master_price": 1200000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-tour-one-m3-smart-tx';

UPDATE product_variants v
SET selling_price=1200000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-tour-one-m3-smart-tx'
  AND v.status='Active';

UPDATE products
SET name='JBL PartyLight Stick',
    short_description='Portable party light · dynamic lighting effects',
    description='Give the party another dimension. JBL PartyLight Stick adds dynamic visual energy to your entertainment setup.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Party lighting; JBL PartyBox ecosystem", "Quick specs": "Portable party light; dynamic lighting effects", "_amaal_master_price": 300000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-partylight-stick';

UPDATE product_variants v
SET selling_price=300000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-partylight-stick'
  AND v.status='Active';

UPDATE products
SET name='JBL PartyLight Beam',
    short_description='Party lighting system · dynamic effects',
    description='Designed to make the atmosphere impossible to ignore. JBL PartyLight Beam adds a more dramatic lighting presence.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Party lighting; JBL PartyBox ecosystem", "Quick specs": "Party lighting system; dynamic effects", "_amaal_master_price": 440000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-partylight-beam';

UPDATE product_variants v
SET selling_price=440000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-partylight-beam'
  AND v.status='Active';

UPDATE products
SET name='JBL Wireless Microphone Set',
    short_description='Wireless microphones · karaoke and presentation use',
    description='Put the microphone in the hands of the performer. JBL Wireless Microphone Set brings wireless freedom to karaoke, speeches and events.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Wireless microphone system; JBL party ecosystem", "Quick specs": "Wireless microphones; karaoke and presentation use", "_amaal_master_price": 400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-wireless-microphone-set';

UPDATE product_variants v
SET selling_price=400000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-wireless-microphone-set'
  AND v.status='Active';

UPDATE products
SET name='JBL PartyBox Wireless Mic Set',
    short_description='Wireless microphone set · PartyBox compatibility',
    description='Complete the PartyBox experience with wireless performance freedom for karaoke, announcements and live entertainment.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Wireless microphones; JBL PartyBox ecosystem", "Quick specs": "Wireless microphone set; PartyBox compatibility", "_amaal_master_price": 440000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='jbl-partybox-wireless-mic-set';

UPDATE product_variants v
SET selling_price=440000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='jbl-partybox-wireless-mic-set'
  AND v.status='Active';

UPDATE products
SET name='Harman Kardon Luna',
    short_description='Portable Bluetooth · up to 12 hours',
    description='Refined design. Remarkable portability. Harman Kardon Luna brings the brand''s elegant design philosophy into a compact speaker.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; IP67; stereo pairing", "Quick specs": "Portable Bluetooth; up to 12 hours; waterproof; dustproof", "_amaal_master_price": 470000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='harman-kardon-luna';

UPDATE product_variants v
SET selling_price=470000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='harman-kardon-luna'
  AND v.status='Active';

UPDATE products
SET name='Harman Kardon Onyx Studio 9',
    short_description='Portable stereo · integrated handle',
    description='Designed to sound as beautiful as it looks. Onyx Studio 9 combines Harman Kardon''s sculptural design with refined stereo listening.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; USB; Constant Sound Field; automatic self-tuning", "Quick specs": "Portable stereo; integrated handle; up to 8 hours; auto self-tuning", "_amaal_master_price": 800000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='harman-kardon-onyx-studio-9';

UPDATE product_variants v
SET selling_price=800000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='harman-kardon-onyx-studio-9'
  AND v.status='Active';

UPDATE products
SET name='Harman Kardon Citation 200',
    short_description='Premium connected speaker · portable home design',
    description='Premium sound, intelligently connected. Harman Kardon Citation 200 is designed for sophisticated audio integrated into a connected home.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Wireless smart-home audio; Wi-Fi; Bluetooth", "Quick specs": "Premium connected speaker; portable home design; smart audio", "_amaal_master_price": 1100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='harman-kardon-citation-200';

UPDATE product_variants v
SET selling_price=1100000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='harman-kardon-citation-200'
  AND v.status='Active';

UPDATE products
SET name='Harman Kardon Go + Play 3',
    short_description='Premium portable home speaker · up to 8 hours',
    description='Premium home sound, wherever you want it. Go + Play 3 combines Harman Kardon''s distinctive design language with powerful portable listening.',
    specifications=COALESCE(specifications,'{}'::jsonb) || '{"Technology support": "Bluetooth; portable premium audio", "Quick specs": "Premium portable home speaker; up to 8 hours; integrated carry design", "_amaal_master_price": 1150000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,
    updated_at=now()
WHERE slug='harman-kardon-go-play-3';

UPDATE product_variants v
SET selling_price=1150000, updated_at=now()
FROM products p
WHERE v.product_id=p.id AND p.slug='harman-kardon-go-play-3'
  AND v.status='Active';

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy A07','samsung-galaxy-a07',b.id,c.id,'Physical','Large display · 50MP main camera','The Galaxy A07 brings the Samsung experience into a beautifully accessible package. Designed for everyday life, it combines a generous display, capable photography and dependable battery endurance with the familiar refinement of the Galaxy ecosystem.','{"Technology Support": "4G LTE; Android; Samsung ecosystem", "Quick Specs": ["Large display", "50MP main camera", "5,000mAh-class battery", "Dual SIM", "extended storage", "long-lasting battery"], "_amaal_master_price": 470000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy A07 | Amaal','The Galaxy A07 brings the Samsung experience into a beautifully accessible package. Designed for everyday life, it combines a generous display, capable photography and dependable battery endurance with the familiar refinement of the Galaxy ecosystem.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy A17','samsung-galaxy-a17',b.id,c.id,'Physical','Super AMOLED · 50MP camera system','The Galaxy A17 moves everyday smartphone ownership into a more refined class. Its vibrant Super AMOLED experience, optical image stabilisation and polished Galaxy design create a phone that feels considerably more premium in daily use.','{"Technology Support": "4G LTE; Android; Samsung ecosystem", "Quick Specs": ["Super AMOLED", "50MP camera system", "OIS", "long-lasting battery", "Samsung Knox"], "_amaal_master_price": 650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy A17 | Amaal','The Galaxy A17 moves everyday smartphone ownership into a more refined class. Its vibrant Super AMOLED experience, optical image stabilisation and polished Galaxy design create a phone that feels considerably more premium in daily use.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S25 5G','samsung-galaxy-s25',b.id,c.id,'Physical','Dynamic AMOLED 2X · Snapdragon 8 Elite for Galaxy','Small in presence. Serious in capability. Galaxy S25 delivers flagship performance in an elegant, compact form, built around Samsung''s Galaxy AI experience and powerful flagship processing.','{"Technology Support": "5G; Galaxy AI; USB-C; Samsung Knox", "Quick Specs": ["Dynamic AMOLED 2X", "Snapdragon 8 Elite for Galaxy", "pro-grade camera system", "12GB RAM", "pro-grade cameras"], "_amaal_master_price": 2500000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S25 5G | Amaal','Small in presence. Serious in capability. Galaxy S25 delivers flagship performance in an elegant, compact form, built around Samsung''s Galaxy AI experience and powerful flagship processing.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S25+','samsung-galaxy-s25-plus',b.id,c.id,'Physical','Large flagship display · Snapdragon 8 Elite for Galaxy','Galaxy S25+ is where flagship performance meets expansive elegance. Its larger display creates a more immersive canvas for entertainment, productivity and photography.','{"Technology Support": "5G; Galaxy AI; Dynamic AMOLED 2X; USB-C", "Quick Specs": ["Large flagship display", "Snapdragon 8 Elite for Galaxy", "12GB RAM", "pro-grade camera system"], "_amaal_master_price": 2850000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S25+ | Amaal','Galaxy S25+ is where flagship performance meets expansive elegance. Its larger display creates a more immersive canvas for entertainment, productivity and photography.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S25 FE','samsung-galaxy-s25-fe',b.id,c.id,'Physical','Flagship-inspired design · large AMOLED display','The Galaxy S25 FE brings the spirit of Samsung''s flagship S series to a more accessible price point.','{"Technology Support": "5G; Galaxy AI; AMOLED; Samsung Knox", "Quick Specs": ["Flagship-inspired design", "large AMOLED display", "advanced camera system"], "_amaal_master_price": 2200000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S25 FE | Amaal','The Galaxy S25 FE brings the spirit of Samsung''s flagship S series to a more accessible price point.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S25 Ultra','samsung-galaxy-s25-ultra',b.id,c.id,'Physical','Titanium · Dynamic AMOLED 2X','This is the Galaxy experience without compromise. Galaxy S25 Ultra combines sophisticated design with extraordinary imaging capability, S Pen productivity and advanced Galaxy AI.','{"Technology Support": "5G; Galaxy AI; S Pen; USB-C; Samsung Knox", "Quick Specs": ["Titanium", "Dynamic AMOLED 2X", "200MP main camera", "advanced telephoto system", "200MP camera", "advanced zoom system", "S Pen"], "_amaal_master_price": 3450000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S25 Ultra | Amaal','This is the Galaxy experience without compromise. Galaxy S25 Ultra combines sophisticated design with extraordinary imaging capability, S Pen productivity and advanced Galaxy AI.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S25 Edge','samsung-galaxy-s25-edge',b.id,c.id,'Physical','Ultra-thin flagship design · 200MP main camera','The Galaxy S25 Edge is Samsung''s expression of modern minimalism: extraordinary capability inside an exceptionally slim flagship design.','{"Technology Support": "5G; Galaxy AI; AMOLED; Samsung Knox", "Quick Specs": ["Ultra-thin flagship design", "200MP main camera", "high-resolution AMOLED"], "_amaal_master_price": 3650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S25 Edge | Amaal','The Galaxy S25 Edge is Samsung''s expression of modern minimalism: extraordinary capability inside an exceptionally slim flagship design.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S26','samsung-galaxy-s26',b.id,c.id,'Physical','Flagship AMOLED display · 12GB RAM','Galaxy S26 represents the next evolution of Samsung''s mainstream flagship experience, engineered around intelligent Galaxy AI and flagship-class performance.','{"Technology Support": "5G; Galaxy AI; USB-C; Samsung Knox", "Quick Specs": ["Flagship AMOLED display", "12GB RAM", "advanced Galaxy AI", "pro-grade imaging"], "_amaal_master_price": 2700000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S26 | Amaal','Galaxy S26 represents the next evolution of Samsung''s mainstream flagship experience, engineered around intelligent Galaxy AI and flagship-class performance.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy S26 Ultra','samsung-galaxy-s26-ultra',b.id,c.id,'Physical','Ultra flagship display · advanced multi-camera system','Galaxy S26 Ultra is engineered for customers who expect their smartphone to operate at the highest level.','{"Technology Support": "5G; Galaxy AI; S Pen; USB-C; Samsung Knox", "Quick Specs": ["Ultra flagship display", "advanced multi-camera system", "S Pen", "Flagship display", "advanced cameras", "12GB RAM", "1TB storage", "16GB RAM", "flagship display", "advanced camera system"], "_amaal_master_price": 3700000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy S26 Ultra | Amaal','Galaxy S26 Ultra is engineered for customers who expect their smartphone to operate at the highest level.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Flip6','samsung-galaxy-z-flip6',b.id,c.id,'Physical','Compact foldable design · FlexCam','Galaxy Z Flip6 transforms the smartphone into an expression of personal style. Its compact foldable form fits effortlessly into everyday life, then opens into a full flagship experience.','{"Technology Support": "5G; FlexCam; Galaxy AI; foldable AMOLED", "Quick Specs": ["Compact foldable design", "FlexCam", "Galaxy AI", "Foldable design", "generous storage"], "_amaal_master_price": 2750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Flip6 | Amaal','Galaxy Z Flip6 transforms the smartphone into an expression of personal style. Its compact foldable form fits effortlessly into everyday life, then opens into a full flagship experience.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Fold6','samsung-galaxy-z-fold6',b.id,c.id,'Physical','Expansive foldable display · multitasking','Galaxy Z Fold6 is not simply a phone that opens—it is a mobile workspace. Open it and the experience expands into a larger canvas for productivity and creativity.','{"Technology Support": "5G; Galaxy AI; S Pen support; foldable AMOLED", "Quick Specs": ["Expansive foldable display", "multitasking", "S Pen support", "Large foldable display", "512GB"], "_amaal_master_price": 3650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Fold6 | Amaal','Galaxy Z Fold6 is not simply a phone that opens—it is a mobile workspace. Open it and the experience expands into a larger canvas for productivity and creativity.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Flip7','samsung-galaxy-z-flip7',b.id,c.id,'Physical','Pocket-sized foldable · expressive photography','Z Flip7 takes Samsung''s iconic pocket-sized foldable concept into its next generation.','{"Technology Support": "5G; Galaxy AI; FlexCam; foldable AMOLED", "Quick Specs": ["Pocket-sized foldable", "expressive photography", "AI", "Foldable design", "512GB", "FlexCam"], "_amaal_master_price": 3150000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Flip7 | Amaal','Z Flip7 takes Samsung''s iconic pocket-sized foldable concept into its next generation.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Fold7','samsung-galaxy-z-fold7',b.id,c.id,'Physical','Large productivity canvas · multitasking','Galaxy Z Fold7 is Samsung''s vision of what a premium mobile computer can become.','{"Technology Support": "5G; Galaxy AI; foldable AMOLED; S Pen ecosystem", "Quick Specs": ["Large productivity canvas", "multitasking", "foldable design", "Expansive foldable workspace", "512GB", "1TB", "16GB RAM", "expansive productivity canvas"], "_amaal_master_price": 5250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Fold7 | Amaal','Galaxy Z Fold7 is Samsung''s vision of what a premium mobile computer can become.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Flip8','samsung-galaxy-z-flip8',b.id,c.id,'Physical','Foldable design · FlexCam','Galaxy Z Flip8 is where fashion, engineering and intelligent mobile technology meet.','{"Technology Support": "5G; Galaxy AI; foldable AMOLED; FlexCam", "Quick Specs": ["Foldable design", "FlexCam", "intelligent mobile experience", "512GB"], "_amaal_master_price": 5200000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Flip8 | Amaal','Galaxy Z Flip8 is where fashion, engineering and intelligent mobile technology meet.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Fold8','samsung-galaxy-z-fold8',b.id,c.id,'Physical','Expansive foldable canvas · multitasking','Galaxy Z Fold8 is designed for those who see their smartphone as more than a communication device.','{"Technology Support": "5G; Galaxy AI; foldable AMOLED; productivity ecosystem", "Quick Specs": ["Expansive foldable canvas", "multitasking", "premium design", "Large foldable display", "serious multitasking", "512GB", "1TB", "16GB RAM", "expansive foldable display"], "_amaal_master_price": 6100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Fold8 | Amaal','Galaxy Z Fold8 is designed for those who see their smartphone as more than a communication device.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Galaxy Z Fold8 Ultra','samsung-galaxy-z-fold8-ultra',b.id,c.id,'Physical','Ultra foldable design · advanced mobile intelligence','The Z Fold8 Ultra represents Samsung''s most ambitious expression of the foldable smartphone concept.','{"Technology Support": "5G; Galaxy AI; foldable AMOLED; Ultra foldable platform", "Quick Specs": ["Ultra foldable design", "advanced mobile intelligence", "512GB", "1TB", "16GB RAM"], "_amaal_master_price": 7650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Galaxy Z Fold8 Ultra | Amaal','The Z Fold8 Ultra represents Samsung''s most ambitious expression of the foldable smartphone concept.'
FROM brands b,product_categories c
WHERE b.slug='samsung' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 15','apple-iphone-15',b.id,c.id,'Physical','6.1-inch Super Retina XDR · A16 Bionic','iPhone 15 delivers the unmistakable Apple experience in an elegant, balanced design.','{"Technology Support": "5G; USB-C; Face ID; Dynamic Island; MagSafe; 5G; USB-C; MagSafe; Face ID", "Quick Specs": ["6.1-inch Super Retina XDR", "A16 Bionic", "48MP Main", "IP68", "Super Retina XDR"], "_amaal_master_price": 2250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 15 | Amaal','iPhone 15 delivers the unmistakable Apple experience in an elegant, balanced design.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 15 Plus','apple-iphone-15-plus',b.id,c.id,'Physical','Large Super Retina XDR display · A16 Bionic','iPhone 15 Plus brings Apple''s refined experience to a larger canvas.','{"Technology Support": "5G; USB-C; Dynamic Island; MagSafe; 5G; USB-C; MagSafe; Face ID", "Quick Specs": ["Large Super Retina XDR display", "A16 Bionic", "48MP camera", "Large display", "advanced camera system"], "_amaal_master_price": 2400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 15 Plus | Amaal','iPhone 15 Plus brings Apple''s refined experience to a larger canvas.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 15 Pro','apple-iphone-15-pro',b.id,c.id,'Physical','Titanium · A17 Pro','iPhone 15 Pro introduced a new level of refinement to Apple''s professional smartphone.','{"Technology Support": "5G; USB-C; ProMotion; MagSafe; Apple Intelligence support; 5G; USB-C; ProMotion; MagSafe", "Quick Specs": ["Titanium", "A17 Pro", "120Hz ProMotion", "48MP Main", "Pro camera system", "ProMotion", "advanced camera system"], "_amaal_master_price": 2750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 15 Pro | Amaal','iPhone 15 Pro introduced a new level of refinement to Apple''s professional smartphone.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 15 Pro Max','apple-iphone-15-pro-max',b.id,c.id,'Physical','6.7-inch ProMotion · titanium','The iPhone 15 Pro Max is designed for customers who want Apple''s largest professional iPhone experience.','{"Technology Support": "5G; USB-C; ProMotion; MagSafe", "Quick Specs": ["6.7-inch ProMotion", "titanium", "A17 Pro", "48MP Main", "5x Telephoto", "Titanium", "professional camera system", "1TB", "ProMotion"], "_amaal_master_price": 3250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 15 Pro Max | Amaal','The iPhone 15 Pro Max is designed for customers who want Apple''s largest professional iPhone experience.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 16','apple-iphone-16',b.id,c.id,'Physical','A18 · 48MP Fusion','iPhone 16 introduces the next generation of Apple''s mainstream iPhone experience.','{"Technology Support": "5G; Camera Control; Apple Intelligence; USB-C; MagSafe; 5G; Apple Intelligence; Camera Control; USB-C; MagSafe", "Quick Specs": ["A18", "48MP Fusion", "Camera Control", "Action button", "IP68"], "_amaal_master_price": 2750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 16 | Amaal','iPhone 16 introduces the next generation of Apple''s mainstream iPhone experience.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 16 Plus','apple-iphone-16-plus',b.id,c.id,'Physical','Large display · A18','iPhone 16 Plus delivers the latest generation iPhone experience on a larger canvas.','{"Technology Support": "5G; Apple Intelligence; Camera Control; USB-C; MagSafe", "Quick Specs": ["Large display", "A18", "48MP Fusion", "256GB"], "_amaal_master_price": 3250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 16 Plus | Amaal','iPhone 16 Plus delivers the latest generation iPhone experience on a larger canvas.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 16 Pro','apple-iphone-16-pro',b.id,c.id,'Physical','Titanium · A18 Pro','iPhone 16 Pro is precision engineered for the professional side of modern mobile life.','{"Technology Support": "5G; Apple Intelligence; ProMotion; Camera Control; USB-C; MagSafe; 5G; Apple Intelligence; ProMotion; Camera Control; USB-C", "Quick Specs": ["Titanium", "A18 Pro", "6.3-inch ProMotion", "48MP Fusion", "ProMotion", "advanced camera system"], "_amaal_master_price": 3600000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 16 Pro | Amaal','iPhone 16 Pro is precision engineered for the professional side of modern mobile life.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 16 Pro Max','apple-iphone-16-pro-max',b.id,c.id,'Physical','6.9-inch ProMotion · titanium','The iPhone 16 Pro Max is Apple''s statement smartphone—large, powerful and uncompromising.','{"Technology Support": "5G; Apple Intelligence; ProMotion; Camera Control; USB-C; MagSafe; 5G; Apple Intelligence; ProMotion; Camera Control; USB-C", "Quick Specs": ["6.9-inch ProMotion", "titanium", "A18 Pro", "48MP Fusion", "5x Telephoto", "ProMotion", "advanced cameras", "1TB"], "_amaal_master_price": 4100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 16 Pro Max | Amaal','The iPhone 16 Pro Max is Apple''s statement smartphone—large, powerful and uncompromising.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 17','apple-iphone-17',b.id,c.id,'Physical','6.3-inch Super Retina XDR · A19','iPhone 17 brings Apple''s latest generation of performance and display technology into the mainstream iPhone experience.','{"Technology Support": "5G; Apple Intelligence; ProMotion; Camera Control; USB-C", "Quick Specs": ["6.3-inch Super Retina XDR", "A19", "48MP Dual Fusion", "120Hz ProMotion", "IP68"], "_amaal_master_price": 3580000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 17 | Amaal','iPhone 17 brings Apple''s latest generation of performance and display technology into the mainstream iPhone experience.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone Air','apple-iphone-air',b.id,c.id,'Physical','6.5-inch · A19 Pro','iPhone Air is Apple''s expression of modern elegance through extreme thinness.','{"Technology Support": "5G; Apple Intelligence; USB-C; MagSafe; ProMotion; 5G; Apple Intelligence; A19 Pro; USB-C; MagSafe", "Quick Specs": ["6.5-inch", "A19 Pro", "5.64mm", "165g", "48MP Fusion", "IP68", "512GB"], "_amaal_master_price": 3700000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone Air | Amaal','iPhone Air is Apple''s expression of modern elegance through extreme thinness.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 17 Pro','apple-iphone-17-pro',b.id,c.id,'Physical','6.3-inch ProMotion · A19 Pro','iPhone 17 Pro is created for people who treat their smartphone as a serious tool.','{"Technology Support": "5G; Apple Intelligence; A19 Pro; ProMotion; Camera Control; USB-C", "Quick Specs": ["6.3-inch ProMotion", "A19 Pro", "48MP Pro Fusion", "Pro telephoto"], "_amaal_master_price": 5100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 17 Pro | Amaal','iPhone 17 Pro is created for people who treat their smartphone as a serious tool.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'iPhone 17 Pro Max','apple-iphone-17-pro-max',b.id,c.id,'Physical','Large ProMotion display · A19 Pro','The iPhone 17 Pro Max is Apple''s flagship statement: maximum screen, maximum Pro capability.','{"Technology Support": "5G; Apple Intelligence; A19 Pro; ProMotion; Camera Control; USB-C; 5G; Apple Intelligence; A19 Pro; ProMotion; USB-C", "Quick Specs": ["Large ProMotion display", "A19 Pro", "48MP Pro Fusion", "ProMotion", "professional camera system", "512GB", "1TB"], "_amaal_master_price": 5650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'iPhone 17 Pro Max | Amaal','The iPhone 17 Pro Max is Apple''s flagship statement: maximum screen, maximum Pro capability.'
FROM brands b,product_categories c
WHERE b.slug='apple' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 8a','google-pixel-pixel-8a',b.id,c.id,'Physical','Computational photography · clean Android','Pixel 8a delivers Google''s signature approach to smartphone intelligence in a compact, beautifully balanced package.','{"Technology Support": "5G; Google Tensor G3; Google AI; Titan M2", "Quick Specs": ["Computational photography", "clean Android", "AI features"], "_amaal_master_price": 1400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 8a | Amaal','Pixel 8a delivers Google''s signature approach to smartphone intelligence in a compact, beautifully balanced package.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 9a','google-pixel-pixel-9a',b.id,c.id,'Physical','AI-powered photography · clean Android','Pixel 9a is designed around Google''s philosophy that a great smartphone should feel intelligent, effortless and genuinely useful.','{"Technology Support": "5G; Tensor G4; Google AI; Gemini; Titan M2; 5G; Tensor G4; Google AI; Gemini", "Quick Specs": ["AI-powered photography", "clean Android", "Tensor G4", "256GB"], "_amaal_master_price": 1650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 9a | Amaal','Pixel 9a is designed around Google''s philosophy that a great smartphone should feel intelligent, effortless and genuinely useful.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 10a','google-pixel-pixel-10a',b.id,c.id,'Physical','AI-first software · computational photography','Pixel 10a brings Google''s increasingly intelligent mobile experience into an accessible form.','{"Technology Support": "5G; Google Tensor platform; Gemini; Google AI", "Quick Specs": ["AI-first software", "computational photography", "clean Android"], "_amaal_master_price": 1950000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 10a | Amaal','Pixel 10a brings Google''s increasingly intelligent mobile experience into an accessible form.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 10','google-pixel-pixel-10',b.id,c.id,'Physical','AI-first flagship experience · computational photography','Pixel 10 is Google''s vision of the intelligent everyday flagship.','{"Technology Support": "5G; Google AI; Gemini; Tensor platform", "Quick Specs": ["AI-first flagship experience", "computational photography", "256GB", "AI-first software"], "_amaal_master_price": 2650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 10 | Amaal','Pixel 10 is Google''s vision of the intelligent everyday flagship.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 10 Pro','google-pixel-pixel-10-pro',b.id,c.id,'Physical','16GB RAM · Pro imaging','Pixel 10 Pro is built for customers who want Google''s most sophisticated traditional Pixel experience.','{"Technology Support": "5G; Google AI; Gemini; Pro camera system", "Quick Specs": ["16GB RAM", "Pro imaging", "AI ecosystem"], "_amaal_master_price": 3550000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 10 Pro | Amaal','Pixel 10 Pro is built for customers who want Google''s most sophisticated traditional Pixel experience.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 10 Pro XL','google-pixel-pixel-10-pro-xl',b.id,c.id,'Physical','Large premium form · 16GB RAM','Pixel 10 Pro XL takes Google''s Pro experience and gives it a larger, more immersive presence.','{"Technology Support": "5G; Google AI; Gemini; Pro camera system", "Quick Specs": ["Large premium form", "16GB RAM", "advanced imaging", "512GB"], "_amaal_master_price": 3650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 10 Pro XL | Amaal','Pixel 10 Pro XL takes Google''s Pro experience and gives it a larger, more immersive presence.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 10 Pro Fold','google-pixel-pixel-10-pro-fold',b.id,c.id,'Physical','Foldable display · multitasking','Pixel 10 Pro Fold brings Google''s intelligence into an entirely different form.','{"Technology Support": "5G; Google AI; Gemini; foldable display", "Quick Specs": ["Foldable display", "multitasking", "AI ecosystem", "512GB", "foldable workspace"], "_amaal_master_price": 4850000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 10 Pro Fold | Amaal','Pixel 10 Pro Fold brings Google''s intelligence into an entirely different form.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Pixel 11 Pro XL','google-pixel-pixel-11-pro-xl',b.id,c.id,'Physical','Large premium form · 16GB','Pixel 11 Pro XL represents the next step in Google''s AI-first smartphone philosophy.','{"Technology Support": "5G; Google AI; Gemini; Pro camera system", "Quick Specs": ["Large premium form", "16GB", "Pro Pixel ecosystem"], "_amaal_master_price": 5250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Pixel 11 Pro XL | Amaal','Pixel 11 Pro XL represents the next step in Google''s AI-first smartphone philosophy.'
FROM brands b,product_categories c
WHERE b.slug='google-pixel' AND c.slug='phones'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Go 5','jbl-go-5',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Palm-sized · up to 10 hours','Big sound. Small footprint. JBL Go 5 puts unmistakable JBL character into a compact speaker designed to go wherever the day takes you.','{"Technology support": "Bluetooth; Auracast; USB-C audio; IP68", "Quick specs": "Palm-sized; up to 10 hours; waterproof; dustproof; drop-proof; Playtime Boost", "_amaal_master_price": 220000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Go 5 | Amaal','Big sound. Small footprint. JBL Go 5 puts unmistakable JBL character into a compact speaker designed to go wherever the day takes you.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Clip 5','jbl-clip-5',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Integrated carabiner · up to 12 hours plus Playtime Boost','Your music, wherever the day takes you. JBL Clip 5 is engineered around effortless portability, with an integrated carabiner.','{"Technology support": "Bluetooth; Auracast; IP67", "Quick specs": "Integrated carabiner; up to 12 hours plus Playtime Boost; waterproof; dustproof", "_amaal_master_price": 230000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Clip 5 | Amaal','Your music, wherever the day takes you. JBL Clip 5 is engineered around effortless portability, with an integrated carabiner.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Grip','jbl-grip',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Compact portable form · JBL Pro Sound','Compact enough to carry. Bold enough to stand out. JBL Grip combines portable JBL sound with an expressive ambient-light experience.','{"Technology support": "Bluetooth; portable wireless audio; ambient lighting", "Quick specs": "Compact portable form; JBL Pro Sound; ambient light", "_amaal_master_price": 320000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Grip | Amaal','Compact enough to carry. Bold enough to stand out. JBL Grip combines portable JBL sound with an expressive ambient-light experience.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Flip 7','jbl-flip-7',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','25W RMS woofer · 10W RMS tweeter','Portable enough for every day. Powerful enough for the occasion. JBL Flip 7 strikes an exceptional balance between portability and performance.','{"Technology support": "Bluetooth; Auracast; AI Sound Boost; IP68", "Quick specs": "25W RMS woofer; 10W RMS tweeter; 60Hz–20kHz; up to 16 hours", "_amaal_master_price": 400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Flip 7 | Amaal','Portable enough for every day. Powerful enough for the occasion. JBL Flip 7 strikes an exceptional balance between portability and performance.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Charge 6','jbl-charge-6',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Up to 28 hours · portable design','More music. More freedom. More battery. JBL Charge 6 is built for customers who do not want their listening experience interrupted.','{"Technology support": "Bluetooth; Auracast; AI Sound Boost; power-bank functionality", "Quick specs": "Up to 28 hours; portable design; device charging", "_amaal_master_price": 550000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Charge 6 | Amaal','More music. More freedom. More battery. JBL Charge 6 is built for customers who do not want their listening experience interrupted.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Horizon 3','jbl-horizon-3',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Premium bedside speaker · integrated lighting','Turn your bedside into a better experience. JBL Horizon 3 combines JBL sound with audio, lighting and alarm functionality.','{"Technology support": "Bluetooth; bedside audio; ambient lighting; alarm functionality", "Quick specs": "Premium bedside speaker; integrated lighting; alarm experience", "_amaal_master_price": 550000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Horizon 3 | Amaal','Turn your bedside into a better experience. JBL Horizon 3 combines JBL sound with audio, lighting and alarm functionality.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Xtreme 4','jbl-xtreme-4',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Powerful portable sound · up to 24 hours','Bigger portable sound without the compromise. JBL Xtreme 4 is designed for customers who want serious audio performance without a fixed home speaker.','{"Technology support": "Bluetooth; Auracast; IP67; power-bank functionality", "Quick specs": "Powerful portable sound; up to 24 hours; waterproof; dustproof", "_amaal_master_price": 990000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Xtreme 4 | Amaal','Bigger portable sound without the compromise. JBL Xtreme 4 is designed for customers who want serious audio performance without a fixed home speaker.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Xtreme 5','jbl-xtreme-5',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Up to 24 hours standard · additional Playtime Boost','Take powerful JBL sound further. Xtreme 5 is built for customers who want a substantial portable audio experience with the freedom to take it anywhere.','{"Technology support": "Bluetooth; Auracast; IP67; Playtime Boost", "Quick specs": "Up to 24 hours standard; additional Playtime Boost; rugged portable design", "_amaal_master_price": 1250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Xtreme 5 | Amaal','Take powerful JBL sound further. Xtreme 5 is built for customers who want a substantial portable audio experience with the freedom to take it anywhere.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Authentics 300','jbl-authentics-300',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Premium home speaker · portable design','Premium sound designed for the home. JBL Authentics 300 brings a sophisticated aesthetic together with powerful JBL audio.','{"Technology support": "Wi-Fi; Bluetooth; connected home audio; smart speaker platform", "Quick specs": "Premium home speaker; portable design; high-quality audio", "_amaal_master_price": 1250000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Authentics 300 | Amaal','Premium sound designed for the home. JBL Authentics 300 brings a sophisticated aesthetic together with powerful JBL audio.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL PartyBox Encore 2 with Mic','jbl-partybox-encore-2-with-mic',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Portable party speaker · wireless microphone','Turn any gathering into an event. PartyBox Encore 2 brings JBL party sound, dynamic lighting and a wireless microphone together.','{"Technology support": "Bluetooth; wireless microphone; party lighting; karaoke", "Quick specs": "Portable party speaker; wireless microphone; microphone holder; lighting", "_amaal_master_price": 1500000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL PartyBox Encore 2 with Mic | Amaal','Turn any gathering into an event. PartyBox Encore 2 brings JBL party sound, dynamic lighting and a wireless microphone together.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Boombox 4','jbl-boombox-4',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Powerful portable sound · up to 34 hours with Playtime Boost','Built for big sound and long sessions. JBL Boombox 4 is for listeners who want a commanding portable speaker.','{"Technology support": "Bluetooth; Auracast; Playtime Boost", "Quick specs": "Powerful portable sound; up to 34 hours with Playtime Boost; large-format portable design", "_amaal_master_price": 1800000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Boombox 4 | Amaal','Built for big sound and long sessions. JBL Boombox 4 is for listeners who want a commanding portable speaker.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL PartyBox Stage 320','jbl-partybox-stage-320',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','240W output · up to 18 hours','Bring the party with you. JBL PartyBox Stage 320 combines serious output with the mobility of a wheeled entertainment system.','{"Technology support": "Bluetooth; Auracast; AI Sound Boost; microphone input; guitar input; party lighting", "Quick specs": "240W output; up to 18 hours; wheels; telescopic handle; splashproof", "_amaal_master_price": 2350000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL PartyBox Stage 320 | Amaal','Bring the party with you. JBL PartyBox Stage 320 combines serious output with the mobility of a wheeled entertainment system.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL PartyBox Ultimate','jbl-partybox-ultimate',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','1100W output · Wi-Fi','When ordinary speakers are not enough. JBL PartyBox Ultimate is engineered for large-scale entertainment.','{"Technology support": "Bluetooth; Wi-Fi; Dolby Atmos; multidimensional lightshow; splashproof", "Quick specs": "1100W output; Wi-Fi; immersive audio; multidimensional lighting", "_amaal_master_price": 4650000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL PartyBox Ultimate | Amaal','When ordinary speakers are not enough. JBL PartyBox Ultimate is engineered for large-scale entertainment.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune 310 USB-C','jbl-tune-310-usb-c',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','USB-C wired connection · Pure Bass','Simple, connected and refined. JBL Tune 310 USB-C delivers JBL Pure Bass through a modern USB-C connection.','{"Technology support": "USB-C; Hi-Res Audio; Pure Bass; in-line microphone", "Quick specs": "USB-C wired connection; Pure Bass; Hi-Res Audio; three-button remote", "_amaal_master_price": 70000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune 310 USB-C | Amaal','Simple, connected and refined. JBL Tune 310 USB-C delivers JBL Pure Bass through a modern USB-C connection.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune 305C USB-C','jbl-tune-305c-usb-c',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Wired USB-C audio · Pure Bass','A smarter take on everyday wired audio. Tune 305C combines JBL Pure Bass with USB-C connectivity.','{"Technology support": "USB-C; Hi-Res Audio; Pure Bass; in-line microphone", "Quick specs": "Wired USB-C audio; Pure Bass; Hi-Res Audio; three-button remote", "_amaal_master_price": 70000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune 305C USB-C | Amaal','A smarter take on everyday wired audio. Tune 305C combines JBL Pure Bass with USB-C connectivity.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Endurance Run 2 Wireless','jbl-endurance-run-2-wireless',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Wireless sports earphones · secure fit','Built to move with you. JBL Endurance Run 2 Wireless combines wireless freedom with a secure, exercise-ready fit.','{"Technology support": "Wireless Bluetooth; sports-oriented design", "Quick specs": "Wireless sports earphones; secure fit; sweat-resistant design", "_amaal_master_price": 165000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Endurance Run 2 Wireless | Amaal','Built to move with you. JBL Endurance Run 2 Wireless combines wireless freedom with a secure, exercise-ready fit.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune 530BT','jbl-tune-530bt',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','33mm drivers · up to 76 hours','Long listening without the constant search for a charger. JBL Tune 530BT combines powerful Pure Bass and exceptional battery endurance.','{"Technology support": "Bluetooth; Pure Bass; beamforming microphones", "Quick specs": "33mm drivers; up to 76 hours; two beamforming microphones", "_amaal_master_price": 190000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune 530BT | Amaal','Long listening without the constant search for a charger. JBL Tune 530BT combines powerful Pure Bass and exceptional battery endurance.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune 730BT','jbl-tune-730bt',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Wireless over-ear design · JBL Pure Bass','Tune 730BT is built for listeners who want a fuller over-ear experience with the freedom of wireless connectivity.','{"Technology support": "Bluetooth; wireless audio; Pure Bass", "Quick specs": "Wireless over-ear design; JBL Pure Bass; extended battery", "_amaal_master_price": 230000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune 730BT | Amaal','Tune 730BT is built for listeners who want a fuller over-ear experience with the freedom of wireless connectivity.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune 770NC','jbl-tune-770nc',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Over-ear design · ANC','Put the outside world on pause. JBL Tune 770NC combines wireless JBL sound with active noise cancellation.','{"Technology support": "Bluetooth; Active Noise Cancelling; wireless audio", "Quick specs": "Over-ear design; ANC; JBL Pure Bass; extended listening", "_amaal_master_price": 300000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune 770NC | Amaal','Put the outside world on pause. JBL Tune 770NC combines wireless JBL sound with active noise cancellation.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune Buds 2','jbl-tune-buds-2',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Compact true wireless · ANC','Small enough to disappear. Sophisticated enough to impress. Tune Buds 2 bring JBL''s personal audio experience into a compact form.','{"Technology support": "True wireless; ANC; Spatial Sound; Smart Ambient", "Quick specs": "Compact true wireless; ANC; Spatial Sound; Smart Ambient", "_amaal_master_price": 320000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune Buds 2 | Amaal','Small enough to disappear. Sophisticated enough to impress. Tune Buds 2 bring JBL''s personal audio experience into a compact form.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tune Beam 2','jbl-tune-beam-2',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','10mm drivers · Pure Bass','JBL Tune Beam 2 is engineered for a more immersive personal listening experience.','{"Technology support": "True wireless; Adaptive ANC; Spatial Sound; Smart Ambient", "Quick specs": "10mm drivers; Pure Bass; Adaptive ANC; Spatial Sound; six microphones", "_amaal_master_price": 350000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tune Beam 2 | Amaal','JBL Tune Beam 2 is engineered for a more immersive personal listening experience.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Soundgear Frames','jbl-soundgear-frames',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Open-ear wearable audio · hands-free listening','Soundgear Frames redefine what personal audio can look like, with open-ear listening and wireless JBL sound.','{"Technology support": "Open-ear wireless audio; Bluetooth", "Quick specs": "Open-ear wearable audio; hands-free listening; lifestyle design", "_amaal_master_price": 400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Soundgear Frames | Amaal','Soundgear Frames redefine what personal audio can look like, with open-ear listening and wireless JBL sound.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Live Flex 3','jbl-live-flex-3',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Open true-wireless · adaptive ANC','JBL Live Flex 3 delivers an elevated true-wireless experience built around comfort, intelligent control and immersive sound.','{"Technology support": "True wireless; ANC; Smart Charging Case; Spatial Sound", "Quick specs": "Open true-wireless; adaptive ANC; Smart Charging Case; Signature Sound", "_amaal_master_price": 600000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Live Flex 3 | Amaal','JBL Live Flex 3 delivers an elevated true-wireless experience built around comfort, intelligent control and immersive sound.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Live Beam 3','jbl-live-beam-3',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','10mm dynamic drivers · Signature Sound','Live Beam 3 turns personal audio into a more complete experience with powerful drivers, ANC, spatial sound and a touchscreen Smart Charging Case.','{"Technology support": "True wireless; Adaptive ANC; Spatial Sound; Smart Charging Case", "Quick specs": "10mm dynamic drivers; Signature Sound; Spatial Sound; adaptive ANC; 1.45-inch touchscreen case; up to 48 hours", "_amaal_master_price": 600000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Live Beam 3 | Amaal','Live Beam 3 turns personal audio into a more complete experience with powerful drivers, ANC, spatial sound and a touchscreen Smart Charging Case.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tour Pro 3','jbl-tour-pro-3',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Premium true-wireless · advanced noise cancellation','Tour Pro 3 is designed for customers who expect more from their earbuds.','{"Technology support": "True wireless; premium ANC; Smart Charging Case; spatial audio", "Quick specs": "Premium true-wireless; advanced noise cancellation; smart case", "_amaal_master_price": 750000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tour Pro 3 | Amaal','Tour Pro 3 is designed for customers who expect more from their earbuds.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tour One M3','jbl-tour-one-m3',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Flagship over-ear · advanced ANC','Tour One M3 is JBL''s refined over-ear experience for listeners who take personal audio seriously.','{"Technology support": "Premium wireless audio; Active Noise Cancelling; high-resolution listening", "Quick specs": "Flagship over-ear; advanced ANC; premium sound", "_amaal_master_price": 1080000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tour One M3 | Amaal','Tour One M3 is JBL''s refined over-ear experience for listeners who take personal audio seriously.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Tour One M3 Smart Tx','jbl-tour-one-m3-smart-tx',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Premium over-ear · Smart Tx touchscreen transmitter','Tour One M3 Smart Tx takes premium personal audio beyond the headphones themselves.','{"Technology support": "Premium wireless audio; Active Noise Cancelling; touchscreen audio transmitter", "Quick specs": "Premium over-ear; Smart Tx touchscreen transmitter; advanced ANC", "_amaal_master_price": 1200000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Tour One M3 Smart Tx | Amaal','Tour One M3 Smart Tx takes premium personal audio beyond the headphones themselves.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL PartyLight Stick','jbl-partylight-stick',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Portable party light · dynamic lighting effects','Give the party another dimension. JBL PartyLight Stick adds dynamic visual energy to your entertainment setup.','{"Technology support": "Party lighting; JBL PartyBox ecosystem", "Quick specs": "Portable party light; dynamic lighting effects", "_amaal_master_price": 300000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL PartyLight Stick | Amaal','Give the party another dimension. JBL PartyLight Stick adds dynamic visual energy to your entertainment setup.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL PartyLight Beam','jbl-partylight-beam',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Party lighting system · dynamic effects','Designed to make the atmosphere impossible to ignore. JBL PartyLight Beam adds a more dramatic lighting presence.','{"Technology support": "Party lighting; JBL PartyBox ecosystem", "Quick specs": "Party lighting system; dynamic effects", "_amaal_master_price": 440000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL PartyLight Beam | Amaal','Designed to make the atmosphere impossible to ignore. JBL PartyLight Beam adds a more dramatic lighting presence.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL Wireless Microphone Set','jbl-wireless-microphone-set',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Wireless microphones · karaoke and presentation use','Put the microphone in the hands of the performer. JBL Wireless Microphone Set brings wireless freedom to karaoke, speeches and events.','{"Technology support": "Wireless microphone system; JBL party ecosystem", "Quick specs": "Wireless microphones; karaoke and presentation use", "_amaal_master_price": 400000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL Wireless Microphone Set | Amaal','Put the microphone in the hands of the performer. JBL Wireless Microphone Set brings wireless freedom to karaoke, speeches and events.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'JBL PartyBox Wireless Mic Set','jbl-partybox-wireless-mic-set',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Wireless microphone set · PartyBox compatibility','Complete the PartyBox experience with wireless performance freedom for karaoke, announcements and live entertainment.','{"Technology support": "Wireless microphones; JBL PartyBox ecosystem", "Quick specs": "Wireless microphone set; PartyBox compatibility", "_amaal_master_price": 440000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'JBL PartyBox Wireless Mic Set | Amaal','Complete the PartyBox experience with wireless performance freedom for karaoke, announcements and live entertainment.'
FROM brands b,product_categories a
WHERE b.slug='jbl' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Harman Kardon Luna','harman-kardon-luna',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Portable Bluetooth · up to 12 hours','Refined design. Remarkable portability. Harman Kardon Luna brings the brand''s elegant design philosophy into a compact speaker.','{"Technology support": "Bluetooth; IP67; stereo pairing", "Quick specs": "Portable Bluetooth; up to 12 hours; waterproof; dustproof", "_amaal_master_price": 470000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Harman Kardon Luna | Amaal','Refined design. Remarkable portability. Harman Kardon Luna brings the brand''s elegant design philosophy into a compact speaker.'
FROM brands b,product_categories a
WHERE b.slug='harman-kardon' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Harman Kardon Onyx Studio 9','harman-kardon-onyx-studio-9',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Portable stereo · integrated handle','Designed to sound as beautiful as it looks. Onyx Studio 9 combines Harman Kardon''s sculptural design with refined stereo listening.','{"Technology support": "Bluetooth; USB; Constant Sound Field; automatic self-tuning", "Quick specs": "Portable stereo; integrated handle; up to 8 hours; auto self-tuning", "_amaal_master_price": 800000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Harman Kardon Onyx Studio 9 | Amaal','Designed to sound as beautiful as it looks. Onyx Studio 9 combines Harman Kardon''s sculptural design with refined stereo listening.'
FROM brands b,product_categories a
WHERE b.slug='harman-kardon' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Harman Kardon Citation 200','harman-kardon-citation-200',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Premium connected speaker · portable home design','Premium sound, intelligently connected. Harman Kardon Citation 200 is designed for sophisticated audio integrated into a connected home.','{"Technology support": "Wireless smart-home audio; Wi-Fi; Bluetooth", "Quick specs": "Premium connected speaker; portable home design; smart audio", "_amaal_master_price": 1100000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Harman Kardon Citation 200 | Amaal','Premium sound, intelligently connected. Harman Kardon Citation 200 is designed for sophisticated audio integrated into a connected home.'
FROM brands b,product_categories a
WHERE b.slug='harman-kardon' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured,seo_title,seo_description)
SELECT 'Harman Kardon Go + Play 3','harman-kardon-go-play-3',b.id,COALESCE((SELECT id FROM product_categories WHERE slug='entertainment-audio' LIMIT 1),a.id),'Physical','Premium portable home speaker · up to 8 hours','Premium home sound, wherever you want it. Go + Play 3 combines Harman Kardon''s distinctive design language with powerful portable listening.','{"Technology support": "Bluetooth; portable premium audio", "Quick specs": "Premium portable home speaker; up to 8 hours; integrated carry design", "_amaal_master_price": 1150000, "_amaal_master_source": "amaal_phones_and_speakers_master_catalogue.md"}'::jsonb,'Active','Hidden',false,'Harman Kardon Go + Play 3 | Amaal','Premium home sound, wherever you want it. Go + Play 3 combines Harman Kardon''s distinctive design language with powerful portable listening.'
FROM brands b,product_categories a
WHERE b.slug='harman-kardon' AND a.slug='audio'
ON CONFLICT(slug) DO NOTHING;

COMMIT;
