# Amaal Telecoms Admin System — Continuation Prompt

## Current cumulative state

The project is now at:

**Phase 40B — System Operations — built, audited and integrated.**

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
7. Import every registration module and execute it against a route-registration harness.
8. Check for duplicate route signatures.
9. Run `node render-preflight.js`.
10. Check for forbidden legacy `procurement_requisitions` runtime references.
11. Review security boundaries, authorization, CSRF, file access and sensitive-data exposure.
12. Remove useless or obsolete Markdown files.
13. Keep only useful `README.md` and `CONTINUATION.md` documentation.
14. Update `README.md` to describe the actual cumulative release.
15. Replace this file with the exact next continuation instructions.
16. Only then create the new ZIP.

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

## Phase 40A status — Media Management

Completed and preserved:

- Enterprise media asset model
- Media folders
- Media tags
- Media relationships
- Media version history
- SHA-256 duplicate detection
- Server-side MIME/content validation
- Image dimensions
- 15 MB upload limit
- Private authenticated media delivery
- Explicit Public + Active media delivery
- Metadata management
- Search/filtering
- Bulk tagging
- Bulk archive
- Admin Media Library UI
- Media permissions
- Global Search integration
- Audit/integration-event recording

The existing Web & Hosting `web_media` system remains intact. Do not delete or silently replace it.

## Phase 40B status — System Operations

Completed:

- System Operations control plane
- Application/API/database/media/integration/notification health checks
- Healthy/Warning/Critical/Unknown normalization
- Background job telemetry schema and UI
- Safe retry/cancel controls guarded by explicit job safety flags
- Scheduled task management and audit logging
- Safe operational configuration management
- Existing feature-flag integration
- Operations event storage
- Operations permissions
- Existing authentication, permission and audit infrastructure integration

Do not introduce arbitrary SQL execution, arbitrary code execution or unsafe job execution.

## Next build — Phase 40C: Monitoring, Health & Observability

First perform the mandatory cumulative audit above. Then extend the existing System Operations control plane into a proper Monitoring and Observability layer.

Do not replace `/api/operations/health`. Extend and normalize it where appropriate.

### Application monitoring

Add actionable visibility for:

- request health
- API error rates
- response-time indicators
- slow-request indicators
- application exceptions
- route-level failures where safely measurable
- recent operational incidents

Do not expose stack traces, secrets, SQL, tokens or internal credentials to ordinary administrators.

### Database monitoring

Add safe indicators for:

- database connectivity
- query failures
- transaction failures
- connection-pool pressure where available
- slow-query indicators where safely measurable

Do not expose raw SQL debugging consoles.

### Background jobs

Strengthen the existing operations job telemetry with:

- queue depth
- failure rate
- retry rate
- processing duration
- stale-running-job detection
- recent failures
- operational trend indicators

Do not invent execution history. Only show records that actually exist.

### Integration monitoring

Integrate with the existing Integration Hub to surface:

- failed webhooks
- failed API calls
- timeouts
- retry counts
- dead-letter events
- pending delivery backlog
- integration connections in Error state

Respect integration permissions and never expose integration secrets.

### Storage monitoring

Add:

- media/storage usage indicators
- upload failures
- storage availability
- backup status when Phase 40D exists

Do not expose private media contents merely for monitoring.

### Business-operation monitoring

Surface actionable anomalies already represented by actual platform data, including:

- failed payments
- failed orders
- failed deliveries
- negative-stock attempts
- stock synchronization failures
- reconciliation failures
- failed financial postings
- overdue background tasks

Never fabricate business anomalies.

### Alerting

Build configurable alerts for important operational conditions.

Each alert should support:

- severity
- threshold
- notification channel
- recipients
- cooldown
- acknowledgement
- resolution
- history

Prevent alert storms through cooldown/deduplication.

Alert actions must be permission-protected and audited.

### Monitoring UI

Extend System Operations with:

- Health overview
- Application monitoring
- Database monitoring
- Jobs monitoring
- Integrations monitoring
- Storage monitoring
- Business anomalies
- Alerts
- Incident history

The UI must remain responsive on desktop, tablet and mobile.

## Database rules

Use additive migrations only.

Preserve all existing records.

Preserve canonical `purchase_requisitions`.

Never reintroduce `procurement_requisitions` into runtime code.

## Completion gate for Phase 40C

Do not begin Backup & Recovery until Monitoring & Observability has:

- additive database schema/migration
- backend monitoring APIs
- authorization
- safe operational visibility
- alert configuration and history
- integration with System Operations
- integration with Integration Hub
- cumulative regression audit
- JavaScript syntax pass
- module registration pass
- duplicate-route check
- Render preflight pass
- README update
- fresh continuation prompt
- clean rezip

The next archive must again contain only useful Markdown documentation: `README.md` and `CONTINUATION.md`.
