# Continuation Prompt for the Next LLM

You are continuing the Amaal Telecoms Admin platform from the supplied ZIP. Treat the supplied ZIP as the current source of truth. Do not rebuild the project from scratch and do not invent mock records.

## Business context

Amaal Telecoms is a Uganda-based electronics and telecommunications retailer. It sells Infinix, Samsung, Tecno, iPhone, itel and other phones; TVs including TCL, Hisense, Samsung, LG, Global Star, CHiQ, SPJ and others; speakers; kitchen and home appliances; electronics; and phone accessories.

The administration console will eventually connect to Amaal Telecoms' public websites for controlled management. The public website must never receive internal costs, supplier data, staff/security data, audit records or private customer information.

## Current architecture

- Node.js 20.x
- Express 5
- PostgreSQL / Neon-compatible DATABASE_URL
- JWT authentication + secure session cookie + CSRF protection
- RBAC permissions
- PostgreSQL-backed audit trail
- No mock business data
- Mobile-first admin console
- Render is the current deployment/testing environment
- The dashboard root URL is the primary manual testing control center

## Canonical module naming rule

Never name source files `phase1`, `phase2`, `phase10`, etc. Use business feature names.

Current module source files include:

- `server.js`
- `schema.sql`
- `customers-crm.js`
- `suppliers-procurement.js`
- `sales-pos.js`
- `orders-ecommerce.js`
- `web-and-hosting.js`
- `pricing-and-promotions.js`
- `delivery-logistics.js`
- `warranty-repairs.js`
- `returns-refunds.js`
- `document-management.js`

See `MODULE_MAP.md` for the authoritative map.

## Completed functional scope

### Core Administration & Security
Identity, staff, RBAC, permissions, sessions, MFA, security policy, organization, departments, notifications, settings, feature flags and audit.

### Catalog
Products, variants/SKUs, categories, category icons, brands, brand logos, product images, descriptions, pricing fields, promotion type (None / Flash Sale / Promotional), tags, SEO and publishing controls.

### Inventory
Locations, stock balances, receiving, adjustments, transfers, reservations, serialized devices, IMEI/serial tracking, movements, stocktakes and damage/loss incidents.

### Suppliers & Procurement
Suppliers, requisitions, purchase orders, approvals, goods receipts, supplier invoices, invoice matching, supplier payments and supplier performance.

### Customers & CRM
Customer profiles, addresses, interactions, support cases, privacy/consent, CRM tasks and customer tags.

### Sales & POS
POS, product search, customer selection, serialized sales, payments, split payments, receipts, voids, inventory deduction and sales audit.

### Orders & E-commerce
Orders, payments, reservations, order status lifecycle, fulfillment, serial assignment, delivery readiness and order audit.

### Web & Hosting
Website records, pages, navigation, banners, media, domains, redirects/settings, publication request/approval/execution and public/private data boundaries.

### Pricing & Promotions
Price lists, customer types, variant prices, promotions, targeting, coupons and centralized effective-price calculation. The previous PostgreSQL alias bug in the pricing function has been corrected: the product variant alias is `v`, not `p`.

### Delivery & Logistics
Delivery zones, shipment creation, driver assignment, carrier/tracking, scheduled delivery, shipment events, delivery attempts and synchronization with eligible orders. Delivery completion consumes reservations and completes a Dispatched order safely.

### Warranty & Repairs
Warranty policies, warranty claims, serialized-unit service state, repair jobs, technicians, diagnosis, work performed, costs, claim events and resolution.

### Returns & Refunds
Return requests, source order/sale line validation, quantity protection, inspection/disposition, inventory restocking, serialized returns, refund transactions and audit events.

### Document Management
Database-backed durable uploads, metadata, entity attachment, duplicate detection, authenticated download, metadata editing and deletion. Supported formats: PDF, JPG, PNG, WEBP, TXT, CSV, DOCX and XLSX. Maximum upload size: 15 MB.

## Critical testing requirement

The admin root URL must allow a tester to navigate to every enabled module through the Dashboard Module Control Center. Every visible button must either perform a real action or open a real working form/modal. Do not add decorative fake controls.

## Public website safety

Never expose internal admin data through public routes. Public website data must be explicitly publishable and must respect the existing Draft -> Request -> Approve -> Execute publication workflow.

## Next module to build

Build **Credit & Installments** next, not by filename phase number.

The module should cover:

- Credit applications
- Customer credit profiles
- Credit limits
- Risk assessment
- Approval levels
- Down payments
- Installment schedules
- Due dates
- Payment allocation
- Partial payments
- Late fees/penalties with configurable rules
- Overdue accounts
- Rescheduling
- Early settlement
- Write-offs with approval
- Collections workflow
- Credit notes/statements
- Customer credit history
- Device/IMEI association for financed phones
- Contract/document attachment using the existing Document Management module
- Audit trail
- Permissions
- Reporting

It must integrate with Customers & CRM, Catalog, Inventory/serialized units, Sales & POS, Orders, Payments, Returns, Warranty and Finance later.

## Non-negotiable development method

1. Inspect the supplied ZIP first.
2. Read `MODULE_MAP.md`.
3. Identify existing database tables and APIs before adding anything.
4. Plan the module and its dependencies before coding.
5. Add feature-named source and SQL files.
6. Register permissions centrally.
7. Register the module in `server.js`.
8. Add dashboard navigation and mobile test controls.
9. Make every button functional.
10. Use real PostgreSQL data only.
11. Use transactions for financial/inventory mutations.
12. Audit every important mutation.
13. Reuse the existing Document Management system rather than creating a second file-storage mechanism.
14. Do not bypass existing order/sales/inventory state machines.
15. Run syntax checks on every JS file.
16. Audit route references, permission references, schema references and frontend action handlers.
17. Check for PostgreSQL constraint conflicts before delivery.
18. Do not send the ZIP until the cumulative system has been audited.
19. Preserve all previous modules while adding the new one.
20. Do not use phase-number filenames anywhere in the implementation.

Return a clean cumulative ZIP only after the audit is complete, and include an updated `MODULE_MAP.md`, audit report and continuation prompt.
