# Amaal Telecoms — Deep Audit & Fix Report

Date: 2026-08-24

## Reported failures fixed

### 1. AI Reports — `aiView is not defined`
Root cause: the AI renderer lived inside one JavaScript closure while the later module router lived inside another closure. The router referenced a function it could not see.

Fix: the AI and Integration renderers are now explicitly registered through `globalThis` and consumed by the later router. A defensive fallback message is also rendered instead of throwing a ReferenceError.

### 2. Integration Hub / Webhooks — `integrationView is not defined`
Root cause: same cross-IIFE scope problem as AI Reports.

Fix: explicit renderer registration and lookup.

### 3. Business Intelligence — `n is not defined`
Root cause: the extended BI/finance/credit module closure relied on the original top-level numeric helper. The module now owns its numeric helper explicitly.

Fix: local numeric conversion helper inside the reporting module closure.

### 4. Business Intelligence — `Internal server error`
Root cause identified in the project bootstrap: `server.js` previously executed only `schema.sql`. Newer feature SQL files existed in the project but were not automatically applied to an existing Render PostgreSQL database. That left feature tables/columns such as delivery-partner fields, repair-partner fields and reporting tables unavailable to their API queries.

Fix: startup now applies all idempotent feature SQL migrations on every boot, followed by backward-compatible `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` guards for core BI fields. Existing business data is preserved.

### 5. CSP-blocked inline image/picker handlers
Fix: website picker is now bound through JavaScript instead of an inline handler, and image fallback handlers use delegated JavaScript events rather than inline `onerror` attributes.

## AI layer

- Server-side Gemini key handling is preserved.
- Stable Gemini Interactions API endpoint: `/v1/interactions`.
- Default model: `gemini-3.7-flash`.
- `GEMINI_API_KEY` remains the primary Render secret; `GOOGLE_API_KEY` remains a compatibility fallback.
- Super Admin governance/training remains enforced.
- AI reports use live business snapshots and stored governed training examples.
- Scheduled reports remain enabled through the AI scheduler.
- Public AI receives only approved public catalog context.
- Public AI does not receive staff, customer, security, finance, audit or internal inventory data.

## Integration Hub

- Integration secrets remain encrypted server-side.
- HTTPS-only outbound destinations remain enforced.
- Private/link-local destinations remain blocked.
- Webhook HMAC signing/verification remains enabled.
- Webhook secrets are not returned to the browser.
- Integration event and delivery history remain connected to audited platform activity.

## Verification performed

- `node --check` passed for every JavaScript source file.
- `package.json` JSON validation passed.
- All server-side feature registration modules were imported and registered against a stub Express interface successfully.
- Recovery frontend was syntax checked separately and was intentionally excluded from the server-module import test because it is browser code.
- Source file inventory was reviewed before packaging.
- No API key, recovery token, encryption key or other secret was added to the ZIP.

## Important production boundary

This environment cannot log into the user's Render PostgreSQL instance or redeploy the service. Therefore this report does **not** claim live Render execution was verified. The ZIP is prepared for redeployment; after Render redeploys, the first health/setup/API checks should be run before accepting the production build.
