# Administrator Recovery — Final Fix Verification

## Problem observed
The recovery page could remain on **“Checking recovery availability…”** even when `ADMIN_RECOVERY_TOKEN` had been added in Render. The page depended on a client-side fetch to `/api/recovery/status` before revealing the reset form.

## Fix applied
- `/recovery` now determines recovery availability on the server and renders the correct state immediately.
- The reset form is rendered immediately when `ADMIN_RECOVERY_TOKEN` is present.
- The page no longer depends on `/api/recovery/status` to unlock the form.
- `/api/recovery/status` remains available as a non-secret diagnostic endpoint and returns only `enabled` plus server time.
- `recovery.js` now only handles form submission and cannot leave the page permanently stuck waiting for an availability request.
- `express.urlencoded` is enabled for future controlled form fallbacks; the normal reset request remains JSON.
- Recovery remains protected by the secret token plus the exact `AMAAL-RESET` confirmation.
- The token is never displayed, logged, or committed.

## Verification performed in build environment
- `node --check server.js` — passed.
- `node --check recovery.js` — passed.
- Recovery route is registered before the public catch-all.
- Recovery reset remains exempt from normal authenticated CSRF requirements because the recovery token is the explicit authorization factor.
- Business-record safety blockers remain in place.
- Successful recovery clears administrator/security access records and authentication cookies while preserving business records.

## Render test after deployment
1. Deploy this ZIP to the existing Render service.
2. Confirm the Render Environment contains `ADMIN_RECOVERY_TOKEN` and that the service has redeployed after the variable was saved.
3. Open `/recovery`.
4. The page should immediately show either:
   - **Recovery is enabled** + token/confirmation fields, or
   - **Recovery is currently disabled**.
5. If enabled, enter the exact Render secret and `AMAAL-RESET`.
6. After success, open `/` and complete first-time administrator setup.
7. Immediately remove/rotate `ADMIN_RECOVERY_TOKEN` after recovery.

Do not put the recovery token in GitHub.
