# Amaal Telecoms Admin System

Cumulative enterprise telecom retail administration platform.

## Current release
**Phase 40E — Production Readiness & Deployment Validation — built, audited and integrated**

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

## Phase 40D — Backup & Recovery


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

### Phase 40E continuation note
**Post-Phase 40D production readiness / deployment validation**

The next continuation must begin with another complete cumulative audit. Focus on deployment-environment validation of `pg_dump`/`pg_restore`, backup storage durability, scheduled backup execution, restore drills in an isolated environment, monitoring integration for backup failures, and final production-readiness regression. Do not enable destructive recovery against production without an isolated restore validation first.

## Phase 40E — Production Readiness & Deployment Validation Build

This cumulative build adds the production-readiness tooling and safe scheduler integration required after Phase 40D.

### Delivered
- Added `deployment-readiness.js`, a non-destructive deployment-environment readiness check for Node.js, `pg_dump`, `pg_restore`, `DATABASE_URL`, backup storage and recovery policy.
- Added `npm run readiness` without claiming that local development infrastructure is equivalent to production infrastructure.
- Added explicit backup environment variables to `.env.example`.
- Integrated the existing System Operations scheduler with two predefined backup tasks only:
  - `backup-daily` — creates and immediately verifies a daily PostgreSQL backup.
  - `backup-retention` — applies the configured backup retention policy.
- The scheduler cannot execute arbitrary jobs from task metadata. Only known task keys map to predefined server-side functions.
- Added safe task claiming with row locks and `SKIP LOCKED`, followed by execution outside the claim transaction.
- Added scheduled-task failure telemetry and operational events.
- Added backup freshness, last verified backup age and recent backup failure telemetry to Monitoring & Observability.
- Added free-space detection for the backup storage filesystem where the Node runtime supports `statfs`.
- Preserved all Phase 40A–40D backup, monitoring, operations and recovery safeguards.

### Cumulative audit gate
- **536 unique route signatures** across the application; **0 duplicates**.
- All application JavaScript files passed `node --check`.
- Render preflight: **PASS**.
- Legacy `procurement_requisitions` runtime reference: **absent**; the preflight assertion itself remains intentionally present.
- Backup scheduling uses only predefined server-side operations.
- No arbitrary SQL, shell, filesystem or code execution was added to the admin UI.
- MFA was not implemented, activated, redesigned or extended.
- Only useful Markdown files remain: `README.md` and `CONTINUATION.md`.
- No destructive PostgreSQL reset or production restore was introduced.

### Environment limitation
The current build environment does not provide `pg_dump`, `pg_restore` or a production `DATABASE_URL`. Therefore the deployment-readiness command correctly reports those capabilities as unavailable here. An isolated restore drill cannot honestly be claimed until a deployment/staging environment with a real PostgreSQL target is available.

## AI Business Intelligence — activation and verification

The AI layer is now wired end-to-end. It is **server-side only** and uses the Gemini Interactions API. The current default model is `gemini-3.7-flash`, which is a current stable Gemini model.

The platform now includes:

- AI Business Intelligence health/status
- Gemini connectivity test from the admin UI
- Governed AI Assistant with conversation history
- Live business-data snapshots for grounded answers
- AI report generation
- AI report schedules
- AI training/governance examples
- Customer-facing public AI catalog assistant
- AI error/history records

### Why AI may appear not to work

The application cannot call Gemini until a valid server-side Gemini credential is supplied. The key must be configured in the deployment environment as `GEMINI_API_KEY` (or the supported `GOOGLE_API_KEY` fallback). The browser never receives the key.

After adding the key:

1. Restart/redeploy the application so the environment variable is loaded.
2. Sign in as Super Admin.
3. Open **AI & Integrations → AI Business Intelligence**.
4. Confirm **Gemini key: Configured**.
5. Click **Test Gemini connection** and require a successful response.
6. Open **AI Assistant** and send a business question.
7. Generate an AI report and confirm it is saved as `Completed`.

If the connection test fails, use the returned provider error rather than assuming the AI layer is broken.

### AI data boundary

AI receives controlled business snapshots. It must not invent figures or directly mutate sales, inventory, finance, customer, security or other operational records. The assistant explicitly reports when required data is unavailable.

## Production environment variables, API keys and domain-dependent configuration

**Important:** This repository must contain **no real API keys, passwords, tokens, private keys or database credentials**. The README lists the required configuration names and where each value must be obtained. Put real values only in the deployment provider's protected Environment/Secrets settings.

### API keys and provider credentials currently used by the application

| Variable | Type | Required | Where to obtain | When to configure |
|---|---|---:|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | Optional, required for AI BI/public AI features | Google AI Studio / Google AI API credentials | Before enabling AI features in staging/production |
| `GOOGLE_API_KEY` | Google AI API key alias | Optional fallback | Google AI Studio / Google AI API credentials | Only if `GEMINI_API_KEY` is not used |
| `RESEND_API_KEY` | Resend API key | Required for production email delivery | Resend dashboard after verifying the sender domain | **After domain acquisition and DNS verification** |
| `INTEGRATION_ENCRYPTION_KEY` | Application encryption secret | Required for protected integration credentials | Generate a long random secret; do not obtain from a provider | Before production deployment |
| `JWT_SECRET` | Application signing secret | Required | Generate a long random secret | Before production deployment |
| `ADMIN_RECOVERY_TOKEN` | Emergency recovery secret | Required for emergency admin recovery | Generate a long random secret; store only in deployment secrets | Before production deployment; rotate after emergency use |

`GOOGLE_API_KEY` is supported as a fallback alias for the Gemini client. Do not populate both with different credentials unless there is a deliberate reason to do so.

**Complete application API-key inventory:** the current codebase directly reads `GEMINI_API_KEY`, `GOOGLE_API_KEY` and `RESEND_API_KEY`. No other provider API-key environment variables are currently consumed by the application. Integration credentials for future/connected providers are stored through the Integration Hub encryption boundary rather than being hard-coded as provider-specific environment variables. Do not invent or add payment, SMS, maps, OAuth or other provider keys until the corresponding integration is actually implemented.

### Domain acquisition / DNS dependent values

These values should be filled **after the Amaal Telecoms production domain has been acquired and DNS is under control**:

- `APP_BASE_URL` — production HTTPS URL, for example `https://admin.example.com`.
- `PUBLIC_WEB_ORIGINS` — exact HTTPS origins allowed to call the public AI gateway. Include only trusted production website origins.
- `EMAIL_FROM` — verified sender address on the acquired email domain, for example `Amaal Telecoms <no-reply@example.com>`.
- `RESEND_API_KEY` — create/configure after the sender domain is verified with Resend.
- Any production OAuth/webhook callback URLs added by future integrations must use the final HTTPS domain and must be registered with the relevant provider before activation.
- Production DNS records required by the hosting provider, email provider and any future payment/integration provider must be completed and verified before public launch.

### Core deployment secrets and infrastructure configuration

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Production PostgreSQL connection string |
| `PORT` | Application listening port; normally supplied by the hosting platform |
| `RENDER` | Hosting/runtime marker supplied by Render when deployed there |
| `NODE_ENV` | Set to `production` in production |
| `JWT_SECRET` | Session/signing secret |
| `ADMIN_RECOVERY_TOKEN` | Emergency administrator recovery control |
| `INTEGRATION_ENCRYPTION_KEY` | Encryption of integration credentials at rest |
| `GEMINI_API_KEY` / `GOOGLE_API_KEY` | Gemini AI Business Intelligence provider credential |
| `PUBLIC_WEB_ORIGINS` | Allowlisted public website origins for public AI requests |
| `RESEND_API_KEY` | Transactional email provider credential |
| `EMAIL_FROM` | Verified production sender identity |
| `APP_BASE_URL` | Canonical application URL used in generated links |

### Backup and recovery configuration

| Variable | Purpose | Production guidance |
|---|---|---|
| `BACKUP_ENABLED` | Enables backup operations | `true` only when durable backup storage and PostgreSQL tooling are ready |
| `BACKUP_DIR` | Private backup storage location | Use a private persistent/durable volume or approved backup storage; never a public/static directory |
| `PG_DUMP_BIN` | PostgreSQL dump executable | Verify availability in the deployment image/environment |
| `PG_RESTORE_BIN` | PostgreSQL restore executable | Verify availability in the deployment image/environment |
| `BACKUP_STALE_HOURS` | Backup freshness threshold | Set according to the approved RPO |
| `ALLOW_DATABASE_RECOVERY` | Enables controlled recovery execution | Keep `false` until an isolated restore drill has passed |
| `RECOVERY_TARGET_ENVIRONMENT` | Exact approved recovery target | Set only for the approved recovery environment |

### Development-only controls

- `ALLOW_MANUAL_INVITATION_TOKENS=false` in production. Do not expose invitation tokens through API responses after email delivery is configured.
- Never place any API key or secret in frontend JavaScript, HTML, SQL seed data, README files, screenshots or Git history.
- Rotate any secret that has ever been exposed outside the deployment secret store.

### Provider checklist before public launch

- [ ] Acquire the final production domain.
- [ ] Configure DNS for the hosting platform and verify HTTPS/TLS.
- [ ] Configure `APP_BASE_URL` with the final HTTPS URL.
- [ ] Configure `PUBLIC_WEB_ORIGINS` with exact trusted website origins.
- [ ] Create/verify the production sender domain in Resend.
- [ ] Create `RESEND_API_KEY` and configure `EMAIL_FROM`.
- [ ] Create/restrict the Gemini API credential if AI features are enabled.
- [ ] Configure production PostgreSQL `DATABASE_URL`.
- [ ] Generate and store `JWT_SECRET`, `ADMIN_RECOVERY_TOKEN` and `INTEGRATION_ENCRYPTION_KEY` in the deployment secret manager.
- [ ] Verify `pg_dump` and `pg_restore` availability.
- [ ] Complete an isolated backup restore drill.
- [ ] Confirm backup durability and retention.
- [ ] Confirm monitoring/alerts for backup, payment, finance, inventory and integration failures.
- [ ] Run the final production readiness check again after all environment variables are populated.

## Current cumulative modules
Security Hardening · Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence · AI Business Intelligence · Web & Hosting · Integration Hub · Workflow & Automation · Global Search, UX & Operational Polish · Media Management · System Operations · Monitoring & Observability · Backup & Recovery · Production Readiness & Deployment Validation

## Security boundary
MFA remains deliberately deferred. This build does not implement, activate, redesign or extend MFA. Existing authentication, authorization, CSRF, session and security controls remain the active security boundary.
