# Continuation Prompt for the Next LLM

You are continuing the Amaal Telecoms Administration Platform for Amaal Telecoms, Uganda.

The current ZIP is the authoritative working source. Read the complete ZIP before coding. Preserve every working module and do not replace real workflows with mock screens.

## Business modules already present
Core Administration & Security; Catalog; Inventory; Suppliers & Procurement; Customers & CRM; Sales & POS; Orders & E-commerce; Web & Hosting; Pricing & Promotions; Delivery & Logistics; Warranty & Repairs; Returns & Refunds; Document Management; Credit & Installments; Finance & Accounting; Reporting & Business Intelligence; AI Business Intelligence; Integration Hub.

## Naming rule
Never create filenames such as `phase-19.js`. Use feature/module names such as `public-ai.js`, `integration-hub.js`, `delivery-logistics.js`, etc. Keep this rule for all future work.

## AI architecture
- Gemini is called only from server-side code.
- Current integration uses Google's Gemini Interactions API at the stable `/v1/interactions` endpoint.
- Default model: `gemini-3.7-flash`; model is configurable.
- Key is read from `GEMINI_API_KEY` or `GOOGLE_API_KEY` and never placed in browser code.
- Super Admin can edit AI configuration and governed training examples.
- Scheduled AI reports use live business snapshots and are saved in `ai_generated_reports`.
- Public website AI is exposed through `/api/public/ai/ask` and receives only published catalog data.
- AI is not allowed to directly mutate business records.

## Integration Hub architecture
- External connections are HTTPS-only.
- Private/link-local destinations are blocked to reduce SSRF risk.
- Integration secrets are encrypted at rest.
- Inbound/outbound webhooks support HMAC signatures.
- Every audited mutation is recorded in `integration_events`.
- Outbound webhook delivery is processed by the Integration Hub worker and stored in `integration_deliveries`.

## Security rules
- Keep server-side authorization authoritative.
- Preserve secure HttpOnly sessions, CSRF validation, trusted-device binding, MFA, ten-minute inactivity timeout and rate limiting.
- Never put Gemini or integration secrets in GitHub or frontend JavaScript.
- Browser developer tools are not a security boundary.

## Acceptance rules before delivering another ZIP
1. Run `node --check` on every JavaScript file.
2. Check every frontend `data-action` has a handler or is intentionally handled by a module.
3. Check every API route's permission exists in the permissions seed.
4. Check every SQL table/column used by new modules exists in `schema.sql` and is idempotent.
5. Check every visible button is clickable and produces a result or a clear error.
6. Check public AI cannot return private business data.
7. Check Gemini API failures degrade gracefully without exposing keys or raw provider errors to public users.
8. Check integration health tests cannot reach private network destinations.
9. Check webhook secrets are never returned to the browser.
10. Review the whole project for regressions before creating the ZIP.

Do not claim production verification unless a real test/production database was actually connected.
