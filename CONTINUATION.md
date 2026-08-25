# Amaal Telecoms Admin System — Continuation Prompt

## Current cumulative state

The project is now at:

**Phase 40G — AI Activation + Cross-Module Frontend Scoping Fix + Live AI Database Compatibility Fix — implemented, audited and debugged.**

Continue from this exact codebase.

Do not rebuild the application.
Do not replace the existing architecture.
Do not reset PostgreSQL.
Do not fabricate live deployment, Gemini, email, backup or restore verification.

## Mandatory rezip discipline

Before every future rezip:

1. Inspect the entire cumulative project first.
2. Audit every existing module, route, permission and schema dependency.
3. Trace cross-module workflows for inventory, sales, orders, procurement, returns, warranty, credit and finance.
4. Audit frontend module boundaries for cross-IIFE/closure references and shared helper dependencies.
5. Check missing tables, columns, foreign keys, indexes and inconsistent state transitions.
6. Debug confirmed issues before adding functionality.
7. Run `node --check` across every application JavaScript file.
8. Run `node render-preflight.js`.
9. Run a route-registration/static route audit and check duplicate signatures.
10. Run a cumulative frontend view/render audit where practical.
11. Check for forbidden legacy `procurement_requisitions` runtime references.
12. Review authorization, CSRF, file access, backup access, recovery safeguards and sensitive-data exposure.
13. Remove useless/obsolete Markdown files.
14. Keep only useful `README.md` and `CONTINUATION.md` documentation.
15. Update `README.md` to describe the actual cumulative release and every environment variable actually consumed by the code.
16. Replace this file with the exact next continuation instructions.
17. Verify ZIP integrity before delivery.

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

## Phase 40G delivered

### AI activation

The cumulative AI layer includes:

- authenticated AI Assistant
- conversation history
- live business-data grounding
- AI Business Intelligence health/configuration
- Gemini connection testing
- AI reports
- AI training/governance
- AI schedules
- public catalog AI
- AI usage/cost governance foundations

The Gemini credential is read server-side from `GEMINI_API_KEY`, with `GOOGLE_API_KEY` supported as fallback. Never expose the credential to the browser.

### Frontend scoping fix

Render testing exposed:

- `aiView is not defined`
- `integrationView is not defined`

Root cause: AI and Integration view renderers were declared inside one feature closure but consumed from another closure. A shared `cardGrid()` helper was also referenced by a top-level view outside the closure that originally defined it.

Fixed by:

- exposing the AI renderer through `window.aiView`
- exposing the Integration renderer through `window.integrationView`
- changing consuming code to use those explicit interfaces
- adding a global shared `cardGrid()` helper for top-level consumers

A cumulative frontend render audit covered **113 unique admin views with zero rendering exceptions** using safe mock data. The temporary test harness was removed before packaging.

## Environment variables

The README is the authoritative inventory. Current code references:

- `DATABASE_URL`
- `JWT_SECRET`
- `ADMIN_RECOVERY_TOKEN`
- `INTEGRATION_ENCRYPTION_KEY`
- `GEMINI_API_KEY`
- `GOOGLE_API_KEY`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `APP_BASE_URL`
- `PUBLIC_WEB_ORIGINS`
- `NODE_ENV`
- `PORT`
- `RENDER`
- `ALLOW_MANUAL_INVITATION_TOKENS`
- `BACKUP_ENABLED`
- `BACKUP_DIR`
- `PG_DUMP_BIN`
- `PG_RESTORE_BIN`
- `BACKUP_STALE_HOURS`
- `ALLOW_DATABASE_RECOVERY`
- `RECOVERY_TARGET_ENVIRONMENT`

Do not add invented provider keys.

## Latest staging defect fixed

A real AI Assistant request exposed `column v.reorder_level does not exist`. The deployed database follows the canonical inventory model in which reorder thresholds are stored in `inventory_reorder_rules`, not `product_variants.reorder_level`. The AI low-stock grounding query has been corrected accordingly.

Before the next rezip/deployment, repeat the full cumulative audit and specifically test the AI grounding query against the real PostgreSQL schema.

## Immediate next step — real staging validation

Do not add another major feature until the deployed application is validated.

### 1. Deploy the corrected build

Connect the corrected repository to the staging/deployment service and configure the required non-domain environment variables.

### 2. Validate the frontend

Open every major module and specifically verify:

- AI Assistant
- AI Business Intelligence
- AI Reports
- AI Training
- AI Schedules
- Integration Hub
- Integrations
- Webhooks
- Integration Events
- Integration Deliveries
- Media Management
- System Operations
- Monitoring & Observability
- Backup & Recovery

The previous `aiView is not defined` and `integrationView is not defined` errors must not return.

### 3. Validate Gemini for real

With a real `GEMINI_API_KEY` or supported `GOOGLE_API_KEY`, also verify that AI requests complete within the configured timeout rather than hanging:

1. Open AI Business Intelligence.
2. Run **Test Gemini connection**.
3. Open AI Assistant.
4. Ask a question about live business data.
5. Confirm the answer is grounded in returned platform data.
6. Confirm the AI cannot mutate operational records.
7. Generate an AI report.

Do not mark Gemini as production-ready until the real request succeeds.

### 4. Validate PostgreSQL

Verify:

- connection
- migrations
- transactions
- indexes
- foreign keys
- operational workflows
- financial posting
- backup creation

### 5. Validate email

After the production sender/domain is ready, configure:

- `RESEND_API_KEY`
- `EMAIL_FROM`
- `APP_BASE_URL`

Then test invitation and password-reset email flows.

### 6. Domain configuration later

After domain acquisition configure:

- `APP_BASE_URL`
- `PUBLIC_WEB_ORIGINS`
- production email sender/domain
- HTTPS
- DNS
- webhook URLs
- OAuth callbacks only for integrations actually implemented

### 7. Final backup/restore validation

Only in the actual deployment environment:

- create a real PostgreSQL backup
- verify checksum
- verify backup freshness
- test an isolated restore
- document the result
- only then consider enabling controlled recovery

Never perform a destructive production restore as a test.

## Final rule

The next build must prioritize **real deployment validation and debugging of the cumulative platform** over adding another large feature. Any newly discovered cross-module defect must be fixed and regression-tested before continuing.


## AI responsiveness hardening

The AI chat path now uses Gemini Interactions API with `thinking_level: low`, a 30-second server-side request timeout, and a 45-second browser timeout. If Gemini or upstream networking stalls, the UI must show a clear timeout/error instead of remaining indefinitely on the loading state.


## Latest AI connectivity correction

The synchronous admin AI path was changed from the Interactions API to Google's standard `generateContent` REST endpoint. This is intentional: short operational questions should complete as a normal synchronous generation request, while the application retains clear timeout/error handling. Google documents `generateContent` for text generation and system instructions, including `gemini-3.7-flash` and low thinking configuration.

Before declaring AI production-ready, deploy this build and run **Test Gemini connection**. A successful test must return `READY`. If it times out again, inspect the Render service logs and confirm the API key/project restrictions, Gemini quota, model availability, and outbound HTTPS connectivity from Render. A timeout alone does not prove that the key is invalid; invalid authentication normally returns an HTTP error response.
