# Deployment Bootstrap Fix — August 25, 2026

## Root cause
The startup initializer referenced `procurement_requisitions`, but the canonical table created by `schema.sql` is `purchase_requisitions`. Render therefore terminated during `npm start` with PostgreSQL error `42P01: relation "procurement_requisitions" does not exist`.

## Correction
All startup migration and administrator-deletion references now use `purchase_requisitions`.

## Login behavior
MFA login enforcement is hard-disabled for the current build. The login screen contains only email and password. Trusted-device/MFA infrastructure remains stored for the final security phase.

## Deployment expectation
Once this corrected project is deployed successfully, the application will no longer fail at startup on the procurement relation check, and the updated email/password-only login screen will be served.
