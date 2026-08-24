# Amaal Telecoms Admin — Recovery and Cross-Module Audit

## Release scope

This release is a **recovery/setup reliability correction** across the existing feature modules. It does not intentionally remove business functionality.

## Critical correction

The administrator recovery process and first-time setup process are now decoupled from physical deletion of the `users` table rows. This is required because some historical business records intentionally use `ON DELETE RESTRICT` for accountability.

### Before

- Recovery could suspend users when deletion was blocked.
- Setup could still fail when the owner attempted to reuse the same email because `users.email` is unique.
- The UI therefore appeared to remain locked after a successful recovery.

### After

- Recovery explicitly enables first-time setup.
- Setup accepts the explicit setup flag even when suspended historical rows remain.
- A suspended account with the requested email can be reclaimed safely.
- Reclaimed accounts receive a new password, are reactivated, have MFA reset, receive the Super Admin role and receive a new trusted-device/session context.
- Business records are not deleted.

## Security checks

- Recovery token is read only from deployment environment.
- Recovery uses constant-time token comparison.
- Recovery confirmation requires `AMAAL-RESET`.
- Recovery clears authentication sessions and trusted devices.
- MFA credentials are cleared during recovery/reclaim.
- Normal authenticated state remains protected by HttpOnly/Secure/SameSite session cookies and CSRF tokens.
- Session/device mismatch invalidates the session.
- Idle timeout invalidates inactive sessions.
- Browser developer tools are treated as untrusted; authorization is enforced server-side.

## Cross-module static audit

The following server modules remain registered in `server.js`:

- Catalog / Products
- Inventory
- Suppliers & Procurement
- Customers & CRM
- Sales & POS
- Orders & E-commerce
- Web & Hosting
- Pricing & Promotions
- Delivery & Logistics
- Warranty & Repairs
- Returns & Refunds
- Document Management
- Credit & Installments
- Finance & Accounting
- Business Intelligence

All project JavaScript files passed Node syntax checking during this release audit.

## Deployment validation

A real PostgreSQL/Render integration test cannot be honestly claimed from the source archive alone because it requires the live Render environment and its production database. The source-level release is therefore marked **static-audited**, not falsely labeled as a live-production test.
