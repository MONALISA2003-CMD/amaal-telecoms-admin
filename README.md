# Amaal Telecoms Administration Platform

Mobile-first administration platform for **Amaal Telecoms, Uganda**.

## Modules

Core Administration & Security · Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Web & Hosting · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Business Intelligence.

## Credit & Installments

Customer credit profiles, limits, applications, approvals, accounts, installment schedules, payment allocation, collections and restructuring are connected to the customer record.

## Finance & Accounting

Chart of accounts, double-entry journals, cash/bank accounts, tax configuration, accounting periods and an idempotent synchronization layer for operational transactions.

## Business Intelligence

Management reporting combines sales, product margin, inventory, orders, returns, delivery, warranty/repair and credit data.

## Security

Secure HttpOnly sessions, trusted-device binding, CSRF protection, MFA/TOTP, 10-minute inactivity timeout, session revocation, rate limiting, audit/security events and least-privilege permissions are implemented. Security is server-side; browser developer tools are not treated as a security boundary.

## Deployment

Node.js 20.x + Express 5 + PostgreSQL/Neon-compatible database.

Keep the combined admin service on Render during acceptance. Vercel is better introduced later for a separate public frontend or an intentionally adapted serverless component.

## Testing

Use the Render root URL as the main client test surface. From the mobile dashboard, open every module and exercise create/update/view actions. Finance synchronization should be tested after creating real sales, payments, supplier invoices/payments, refunds and credit payments. BI should then reflect those records.

No mock business records are created automatically.


## Administrator recovery
If the administrator is locked out and normal MFA/device recovery is unavailable, temporarily set `ADMIN_RECOVERY_TOKEN` in the deployment environment and open `/recovery`. The recovery flow is deliberately disabled when the variable is absent, requires an explicit confirmation string, preserves business records, and refuses to delete users if mandatory business records still depend on them. Rotate/remove the token immediately after successful recovery.
