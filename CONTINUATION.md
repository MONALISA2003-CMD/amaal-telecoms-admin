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
