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

## Highest-priority next work
### 1. Physical-unit history / status engine
Make the exact IMEI/serial timeline authoritative across receiving, transfers, reservations, orders, sales, delivery, returns, warranty and service.

### 2. Fulfilment / delivery reconciliation
Ensure the exact unit assigned to an order is the exact unit picked, dispatched and delivered.

### 3. Returns / warranty / service
Use IMEI/serial as a reliable lookup key and preserve the original sale and unit history.

### 4. Reports / BI
Audit current field contracts and expose existing real datasets without fabricating values.

### 5. Production verification
Run the full production dependency build and controlled staging database tests when the deployment environment is available.


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

## 27 Aug 2026 — Mobile Phone Master Catalogue Synchronization

The mobile-phone master catalogue has been synchronized from `Mobile_Phone_Catalogue_Master_2026.md` into the authoritative PostgreSQL catalogue and mirrored into the Business Admin catalogue blueprint.

Scope covered:
- Apple iPhone
- Samsung Galaxy A/S/Z families
- Google Pixel
- TECNO
- Infinix
- itel

Commercial variants are represented under Product → Variant. Physical IMEI/serial units are still created only when stock is actually received. No stock quantities, purchase receipts, IMEIs, serials, costs, or warehouse units were fabricated by this catalogue load.

Existing catalogue records were checked first. Existing Samsung S-series records that had been incorrectly represented as multiple model variants were normalized into separate model products where the existing records had no transactional links. No business history was deleted.

Backend changes:
- `/api/catalog/products` maximum page size increased to 500 so the Business Admin can load the complete catalogue without silently truncating it.
- Added `mobile-phone-master-sync.sql` as a repeat-safe master catalogue synchronization source for Render startup.
- Added `SEED_MASTER_PHONE_CATALOGUE` configuration flag.

Frontend changes:
- Business Admin products page now requests up to 500 catalogue products.
- `starter-catalogue.ts` now contains the master phone product/variant blueprint from the Markdown source, while preserving the existing entertainment starter catalogue.

Database safety:
- No database reset.
- No TRUNCATE.
- No DROP.
- No destructive reseeding.
- Existing business records preserved.


## Completed — Vercel ↔ Render Business API reconciliation — 27 Aug 2026

The Business Admin browser layer has been standardized on the canonical same-origin `/api/*` proxy. The duplicate catalogue-only `/api/engine/*` browser proxy was removed. Catalogue, Product Admin, Delivery and Team now use the same Vercel proxy path, which forwards the session cookie and CSRF token to Render. Render remains the authoritative authentication, authorization and business-rule layer.

### Verification
- Render preflight: PASS.
- Cross-module audit: PASS — 102 frontend API references, 568 backend routes, 0 unmatched routes, 18/18 connected.
- Inventory/receiving/transfers/order-unit/status/fulfilment audits: PASS.
- Production Vercel build: pending because dependencies could not be installed in the extracted environment.

### Next priority
Continue with the **Neon schema/source migration reconciliation**, then perform the controlled end-to-end flow: receiving → batch → exact physical unit → warehouse → order reservation → fulfilment → delivery → sale, followed by returns/warranty/service traceability.
