# Amaal Telecoms — Canonical Module Map

All source files use business/module names. Numbered phase filenames are forbidden.

## Core business modules

- Core Administration & Security — `server.js` + `schema.sql`
- Catalog — `server.js` + `schema.sql`
- Inventory — `server.js` + `schema.sql`
- Suppliers & Procurement — `suppliers-procurement.js`
- Customers & CRM — `customers-crm.js`
- Sales & POS — `sales-pos.js`
- Orders & E-commerce — `orders-ecommerce.js`
- Web & Hosting — `web-and-hosting.js`
- Pricing & Promotions — `pricing-and-promotions.js`
- Delivery & Logistics — `delivery-logistics.js`
- Warranty & Repairs — `warranty-repairs.js`
- Returns & Refunds — `returns-refunds.js`
- Document Management — `document-management.js`
- **Credit & Installments — `credit-installments.js`**
- **Finance & Accounting — `finance-accounting.js`**
- **Business Intelligence — `business-intelligence.js`**

## Interconnection added in this build

- Credit is linked to Customers and produces installment/payment records.
- Credit payments are available to Finance synchronization.
- Sales, supplier invoices, supplier payments, sale payments, order payments and refunds can be synchronized into Finance journals using idempotent source references.
- Finance provides receivables/payables/revenue/expense and net-result indicators.
- Business Intelligence reads Sales, Inventory, Orders, Returns, Delivery, Warranty/Repairs and Credit data.
- Delivery BI uses delivery partner/unit/cost tracking.
- Warranty BI uses repair partner workload/cost/turnaround data.
- Product BI uses Catalog + Sales line data.
- Inventory ageing uses Inventory balances + receipt movement history.
- All mutations remain permission-controlled and audited.

## Security rules

1. Browser sessions use Secure, HttpOnly cookies.
2. Sessions are bound to a trusted device context and checked server-side.
3. Idle timeout defaults to 10 minutes.
4. MFA can be required by policy and unfamiliar-device MFA is supported.
5. Password changes and trusted-device revocation revoke active sessions as designed.
6. CSRF protection covers authenticated state-changing browser requests.
7. Public website routes must never expose internal finance, credit, supplier, staff, security or audit data.
8. BI reports are authenticated admin data and must not be exposed publicly.

## Current remaining major modules

1. **AI Operations** — forecasting and decision support with human approval; only after deterministic data is accepted.
2. **Marketing Automation** — campaigns, segments, consent-aware messaging, coupons and attribution.
3. **Public Web Integration** — controlled admin-to-public publication, public order intake, stock/pricing/promotion synchronization and staging/preview.
4. **Advanced Platform Integrations** — payment gateways, messaging, accounting exports, webhooks and external service connectors after the core workflows are accepted.

Never create `phase10.js`, `phase11.js`, etc. Future builds must continue with the module name.
