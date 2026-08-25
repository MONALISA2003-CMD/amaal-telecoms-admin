# Amaal Telecoms Admin System

Cumulative enterprise telecom retail administration platform.

## Current release
**Phase 40B — System Operations — built, audited and integrated**

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

### Cumulative audit and debugging performed before packaging
- Audited the complete cumulative backend module set and registration dependencies before Phase 40B changes.
- Registered every cumulative module, including System Operations, against a route-registration harness: **382 unique routes registered with no duplicate route signatures detected**.
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
- The server applies the additive operations schema during startup without resetting PostgreSQL.
- Never reset PostgreSQL.
- Never delete financial or operational records to make a migration pass.
- Never commit secrets.
- Never package `node_modules` or `.git`.

## Security boundary
MFA is intentionally deferred. This build does not implement, activate, redesign or extend MFA. Existing authentication, authorization, CSRF, session and security controls remain the active security boundary. Existing MFA-related artifacts are left untouched.

## Next phase
**Phase 40C — Monitoring, Health & Observability**

The next continuation must begin with another complete cumulative audit and regression pass before extending the System Operations control plane with deeper monitoring, actionable alerts, application/database performance indicators, integration failure telemetry, storage/backup health and business-operation anomaly monitoring.
