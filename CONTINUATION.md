# Amaal Telecoms Admin System — Phase 39 Continuation Prompt

## Starting point

This archive is the cumulative Amaal Telecoms Admin System after **Phase 39 — Global Search, UX & Operational Polish**, with a strengthening pass applied.

Do not rebuild the project. Inspect the cumulative codebase first and continue from the existing architecture.

## What Phase 39 now contains

- Authenticated global search protected by `search.view`.
- Search across products/SKUs, customers, suppliers, sales, orders, IMEI/serial records, documents, requisitions, supplier invoices, deliveries, warranty claims, returns, credit accounts and finance journals.
- Ranked search results with stronger weighting for exact identifiers and direct matches.
- Parallelized source queries so one failed source does not discard successful results.
- Explicit partial-result reporting through `partial` and `failedSources`.
- Search health endpoint with source counts and check timestamp.
- PostgreSQL trigram indexes for partial text search plus identifier indexes.
- Responsive search UI.
- Keyboard `/` shortcut to focus global search.
- Enter-to-search behavior.
- Keyboard-accessible result rows and visible focus states.
- Existing loading, empty and error patterns preserved.

## Phase 39 audit requirements

Before adding Phase 40 functionality, inspect the entire cumulative application again.

Audit:

- API authorization boundaries
- Search permission enforcement
- Search result data leakage
- Query parameterization
- Wildcard escaping
- Search limits
- Query performance
- Database index compatibility
- PostgreSQL extension availability
- Responsive behavior
- Keyboard navigation
- Loading states
- Empty states
- Error states
- Cross-module navigation
- Existing module regressions
- Frontend syntax
- Backend syntax
- Migration safety

If a Phase 39 weakness is found, fix it before starting the new Phase 40 modules.

## Important architecture rules

Preserve canonical `purchase_requisitions`.

Never reintroduce `procurement_requisitions` into runtime code.

Use additive and safe database migrations.

Never reset PostgreSQL.

Never delete or mutate operational records merely to make tests pass.

Never introduce YAML as an application workaround.

Never package `node_modules` or `.git`.

Never commit secrets.

## MFA — STRICTLY OUT OF SCOPE

Do not implement MFA.

Do not create MFA tables, APIs, middleware, TOTP, recovery codes, trusted-device flows, MFA screens or partial MFA functionality.

Existing MFA-related artifacts must not be expanded or activated.

MFA remains deferred until after domain acquisition, deployment, public testing and production feedback.

## Next build sequence

After Phase 39 verification, continue with the combined Phase 39 + Phase 40 hardening cycle in this order:

1. Complete the cumulative cross-module audit.
2. Build Media Management.
3. Build System Operations.
4. Build Monitoring, Health and Observability.
5. Build Backup and Recovery.
6. Strengthen security findings discovered during the audit without touching MFA.
7. Run full cross-module regression checks.
8. Run static schema/index compatibility checks.
9. Run authorization and secret scans.
10. Run Render preflight.
11. Update `README.md`.
12. Replace this `CONTINUATION.md` with the next exact continuation prompt.
13. Remove obsolete/useless Markdown files before packaging.
14. Produce a clean cumulative ZIP without `node_modules` or `.git`.

## Verification standard

A successful archive build must distinguish static/archive verification from live deployment verification.

Never claim live Render or production PostgreSQL testing unless it was actually performed.

The final archive should contain only useful Markdown documentation, specifically:

- `README.md`
- `CONTINUATION.md`
