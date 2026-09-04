# Amaal Master Catalogue Build Notes — 2026-09-04

## Continuation rules preserved
- Existing project architecture remains intact.
- No existing project file was intentionally deleted.
- No database reset, truncate, reseed or inventory fabrication was added.
- No SKU was invented.
- No inventory location, balance, customer or order was invented.
- Existing authentication, cart, wishlist, checkout and Admin Console code was preserved.

## Product integration
- The supplied markdown is the source of truth for the 103 phone/audio source entries and their supplied prices/content.
- 36 phone model pages are represented in the public phone catalogue, including one new static model entry: Samsung Galaxy S25 FE.
- 35 audio product pages are represented in the public audio catalogue, including 32 new static product entries.
- 49 supplied images are safely mapped to products.
- 22 supplied products have no safely matching image and therefore use an explicit "Photo coming soon" placeholder.
- Unmatched supplied images remain bundled as assets but are never assigned to a different product.

## Price alignment
Homepage phone offers use the master markdown price when the model/variant exists there. Google Pixel 9 remains at the separately supplied approved homepage price of UGX 1,800,000 because Pixel 9 is not present in the supplied markdown.

## Commerce safety
The public site only exposes Add to Cart when the live public catalogue resolves an exact product variant at the supplied price and reports `inStock === true`. Otherwise the customer gets a product enquiry/availability action.

## Database
`amaal-master-catalogue-migration.sql` is production-safe and transaction-wrapped. It enriches matching product/variant rows and inserts missing master products as `Active/Hidden` without creating variants or SKUs. This means real SKUs and inventory can be added later through the existing Admin Console without guessing.

`scripts/amaal-master-media-sync.js` uploads the supplied image assets into the existing media architecture and links them to matching products. It requires the normal `DATABASE_URL` and is intentionally not executed in this environment because no production database credentials were supplied.

## Verification
- Render preflight: PASS
- Existing audio catalogue audit: PASS
- New Amaal master catalogue audit: PASS
- Cross-module audit: PASS
- Modified TypeScript/TSX transpile syntax checks: PASS
- `node --check` media sync script: PASS
- Full Next.js dependency installation/build: BLOCKED because `npm install --ignore-scripts --no-audit --no-fund` timed out in the build environment before dependencies were installed.
