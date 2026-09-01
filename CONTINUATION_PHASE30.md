# Amaal Public Website — Continuation Phase 30

**Date:** 2026-08-31
**Focus:** Featured product photography + premium horizontal auto-motion interaction

## What was built

### Featured at Amaal
The supplied `amaal featured zippppppp.zip` was inspected and its product assets were integrated into the public website.

Featured merchandising now uses the supplied imagery for:
- iPhone 16 Pro Max 256GB — UGX 3,500,000
- Google Pixel 9 256GB — UGX 2,300,000
- Samsung Galaxy A17 4GB RAM / 128GB ROM — UGX 750,000
- Samsung Galaxy A07 4GB RAM / 64GB ROM — UGX 480,000
- TCL 50-inch QLED 4K TV V635 — UGX 1,150,000
- Hisense WFQP8014EVMT 8kg Front Loader — price on request
- Samsung B-Series Soundbar HW-B400F 2.0ch — UGX 850,000

Multiple supplied images are retained per product where provided and are available to the product-detail gallery. The homepage card uses one primary image only so the homepage does not visually repeat the same image within other sections.

The supplied Pixel 9a image was intentionally not used for the Pixel 9 product because it is a different model. The Amaal catalogue name remains Pixel 9 256GB.

## Motion / interaction rule — now a homepage-wide standard

Every horizontal auto-motion rail must support all of the following:

1. Auto-motion is ON by default.
2. Motion does not stop merely because the pointer is hovering over the rail.
3. A visible pause/play control lets the customer permanently pause or resume that rail.
4. Left and right arrow controls allow manual horizontal movement.
5. Mouse/touch dragging supports horizontal scrolling.
6. Trackpad/mouse wheel input is converted to horizontal movement where appropriate.
7. Any manual interaction temporarily pauses auto-motion, then resumes after a short idle period.
8. Clicking a product/brand/category pauses the rail before navigation.
9. The rail loops seamlessly using a duplicated content set.
10. `prefers-reduced-motion` disables automatic motion.
11. Keyboard focus remains usable; the rail has an accessible label and visible focus treatment.

This interaction standard applies to:
- Shop by Category
- Featured at Amaal
- New at Amaal
- Shop by Brand
- Weekly Deals when Weekly Deals is converted to a motion rail
- any future homepage horizontal collection using the shared `AutoRail` component

## Homepage category structure

Exactly seven customer-facing homepage categories are used:
1. Phones
2. TV & Home Entertainment
3. Audio
4. Home Appliances
5. Kitchen Appliances
6. Gaming & Computing
7. Accessories

“Office Electronics” is not displayed as a homepage category label. The existing backend/category slug is preserved where needed for compatibility.

## Product-detail behaviour

Homepage cards remain intentionally concise: brand, product name, quick details and price.

Clicking a product opens `/product/[slug]`.

Curated homepage products use a dedicated detail fallback with:
- larger product imagery
- multi-image gallery when multiple supplied assets exist
- full curated product description
- quick specifications
- price or enquiry action
- trust/warranty/delivery messaging

Existing backend catalogue products continue to use the authoritative public catalogue integration.

## Asset policy

No homepage product photograph should be reused across unrelated homepage sections.

The newly supplied featured assets are stored under:
`apps/public-web/public/products/featured/`

Hero-specific photography remains a placeholder until Amaal supplies the final hero assets. Category/lifestyle photography also remains placeholder-based where a unique approved asset is not yet available.

## Research / content handling

Product descriptions in `lib/homepage-data.ts` retain the research decisions from Phase 29. Homepage copy stays concise; detailed information belongs on the product page.

## Figma

The existing Figma workspace remains the visual reference for the Premium Retail / Luxury Lifestyle direction. A new write was not claimed in this phase because the connected Figma MCP workspace previously returned a Starter-plan rate-limit/paywall. The code implementation is the current executable source of the motion interaction.

## Backend / database / admin preservation

- NO database reset.
- NO database recreation.
- NO table drops.
- NO destructive migrations.
- NO production reseed.
- `server.js` preserved.
- `schema.sql` preserved.
- Business Admin Console preserved.
- Existing public catalogue API contract preserved.

## Verification

- All 18 homepage image references resolve to files in `public/products/featured/`.
- The supplied Pixel 9a image is not referenced by the Pixel 9 product.
- The auto-motion implementation was reviewed for default-on motion, pause/play, left/right controls, pointer dragging, wheel input, temporary interaction pause and reduced-motion handling.
- Full dependency installation/build remains pending because the execution environment timed out during `npm install`. A successful production `next build` is therefore not claimed from this environment.

## Remaining

1. Supply final hero photography/product cutouts.
2. Supply approved official brand logos.
3. Supply unique category/lifestyle imagery where desired.
4. Confirm final TCL V635 regional unit/specification sheet.
5. Confirm Hisense final price and warranty record.
6. Bind homepage collections/deals to authoritative backend/admin-managed data.
7. Run the full Vercel build and visual QA.
8. Continue the same design system into the remaining public commerce journeys after homepage approval.

## Next ZIP rule

Every next ZIP must include the complete public website, Business Admin Console, backend and database files as preserved in the project baseline, plus an updated continuation MD. Never reset or recreate the database.

---

# Phase 31 — Public Phone Catalogue Integration

## Status

**Implemented.**

## What was built

- Imported the supplied `Mobile_Phone_Catalogue_Master_2026.md` as the working public phone catalogue baseline.
- Built a dedicated public phone catalogue containing **156 phone models and 351 listed variants** across Apple, Samsung Galaxy, Google Pixel, TECNO, Infinix and itel.
- Excluded Samsung Galaxy tablets from the phone collection.
- Preserved the model/variant relationship: one model page, selectable storage/RAM/network configurations.
- iPhone storage capacities are variants of the same model rather than duplicated products.
- Added `/phones` with search, brand filtering and family filtering.
- Added phone-aware handling to `/categories/phones`.
- Added phone-aware product detail pages with model information, variant selection and enquiry CTA.
- Left a unique photo placeholder for every phone model. No phone photography is reused.
- Added public catalogue documentation and copied the master catalogue into the project for continuity.

## Accuracy rules applied

- No stock quantities were added.
- No inventory fields were exposed.
- No supplier/purchase-price/margin data was added.
- No unverified hardware specification was fabricated.
- Variant data comes from the supplied master catalogue.
- Model descriptions explain the catalogue structure without pretending that pending technical fields are verified.

## Source of truth

`MOBILE_PHONE_CATALOGUE_MASTER_2026.md` remains the catalogue baseline. The public site is a presentation layer, not a replacement inventory system.

## Files added/changed

- `apps/public-web/lib/phone-catalogue.ts`
- `apps/public-web/components/PhoneCatalogueCard.tsx`
- `apps/public-web/components/PhoneVariantSelector.tsx`
- `apps/public-web/app/phones/page.tsx`
- `apps/public-web/app/categories/[slug]/page.tsx`
- `apps/public-web/app/product/[slug]/page.tsx`
- `apps/public-web/app/globals.css`
- `MOBILE_PHONE_CATALOGUE_MASTER_2026.md`
- `MOBILE_PHONE_CATALOGUE_PUBLIC_INTEGRATION_V1.md`

## Verification

- Phone catalogue TypeScript file passes standalone TypeScript syntax/type compilation.
- Changed TSX files pass TypeScript transpilation/syntax checks.
- Every generated phone model has a unique slug.
- 156 models / 351 variants were counted from the generated public catalogue.
- Full Next.js production build was not run because npm dependency installation timed out in the execution environment.

## Database/backend/admin preservation

- Database was not reset.
- No database tables were dropped.
- `schema.sql` was not modified.
- Backend `server.js` was not modified.
- Business Admin Console was not modified.
- No production migration or seed was introduced.

## Remaining

1. Supply phone photography, model by model.
2. Enrich technical fields only after official model-level verification.
3. Connect the public phone catalogue to the approved backend public catalogue source when those model records are published there, without creating a second commercial source of truth.
4. Add public pricing only when Amaal has approved the price for a specific variant.
5. Complete Vercel production build verification.
