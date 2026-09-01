# Amaal Telecoms — Continuation

## Current state
Amaal Telecoms is an existing cumulative business-management platform. Do not rebuild it from scratch.

The current architecture is:

PUBLIC WEBSITE
→ Published Catalogue
→ Business Admin
→ Existing Render Business Engine
→ PostgreSQL
↑
Technical Console / Existing Business Engine

PostgreSQL remains the authoritative business data source.

## Already built
- Business Admin shell with vertical, role-aware navigation.
- Dashboard and Live Business Pulse.
- Products, variants, catalogue, categories, brands and collections.
- Stock, warehouse, locations, reservations, transfers and inventory controls.
- Serialized inventory and physical-unit management.
- Purchasing, suppliers, requisitions and purchase orders.
- Goods receipts and supplier invoice/payment workflows.
- Customers/CRM.
- Sales/POS.
- Orders and fulfilment.
- Delivery.
- Finance and credit.
- Returns, warranty and service.
- Website management.
- Reports/business intelligence.
- Team, permissions, governance, security and supporting operational modules.

## Serialized inventory foundation
The physical-unit model is:

PRODUCT
→ VARIANT
→ PHYSICAL SERIALIZED UNIT

Serialized units may contain:
- IMEI 1
- IMEI 2
- Serial number
- Barcode
- QR value
- Batch
- Supplier
- Purchase reference
- Unit cost
- Location
- Status
- Warranty/service information
- Notes

Public catalogue responses must never expose these private operational fields.

## Completed in the latest increment — Receiving / Batch Integration
Purchase-order receiving is now integrated with the inventory batch model.

### Receiving workflow
Purchase Order
→ Goods Receipt
→ Batch
→ Physical Inventory Unit
→ Inventory Balance
→ Inventory Movement

For serialized products:
Purchase Order
→ Goods Receipt
→ Batch
→ Exact physical units
→ Warehouse/location

### What was strengthened
- Every purchase-order receipt line creates an inventory batch.
- Batch provenance links purchase order, purchase-order line, goods receipt and supplier.
- Accepted and rejected quantities are recorded separately.
- Only accepted quantity enters stock.
- Purchase-order received quantity advances by accepted quantity.
- Serialized units are linked to their batch.
- Batch numbers are collision-protected.
- Serial/IMEI/barcode/QR identifiers are checked across all identifier fields for duplicates.
- Goods receipt detail exposes batch provenance to authorized staff.
- Legacy stock receipt records remain linked to the same batch.
- Receipt cancellation preserves history: batch becomes Cancelled and physical units become Voided instead of being deleted.
- Business Admin receiving no longer relies on a JSON-only form.
- Serialized receiving supports manual records, CSV-style records and real camera scanning where browser/device support exists.

## Current verification
- Render preflight: PASS.
- Receiving/batch audit: PASS — 15/15.
- Serialized inventory audit: PASS — 16/16.
- Cross-module audit: PASS — 104 frontend API references, 564 backend routes, 0 unmatched routes, 18/18 cross-module checks connected.
- JavaScript syntax: PASS for all top-level JavaScript files checked.
- Full production build: not verified in the extracted environment because dependencies are unavailable.
- Live database integration test: not run because no controlled database connection was configured.

## Documentation cleanup
The following redundant historical documents were removed after their useful information was consolidated:
- `CATALOGUE_MANAGEMENT_BUILD.md`
- `PLAN_UPDATE_NOTES.md`
- `PRODUCT_ADMIN_README.md`
- `SETUP_FIX.md`
- `VERCEL_BUILD_NOTES.md`
- `apps/business-admin/VERCEL_BUILD_NOTES.md`

Do not remove `Amaal_plan.md`. It is the retained master plan.

## Completed in the latest increment — Exact Unit Order Assignment
The order workflow now binds a serialized order line to the exact physical inventory unit that will fulfil it.

### Assignment workflow
Paid/fulfillable Order
→ Order line
→ Available physical units at order location
→ Search or camera scan
→ Exact unit assignment
→ Unit status Reserved
→ Fulfilment
→ Unit status Sold

### What was strengthened
- Added an authorized available-unit endpoint scoped to the order line, variant and order location.
- Available-unit search supports serial, IMEI 1, IMEI 2, barcode and QR values.
- Already assigned physical units are excluded from the available list.
- Assignment locks both the order and selected unit inside one transaction.
- Database uniqueness remains the final protection against assigning one physical unit to multiple orders.
- Assigned physical units move to `Reserved` so their operational state matches the order assignment.
- Unassignment is supported before dispatch and restores the physical unit to `In Stock`.
- Order cancellation releases both the quantity reservation and assigned physical units.
- Fulfilment accepts the assigned `Reserved` unit and changes that same unit to `Sold` without creating a replacement record.
- Business Admin now provides searchable exact-unit assignment plus real camera scanning with manual/search fallback.

### Important limitation preserved
Production Next.js build and live database execution were not performed in the extracted working environment because dependencies/database credentials are not available. No production database was contacted or changed.

### Current verification
- Order serial assignment audit: PASS — 20/20.
- Render preflight: PASS.
- Cross-module audit: PASS — 104 frontend API references, 568 backend routes, 0 unmatched routes, 18/18 connections.
- Receiving/batch audit: PASS — 15/15.
- Serialized inventory audit: PASS — 16/16.
- Warehouse transfer audit: PASS — 15/15.
- JavaScript syntax: PASS for all top-level JavaScript files checked.
- No database migration was required for this increment; existing `order_serial_units` uniqueness was reused.

## Completed in the latest increment — Physical Unit History / Status Engine Hardening
The serialized physical-unit lifecycle has been hardened so workflow-owned status changes consistently pass through the shared lifecycle service while PostgreSQL remains the final enforcement layer.

### Changes made
- Goods-receipt-created units now attribute lifecycle history to the receiving user.
- Stocktake-discovered units now record `InventoryStocktake` provenance and actor context.
- Incident-created units now record `InventoryIncident` provenance and actor context.
- Order cancellation now releases reserved serialized units through the lifecycle service instead of a direct status update.
- Sale void now returns sold serialized units through the lifecycle service instead of a direct status update.
- Existing manual status restrictions remain in place for workflow-owned states.
- Physical-unit history endpoint continues to expose the lifecycle ledger and related order/sale/warranty/return records.

### Current verification
- Serialized status/history audit: PASS — 19/19.
- Exact unit order assignment: PASS — 20/20.
- Serialized inventory audit: PASS — 16/16.
- Warehouse transfer audit: PASS — 15/15.
- Receiving/batch audit: PASS — 15/15.
- Fulfilment/delivery audit: PASS — 14/14.
- Transaction integrity audit: PASS — 12/12.
- Cross-module audit: PASS — 18/18 connected, 0 unmatched frontend routes.
- Top-level JavaScript syntax: PASS.

### Limitation
The live production Neon database was not contacted or modified from the extracted environment.

## Highest-priority next work
### 1. Returns / warranty / service reconciliation
Use IMEI/serial as the reliable identity anchor through return receipt, inspection, disposition, repair and warranty closure. Preserve the original sale/order history and prevent an item from being simultaneously treated as returned, in service and available.

### 2. Reports / Business Intelligence
Audit report field contracts and date ranges against the real business tables. Remove any fabricated KPI/chart values and ensure loading, empty, error and permission states are real.

### 3. Production verification
Run the full production dependency build and controlled staging database tests when the deployment environment and database connector are available.

### 4. TV catalogue production reconciliation
After controlled Neon access is available, inspect existing TV records against `MASTER_TELEVISION_PRODUCT_CATALOG.md`, consolidate true duplicates, archive referenced obsolete records, and correct the canonical `Global Star` brand without deleting business history.

## Database rules
NEVER:
- reset PostgreSQL
- truncate tables
- drop the production database
- replace the database
- create a second business database
- destructively reseed existing records
- delete historical business transactions

Use additive, repeat-safe migrations only.

## Public privacy rules
Public website may show:
- product
- price
- description
- images
- public specifications
- public availability

Public website must not show:
- IMEI
- serial number
- barcode
- QR value
- batch number
- supplier
- supplier reference
- purchase cost
- warehouse location
- physical-unit history
- customer-sensitive information
- exact remaining quantity unless explicitly approved

## Development rules
Before every future module:
1. Inspect existing Business Admin.
2. Inspect the Technical Console/business engine equivalent.
3. Inspect backend routes and database relationships.
4. Compare existing functionality before adding anything.
5. Reuse authoritative business logic.
6. Build the complete business workflow, not only the screen.
7. Connect related modules.
8. Test real behaviour and failure cases.
9. Audit permissions and public/private boundaries.
10. Run regression checks across the whole project.
11. Update `AUDIT_REPORT.md` and this continuation document.
12. Preserve `Amaal_plan.md`.
13. Only create the final ZIP after build/test/debug/audit/regression/documentation/integrity checks.

## Next-LLM continuation prompt
You are continuing Amaal Telecoms. Do not rebuild or reset anything.

Start with **fulfilment/delivery reconciliation for exact serialized units**. Inspect the existing order, sales, fulfilment and delivery workflows first. Ensure the exact reserved physical unit assigned to an order is the same unit fulfilled, dispatched and sold, and that delivery completion cannot leave a serialized unit in Reserved or In Stock incorrectly. Then run the full serialized inventory, lifecycle/history, cross-module, security/privacy, database-safety and regression audits. Continue into returns/warranty/service traceability only after fulfilment integrity is verified.


## 27 Aug 2026 — Warehouse Transfers hardening

### What is already built
- Serialized inventory uses Product → Variant → Physical Unit.
- Receiving creates inventory batches and links serialized units to those batches.
- Warehouse locations, stock balances, movements and transfer records already exist.
- Transfer backend supports Submitted → Approved → Shipped → Received.

### What was just built
- Business Admin transfer requests now load the actual serialized units available at the source warehouse.
- Serialized transfer lines require the exact number of physical units requested.
- Operators can search IMEI, serial, barcode and QR values and select individual units.
- Real device camera scanning can identify an available physical unit during transfer, with manual/search fallback.
- Transfer controls now expose Approve, Ship and Receive actions according to permission and transfer state.
- Added a transfer detail API.
- Transfer shipping now requires an approved request; ship-time revalidation checks every selected serialized unit inside the transaction before moving it to `Transferred`.
- Duplicate physical identifiers are tracked across all lines of a transfer, preventing the same unit/identifier from being selected twice in one request.
- Receive no longer creates a new serialized unit if the expected unit is missing. A missing/inconsistent unit now fails the whole receipt transaction.
- Identifier matching for transfers includes serial, IMEI 1, IMEI 2, barcode and QR.
- Added `warehouse-transfer-audit.js` and an `audit:transfers` verification script.

### What remains incomplete
- Exact-unit assignment from Orders/Sales is still the next major fulfilment gap.
- Physical-unit lifecycle/history should be hardened after fulfilment integration.
- Full production Next.js build remains environment-dependent when dependencies are unavailable.

### Known limitations
- Camera barcode support depends on browser `BarcodeDetector` support and HTTPS/device permissions.
- No production PostgreSQL writes were performed during this change.
- Transfer approval/shipping/receiving was statically and syntactically verified; a live production transaction was not executed.

### Must NOT be changed
- Do not reset, truncate, drop or replace PostgreSQL.
- Do not delete historical inventory, transfer, sale, purchase or customer records.
- Do not create a second inventory source of truth.
- Do not fabricate transfer or inventory activity.
- Preserve `Amaal_plan.md`.

### Next recommended build
**Orders/Sales → exact serialized-unit assignment → fulfilment → delivery**, using the same physical-unit records and backend transaction rules.


## 27 Aug 2026 — Physical Unit & Status Engine hardening

### What was just built
- Added an additive `serialized_unit_status_history` ledger for every serialized physical unit.
- Added repeat-safe lifecycle triggers that record unit creation and every status/location change.
- Added a non-destructive migration baseline for existing serialized units so previously existing records receive a starting lifecycle entry without altering the units themselves.
- Added database-level status transition enforcement so invalid physical-unit state changes are rejected regardless of which backend workflow performs the update.
- Kept workflow-owned states controlled by their business workflows rather than exposing arbitrary manual status changes.
- Strengthened the Business Admin status endpoint to allow only operational exception transitions appropriate for authorized inventory staff.
- Expanded the physical-unit history endpoint to return lifecycle history plus linked orders, sales, warranty claims and returns.
- Added a Business Admin physical-unit history view with current location, batch, lifecycle timeline and controlled status actions.
- Fixed delivery completion so an exact unit already reserved for an order can transition to Sold; it no longer silently ignores Reserved units.
- Added `serialized-status-history-audit.js` and `audit:serialized-status`.

### Status model
The authoritative engine now recognizes controlled transitions including:
- In Stock → Reserved / Sold / Transferred / Damaged / Lost / Returned / Service / Voided
- Reserved → In Stock / Sold / Returned / Service / Damaged / Lost
- Sold → In Stock / Returned / Service
- Transferred → In Stock / Lost
- Returned → In Stock / Sold / Service / Damaged / Lost
- Service → In Stock / Sold / Returned / Damaged / Lost
- Damaged → Service / In Stock / Lost
- Lost → In Stock / Service / Damaged
- Voided is terminal.

Business Admin does not permit arbitrary manual jumps through workflow-owned states such as Sold, Reserved or Transferred.

### Verification
- Serialized status/history audit: **14/14 PASS**.
- Receiving/batch audit: **PASS — 15/15**.
- Serialized inventory audit: **PASS — 16/16**.
- Warehouse transfer audit: **PASS — 15/15**.
- Exact order serial assignment audit: **PASS — 20/20**.
- Cross-module audit: **PASS — 18/18**, 0 unmatched frontend routes.
- Render preflight: **PASS**.
- All 32 root JavaScript files: **syntax PASS**.
- No production PostgreSQL connection was made.
- Production Next.js build remains **not verified** because dependencies/node_modules are unavailable in the extracted environment.

### Known limitation
Lifecycle history created by the new database trigger can identify the actor when a transaction sets `app.actor_id`; existing business workflows that have not yet adopted that session setting may show `System` as the lifecycle actor while the broader application audit log still records the authenticated user. This is intentionally non-destructive and does not block the lifecycle ledger.

### Must NOT be changed
- Preserve all PostgreSQL records.
- Never reset, truncate, drop or replace the business database.
- Never delete serialized-unit history to simplify workflows.
- Never expose private physical-unit information through the public website.
- Preserve `Amaal_plan.md`.

### Next recommended build
**Fulfilment/delivery reconciliation** — verify that the exact serialized unit assigned to an order remains the same unit through picking, dispatch, delivery and final sale state.


## 27 Aug 2026 — Fulfilment & Delivery Reconciliation

### What was just built
- Added an additive `delivery_shipment_serial_units` ledger linking each delivery shipment to the exact physical units already assigned to its order.
- Backfilled existing shipments from authoritative `order_serial_units` without deleting or replacing historical records.
- Delivery creation now requires every serialized order line to have all required physical units assigned and still Reserved.
- Shipment detail now exposes the exact physical units, batch and current unit state to authorized Business Admin users.
- Delivery progression validates that serialized units remain Reserved before pickup/in-transit/out-for-delivery progression.
- Delivery completion requires the shipment to contain every serialized physical unit and requires those units to still be Reserved before atomically marking the same units Sold.
- Order dispatch now requires complete serialized-unit assignment.
- A physical unit cannot be unassigned from an order while attached to an active delivery shipment.
- Failed deliveries can return to the dispatch workflow without destroying physical-unit identity; cancelled/returned shipments can be replaced by a new shipment for the same order.
- Added `fulfilment-delivery-audit.js` and `audit:fulfilment-delivery`.

### End-to-end physical-unit chain
**Purchase → Receiving → Batch → Physical Unit → Warehouse → Transfer → Order → Exact Unit Assignment → Reserved → Delivery Shipment → Pickup/Transit → Delivery → Sold**

### Verification
- Fulfilment/delivery reconciliation audit: **14/14 PASS**.
- JavaScript syntax checks for changed backend files: **PASS**.
- Existing serialized, receiving, transfer, order-assignment and cross-module audits remain required regression gates.
- No production PostgreSQL connection or write was performed.
- Production Next.js build remains **not verified** where dependencies are unavailable.

### Known limitations
- Live delivery transactions were not executed against production PostgreSQL in this environment.
- Proof-of-delivery files/media remain represented by the existing proof reference fields; this change does not invent a fake photo/signature capture system.

### Must NOT be changed
- Preserve all existing business data and physical-unit history.
- Never reset, truncate, drop or replace PostgreSQL.
- Never create a competing inventory source of truth.
- Never expose private IMEI/serial, supplier, cost or warehouse data through the public catalogue.
- Preserve `Amaal_plan.md`.

### Next recommended build
**Returns → Warranty → Service reconciliation by exact physical unit**, ensuring the same IMEI/serial remains traceable after delivery and through every after-sales event.


## Phase 2 — Neon schema reconciliation

### Completed
- Re-checked the live Neon PostgreSQL schema against the current project SQL.
- Confirmed the production database has 201 public business tables.
- Confirmed the two serialized inventory lifecycle triggers are present.
- Rejected the earlier unverified claim of several specific column-level schema drifts; those columns are not present in the live database.
- Added `schema-reconciliation-audit.js` and the `audit:schema` package script for future live verification.
- No production schema migration was needed in this pass.

### Database safety
- No reset.
- No truncate.
- No destructive reseed.
- No existing business records changed.

### Remaining
1. Run the new schema audit with production dependencies installed.
2. Compare all constraint/index/function definitions against a canonical migration snapshot in a controlled Neon branch before making any schema changes.
3. Continue with physical-unit reservation/state integrity.
4. Then run cross-module transactional tests.

### Next LLM prompt
Continue Amaal ERP remediation from Phase 2. Do not reset Neon or delete business history. First verify the new schema-reconciliation audit with installed dependencies, then inspect and harden the serialized physical-unit reservation/state machine across Orders, Inventory, Sales, Fulfilment, Delivery, Returns, Warranty and Service. Use the existing database as authoritative and make only additive, tested changes.


## Phase 3 — Application-Side Serialized Unit Lifecycle Hardening (2026-08-27)

The serialized-unit workflow was hardened without changing the live Neon schema or business data. A shared `serialized-unit-lifecycle.js` guard now centralizes application-side transitions for order reservation/unassignment, fulfilment/delivery sale transitions, direct POS sale transitions, and manual status changes. Each transition locks the physical unit inside the caller transaction, validates the existing lifecycle, sets the authenticated actor context, updates the unit, and enriches the lifecycle-history row created by the existing PostgreSQL trigger. PostgreSQL remains the final status-transition enforcement layer.

No database reset, truncation, destructive migration, or business-data deletion was performed.

## Phase 3 safer-route completion — 2026-08-27

Implemented application-side serialized physical-unit lifecycle enforcement across orders, sales/POS, delivery, inventory, returns, warranty, purchasing, transfers, stocktakes, and inventory incidents.

### Current state
The existing Neon database remains unchanged. The centralized Render helper `serialized-unit-lifecycle.js` is now the application-side gate for serialized-unit status transitions. PostgreSQL remains the final enforcement layer.

### What remains
1. Run authenticated integration tests with real non-production/test fixtures.
2. Verify concurrency behavior under two simultaneous exact-unit reservation attempts.
3. Continue the wider audit with cross-module transaction integrity and security/privacy review.

### Must not be changed
- Do not reset/truncate Neon.
- Do not delete historical business records.
- Do not introduce a second serialized-unit status engine.
- Do not expose IMEI/serial/batch/supplier/internal inventory data through the public catalogue.
- Preserve `Amaal_plan.md`.

### Next LLM prompt
Continue Amaal Telecoms ERP audit from Phase 3 safer-route completion. First run authenticated end-to-end tests for serialized physical-unit lifecycle: receiving → In Stock → exact order reservation → release/cancel → fulfilment → delivery → Sold, plus return/warranty/service paths and concurrent duplicate assignment protection. Do not reset Neon or fabricate test results. Then proceed to cross-module transaction integrity audit.

## Latest continuation — 2026-08-28

### Just completed
- Added the canonical Master Television Product Catalog source data to the project.
- Added 7 canonical TV brands: TCL, Hisense, CHiQ, Samsung, LG, Global Star, Black Ark.
- Added 210 unique TV model/family entries and 236 catalogue variant rows from the supplied source.
- Added repeat-safe `tv-master-catalogue-sync.sql`.
- Connected Render startup to the TV master sync.
- Connected Business Admin starter catalogue data to the same TV master source.
- Added `tv-master-catalogue-audit.js` and `audit:catalog`.
- Preserved existing catalogue records and prices; no destructive catalogue cleanup was performed.

### Still pending
- Execute the prepared TV catalogue synchronization against live Neon once the database connector accepts the existing project identifier.
- Verify live product/variant counts after synchronization.
- Run an authenticated Vercel → Render → Neon catalogue smoke test.
- Continue Phase 4 cross-module transaction integrity audit.

### Must not change
- Do not reset, truncate, replace, or destructively reseed Neon.
- Do not delete existing business catalogue/history simply to remove legacy duplicates.
- Do not invent exact manufacturer model numbers where the source marks a family/generic listing as unverified.
- Do not put purchase cost or selling price into master product identity.

## Phase 4 cross-module integrity

Completed offline verification of transaction boundaries and key serialized business flows. The current source passes 12/12 transaction-integrity checks and the major module audits. The next live-only gate is an authenticated Vercel → Render → Neon smoke test; do not fabricate this result.

## TV master catalogue deduplication correction — 2026-08-28

### Finding
The deeper source comparison found 42 legacy generic TV product rows in the original starter seed. They were generic size-based records rather than exact manufacturer model records and were not present in the supplied Master Television Product Catalog v1.0. The master catalog is the authoritative TV source.

### Corrected
- Removed the 42 legacy generic TV product/variant seed pairs from `starter-catalogue-seed.sql` so they cannot be reintroduced by the repository seed.
- Added `tv-master-catalogue-cleanup.sql` for a separate, conservative live-database cleanup.
- Added `tv-master-catalogue-cleanup-audit.js` for repeatable read-only identification of the legacy rows.
- Kept the 210 canonical TV model/family entries and 236 catalogue variants from the supplied master.
- Preserved `Amaal_plan.md`.

### Database rule
The cleanup must never delete a TV product or variant that is referenced by business history. Unreferenced legacy generic records may be deleted; referenced records must be archived/hidden so historical relationships remain intact.

### Live status
The live Neon cleanup has **not** been executed because the connected Neon SQL operation is currently failing before SQL execution due to a project-identifier validation mismatch. No production data was changed.

### Next step
Resolve the Neon connector execution issue, then run the cleanup against the production branch only after reviewing the candidate rows. Verify that the canonical master remains the only active TV catalogue source and that no historical inventory/order/service relationship was lost.


## Latest correction — Global Star

The TV master catalog is authoritative. `LG Global Star` must never be treated as a canonical brand. The latest build includes a safe Render startup normalization that maps legacy TV products to `Global Star`, corrects display names, and preserves historical records. The Business Admin starter brand source now contains only the canonical TV brands.

## Phase 5 — Returns / Warranty / Service physical-unit reconciliation — 2026-08-28

Deep audit of the serialized physical-unit identity through returns and warranty/service found two correctness risks and hardened them without destructive database changes.

### Fixed
- Warranty resolution/collection no longer forces every physical unit to `Sold`. It restores the unit's recorded pre-warranty status and location; a unit that entered warranty from `Sold` remains `Sold`, while an internally held unit can return to its previous operational state.
- Serialized return lines are now constrained to one physical unit per line at the application and additive database-migration level.
- Active duplicate return requests for the same physical serialized unit are rejected.
- Return disposition now drives serialized-unit state: Restock → `Returned`; Repair → `Service`; Scrap → `Damaged`; supplier/quarantine dispositions preserve a non-available `Returned` state rather than silently leaving the unit `Sold`.
- Legacy inventory adjustment/stocktake receiving paths now check identifiers across serial, IMEI, barcode and QR fields rather than checking only a subset.
- Serialized-unit creation in these paths now carries authenticated actor context into lifecycle history.
- Removed a duplicate `res.json(gr)` response in the procurement receipt detail endpoint.

### Verification
- All repository JavaScript files: syntax PASS.
- Serialized status/history audit: 19/19 PASS.
- Returns/Warranty/Service audit: 14/14 PASS.
- Exact order serial assignment: 20/20 PASS.
- Fulfilment/delivery: 14/14 PASS.
- Receiving/batches: PASS.
- Warehouse transfers: PASS.
- Inventory unit audit: PASS.
- Cross-module audit: 18/18 connected, 0 unmatched frontend routes.
- Transaction integrity audit: 12/12 PASS.
- TV master catalogue: 210 unique model/family records, 236 variants, 7 canonical brands.

### Database safety
No production Neon reset, truncate, replacement, destructive reseed, or business-data deletion was performed. The new return-line constraint is additive and repeat-safe. Live execution remains gated until the Neon connector accepts the production project identifier.

### Build limitation
The Business Admin dependency installation did not complete within the local verification window, so a full Next.js production build was not claimed as passed. Static/source audits and all available Node syntax/audit checks were run.

### Next priority
Continue with authenticated end-to-end business-flow tests using a safe non-production fixture/branch: purchase → receipt → batch → physical unit → warehouse transfer → order reservation → sale → delivery → return → warranty/service → final disposition. Then perform the live Neon catalogue-deduplication and Global Star normalization only after read-only candidate inspection succeeds.
## ZIP-BASED SAFE HARDENING PHASE — 2026-08-28

Working source: latest available generated ZIP `amaal-telecoms-phase7-safe-deployment-catalogue-fix-2026-08-28.zip`. Repository writes were intentionally not used.

### Changes made
- Business Admin `/api/engine/*` proxy now supports the existing backend business routes rather than restricting the route to catalogue-only paths.
- The proxy forwards the `amaal_csrf` cookie value as `X-CSRF-Token` for mutation requests.
- Administrator recovery preserves audit/security history tables; it only revokes authentication/access state.
- Permanent product deletion now performs explicit dependency checks before deletion and refuses deletion when sales, orders, serialized units, purchasing, returns, warranty claims, or repair jobs exist.
- Existing lifecycle, TV master, Global Star normalization, and catalogue pagination work was preserved.

### Safety
- No live PostgreSQL mutation was performed.
- No database reset/truncate/drop/reseed.
- No existing business history was intentionally deleted.

### Remaining live verification
- Neon authorization currently blocks live read-only SQL.
- GitHub write integration is unavailable/403, so this phase is packaged as a ZIP rather than pushed to the repository.
- Production deployment must not be claimed until the ZIP is deployed and verified.

### Next
1. Deploy this ZIP through the existing Render/Vercel workflow.
2. Run read-only Neon reconciliation.
3. Correct verified TV identity duplicates, preserving all historical relationships.
4. Run the complete purchase-to-return/service regression.

## Phase 9 — Safe TV Reconciliation / Integration Hardening

- Working source remains the generated ZIP, not the GitHub repository.
- Canonical TV brands are TCL, Hisense, CHiQ, Samsung, LG, Global Star and Black Ark.
- `LG Global Star` is legacy terminology and must never be recreated as a canonical brand.
- `tv-catalogue-reconciliation.sql` is read-only and must be run before production cleanup.
- `tv-global-star-normalization.sql` is idempotent and preserves business history; when a target canonical slug already exists, a legacy duplicate is archived only when no serialized/order/sale/purchase dependency is present.
- No database reset, truncate, destructive reseed or blind deletion is permitted.
- Next: run the read-only reconciliation against the real Neon database, review dependencies, then apply only verified corrections.


## Latest Phase — 2026-08-28
### Just completed
- Deep authentication/login hardening.
- MFA login UI/backend handshake corrected.
- Login/setup proxy timeouts added.
- Product removal changed to safe archive rather than destructive deletion.
- Full backend syntax and cross-module audits rerun.

### Next
1. Resolve live Neon authorization.
2. Run read-only TV/brand reconciliation.
3. Safely correct Global Star / legacy TV identities based on actual dependencies.
4. Verify Render startup and Vercel catalogue end-to-end.
5. Run final production smoke tests.

### Must not change
- Do not reset/truncate/drop/replace PostgreSQL.
- Do not delete historical sales, orders, inventory, warranty, service or finance records.
- Do not treat the frontend as a separate product source of truth.

## Phase 11 — Authentication/session hardening
Completed login/setup/logout/password recovery/session reliability hardening while intentionally leaving MFA unchanged. Next work should continue with non-MFA session/permission regression and live read-only Neon reconciliation when the connector is available. Never reset, truncate, replace or destructively reseed PostgreSQL.


## Phase 13 — Transaction Integrity Hardening (2026-08-28)

Completed from the ZIP baseline. Hardened purchase receiving and order fulfillment paths. Fixed the order fulfillment actor propagation bug, removed a duplicate goods-receipt response, and added a repeatable transaction-integrity audit covering serialized receiving, batch linkage, reservation, exact unit assignment, fulfillment consumption, lifecycle transitions, and destructive SQL checks. MFA remains deferred and unchanged. Live Neon data was not modified.


## Phase 13 — End-to-End Transaction Integrity

Status: completed in ZIP working tree. Purchase receiving and goods-receipt/batch integration were audited; serialized receiving validates serial/IMEI/barcode/QR identifiers and stores them on physical units; receipt reversal refuses moved units. Order creation reserves inventory, serialized orders require exact physical units before dispatch, fulfillment consumes reservations and transitions assigned units to Sold with the correct acting user. A duplicate goods-receipt response was removed. MFA remains intentionally unchanged. Live Neon data remains untouched.

### Remaining verification limitations
- Live Neon reconciliation is blocked by the current connector authorization failure; no production write was attempted.
- Business Admin TypeScript/build cannot be truthfully marked passed without installing its missing dependencies.
- GitHub deployment is not used as the working path for this phase.

## PHASE 16 — PUBLIC/PRIVATE SECURITY HARDENING

Completed the public/private API security audit.

### Fixed
- Public catalogue responses now filter internal identifiers and sensitive operational/commercial fields.
- Public website catalogue/site responses use the same sensitive-field filtering.
- Integration connection responses no longer expose arbitrary `config_json` values.
- Webhook responses use a dedicated safe projection while preserving webhook metadata.
- Existing public AI rate limiting and published-catalogue boundary were rechecked.
- Existing CSRF, origin, security-header and integration-host protections were rechecked.

### Not changed
- MFA remains untouched.
- Neon production data remains untouched.

### Verification
- JavaScript syntax: PASS
- Public route inventory: PASS
- Security field minimization: PASS

### Next
1. Deep role-by-role permission regression.
2. Final live Neon read-only reconciliation.
3. Only after read-only verification, apply verified non-destructive production corrections.
4. Final Render/Vercel production verification.

## Phase 17 — Role/Permission & Live Reconciliation Readiness

Completed from the Phase 16 ZIP:
- Hardened administrator recovery to preserve MFA credentials, password history, roles, branches, notifications and historical records while revoking sessions/trusted devices and suspending active accounts.
- Added recovery rate limiting.
- Corrected session idle-timeout messaging to use configured policy.
- Added read-only production TV reconciliation SQL for brands, duplicate products/models/SKUs/serials and dependency mapping.
- Added static role/permission regression tooling.

MFA remains intentionally unchanged.

Live Neon status:
- Amaal project is discoverable as `falling-smoke-22637586` / `Project name: amaal-telecoms`.
- This execution could discover the project but could not invoke the SQL operation, so no live production query or write was performed.

Next:
1. Execute the read-only reconciliation against the actual Amaal database.
2. Review exact TV duplicates and Global Star naming dependencies.
3. Build a non-destructive merge/archive migration only for verified candidates.
4. Re-audit Render and Vercel against the corrected canonical records.

## PHASE 19 — DEEP SECURITY / PERMISSION / LOGIN REGRESSION

Completed from the Phase 18 ZIP. Corrected the role regression allow-list so intentional recovery-status/public endpoints are not reported as unguarded. Added a bounded 15-second timeout to the Business Admin engine proxy so slow Render responses fail cleanly instead of hanging. Re-ran role/permission and security regressions: 134 permissions, 131 protected routes, 0 unexpected unguarded routes, 0 unknown sidebar permissions, and security regression PASS. MFA remains intentionally unchanged.

Live Neon remains untouched. Full Business Admin TypeScript compilation is still not claimable because the ZIP has no installed node_modules and dependency installation could not complete in the available environment.

---

## PHASE 22 — Amaal Public Website Foundation (Merged Continuation)

**Date:** 2026-08-29
**Status:** Foundation merged into the existing project snapshot.

### What was added

- Added `apps/public-web/` as the customer-facing Amaal storefront foundation.
- Added Next.js 16.3.3 / React 19 public-web package configuration.
- Added responsive public homepage foundation.
- Added premium light/modern/luxury visual foundation.
- Added public navigation, hero, trust/value, categories, featured products, brands, deals, after-sales and footer sections.
- Added public catalogue client targeting the existing public catalogue API.
- Added public-web continuation documentation.

### What was preserved

- Existing Business Admin Console remains at `apps/business-admin/`.
- Existing Express backend and database-related files remain unchanged.
- Existing business modules, audit reports, SQL and operational tooling remain included.
- No database reset.
- No database recreation.
- No destructive migration.
- No tables dropped.
- No existing Admin Console replacement.

### Verification status

The public-web source is merged into this project snapshot. Production build verification is still pending because dependencies are not installed in this archive and should be installed/verified in the target development/CI environment.

### Remaining public website work

1. Verify and extend real public search/filter APIs.
2. Build category/PLP experience.
3. Build product detail and variants.
4. Build cart.
5. Build checkout/payment integration.
6. Build customer account.
7. Build order tracking/delivery experience.
8. Build deals/campaign experience.
9. Build returns, warranty and repairs/service journeys.
10. Build enquiries/leads.
11. Complete SEO, accessibility, performance and production QA.
12. Configure Vercel as a separate public-web project without changing the Admin Console deployment.

### Deployment rule

The public website is a second frontend. It must not be deployed over the existing Business Admin Console. Both frontends should consume the appropriate existing backend/public-safe APIs. The database remains untouched.

---

## PHASE 28 — Amaal Homepage V1: Premium Retail Design Build

**Date:** 2026-08-30
**Status:** Homepage design direction locked and implementation advanced. Existing Admin, backend and database preserved.

### Locked creative direction

- Reference direction: Concept 2 — Luxury Lifestyle / Premium Retail.
- Hero direction: dark cinematic luxury environment with real Amaal products; no generic stock lifestyle hero.
- Headline direction: “Better technology. Better every day.”
- Visual language: warm ivory, paper white, charcoal, warm brown and restrained champagne/gold accents.
- Product density rule: minimal hero; richer product discovery below.
- Design principle: Amaal should read as a premium consumer-electronics and home retailer, not a marketplace or phone-only shop.

### Homepage sections now planned/built

1. Header / primary navigation
2. Luxury hero with real Amaal product composition
3. Trust / reassurance strip
4. Shop by category
5. Featured at Amaal
6. Cinematic home-entertainment editorial feature
7. Explore by lifestyle
8. Amaal Deals
9. New at Amaal
10. Trusted brands
11. The Amaal Difference
12. Home / Kitchen / Work & Play breadth section
13. Customer self-service / after-sales
14. Customer assistance / enquiry CTA
15. Newsletter / stay-in-the-loop
16. Final brand CTA and footer

### Real product assets used in public-web implementation

- iPhone 17 Pro Max 256GB — UGX 5,200,000
- Galaxy S26 Ultra 256GB — UGX 3,800,000
- Samsung U8000F 75-inch 4K Smart TV — UGX 5,400,000
- Samsung B550 Soundbar — price on request pending authoritative catalogue value
- TCL 606L Top Mount Refrigerator — UGX 2,900,000
- Hisense HFG60121X 4-Burner Gas Cooker — UGX 1,200,000
- HP Omen Gaming Laptop — UGX 5,100,000

### Implementation changes

- Reworked `apps/public-web/app/page.tsx` into the expanded homepage structure.
- Reworked public-web homepage CSS in `apps/public-web/app/globals.css` for the locked luxury direction and responsive layouts.
- Added real supplied product imagery to hero, category, editorial and product sections.
- Kept catalogue API integration available for brand data; homepage content remains ready for authoritative backend-driven collections.
- Preserved existing `AddToBag` interaction for priced homepage products.

### Design research

Firecrawl research was used to sanity-check the premium ecommerce direction. The research reinforced the value of product photography as hero content, disciplined brand conviction, editorial homepage storytelling and branded/f​​riction-light commerce patterns. This research is inspiration only; Amaal's own approved direction and supplied product assets remain authoritative.

### Figma

Updated the existing Figma file `4LnvxI3mJYeJ63n8Q4ErZ6` on page `02 — Homepage V1` with the Premium Retail homepage blueprint. The Figma version includes the locked hierarchy, real Amaal product names and explicit photography slots. Actual supplied raster assets remain in the codebase; Figma asset upload could not be completed from the available runtime because its upload endpoint was not reachable from the container.

### Database / backend preservation

- No database reset.
- No schema reset.
- No table drops.
- No data deletion.
- No production reseed.
- `server.js` preserved.
- `schema.sql` preserved.
- `apps/business-admin/` preserved.
- No replacement backend introduced.

### Verification

- Source-level inspection completed.
- Public homepage TypeScript syntax was reviewed.
- A dependency installation/build was attempted but timed out in the execution environment; therefore a successful production `next build` is NOT claimed from this runtime.
- ZIP integrity must be verified before release.

### Remaining homepage work

1. Replace any remaining photography placeholders with supplied assets where a stronger image is available.
2. Decide whether the hero should use a true composite campaign image or live positioned product assets.
3. Add authoritative backend-driven homepage collections/promotions rather than hard-coded merchandising once the public-safe endpoints are available.
4. Finalize mobile art direction and interaction details.
5. Run Vercel build in CI/target environment and fix any framework/type issues found there.
6. Perform visual QA at desktop/tablet/mobile widths.
7. Only after homepage approval, extend the same design system to category, search, PDP, cart, checkout and account journeys.

### Next phase

**PHASE 29 — Homepage QA + Production Data Binding**

Focus only on homepage quality: real API data binding, visual QA, responsive polish, accessibility, performance, SEO metadata and Vercel build verification. Do not modify the Admin Console, backend schema or production database destructively.

## Phase 29 — Homepage Merchandising + Horizontal Motion Rails

Latest homepage direction is documented in `CONTINUATION_PHASE29.md` and `AMAAL_HOMEPAGE_PRODUCT_CONTENT_V1.md`.

Current hard rules:
- Homepage categories are exactly Phones, TV & Home Entertainment, Audio, Home Appliances, Kitchen Appliances, Gaming & Computing, Accessories.
- Category, Featured at Amaal, New at Amaal and Shop by Brand are horizontal auto-motion rails.
- Weekly Deals is included without invented discounts.
- Homepage cards show quick details and price only; full product information opens on the product page.
- Homepage product photography is currently placeholder-only so no supplied/placeholder product photo is reused across sections.
- Official brand logo assets are still required before replacing the brand placeholders.
- Database/backend/admin console remain untouched.

## PHASE 30 — Featured Product Assets + User-Controlled Auto Motion

**Date:** 2026-08-31
**Status:** Featured asset integration and horizontal motion interaction refined. No backend/database/admin changes.

### Product assets
The supplied `amaal featured zippppppp.zip` was inspected. Supplied images are now used for the Featured at Amaal products. Multiple images are retained per product where provided for the product detail gallery. The homepage uses a single primary image per card to prevent repeated photography across sections.

The Pixel 9a image from the supplied archive was intentionally excluded from the Pixel 9 product because it is a different model.

### Auto-motion standard
All shared `AutoRail` sections now follow one interaction model:
- auto-motion ON by default
- hover does not pause motion
- visible pause/play control
- left/right controls
- horizontal pointer/touch dragging
- wheel/trackpad horizontal scrolling
- temporary pause after manual interaction, then automatic resume
- clicking a linked product/category/brand pauses before navigation
- duplicated track set for continuous looping
- reduced-motion preference disables automatic movement

This applies to Shop by Category, Featured at Amaal, New at Amaal and Shop by Brand, and is the reusable standard for future horizontal homepage rails.

### Product detail
Curated homepage products open their product pages with supplied multi-image galleries where available. Homepage cards remain concise; fuller descriptions and quick specifications are on the product page.

### Preservation
- No database reset/recreation.
- No table drops or destructive migrations.
- No production reseed.
- `server.js` unchanged.
- `schema.sql` unchanged.
- Business Admin Console unchanged.
- Existing public catalogue API boundary retained.

### Verification
- 18 homepage image references resolve to supplied assets.
- ZIP integrity passed.
- Full production build remains pending because `npm install` timed out in the execution environment; no successful production build is claimed.

### Remaining
- Final hero assets.
- Official brand logos.
- Unique category/lifestyle imagery.
- Real weekly deal/promotional data.
- Final TCL and Hisense catalogue confirmation.
- Vercel/CI production build and responsive visual QA.

---

# Phase 31 — Phone Catalogue

The public website now contains a model-level phone catalogue generated from `MOBILE_PHONE_CATALOGUE_MASTER_2026.md`: 156 models and 351 variants across Apple, Samsung, Google Pixel, TECNO, Infinix and itel. One public product page represents each model; storage/RAM/network configurations are selectable variants. Phone photos are placeholders only and are never reused between models. No inventory data, backend, schema, database or Business Admin Console was changed.

## Phase 32 — Modern Public Phone Catalogue Organization

### Requested outcome
The phone catalogue is a public product catalogue, not an inventory screen. All supplied phone models remain represented as one model-level product with selectable variants for storage/RAM/network where present. Product photography remains intentionally placeholder-only until Amaal supplies approved images.

### Built
- Reworked `/phones` into a structured, top-to-bottom catalogue experience.
- Added catalogue hero with model/configuration/brand counts.
- Added global phone search across model, brand, family, series and variant labels.
- Added Brand and Family filters plus catalogue-order / A–Z sorting.
- Added quick-jump brand navigation.
- Grouped all phone models vertically by brand, then series, then model cards.
- Redesigned phone cards for quick shopping decisions: brand/series, model name, concise model description, configuration chips, option count and clear model-detail CTA.
- Kept full model information on the individual product page rather than overcrowding the catalogue grid.
- Kept photo placeholders for every model and did not reuse existing product photography.
- Added responsive layouts for desktop, tablet and mobile.
- Added a public-catalogue note explicitly separating catalogue data from internal stock/supplier/warehouse information.

### Catalogue integrity
- Existing phone master remains the source for the public model list and variants.
- No phone model was intentionally removed during the UI reorganization.
- Existing model slugs remain the product-page identifiers.
- Variant choices remain on the model page; storage/RAM/network options are not represented as duplicate model cards.

### Protected
- `server.js` unchanged.
- `schema.sql` unchanged.
- Business Admin Console unchanged.
- No database reset, seed, destructive migration, table deletion, or backend replacement.

### Assets still needed
- One approved primary product photo per phone model.
- Additional approved gallery photos where available.
- Optional brand-specific logo assets if Amaal wants official logos displayed on the catalogue.

### Next recommended work
- Review the catalogue visually on desktop and mobile.
- Populate/verify model-level technical detail pages from approved source data.
- Add approved phone photography without reusing an image across different models.
- Later connect public availability/price data through a safe public API boundary if Amaal wants live commercial information exposed.


# Phase 33 — Modern Phone Catalogue + Model Detail UX

## Focus
Rework the public phone catalogue into a modern, complete product-discovery experience and add a dedicated model-detail experience for all 156 phone models.

## Implemented
- `/phones` now renders all 156 catalogue models from the supplied master catalogue.
- Desktop uses a persistent filter rail; mobile uses a full-height filter drawer with a clear result-count apply action.
- Search covers model, brand, family, series, storage, RAM and network labels.
- Filters: brand, family, network and storage.
- Applied filters remain visible and removable.
- Brand jump navigation remains horizontally scrollable for fast movement through the long catalogue.
- Models remain grouped by brand for scanability, while filters reduce the visible set without creating duplicate products.
- Cards now use concise decision information rather than long descriptions.
- Each model links to `/phones/[slug]`.
- `generateStaticParams()` covers all 156 phone model slugs.
- Dedicated phone detail pages provide a gallery placeholder system, variant selector, model information, configuration comparison table, verification note and enquiry CTA.
- The legacy `/product/[slug]` route still resolves phone slugs through the same shared phone detail component for compatibility.
- Four image slots are reserved per model page; approved Amaal photography can replace placeholders later without changing the catalogue architecture.

## UX research applied
- Desktop persistent filters and mobile filter drawer patterns follow current ecommerce product-list research from Baymard.
- Applied filters remain visible so users can understand and remove their current scope.
- Product variations remain combined into one model listing rather than becoming duplicate cards.
- Category-specific attributes are surfaced as filters because phone shoppers need storage and network configuration discovery.
- Apple’s current official iPhone comparison catalogue was used as a reference for model-family browsing patterns.
- Amaal’s supplied `MOBILE_PHONE_CATALOGUE_MASTER_2026.md` remains the source of truth for the 156 model records and 351 configurations; web research is used only to enrich/validate where authoritative sources support it.

## Accuracy boundary
- No unsupported hardware specifications were fabricated for the public catalogue.
- Regional Uganda availability, exact commercial SKU and warranty status are not implied merely because a model exists in the master catalogue.
- Current manufacturer research was reviewed for Apple, Google and Samsung; model-level enrichment remains source-dependent.

## Asset rule
- No phone model has been assigned another model’s product photography.
- All 156 models remain on dedicated placeholders until Amaal supplies approved images.

## Bug / integrity checks
- 156 unique phone slugs verified.
- 156 unique phone model names verified.
- All changed TS/TSX files passed TypeScript transpilation checks using the installed TypeScript compiler.
- Full Next.js type/build verification remains pending because npm dependency installation timed out in the execution environment.
- `server.js` unchanged.
- `schema.sql` unchanged.
- Business Admin Console unchanged.
- No database reset, schema reset, destructive migration, seed or backend replacement.

## Figma
- Existing Amaal Figma file was inspected.
- A design-context write was attempted for the phone catalogue/detail direction but the connected Figma workspace returned its Starter-plan MCP rate-limit/paywall. No Figma write is claimed as completed.

## Remaining
- Replace model placeholders with Amaal-approved photography.
- Continue official-source field enrichment for models where full specifications are required.
- Run full `npm install && npm run build` in a network-enabled build environment before Vercel deployment.
- Continue with tablet/home-appliance/audio catalogue experiences using the same catalogue-not-inventory principle.

## Phase 34 — Vercel Business Admin TypeScript Fix
- Fixed the Vercel-reported TypeScript contract mismatch in `apps/business-admin/app/(business)/[...slug]/page.tsx`.
- Reports dynamic route now supplies the complete `ReportsWorkspace` props and current permission flags.
- Team dynamic route now supplies the current `TeamWorkspace` props and permission flags.
- No DB/schema/backend/public-web changes.
- Full local dependency installation timed out; Vercel remains the authoritative production build check.
