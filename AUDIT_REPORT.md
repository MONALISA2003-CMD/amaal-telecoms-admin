# Amaal Telecoms — Access Recovery + 7–15 Integrity Audit

## Immediate defect fixed
The Render startup failure `42P01 missing FROM-clause entry for table "p"` was traced to the effective-pricing SQL function in `schema.sql` / `pricing-and-promotions.sql`. The promotion CTE has been rewritten with an explicit `pr` source alias and the final projection now joins the CTE without ambiguous alias reuse.

## Administrator recovery
A controlled `/recovery` page and `POST /api/recovery/reset` endpoint were added.

- Disabled unless `ADMIN_RECOVERY_TOKEN` exists in the deployment environment.
- Requires the secret recovery token and exact `AMAAL-RESET` confirmation.
- Deletes administrator accounts, sessions, trusted devices, MFA credentials, login/security history, notifications, role links and audit logs.
- Preserves business records.
- Refuses the operation when mandatory business records still depend on users (`sales.cashier_id`, `sale_payments.received_by`, or `purchase_requisitions.requester_id`).
- Recovery token hashes are stored so the same token cannot be reused.
- The token must be rotated/removed immediately after recovery.

## Security review
- Secure + HttpOnly session cookie.
- SameSite=Lax.
- Trusted-device binding.
- Server-side 10-minute inactivity expiry.
- MFA for unfamiliar devices when MFA is enabled.
- CSRF protection for authenticated browser mutations.
- Security/audit event logging.
- Production headers and CSP.
- No developer/debug UI is intentionally exposed.
- Browser developer tools cannot be disabled as a security boundary; authorization remains server-side.

## Module integrity
The source tree uses module names, not numbered phase filenames:
Core Administration & Security, Catalog, Inventory, Suppliers & Procurement, Customers & CRM, Sales & POS, Orders & E-commerce, Web & Hosting, Pricing & Promotions, Delivery & Logistics, Warranty & Repairs, Returns & Refunds, Document Management, Credit & Installments, Finance & Accounting, Business Intelligence.

## Static verification
- `node --check` passed for every JavaScript source file and `public/app.js`.
- No YAML workflow files are included.
- Public catch-all serves `public/index.html` after API routes.
- Document upload/download routes remain present.
- Finance, BI, credit, delivery and warranty modules remain registered.

## Live acceptance still required
This environment does not have the production PostgreSQL credentials, so a live database transaction cannot be executed here. After deployment, verify `/api/health`, `/recovery`, first-time setup, login, MFA, 10-minute timeout, document upload/download, and the module workflows from the Render URL.
