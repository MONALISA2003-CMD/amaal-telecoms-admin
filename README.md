# Amaal Telecoms Admin System

Cumulative enterprise telecom retail administration platform.

## Current release
**Phase 40G — AI Activation + Cross-Module Frontend Scoping Fix — audited and debugged**

This is a cumulative continuation build. Existing modules are preserved; this release fixes a real browser-side integration defect discovered during Render testing and strengthens the AI/integration frontend boundary.

## What was fixed in this release

The Render screenshots exposed:

- `aiView is not defined`
- `integrationView is not defined`

The cause was not the domain configuration or missing API keys. The AI and Integration view renderers had been declared inside a feature closure but consumed from another feature closure. Shared UI helper `cardGrid()` also had a cross-scope dependency.

The fix:

- Exposes the closure-owned AI renderer through the controlled `window.aiView` interface.
- Exposes the Integration renderer through the controlled `window.integrationView` interface.
- Updates the consuming renderer to use those explicit interfaces.
- Adds a globally available shared `cardGrid()` helper for legacy/top-level views.
- Preserves module isolation while making cross-module UI dependencies explicit.

A browser-style render regression harness was used against the cumulative navigation set: **113 unique admin views rendered without JavaScript exceptions** using safe mock data. The temporary harness was removed before packaging.

## AI status

The AI layer is implemented server-side and includes:

- Authenticated AI Assistant
- Conversation creation/history
- Live business-data grounding
- AI Business Intelligence health/configuration
- Gemini connection test
- AI report generation
- AI training/governance
- AI schedules
- Public catalog AI endpoint
- Usage/cost monitoring and governance foundations

The real Gemini API call still requires a valid production/staging credential. A missing domain is **not** required to test Gemini itself.

### AI credentials

The application reads:

- `GEMINI_API_KEY` — preferred Gemini credential.
- `GOOGLE_API_KEY` — supported fallback for the Gemini integration.

Never place either key in GitHub, frontend JavaScript, HTML, README content, or a ZIP containing real secrets. Store the real value in the deployment provider's secret/environment-variable store.

## Environment and API-key inventory

These are the environment variables actually referenced by the application. No fictitious provider keys should be added.

### Required application/security secrets

- `DATABASE_URL` — production PostgreSQL connection string.
- `JWT_SECRET` — application/session signing secret.
- `ADMIN_RECOVERY_TOKEN` — controlled administrative recovery secret.
- `INTEGRATION_ENCRYPTION_KEY` — encryption key for protected integration credentials.
- `GEMINI_API_KEY` — Gemini AI credential, or `GOOGLE_API_KEY` as supported fallback.

### Email

- `RESEND_API_KEY` — Resend email provider credential.
- `EMAIL_FROM` — verified sender address.
- `APP_BASE_URL` — canonical application URL used in email links and callbacks.

These become production-critical when the production domain and verified sending domain are ready. They are not required to render the admin UI itself.

### Public website / public AI

- `PUBLIC_WEB_ORIGINS` — comma-separated allowed origins for the public AI endpoint. Set this to the actual public website origin after the domain is acquired and deployed.

### Runtime

- `NODE_ENV`
- `PORT`
- `RENDER`
- `ALLOW_MANUAL_INVITATION_TOKENS`

### Backup and recovery

- `BACKUP_ENABLED`
- `BACKUP_DIR`
- `PG_DUMP_BIN`
- `BACKUP_STALE_HOURS`

Destructive PostgreSQL restore execution is permanently disabled in this application. Backup creation and integrity verification remain supported. Recovery plans require `RECOVERY_TARGET_ENV` (default `staging-recovery`) and a separate `RECOVERY_DATABASE_URL`; production/live/primary targets are rejected and the recovery database must differ from `DATABASE_URL`. Actual restoration must be performed by a separately controlled, isolated infrastructure process outside the application. For Neon, use a dedicated recovery branch/database and never point recovery tooling at the production connection string. The application's local `BACKUP_DIR` is not a durable off-site backup by itself; store verified backup artifacts in separate persistent/private object storage or another independent backup system.

## Values that can wait until domain acquisition

After the production domain is acquired, configure and verify:

1. `APP_BASE_URL`
2. `PUBLIC_WEB_ORIGINS`
3. `EMAIL_FROM`
4. `RESEND_API_KEY` for the verified production email domain
5. Any future OAuth callback URLs, webhook URLs or DNS-dependent integrations that are actually implemented
6. Production HTTPS/HSTS and domain configuration in the hosting provider

Do **not** invent OAuth/payment/SMS/maps API keys for integrations that are not implemented.

## Existing platform modules

Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence · AI Business Intelligence · Web & Hosting · Integration Hub · Workflow & Automation · Global Search, UX & Operational Polish · Media Management · System Operations · Monitoring & Observability · Backup & Recovery · Deployment Readiness

## Security boundaries

MFA is intentionally deferred. This build does not implement, activate, redesign or extend MFA. Existing authentication, authorization, CSRF, session and security controls remain the active security boundary.

Never commit:

- `.env`
- real API keys
- database passwords
- JWT secrets
- recovery secrets
- encryption keys
- production backups
- `node_modules/`
- `.git/`

Only useful project Markdown documentation should be retained: `README.md` and `CONTINUATION.md`.

## AI staging fix — 25 August 2026

A live staging test exposed a database compatibility defect in the AI Assistant low-stock grounding query. The query referenced `product_variants.reorder_level`, but the canonical inventory design stores replenishment thresholds in `inventory_reorder_rules`.

The query has been corrected to use the canonical reorder-rule table, include reserved stock in available-stock calculations, and fall back to the platform default reorder point when no enabled rule exists. This is a code/schema-alignment fix; it does not require domain-dependent environment variables.

The AI assistant must be retested against the real PostgreSQL database after deployment. Gemini operational chat now uses the standard `generateContent` REST endpoint with low thinking, a bounded output size, conversation history, and a 30-second server timeout. The browser gives up after 45 seconds with a clear error instead of hanging indefinitely. The Interactions API remains documented separately but is not used for the synchronous admin chat path.

## Verification performed for this release

- All application JavaScript files passed `node --check`.
- Render preflight: **PASS**.
- Route audit: **544 route registrations, 543 unique signatures, 0 duplicate signatures**.
- Legacy `procurement_requisitions` runtime reference: **absent**.
- Frontend cumulative view audit: **113 unique admin views rendered without exceptions** using safe mock data.
- AI and Integration cross-closure rendering defect: **fixed**.
- AI low-stock grounding query/schema mismatch: **fixed** using `inventory_reorder_rules`.
- Temporary browser test harness: **removed before packaging**.
- MFA: **untouched**.
- No destructive database reset introduced.

Live PostgreSQL, Gemini, email delivery and production backup/restore tests must be performed in the actual staging/deployment environment with real credentials. Do not claim those tests passed from a local build without the required services.

## Deployment

Node.js 20.x · PostgreSQL

Start command:

```bash
node render-preflight.js && node server.js
```

Verification command:

```bash
npm run verify
```

Deployment readiness:

```bash
npm run readiness
```

Never reset PostgreSQL to make the application start. Apply additive migrations and preserve operational and financial history.
