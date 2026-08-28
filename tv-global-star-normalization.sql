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
      IF candidate_slug <> r.slug AND EXISTS (SELECT 1 FROM products WHERE slug=candidate_slug AND id<>r.id) THEN
        -- A canonical product with the target slug already exists. Never delete the
        -- legacy product blindly: preserve any business history and archive it.
        UPDATE products
        SET status='Archived', website_visibility='Hidden', updated_at=now()
        WHERE id=r.id
          AND NOT EXISTS (SELECT 1 FROM serialized_units su JOIN product_variants v ON v.id=su.variant_id WHERE v.product_id=r.id)
          AND NOT EXISTS (SELECT 1 FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id WHERE v.product_id=r.id)
          AND NOT EXISTS (SELECT 1 FROM sale_lines sl JOIN product_variants v ON v.id=sl.variant_id WHERE v.product_id=r.id)
          AND NOT EXISTS (SELECT 1 FROM purchase_order_lines pol JOIN product_variants v ON v.id=pol.variant_id WHERE v.product_id=r.id);
        UPDATE products
        SET brand_id=canonical_id,
            name=CASE WHEN name ILIKE 'LG Global Star%' THEN regexp_replace(name,'^LG Global Star','Global Star') ELSE name END,
            updated_at=now()
        WHERE id=r.id AND status <> 'Archived';
      ELSE
        UPDATE products
        SET brand_id=canonical_id,
            name=CASE WHEN name ILIKE 'LG Global Star%' THEN regexp_replace(name,'^LG Global Star','Global Star') ELSE name END,
            slug=CASE WHEN candidate_slug <> r.slug THEN candidate_slug ELSE r.slug END,
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
