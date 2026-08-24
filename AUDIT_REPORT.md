# Amaal Telecoms — Final Static Audit Before Next Module

## Scope audited

This build was audited cumulatively across the existing administration, commerce, catalog, inventory, web, pricing, delivery, warranty, returns and document capabilities.

### Delivery & Logistics
- Delivery zones.
- Delivery partners with Active/Suspended status.
- Partner contact and service-area details.
- Shipment assignment to a delivery partner.
- Unit count, unit delivery cost and total delivery cost.
- Automatic fallback to order quantity when shipment unit count is omitted.
- Partner default unit cost fallback.
- Delivery status history and attempts.
- Destination, date/time and shipment activity.
- Partner activity and aggregate performance reporting.
- Delivery completion continues to synchronize the order lifecycle and inventory reservation consumption.

### Warranty & Repairs
- Warranty policies.
- Warranty claims tied to customer/order/sale/variant/serialized unit.
- Repair jobs and ticket numbers.
- Repair partners with Active/Suspended status.
- Partner type, contacts and service area.
- Full repair item description.
- Repair location.
- Expected return date/time.
- External repair reference.
- Partner cost, labour and parts cost.
- Repair status progression.
- Partner activity and aggregate reporting.
- Serialized devices move into service and return to sold state when resolved.

### Document Management
- Durable PostgreSQL `bytea` storage.
- 15 MB maximum.
- Allowed document types are enforced server-side.
- SHA-256 duplicate detection per record.
- Authenticated permission-controlled download.
- Metadata editing.
- Deletion with audit event.
- No reliance on Render's ephemeral filesystem.

### Security hardening
- Secure HttpOnly browser session cookie.
- Separate CSRF token cookie and state-changing request validation.
- Secure HttpOnly trusted-device cookie.
- Device-bound sessions.
- Device mismatch revokes the presented session.
- Ten-minute inactivity timeout migration from the previous 30-minute default.
- MFA challenge on unfamiliar devices for MFA-enabled accounts.
- First login establishes the initial trusted device so new staff are not deadlocked during onboarding; invitation acceptance also records the accepting device context.
- MFA policy can be enforced after enrollment.
- Password changes revoke other active sessions.
- Trusted-device revocation revokes associated sessions.
- Login/MFA rate limiting and account lockout controls.
- Security, login and audit events.
- `X-Robots-Tag`, no-store controls, frame denial, CSP, referrer and permissions policies, same-origin isolation headers and HSTS when served over HTTPS.
- Authentication tokens are no longer returned in normal browser login JSON responses; the browser uses the secure cookie.

### Inventory consistency audit
The movement ledger constraint was rechecked and expanded to include the movement types already used by the order fulfillment and sale-void workflows (`ORDER_FULFILLMENT` and `SALE_VOID`). This closes a previously latent transaction failure path.

### Code-quality checks
- Every JavaScript file passes `node --check`.
- Frontend JavaScript passes `node --check`.
- No `node_modules` is packaged.
- No YAML workflow file is packaged.
- No source file is named with a phase number.
- No mock/demo business records are seeded.
- Client UI contains business-facing wording rather than developer instructions.
- Frontend action handlers were reviewed; dynamic table actions are bound locally where appropriate.

## Live-environment boundary

A live authenticated PostgreSQL transaction against the user's Render database cannot be honestly performed from this build environment. Therefore, the package is **statically audited and deployment-ready**, but the first Render deployment remains a controlled acceptance test.

## Render acceptance checklist

1. Deploy the zip contents to the canonical GitHub repository.
2. Confirm Render startup reaches `Amaal Admin listening on <PORT>` with no database error.
3. Open the root URL and sign in.
4. Confirm `/api/health` returns `{"ok":true}`.
5. Open Dashboard and each business module from the mobile UI.
6. Create one delivery partner, suspend it, reactivate it and inspect its activity.
7. Create a shipment using a delivery partner, enter unit count/unit cost, progress it and confirm partner totals update.
8. Create one repair partner, suspend/reactivate it and inspect activity.
9. Create a warranty claim and repair ticket; assign a repair partner, item description, location and expected return date.
10. Update the repair ticket through its statuses and confirm the warranty claim changes correctly.
11. Upload a PDF document, download it, edit metadata and delete it.
12. Open Security, enroll MFA, sign out, sign in from the same device, then test a second device and confirm MFA is required.
13. Leave the browser inactive for more than 10 minutes and confirm the session is rejected and the user must sign in again.
14. Revoke a trusted device and confirm its active sessions are revoked.
15. Review Audit and Security Events after each test.
16. Only after this acceptance should the public website integration be enabled for production data.

## Next modules

The next major business modules should be named and built as:

1. **Credit & Installments** — customer credit limits, installment schedules, approvals, collections, arrears, penalties and payment allocation.
2. **Finance & Accounting** — chart of accounts, journals, cash/bank, receivables, payables, tax, reconciliation and period controls.
3. **Business Intelligence** — management dashboards, sales/profit/inventory/service KPIs, delivery cost analytics and exportable reports.
4. **AI Operations** — controlled forecasting, anomaly detection, product recommendations, service triage and management insights.
5. **Public Web Integration** — secure synchronization of approved catalog, pricing, promotions, stock visibility, orders and customer-facing content.

Do not rename these modules to phase numbers in future builds.
