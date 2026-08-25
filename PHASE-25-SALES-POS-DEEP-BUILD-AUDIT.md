# SALES & POS DEEP BUILD AUDIT

## Scope

This build continues from Customers & CRM without rebuilding the application.

## Previous module audit

- Catalog preserved.
- Inventory preserved.
- Suppliers & Procurement preserved.
- Canonical `purchase_requisitions` preserved.
- Customers & CRM preserved.
- Existing Orders, Returns, Credit and Finance modules remain registered.
- Existing security hardening remains in place.
- MFA remains deferred.

## Sales & POS deep build

### POS

- Product lookup supports product name, SKU, barcode and variant name.
- Customer selection uses the existing customer master.
- Cart supports quantity changes and cart discounts.
- Payment methods remain configured server-side.
- Sale creation uses database transactions and idempotency.
- Serialized/IMEI products are locked and validated before allocation.

### Suspended sales

- Held carts are stored as durable records.
- Retrieval changes the state instead of deleting history.
- Cancellation is controlled and audited.
- POS retrieval restores the stored cart.

### Till management

- Open shift uniqueness is enforced per cashier.
- Opening cash is captured.
- Cash movements are separately recorded.
- Closing computes expected cash from opening float, cash sales, cash movements and cash refunds.
- Actual cash and variance are captured.
- Variance reason is required when a variance exists.
- Closed shifts can be reconciled.

### Pricing approvals

- Discount thresholds are server-side.
- Price overrides can require approval.
- Approval identity and timestamps are retained.
- Approved/rejected decisions are audited.

### Receipts

- A sale receives one controlled receipt record.
- Reprints create reprint history rather than a second sale.
- Reprint reason and authorizer are retained.

### Quotations

- Quote records and lines are durable.
- Quote approval exists.
- Expired quotes cannot convert.
- Conversion creates a real sale and consumes inventory.
- Quote conversion creates the receipt and finance journal.
- Serialized quote conversion requires a real available serial/IMEI.

### Inventory

- Sales consume stock through the existing stock movement helper.
- Voids restore stock.
- Serialized units move from In Stock to Sold.
- Voids return serialized units to the selling location.

### Returns and refunds

- Sale details provide a handoff into the existing Returns & Refunds module.
- The existing return engine remains the source of truth for return and refund state.

### Finance

- Operational sales can create real finance journals.
- Payment method determines the corresponding cash/mobile/bank account.
- Revenue and tax are posted.
- COGS and inventory consumption are posted from actual sale lines.
- Partial payments can post the remaining amount to Accounts Receivable.
- Reversal journals are created for controlled sale voids.

### Analytics

Analytics query operational sales, lines and payments. No synthetic records are inserted.

## Security audit

- New routes use existing authentication middleware.
- New permissions are enforced server-side.
- No MFA code was added.
- No credentials or tokens were added.
- Existing CSRF and rate limiting remain active at the platform level.

## Deployment audit

- JavaScript syntax: PASS.
- Render preflight: PASS.
- YAML files introduced: 0.
- Canonical procurement requisition: preserved.
- PostgreSQL reset: none.

## Live verification boundary

The source archive environment does not contain the deployed Render PostgreSQL connection. Live transaction, payment, inventory and finance integration tests must therefore be completed after deployment.
