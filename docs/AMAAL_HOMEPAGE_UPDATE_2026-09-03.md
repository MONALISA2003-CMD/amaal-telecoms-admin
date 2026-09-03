# Amaal Public Homepage Update — 2026-09-03

## Scope
Targeted public-homepage enhancement only. Existing application architecture is preserved.

## Hero preservation
The existing homepage hero section and `apps/public-web/public/assets/amaal/home-hero.jpg` were preserved. A direct section comparison against the prior merged project confirmed the hero section is identical.

## Implemented experience changes
- Preserved the existing hero photo, background, copy and controls.
- Reworked post-hero content into a cleaner shopping journey.
- Reused the supplied 8 category assets.
- Reused the supplied Featured and New product assets.
- Product cards now use **Order Now** instead of **Ask about this product** on the homepage, linking into the existing product experience rather than inventing a new cart flow.
- Removed visible AutoRail pause/play and left/right direction controls.
- AutoRails now move continuously through the existing duplicated track and no longer pause because of clicks or wheel events.
- Reduced-motion preferences are respected.
- Shop by Brand shows only the approved 10 homepage brands: Apple, Samsung, Google Pixel, TECNO, TCL, Sony, JBL, LG, Hisense and HP.
- Homepage brand tiles contain approved logos only; brand names are not repeated beneath the logos.
- Remaining approved brand logos remain available through the existing Brands page.
- Reused the four supplied trust visuals again in a lower **Why Amaal** trust section.
- Consolidated the lower homepage experience to reduce unnecessary visual repetition while retaining existing service/newsletter/footer routes.

## Protected areas
- No database reset, delete, truncate, reseed, migration or schema modification.
- No backend rebuild or API replacement.
- No Admin Console changes.
- No authentication, checkout, payment, order or inventory architecture changes.

## Validation
- Supplied homepage asset count: 52.
- Hero asset SHA-256 was unchanged from the prior merged project.
- Changed `app/page.tsx` and `components/AutoRail.tsx` passed TypeScript transpilation/syntax checks.
- Full TypeScript project validation cannot be completed in this environment because project dependencies are not installed; a no-install `tsc --noEmit` run reports the existing missing dependency/type-resolution errors.
- No full production browser build is claimed without installed dependencies.
