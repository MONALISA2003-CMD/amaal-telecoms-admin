# Phase 17 Deep Audit Report

## Scope

Role/permission regression, authentication/session safety, public/private API boundaries, and live Neon reconciliation readiness. MFA intentionally unchanged.

## Corrected in this phase

- Administrator recovery no longer deletes MFA credentials, password history, user-role links, branch links, or notifications.
- Recovery revokes sessions and trusted devices and suspends active accounts.
- Recovery attempts are rate-limited.
- Session idle timeout errors use the configured timeout.
- Live TV reconciliation is represented by a SELECT-only audit script.

## Static authorization audit

The backend has centralized authentication and permission middleware. Business API routes are expected to use `auth` plus a granular `need(permission)` guard. Bootstrap/recovery/public endpoints are explicitly excluded from the protected-route check.

## Production status

No production data was changed by Phase 17. No live TV duplicate was deleted or merged. No database reset occurred.
