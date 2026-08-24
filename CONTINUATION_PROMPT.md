# Continuation Prompt — Amaal Telecoms Administration

Continue an existing **Amaal Telecoms, Uganda** administration platform. The current ZIP is the source of truth. Do not rebuild from memory.

## Business
Amaal Telecoms sells phones (Infinix, Samsung, Tecno, iPhone, itel), TVs (TCL, Hisense, Samsung, LG, Global Star, CHiQ, SPJ and others), appliances, kitchen/home appliances, speakers, electronics and phone accessories.

The admin console will eventually control approved content on the public websites.

## Architecture
- Node.js 20.x
- Express 5
- PostgreSQL / Neon-compatible `DATABASE_URL`
- Secure cookie sessions
- CSRF protection
- RBAC
- MFA/TOTP
- Trusted-device binding
- 10-minute inactivity timeout
- Audit/security logging
- Database-backed documents
- Mobile-first professional UI

## Completed modules
Core Administration & Security; Catalog; Inventory; Suppliers & Procurement; Customers & CRM; Sales & POS; Orders & E-commerce; Web & Hosting; Pricing & Promotions; Delivery & Logistics; Warranty & Repairs; Returns & Refunds; Document Management; Credit & Installments; Finance & Accounting; Business Intelligence.

## Important rules
- Never use numbered phase filenames. Use names such as `finance-accounting.js`.
- Preserve working modules.
- Use safe `CREATE TABLE IF NOT EXISTS` / `ALTER TABLE ... IF NOT EXISTS` migrations.
- No mock business records.
- All admin mutations require RBAC and audit logging.
- Public routes must expose only explicitly published public data.
- Do not expose supplier costs, credit records, finance records, staff, permissions, security events or audit logs publicly.
- Never claim browser security can make session hijacking or developer tools mathematically impossible. Use server-side security controls instead.
- Run `node --check` on every JavaScript file before packaging.
- Audit all frontend `data-action` buttons and route mappings.
- Update `MODULE_MAP.md`, `README.md`, `AUDIT_REPORT.md`, `ACCEPTANCE_CHECKLIST.md` and this prompt for every major delivery.

## Current 13–15 build details

### Credit & Installments — `credit-installments.js`
Includes customer credit profiles, credit applications, approval/rejection, account opening, installment schedules, payments, allocation to installments, collections tasks and restructuring.

### Finance & Accounting — `finance-accounting.js`
Includes chart of accounts, journals, cash/bank accounts, tax rates, accounting periods and operational synchronization. Finance synchronization is idempotent by source reference and currently connects sales, sale payments, order payments, supplier invoices, supplier payments, refunds and credit payments.

### Business Intelligence — `business-intelligence.js`
Includes management summary, sales trend, product performance, inventory ageing, delivery performance, warranty/repair performance and CSV export.

## Next build direction
Do not jump directly into AI. First finish:

1. **AI Operations** — demand forecasting, low-stock recommendations, margin/anomaly detection, delivery insights, repair triage and management summaries. AI must be advisory first; no automatic operational mutation without explicit human approval.
2. **Marketing Automation** — customer segments, consent-aware campaigns, campaign templates, coupon/promotion linkage, campaign results and attribution.
3. **Public Web Integration** — controlled publication boundary between admin and public websites; published catalog/prices/promotions/stock, public order intake, status synchronization, media publication, staging/preview and approval workflow.
4. **Advanced Platform Integrations** — payment gateways, messaging, accounting exports, webhooks and other external integrations after the above are stable.

## Testing rule
The Render admin URL remains the primary integrated test surface while the combined Express/PostgreSQL backend is being accepted. Do not migrate the admin to Vercel just to get a prettier URL. Vercel can later host a separate public frontend if needed.

## Handoff instruction
Before the next build, inspect the current ZIP, audit all existing routes/schema/frontend handlers, plan the requested module, implement it without deleting working functionality, run static checks, and package only after the complete requested module is connected to the existing system.
