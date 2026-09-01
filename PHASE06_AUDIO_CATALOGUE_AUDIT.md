# Amaal Phase 006 — Audio Catalogue Audit

## Scope
Implemented the Audio / Speakers category across the existing Amaal project without rebuilding the public site from scratch and without any database reset.

### Public website
- `/audio` premium category landing page
- `/audio/brand/[brand]` brand browsing
- `/audio/[slug]` product detail pages
- Entry → everyday → party → premium merchandising tiers
- Woofer, portable party speaker and sound tower presentation
- Search-friendly product naming and full names
- Quick specifications on cards
- Full product specifications on detail pages
- Price placeholder: `Price coming soon`
- Product image/video placeholders designed for later Business Console media upload
- Mobile-first responsive layout
- Bright, warm, premium visual treatment
- Audio added to global navigation and homepage category data

### Business Console
- Existing generic catalogue manager remains the single management surface.
- Added Audio, Woofers, Party Speakers and Sound Towers taxonomy entries to starter catalogue definitions.
- Added audio brands to starter catalogue definitions.
- No duplicate audio management console was created.

### Backend / database
- Added `audio-catalogue-seed.sql` as an additive, idempotent seed.
- Wired it into server startup.
- Existing generic `products`, `product_variants`, `product_images`, `brands`, and `product_categories` tables are reused.
- No DROP, TRUNCATE, reset, destructive migration, inventory creation or stock balance manipulation was introduced.
- Audio products are initially hidden from public database publication so the existing publication controls remain authoritative. The public category presentation is ready independently and can later be connected to live catalogue publication/media.

## Data verification
OEM-backed entries included in this phase were checked against manufacturer material for:
- JBL PartyBox Encore Essential 2
- JBL PartyBox 110
- JBL PartyBox Encore 2
- Sony ULT FIELD 7
- Hisense PARTY ROCKER ONE
- LG XBOOM RNC5
- LG XBOOM RNC7
- Samsung Sound Tower MX-T50

Local-market brand entries for Black Ark, Global Star, SPJ and CHiQ Smart Plus intentionally use generic product-format names rather than invented manufacturer model codes.

## Automated checks completed
- Pure TypeScript audio catalogue: PASS
- Business starter catalogue TypeScript: PASS
- Backend JavaScript syntax: PASS
- Duplicate audio slugs: PASS — 17/17 unique
- Nested `apps/public-web/apps/...` path regression: PASS — none found
- Audio seed destructive SQL token scan: PASS — no DROP/TRUNCATE/DELETE reset operations
- Audio seed wiring into backend startup: PASS

## Full production build limitation
The container did not have installed Next.js/React dependencies and package installation timed out because the environment could not complete dependency installation. Therefore a local `next build` could not honestly be certified in this container. The source-level and backend audits above were completed before packaging.

## Database safety
No database reset was performed or packaged as an instruction. The audio seed is additive and uses `ON CONFLICT DO NOTHING` for repeatability.
