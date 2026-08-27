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

## Highest-priority next work
### 1. Serialized warehouse transfers
Build the Business Admin workflow for selecting/scanning the exact physical units being transferred.

For serialized stock, do not transfer only a product quantity. Transfer the exact units.

### 2. Order fulfilment
Complete the operator workflow:

Order
→ reservation
→ exact physical-unit assignment
→ fulfilment
→ delivery
→ completed sale

### 3. Physical-unit history
Ensure one IMEI/serial can be traced across receiving, transfers, reservation, sale, delivery, return, warranty and service without losing historical events.

### 4. Returns / warranty / service
Use IMEI/serial as a reliable lookup key and preserve the original sale history.

### 5. Reports / BI
Audit current field contracts and expose existing real datasets without fabricating values.

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

Start with **Serialized Warehouse Transfers**. Inspect the existing transfer backend and Technical Console first. Make Business Admin select/scan exact serialized units for a transfer, validate source location and status, prevent duplicates, preserve movement history, and connect the transfer to the receiving location. Then run the full serialized inventory, cross-module, security/privacy, database-safety and regression audits. Continue into order fulfilment only after transfer integrity is verified.


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
