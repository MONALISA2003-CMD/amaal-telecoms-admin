-- Amaal Telecoms mobile-phone master catalogue sync
-- Source: Mobile_Phone_Catalogue_Master_2026.md, 27 Aug 2026
-- Safe: additive/upsert only; never DELETE/TRUNCATE/DROP/reset business data.
DO $$
DECLARE
  line text; parts text[]; brand text; model text; family text; variant_text text; v text; storage text; ram text; pname text; pslug text; cslug text; bslug text; vsku text; vname text; net text; pid uuid; bid uuid; cid uuid; m text[];
BEGIN
  INSERT INTO brands(name,slug,status,website_visibility) VALUES ('Apple','apple','Active','Published'),('Samsung','samsung','Active','Published'),('Google','google','Active','Published'),('TECNO','tecno','Active','Published'),('Infinix','infinix','Active','Published'),('itel','itel','Active','Published') ON CONFLICT(name) DO UPDATE SET slug=EXCLUDED.slug,status='Active',website_visibility='Published',updated_at=now();
  INSERT INTO product_categories(parent_id,name,slug,status) SELECT id,'Google Pixel','phones-google-pixel','Active' FROM product_categories WHERE slug='phones' ON CONFLICT(slug) DO NOTHING;
  INSERT INTO product_categories(parent_id,name,slug,status) SELECT id,'TECNO','phones-tecno','Active' FROM product_categories WHERE slug='phones' ON CONFLICT(slug) DO NOTHING;
  INSERT INTO product_categories(parent_id,name,slug,status) SELECT id,'Infinix','phones-infinix','Active' FROM product_categories WHERE slug='phones' ON CONFLICT(slug) DO NOTHING;
  INSERT INTO product_categories(parent_id,name,slug,status) SELECT id,'itel','phones-itel','Active' FROM product_categories WHERE slug='phones' ON CONFLICT(slug) DO NOTHING;
  FOR line IN SELECT regexp_split_to_table($catalogue$Apple|iPhone 11|iPhone 11 Series|64GB;128GB;256GB
Apple|iPhone 11 Pro|iPhone 11 Series|64GB;256GB;512GB
Apple|iPhone 11 Pro Max|iPhone 11 Series|64GB;256GB;512GB
Apple|iPhone 12 mini|iPhone 12 Series|64GB;128GB;256GB
Apple|iPhone 12|iPhone 12 Series|64GB;128GB;256GB
Apple|iPhone 12 Pro|iPhone 12 Series|128GB;256GB;512GB
Apple|iPhone 12 Pro Max|iPhone 12 Series|128GB;256GB;512GB
Apple|iPhone 13 mini|iPhone 13 Series|128GB;256GB;512GB
Apple|iPhone 13|iPhone 13 Series|128GB;256GB;512GB
Apple|iPhone 13 Pro|iPhone 13 Series|128GB;256GB;512GB;1TB
Apple|iPhone 13 Pro Max|iPhone 13 Series|128GB;256GB;512GB;1TB
Apple|iPhone 14|iPhone 14 Series|128GB;256GB;512GB
Apple|iPhone 14 Plus|iPhone 14 Series|128GB;256GB;512GB
Apple|iPhone 14 Pro|iPhone 14 Series|128GB;256GB;512GB;1TB
Apple|iPhone 14 Pro Max|iPhone 14 Series|128GB;256GB;512GB;1TB
Apple|iPhone 15|iPhone 15 Series|128GB;256GB;512GB
Apple|iPhone 15 Plus|iPhone 15 Series|128GB;256GB;512GB
Apple|iPhone 15 Pro|iPhone 15 Series|128GB;256GB;512GB;1TB
Apple|iPhone 15 Pro Max|iPhone 15 Series|256GB;512GB;1TB
Apple|iPhone 16|iPhone 16 Series|128GB;256GB;512GB
Apple|iPhone 16 Plus|iPhone 16 Series|128GB;256GB;512GB
Apple|iPhone 16 Pro|iPhone 16 Series|128GB;256GB;512GB;1TB
Apple|iPhone 16 Pro Max|iPhone 16 Series|256GB;512GB;1TB
Apple|iPhone 16e|iPhone 16 Series|128GB;256GB;512GB
Apple|iPhone 17|iPhone 17 Series|256GB;512GB
Apple|iPhone Air|iPhone 17 Series|256GB;512GB;1TB
Apple|iPhone 17 Pro|iPhone 17 Series|256GB;512GB;1TB
Apple|iPhone 17 Pro Max|iPhone 17 Series|256GB;512GB;1TB;2TB
Apple|iPhone 17e|iPhone 17 Series|256GB;512GB
Samsung|Galaxy A06|Galaxy A Series|64GB / 4GB RAM;64GB / 6GB RAM;128GB / 4GB RAM;128GB / 6GB RAM
Samsung|Galaxy A07|Galaxy A Series|128GB / 4GB RAM;128GB / 6GB RAM
Samsung|Galaxy A14|Galaxy A Series|64GB / 4GB RAM;128GB / 4GB RAM;128GB / 6GB RAM
Samsung|Galaxy A15 4G|Galaxy A Series|128GB / 4GB RAM;128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A15 5G|Galaxy A Series|128GB / 4GB RAM;256GB / 8GB RAM
Samsung|Galaxy A16 4G|Galaxy A Series|128GB / 4GB RAM;128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A16 5G|Galaxy A Series|128GB / 4GB RAM;128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A17|Galaxy A Series|128GB / 4GB RAM;128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A24|Galaxy A Series|128GB / 4GB RAM;128GB / 6GB RAM;128GB / 8GB RAM
Samsung|Galaxy A25 5G|Galaxy A Series|128GB / 6GB RAM;128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy A26 5G|Galaxy A Series|128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A34 5G|Galaxy A Series|128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A35 5G|Galaxy A Series|128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A36 5G|Galaxy A Series|128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A54 5G|Galaxy A Series|128GB / 6GB RAM;256GB / 8GB RAM
Samsung|Galaxy A55 5G|Galaxy A Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy A56 5G|Galaxy A Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy A57 5G|Galaxy A Series|128GB / 8GB RAM;256GB / 8GB RAM;256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S21|Galaxy S Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy S21+|Galaxy S Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy S21 Ultra|Galaxy S Series|128GB / 12GB RAM;256GB / 12GB RAM;512GB / 16GB RAM
Samsung|Galaxy S22|Galaxy S Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy S22+|Galaxy S Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy S22 Ultra|Galaxy S Series|128GB / 8GB RAM;256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy S23|Galaxy S Series|128GB / 8GB RAM;256GB / 8GB RAM
Samsung|Galaxy S23+|Galaxy S Series|256GB / 8GB RAM;512GB / 8GB RAM
Samsung|Galaxy S23 Ultra|Galaxy S Series|256GB / 8GB RAM;256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy S24|Galaxy S Series|128GB / 8GB RAM;256GB / 8GB RAM;512GB / 8GB RAM
Samsung|Galaxy S24+|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S24 Ultra|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy S25|Galaxy S Series|128GB / 12GB RAM;256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S25+|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S25 Ultra|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy S25 Edge|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S26|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S26+|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy S26 Ultra|Galaxy S Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 16GB RAM
Samsung|Galaxy Z Fold4|Galaxy Z Fold Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy Z Fold5|Galaxy Z Fold Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy Z Fold6|Galaxy Z Fold Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Samsung|Galaxy Z Fold7|Galaxy Z Fold Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 16GB RAM
Samsung|Galaxy Z Fold8|Galaxy Z Fold Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 16GB RAM
Samsung|Galaxy Z Fold8 Ultra|Galaxy Z Fold Series|256GB / 12GB RAM;512GB / 12GB RAM;1TB / 16GB RAM
Samsung|Galaxy Z Flip4|Galaxy Z Flip Series|128GB / 8GB RAM;256GB / 8GB RAM;512GB / 8GB RAM
Samsung|Galaxy Z Flip5|Galaxy Z Flip Series|256GB / 8GB RAM;512GB / 8GB RAM
Samsung|Galaxy Z Flip6|Galaxy Z Flip Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy Z Flip7|Galaxy Z Flip Series|256GB / 12GB RAM;512GB / 12GB RAM
Samsung|Galaxy Z Flip8|Galaxy Z Flip Series|256GB / 12GB RAM;512GB / 12GB RAM
Google|Pixel 6|Pixel 6 Series|128GB / 8GB RAM;256GB / 8GB RAM
Google|Pixel 6 Pro|Pixel 6 Series|128GB / 12GB RAM;256GB / 12GB RAM;512GB / 12GB RAM
Google|Pixel 6a|Pixel 6 Series|128GB / 6GB RAM
Google|Pixel 7|Pixel 7 Series|128GB / 8GB RAM;256GB / 8GB RAM
Google|Pixel 7 Pro|Pixel 7 Series|128GB / 12GB RAM;256GB / 12GB RAM;512GB / 12GB RAM
Google|Pixel 7a|Pixel 7 Series|128GB / 8GB RAM
Google|Pixel 8|Pixel 8 Series|128GB / 8GB RAM;256GB / 8GB RAM
Google|Pixel 8 Pro|Pixel 8 Series|128GB / 12GB RAM;256GB / 12GB RAM;512GB / 12GB RAM;1TB / 12GB RAM
Google|Pixel 8a|Pixel 8 Series|128GB / 8GB RAM;256GB / 8GB RAM
Google|Pixel 9|Pixel 9 Series|128GB / 12GB RAM;256GB / 12GB RAM
Google|Pixel 9 Pro|Pixel 9 Series|128GB / 16GB RAM;256GB / 16GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 9 Pro XL|Pixel 9 Series|128GB / 16GB RAM;256GB / 16GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 9 Pro Fold|Pixel 9 Series|256GB / 16GB RAM;512GB / 16GB RAM
Google|Pixel 9a|Pixel 9 Series|128GB / 8GB RAM;256GB / 8GB RAM
Google|Pixel 10|Pixel 10 Series|128GB / 12GB RAM;256GB / 12GB RAM
Google|Pixel 10 Pro|Pixel 10 Series|128GB / 16GB RAM;256GB / 16GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 10 Pro XL|Pixel 10 Series|256GB / 16GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 10 Pro Fold|Pixel 10 Series|256GB / 16GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 10a|Pixel 10 Series|128GB / 8GB RAM;256GB / 8GB RAM
Google|Pixel 11|Pixel 11 Series|256GB / 12GB RAM
Google|Pixel 11 Pro|Pixel 11 Series|256GB / 12GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 11 Pro XL|Pixel 11 Series|256GB / 12GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
Google|Pixel 11 Pro Fold|Pixel 11 Series|256GB / 16GB RAM;512GB / 16GB RAM;1TB / 16GB RAM
TECNO|Camon 50 Ultra 5G|CAMON Series|512GB / 12GB RAM
TECNO|Camon Slim|CAMON Series|256GB / 8GB RAM
TECNO|Camon 50 Pro 5G/4G|CAMON Series|256GB / 12GB RAM
TECNO|Camon 50 Pro 5G/4G|CAMON Series|256GB / 8GB RAM
TECNO|Camon 50 4G|CAMON Series|256GB / 8GB RAM
TECNO|Camon 50 4G|CAMON Series|128GB / 8GB RAM
TECNO|Camon 40 Pro 5G|CAMON Series|256GB / 8GB RAM
TECNO|Camon 40 Pro 5G|CAMON Series|256GB / 12GB RAM
TECNO|Spark 50 Pro|SPARK Series|256GB / 8GB RAM
TECNO|Spark 50 5G|SPARK Series|256GB / 6GB RAM
TECNO|Spark 50 5G|SPARK Series|128GB / 4GB RAM
TECNO|Spark 50 4G|SPARK Series|256GB / 8GB RAM
TECNO|Spark 50 4G|SPARK Series|128GB / 4GB RAM
TECNO|Spark 50C|SPARK Series|128GB / 4GB RAM
TECNO|Spark 30C|SPARK Series|128GB / 4GB RAM
TECNO|Spark 30C 5G|SPARK Series|128GB / 4GB RAM
TECNO|Spark Go 1|SPARK Series|64GB / 3GB RAM
TECNO|Spark Go 1|SPARK Series|128GB / 4GB RAM
TECNO|Spark Go 2|SPARK Series|64GB / 3GB RAM
TECNO|Spark Go 2|SPARK Series|128GB / 4GB RAM
TECNO|POVA 8 Pro 5G|POVA Series|256GB / 8GB RAM
TECNO|POVA 8 5G|POVA Series|256GB / 8GB RAM
TECNO|POVA Curve 2 5G|POVA Series|256GB / 8GB RAM
TECNO|POVA 6 Neo|POVA Series|128GB / 8GB RAM
TECNO|POVA 6 Neo|POVA Series|256GB / 8GB RAM
TECNO|Phantom V Fold2 5G|PHANTOM Series|512GB / 12GB RAM
TECNO|Phantom V Flip2 5G|PHANTOM Series|256GB / 8GB RAM
TECNO|Phantom X3 Pro|PHANTOM Series|256GB / 12GB RAM
TECNO|Pop 9 5G|POP Series|64GB / 4GB RAM
TECNO|Pop 9 5G|POP Series|128GB / 4GB RAM
TECNO|Pop 20|POP Series|64GB / 3GB RAM
TECNO|Pop 20|POP Series|64GB / 4GB RAM
TECNO|Pop 10|POP Series|64GB / 3GB RAM
TECNO|Pop 10|POP Series|64GB / 4GB RAM
Infinix|Note 60 Ultra|NOTE Series|512GB / 12GB RAM
Infinix|Note 60 Pro 5G|NOTE Series|256GB / 12GB RAM
Infinix|Note 60 Pro 5G|NOTE Series|256GB / 8GB RAM
Infinix|Note Edge 5G|NOTE Series|256GB / 8GB RAM
Infinix|Note 50X 5G|NOTE Series|256GB / 8GB RAM
Infinix|Note 50S|NOTE Series|256GB / 8GB RAM
Infinix|Hot 70 Pro 5G+|HOT Series|256GB / 12GB RAM
Infinix|Hot 70|HOT Series|256GB / 8GB RAM
Infinix|Hot 60 Pro+|HOT Series|256GB / 8GB RAM
Infinix|Hot 60i|HOT Series|256GB / 4GB RAM
Infinix|Hot 50 Pro+ 4G|HOT Series|128GB / 8GB RAM
Infinix|Hot 50 Pro+ 4G|HOT Series|256GB / 8GB RAM
Infinix|Hot 50i|HOT Series|128GB / 4GB RAM
Infinix|GT 50 Pro|GT Series|256GB / 12GB RAM
Infinix|GT 30 Pro|GT Series|256GB / 8GB RAM
Infinix|Smart 20|SMART Series|128GB / 4GB RAM
Infinix|Smart 10 Plus|SMART Series|64GB / 3GB RAM
Infinix|Smart 10 Plus|SMART Series|64GB / 4GB RAM
Infinix|Smart 10 HD|SMART Series|64GB / 3GB RAM
Infinix|Smart 10 HD|SMART Series|64GB / 4GB RAM
itel|Super 26 Ultra|S Series|128GB / 8GB RAM
itel|Super 26 Ultra|S Series|256GB / 8GB RAM
itel|S25 Ultra|S Series|128GB / 8GB RAM
itel|S25 Ultra|S Series|256GB / 8GB RAM
itel|S25|S Series|128GB / 8GB RAM
itel|S25|S Series|256GB / 8GB RAM
itel|Power 80|P / POWER Series|128GB / 4GB RAM
itel|Power 70|P / POWER Series|128GB / 4GB RAM
itel|P65|P / POWER Series|128GB / 4GB RAM
itel|P55|P / POWER Series|128GB / 6GB RAM
itel|P55|P / POWER Series|128GB / 8GB RAM
itel|P55 5G|P / POWER Series|128GB / 6GB RAM
itel|P55 5G|P / POWER Series|128GB / 8GB RAM
itel|City 200|CITY Series|128GB / 4GB RAM
itel|City 200s|CITY Series|128GB / 4GB RAM
itel|City 100|CITY Series|128GB / 4GB RAM
itel|City 100|CITY Series|256GB / 8GB RAM
itel|A100C|A Series|64GB / 2GB RAM
itel|A100 Pro|A Series|64GB / 2GB RAM
itel|A80|A Series|128GB / 3GB RAM
itel|A80|A Series|128GB / 4GB RAM
itel|A70|A Series|128GB / 3GB RAM
itel|A70|A Series|128GB / 4GB RAM
itel|A70|A Series|256GB / 4GB RAM
itel|A50|A Series|64GB / 3GB RAM
itel|A50C|A Series|64GB / 3GB RAM$catalogue$,'\n') LOOP
    parts:=string_to_array(line,'|'); brand:=parts[1]; model:=parts[2]; family:=parts[3]; variant_text:=parts[4];
    pname:=CASE WHEN brand='Apple' THEN model ELSE brand||' '||model END;
    pslug:=regexp_replace(regexp_replace(lower(replace(pname,'+',' plus')),'[^a-z0-9]+','-','g'),'^-|-$','','g');
    cslug:=CASE WHEN brand='Apple' THEN 'phones-iphones' WHEN brand='Samsung' AND family='Galaxy A Series' THEN 'phones-samsung-galaxy-a-series' WHEN brand='Samsung' AND family LIKE 'Galaxy S%%' THEN 'phones-samsung-galaxy-s-series' WHEN brand='Samsung' AND family LIKE 'Galaxy Z%%' THEN 'phones-samsung-galaxy-foldable' WHEN brand='Google' THEN 'phones-google-pixel' WHEN brand='TECNO' THEN 'phones-tecno' WHEN brand='Infinix' THEN 'phones-infinix' ELSE 'phones-itel' END;
    SELECT id INTO bid FROM brands WHERE name=brand; SELECT id INTO cid FROM product_categories WHERE slug=cslug;
    INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured) VALUES (pname,pslug,bid,cid,'Phone','Master mobile-phone catalogue record. No stock has been received.','Master mobile-phone catalogue record sourced from Mobile_Phone_Catalogue_Master_2026.md.',jsonb_build_object('catalogue_source','Mobile_Phone_Catalogue_Master_2026.md','catalogue_reference_date','2026-08-27','family',family,'model',model,'catalogue_status','Master catalogue baseline'),'Active','Hidden',false) ON CONFLICT(slug) DO UPDATE SET brand_id=EXCLUDED.brand_id,category_id=EXCLUDED.category_id,product_type='Phone',specifications=EXCLUDED.specifications,status=CASE WHEN products.status='Archived' THEN products.status ELSE 'Active' END,updated_at=now() RETURNING id INTO pid;
    FOREACH v IN ARRAY string_to_array(variant_text,';') LOOP
      m:=regexp_match(v,'^(\d+)(GB|TB)(?: \/ \s*(\d+)(GB) RAM)?$');
      IF m IS NULL THEN CONTINUE; END IF;
      storage:=m[1]||upper(m[2]); ram:=COALESCE(m[3]||upper(m[4]),'');
      net:=CASE WHEN model ILIKE '%%5G%%' OR v ILIKE '%%5G%%' THEN '5G' WHEN model ILIKE '%%4G%%' OR v ILIKE '%%4G%%' THEN '4G' ELSE '' END;
      vsku:=regexp_replace(regexp_replace(lower(replace(pname,'+',' plus')),'[^a-z0-9]+','-','g'),'^-|-$','','g')||'-'||lower(storage)||CASE WHEN ram<>'' THEN '-'||lower(ram) ELSE '' END;
      vname:=pname||' '||storage||CASE WHEN ram<>'' THEN ' / '||ram||' RAM' ELSE '' END;
      INSERT INTO product_variants(product_id,sku,barcode,variant_name,color,storage,size,cost_price,selling_price,compare_at_price,wholesale_price,tax_rate,track_inventory,serialized,weight,dimensions,status) VALUES(pid,vsku,'',vname,'',storage,'',0,0,NULL,NULL,0,true,true,NULL,jsonb_build_object('catalogue_source','Mobile_Phone_Catalogue_Master_2026.md','catalogue_reference_date','2026-08-27','family',family,'model',model,'network',NULLIF(net,''),'ram',NULLIF(ram,''),'storage',storage),'Active') ON CONFLICT(sku) DO UPDATE SET product_id=EXCLUDED.product_id,variant_name=EXCLUDED.variant_name,storage=EXCLUDED.storage,serialized=true,track_inventory=true,dimensions=EXCLUDED.dimensions,status='Active',updated_at=now();
    END LOOP;
  END LOOP;
END $$;