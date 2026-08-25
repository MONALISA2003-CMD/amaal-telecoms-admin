# CONTINUATION PROMPT — PHASE 22

You are continuing the Amaal Telecoms Admin System from the ZIP produced by Phase 21.

## NON-NEGOTIABLE CONTEXT

This is an incremental build. Do NOT rebuild the project from scratch. Do NOT replace working architecture merely for convenience. Preserve all completed functionality from Phases 1–21.

MFA remains deferred until the final security phase. Do not implement, enable or redesign MFA in Phase 22.

Do NOT add any YAML or workflow files to the ZIP.

Do NOT reset, wipe or recreate the PostgreSQL database.

Do NOT create Git branches.

## CURRENT STATE

Phase 21 deeply extended the existing Catalog module with:

- Catalog readiness/health checks.
- Product revision history.
- Revision snapshot viewing.
- Safe revision restore with a new revision created after restoration.
- Variant archive protection when stock remains on hand.
- Bulk product status API.
- Product snapshots after variant changes.
- Richer product detail UI.
- Catalog health UI.
- Existing images, tags, pricing history, publishing, categories, brands and export functionality remain intact.

The current ZIP has passed JavaScript syntax checks and Render preflight.


## PHASE 21 CLOSURE UPDATE

Before beginning Phase 22, note that Phase 21 received an additional catalog closure pass. It added product relationships, controlled bulk import with dry-run validation, SKU/barcode uniqueness protection, SEO publication readiness, and safer primary-image deletion. See `PHASE-21-CATALOG-CLOSURE-AUDIT.md`.

## PHASE 22 OBJECTIVE — INVENTORY DEEP BUILD

Take the EXISTING Inventory module and deepen it into a production-grade multi-location inventory control system.

Do not create a new inventory system. Inspect the existing schema, server routes, frontend views and all integrations first, then close the functional gaps incrementally.

## REQUIRED INVENTORY AREAS

### 1. Stock control
- Stock balances by SKU and location.
- Available, reserved and on-hand quantities.
- Movement history.
- Receiving.
- Transfers.
- Adjustments.
- Reversals where appropriate.
- Stock reservations.
- Reservation release and expiry handling.

### 2. Serialized inventory
- IMEI/serial lifecycle.
- Receiving serialized units.
- Location assignment.
- Reservation state.
- Sold state.
- Returned state.
- Warranty/service linkage.
- Lost/damaged status.
- Complete serial history.
- Strong duplicate serial/IMEI protection.

### 3. Stock receiving
Deepen receiving so that:
Purchase Order → Goods Receipt → Inventory Movement → Serialized Units → Supplier/Procurement → Finance
remain consistent.

Support:
- Full receipts.
- Partial receipts.
- Rejected quantities.
- Receiving notes.
- Unit cost capture.
- Serial/IMEI capture.
- Receiving validation.
- Receipt history.

### 4. Stock transfers
Deepen:
- Source location.
- Destination location.
- Transfer lines.
- Transit state.
- Receipt confirmation.
- Serialized transfer tracking.
- Cancellation/reversal protections.
- Audit history.

### 5. Adjustments and incidents
Deepen:
- Positive adjustment.
- Negative adjustment.
- Damage.
- Loss.
- Found stock.
- Reason codes.
- Approval/authorization where appropriate.
- Before/after quantities.
- Audit trail.

### 6. Stocktakes
Build a serious stocktake workflow:
- Start stocktake.
- Freeze or control affected stock where appropriate.
- Count entry.
- Variance calculation.
- Review.
- Approval/completion.
- Reconciliation.
- Full history.
- Serialized stocktake considerations.

### 7. Reorder intelligence
Add deeper inventory controls for:
- Minimum stock.
- Maximum stock.
- Reorder point.
- Low-stock alerts.
- Suggested reorder quantity.
- Slow/dead stock identification.
- Inventory ageing.

Do not invent fake AI recommendations. Base operational recommendations on real inventory data.

### 8. Inventory dashboard
Deepen the existing Inventory UI with:
- On-hand.
- Available.
- Reserved.
- Low stock.
- Serialized units.
- Stock value.
- Recent movements.
- Receiving queue.
- Transfer queue.
- Stocktake queue.
- Inventory issues.

### 9. Inventory detail
For each SKU show:
- Product.
- Variant.
- SKU.
- Barcode.
- Location balances.
- On-hand.
- Reserved.
- Available.
- Cost.
- Selling price.
- Serialized status.
- Serial/IMEI records.
- Movement history.
- Receiving history.
- Transfer history.
- Adjustment history.
- Stocktake history.

### 10. Cross-module integrity
Verify and strengthen:
Catalog → Inventory
Procurement → Inventory
Inventory → Sales/POS
Inventory → Orders
Inventory → Returns
Inventory → Warranty
Inventory → Finance

Do not break existing integrations.

## DATA INTEGRITY RULES

- Never allow available stock to become negative.
- Never silently create duplicate serialized units.
- Never archive or delete inventory records in a way that destroys operational history.
- Preserve movement history.
- Use transactions for multi-step stock operations.
- Lock balances appropriately during concurrent stock changes.
- Keep audit records for sensitive inventory actions.
- Do not bypass the existing permission system.

## FRONTEND REQUIREMENTS

Improve the existing Inventory screens instead of replacing them.

Use the existing design system, permission helpers, API helper, tables, modals and navigation patterns.

Prioritize mobile usability because the system is regularly used from phones/tablets.

## TESTING REQUIREMENTS

Before delivery:

- Run `node --check server.js`.
- Run `node --check public/app.js`.
- Run `node render-preflight.js`.
- Scan the ZIP tree and confirm there are NO `.yml` or `.yaml` files.
- Inspect all changed routes for authorization.
- Verify SQL references against the actual existing schema.
- Do not claim live success without actually testing the deployed build.

## DELIVERY REQUIREMENTS

Produce the complete updated project ZIP.

Include:
- All existing files.
- Phase 22 implementation.
- Phase 22 audit document.
- This continuation document updated for Phase 23.

Do not include YAML files.

The next continuation document must tell the next builder to perform Phase 23: Suppliers & Procurement Deep Build.
