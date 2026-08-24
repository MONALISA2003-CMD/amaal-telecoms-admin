# Amaal Telecoms Administration Platform

Mobile-first administration platform for **Amaal Telecoms, Uganda**.

## Business modules

Core Administration & Security · Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Web & Hosting · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence.

The codebase uses business/module filenames rather than numbered phase filenames so future maintenance can target the actual feature area.

## Reporting & Business Intelligence

The BI layer is connected to operational data and provides:
- Executive KPIs
- Date-range sales trend
- Product/variant margin analysis
- Inventory ageing
- Delivery partner performance and unit cost
- Warranty/repair partner performance
- Customer performance
- Category performance
- Procurement/supplier performance
- Returns and refund analysis
- Credit ageing
- Finance/account performance
- Saved management snapshots
- CSV exports

## Security

Secure HttpOnly sessions, trusted-device binding, CSRF protection, MFA/TOTP, ten-minute inactivity timeout, session revocation, rate limiting, audit/security events and least-privilege permissions are implemented server-side.

Browser developer tools cannot be made impossible by a web application. The platform therefore treats the browser as untrusted and enforces authorization and validation on the server.

## Administrator recovery

Open `/recovery`. The page is always reachable, but destructive recovery is enabled only when `ADMIN_RECOVERY_TOKEN` exists in the deployment environment. The recovery process preserves business records, revokes security access, deletes administrator users when PostgreSQL permits it, and otherwise safely suspends business-linked historical users. First-time setup is explicitly reopened by the recovery state flag. Remove/rotate the token immediately after recovery.

## Deployment

Node.js 20.x + Express 5 + PostgreSQL/Neon-compatible database.

Keep the combined admin service on Render during acceptance. Introduce Vercel later for a separate public frontend or deliberately adapted serverless component.

## Documents

Documents are stored in PostgreSQL-backed binary storage rather than the ephemeral Render filesystem. Supported uploads include PDF, JPG/JPEG, PNG, WEBP, TXT, CSV, DOCX and XLSX, with a 15 MB per-file upload limit.

## Testing

Use the Render root URL as the primary client testing surface. From the mobile dashboard, open every module and exercise create/update/view workflows. Use real test records to verify cross-module reporting.

No mock business records are generated automatically.

## AI Business Intelligence

The AI layer uses Google's current stable Gemini Interactions API v1 through a server-side HTTP call to the stable `/v1/interactions` endpoint. The current default model is `gemini-3.7-flash`; the model is configurable by Super Admin. The Gemini key is read only from `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) and is never sent to browser code.

Google is transitioning Gemini API authentication from standard keys to authorization keys; new AI Studio keys are authorization keys and unrestricted standard keys are being rejected. Before September 2026, use a current restricted/auth key and keep it in Render Environment, not GitHub. See the official Gemini key documentation: https://ai.google.dev/gemini-api/docs/api-key

Super Admin can govern AI through AI Business Intelligence:
- Enable/disable AI.
- Select the Gemini model.
- Update the private management system prompt.
- Update the public-website system prompt.
- Add/update/disable governed training examples.
- Create scheduled management reports.
- Generate on-demand reports.
- Review saved AI reports and data snapshots.

This is governed prompt/context training rather than hidden fine-tuning. AI does not receive unrestricted database access and cannot directly mutate business records.

## Public website AI

`POST /api/public/ai/ask` is a rate-limited, public-safe gateway. It supplies only published catalog data to Gemini and explicitly blocks disclosure of internal operational, financial, employee, customer, supplier and security information. It is intended to be called by the future public website without exposing the Gemini key.

## Integration Hub

Integration Hub provides:
- HTTPS-only external connection registry.
- Encrypted integration secrets at rest.
- SSRF protection against localhost/private/link-local destinations.
- Connection health tests.
- Inbound and outbound signed webhooks.
- Integration event stream derived from audited platform activity.
- Webhook delivery history and response timing.
- Mobile administration screens.

Set `INTEGRATION_ENCRYPTION_KEY` to a long random secret in Render. If it is absent, the platform derives the encryption key from `JWT_SECRET`; set the dedicated variable before production use.

For a separate Vercel/public website, set `PUBLIC_WEB_ORIGINS` on Render to the exact HTTPS origin(s) of the public website. The public AI endpoint is the only intentionally cross-origin API surface; admin APIs remain same-origin protected.
