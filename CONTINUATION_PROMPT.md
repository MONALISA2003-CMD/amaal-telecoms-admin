# Continuation Prompt for the Next LLM

You are continuing the Amaal Telecoms Administration Platform for Amaal Telecoms, Uganda.

The current ZIP is the authoritative working source. Do not replace working modules with mock screens, do not rename files to Phase 17/18/etc., and do not remove existing functionality.

## Completed business modules
Core Administration & Security; Catalog; Inventory; Suppliers & Procurement; Customers & CRM; Sales & POS; Orders & E-commerce; Web & Hosting; Pricing & Promotions; Delivery & Logistics; Warranty & Repairs; Returns & Refunds; Document Management; Credit & Installments; Finance & Accounting; Reporting & Business Intelligence.

## Current state
- Node.js 20.x, Express 5 and PostgreSQL/Neon-compatible database.
- Render is the primary acceptance environment.
- The admin is mobile-first and intended to be testable entirely from a phone.
- No mock business records should be created automatically.
- Business/module filenames must be preserved.
- Document files are stored in PostgreSQL-backed binary storage so they survive Render redeploys.
- Authentication uses secure HttpOnly sessions, trusted-device binding, MFA/TOTP, CSRF validation, rate limiting and a ten-minute inactivity timeout.
- Browser developer tools are not treated as a security boundary; authorization must remain server-side.

## Recovery
`/recovery` is always reachable as a controlled page, but destructive recovery is enabled only when `ADMIN_RECOVERY_TOKEN` exists in the deployment environment. Recovery requires the secret plus `AMAAL-RESET`, preserves business records and refuses unsafe user deletion. Remove/rotate the token after recovery.

## Reporting & BI currently includes
- Executive KPI dashboard with selectable date range.
- Sales trend.
- Product/variant performance and margin.
- Inventory ageing.
- Delivery partner performance and cost per unit.
- Warranty/repair partner performance.
- Customer performance.
- Category performance.
- Procurement/supplier performance.
- Returns/refund analysis.
- Credit ageing.
- Finance/account performance.
- Saved report snapshots.
- CSV exports for sales/products/delivery.

## Your job when continuing
1. Read the complete ZIP before coding.
2. Preserve every working API, database table, permission, security control and frontend action.
3. Audit the existing module for missing workflows before adding a new module.
4. Use business/module filenames, not numbered phase filenames.
5. Ensure every visible button has a working action and every action has a server endpoint where required.
6. Keep all mutations server-authorized and audited.
7. Keep the application mobile-first and client-presentable; do not expose developer/debug UI.
8. Do not claim live database verification unless you actually have a production/test database connection.
9. Before delivering a ZIP, run syntax checks on every JavaScript file and inspect route/action consistency.
10. Provide a concise audit report and a mobile acceptance checklist in the ZIP.

The next module should only begin after confirming that modules 1–16 still interconnect correctly.
