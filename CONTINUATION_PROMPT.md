# Continuation Prompt — Amaal Telecoms Administration

You are continuing an existing Amaal Telecoms administration platform for a Uganda-based electronics retailer.

## Business context

Amaal Telecoms sells:
- Phones: Infinix, Samsung, Tecno, iPhone, itel and other brands.
- TVs: TCL, Hisense, Samsung, LG, Global Star, CHiQ, SPJ and others.
- Appliances and kitchen/home appliances.
- Speakers and audio equipment.
- Electronics and phone accessories.

The admin console will eventually connect to the public websites so approved catalog, pricing, promotions, stock visibility, orders and other public content can be managed centrally.

## Architecture already in place

- Node.js 20.x
- Express 5
- PostgreSQL / Neon-compatible database
- Secure browser cookie sessions
- CSRF protection
- RBAC permissions
- MFA/TOTP
- Trusted-device binding
- 10-minute inactivity timeout
- Audit and security event logging
- Database-backed document storage
- Mobile-first administration UI

## Canonical module names

Never call source files `phase1`, `phase2`, etc. Use business names:

`server.js`
`schema.sql`
`delivery-logistics.js`
`warranty-repairs.js`
`returns-refunds.js`
`document-management.js`
`pricing-and-promotions.js`
`web-and-hosting.js`
`orders-ecommerce.js`
`suppliers-procurement.js`
`customers-crm.js`
`sales-pos.js`

Future modules should use names such as `credit-installments.js`, `finance-accounting.js`, `business-intelligence.js`, `ai-operations.js`, and `public-web-integration.js`.

## Current completed capabilities

### Delivery & Logistics
- Delivery zones.
- Delivery partners can be added, edited and suspended.
- Partners can be individual couriers or companies.
- Shipments can be assigned to partners.
- Shipments track unit count, unit cost and total delivery cost.
- Partner reports show deliveries, units, destinations, dates and costs.
- Delivery status history and delivery attempts are audited.

### Warranty & Repairs
- Warranty policies and claims.
- Repair tickets/jobs.
- Repair partners can be added, edited and suspended.
- Repair jobs store item description, location, expected return date, external reference and partner cost.
- Partner reports show total jobs, active jobs, completed jobs and cost.
- Serialized devices enter service during repair and return to sold state when resolved.

### Documents
- Upload from the platform.
- Download from the platform.
- Database-backed storage rather than Render disk.
- PDF/JPG/PNG/WEBP/TXT/CSV/DOCX/XLSX.
- 15 MB limit.
- SHA-256 duplicate detection.
- Authenticated, permission-controlled access.

### Security
- 10-minute inactivity timeout.
- Secure HttpOnly session cookie.
- Secure HttpOnly trusted-device cookie.
- Device-bound sessions.
- MFA challenge on unfamiliar devices for MFA-enabled accounts.
- Security policy can enforce MFA for every login after enrollment.
- Password change revokes other sessions.
- Trusted-device revocation revokes associated sessions.
- Login/MFA rate limiting.
- CSRF protection.
- Audit and security events.

## Important security principle

Do not claim that session hijacking or developer tools can be made mathematically impossible. Instead, implement strong server-side controls: secure HttpOnly cookies, device-bound sessions, CSRF protection, MFA, short idle timeouts, session revocation, rate limiting, CSP, output escaping, least-privilege RBAC and no sensitive data in public routes.

Do not attempt to rely on blocking browser developer tools as a security boundary.

## Deployment/testing strategy

Keep the combined Express/PostgreSQL admin service on Render while it is being tested. Vercel should only be introduced later for a separate public frontend or a deliberately adapted serverless layer. Do not migrate architecture merely to obtain a prettier testing URL.

The Render root URL is the primary acceptance surface. Every module must be reachable from the mobile dashboard and every visible button must perform a real action or open a real form.

## Rules for your next build

1. First inspect the supplied current zip before changing anything.
2. Do not delete working modules.
3. Preserve the PostgreSQL schema and add safe `IF NOT EXISTS` migrations.
4. Do not add mock business records.
5. Do not expose internal costs, supplier data, staff, security data or permissions to public website routes.
6. Audit every SQL alias carefully.
7. Run `node --check` against every JavaScript source file before packaging.
8. Review all frontend `data-action` buttons and ensure each is handled.
9. Keep the UI client-facing and professional; do not expose developer instructions in the normal interface.
10. Keep all source filenames business-oriented, never phase-numbered.
11. Do not return a zip until the build has been statically audited and all known gaps are addressed.
12. Include an updated `AUDIT_REPORT.md`, `MODULE_MAP.md`, `README.md` and this continuation prompt in every major delivery.

## Next major module order

### Credit & Installments
Build:
- Customer credit profiles.
- Credit limits and available credit.
- Credit applications.
- Approval workflow.
- Down payments.
- Installment schedules.
- Payment allocation.
- Due dates and arrears.
- Penalties/fees with governance.
- Collection tasks.
- Restructuring.
- Credit reporting.
- Audit trail.

### Finance & Accounting
Build:
- Chart of accounts.
- Journals.
- Cash and bank accounts.
- Receivables.
- Payables.
- Tax configuration suitable for Uganda while keeping the architecture extensible.
- Reconciliation.
- Period close controls.
- Financial reporting.
- Approval controls.

### Business Intelligence
Build:
- Sales dashboard.
- Gross margin.
- Product performance.
- Inventory ageing.
- Stock turnover.
- Delivery cost by partner and destination.
- Warranty/repair turnaround.
- Return/refund rates.
- Staff/operations KPIs.
- Exportable management reports.

### AI Operations
Build only after deterministic business data is reliable:
- Demand forecasting.
- Low-stock recommendations.
- Margin/anomaly detection.
- Delivery performance insights.
- Warranty triage assistance.
- Management summaries.
- Human approval before AI-driven operational changes.

### Public Web Integration
Build the publication boundary carefully:
- Admin catalog -> public catalog.
- Approved prices -> public prices.
- Approved promotions -> public promotions.
- Website stock visibility.
- Public order intake -> admin orders.
- Order status synchronization.
- Media/document publication.
- Staging/preview.
- Approval before production publication.

## Final instruction

Treat the supplied current zip as the source of truth. Do not rebuild from memory. Audit first, plan second, implement third, test statically fourth, and package only after the entire requested module is connected to the existing system.
