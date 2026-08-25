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

## Phase 40C status — Monitoring, Health & Observability

Phase 40C is now built and integrated. The cumulative system was audited before and after the implementation.

Implemented:
- application/API performance telemetry
- database health
- background-job telemetry
- integration failure telemetry
- notification backlog telemetry
- payment failure telemetry
- finance-posting telemetry with safe Unknown handling when no failure source exists
- inventory anomaly telemetry using actual inventory movement quantities
- alert rules with severity, threshold, cooldown and enabled state
- Open/Acknowledged/Resolved alert lifecycle
- alert deduplication/cooldown
- auditable monitoring snapshots
- permission-protected monitoring APIs
- responsive Monitoring & Observability UI
- System Operations integration

A Phase 40B defect was also corrected: job retry/cancel row locks are now executed inside real PostgreSQL transactions rather than using `FOR UPDATE` outside a transaction.

### Mandatory audit performed
- Full cumulative JavaScript syntax audit
- Route registration audit: **526 unique route signatures, no duplicates detected**
- Cross-module registration audit
- Security/authorization boundary review
- Monitoring schema/index review
- Canonical `purchase_requisitions` verification
- Legacy `procurement_requisitions` runtime reference check
- Render preflight
- MFA boundary verification

### MFA boundary
MFA is still completely excluded. Do not add, modify, activate, enforce or redesign MFA in the next phase.

## Next build — Phase 40D: Backup & Recovery

Before writing new code, perform the complete cumulative audit again. Then build Backup & Recovery as a controlled production capability.

### Backup scope
Build support for:
- PostgreSQL/database backups
- configuration backups where safe and appropriate
- media/file backup strategy
- scheduled backups
- manually initiated backups where safe
- backup history
- status
- size
- duration
- checksum/integrity verification
- verification status

### Retention
Implement explicit retention policies:
- daily
- weekly
- monthly

Never silently delete backups. Every retention/deletion action must follow the configured policy and be auditable.

### Recovery
Build a controlled recovery workflow with:
- backup selection
- integrity verification before recovery
- environment awareness
- explicit confirmation
- permission checks
- audit logging
- safe failure handling

Never expose arbitrary shell commands, arbitrary SQL execution or unrestricted filesystem access through the UI.

### Media recovery
Account for the Phase 40A database-backed media assets. Ensure backup and recovery preserves media metadata, relationships and binary data.

### Production safety
Do not perform destructive recovery automatically. Prefer a verified restore workflow and clearly separate backup creation, verification and restoration.

### Completion gate for Phase 40D
Do not declare Phase 40D complete until:
- backup schema/migrations are additive
- backup APIs exist and are permission-protected
- backup integrity verification exists
- retention policy exists
- recovery workflow exists with safeguards
- media backup/recovery is covered
- cumulative regression audit passes
- JavaScript syntax passes
- route duplicate check passes
- Render preflight passes
- README is updated
- this continuation prompt is replaced with the next exact continuation instructions
- only useful Markdown remains: `README.md` and `CONTINUATION.md`
- final ZIP integrity passes

Every rezip must follow:

**audit entire cumulative project → debug → build → regression test → remove obsolete Markdown → update README → create fresh CONTINUATION.md → verify → ZIP**
