# Amaal Telecoms — Administrator Recovery

## Why this exists
Use this only when the administrator is locked out and normal sign-in/MFA recovery is unavailable.

## Render steps
1. In Render → Amaal Telecoms Admin → Environment, add `ADMIN_RECOVERY_TOKEN` with a long random value (at least 32 characters). Do not put it in GitHub.
2. Deploy/redeploy the service.
3. On the phone open `/recovery` on the same Render domain.
4. Enter the recovery token and type `AMAAL-RESET` exactly.
5. The recovery operation removes administrator accounts, sessions, trusted devices, MFA credentials, login/security history and audit logs. It does **not** delete products, inventory, customers, orders, finance or other business records.
6. After the reset succeeds, open `/` and create the first administrator again.
7. Immediately enable MFA on the new administrator and remove/rotate `ADMIN_RECOVERY_TOKEN` in Render. The same recovery token cannot be reused.

## Safety
The recovery endpoint is disabled when `ADMIN_RECOVERY_TOKEN` is absent. It also refuses to delete users when existing business records contain mandatory user references, so it cannot silently orphan required operational records.
