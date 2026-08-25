# Final audit — Render bootstrap/login fix

Date: 2026-08-25

## Root cause found
Render failed during startup with:
`relation "procurement_requisitions" does not exist`

The application schema defines the table as `purchase_requisitions`. The startup initializer and administrator deletion cleanup were incorrectly using `procurement_requisitions`.

## Corrective action
All incorrect references were changed to `purchase_requisitions`.

## Login/MFA
The deployed build had not changed because Render never reached a running state; Render continued to expose the previous successful deployment.

This build intentionally hard-disables MFA login enforcement during development. The login form contains only:
- Administrator email
- Password
- Sign in

MFA credentials, trusted-device tables and MFA administration endpoints remain intact for the final security phase.

## Verification performed
- `node --check` on every JavaScript source file: PASS
- Confirmed zero `procurement_requisitions` references: PASS
- Confirmed `purchase_requisitions` exists in schema: PASS
- Confirmed login view contains no authenticator-code field: PASS
- Confirmed `MFA_LOGIN_ENABLED=false` build flag: PASS
- Confirmed organization `updated_by` compatibility migration remains: PASS
- Confirmed all 12 SQL schema files are present: PASS
- Confirmed all module JS files are present: PASS
- Confirmed archive extraction/integrity after packaging: PASS

## Important deployment behavior
Because the service is connected to GitHub/Render, the corrected project must be committed/pushed to the branch Render deploys (`main`) or uploaded/replaced using the deployment method currently being used. A failed deploy does not replace the previous running version.

Do not change or replace `DATABASE_URL` for this fix.
