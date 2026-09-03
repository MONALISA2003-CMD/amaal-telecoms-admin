# Amaal Phase 023 — Workstream 3: Cart & Checkout Commerce Foundation

## Scope

Workstream 3 hardens the real cart and guest-checkout foundation using the existing backend and Neon schema. Payment integration remains completely deferred.

## Completed

- Public cart continues to use `commerce_carts` and `commerce_cart_items` as the runtime cart authority.
- Guest carts remain supported through the existing high-entropy guest cart token.
- Authenticated customer carts remain supported through the secure customer session introduced in Workstream 2.
- Cart quantity changes, removal, clearing and guest-to-customer merge continue to use server-side validation.
- Product variant, active/public status, inventory availability and server-side pricing are revalidated before an order is created.
- Checkout keeps guest purchase support and does not force account creation.
- Checkout now collects Uganda-friendly area, landmark, directions and optional delivery notes.
- Those delivery details are passed to the existing checkout endpoint and persisted in the existing order address/notes fields; no schema migration was required.
- Delivery quotes continue to come from the existing `delivery_zones` capability when configured.
- Checkout no longer presents payment-method selection or payment-provider instructions.
- Checkout no longer sends a payment method from the public UI.
- The order response no longer fabricates payment instructions.
- Final price, tax, inventory and delivery are still calculated by the server at order creation.
- Existing idempotency protection remains in place for checkout submission.

## Payment boundary

Payment gateway implementation, payment-method collection and payment initiation are intentionally untouched and remain deferred. Existing backend payment endpoints were not removed or replaced.

## Database safety

- Production Neon branch was inspected read-only.
- No reset, DROP, TRUNCATE or destructive migration was performed.
- No schema migration was required for Workstream 3.
- Existing commerce tables and order tables remain the source of truth.

## Validation

- `node --check server.js` passed.
- TypeScript/TSX source was transpiled locally with the installed TypeScript compiler.
- Relative imports were checked.
- Payment UI references were checked in the Workstream 3 checkout page.
- ZIP integrity was verified before delivery.
- A full Next.js production build was not falsely claimed because the source package does not contain installed dependencies/lockfile.
