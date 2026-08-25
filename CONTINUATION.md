# Amaal Telecoms Admin System Continuation

## Current system state

Cumulative Node.js 20 / Express 5 / PostgreSQL enterprise administration platform. Completed business modules remain integrated and operational. PostgreSQL is never reset by startup. The canonical procurement requisition entity is `purchase_requisitions`. MFA remains final-phase only and was not enabled or expanded by Warranty & Repairs.

## Completed module: Warranty & Repairs

Warranty & Repairs is now the operational service layer for serialized telecom/device products. It connects warranty claims to existing Customers, Sales, Orders, Inventory serialized units, Documents, Returns and Finance reporting without creating duplicate business engines.

Implemented:

- Warranty policy management by brand/category with coverage duration, coverage text, exclusions and active/inactive state
- Warranty claim creation from an existing customer, sale or order
- Serialized unit and IMEI verification
- Product/variant consistency validation
- Policy eligibility calculation using real sale/order dates
- Coverage start/end tracking and eligibility reason
- Active-claim duplicate protection for the same serialized unit and issue
- Transaction-safe movement of a serialized unit into `Service`
- Previous serialized status/location preservation for rejected/cancelled claims
- Controlled claim lifecycle: Submitted → Under Review → Approved → In Repair → Ready for Collection → Resolved, with guarded rejection/cancellation paths
- Server-side coverage/status validation
- Repair job creation with technician or active external repair partner
- Repair partner assignment, location, item description, expected return and external reference
- Controlled repair job lifecycle
- Repair diagnosis, work done, labour cost, partner cost and parts cost tracking
- Actual inventory consumption for repair parts through the existing `changeStock` engine
- Repair part usage ledger linked to claim and repair job
- Stock availability validation before part consumption
- Serialized item restoration after rejected/cancelled claims
- Serialized item completion handling after successful repair/collection
- Customer collection workflow
- Warranty event history and audit logging
- Warranty claim detail including events, repair job, consumed parts and attached Document Management records
- Repair partner management and performance reporting
- Warranty dashboard summary and partner analytics
- Existing Business Intelligence warranty reporting remains based on operational data

## Important bug fixes and audit findings

- Removed unsafe UUID aggregate patterns; no `min(uuid)`/`max(uuid)` style aggregate remains in application SQL.
- Replaced the previous non-transactional serialized-unit mutation during claim creation with a transaction and row lock.
- Added PostgreSQL transaction advisory locking for serialized-unit + issue claim creation to prevent concurrent duplicate active claims without requiring destructive cleanup of existing historical data.
- Avoided a migration-time unique-index failure that could occur if historical production data already contained duplicate active claims; duplicate prevention is enforced transactionally in application logic and by a supporting non-unique index.
- Added guarded claim state transitions so arbitrary status jumps cannot bypass operational controls.
- Added guarded repair-job state transitions.
- Rejected invalid dates and non-finite/negative money values.
- Validated brands, categories, policies, customers, orders, sales, serialized units, repair partners and inventory locations before use.
- Prevented repair jobs from being opened on rejected/cancelled claims.
- Prevented repair parts from being consumed after a repair job is completed/cancelled.
- Repair part consumption now checks real inventory and uses the existing inventory movement engine inside the same transaction.
- Rejected/cancelled warranty claims restore the serialized unit to its recorded pre-service status/location.
- Successful collection returns the serialized unit to its sold/service-complete lifecycle state.
- Added collection timestamp and collection notes.
- Preserved existing Returns & Refunds, Documents, Finance, Delivery and Sales/POS architecture rather than creating duplicates.
- Render preflight was run after dependency installation and passed.

## Database changes

Additive changes only:

- Warranty coverage start/end timestamps
- Warranty eligibility reason
- Serialized-unit prior status/location for safe service rollback
- Warranty collection timestamp/notes
- Active warranty claim lookup index
- `warranty_part_usage` table for real repair-part consumption records
- Claim/job/part usage indexes

No PostgreSQL reset, branch, destructive migration or duplicate procurement requisition implementation was introduced.

## Integrations

- Customers: existing customer records are referenced directly.
- Sales: warranty claims can reference completed sales and their serialized units.
- Orders: warranty claims can reference actual orders.
- Inventory: serialized lifecycle and repair-part stock consumption use existing inventory infrastructure.
- Returns & Refunds: warranty does not create a second return engine; future return/refund decisions continue through the canonical Returns module.
- Documents: claim detail reads documents attached to `WarrantyClaim` through the existing Document Management module.
- Finance: warranty/repair costs remain operational cost data and are available to existing reporting; no fake accounting entries are created. Finance posting remains subject to the existing Finance accounting workflow.
- Business Intelligence: warranty reporting uses actual claims, jobs and partner costs.

## Testing and validation

- All application JavaScript files pass `node --check`.
- `render-preflight.js` passes after dependency installation.
- No application YAML files are present.
- `node_modules` is excluded from the deliverable.
- Git metadata is excluded from the deliverable.
- Only `README.md` and this `CONTINUATION.md` remain as Markdown documentation.
- Canonical `purchase_requisitions` remains intact.
- MFA remains deferred.
- Static UUID aggregate audit passed.
- Warranty transaction, transition, duplicate-claim, serialized-unit, inventory-part and partner-validation paths were manually audited.

Live Render and production PostgreSQL execution cannot be performed from the local archive environment, so this package does not claim a false live-production pass.

## Known limitations

- Actual binary warranty evidence remains stored through the existing Document Management module rather than a second attachment system.
- Finance does not receive invented warranty journals. If the business requires automatic repair-expense posting, the next Finance integration audit should add it through the existing accounting engine and configured accounts.
- External repair-partner APIs/webhooks remain under Integration Hub.

## Completed module: Returns & Refunds

Returns & Refunds was audited and hardened as the canonical post-sale return and refund engine. It reuses original Sales and Orders lines, existing Inventory movements and serialized-unit records, and the existing Finance refund transaction stream.

Implemented and audited:

- Order-or-sale source validation with no mixed source references
- Original transaction status validation
- Customer/source consistency checks
- Line-level return quantity validation against previously returned quantities
- Serialized-unit ownership verification against the original line
- Serialized-unit status validation before return
- Return quantity concurrency protection using transaction advisory locks
- Return lifecycle controls
- Inspection and disposition handling
- Inventory restocking through the existing stock engine
- Serialized-unit return lifecycle updates
- Partial refunds
- Cumulative refund ceiling enforcement
- Duplicate/full-refund prevention
- Refund method/reference capture
- Refund event history and audit logging
- Real refund transactions suitable for the existing Finance synchronization process
- Return and refund analytics based on actual operational data

## Returns bug fixes

- Fixed the previous refund logic that could mark a partially refunded return as fully refunded.
- Refunds now calculate the remaining eligible balance from completed refund transactions.
- Refunds can be processed incrementally without exceeding the approved return amount.
- Invalid money values are rejected instead of silently becoming zero.
- Return requests now verify that the original order/sale exists and is eligible.
- Customer mismatch is rejected.
- Duplicate returned quantity is locked and checked transactionally.
- Serialized return verification now uses valid explicit joins and row locks.
- Inventory restocking remains transactional with the return status change.
- Fixed an earlier inventory movement compatibility bug discovered during the cumulative audit: procurement receipt reversal uses `RECEIPT_REVERSAL`, which is now explicitly supported by the existing movement-type constraint.

## Database changes

Additive/compatibility changes only:

- Inventory movement compatibility includes `RECEIPT_REVERSAL` because an existing procurement reversal workflow already uses that legitimate movement type.
- Warranty hardening fields and `warranty_part_usage` remain included.
- No destructive migration or PostgreSQL reset.

## Testing and validation

- All application JavaScript files pass `node --check`.
- Render preflight passes.
- No application YAML files are present.
- No `node_modules` directory is included in the deliverable.
- No Git metadata is included.
- Only `README.md` and this `CONTINUATION.md` remain as Markdown documentation.
- Canonical `purchase_requisitions` remains intact.
- MFA remains deferred and untouched.
- Static UUID aggregate audit passed.
- Returns SQL/query construction was manually audited, including serialized joins, transaction locking and refund calculations.
- Warranty and Returns integration paths were manually audited for cross-module regressions.

Live Render and production PostgreSQL execution cannot be performed from the local archive environment, so this package does not claim a false live-production pass.

## Known limitations

- Finance automatically consumes real `refund_transactions` through the existing Finance synchronization workflow; no fake accounting entries are generated.
- External payment gateway refund APIs remain under Integration Hub.
- Document evidence remains under Document Management.

## Cross-module integration audit and hardening

Before the next business module, the cumulative build was audited across Catalog, Inventory, Suppliers & Procurement, Customers & CRM, Sales & POS, Orders & E-commerce, Pricing & Promotions, Delivery & Logistics, Warranty & Repairs and Returns & Refunds. The following missing links/regressions were identified and corrected:

- Orders can no longer be moved directly to Delivered through the generic order-status endpoint while an active delivery shipment is still open. Delivery completion must occur through the Delivery workflow, preventing duplicate inventory consumption and duplicate finance completion.
- The Orders → Returns refund handoff now forwards the existing CSRF token when it internally calls the canonical Returns endpoint. This fixes the authenticated internal handoff that previously could be rejected by the global CSRF middleware.
- Warranty claims now enforce source consistency: a supplied customer must match the selected order or sale; an order and sale cannot both be supplied; cancelled orders are rejected; only completed sales can be warranty purchase sources.
- Warranty claims now verify that a supplied serialized unit actually belongs to the selected order or sale before moving the unit into Service.
- Delivery shipment creation continues to synchronize the existing order fulfillment record rather than creating a duplicate fulfillment engine.
- Existing inventory reservation, serialized-unit, return, warranty and finance transaction paths were re-audited for duplicate completion risks.

## Audit status

- JavaScript syntax: PASS for every application JavaScript file.
- Render preflight: PASS after the same runtime preflight command used by Render.
- PostgreSQL UUID aggregate scan: PASS; no application `min(uuid)`/`max(uuid)` pattern remains.
- YAML: no application YAML files. Dependency YAML is excluded from preflight and packaging.
- `node_modules`: excluded from the deliverable.
- Git metadata: excluded from the deliverable.
- Canonical procurement entity: `purchase_requisitions` preserved.
- MFA: untouched and still final-phase only.
- Destructive startup reset: none.
- Cross-module order/delivery completion: hardened against duplicate completion.
- Order refund → Returns handoff: CSRF-safe.
- Warranty customer/order/sale/IMEI linkage: hardened.
- Documentation cleanup: only `README.md` and this `CONTINUATION.md` retained.

Live Render and production PostgreSQL execution remain outside the local archive environment, so no false live-production claim is made.

## Next module

**Document Management**

## Next-module continuation prompt

Continue from this cumulative ZIP. Inspect the complete project and this continuation file first. Audit every completed business module and repair regressions before adding Document Management. Preserve all existing architecture and operational data. Never reset PostgreSQL, never create database or Git branches, never commit secrets, do not introduce YAML, and do not implement or modify MFA. Preserve canonical `purchase_requisitions`. Build Document Management around the existing `documents` and `document_blobs` architecture with secure metadata, durable database-backed storage, upload/download/replacement/versioning where appropriate, entity attachment, visibility, retention, verification, expiry, checksum/duplicate detection, access control and audit history. Integrate documents with Customers, Suppliers, Procurement, Sales, Orders, Warranty, Returns, Finance and Web/Hosting without creating duplicate attachment stores. Run complete syntax, migration/static, integration, security, regression and Render preflight checks. Keep only README.md and CONTINUATION.md. Produce the next cumulative ZIP only after all checks pass and update CONTINUATION.md for the next business module.
