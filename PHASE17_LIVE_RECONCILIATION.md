# Phase 17 — Live Reconciliation Readiness

The canonical Amaal TV catalogue remains the source of truth. Production reconciliation is intentionally read-only until the exact live records are observed.

## Required live checks

1. Confirm database/project identity.
2. Inventory brands and TV products.
3. Identify `LG Global Star` versus `Global Star`.
4. Identify duplicate TV model identities, slugs and variant SKUs.
5. Map candidate duplicates to goods receipts, serialized units, orders, sales, returns and warranty claims.
6. Inspect role assignments and permission assignments.
7. Only after review, create a non-destructive correction plan.

## Safety rule

Do not reset, truncate, reseed destructively, or delete a record with business dependencies. Prefer canonical reassignment and archival. Historical records must remain auditable.

## Current connection state

The Neon project is now discoverable as `falling-smoke-22637586` / `Project name: amaal-telecoms` under the Amaal organization. The available connector runtime in this execution cannot invoke the SQL operation directly, so no live production query has been executed in this phase. The supplied read-only SQL is ready for execution when the SQL operation is available.
