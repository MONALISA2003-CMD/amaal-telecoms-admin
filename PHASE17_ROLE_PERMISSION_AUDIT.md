# Phase 17 — Role, Permission & Authentication Regression

## Scope

Role enforcement, authentication/session behavior, recovery safety, and database reconciliation preparation. MFA is intentionally excluded from changes in this phase.

## Findings / fixes

- Backend authorization uses a centralized `auth` middleware and `need(permission)` guard.
- Super Admin bypass is centralized rather than relying only on frontend visibility.
- API route scan found no business `/api/*` route bypassing authentication, excluding intentionally public/bootstrap endpoints.
- Administrator recovery was hardened to revoke sessions/trusted devices and suspend active accounts without deleting MFA credentials, password history, role links, branch links, notifications, audit history, or business records.
- Recovery attempts are rate-limited.
- Session idle-expiry errors now report the configured idle timeout instead of a hard-coded value.
- Frontend permission checks remain presentation-level; backend permission checks remain authoritative.

## Permission model

The backend defines granular permissions for administration, catalogue, inventory, procurement, customers/CRM, sales/orders, website, pricing/promotions, delivery, warranty/returns, credit, finance, BI/AI, integrations, operations, monitoring and backups.

## Regression matrix

| Area | Backend enforcement | Frontend visibility | MFA changed |
|---|---|---|---|
| Dashboard | PASS | PASS | No |
| Catalogue | PASS | PASS | No |
| Inventory | PASS | PASS | No |
| Procurement | PASS | PASS | No |
| Customers/CRM | PASS | PASS | No |
| Sales/Orders | PASS | PASS | No |
| Website | PASS | PASS | No |
| Delivery | PASS | PASS | No |
| Warranty/Returns | PASS | PASS | No |
| Credit | PASS | PASS | No |
| Finance | PASS | PASS | No |
| Integrations | PASS | PASS | No |
| Operations/Monitoring | PASS | PASS | No |
| Backup/Recovery | PASS | PASS | No |

## Remaining live verification

The actual role assignments and permission rows in production must be checked against the live Neon database before any role cleanup. This document does not claim that production data has been reconciled.
