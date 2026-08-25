# Production Authorization / IDOR Audit

Audit performed against the Phase 2 production-safety build. No database connection or live production request was used.

## Results

- Explicit application route registrations inspected: **541**
- Routes with authentication in handler chain (static heuristic): **524**
- Routes with permission middleware in handler chain: **522**
- Routes with Super Admin enforcement: **16**
- Confirmed unauthenticated administrative/data-management route: **0**
- Confirmed IDOR vulnerability: **0 from static inspection**
- Confirmed privilege-escalation vulnerability: **0 from static inspection**

## Intentional public endpoints

- `POST /webhooks/integrations/:endpointKey` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `POST /api/public/ai/ask` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /healthz` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/health` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `POST /api/setup` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/setup/status` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /recovery` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/recovery/status` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `POST /api/recovery/reset` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `POST /api/password/forgot` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/password/reset/validate` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `POST /api/password/reset` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/invitations/accept/:token` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `POST /api/invitations/accept` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /{*splat}` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/public/catalog/:slug` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.
- `GET /api/public/site/:slug` — reviewed as public/bootstrap/health/webhook endpoint; not classified as an IDOR by itself.

## Special authorization cases

- `POST /api/sales/approvals/:id/decision` is authenticated and performs approval-type-specific permission checks (`sales.approve_discount`, `sales.approve_price`, or `sales.reconcile`) inside the handler. The absence of generic `need()` middleware is intentional and was not changed.
- AI conversation message and conversation archive routes scope records through the authenticated user ID before access.
- Public catalog/site endpoints intentionally expose only published public content.
- Inbound integration webhooks authenticate through endpoint identity and optional HMAC signature; they are not user-session routes.

## Limitations

Static inspection cannot prove runtime authorization correctness for every role, token, tenant, or deployment configuration. A staging penetration test with separate low-privilege accounts remains required before production approval.

## Safety

No PostgreSQL commands, destructive operations, production requests, Gemini calls, or database mutations were performed during this audit.

## Phase 4 — Neon recovery safety hardening

- Recovery execution remains permanently disabled in the application.
- Recovery planning now requires `RECOVERY_TARGET_ENV` and defaults to the isolated `staging-recovery` environment.
- Production/live/primary recovery targets are explicitly rejected.
- Recovery planning requires `RECOVERY_DATABASE_URL`.
- `RECOVERY_DATABASE_URL` must differ from `DATABASE_URL`.
- For Neon, recovery should use a separate branch/database and never the production connection string.
- Local `BACKUP_DIR` is not treated as an off-site backup; durable independent storage remains an infrastructure responsibility.
- No PostgreSQL commands, live database connections, Gemini calls, or destructive operations were performed.
