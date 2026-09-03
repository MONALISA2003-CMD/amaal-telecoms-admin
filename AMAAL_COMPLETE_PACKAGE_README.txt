AMAAL COMPLETE PROJECT PACKAGE
Updated: 2026-09-03

This archive contains the complete Amaal project in one package:
- Database SQL/schema/seed/catalogue artifacts
- Backend/server.js and supporting backend files
- Admin Console
- Public website
- Homepage assets and optimized user-supplied imagery
- Public homepage update documentation

Final homepage fixes in this package:
- Existing desktop hero source image/copy preserved.
- Mobile hero now renders the complete existing hero image in a full 16:9 media panel so the meaningful composition is not cropped away on phones.
- Supplied TECNO CAMON 50 image is used for the existing verified CAMON 50 Pro 5G/4G homepage catalogue entry.
- Supplied lifestyle image is used as the homepage footer background with a readability overlay.
- Automatic rails have no visible direction/pause controls. They pause during pointer interaction, click/tap, drag, or keyboard focus and resume when the user leaves or focus moves away.
- Homepage product cards use the existing Add-to-Cart flow only when the live catalogue exposes an exact, in-stock variant matching the homepage price. Otherwise they safely use Order Now and never guess a variant.
- Existing database/backend/admin/auth/checkout/payment/order/inventory architecture was not rebuilt or reset.

Validation performed:
- TypeScript transpilation/syntax checks passed for all changed TS/TSX files.
- CSS brace-balance check passed after closing two pre-existing unclosed mobile media blocks in globals.css.
- Existing hero section remains byte-for-byte identical at the section level and hero image SHA-256 remains unchanged.
- New optimized images are present.
- Archive integrity is tested with unzip -tq after packaging.
