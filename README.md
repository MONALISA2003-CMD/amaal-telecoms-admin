# Amaal Telecoms Administration — Phase 4 Complete Release

This release builds Phase 4 on top of the accepted Phase 1–3 baseline. It adds the full supplier-to-payment procurement workflow without mock business records.

### Stabilization patch
- Fixed client-side view registration so every Phase 1–3 navigation section resolves to its correct renderer.
- Verified the frontend JavaScript parses successfully and all registered views reference existing render functions.
- No developer-facing diagnostics are displayed in the client UI.

## Included

### Administration and security
- Administrator authentication and secure sessions
- Password policy and password history
- MFA setup, enable and disable
- Staff management and staff profiles
- Roles and permissions
- Invitations
- Session administration
- Organization profile
- Departments
- Security events
- Audit trail and audit export
- Notifications
- General settings
- Feature flags

### Product catalog
- Products
- Categories and hierarchy
- Brands
- Product variants / SKUs
- Barcode and serialized-device flags
- Product specifications
- Product media
- Product tags
- Product revisions
- SEO fields
- Website publishing controls
- Price history
- Catalog export

### Suppliers & procurement
- Supplier master records, contacts, addresses, documents and notes
- Supplier product pricing, MOQ, lead time, tax/currency and price history
- Supplier balances, payment history and performance reviews
- Purchase requisitions with draft/submit/approve/reject/cancel workflow and approval history
- Purchase orders with lifecycle, lines, tax/discount/shipping, currency, expected dates, notes, attachments and approval history
- Goods receiving against approved purchase orders, linked directly to inventory balances, movement ledger and serialized/IMEI records
- Supplier invoices with purchase-order/receipt matching, dispute workflow and attachments
- Supplier payments, invoice balances and payment history
- Procurement export and audit trail

### Inventory
- Inventory locations
- Stock balances by SKU and location
- Goods receiving
- Stock adjustments
- Transfers with approval, shipment and receiving
- Reservations and automatic expiry release
- Serialized units, serial numbers and IMEI
- Stock movement ledger
- Stocktakes and reconciliation
- Damage, loss, found-stock and returns workflow
- Inventory export

## Deployment

The application is a Node.js / Express service intended for Render at this stage. It binds to the platform `PORT` and serves the client interface from `public/`.

The public interface loads JavaScript from `/app.js`; application JavaScript is not inline, allowing the server to retain a strict `script-src 'self'` policy.

Health endpoints:
- `/healthz` — lightweight process health check
- `/api/health` — database-backed application health check

## Data

No demonstration products, brands, inventory, suppliers, customers or transactions are inserted. Records shown in the console come from the connected database.

## Phase 4 workflow
Supplier → requisition → approval → purchase order → approval → goods receipt → inventory update → supplier invoice → three-way match → payment → supplier balance/performance.

No mock suppliers, purchase orders, invoices, payments or inventory records are inserted.

## Deployment workflow

This ZIP intentionally contains no GitHub Actions YAML file. Keep using the repository workflow that extracts each new release into the repository while removing the previous application files first.

## Important

Branches are not exposed in the client console. Existing legacy branch tables remain in the database for compatibility with the earlier foundation and are not used by the Phase 1–3 client navigation.
