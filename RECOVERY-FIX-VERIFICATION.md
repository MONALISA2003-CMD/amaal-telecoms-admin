# Administrator Recovery — Deep Fix Verification

## Root cause found

The recovery page itself was fixed previously, but the recovery workflow still had a second failure mode: the reset operation could complete or partially conflict with existing administrator foreign-key references while the first-time setup gate continued to decide access using only `COUNT(users)`. That could leave the browser showing the normal sign-in screen instead of the first-time setup screen.

## Corrected behavior

1. `/recovery` renders the recovery form server-side when `ADMIN_RECOVERY_TOKEN` exists. It does not wait for a client-side availability request.
2. A new database setting, `administratorSetupRequired`, explicitly controls whether first-time administrator setup is open.
3. `init()` automatically opens first-time setup when the database contains zero users.
4. `/api/setup/status` is now cache-free and reports `configured`, `setupRequired`, and the current user count.
5. `/api/setup` permits setup whenever `administratorSetupRequired=true`, including a recovery where old business-linked users must remain as suspended historical references.
6. Successful first-time setup immediately changes `administratorSetupRequired` to `false`.
7. Recovery clears authentication/security records and attempts to remove administrator users.
8. If PostgreSQL prevents user deletion because a business record requires a user reference, recovery safely rolls back only the user-delete operation and suspends those old accounts instead. Business records are never deleted to make recovery easier.
9. Recovery records that the administrator setup gate is open.
10. If the same recovery token was already used and the system is already in the recovery/setup state, the endpoint is idempotent and returns success instead of trapping the owner in a dead-end.
11. Authentication cookies are cleared after recovery.
12. `app.js` is explicitly sent with `Cache-Control: no-store` so an old cached frontend cannot keep showing the previous login state.

## Static checks completed

- `node --check server.js` — passed.
- `node --check recovery.js` — passed.
- `node --check public/app.js` — passed.
- Recovery route is before the public catch-all.
- Recovery POST remains protected by the private environment token and `AMAAL-RESET` confirmation.
- Recovery token is not stored in GitHub/source files.
- Business tables are not deleted by the recovery operation.

## Render acceptance test

After deploying this ZIP:

1. Keep `ADMIN_RECOVERY_TOKEN` in Render Environment.
2. Redeploy the service.
3. Open `/recovery`.
4. Enter the exact Render token and `AMAAL-RESET`.
5. Expect a green success message saying first-time setup is ready.
6. Open the root admin URL.
7. Expect **Set up the first administrator account**, not **Secure administrator sign in**.
8. Create the administrator.
9. Expect the dashboard to open automatically.
10. Sign out and confirm the normal login screen appears.
11. Remove/rotate `ADMIN_RECOVERY_TOKEN` after recovery.

If step 5 reports success but step 7 still shows login, open `/api/setup/status` in the same browser. The expected response is `configured:false` and `setupRequired:true`. That endpoint is intentionally cache-free.

## Important

This build has been audited statically. A live PostgreSQL transaction cannot honestly be claimed as tested from this environment because the production database credentials are not available here. The Render acceptance sequence above is therefore the final live verification step.
