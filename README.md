# Amaal Telecoms Admin System

Cumulative enterprise telecom retail administration platform.

## Current release
**Phase 40D — Backup & Recovery — built, audited and integrated**

This is a cumulative continuation build. Existing business modules, authentication/security boundaries, operational workflows, Phase 39 Global Search/UX and Phase 40A Media Management are preserved.

### Phase 40B delivered
- Added a dedicated System Operations control plane rather than a generic Settings page.
- Added authenticated, permission-controlled application, API, PostgreSQL, media, integration, notification, background-job and scheduled-task health visibility.
- Added normalized Health states: Healthy, Warning, Critical and Unknown.
- Added operations job telemetry with queued, running, completed, failed, retrying and cancelled states.
- Added safe retry/cancel controls only for jobs explicitly marked safe for those actions.
- Explicitly excluded arbitrary code execution, arbitrary SQL execution and unsafe job execution from the admin UI.
- Added scheduled-task visibility with cadence, enabled state, next/last execution and failure counts.
- Added permission-protected scheduled-task enable/disable controls with audit logging.
- Added a safe operational configuration surface for approved non-secret settings only.
- Added controlled feature-flag visibility and management through the existing `feature_flags` system.
- Added operational event storage for system-level telemetry.
- Reused the existing authentication, permission and audit infrastructure; no parallel security/audit system was introduced.
- Added `operations.view` and `operations.manage` permissions; Manager receives view access, while existing administrative roles inherit the appropriate controls through the normal role bootstrap.
- Preserved all existing business records and the canonical `purchase_requisitions` boundary.


### Phase 40C delivered
- Added a dedicated Monitoring & Observability layer integrated with System Operations.
- Added application/API performance telemetry: requests per minute, average response time, slow requests and server-error indicators.
- Added PostgreSQL health visibility and operational health aggregation.
- Added background-job, integration, notification, payment, finance-posting and inventory anomaly telemetry with safe Unknown handling when a source is unavailable.
- Added normalized Healthy, Warning, Critical and Unknown health states.
- Added configurable alert rules with severity, threshold, cooldown and enable/disable controls.
- Added alert lifecycle: Open, Acknowledged and Resolved.
- Added alert deduplication/cooldown logic to reduce alert storms.
- Added auditable point-in-time health snapshots.
- Added permission-protected monitoring APIs and administrative alert/rule actions.
- Added a responsive Monitoring & Observability dashboard.
- Hardened the Phase 40B safe job retry/cancel endpoints by moving row locks into real database transactions.
- MFA remains untouched and deferred.

### Cumulative audit and debugging performed before packaging
- Audited the complete cumulative backend module set and registration dependencies before Phase 40B changes.
- Registered every cumulative module, including System Operations, against a route-registration harness: **526 unique routes registered with no duplicate route signatures detected**.
- Ran JavaScript syntax validation across every application JavaScript file.
- Ran Render preflight successfully.
- Verified the runtime has no legacy `procurement_requisitions` reference; the preflight check itself retains the forbidden-name assertion by design.
- Reviewed cross-module registration and shared dependency boundaries.
- Reviewed authentication, authorization, CSRF, file access and administrative action boundaries.
- Reviewed MFA boundaries. **MFA was not implemented, extended, activated or redesigned.**
- Checked Markdown hygiene. Only `README.md` and `CONTINUATION.md` are retained.
- No destructive PostgreSQL reset or destructive business-data migration was introduced.
- Live PostgreSQL verification was not claimed because no production/database connection is available in this build environment.

## Existing platform modules
Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence · AI Business Intelligence · Web & Hosting · Integration Hub · Workflow & Automation · Global Search, UX & Operational Polish · Media Management · System Operations

## Database and deployment
- Node.js 20.x
- PostgreSQL
- Start command: `node render-preflight.js && node server.js`
- `schema.sql` contains the cumulative bootstrap schema.
- `media-management.sql` contains the isolated Phase 40A media schema segment.
- `system-operations.sql` contains the isolated Phase 40B operations schema segment.
- `monitoring-observability.sql` contains the isolated Phase 40C monitoring schema segment.
- The server applies the additive operations schema during startup without resetting PostgreSQL.
- Never reset PostgreSQL.
- Never delete financial or operational records to make a migration pass.
- Never commit secrets.
- Never package `node_modules` or `.git`.

## Security boundary
MFA is intentionally deferred. This build does not implement, activate, redesign or extend MFA. Existing authentication, authorization, CSRF, session and security controls remain the active security boundary. Existing MFA-related artifacts are left untouched.

## Next phase
**Phase 40D — Backup & Recovery**

The next continuation must begin with another complete cumulative audit and regression pass before building controlled backup, integrity verification, retention and recovery capabilities. Do not weaken existing financial, operational, authentication or MFA boundaries.


### Phase 40D delivered
- Added controlled PostgreSQL backup management using the standard `pg_dump` utility when available in the deployment environment.
- Added backup metadata, status, size, duration, SHA-256 checksum and verification state.
- Added explicit daily, weekly, monthly and manual retention policies with audited policy changes.
- Added controlled recovery-plan workflow requiring a verified backup, exact confirmation phrase, permission checks and environment policy.
- Database-backed Phase 40A media binaries and metadata are included in PostgreSQL backups; no separate unverified media copy is claimed.
- Added backup health visibility without exposing backup files, database credentials, arbitrary SQL or shell execution to administrators.
- Added permission-controlled Backup & Recovery administration and audit events.
- Recovery execution remains disabled unless the deployment explicitly enables `ALLOW_DATABASE_RECOVERY=true` and provides a matching `RECOVERY_TARGET_ENVIRONMENT`.
- Added integrity verification before a backup may enter recovery planning.

### Phase 40D cumulative audit gate
- **536 unique application route signatures** detected across the cumulative JavaScript application set; no duplicate signatures detected.
- All application JavaScript files passed `node --check`.
- Render preflight: **PASS**.
- Legacy `procurement_requisitions` runtime reference: **absent**.
- Backup module contains no MFA implementation or MFA dependency.
- Secret-pattern scan: **no findings** in application JS/SQL.
- Only useful Markdown files retained: `README.md` and `CONTINUATION.md`.
- No destructive PostgreSQL reset or automatic destructive recovery was introduced.
- Live database backup execution was not falsely claimed in this build environment because `pg_dump` is not installed here; the application reports the capability at runtime and fails safely when unavailable.

## Next phase
**Post-Phase 40D production readiness / deployment validation**

The next continuation must begin with another complete cumulative audit. Focus on deployment-environment validation of `pg_dump`/`pg_restore`, backup storage durability, scheduled backup execution, restore drills in an isolated environment, monitoring integration for backup failures, and final production-readiness regression. Do not enable destructive recovery against production without an isolated restore validation first.
