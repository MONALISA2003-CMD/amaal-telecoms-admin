# Amaal Continuation — Phase 26

## Public Website — Catalogue Type Safety & Discovery Polish

### Built
- Corrected the Shop/Product listing to use the authoritative typed `Product` model.
- Removed the remaining unsafe `any` product mapping from the Shop page.
- Shop product imagery now uses the existing `image(product)` helper.
- Shop pricing now uses the existing `price(product)` helper and UGX formatting.
- Shop brand display now uses the authoritative `brand_name` field.
- Product detail remains connected to the existing public catalogue contract.

### Vercel
- Public website root remains `src/livefix/apps/public-web` when the repository root is the extracted project root.
- Next.js 16.3.3 / Node 24.x remain the target.

### Database / backend safety
- NO database reset.
- NO database recreation.
- NO destructive migration.
- NO table deletion.
- NO seed execution.
- NO Business Admin Console replacement.
- NO duplicate product source of truth introduced.

### Remaining
1. Push Phase 26 to GitHub.
2. Redeploy Vercel and confirm TypeScript/build success.
3. Verify the live public catalogue payload against actual product/variant records.
4. Add real category/brand navigation once corresponding public routes are verified.
5. Verify search/filter API capability before implementing client-side filter UI.
6. Verify cart/order/payment contracts before implementing checkout.
