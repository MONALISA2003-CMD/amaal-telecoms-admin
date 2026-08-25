# Amaal Telecoms Admin System Continuation

## Current system state

The cumulative Amaal Telecoms Admin System is a Node.js 20 / Express 5 / PostgreSQL administration platform. Existing business modules remain integrated rather than rebuilt. The current completed business area is **Orders & E-commerce**.

The platform continues to use business/module-oriented code organization. PostgreSQL is never reset by application startup. No Git branches, database branches, new YAML files or new MFA implementation were introduced in this build.

## Completed module

### Orders & E-commerce

The Orders & E-commerce module was audited and hardened into an operational order workflow connected to Catalog, Inventory, Customers & CRM, Sales & POS, Delivery, Returns & Refunds and Finance.

Implemented and verified:

- Real order creation using active catalog variants and configured effective pricing
- Customer linkage to the existing Customers & CRM records
- Guest orders without creating duplicate customer records
- Inventory availability checks and transactional stock reservations
- Reservation expiry compatibility with the existing reservation cleanup process
- Order idempotency using `Idempotency-Key` / `idempotency_key`
- Controlled order payment lifecycle
- Cash, Mobile Money, Card, Bank Transfer and Online Payment methods
- Partial payment state
- Full payment state transition
- Payment idempotency protection
- Payment finance synchronization using the existing Finance tables
- Controlled order status lifecycle
- Server-side payment gating before fulfillment
- Cancellation with mandatory reason and reservation release
- Serialized product and IMEI assignment
- Prevention of duplicate serialized allocation through existing unique constraints and transactional locking
- Fulfillment records
- Delivery integration
- Delivery completion inventory consumption
- Delivery completion finance synchronization
- Order-to-sale conversion for fully paid orders
- Sale linkage without creating a second order entity
- Sale receipt creation during order-to-sale conversion
- Order refund handoff to the canonical Returns & Refunds module
- Order analytics based on operational records
- Order CSV export
- Order audit events
- Responsive Orders UI actions for payment, status, cancellation, fulfillment, sale conversion and refund handoff

## Critical deployment fix

The previous Render failure was traced to PostgreSQL attempting to execute `min(id)` where `id` is UUID while bootstrapping the customer-address duplicate-default repair.

The schema now uses `row_number()` to select a deterministic keeper instead of a UUID aggregate.

`npm start` now runs the Render preflight before starting the application. The preflight explicitly rejects unsupported UUID aggregate usage and verifies the corrected repair logic.

This prevents the application from reaching the database startup path with the known invalid bootstrap expression.

## Database changes

Additive and migration-safe changes include:

- `orders.idempotency_key`
- `orders.cancellation_reason`
- Unique partial index for non-null order idempotency keys
- Order payment status indexes
- Order fulfillment status indexes
- `order_payments.reversed_at`
- `order_payments.reversed_by`
- Hardened customer-address duplicate-default repair using `row_number()`

Existing canonical entities remain intact:

- `purchase_requisitions`
- `orders`
- `order_lines`
- `order_payments`
- `order_status_history`
- `inventory_reservations`
- `order_fulfillments`
- `order_serial_units`
- `sales_order_links`

No PostgreSQL reset or destructive migration was introduced.

## API changes

Important Orders endpoints include:

- `GET /api/orders/summary`
- `GET /api/orders`
- `GET /api/orders/analytics`
- `GET /api/orders/export`
- `GET /api/orders/:id`
- `POST /api/orders`
- `POST /api/orders/:id/payment`
- `POST /api/orders/:id/serials`
- `POST /api/orders/:id/status`
- `POST /api/orders/:id/cancel`
- `POST /api/orders/:id/fulfillment`
- `POST /api/orders/:id/convert-to-sale`
- `POST /api/orders/:id/refund`

Static route ordering was audited so `/api/orders/analytics` and `/api/orders/export` are registered before `/api/orders/:id` and cannot be swallowed by the dynamic route.

## Frontend changes

The existing design system was preserved.

Orders now supports:

- Order dashboard
- Search
- New order creation
- Customer selection
- Location selection
- Product selection
- Reservation-backed order creation
- Payment capture
- Status management
- Cancellation with reason
- Fulfillment management
- Serialized/IMEI assignment
- Conversion to Sales/POS sale
- Refund handoff to Returns & Refunds
- Order detail and history

The frontend no longer submits catalog selling prices as authoritative order prices. The server resolves effective pricing, preventing promotion/pricing mismatches and client-side price manipulation.

## Integrations

### Catalog

Orders use active product variants, SKUs, effective pricing and configured tax rates.

### Inventory

Orders reserve real stock and consume the reservation during fulfillment or order-to-sale conversion. Reservations are released on cancellation and remain compatible with the existing expiry cleanup job.

### Customers & CRM

Orders reference the existing customer entity and therefore remain visible through Customer 360 rather than creating a second customer system.

### Sales & POS

Fully paid orders can be converted into a completed retail sale. The conversion preserves the original order relationship through `sales_order_links` and `sales.order_id`.

### Delivery & Logistics

Delivery completion consumes order reservations, marks serialized units sold and synchronizes the order completion journal through the shared Orders finance callback.

### Returns & Refunds

Order refunds hand off to the existing canonical Returns & Refunds workflow rather than creating a second return engine.

### Finance

Order payments create real finance journals. Fulfilled orders create a balanced order-completion journal. Order-to-sale conversion records the sale against the existing order finance journal so the same economic event is not posted twice by the Sales finance synchronization path.

## Security

- Authentication preserved
- Server-side permissions preserved
- Orders protected by `orders.view`, `orders.create`, `orders.manage` and `orders.export`
- Sale conversion requires `sales.create`
- Refund handoff requires `returns.manage`
- Manual order price overrides rejected
- Manual order tax overrides rejected
- Manual order discounts rejected
- Payment methods validated server-side
- Payment amounts cannot exceed outstanding balance
- Idempotency supported for order creation and payments
- Serialized allocation is locked and validated server-side
- Cancellation requires a reason
- Audit logging covers important order mutations
- MFA remains deferred to the final security module

## Audit and bug checks performed

- Complete source archive inspected before modification
- Existing continuation state reviewed
- Orders & E-commerce implementation audited
- Sales/POS integration audited
- Delivery integration audited
- Returns integration audited
- Finance integration audited
- PostgreSQL bootstrap failure investigated
- UUID aggregate failure removed
- JavaScript syntax checked across the project
- Frontend JavaScript syntax checked
- Render preflight passed
- Route collision / ordering audit performed
- Canonical `purchase_requisitions` verified
- YAML scan completed: zero YAML files
- Hardcoded secret pattern scan completed
- `node_modules` excluded from package
- No PostgreSQL reset introduced
- No MFA implementation introduced

Live Render execution and live production PostgreSQL execution cannot be performed from the local archive environment. The package therefore does not claim a false live-production pass.

## Documentation cleanup

Historical build/audit Markdown files were removed from the deliverable to reduce clutter.

The package intentionally retains only:

- `README.md`
- `CONTINUATION.md`

## Known limitations

- Live Render deployment must be performed from the corrected project contents.
- External payment gateway confirmation remains an Integration Hub responsibility.
- Public storefront checkout remains dependent on the future public Web & Hosting/frontend deployment architecture.
- Advanced promotion approval workflows belong to the next Pricing & Promotions module.

## Next module

**Pricing & Promotions**

## Next-module continuation prompt

Continue directly from this cumulative ZIP.

1. Inspect the complete project before changing anything.
2. Read `README.md` and this `CONTINUATION.md`.
3. Audit Catalog, Inventory, Suppliers & Procurement, Customers & CRM, Sales & POS and Orders & E-commerce before building.
4. Fix every regression discovered before adding new functionality.
5. Do not rebuild the application.
6. Do not reset PostgreSQL.
7. Do not create database branches or Git branches.
8. Do not commit secrets.
9. Do not introduce YAML files.
10. Do not implement MFA. MFA remains final-phase only.
11. Preserve the canonical `purchase_requisitions` implementation.
12. Preserve the canonical `orders` implementation. Do not create a duplicate order engine.
13. Use real operational data rather than demo/fake BI records.
14. Preserve the existing design system and architecture.
15. Audit the existing effective-price function and pricing structures before adding new pricing entities.
16. Build Pricing & Promotions as a controlled business module integrated with Catalog, Customers, Sales/POS, Orders, Finance and BI.
17. Support price books, customer pricing where appropriate, promotion eligibility, scheduled promotions, percentage/fixed discounts, product/category promotions, minimum quantities, date windows and approval controls without bypassing server-side validation.
18. Ensure Sales and Orders consume one authoritative effective-price calculation rather than implementing separate pricing formulas.
19. Prevent promotions from creating negative prices or invalid tax calculations.
20. Preserve historical transaction prices. Changing a price must never rewrite completed sales or completed orders.
21. Add audit history for price creation, modification, activation, deactivation, promotion approval and promotion usage where appropriate.
22. Add database constraints and indexes for real pricing query patterns.
23. Ensure concurrent checkout/POS operations cannot apply stale or conflicting prices.
24. Test Catalog → Pricing → Order and Catalog → Pricing → POS workflows.
25. Test customer-specific pricing without duplicating Customers & CRM.
26. Test promotion stacking rules and make the stacking policy explicit and server-enforced.
27. Test expiry and future scheduling.
28. Test cancelled, returned and historical transactions to ensure their original prices remain unchanged.
29. Test Finance and BI calculations against real operational records.
30. Run every available JavaScript syntax check.
31. Run Render preflight.
32. Search the complete project for YAML files.
33. Verify `purchase_requisitions` remains canonical.
34. Verify MFA remains untouched.
35. Audit route ordering for static endpoints before dynamic `/:id` routes.
36. Audit database bootstrap SQL for PostgreSQL type compatibility, especially UUID operations.
37. Perform regression testing across all previous business modules.
38. Remove obsolete temporary Markdown documentation before delivery, retaining only `README.md` and the current `CONTINUATION.md`.
39. Update `README.md` only when genuinely useful for the current cumulative system.
40. Produce the next `CONTINUATION.md` describing the completed Pricing & Promotions module and the following business module.
41. Package the complete cumulative project, not only changed files.
42. Deliver the ZIP only after the audit and preflight pass.
