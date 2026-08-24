# Administrator Recovery

The recovery page is intentionally **visible but disabled** until `ADMIN_RECOVERY_TOKEN` is configured in the deployment environment. This prevents the confusing `404 Not Found` page while keeping the destructive operation protected.

## Render procedure

1. Open Render → Amaal Telecoms Admin → Environment.
2. Add `ADMIN_RECOVERY_TOKEN` with a long random secret. Do not commit it to GitHub.
3. Deploy the service.
4. Open `/recovery` on the Render URL.
5. Confirm the page says recovery is enabled.
6. Enter the exact Render secret and `AMAAL-RESET`.
7. The transaction clears administrator accounts, sessions, trusted devices, MFA credentials, notifications, role links and audit/security/login history.
8. Business records are preserved.
9. If business records contain mandatory user references, the transaction refuses to run rather than destroying history.
10. After success, return to `/` and create the first administrator.
11. Remove or rotate `ADMIN_RECOVERY_TOKEN` immediately.

The recovery endpoint uses the secret token plus the confirmation phrase as its authorization and is exempted from the normal browser CSRF check because the recovery secret itself is the explicit authorization factor. It also clears stale authentication cookies after a successful reset.

## Recovery page loading fix

The recovery page must load its JavaScript from `/recovery.js`. Do not place an inline `<script>` on this page because the platform Content-Security-Policy intentionally allows `script-src 'self'` and blocks inline scripts. If the page remains on “Checking recovery availability…”, deploy this version and reload `/recovery` after Render finishes.
