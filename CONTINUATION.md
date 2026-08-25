# Amaal Telecoms Admin System Continuation

## Current system state

The cumulative Amaal Telecoms Admin System is a Node.js 20 / Express 5 / PostgreSQL administration platform. Business modules are cumulative and integrated. PostgreSQL is never reset by application startup. The canonical procurement requisition entity is `purchase_requisitions`. MFA remains deferred to the final security phase.

## Completed module

### Pricing & Promotions

Pricing & Promotions is implemented as the authoritative commercial pricing layer used by Sales/POS, Orders & E-commerce and the public catalog pricing path.

Implemented:

- Customer-type price lists for Retail, Wholesale, Corporate, VIP and Custom pricing
- Safe price-list validity windows and priorities
- Variant-level price-list entries
- Compare-at price validation
- Central effective-price calculation
- Customer-type normalization between CRM customer types and commercial price types
- Product, category and brand promotions
- Percentage and fixed-amount promotions
- Promotion customer eligibility
- Minimum quantity eligibility
- Promotion scheduling and expiry
- Explicit server-enforced single-promotion policy
- Promotion activation approval workflow
- Promotion approval history
- Promotion target validation
- Coupon creation and validation
- Coupon usage limits
- Per-customer coupon limits
- Coupon date windows
- Coupon redemption records
- Coupon integration with Sales/POS
- Coupon integration with Orders
- Historical transaction prices remain immutable
- Pricing export
- Pricing summary and operational promotion data
- Pricing and promotion audit events

## Database changes

Additive migration-safe structures include:

- `price_lists`
- `price_list_items`
- `promotions` commercial eligibility fields
- `promotion_products`
- `promotion_categories`
- `promotion_brands`
- `promotion_approvals`
- `coupons`
- `coupon_redemptions`
- Sales promotion/coupon linkage
- Order promotion/coupon linkage
- `amaal_effective_variant_price_qty(...)`
- Backward-compatible `amaal_effective_variant_price(...)` wrapper
- Pricing indexes

No PostgreSQL reset or destructive migration was introduced.

## API changes

Pricing:

- `GET /api/pricing/summary`
- `GET /api/pricing/lists`
- `POST /api/pricing/lists`
- `PATCH /api/pricing/lists/:id`
- `GET /api/pricing/lists/:id/items`
- `POST /api/pricing/lists/:id/items`
- `DELETE /api/pricing/lists/:id/items/:itemId`
- `GET /api/pricing/variants`
- `GET /api/pricing/effective/:variantId`
- `GET /api/pricing/export`
- `GET /api/pricing/approvals`

Promotions:

- `GET /api/promotions`
- `POST /api/promotions`
- `PATCH /api/promotions/:id`
- `POST /api/promotions/:id/request-approval`
- `POST /api/promotions/:id/approve`
- `POST /api/promotions/:id/reject`
- `POST /api/promotions/:id/targets/:type`
- `DELETE /api/promotions/:id/targets/:type/:targetId`
- `GET /api/promotions/:id/targets`

Coupons:

- `GET /api/coupons`
- `POST /api/coupons`
- `POST /api/coupons/validate`

## Integrations

### Catalog

Catalog base selling prices remain the source fallback price. Pricing does not overwrite completed transaction prices.

### Customers & CRM

CRM customer types are normalized into the commercial pricing types without creating a duplicate customer system.

### Sales & POS

Sales resolve the authoritative effective price server-side and can apply a validated coupon. Manual price overrides and ordinary discount approvals remain governed by the existing Sales controls.

### Orders & E-commerce

Orders use the same effective-price function as Sales/POS. Coupon redemption is recorded only when an order becomes fully paid, preventing abandoned or partially paid orders from consuming coupon limits.

### Web & Hosting

The public catalog continues to expose effective retail prices from the same database pricing function.

### Finance and BI

Existing financial and BI modules consume the actual sale/order totals. No fake analytical records are generated.

## Security

- Authentication preserved
- Server-side pricing permissions preserved
- `pricing.view`
- `pricing.manage`
- `pricing.export`
- `promotions.view`
- `promotions.manage`
- `promotions.approve`
- Promotion activation requires appropriate approval
- Promotion targets are validated server-side
- Coupon limits are checked server-side under transaction locks
- Promotion stacking is explicitly disabled
- Historical sale/order pricing is not recalculated
- Audit logging covers pricing and promotion mutations
- MFA remains deferred

## Audit and bug checks

- Complete cumulative project inspected
- Previous modules retained
- Pricing structures audited
- Customer-type mismatch corrected
- UUID aggregate startup issue retained as fixed
- Pricing/order/sales price calculation unified
- Coupon abandoned-order consumption bug prevented
- Promotion target invalid-type crash path corrected
- Price-list compare-at validation added
- Promotion date and quantity validation added
- Promotion approval lifecycle checked
- JavaScript syntax checked across all JavaScript files
- Render preflight passed
- Application YAML scan passed with dependency and repository tooling exclusions
- Final package contains no `node_modules`
- Only `README.md` and `CONTINUATION.md` remain as Markdown documentation
- Canonical `purchase_requisitions` verified
- MFA verified as deferred

Live Render and production PostgreSQL execution cannot be performed from the local archive environment, so this package does not claim a false live-production pass.

## Known limitations

- Promotion stacking is intentionally disabled. Only one promotion is applied per line.
- External payment gateway confirmation remains an Integration Hub responsibility.
- Advanced public storefront campaign presentation remains part of the Web & Hosting work.

## Next module

**Delivery & Logistics**

## Next-module continuation prompt

Continue directly from this cumulative ZIP.

1. Inspect the complete project before changing anything.
2. Read `README.md` and this `CONTINUATION.md`.
3. Audit Catalog, Inventory, Suppliers & Procurement, Customers & CRM, Sales & POS, Orders & E-commerce and Pricing & Promotions before building.
4. Fix every regression before adding new functionality.
5. Do not rebuild the application.
6. Do not reset PostgreSQL.
7. Do not create database branches or Git branches.
8. Do not commit secrets.
9. Do not introduce YAML files.
10. Do not implement MFA. MFA remains final-phase only.
11. Preserve the canonical `purchase_requisitions` implementation.
12. Preserve the canonical `orders` implementation.
13. Preserve the authoritative pricing function and do not create a second pricing engine.
14. Use real operational data rather than fake dashboard records.
15. Build Delivery & Logistics as an integrated operational module connected to Orders, Sales, Inventory, Customers, Finance and Web & Hosting.
16. Support delivery zones, delivery fees, shipment creation, assignment, tracking, dispatch, delivery attempts, proof of delivery, failed deliveries, cancellations, returns handoff and delivery status history.
17. Ensure delivery completion consumes the correct inventory reservation exactly once and synchronizes finance exactly once.
18. Prevent duplicate shipment creation and duplicate delivery completion under concurrent requests.
19. Preserve serialized and IMEI lifecycle integrity through delivery.
20. Integrate delivery partners through the existing Integration Hub rather than creating duplicate integration infrastructure.
21. Protect delivery fee changes and operational overrides server-side.
22. Audit all delivery mutations and status transitions.
23. Test Orders → Delivery → Inventory → Finance and Delivery → Returns workflows.
24. Test failed delivery and retry workflows.
25. Test cancellation and duplicate webhook/idempotency scenarios.
26. Run all JavaScript syntax checks.
27. Run Render preflight.
28. Search the complete project for YAML files and confirm no application YAML was introduced.
29. Verify `purchase_requisitions` remains canonical.
30. Verify MFA remains untouched.
31. Audit database bootstrap SQL for PostgreSQL type compatibility.
32. Audit route ordering before dynamic `/:id` routes.
33. Remove obsolete Markdown documentation before delivery, retaining only `README.md` and the new `CONTINUATION.md`.
34. Produce the next `CONTINUATION.md` describing Delivery & Logistics and the following module.
35. Package the complete cumulative project, not only changed files.
36. Deliver the ZIP only after the complete audit, bug checks and Render preflight pass.
