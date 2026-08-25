# Amaal Telecoms Admin System

Cumulative enterprise telecom retail administration platform.

## Current release
**Phase 39 — Global Search, UX & Operational Polish (audited and strengthened)**

This archive is a cumulative continuation build. Existing business modules and operational data architecture are preserved; this phase strengthens the existing Phase 39 implementation rather than rebuilding the platform.

### Phase 39 delivered in this archive
- Global search across operational domains with permission enforcement.
- Ranked search results prioritizing exact identifiers and stronger matches.
- Parallel search execution so one slow source does not block all results.
- Partial-result reporting when an individual search source fails.
- Search health endpoint with source counts and timestamp.
- PostgreSQL `pg_trgm` indexes for efficient partial text lookup where supported.
- Search indexes for operational identifiers including requisitions, invoices, deliveries, warranty claims, returns, credit accounts and finance journals.
- Responsive search workspace with keyboard-friendly interaction.
- `/` keyboard shortcut to focus global search.
- Enter-to-search behavior.
- Accessible focus states for search results.
- Existing loading, empty and error states retained.
- No destructive migrations or database reset.

## Existing platform modules
Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence · AI Business Intelligence · Web & Hosting · Integration Hub · Workflow & Automation · Global Search, UX & Operational Polish

## Deployment
- Node.js 20.x
- PostgreSQL
- Start command: `node render-preflight.js && node server.js`
- Never package `node_modules`.
- Never commit secrets.
- Do not reset PostgreSQL.
- Do not introduce YAML as an application workaround.
- Apply `global-search-ux.sql` through the normal database migration/bootstrap process before relying on its search indexes.

## Security boundary
MFA is intentionally deferred. This phase does not implement, activate, redesign or extend MFA. Existing authentication, authorization, CSRF, session and security controls remain the active security boundary.

## Verification
The archive must pass the repository Render preflight before deployment. Live production PostgreSQL/Render behavior must be verified in the deployment environment; archive-level checks must not be represented as live-production testing.

See `CONTINUATION.md` for the exact next-build instructions.
