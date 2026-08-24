# Database Schema Compatibility Fix

## Issue fixed
Existing PostgreSQL databases may already contain the `organizations` table from an earlier build without the `updated_by` column. `CREATE TABLE IF NOT EXISTS` does not modify an existing table, so first-administrator setup failed with:

`column "updated_by" of relation "organizations" does not exist`

## Fix
- Fresh databases now create `organizations.updated_by`.
- Existing databases are migrated safely with `ALTER TABLE organizations ADD COLUMN IF NOT EXISTS updated_by ...`.
- The migration is idempotent and does not delete or replace business data.
- Administrator setup can now update the organization record after recovery.

## Safety
No database replacement is required. Keep the existing Render `DATABASE_URL`.
