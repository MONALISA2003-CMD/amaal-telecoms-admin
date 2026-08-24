# Amaal Telecoms — Canonical Module Map

This project uses **business module names**, not numbered phase names. Future source files must follow this rule.

## Core modules

- **Core Administration & Security** — `server.js` + `schema.sql`
  - Identity, RBAC, staff, roles, organization, departments, sessions, MFA, trusted devices, security events, audit and settings.
- **Catalog** — `server.js` + `schema.sql`
  - Products, variants, categories, category icons, brands, logos, images, descriptions, pricing and website publishing.
- **Inventory** — `server.js` + `schema.sql`
  - Stock, receiving, adjustments, transfers, reservations, serialized devices/IMEI, stocktakes, incidents and movement ledger.
- **Suppliers & Procurement** — `suppliers-procurement.js`
  - Suppliers, requisitions, purchase orders, goods receipts, invoices, supplier payments and performance.
- **Customers & CRM** — `customers-crm.js`
  - Customers, addresses, interactions, support, CRM tasks, tags, privacy and anonymization.
- **Sales & POS** — `sales-pos.js`
  - Point of sale, payments, receipts, serialized sales, voids and sales reporting.
- **Orders & E-commerce** — `orders-ecommerce.js`
  - Orders, payments, order lifecycle, fulfillment, reservations and serialized assignment.
- **Web & Hosting** — `web-and-hosting.js`
  - Websites, pages, navigation, media, domains, redirects, staging and controlled publication.
- **Pricing & Promotions** — `pricing-and-promotions.js`
  - Price lists, promotions, coupons and effective-price rules.
- **Delivery & Logistics** — `delivery-logistics.js`
  - Delivery zones, delivery partners, shipment assignment, unit counts, unit costs, destinations, status history, attempts and partner performance.
- **Warranty & Repairs** — `warranty-repairs.js`
  - Warranty policies, claims, serialized service, repair jobs, repair partners, item descriptions, locations, expected returns and partner cost tracking.
- **Returns & Refunds** — `returns-refunds.js`
  - Return requests, source-line validation, inspection, restocking, serialized returns and refunds.
- **Document Management** — `document-management.js`
  - Database-backed upload, attachment, metadata, authenticated download and deletion.

## Security rules

1. Browser sessions are cookie-based and HttpOnly.
2. Sessions are bound to a trusted device context and checked server-side.
3. Inactivity timeout defaults to **10 minutes**.
4. New devices require MFA when the account has MFA enabled.
5. Security policy can require MFA for every sign-in after enrollment.
6. Password changes revoke other active sessions.
7. Revoking a trusted device revokes its active sessions.
8. CSRF protection is applied to authenticated state-changing browser requests.
9. Public website routes must expose only published/public-facing data.
10. Internal costs, suppliers, staff, permissions, security events and audit records must never be exposed by public routes.

## Future modules

Use names such as:

- `credit-installments.js`
- `finance-accounting.js`
- `business-intelligence.js`
- `ai-operations.js`
- `marketing-automation.js`
- `public-web-integration.js`

Never create `phase10.js`, `phase11.js`, etc.
