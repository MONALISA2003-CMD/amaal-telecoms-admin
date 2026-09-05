# AMAAL — CURRENT BUILD STATUS

This package is the cleaned **Phase 015 continuation** of the Amaal commerce platform. The public website, Business Console, backend and database migrations are packaged together. The authoritative product-management surface remains the Business Console.

**Current release:** Phase 015 — post-Phase-014 reinspection and completion pass.
**Master blueprint:** `apps/public-web/AMAAL_MASTER_IMPROVEMENT_BP.md`
**Continuation:** `apps/public-web/AMAAL_PHASE015_CONTINUATION.md`
**Database policy:** additive/idempotent migrations only; no database reset.

---

# Amaal Telecoms Admin

## Production Readiness Release

**Release:** Phase 4 Final Production Readiness
**Platform:** Amaal Telecoms Admin
**Runtime:** Node.js 20.x
**Database:** PostgreSQL

This release is a cumulative correction of the existing Amaal Telecoms administration platform. The application architecture, existing modules, routes, permissions and PostgreSQL schema are preserved.

**Database status:** No database reset, migration, schema rewrite or destructive database operation was introduced in this release.

---

## Release Scope

This release focuses on final application correctness and production readiness after staging validation.

### Confirmed fixes in this release

#### 1. Global Apply Date Range

The shared date-range control now:

- Stores the selected start and end dates in the active session.
- Applies the selected range when date-aware views reload.
- Drives Sales, Procurement, Finance and Business Intelligence requests.
- Passes the selected range to Finance synchronization.
- Validates missing and reversed dates before applying the range.
- Keeps current-state views such as stock-on-hand explicitly unfiltered where a historical range is not meaningful.

#### 2. Finance Synchronization

Finance synchronization now has two concurrency protections:

- An application-process guard prevents duplicate synchronization requests inside the same running instance.
- A PostgreSQL transaction advisory lock prevents concurrent synchronization across application instances.
- The lock is transaction-scoped and is released automatically when the transaction ends.
- Synchronization is fully transactional and rolls back on failure.
- Existing source-to-journal idempotency through `finance_sync_log` and `source_ref` is preserved.
- The selected date range is respected by synchronization.
- Empty source queues complete safely.
- Audit logging remains enabled.

#### 3. Web & Hosting

Fixed a production frontend error caused by treating `formModal()` as a Promise even though it returns the modal DOM node.

The affected website creation flow now completes normally instead of producing:

`formModal(...).then is not a function`

The same misuse was audited across the application and corrected in other affected actions, including media-folder creation and backup-retention editing.

#### 4. Media Management

Media Management remains registered and available through the authorized administration interface. Existing permission checks and API protection are preserved.

---

## Modules Included

- Dashboard
- Global Search
- Catalog
- Inventory
- Stock Control
- Suppliers & Procurement
- Customers & CRM
- Sales & POS
- Orders & E-commerce
- Pricing & Promotions
- Delivery & Logistics
- Warranty & Repairs
- Returns & Refunds
- Credit & Installments
- Finance & Accounting
- Business Intelligence
- AI Business Intelligence
- AI Assistant
- Integration Hub
- Web & Hosting
- Media Management
- Document Management
- System Operations
- Monitoring & Observability
- Backup & Recovery
- Deployment Readiness
- Security, Roles, Permissions and Audit

---

## Environment Variables

Configure these variables in the deployment environment. **The README intentionally does not contain their values.**

### Core application

- `NODE_ENV` — Node.js runtime environment.
- `PORT` — HTTP service port.
- `RENDER` — hosting-platform runtime indicator when supplied by the deployment platform.

### PostgreSQL and authentication

- `DATABASE_URL` — primary PostgreSQL connection string.
- `JWT_SECRET` — secret used for application/session token signing.
- `ADMIN_RECOVERY_TOKEN` — controlled administrator recovery secret.

### Protected integration credentials

- `INTEGRATION_ENCRYPTION_KEY` — encryption key for protected integration credentials stored by the application.

### AI / Gemini

- `GEMINI_API_KEY` — preferred Gemini credential.
- `GOOGLE_API_KEY` — supported fallback Gemini credential.

Keep AI credentials server-side. Never expose them through frontend JavaScript, HTML, public configuration or client-side network responses.

### Email and password recovery links

- `RESEND_API_KEY` — email provider credential.
- `EMAIL_FROM` — verified sender identity.
- `APP_BASE_URL` — canonical application URL used when generating application links.

### Public AI access

- `PUBLIC_WEB_ORIGINS` — comma-separated public website origins permitted to use the public AI gateway.

### Invitation handling

- `ALLOW_MANUAL_INVITATION_TOKENS` — development/security control for whether invitation tokens may be returned directly by the invitation API.

Keep this disabled for production use.

### Backup and recovery

- `BACKUP_ENABLED` — controls scheduled/application backup functionality.
- `BACKUP_DIR` — application backup working directory.
- `PG_DUMP_BIN` — PostgreSQL `pg_dump` executable location when required by the deployment environment.
- `BACKUP_STALE_HOURS` — backup freshness threshold used by readiness checks.
- `RECOVERY_TARGET_ENV` — isolated recovery target environment identifier.
- `RECOVERY_DATABASE_URL` — separate PostgreSQL recovery database connection string.

`RECOVERY_DATABASE_URL` must never point to the primary production database. Production/live/primary recovery targets are intentionally rejected by the application.

---

## Secrets and Files That Must Never Be Committed

Never commit or package real values for:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_RECOVERY_TOKEN`
- `INTEGRATION_ENCRYPTION_KEY`
- `GEMINI_API_KEY`
- `GOOGLE_API_KEY`
- `RESEND_API_KEY`
- `RECOVERY_DATABASE_URL`
- Production database backups
- `.env`
- `.git/`
- `node_modules/`

Use the deployment provider's encrypted environment-variable/secret store.

---

## Security Boundaries

- CSRF protection remains enabled.
- Authentication and authorization middleware remain active.
- Existing role and permission checks are preserved.
- Finance synchronization requires `finance.sync` permission.
- Web management, publishing, domains and media retain separate permissions.
- Gemini credentials remain server-side.
- Destructive PostgreSQL restore execution remains disabled.
- Recovery tooling must use an isolated recovery database.
- MFA remains deferred and has not been activated or redesigned in this release.

---

## Database Policy

The application must use the existing PostgreSQL schema as the source of truth.

Do not:

- Reset PostgreSQL.
- Drop production tables.
- Replace the schema with a rebuilt database.
- Delete operational history.
- Delete financial history to resolve application errors.
- Point recovery tooling at the production database.

If a future schema change becomes necessary, use a controlled additive migration process with a backup and rollback plan.

---

## Validation Performed

Static and source-level validation for this release includes:

- JavaScript syntax validation across the application.
- Render preflight validation.
- Route registration audit.
- Duplicate route signature audit.
- Permission and authentication reference audit.
- Frontend action audit for invalid Promise handling around `formModal()`.
- Global date-range propagation audit.
- Finance synchronization concurrency/idempotency audit.
- Database dependency audit without connecting to or modifying PostgreSQL.
- YAML-file audit.
- Secret exposure audit for frontend assets.
- ZIP/package integrity validation.

Live database operations were deliberately not performed while preparing this package because the instruction for this release is to leave the database untouched.

---

## Staging Status

Staging validation is complete.

The application is now at the point where the next step is **controlled production deployment**, not another feature-development phase.

---

## Next Step: Production Deployment

### 1. Prepare production infrastructure

- Provision the production Node.js 20.x runtime.
- Provision or select the existing production PostgreSQL environment.
- Confirm HTTPS at the hosting provider.
- Configure the production domain.
- Configure the deployment start command.

### 2. Configure production environment variables

Fill every required variable listed above using real production values in the hosting provider's secret/environment configuration.

Do not place those values in the repository or README.

### 3. Configure email and domain dependencies

After the production domain is available:

- Set `APP_BASE_URL`.
- Set `PUBLIC_WEB_ORIGINS`.
- Configure the verified sender for `EMAIL_FROM`.
- Configure `RESEND_API_KEY`.
- Verify password-reset and invitation links from the production domain.

### 4. Configure AI

- Configure one supported Gemini credential.
- Verify the credential server-side.
- Confirm no credential is returned to browser clients.
- Run the AI staging/production smoke test against the real deployment.

### 5. Configure backup operations

- Enable production backup policy as required.
- Use durable private storage outside the public application directory.
- Verify backup freshness and integrity.
- Establish an independent infrastructure recovery procedure.
- For Neon, use a dedicated recovery branch/database rather than the production connection.

### 6. Run the production smoke test

Before opening the system to normal operations, verify:

- Administrator login.
- Role and permission enforcement.
- CSRF-protected state-changing actions.
- Global date range.
- Sales and POS.
- Inventory.
- Procurement.
- Finance dashboard.
- Finance synchronization.
- Finance reports.
- Media Management.
- Web & Hosting website creation.
- AI server-side credential boundary.
- Integration Hub.
- Password recovery.
- Invitations.
- Backup readiness.
- Audit logging.

### 7. Production release decision

Only proceed to normal production use after the real deployment passes the smoke test with production configuration and without database reset or destructive recovery operations.

---

## Verification Commands

Install dependencies using the deployment process, then run:

```bash
npm run verify
```

Deployment readiness:

```bash
npm run readiness
```

Normal start:

```bash
npm start
```

The configured start command runs render preflight before starting the server.

---

## Project Continuation Rule

Future work must continue from this cumulative build.

Do not rebuild the application. Preserve the existing architecture, modules, routes, permissions, frontend and backend structure. Do not reset PostgreSQL. Do not add YAML files. Do not activate MFA unless a later phase explicitly requires it.

The next development phase should begin only after the production deployment and smoke-test gate has been completed, unless a confirmed production defect requires a targeted correction.

## Production Smoke Test Tool

A non-mutating production smoke-test runner is included for the controlled deployment gate.

Configure these **smoke-test-only** variables in the shell or deployment validation environment. They are not application secrets and are intentionally not assigned values in this repository:

- `PRODUCTION_BASE_URL` — absolute HTTPS URL of the deployed administration application.
- `SMOKE_SESSION_COOKIE` — optional authenticated session cookie for non-mutating authenticated endpoint checks. Do not commit or store this value in source control.
- `SMOKE_START` — optional start date for date-range smoke checks; defaults to the last 30 days.
- `SMOKE_END` — optional end date for date-range smoke checks; defaults to today.

Run:

```bash
npm run smoke:production
```

The runner checks the public health endpoint, application/database health, HTTPS and security headers. When `SMOKE_SESSION_COOKIE` is supplied, it additionally performs non-mutating checks for authentication, Dashboard, Sales/date range, Inventory, Procurement, Finance/date range, Finance journals/date range, Media Management, Web & Hosting, Integration Hub and AI health.

The runner never creates, updates or deletes business records. It does not run SQL directly and does not reset or migrate PostgreSQL.

If the authenticated cookie is omitted, authenticated checks are reported as skipped rather than being falsely reported as passed.

Serialized fulfilment and delivery reconciliation is enforced through exact physical-unit shipment links; see `CONTINUATION.md` and `AUDIT_REPORT.md` for current status.


## Phase 016 Commerce Core

Server-backed cart, cart-to-checkout integrity, normalized product attributes, stronger search and comparison, compatibility-ready catalogue data, customer reorder, price/back-in-stock alerts, helpful review voting, saved-search foundation and commerce lifecycle visibility in Business Console. Payment provider integration is intentionally deferred to the final commerce phase.

## Cloudflare R2 media storage

Amaal is R2-ready for large public media. See `docs/R2_ARCHITECTURE.md`, `r2-media-storage.sql`, `.env.r2.example`, and `scripts/r2-migrate-media.mjs`. R2 credentials are server-only. Existing database-backed media remains supported; migration is non-destructive and preserves SHA-256 verification.

## Cloudflare R2 Phase 1

The project includes `scripts/r2-connection-smoke.mjs` and the npm command `npm run r2:smoke`.
This test is deliberately non-destructive to Amaal commerce data: it checks bucket access, creates one uniquely named temporary text object, reads it back, verifies byte-for-byte SHA-256 equality, and deletes only that temporary object. It does not write to Neon or alter product/media records.

Required server-side environment variables are documented in `.env.r2.example`. R2 credentials must remain in Vercel/server-side environment variables and must never be committed to Git.
