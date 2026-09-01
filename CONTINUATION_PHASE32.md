# Amaal Public Website — Phase 32 Continuation

## Focus
Modernize and organize the complete public phone catalogue for a premium shopping experience.

## Implemented
- `/phones` is now organized top-to-bottom as Brand → Series → Models.
- 156 model records remain represented from the existing catalogue source.
- Search, brand filter, family filter and sorting are available.
- Brand quick-jump navigation added.
- Cards show only quick decision information and variant labels; full detail remains on the model page.
- Variant counts are visible without creating duplicate model products.
- Photo placeholders are used for all phone models until approved Amaal photography is supplied.
- Responsive desktop/tablet/mobile layouts added.

## UX principles
1. Catalogue, not inventory.
2. One model page for a model and its variants.
3. Fast scanning first; full technical detail on the product page.
4. No internal stock/supplier/warehouse data in public UI.
5. No repeated product photography.
6. Clear filtering and predictable navigation.

## Protected systems
- Business Admin Console preserved.
- Backend preserved.
- Database preserved.
- No DB reset.
- No schema reset.
- No destructive migration.

## Remaining
- Supply approved product photos for each model.
- Continue verified model-detail enrichment where authoritative data is available.
- Production-build/Vercel verification in an environment where dependencies can install successfully.
