-- Amaal Telecoms: Global Star brand normalization
-- Canonical TV source: MASTER_TELEVISION_PRODUCT_CATALOG.md v1.0 (2026-08-28)
-- Safe/idempotent: corrects legacy 'LG Global Star' TV references to the canonical 'Global Star' brand.
-- Historical business records are preserved. The legacy brand is only made inactive after TV references are removed.

DO $$
DECLARE
  canonical_id uuid;
  legacy_id uuid;
  r record;
  candidate_slug text;
BEGIN
  SELECT id INTO canonical_id FROM brands WHERE slug='global-star' LIMIT 1;
  IF canonical_id IS NULL THEN
    INSERT INTO brands(name,slug,status) VALUES ('Global Star','global-star','Active')
    ON CONFLICT DO NOTHING;
    SELECT id INTO canonical_id FROM brands WHERE slug='global-star' LIMIT 1;
  END IF;

  SELECT id INTO legacy_id FROM brands
  WHERE slug='lg-global-star' OR lower(name)='lg global star'
  ORDER BY CASE WHEN slug='lg-global-star' THEN 0 ELSE 1 END
  LIMIT 1;

  IF legacy_id IS NOT NULL AND canonical_id IS NOT NULL AND legacy_id <> canonical_id THEN
    FOR r IN SELECT id,name,slug FROM products WHERE brand_id=legacy_id AND product_type='TV' LOOP
      candidate_slug := regexp_replace(r.slug, '^lg-global-star-', 'global-star-');
      IF candidate_slug <> r.slug AND NOT EXISTS (SELECT 1 FROM products WHERE slug=candidate_slug AND id<>r.id) THEN
        UPDATE products
        SET brand_id=canonical_id,
            name=CASE WHEN name ILIKE 'LG Global Star%' THEN regexp_replace(name,'^LG Global Star','Global Star') ELSE name END,
            slug=candidate_slug,
            updated_at=now()
        WHERE id=r.id;
      ELSE
        UPDATE products
        SET brand_id=canonical_id,
            name=CASE WHEN name ILIKE 'LG Global Star%' THEN regexp_replace(name,'^LG Global Star','Global Star') ELSE name END,
            updated_at=now()
        WHERE id=r.id;
      END IF;
    END LOOP;

    -- Do not delete a historical brand row. Hide it from active catalogue management.
    IF NOT EXISTS (SELECT 1 FROM products WHERE brand_id=legacy_id AND status <> 'Archived') THEN
      UPDATE brands SET status='Inactive', website_visibility='Hidden', updated_at=now() WHERE id=legacy_id;
    END IF;
  END IF;
END $$;
