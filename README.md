# Amaal Telecoms Administration Platform

Mobile-first administration platform for **Amaal Telecoms, Uganda**.

## Business modules

Core Administration & Security · Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Web & Hosting · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence.

The codebase uses business/module filenames rather than numbered phase filenames so future maintenance can target the actual feature area.

## Reporting & Business Intelligence

The BI layer is connected to operational data and provides:
- Executive KPIs
- Date-range sales trend
- Product/variant margin analysis
- Inventory ageing
- Delivery partner performance and unit cost
- Warranty/repair partner performance
- Customer performance
- Category performance
- Procurement/supplier performance
- Returns and refund analysis
- Credit ageing
- Finance/account performance
- Saved management snapshots
- CSV exports

## Security

Secure HttpOnly sessions, trusted-device binding, CSRF protection, MFA/TOTP, ten-minute inactivity timeout, session revocation, rate limiting, audit/security events and least-privilege permissions are implemented server-side.

Browser developer tools cannot be made impossible by a web application. The platform therefore treats the browser as untrusted and enforces authorization and validation on the server.

## Administrator recovery

Open `/recovery`. The page is always reachable, but destructive recovery is enabled only when `ADMIN_RECOVERY_TOKEN` exists in the deployment environment. The recovery process preserves business records, revokes security access, deletes administrator users when PostgreSQL permits it, and otherwise safely suspends business-linked historical users. First-time setup is explicitly reopened by the recovery state flag. Remove/rotate the token immediately after recovery.

## Deployment

Node.js 20.x + Express 5 + PostgreSQL/Neon-compatible database.

Keep the combined admin service on Render during acceptance. Introduce Vercel later for a separate public frontend or deliberately adapted serverless component.

## Documents

Documents are stored in PostgreSQL-backed binary storage rather than the ephemeral Render filesystem. Supported uploads include PDF, JPG/JPEG, PNG, WEBP, TXT, CSV, DOCX and XLSX, with a 15 MB per-file upload limit.

## Testing

Use the Render root URL as the primary client testing surface. From the mobile dashboard, open every module and exercise create/update/view workflows. Use real test records to verify cross-module reporting.

No mock business records are generated automatically.
