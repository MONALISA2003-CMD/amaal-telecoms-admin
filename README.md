# Amaal Telecoms Admin System

Cumulative enterprise telecom retail administration platform.

## Current release
**Phase 39 — Global Search, UX & Operational Polish — audited, debugged and hardened**

This is a cumulative continuation build. The existing business modules, database architecture, security boundary and operational workflows are preserved.

### Phase 39 hardening delivered
- Global search remains permission-gated by `search.view`.
- Search results are now filtered by the caller's underlying module permission before any source query runs.
- Finance, credit, inventory, warranty, returns, delivery, procurement and document results are no longer exposed merely because a user has global-search access.
- Global-search health counts are also restricted to sources the current user is allowed to view.
- Search partial-result handling remains available when an authorized source fails.
- Search wildcard escaping was corrected so literal `%`, `_` and `\\` characters remain searchable without corrupting exact-match ranking.
- Ranked search continues to prioritize exact identifiers and direct matches.
- Search source queries continue to execute independently so one failing source does not discard successful authorized results.
- PostgreSQL trigram indexes and operational identifier indexes remain available through `global-search-ux.sql`.
- Responsive search UI, `/` shortcut, Enter-to-search, keyboard focus and result-row navigation remain intact.
- Existing cross-module routes were statically audited for registration/export consistency.
- Backend JavaScript syntax was checked across all application modules.
- Frontend JavaScript syntax was checked.
- Render preflight passed.
- No destructive database reset or operational-record mutation was introduced.

## Existing platform modules
Catalog · Inventory · Suppliers & Procurement · Customers & CRM · Sales & POS · Orders & E-commerce · Pricing & Promotions · Delivery & Logistics · Warranty & Repairs · Returns & Refunds · Document Management · Credit & Installments · Finance & Accounting · Reporting & Business Intelligence · AI Business Intelligence · Web & Hosting · Integration Hub · Workflow & Automation · Global Search, UX & Operational Polish

## Verification performed for this rezip
- All application `.js` files passed `node --check`.
- All registered business modules were imported and their registration functions executed against a route-registration harness.
- Render preflight passed.
- Global-search permission filtering was exercised with a mocked restricted permission set.
- Static schema/table-reference review was performed across the cumulative JavaScript and SQL files.
- Secret-pattern scan was performed.
- Only useful Markdown documentation is retained: `README.md` and `CONTINUATION.md`.
- `node_modules` and `.git` are excluded from the release archive.

## Deployment
- Node.js 20.x
- PostgreSQL
- Start command: `node render-preflight.js && node server.js`
- Apply `global-search-ux.sql` through the normal database migration/bootstrap process before relying on its Phase 39 indexes.
- Never package `node_modules`.
- Never commit secrets.
- Never reset PostgreSQL.
- Never mutate financial or operational records merely to make tests pass.

## Security boundary
MFA is intentionally deferred. This build does not implement, activate, redesign or extend MFA. Existing authentication, authorization, CSRF, session and security controls remain the active security boundary. Existing MFA-related artifacts are left untouched.

## Production verification boundary
Archive-level checks are not live Render or production PostgreSQL tests. After deployment, verify database migrations, permissions, search indexes, cross-module transactions and external integrations in the real environment.

See `CONTINUATION.md` for the exact next-build instructions.
