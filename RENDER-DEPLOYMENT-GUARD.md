# Render deployment guard — Phase B

## Critical fix
The previous Render failure came from the old runtime initializer attempting to access `procurement_requisitions`, a table that does not exist in the canonical schema. The canonical table is `purchase_requisitions`.

This build contains **no runtime reference** to `procurement_requisitions` and removes the redundant post-schema `ALTER TABLE purchase_requisitions ...` bootstrap calls that could crash startup when an older database was missing that table.

The canonical `purchase_requisitions` and `purchase_requisition_lines` tables remain in `schema.sql` and are created idempotently with `CREATE TABLE IF NOT EXISTS`.

## Login during development
MFA enforcement is deliberately disabled in this build. The login page is email + password only. MFA/trusted-device infrastructure remains in the database for the final security phase.

## Deploying to the existing Render service
This project is source-controlled. A ZIP does not automatically change the GitHub commit Render deploys.

1. Extract this ZIP.
2. Replace the repository project files with the extracted files.
3. Commit and push them to the `main` branch connected to the existing Render service.
4. Confirm Render's deployment shows the new commit hash before testing the URL.
5. Do **not** create a new database or change `DATABASE_URL`.
6. Do **not** run a destructive database reset.

If Render still shows the old commit hash, it is serving the old source and this build has not been deployed.

## Local static guard
Run `npm run verify` before pushing. It checks the exact legacy table reference, canonical schema table, MFA-disabled login configuration, required files and login UI.
