# Administrator Recovery — Verification

## Problem fixed

Recovery could successfully clear authentication state while the first-time setup flow still failed when the original administrator row could not be physically deleted because historical business records referenced that user with `ON DELETE RESTRICT`.

The repaired flow now treats administrator setup as a **logical authentication state**, not as a requirement that the `users` table contain zero rows.

## Recovery behavior

1. `ADMIN_RECOVERY_TOKEN` enables `/recovery`.
2. Recovery clears sessions, trusted devices, MFA credentials, role links, notifications and security/login/audit history.
3. If PostgreSQL allows user deletion, administrator rows are deleted.
4. If business history prevents deletion, the user rows are safely suspended instead of destroying business records.
5. `administratorSetupRequired=true` is written in the same transaction.
6. The recovery token hash is stored so the same token cannot silently perform a second reset.

## First-time setup behavior after recovery

- `/api/setup/status` returns `setupRequired=true` whenever the explicit setup flag is true, even if suspended historical user rows remain.
- `/api/setup` is allowed while that flag is true.
- If the owner wants to reuse the exact email address that existed before recovery, setup now **reclaims the suspended row** instead of failing on the unique email constraint.
- Reclaiming clears the password, sessions/devices/MFA state and role links for that account and assigns the Super Admin role again.
- A new email can also be used normally; a suspended historical account does not block first-time setup.
- After successful setup, `administratorSetupRequired=false` is written and the new session is issued immediately.

## Important operational step

After successfully creating the new administrator, remove or rotate `ADMIN_RECOVERY_TOKEN` in Render. Never commit the recovery secret to GitHub.

## Static verification performed

- `node --check` passed for `server.js` and every JavaScript module in the project.
- Recovery frontend remains same-origin and compatible with the CSP (`/recovery.js`, no inline script).
- Recovery endpoint remains CSRF-exempt because possession of the high-entropy recovery secret is the explicit recovery authorization factor.
- The public application continues to use server-side authorization and validation; browser developer tools cannot be disabled by a web application.
