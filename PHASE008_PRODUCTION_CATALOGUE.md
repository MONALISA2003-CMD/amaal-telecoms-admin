# Amaal Phase 008 — Production Catalogue Hardening

## Delivered
- Unified public catalogue foundation with `getPublicCatalogue` and shared search helpers.
- Business Console remains the product-management/source-of-truth surface.
- Public product pricing is now consistently **Price coming soon** until Amaal supplies live pricing.
- Public product photography is now consistently **Product photo coming soon** until Amaal uploads media.
- Manufacturer website links and manufacturer-information buttons were removed from the public website.
- Public catalogue no longer renders bundled product photography.
- Existing published-product API remains the live catalogue boundary for generic/search product discovery and configuration data.
- Computer, audio, TV and phone catalogue routes remain intact and customer-facing.
- Audio remains under Entertainment → Audio, not as a separate top-level entity.
- Product descriptions remain present across the catalogue; TV descriptions are generated per model/size from verified metadata where available and deliberately cautious for partially/unverified records.

## Verification
- TypeScript/TSX transpile: PASS (excluding Next ambient `next-env.d.ts`, which is not a source build failure).
- Phase 008 public-production audit: PASS.
- Category catalogue audit: PASS.
- Computer catalogue audit: PASS — 22 definitions.
- Audio catalogue audit: PASS — 17 definitions.
- TV master catalogue audit: PASS — 210 model/family definitions, 236 variant rows.
- Cross-module audit: PASS — 0 unmatched frontend routes.
- Render preflight: PASS.
- Public external-link/OEM scan: PASS — no manufacturer URLs/buttons in public app source.

## OEM spot verification completed
Current manufacturer information was checked for representative current products including Apple MacBook Air M5, MacBook Pro M5 Pro/M5 Max, Hisense PARTY ROCKER ONE, JBL PartyBox Encore Essential 2 and Sony ULT FIELD 7. The catalogue keeps exact details where verified and uses configuration-dependent wording rather than inventing regional configurations.

## Important deployment note
A full Next.js production build should still be run by Vercel after this archive is pushed, exactly as with the previous successful deployment. The local environment does not contain the project's installed Next dependency cache.
