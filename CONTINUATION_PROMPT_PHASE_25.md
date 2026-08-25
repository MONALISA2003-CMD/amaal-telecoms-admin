# CONTINUATION PROMPT — ORDERS & E-COMMERCE

Continue directly from the current cumulative Amaal Telecoms Admin System ZIP.

The current completed business module is Sales & POS.

The next module is Orders & E-commerce.

Before writing code:

- Inspect the complete project.
- Read `CONTINUATION.md`.
- Read the Sales & POS audit.
- Audit Catalog, Inventory, Suppliers & Procurement, Customers & CRM and Sales & POS.
- Fix regressions before adding functionality.

Non-negotiable rules:

- Do not rebuild the application.
- Do not reset PostgreSQL.
- Do not create database branches.
- Do not create Git branches.
- Do not commit secrets.
- Do not introduce YAML files.
- Do not implement MFA.
- Preserve the canonical `purchase_requisitions` implementation.
- Reuse the existing `orders`, `order_lines`, `order_payments`, `order_status_history`, reservation and fulfillment structures.
- Do not create a duplicate order engine.
- Use real operational data.
- Preserve existing design and architecture.

Orders & E-commerce should deepen:

- Order creation and editing rules
- Customer linkage and Customer 360
- Product and variant selection
- Pricing and promotion integration
- Stock reservation
- Payment lifecycle
- Partial payment where business rules permit
- Order status lifecycle
- Fulfillment status lifecycle
- Serialized/IMEI allocation
- Order cancellation
- Order-to-sale conversion where appropriate
- Delivery handoff
- Customer notifications where existing infrastructure supports them
- Returns and refunds
- Finance synchronization
- Order audit history
- Operational analytics

Required lifecycle:

Catalog → Order → Reservation → Payment → Fulfillment → Delivery → Customer → Finance

And:

Order → Sale where an order is completed through the retail Sales/POS workflow.

Do not duplicate Sales & POS functionality. Integrate with it.

Before delivery:

- Run all JavaScript syntax checks.
- Run Render preflight.
- Check complete project for YAML.
- Verify `purchase_requisitions`.
- Verify MFA remains untouched.
- Test order reservation and release.
- Test payment and partial payment.
- Test serialized allocation.
- Test cancellation.
- Test delivery handoff.
- Test returns/refunds.
- Test customer history.
- Test finance synchronization.
- Run regression testing across all prior modules.
- Produce `CONTINUATION.md`.
- Package the complete project, not only changed files.
