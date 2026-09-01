# Amaal Public Website — Phase 36 Continuation

## Objective
Reorganize the public phone catalogue so every phone brand has its own dedicated sub-catalogue. The catalogue must not present Apple, Samsung, Google Pixel, TECNO, Infinix and itel as one mixed product wall.

## Implemented
- `/phones` is now a brand-separated catalogue homepage.
- Search remains available across the complete phone catalogue.
- Search results are grouped by brand and never rendered as a single mixed grid.
- Brand directory provides quick access to each brand.
- Each brand section is grouped further by series.
- Every model remains represented as one catalogue product.
- Storage/RAM/network configurations remain grouped under the model detail page.
- Added dedicated brand sub-catalogue routes:
  - `/phones/brand/apple`
  - `/phones/brand/samsung`
  - `/phones/brand/google-pixel`
  - `/phones/brand/tecno`
  - `/phones/brand/infinix`
  - `/phones/brand/itel`
- Each dedicated brand route contains all models for that brand and preserves series grouping.
- Existing `/phones/[slug]` product model routes remain intact.
- Product photography remains placeholders; no model photo is reused.

## Current catalogue counts
- Apple: 29 models
- Samsung: 48 models
- Google Pixel: 23 models
- TECNO: 23 models
- Infinix: 16 models
- itel: 17 models
- Total: 156 models

## UX rules
1. Brand is the primary navigation level inside Phones.
2. Series is the secondary navigation level.
3. Model is the product level.
4. Variants belong to the model page, not duplicate catalogue cards.
5. Search may span all brands, but results remain visually separated by brand.
6. Desktop uses a horizontal brand directory; mobile keeps it horizontally scrollable.
7. Each brand has a clear “Open catalogue” route.
8. All catalogue cards lead to their model page.

## Protected systems
- Database unchanged.
- `schema.sql` unchanged.
- `server.js` unchanged.
- Business Admin Console unchanged.
- No database reset, schema reset, seed, migration or inventory mutation performed.

## Validation
- Catalogue data was inspected directly from the Phase 35 project.
- Brand counts verified from `phone-catalogue.ts`.
- Route structure checked for compatibility with the existing `/phones/[slug]` model route by placing brand routes under `/phones/brand/[brand]`.
- Full dependency install could not finish in the execution environment, so a complete Next.js production build must still be run by Vercel or another environment with npm network access.

## Next
- Visual QA on Vercel.
- Add approved brand logos when supplied/available.
- Add approved phone photography model-by-model.
- Enrich technical specifications only from authoritative sources.
- Continue with other Amaal public catalogue categories after Phones is signed off.
