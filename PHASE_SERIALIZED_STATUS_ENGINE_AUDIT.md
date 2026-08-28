# Amaal Telecoms — Serialized Physical-Unit Status Engine Audit

## Phase
Physical-unit history and status engine hardening

## Verified against
- Existing PostgreSQL schema and additive serialized migration
- Render backend modules
- Business Admin stock/order/delivery/service workflows
- Existing audit scripts

## Scope
A physical serialized unit must retain one continuous operational identity from receiving through warehouse movement, reservation, sale, delivery, return and service/warranty activity.

## Findings and fixes

### 1. Central lifecycle guard
The application uses `serialized-unit-lifecycle.js` as the common transition service and PostgreSQL retains the final transition trigger.

### 2. Receiving history attribution
Goods-receipt-created units now set `app.actor_id` before insertion so the automatic lifecycle history row records the receiving user.

### 3. Stocktake discovery attribution
Units discovered during stocktake now record the responsible user and are explicitly tagged as `InventoryStocktake` history.

### 4. Inventory incident discovery attribution
Units created while resolving a serialized inventory incident now record the responsible user and `InventoryIncident` source context.

### 5. Order cancellation
Order cancellation no longer directly updates serialized-unit status. Reserved units are selected/locked and moved through the lifecycle service, producing an authoritative history event.

### 6. Sale void
Sale void no longer directly updates serialized-unit status. Sold units are selected/locked and returned through the lifecycle service with `SaleVoid` provenance.

### 7. Workflow ownership
Manual status changes remain restricted to operational states. Order, sale, transfer, receiving, return and delivery-owned transitions are not exposed as arbitrary manual changes.

### 8. History API
Business Admin can retrieve the physical-unit history timeline together with order, sale, warranty and return relationships.

## Audit result
- Serialized status/history audit: **19/19 PASS**
- Exact order-unit assignment: **20/20 PASS**
- Serialized inventory audit: **16/16 PASS**
- Warehouse transfer audit: **15/15 PASS**
- Receiving/batch audit: **15/15 PASS**
- Fulfilment/delivery audit: **14/14 PASS**
- Transaction integrity audit: **12/12 PASS**
- Cross-module audit: **18/18 connected; 0 unmatched frontend routes**
- Top-level JavaScript syntax: **PASS**

## Database safety
No reset, truncate, drop, replacement database, destructive reseed, or historical transaction deletion was performed.

No schema migration was required for this hardening increment; the existing lifecycle history schema and transition triggers were reused.

## Remaining verification limitation
A live production database execution was not performed from the extracted working environment. Production Neon must be treated as unchanged until a controlled connection is available.

## Next phase
Returns / warranty / service reconciliation using the physical unit as the identity anchor, with special attention to disposition, repair completion, resale eligibility and preservation of the original sale history.
