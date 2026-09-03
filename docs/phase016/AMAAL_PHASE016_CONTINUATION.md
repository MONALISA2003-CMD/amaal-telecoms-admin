# AMAAL PHASE 016 CONTINUATION

## Scope
Phase 016 implements the Commerce Core improvements agreed after Phase 015, with **payment explicitly deferred to the final commerce phase**.

## Implemented
- Server-backed guest/customer shopping cart with hashed guest cart token.
- Cart item add/update/remove/clear endpoints with server-side product, variant, publication, price and inventory validation.
- Guest cart merge into customer cart.
- Checkout now reads the server-backed cart and passes the cart identity into the existing authoritative order flow.
- Checkout no longer invokes the payment-intent route in this phase. Payment provider integration remains intentionally deferred.
- Premium mobile/desktop cart page and drawer with real approved product images when available, quantity controls, availability messaging and clear checkout actions.
- Normalized product attributes stored in `product_attributes`, safely backfilled from existing top-level specification JSON and managed from Business Console.
- Public catalogue payload now exposes active normalized attributes and variant availability.
- Search suggestions now use catalogue synonyms and PostgreSQL trigram similarity when available.
- Search page includes normalized product attributes in matching.
- Comparison now consumes normalized attributes and real DB variant pricing where available, while continuing to show `—` when a fact is unavailable.
- Product availability alerts for back-in-stock and price changes.
- Business Console visibility for commerce lifecycle signals, price alerts and stock alerts.
- Price-drop notification hook through existing customer notification records.
- Back-in-stock notification hook from the existing inventory mutation path.
- Review helpful/not-helpful vote persistence with one vote per voter key per review.
- Customer reorder action that rebuilds the customer shopping cart from a previous order while skipping unavailable variants.
- Commerce analytics event persistence for product discovery, compare, wishlist, cart, checkout, order and after-sales journey events.
- Saved-search persistence foundation.

## Safety
- No PostgreSQL reset/drop/truncate/recreate operations were introduced.
- Phase 016 migration is additive and idempotent.
- Existing product attributes are never physically deleted by the Business Console editor; removed values are marked inactive so historical data remains recoverable.
- Existing order, inventory, pricing and reservation architecture is preserved.
- No payment provider, webhook, reconciliation or card/mobile-money collection was fabricated.

## Verification
- `node --check server.js` passed.
- Phase 015 deep audit passed: 42 checks, 0 failures.
- Cross-module audit passed.
- Render preflight passed.
- Returns/warranty/service audit passed.
- Security regression audits passed.
- Category, computer and audio catalogue audits passed.
- Phase 016 deep audit passed: 21 checks, 0 failures.
- Changed TS/TSX files passed TypeScript transpile syntax diagnostics.
- Full local Next build was not executed because dependencies are not present in the uploaded archive and npm registry access timed out in this environment. The authoritative Vercel build remains required before production deployment.

## Explicitly Deferred
Payment remains last:
- MTN Mobile Money gateway
- Airtel Money gateway
- Visa/Mastercard acquiring
- Payment webhooks/signature verification
- Reconciliation and provider settlement

## Architecture
Business Console remains the single product-management surface. Public web consumes published catalogue data through the backend. PostgreSQL remains authoritative for commerce state.
