# Amaal Phase 016 Postfix Audit

Date: 2026-09-02

## Deployment failures fixed

### Render

Root cause: `computer-catalogue-seed.sql` attempted to create multiple `Laptops` categories under the same `Computers` parent through an incorrect cross join. An existing `Laptops` row then violated `uq_product_categories_name_parent` during startup.

Fix:
- `Computers` is seeded once as the top-level category.
- `Laptops`, `Desktops`, `All-in-One`, and `Gaming Laptops` are seeded as direct children of `Computers`.
- Brand laptop group categories are seeded under `computers-laptops`, not `computers`.
- Category inserts use conflict-safe `ON CONFLICT DO NOTHING` behavior.
- Existing data is never deleted or reset.

### Vercel

Root causes reported by the Vercel build:
- `app/product/[slug]/page.tsx`: an `unknown` specification value was used as a JSX conditional result.
- `lib/commerce.ts`: `CommerceItem` was incorrectly used as the server cart row type, producing missing-property TypeScript errors.

Fix:
- The product specifications condition is explicitly boolean.
- A dedicated `ServerCartItem` type models the backend snake_case payload.
- The server cart mapper converts the backend payload into the existing `CommerceItem` shape.

## Additional bugs found and fixed during the audit

- Cart payload now uses the authoritative effective retail price calculation, including active promotions.
- Non-inventory variants are no longer displayed as unavailable simply because no inventory balance exists.
- Checkout delivery fees are recalculated server-side from the delivery zone. The client cannot override shipping cost.
- Checkout cart conversion is now scoped to the authenticated customer or the matching guest-cart token. A caller cannot mutate another cart by supplying only its UUID.
- Guest/customer cart merge returns the same cart contract consumed by the storefront.
- Reorder returns a cart payload and the customer portal updates its local cart representation after reorder.
- Checkout no longer sends a client-supplied shipping amount.
- Payment providers remain intentionally deferred. No live payment collection, provider request, webhook or reconciliation was added.

## Static and source audits

- Phase 016 deep audit: 29/29 PASS.
- Phase 015 regression audit: 42/42 PASS.
- Cross-module audit: 0 unmatched frontend API routes; 18/18 connected checks.
- Render preflight: PASS.
- Server route duplicate scan: 0 duplicate method/path declarations.
- Backend JavaScript syntax: 53/53 files PASS.
- TypeScript/TSX transpilation syntax: 186/186 files PASS using TypeScript 5.8.3 parser/transpiler.
- Raw `<img>` scan: PASS.
- Destructive Phase 016 SQL scan: PASS.
- Payment-intent invocation removed from storefront checkout.
- Root Phase/Design Markdown clutter check: PASS.

## Build limitation

A full local Next.js production build could not be executed because the environment could not retrieve the public-web npm dependencies from the npm registry, and the archive does not contain installed dependencies or a lockfile suitable for offline installation.

The previous Vercel build failure was specifically addressed at every reported TypeScript error. A fresh Vercel build remains the authoritative final production build gate.

## Data safety

No PostgreSQL reset, truncate, table deletion, product deletion, inventory reset, or destructive Phase 016 migration was introduced.
