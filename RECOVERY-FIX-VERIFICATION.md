# Amaal Telecoms — Administrator Recovery Verification

## Recovery architecture

Administrator recovery is now **non-destructive** to administrator history and business data.

The recovery endpoint:

1. Requires `ADMIN_RECOVERY_TOKEN` from the deployment environment.
2. Requires the exact `AMAAL-RESET` confirmation phrase.
3. Revokes sessions, trusted devices and MFA credentials.
4. Clears administrator security/login/audit notifications/history according to the existing recovery policy.
5. Removes user role/branch links so old authentication state cannot survive the reset.
6. Suspends existing active user accounts instead of deleting `users` rows.
7. Sets the explicit `administratorSetupRequired=true` state.
8. Stores a hash of the recovery token to prevent accidental repeated destructive resets.
9. Leaves products, inventory, sales, orders, customers, finance, documents and other business records untouched.

## First administrator setup

`/api/setup/status` now determines readiness from an explicit setup flag plus the existence of an active **Super Admin**. It no longer treats the mere existence of historical/suspended users as proof that setup is complete.

When setup is enabled:

- a new email creates a new administrator;
- the same email as a suspended historical administrator reclaims that existing row;
- the reclaimed account receives a fresh password and Super Admin role;
- MFA credentials are cleared and can be configured again;
- a fresh trusted device and session are issued;
- the setup flag is atomically turned off only after the account is successfully created.

## Static verification performed

- All JavaScript files pass `node --check`.
- `server.js` passes syntax validation.
- Recovery route contains no `DELETE FROM users` operation.
- `schema.sql` retains the existing `users.email` uniqueness constraint and supports safe account reclamation.
- `package.json` uses Node 20.x and starts with `node server.js`.
- No deployment YAML file is required or included in the project package.

## Render deployment sequence

1. Keep the existing Render PostgreSQL database.
2. Keep the existing `DATABASE_URL`.
3. Keep `ADMIN_RECOVERY_TOKEN` in Render Environment.
4. Replace the application files with this package.
5. Deploy the latest commit.
6. Confirm `/api/health` returns `{\"ok\":true}`.
7. Open `/recovery`.
8. Enter the Render `ADMIN_RECOVERY_TOKEN` and `AMAAL-RESET`.
9. Confirm the recovery response says first-time administrator setup is ready.
10. Return to `/` and create the administrator account.

## Important

Do not create a new database merely to solve administrator access. This build is specifically designed to recover access while preserving the existing business database.
