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

## Next module

**Document Management**

## Next-module continuation prompt

Continue from this cumulative ZIP.

1. Inspect the complete project and read `README.md` and this `CONTINUATION.md` first.
2. Audit all completed modules, especially Customers & CRM, Sales & POS, Orders & E-commerce, Pricing & Promotions, Delivery & Logistics, Warranty & Repairs and Returns & Refunds.
3. Fix regressions before adding anything new.
4. Preserve existing architecture and operational data.
5. Never reset PostgreSQL.
6. Never create database or Git branches.
7. Never commit secrets.
8. Do not introduce YAML files.
9. Do not implement, enable or modify MFA. MFA remains final-phase only.
10. Preserve canonical `purchase_requisitions`.
11. Build Document Management fully around the existing `documents` and `document_blobs` architecture.
12. Support secure document metadata, upload, download, replacement/versioning where appropriate, entity attachment, document visibility, retention, verification, expiry, duplicate detection, access control and audit history.
13. Integrate documents with Customers, Suppliers, Procurement, Sales, Orders, Warranty, Returns, Finance and Web/Hosting without creating duplicate attachment stores.
14. Keep binary data in the existing durable database-backed document system rather than ephemeral Render filesystem storage.
15. Protect document download and sensitive-document access server-side.
16. Audit MIME/type validation, size limits, checksums, duplicate detection, filename handling and path traversal safety.
17. Preserve historical documents and avoid destructive deletion unless explicitly permitted and audited.
18. Run full JavaScript syntax checks.
19. Install dependencies and run Render preflight exactly as Render does.
20. Confirm `node_modules` is excluded from the ZIP and dependency YAML does not break preflight.
21. Confirm there are no application YAML files.
22. Audit PostgreSQL migrations for UUID/type compatibility and safe deployment against existing data.
23. Run regression checks across every business module.
24. Keep only `README.md` and the current `CONTINUATION.md` as Markdown documentation.
25. Package the complete cumulative project only after the audit and bug checks pass.
26. Produce the next `CONTINUATION.md` naming the next business module exactly.
