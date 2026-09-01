# Amaal Continuation — Phase 29

## Homepage merchandising and motion refinement

### Built
- Reworked the homepage merchandising hierarchy to match the latest approved direction.
- Removed **Office Electronics** from the homepage category list.
- Final homepage categories are now exactly:
  1. Phones
  2. TV & Home Entertainment
  3. Audio
  4. Home Appliances
  5. Kitchen Appliances
  6. Gaming & Computing
  7. Accessories
- Category cards are horizontally arranged in an automatic continuous rail.
- Featured at Amaal is horizontally arranged with automatic continuous motion.
- New at Amaal is horizontally arranged with automatic continuous motion.
- Shop by Brand is horizontally arranged with automatic continuous motion.
- Motion pauses on hover/focus and is disabled under `prefers-reduced-motion`.
- Mobile retains horizontal swipe/scroll behaviour rather than forcing the content into a vertical stack.
- Added a dedicated **Weekly Deals** section with promotion placeholders. No fake discount or invented deal price was added.

### Featured at Amaal merchandising
- iPhone 16 Pro Max 256GB — UGX 3,500,000
- Google Pixel 9 256GB — UGX 2,300,000
- Samsung Galaxy A17 4GB RAM 128GB ROM — UGX 750,000
- Samsung Galaxy A07 4GB RAM 64GB ROM — UGX 480,000
- TCL 50-inch QLED 4K TV V635 — UGX 1,150,000
- Hisense WFQP8014EVMT 8kg Front Loader — price not supplied in the latest instruction
- Samsung B-Series HW-B400F 2.0ch Soundbar — UGX 850,000

### New at Amaal merchandising
- Google Pixel 11 Pro XL — UGX 5,400,000
- Samsung Galaxy Z Fold8 256GB — UGX 9,000,000
- Samsung Galaxy Z Fold Special Edition 512GB — UGX 12,000,000
- TECNO CAMON 50 Pro 5G 256GB — UGX 1,050,000
- Infinix Smart 20 64GB — UGX 400,000
- TCL 75-inch C655 QLED 4K Google TV — UGX 4,500,000

### Brand rail
The homepage now includes:
- TCL
- Samsung
- Hoffman's Electronics
- Apple
- Google Pixel
- TECNO
- Infinix
- Saachi
- LG
- Hisense
- Skyworth

Brand tiles currently use text-based logo placeholders because official Amaal-approved logo assets have not yet been supplied.

## Product content and product detail behaviour

- Added `lib/homepage-data.ts` as a typed presentation/merchandising layer for the explicitly requested homepage selections.
- Homepage cards show only brand, product name, quick details and price.
- Product clicks open `/product/[slug]`.
- The product-detail route now has a curated-content fallback for the new homepage products so they do not dead-end while the authoritative public catalogue records are being published.
- Full descriptions are kept off the homepage and displayed on the product page.
- Existing backend catalogue products still use the authoritative public catalogue endpoint and typed helpers.
- No database records were changed.

## Research / accuracy work

Research was performed against official manufacturer sources and current regional sources where official pages were unavailable.

Key verified points include:
- iPhone 16 Pro Max 256GB capacity and A18 Pro generation.
- Pixel 9 256GB / 12GB and Tensor G4.
- Galaxy A17 4GB / 128GB, Super AMOLED and 50MP OIS camera.
- Galaxy A07 4GB / 64GB and microSD support.
- Samsung HW-B400F 2025 features.
- Pixel 11 Pro XL 2026 specifications.
- Galaxy Z Fold8 2026 storage/memory options.
- Galaxy Z Fold Special Edition 512GB / 16GB naming and specifications.
- TECNO CAMON 50 Pro 5G specifications.
- Infinix Smart 20 64GB / 4GB configuration.
- TCL C655 75-inch QLED 4K Google TV specifications.
- Hisense WFQP8014EVMT 8kg feature set.

### Normalisation decisions
- “Samsung Galaxy Z fold passport 512GB” was normalised to the official **Galaxy Z Fold Special Edition 512GB** name because Samsung's official product information supports that 512GB special-edition model, not a model called “Passport”.
- The supplied TCL “V635” merchandising name is retained, but exact regional model/specification should be confirmed against Amaal's physical unit before a final detailed specification page is published.
- Hisense WFQP8014EVMT regional sources differ between 1200 RPM and 1400 RPM. The latest Amaal-supplied value of **1200 RPM** is retained on the homepage, while the detailed product description avoids asserting a conflicting regional value.
- The Infinix Smart 20 64GB / 4GB configuration is retained from the official current product information.

A detailed content record is stored in `AMAAL_HOMEPAGE_PRODUCT_CONTENT_V1.md`.

## Asset policy

The latest instruction is now treated as a hard homepage rule:

**Do not reuse the same product photograph in multiple homepage sections.**

Therefore:
- Homepage product imagery is currently replaced with explicit photo placeholders.
- Hero imagery is also placeholder-based until Amaal supplies the final hero/product assets.
- No generic stock product images were substituted.
- Existing backend product images remain untouched for existing product records.

### Assets needed from Amaal
When ready, supply unique product photography for the homepage selections. Ideally provide one clean primary image per product, plus separate hero-specific assets if available.

## Figma

A Figma update was attempted for the new horizontal motion-rail direction, but the connected Figma workspace returned its Starter-plan MCP rate-limit/paywall before the page could be updated. No false claim of a completed Figma write is made for this phase.

The existing Figma design direction remains the reference: Premium Retail / Luxury Lifestyle.

## Backend / database preservation

- **NO DATABASE RESET.**
- **NO DATABASE RECREATION.**
- **NO TABLE DROPS.**
- **NO DESTRUCTIVE MIGRATIONS.**
- **NO PRODUCTION RESEED.**
- `server.js` preserved.
- `schema.sql` preserved.
- Business Admin Console preserved.
- Existing backend catalogue contract preserved.
- No second production database was introduced.

## Verification

- Repository baseline inspected from Phase 28 ZIP.
- Homepage source updated.
- Product-detail fallback updated.
- Product content research completed.
- Full dependency installation could not complete within the execution environment; therefore a successful production `next build` is not claimed in this phase.
- TypeScript cannot be fully type-checked without installed project dependencies. The attempted check correctly reports missing installed Next/React dependencies rather than source-specific production failures.

## Remaining

1. Supply final Amaal product photography.
2. Supply official brand logo assets.
3. Replace placeholders without reusing any single product image across homepage sections.
4. Confirm the exact TCL V635 regional unit/model.
5. Confirm the Hisense warranty/price and final regional specification sheet.
6. Bind homepage collections to authoritative backend/admin-managed content once those public-safe collection/promotion endpoints are verified.
7. Connect weekly deals to real approved promotions rather than placeholders.
8. Run full `npm install` and `npm run build` in Vercel/CI.
9. Perform desktop/tablet/mobile visual QA.
10. Continue product-page detail work after the homepage is visually approved.

## Next ZIP rule

Every next ZIP must be produced from this complete baseline, include an updated continuation document, preserve the Business Admin Console/backend/database, and never reset or recreate the database.
