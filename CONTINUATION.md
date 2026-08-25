# Amaal Telecoms Admin System — Continuation Prompt

## Current cumulative state

The project is now at:

**Phase 40D — Backup & Recovery — built, audited and integrated.**

Continue from this exact codebase.

Do not rebuild the application.
Do not replace the existing architecture.
Do not remove completed business modules.
Do not reset PostgreSQL.
Do not fabricate live-production verification.

## Mandatory rezip discipline

Before every future rezip:

1. Inspect the entire cumulative project first.
2. Audit every existing module, route, permission and schema dependency.
3. Trace cross-module workflows for inventory, sales, orders, procurement, returns, warranty, credit and finance.
4. Check for missing tables, columns, foreign keys, indexes and inconsistent state transitions.
5. Debug confirmed issues before adding new functionality.
6. Run `node --check` across every application JavaScript file.
7. Run a route-registration/static route audit and check duplicate route signatures.
8. Run `node render-preflight.js`.
9. Check for forbidden legacy `procurement_requisitions` runtime references.
10. Review security boundaries, authorization, CSRF, file access, backup-file access and sensitive-data exposure.
11. Remove useless or obsolete Markdown files.
12. Keep only useful `README.md` and `CONTINUATION.md` documentation.
13. Update `README.md` to describe the actual cumulative release.
14. Replace this file with the exact next continuation instructions.
15. Only then create the new ZIP.

## MFA — STRICTLY OUT OF SCOPE

Do not implement MFA.

Do not modify or extend:

- MFA tables
- MFA APIs
- TOTP
- recovery codes
- trusted-device flows
- MFA middleware
- MFA login enforcement
- MFA screens
- MFA recovery

Existing MFA-related artifacts must remain untouched.

MFA remains postponed until after domain acquisition, deployment, public testing and production feedback.

## Completed cumulative modules

Preserve all previously completed modules:

- Security Hardening
- Catalog
- Inventory
- Suppliers & Procurement
- Customers & CRM
- Sales & POS
- Orders & E-commerce
- Pricing & Promotions
- Delivery & Logistics
- Warranty & Repairs
- Returns & Refunds
- Document Management
- Credit & Installments
- Finance & Accounting
- Reporting & Business Intelligence
- AI Business Intelligence
- Web & Hosting
- Integration Hub
- Cross-module Workflow & Automation
- Global Search, UX & Operational Polish
- Media Management
- System Operations
- Monitoring & Observability
- Backup & Recovery

## Phase 40A — Media Management

Preserved and integrated:

- Enterprise media asset model
- Media folders and tags
- Media relationships
- Media versions
- SHA-256 duplicate detection
- Server-side MIME/content validation
- Image dimensions
- 15 MB upload limit
- Private authenticated media delivery
- Explicit Public + Active media delivery
- Metadata management
- Search/filtering
- Bulk tagging/archive
- Admin Media Library UI
- Media permissions
- Global Search integration
- Audit/integration events

Media binaries currently use PostgreSQL-backed storage. Phase 40D backup therefore includes the media binaries and metadata through the PostgreSQL database backup.

## Phase 40B — System Operations

Preserved and integrated:

- Application/API/database/media/integration/notification health checks
- Background-job telemetry
- Safe retry/cancel controls
- Scheduled task management
- Safe operational configuration
- Feature-flag controls
- Operations event history
- Operations permissions

Do not introduce arbitrary SQL execution, arbitrary code execution or unsafe job execution.

## Phase 40C — Monitoring & Observability

Preserved and integrated:

- Application/API telemetry
- Database health
- Background-job telemetry
- Integration failure telemetry
- Notification/payment/finance/inventory operational signals
- Healthy/Warning/Critical/Unknown states
- Configurable alert rules
- Alert cooldown/deduplication
- Open/Acknowledged/Resolved lifecycle
- Auditable monitoring snapshots
- Monitoring UI

## Phase 40D — Backup & Recovery

Completed:

- PostgreSQL backup management through `pg_dump`
- Backup metadata and history
- Backup status
- Backup size and duration
- SHA-256 checksum
- Backup integrity verification
- Daily/weekly/monthly/manual retention policies
- Audited retention policy changes
- Recovery planning
- Exact recovery confirmation phrase
- Environment-aware recovery safeguards
- Controlled recovery execution through `pg_restore` only when explicitly enabled by deployment policy
- Backup health endpoint
- Permission-protected backup APIs
- Backup audit events
- Media backup strategy through database-backed media storage

### Backup safety rules

Never expose:

- backup filesystem paths to ordinary administrators
- database connection strings
- database credentials
- arbitrary SQL execution
- arbitrary shell execution
- unrestricted filesystem access

Backup creation requires `backup.manage`.
Backup viewing requires `backup.view`.
Recovery planning/execution requires `backup.manage`.

Recovery execution is blocked unless all of the following are true:

- backup status is `Verified`
- verification status is `Verified`
- exact confirmation phrase is supplied
- `ALLOW_DATABASE_RECOVERY=true`
- `RECOVERY_TARGET_ENVIRONMENT` is configured
- recovery target exactly matches the plan target

Do not weaken these safeguards.

### Runtime dependency note

The development container used for this build does not have `pg_dump` or `pg_restore` installed. Therefore no live backup/restore execution was falsely claimed. In a deployment environment where those utilities exist, the API uses them directly and fails safely when they are unavailable.

## Cumulative audit completed for Phase 40D

- Full cumulative JavaScript syntax audit: PASS
- Route/static registration audit: **536 unique route signatures, 0 duplicates**
- Backup routes: 10
- Render preflight: PASS
- Canonical `purchase_requisitions`: preserved
- Legacy `procurement_requisitions` runtime reference: absent
- Backup security review: PASS
- Secret-pattern scan: PASS
- MFA boundary: preserved
- Markdown hygiene: only `README.md` and `CONTINUATION.md`
- No destructive PostgreSQL reset introduced
- No automatic destructive recovery introduced

## Next build — Deployment Validation & Production Readiness

Before writing new code, perform the complete cumulative audit again.

Then focus on production-environment validation rather than blindly adding another large module.

### 1. Backup runtime validation

Verify in the target deployment environment:

- `pg_dump` availability
- `pg_restore` availability
- `DATABASE_URL` availability
- backup directory/storage availability
- backup file permissions
- adequate storage capacity
- backup duration
- checksum verification

Do not claim these are available until actually verified.

### 2. Isolated restore drill

Perform a restore test only against an isolated non-production database.

Verify:

- schema restoration
- business records
- finance records
- inventory records
- customer records
- media binaries
- media relationships
- indexes and constraints
- authentication-related records
- operational/monitoring records

Do not restore over production during a test.

### 3. Backup scheduling

Integrate backup execution with the existing System Operations scheduler only if the scheduler can safely execute the predefined backup task.

Do not add arbitrary job execution.

Add:

- backup success/failure telemetry
- stale backup detection
- backup verification alerts
- retention execution telemetry

### 4. Monitoring integration

Extend Phase 40C monitoring to surface:

- last successful backup age
- last verification age
- failed backups
- failed verification
- storage exhaustion risk
- overdue scheduled backup

Never fabricate these values.

### 5. Production readiness

Audit:

- environment variables
- filesystem permissions
- backup retention behavior
- recovery safeguards
- authentication/authorization
- CSRF
- sensitive data exposure
- logging
- audit trails
- startup migrations
- deployment behavior

### Completion gate

Do not declare the next phase complete until:

- cumulative audit passes
- isolated restore drill is actually performed where infrastructure allows
- backup runtime capability is verified where infrastructure allows
- monitoring integration passes
- JavaScript syntax passes
- duplicate route check passes
- Render preflight passes
- README is updated
- this continuation prompt is replaced with the exact next instructions
- only useful Markdown remains
- final ZIP integrity passes

Every rezip must follow:

**audit entire cumulative project → debug → build → regression test → remove obsolete Markdown → update README → create fresh CONTINUATION.md → verify → ZIP**
