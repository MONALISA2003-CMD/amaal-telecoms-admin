# Amaal Continuation — Phase 25

## Vercel build fix

The Phase 24 Vercel deployment reached Next.js compilation successfully but failed during TypeScript checking in `apps/public-web/app/product/[slug]/page.tsx` because the page referenced fields (`image_url`, `brand`, `price`) that are not part of the authoritative `Product` type in `lib/catalog.ts`.

### Fixed
- Product detail now uses the existing typed `image(product)` helper.
- Product detail now uses the existing typed `price(product)` helper.
- Removed unsafe `any` lookup from product matching.
- Product brand now uses the authoritative `brand_name` field.
- No database changes.
- No API changes.
- No changes to the Business Admin Console.

## Vercel structure

Public website remains:

`src/livefix/apps/public-web`

If the GitHub repository root is the extracted project root, Vercel Root Directory is:

`src/livefix/apps/public-web`

## Verification

The reported Vercel log confirms dependency installation and Next.js compilation succeeded before TypeScript failed. A full local production build could not be completed in this environment because dependency installation exceeded the available execution window. Therefore production build success is **not claimed** here; the exact reported TypeScript errors were corrected against the repository's actual types.

## Remaining

1. Push this continuation to GitHub.
2. Redeploy `amaal-public-web` on Vercel.
3. Confirm the TypeScript stage passes.
4. Continue real catalogue/variant/product data verification.
5. Build cart only after the backend commerce contract is verified.
