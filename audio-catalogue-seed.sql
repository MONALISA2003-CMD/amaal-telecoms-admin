-- Amaal Audio catalogue. Additive/idempotent only. Never clears or resets existing data.
BEGIN;
INSERT INTO brands(name,slug,status,website_visibility) VALUES
 ('Black Ark','black-ark','Active','Published'),('Global Star','global-star','Active','Published'),('SPJ','spj','Active','Published'),('CHiQ Smart Plus','chiq-smart-plus','Active','Published'),('Hisense','hisense','Active','Published'),('Samsung','samsung','Active','Published'),('LG','lg','Active','Published'),('JBL','jbl','Active','Published'),('Sony','sony','Active','Published')
ON CONFLICT(slug) DO NOTHING;
-- Canonical audio taxonomy. Older audio category rows are retained as hidden
-- legacy records, while products are migrated to the canonical category.
DO $$
DECLARE
  audio_id uuid;
  target_id uuid;
  legacy record;
  item record;
BEGIN
  SELECT id INTO audio_id FROM product_categories WHERE slug='audio' LIMIT 1;
  IF audio_id IS NULL THEN
    SELECT id INTO audio_id
    FROM product_categories
    WHERE lower(name)=lower('Audio') AND parent_id IS NULL
    ORDER BY created_at,id
    LIMIT 1;
  END IF;
  IF audio_id IS NULL THEN
    INSERT INTO product_categories(name,slug,status,website_visibility)
    VALUES ('Audio','audio','Active','Published')
    ON CONFLICT(slug) DO NOTHING
    RETURNING id INTO audio_id;
    IF audio_id IS NULL THEN
      SELECT id INTO audio_id FROM product_categories WHERE slug='audio' LIMIT 1;
    END IF;
  END IF;

  FOR item IN
    SELECT * FROM (VALUES
      ('Woofers','entertainment-audio-woofers'),
      ('Party Speakers','entertainment-audio-party-speakers'),
      ('Sound Towers','entertainment-audio-sound-towers')
    ) AS v(category_name, canonical_slug)
  LOOP
    SELECT id INTO target_id
    FROM product_categories
    WHERE slug=item.canonical_slug
    LIMIT 1;

    IF target_id IS NULL THEN
      SELECT c.id INTO target_id
      FROM product_categories c
      WHERE lower(c.name)=lower(item.category_name)
      ORDER BY CASE WHEN c.parent_id=audio_id THEN 0 ELSE 1 END, c.created_at, c.id
      LIMIT 1;

      IF target_id IS NOT NULL THEN
        UPDATE product_categories
        SET slug=item.canonical_slug,
            parent_id=audio_id,
            status='Active',
            website_visibility='Published',
            updated_at=now()
        WHERE id=target_id;
      ELSE
        INSERT INTO product_categories(parent_id,name,slug,status,website_visibility)
        VALUES (audio_id,item.category_name,item.canonical_slug,'Active','Published')
        ON CONFLICT(slug) DO NOTHING
        RETURNING id INTO target_id;
      END IF;
    END IF;

    SELECT id INTO target_id FROM product_categories WHERE slug=item.canonical_slug LIMIT 1;

    IF target_id IS NOT NULL THEN
      UPDATE products p
      SET category_id=target_id, updated_at=now()
      WHERE p.category_id IN (
        SELECT c.id
        FROM product_categories c
        WHERE lower(c.name)=lower(item.category_name)
          AND c.id<>target_id
      );

      FOR legacy IN
        SELECT c.id, c.slug
        FROM product_categories c
        WHERE lower(c.name)=lower(item.category_name)
          AND c.id<>target_id
      LOOP
        UPDATE product_categories
        SET name='Legacy ' || item.category_name || ' ' || replace(legacy.id::text,'-',''),
            slug='legacy-' || regexp_replace(legacy.slug,'[^a-zA-Z0-9_-]','','g') || '-' || replace(legacy.id::text,'-',''),
            status='Inactive',
            website_visibility='Hidden',
            updated_at=now()
        WHERE id=legacy.id;
      END LOOP;

      UPDATE product_categories
      SET parent_id=audio_id,status='Active',website_visibility='Published',updated_at=now()
      WHERE id=target_id;
    END IF;
  END LOOP;
END $$;

WITH x(name,slug,brand,cat,short,descr) AS (VALUES
 ('Black Ark 12-inch Bluetooth Woofer','black-ark-12-inch-bluetooth-woofer','black-ark','entertainment-audio-woofers','A practical Bluetooth woofer for everyday music and home listening.','A compact woofer-style sound system designed for everyday home entertainment, casual music listening and small gatherings.'),
 ('Black Ark 15-inch Bluetooth Woofer','black-ark-15-inch-bluetooth-woofer','black-ark','entertainment-audio-woofers','A larger woofer format for stronger bass and fuller room sound.','A larger Bluetooth woofer format aimed at home entertainment, family gatherings and music playback where stronger bass is preferred.'),
 ('Global Star 12-inch Bluetooth Woofer','global-star-12-inch-bluetooth-woofer','global-star','entertainment-audio-woofers','An accessible Bluetooth woofer for everyday listening and home entertainment.','An entry-level woofer-style system for music, radio and casual home entertainment.'),
 ('Global Star 15-inch Bluetooth Woofer','global-star-15-inch-bluetooth-woofer','global-star','entertainment-audio-woofers','A larger-format woofer built around stronger bass and room-filling playback.','A 15-inch woofer format for customers looking for a bigger sound system for home entertainment and gatherings.'),
 ('SPJ 12-inch Portable Party Speaker','spj-12-inch-portable-party-speaker','spj','entertainment-audio-party-speakers','Portable party sound with wireless music playback and practical inputs.','A portable party-oriented speaker format suited to home gatherings, outdoor listening and casual events.'),
 ('SPJ 15-inch Portable Party Speaker','spj-15-inch-portable-party-speaker','spj','entertainment-audio-party-speakers','A larger portable party format for bigger gatherings and stronger bass.','A larger SPJ party-speaker format for customers who want more physical scale and fuller sound for gatherings.'),
 ('CHiQ Smart Plus 12-inch Party Speaker','chiq-smart-plus-12-inch-party-speaker','chiq-smart-plus','entertainment-audio-party-speakers','A practical party speaker for home entertainment and social gatherings.','A 12-inch party-speaker format aimed at music playback, home entertainment and small-to-medium gatherings.'),
 ('CHiQ Smart Plus 15-inch Party Speaker','chiq-smart-plus-15-inch-party-speaker','chiq-smart-plus','entertainment-audio-party-speakers','A larger party speaker format for bigger rooms and lively gatherings.','A 15-inch party-speaker format designed for customers who want a larger cabinet and stronger room-filling presentation.'),
 ('Hisense PARTY ROCKER ONE','hisense-party-rocker-one','hisense','entertainment-audio-party-speakers','A 300 W party speaker with Bluetooth, lighting and practical inputs.','Hisense PARTY ROCKER ONE is a 300 W party speaker with Bluetooth 5.0, USB and 3.5 mm audio input.'),
 ('Samsung Sound Tower MX-T50','samsung-sound-tower-mx-t50','samsung','entertainment-audio-sound-towers','A high-power Samsung Sound Tower built for home parties.','Samsung MX-T50 is a 500 W Sound Tower system intended for powerful home entertainment and party playback.'),
 ('LG XBOOM RNC5 Party Speaker','lg-xboom-rnc5','lg','entertainment-audio-party-speakers','A powerful XBOOM party system with lighting and DJ features.','LG XBOOM RNC5 is a 2-way 3-speaker party system with an 8-inch woofer and microphone and guitar inputs.'),
 ('LG XBOOM RNC7 Party Speaker','lg-xboom-rnc7','lg','entertainment-audio-party-speakers','A large XBOOM party system with 8-inch woofer, RGB lighting and karaoke.','LG XBOOM RNC7 combines an 8-inch woofer with RGB lighting, DJ and karaoke functions and multiple connection options.'),
 ('LG XBOOM RNC9 Party Speaker','lg-xboom-rnc9','lg','entertainment-audio-party-speakers','A larger XBOOM party system for powerful bass and party entertainment.','LG XBOOM RNC9 sits higher in the XBOOM party-speaker range with large-format sound and party controls.'),
 ('JBL PartyBox Encore Essential 2','jbl-partybox-encore-essential-2','jbl','entertainment-audio-party-speakers','100 W RMS portable party sound with lighting and Bluetooth 5.4.','JBL PartyBox Encore Essential 2 combines 100 W RMS output, a 5.25-inch woofer, dual dome tweeters, Bluetooth 5.4 and up to 15 hours playtime.'),
 ('JBL PartyBox 110','jbl-partybox-110','jbl','entertainment-audio-party-speakers','160 W RMS party sound with lightshow and up to 12 hours playtime.','JBL PartyBox 110 delivers 160 W RMS through dual woofers and tweeters with Bluetooth 5.1 and rechargeable battery.'),
 ('JBL PartyBox Encore 2','jbl-partybox-encore-2','jbl','entertainment-audio-party-speakers','100 W RMS portable party sound with karaoke and up to 15 hours playtime.','JBL PartyBox Encore 2 delivers 100 W RMS, Bluetooth 5.4, karaoke functions and up to 15 hours playtime.'),
 ('Sony ULT FIELD 7','sony-ult-field-7','sony','entertainment-audio-party-speakers','A premium portable speaker with ULT POWER SOUND, IP67 and up to 30 hours battery life.','Sony ULT FIELD 7 is a portable speaker with dual woofers and tweeters, Bluetooth 5.2, IP67 protection and approximately 30 hours battery life.')
)
INSERT INTO products(name,slug,brand_id,category_id,product_type,short_description,description,specifications,status,website_visibility,featured)
SELECT x.name,x.slug,b.id,c.id,'Speaker',x.short,x.descr,'{}'::jsonb,'Active','Hidden',false FROM x JOIN brands b ON b.slug=x.brand JOIN product_categories c ON c.slug=x.cat ON CONFLICT(slug) DO NOTHING;
INSERT INTO product_variants(product_id,sku,variant_name,cost_price,selling_price,wholesale_price,track_inventory,serialized,status)
SELECT p.id,upper(regexp_replace(p.slug,'[^a-zA-Z0-9]+','-','g')),'Default',0,0,0,true,false,'Active' FROM products p JOIN product_categories c ON c.id=p.category_id WHERE c.slug LIKE 'entertainment-audio-%' ON CONFLICT(sku) DO NOTHING;
COMMIT;