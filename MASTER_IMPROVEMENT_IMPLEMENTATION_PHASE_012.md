# AMAAL — Master Improvement BP Implementation — Phase 012

This build advances the existing Amaal implementation rather than replacing it.

## Delivered
- Universal `/shop` catalogue combining the live Business Console catalogue with the researched public catalogue families already present in the project.
- Search, brand/category filters, sort, URL state and progressive loading on the universal shop.
- Persistent local shopping bag with quantity controls, removal, totals and checkout handoff.
- Persistent local saved-products/wishlist experience.
- Account hub, saved products and local order history views.
- Guest checkout form localized for Uganda with Mobile Money, Card and Pay on delivery choices.
- Additive public checkout endpoint using authoritative published product pricing and inventory reservation.
- Idempotent public order creation and payment-intent handoff endpoints.
- Public order tracking protected by order number + checkout phone number.
- Brands directory aggregated from live and curated catalogues.
- Collections landing page for merchandising journeys.
- Deals page that never invents discounts; active promotions remain controlled by the Business Console.
- Mobile nested category navigation.
- Shopping-bag quantity indicator in the header.
- Wishlist controls on product cards and detail pages.
- Product-detail commerce actions for live-priced database products.
- Official Amaal brand assets remain in use.
- Light premium visual language preserved and expanded.

## Commerce boundary
The Business Console remains the authoritative surface for products, variants, prices, inventory, promotions, fulfilment, warranty and operational records. The public website does not expose product CRUD.

## Payment boundary
The storefront now creates a real pending order and payment intent. It does not pretend a payment succeeded. Live MTN Mobile Money, Airtel Money, card-gateway credentials and webhook verification must be configured in the deployment environment before a payment provider is allowed to mark payments completed.

## Safety
- No database reset.
- No destructive migration.
- Public checkout is guest-only and rate limited.
- Public tracking exposes only the minimum order/delivery information after matching both order number and checkout phone.
- Published products are revalidated against the authoritative database before an online order is accepted.
- Inventory is reserved transactionally for online orders.
- Idempotency keys prevent duplicate public checkout creation.

## Verification performed
- `server.js` syntax check: passed.
- All public-web TS/TSX files transpiled with TypeScript: passed.
- Public-web source has no new raw `<img>` elements.
- Official Amaal logo/background assets remain present and readable.
- Archive integrity and SHA-256 are recorded with the release package.

## Known deployment requirement
A full Next production build still requires the project dependencies to be installed. Dependency installation previously timed out in this environment, so Vercel remains the authoritative production build gate.
