# Amaal Telecoms Admin System — Continuation Prompt

## Current cumulative state

The project is now at:

**Phase 40E — Production Readiness & Deployment Validation Build — implemented and cumulatively audited.**

Continue from this exact codebase.

Do not rebuild the application.
Do not replace the existing architecture.
Do not reset PostgreSQL.
Do not fabricate live deployment or restore verification.

## Mandatory rezip discipline

Before every future rezip:

1. Inspect the entire cumulative project first.
2. Audit every existing module, route, permission and schema dependency.
3. Trace cross-module workflows for inventory, sales, orders, procurement, returns, warranty, credit and finance.
4. Check missing tables, columns, foreign keys, indexes and inconsistent state transitions.
5. Debug confirmed issues before adding functionality.
6. Run `node --check` across every application JavaScript file.
7. Run the route-registration/static route audit and check duplicate route signatures.
8. Run `node render-preflight.js`.
9. Check for forbidden legacy `procurement_requisitions` runtime references.
10. Review authorization, CSRF, file access, backup access, recovery safeguards and sensitive-data exposure.
11. Remove useless/obsolete Markdown files.
12. Keep only useful `README.md` and `CONTINUATION.md` documentation.
13. Update `README.md` to describe the actual cumulative release.
14. Replace this file with the exact next continuation instructions.
15. Verify the final ZIP before delivery.

## MFA — STRICTLY OUT OF SCOPE

Do not implement or modify MFA.

Do not add or change:
- MFA tables
- MFA APIs
- TOTP
- recovery codes
- trusted devices
- MFA middleware
- MFA login enforcement
- MFA screens
- MFA recovery

MFA remains postponed until after domain acquisition, deployment, public testing and production feedback.

## Phase 40E delivered

### Deployment readiness
- Added `deployment-readiness.js`.
- Added `npm run readiness`.
- Added explicit backup/recovery environment variables to `.env.example`.
- The readiness command reports actual local capabilities and fails honestly when required deployment dependencies are unavailable.

### Safe backup scheduling
Integrated the existing System Operations scheduler with predefined server-side tasks only:

- `backup-daily` — create and immediately verify a daily PostgreSQL backup.
- `backup-retention` — apply configured backup retention.

The scheduler uses database row locking with `SKIP LOCKED` to claim due tasks safely. It cannot execute arbitrary task names, SQL, shell commands or code supplied through task metadata.

### Monitoring integration
Monitoring now exposes:
- last verified backup age
- backup freshness status
- failed backups in the last 24 hours
- configured stale-backup threshold

No fabricated backup status is allowed.

### Backup safety
Preserve:
- `BACKUP_ENABLED`
- `BACKUP_DIR`
- `PG_DUMP_BIN`
- `PG_RESTORE_BIN`
- `BACKUP_STALE_HOURS`
- `ALLOW_DATABASE_RECOVERY`
- `RECOVERY_TARGET_ENVIRONMENT`

Recovery must remain disabled unless deployment policy explicitly enables it after isolated restore validation.

## Required next work — Final Production Validation

Before changing application functionality, perform the full cumulative audit again.

### 1. Deployment environment validation
In the actual staging/deployment environment, verify:

- Node version matches the declared deployment engine.
- PostgreSQL connectivity works.
- `pg_dump` is installed and executable.
- `pg_restore` is installed and executable.
- `DATABASE_URL` is configured securely.
- `BACKUP_DIR` is private and writable.
- Backup storage has sufficient free space.
- Backup files are not served by the public/static web server.
- Recovery target environment is explicitly configured only where approved.

Do not claim any of these until actually verified.

### 2. Isolated restore drill

Use a dedicated non-production PostgreSQL database.

Perform:

1. Create a real verified backup.
2. Restore it into the isolated target.
3. Verify schema and constraints.
4. Verify products, inventory and serialized/IMEI data.
5. Verify customers and CRM records.
6. Verify orders, sales, returns and warranty records.
7. Verify finance and credit records.
8. Verify media binaries and media relationships.
9. Verify monitoring, operations and backup metadata where applicable.
10. Verify authentication-related records without enabling MFA.
11. Run application smoke tests against the restored database.

Never use production as the restore-drill target.

### 3. Scheduled backup validation

Confirm in staging/deployment:

- `backup-daily` executes successfully.
- The generated backup is automatically checksum/size verified.
- Verification failures are recorded.
- Scheduled-task failure counts increase on failure.
- Monitoring reports stale backups.
- Backup failures produce monitoring signals.
- `backup-retention` archives only expired backups under the configured policy.

### 4. Recovery safety validation

Test that recovery is rejected when:

- the backup is not verified
- the confirmation phrase is wrong
- `ALLOW_DATABASE_RECOVERY` is false
- `RECOVERY_TARGET_ENVIRONMENT` is missing
- the requested target differs from the configured target

Only after an isolated restore drill passes may controlled recovery be enabled for an explicitly approved environment.

### 5. Final regression

Audit all cumulative modules and verify:

- Catalog → Inventory
- Procurement → Inventory → Finance
- POS → Inventory → Customer → Finance
- E-commerce → Payment → Inventory → Delivery → Finance
- Returns → Inventory → Refund → Finance
- Warranty → Inventory → Customer → Finance
- Credit → Installments → Collections → Finance
- Media → Catalog/Web/Document relationships
- Operations → Scheduler → Monitoring
- Backup → Verification → Monitoring → Recovery

### Completion gate

Do not declare final production readiness complete until:

- cumulative audit passes
- staging PostgreSQL is actually verified
- `pg_dump` is actually verified
- `pg_restore` is actually verified
- isolated restore drill passes
- scheduled backup passes
- automatic backup verification passes
- retention execution passes
- monitoring integration passes
- security regression passes
- JavaScript syntax passes
- duplicate route check passes
- Render preflight passes
- README is updated
- this continuation prompt is replaced with exact next instructions
- only useful Markdown remains
- final ZIP integrity passes

Every rezip must follow:

**audit entire cumulative project → debug → build → regression test → remove obsolete Markdown → update README → create fresh CONTINUATION.md → verify → ZIP**


## README configuration requirement carried forward

Before the next rezip, keep the README's production configuration inventory current. It must list every API key/provider credential actually used by the application, clearly distinguish secrets from non-secret settings, and identify all values that can only be finalized after the production domain is acquired and DNS/email verification is complete. Never place real secret values in the repository.


## Next build: Phase 40F — Final Staging Validation + AI Activation Gate

Start with a complete cumulative audit and regression pass. Before declaring the platform production-ready, validate the AI layer with a real staging `GEMINI_API_KEY`: confirm the AI health endpoint, run the Gemini connectivity test, open the governed AI Assistant, send grounded business questions, generate an AI report, verify report persistence, and verify scheduled AI reporting. Then validate the production environment with real PostgreSQL tooling, durable backup storage, the final acquired domain, verified HTTPS/DNS, transactional email, and an isolated restore drill. Re-run deployment readiness after secrets and domain-dependent configuration are populated. Update README.md with the final configuration status but never place real secret values in the repository. Keep MFA outside this phase.
