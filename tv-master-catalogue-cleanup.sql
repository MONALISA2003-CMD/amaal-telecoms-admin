-- Amaal Telecoms TV master-catalog cleanup v1.0
-- Canonical source: MASTER_TELEVISION_PRODUCT_CATALOG.md (2026-08-28).
-- SAFETY: this script is intentionally separate from startup sync. It deletes only the exact legacy generic TV slugs listed below when they have NO dependent business records.
-- If a legacy product/variant is referenced by business history, it is archived/hidden instead of deleted. This preserves history.

BEGIN;

CREATE TEMP TABLE _tv_canonical_slugs(slug text PRIMARY KEY) ON COMMIT DROP;
INSERT INTO _tv_canonical_slugs(slug) VALUES
  ('black-ark-22-inch-analog-frameless-tv-tv'),
  ('black-ark-24-inch-digital-led-tv-tv'),
  ('black-ark-32-inch-android-smart-tv-tv'),
  ('black-ark-32-inch-digital-led-hd-tv-tv'),
  ('black-ark-40-inch-digital-frameless-tv-tv'),
  ('black-ark-43-inch-fhd-smart-led-tv-tv'),
  ('black-ark-50-inch-uhd-4k-smart-android-tv-tv'),
  ('black-ark-55-inch-4k-android-smart-tv-tv'),
  ('black-ark-65-inch-4k-android-smart-tv-tv'),
  ('black-ark-p40s10-tv'),
  ('black-ark-t43d10-tv'),
  ('chiq-32g4500-tv'),
  ('chiq-43g7p-tv'),
  ('chiq-55q6n-tv'),
  ('chiq-55q7n-tv'),
  ('chiq-65q7n-tv'),
  ('chiq-85q8n-tv'),
  ('chiq-g5000-tv'),
  ('chiq-g7p-tv'),
  ('chiq-l32g7v-tv'),
  ('chiq-u43g7h-tv'),
  ('chiq-u50g7h-tv'),
  ('chiq-u55g7h-tv'),
  ('chiq-u65g7h-tv'),
  ('global-star-22-inch-digital-led-tv'),
  ('global-star-24-inch-ac-dc-digital-led-tv'),
  ('global-star-32-inch-frameless-digital-tv-tv'),
  ('global-star-32-inch-vidaa-smart-tv'),
  ('global-star-32uk50-tv'),
  ('global-star-32uk64-tv'),
  ('global-star-40-inch-frameless-android-smart-tv'),
  ('global-star-40-inch-frameless-digital-tv'),
  ('global-star-42uk64-tv'),
  ('global-star-43-inch-qled-satellite-tv-tv'),
  ('global-star-43lk50-tv'),
  ('global-star-50-inch-4k-uhd-android-tv-tv'),
  ('global-star-55-inch-4k-uhd-android-smart-tv-tv'),
  ('global-star-55-inch-smart-tv-tv'),
  ('global-star-65-inch-4k-uhd-android-smart-tv-tv'),
  ('global-star-75qd75-tv'),
  ('global-star-85qd85-tv'),
  ('global-star-gs-2219a-tv'),
  ('global-star-gs-24d5-tv'),
  ('global-star-gs-2624d-tv'),
  ('global-star-gs-26d5-t2-tv'),
  ('hisense-32a4qs-tv'),
  ('hisense-32a5200f-tv'),
  ('hisense-32q4q-tv'),
  ('hisense-40a4qs-tv'),
  ('hisense-40a5200f-tv'),
  ('hisense-43a4qs-tv'),
  ('hisense-43a6n-tv'),
  ('hisense-43a6q-tv'),
  ('hisense-43q6n-tv'),
  ('hisense-50a6n-tv'),
  ('hisense-50a6q-tv'),
  ('hisense-50q6n-tv'),
  ('hisense-55a6n-tv'),
  ('hisense-55a6q-tv'),
  ('hisense-55q6n-tv'),
  ('hisense-55u6n-tv'),
  ('hisense-55u7n-tv'),
  ('hisense-65a6n-tv'),
  ('hisense-65a6q-tv'),
  ('hisense-65a85levs-tv'),
  ('hisense-65q6n-tv'),
  ('hisense-65u7n-tv'),
  ('hisense-75a6n-tv'),
  ('hisense-75a6q-tv'),
  ('hisense-75q6n-tv'),
  ('hisense-75u7n-tv'),
  ('hisense-85a6n-tv'),
  ('hisense-85q6n-tv'),
  ('hisense-85q7q-tv'),
  ('hisense-85u7n-tv'),
  ('lg-43nano75-tv'),
  ('lg-43qned75-tv'),
  ('lg-43ur7300-tv'),
  ('lg-43ur8000-tv'),
  ('lg-43ut8000-tv'),
  ('lg-50nano77-tv'),
  ('lg-50qned75-tv'),
  ('lg-50qned85-tv'),
  ('lg-50ur7500-tv'),
  ('lg-50ut8000-tv'),
  ('lg-55qned70a6a-tv'),
  ('lg-55qned75-tv'),
  ('lg-55qned80-tv'),
  ('lg-55qned80a6a-tv'),
  ('lg-55qned85-tv'),
  ('lg-55qned92-tv'),
  ('lg-55ur8000-tv'),
  ('lg-55ut8000-tv'),
  ('lg-65qned70a6a-tv'),
  ('lg-65qned80-tv'),
  ('lg-65qned80a6a-tv'),
  ('lg-65qned85-tv'),
  ('lg-65qned92-tv'),
  ('lg-65ur8000-tv'),
  ('lg-65ut8000-tv'),
  ('lg-75qned70a6a-tv'),
  ('lg-75qned80-tv'),
  ('lg-75qned80a6a-tv'),
  ('lg-75qned85-tv'),
  ('lg-75qned92-tv'),
  ('lg-75ur8000-tv'),
  ('lg-75ut8000-tv'),
  ('lg-86qned70a6a-tv'),
  ('lg-86qned80-tv'),
  ('lg-86qned80a6a-tv'),
  ('lg-86qned85-tv'),
  ('lg-86ur8000-tv'),
  ('lg-86ut8000-tv'),
  ('lg-oled55b3-tv'),
  ('lg-oled55b4-tv'),
  ('lg-oled55b5-tv'),
  ('lg-oled55c3-tv'),
  ('lg-oled55c4-tv'),
  ('lg-oled55c5-tv'),
  ('lg-oled55g5-tv'),
  ('lg-oled65b4-tv'),
  ('lg-oled65b5-tv'),
  ('lg-oled65c4-tv'),
  ('lg-oled65c5-tv'),
  ('lg-oled65g5-tv'),
  ('lg-oled77c5-tv'),
  ('lg-oled77g5-tv'),
  ('lg-oled83c5-tv'),
  ('lg-oled83g5-tv'),
  ('lg-oled97m5-tv'),
  ('lg-qned-evo-mini-led-tv'),
  ('lg-qned70-tv'),
  ('lg-qned71-tv'),
  ('lg-qned72-tv'),
  ('lg-qned80-tv'),
  ('lg-qned81-tv'),
  ('lg-qned83-tv'),
  ('lg-qned85-tv'),
  ('lg-qned86-tv'),
  ('lg-qned87-tv'),
  ('lg-qned8e-tv'),
  ('lg-qned93-tv'),
  ('lg-ur7300-tv'),
  ('lg-ur8000-tv'),
  ('samsung-cu8000-tv'),
  ('samsung-du7000-tv'),
  ('samsung-du8000-tv'),
  ('samsung-q5f-tv'),
  ('samsung-q60c-tv'),
  ('samsung-q60d-tv'),
  ('samsung-q6f-tv'),
  ('samsung-q70c-tv'),
  ('samsung-q70d-tv'),
  ('samsung-q7f-tv'),
  ('samsung-q80d-tv'),
  ('samsung-q8f-tv'),
  ('samsung-qn1eh-tv'),
  ('samsung-qn60h-tv'),
  ('samsung-qn70f-tv'),
  ('samsung-qn70h-tv'),
  ('samsung-qn73h-tv'),
  ('samsung-qn800c-tv'),
  ('samsung-qn800d-tv'),
  ('samsung-qn80f-tv'),
  ('samsung-qn80h-tv'),
  ('samsung-qn85d-tv'),
  ('samsung-qn85f-tv'),
  ('samsung-qn900c-tv'),
  ('samsung-qn900d-tv'),
  ('samsung-qn900f-tv'),
  ('samsung-qn90c-tv'),
  ('samsung-qn90d-tv'),
  ('samsung-qn90f-tv'),
  ('samsung-qn950f-tv'),
  ('samsung-qn95c-tv'),
  ('samsung-qn95d-tv'),
  ('samsung-r85h-tv'),
  ('samsung-r95h-tv'),
  ('samsung-s83h-tv'),
  ('samsung-s85d-tv'),
  ('samsung-s85f-tv'),
  ('samsung-s85h-tv'),
  ('samsung-s90d-tv'),
  ('samsung-s90f-tv'),
  ('samsung-s90h-tv'),
  ('samsung-s93h-tv'),
  ('samsung-s95d-tv'),
  ('samsung-s95f-tv'),
  ('samsung-s95h-tv'),
  ('samsung-s99h-tv'),
  ('samsung-the-frame-ls03c-tv'),
  ('samsung-the-frame-ls03d-tv'),
  ('samsung-the-frame-ls03f-tv'),
  ('samsung-u7000f-tv'),
  ('samsung-u7000h-tv'),
  ('samsung-u7020h-tv'),
  ('samsung-u8000f-tv'),
  ('samsung-u8000h-tv'),
  ('samsung-u8020h-tv'),
  ('tcl-c645-tv'),
  ('tcl-c655-tv'),
  ('tcl-c6k-tv'),
  ('tcl-c755-tv'),
  ('tcl-c855-tv'),
  ('tcl-p635-tv'),
  ('tcl-p6k-tv'),
  ('tcl-p745-tv'),
  ('tcl-s5400-tv'),
  ('tcl-s5k-tv'),
  ('tcl-v6c-tv');

CREATE TEMP TABLE _tv_legacy_generic_slugs(slug text PRIMARY KEY) ON COMMIT DROP;
INSERT INTO _tv_legacy_generic_slugs(slug) VALUES
  ('chiq-32-inch-tv'),
  ('chiq-43-inch-tv'),
  ('chiq-50-inch-tv'),
  ('chiq-55-inch-tv'),
  ('chiq-65-inch-tv'),
  ('chiq-75-inch-tv'),
  ('hisense-32-inch-tv'),
  ('hisense-43-inch-tv'),
  ('hisense-50-inch-tv'),
  ('hisense-55-inch-tv'),
  ('hisense-65-inch-tv'),
  ('hisense-75-inch-tv'),
  ('lg-global-star-32-inch-tv'),
  ('lg-global-star-43-inch-tv'),
  ('lg-global-star-50-inch-tv'),
  ('lg-global-star-55-inch-tv'),
  ('lg-global-star-65-inch-tv'),
  ('lg-global-star-75-inch-tv'),
  ('samsung-32-inch-tv'),
  ('samsung-43-inch-tv'),
  ('samsung-50-inch-tv'),
  ('samsung-55-inch-tv'),
  ('samsung-65-inch-tv'),
  ('samsung-75-inch-tv'),
  ('smart-plus-32-inch-tv'),
  ('smart-plus-43-inch-tv'),
  ('smart-plus-50-inch-tv'),
  ('smart-plus-55-inch-tv'),
  ('smart-plus-65-inch-tv'),
  ('smart-plus-75-inch-tv'),
  ('spj-32-inch-tv'),
  ('spj-43-inch-tv'),
  ('spj-50-inch-tv'),
  ('spj-55-inch-tv'),
  ('spj-65-inch-tv'),
  ('spj-75-inch-tv'),
  ('tcl-32-inch-tv'),
  ('tcl-43-inch-tv'),
  ('tcl-50-inch-tv'),
  ('tcl-55-inch-tv'),
  ('tcl-65-inch-tv'),
  ('tcl-75-inch-tv');

-- Candidate report: run/inspect before applying if desired.
-- The deletion phase below is conservative: referenced records are archived, not removed.

DO $$
DECLARE
  p RECORD;
  v RECORD;
  fk RECORD;
  ref_count bigint;
  has_refs boolean;
  q text;
BEGIN
  FOR p IN
    SELECT p.id, p.slug
    FROM products p
    JOIN product_categories c ON c.id=p.category_id
    WHERE p.product_type='TV'
      AND c.slug IN ('entertainment-tv','television-models')
      AND p.slug IN (SELECT slug FROM _tv_legacy_generic_slugs)
      AND p.slug NOT IN (SELECT slug FROM _tv_canonical_slugs)
  LOOP
    has_refs := false;

    FOR fk IN
      SELECT ns.nspname AS schema_name, cls.relname AS table_name, att.attname AS column_name
      FROM pg_constraint con
      JOIN pg_class cls ON cls.oid=con.conrelid
      JOIN pg_namespace ns ON ns.oid=cls.relnamespace
      JOIN pg_class parent_cls ON parent_cls.oid=con.confrelid
      JOIN pg_namespace parent_ns ON parent_ns.oid=parent_cls.relnamespace
      JOIN pg_attribute att ON att.attrelid=cls.oid AND att.attnum=con.conkey[1]
      WHERE con.contype='f'
        AND array_length(con.conkey,1)=1
        AND array_length(con.confkey,1)=1
        AND parent_ns.nspname='public'
        AND parent_cls.relname='products'
        AND con.confkey[1]=(SELECT attnum FROM pg_attribute WHERE attrelid=parent_cls.oid AND attname='id')
    LOOP
      q := format('SELECT count(*) FROM %I.%I WHERE %I=$1', fk.schema_name, fk.table_name, fk.column_name);
      EXECUTE q INTO ref_count USING p.id;
      IF ref_count > 0 THEN has_refs := true; EXIT; END IF;
    END LOOP;

    IF has_refs THEN
      UPDATE products SET status='Archived', website_visibility='Hidden', updated_at=now() WHERE id=p.id;
    ELSE
      -- Only remove child variants after proving they have no business references.
      FOR v IN SELECT id FROM product_variants WHERE product_id=p.id LOOP
        has_refs := false;
        FOR fk IN
          SELECT ns.nspname AS schema_name, cls.relname AS table_name, att.attname AS column_name
          FROM pg_constraint con
          JOIN pg_class cls ON cls.oid=con.conrelid
          JOIN pg_namespace ns ON ns.oid=cls.relnamespace
          JOIN pg_class parent_cls ON parent_cls.oid=con.confrelid
          JOIN pg_namespace parent_ns ON parent_ns.oid=parent_cls.relnamespace
          JOIN pg_attribute att ON att.attrelid=cls.oid AND att.attnum=con.conkey[1]
          WHERE con.contype='f'
            AND array_length(con.conkey,1)=1
            AND array_length(con.confkey,1)=1
            AND parent_ns.nspname='public'
            AND parent_cls.relname='product_variants'
            AND con.confkey[1]=(SELECT attnum FROM pg_attribute WHERE attrelid=parent_cls.oid AND attname='id')
        LOOP
          q := format('SELECT count(*) FROM %I.%I WHERE %I=$1', fk.schema_name, fk.table_name, fk.column_name);
          EXECUTE q INTO ref_count USING v.id;
          IF ref_count > 0 THEN has_refs := true; EXIT; END IF;
        END LOOP;
        IF has_refs THEN
          UPDATE product_variants SET status='Archived', updated_at=now() WHERE id=v.id;
        ELSE
          DELETE FROM product_variants WHERE id=v.id;
        END IF;
      END LOOP;
      DELETE FROM products WHERE id=p.id;
    END IF;
  END LOOP;
END $$;

COMMIT;
