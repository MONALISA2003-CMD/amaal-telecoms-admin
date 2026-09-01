# AMAAL PROJECT — PHASE 37 CONTINUATION

## Title
Persistent Brand Sidebar for the Public Phone Catalogue

## Objective
Improve browsing/navigation on `/phones` by giving the phone catalogue a dedicated brand navigation sidebar while preserving the rule that every phone brand has its own sub-catalogue.

## Implemented
- Added a desktop sticky **Browse Phones / Brands** sidebar.
- Sidebar contains All Phones plus every phone brand currently in the master catalogue:
  - Apple
  - Samsung
  - Google Pixel
  - TECNO
  - Infinix
  - itel
- Brand counts are shown beside each brand.
- Active brand has a clear visual state.
- Clicking a brand filters the catalogue to that brand and smoothly scrolls to its sub-catalogue.
- Clicking All Phones restores the complete separated catalogue.
- The main content still renders brands as separate sub-catalogues, never as a mixed product wall.
- Added a mobile brand-navigation drawer triggered by **Browse by brand**.
- Mobile drawer has backdrop, close control and the same brand counts.
- Sidebar remains sticky on desktop and does not interfere with the existing product grid.
- Existing search behaviour remains intact and can be combined with brand selection.

## UX Rules
1. Phones is the parent category.
2. Each manufacturer is a dedicated sub-catalogue.
3. The sidebar is navigation, not inventory filtering.
4. Brand selection should never merge products from different brands into one visual sub-catalogue.
5. Search may narrow the selected brand, but the resulting products remain grouped by brand.
6. Desktop sidebar is persistent/sticky for fast browsing.
7. Mobile uses a drawer so catalogue cards retain their full screen width.
8. Product images remain model-specific placeholders until Amaal supplies approved photography.

## Preserved
- No database reset.
- No schema changes.
- No backend reset/replacement.
- No Business Admin Console changes.
- No inventory logic exposed to the public catalogue.

## Files changed
- `apps/public-web/app/phones/page.tsx`
- `apps/public-web/app/globals.css`
- `CONTINUATION.md`
- `CONTINUATION_PHASE37.md`

## Validation
- Archive/source integrity checked.
- Structural review of the phone catalogue route completed.
- Full npm install/build was attempted but timed out in the execution environment before a production build could complete. Do not treat this as a production build pass.

## Next
- Run the full Next.js production build in Vercel.
- Visual QA at desktop/tablet/mobile widths.
- Add final approved phone photography per model.
- Continue verified model specification enrichment.
