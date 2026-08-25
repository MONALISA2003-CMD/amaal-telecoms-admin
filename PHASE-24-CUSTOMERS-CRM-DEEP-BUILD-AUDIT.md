# Phase 24 — Customers & CRM Deep Build Audit

## Scope
Phase 24 continues directly from the Phase 23 cumulative ZIP. No rebuild was performed.

## Previous-phase audit
### Phase 21 Catalog
- Catalog deep build and closure artifacts preserved.
- Product revisions, related products, bulk import, SKU/barcode integrity and publication readiness remain in the cumulative project.
- No Catalog runtime files were replaced by Phase 24.

### Phase 22 Inventory
- Inventory overview, reorder rules, serialized controls, stocktakes and reservation safeguards preserved.
- Procurement → Inventory receiving remains intact.

### Phase 23 Suppliers & Procurement
- Supplier qualification and approval controls preserved.
- Requisition → PO → receipt → invoice → payment lifecycle preserved.
- Purchase requisition canonical table remains `purchase_requisitions`.
- PO revision, receiving/backorder, receipt reversal, invoice matching and supplier payment allocation remain intact.

## Phase 24 completed
### Customer 360
- Added `/api/customers/:id/360`.
- Real operational history from sales, orders, credit, warranty, returns, delivery, documents, support, tasks and notes.
- Activity metrics include sales/order counts, activity value, last purchase, open cases and interaction count.

### CRM operations
- Added durable customer tasks with assignment, due date, priority and status.
- Added customer notes.
- Added global CRM task control endpoint.
- Added durable customer groups and group membership.
- Existing interaction follow-ups remain preserved.

### Data quality
- Duplicate phone/email detection endpoint.
- Controlled customer merge workflow.
- Merge uses a PostgreSQL transaction and row locks.
- Financial/credit ambiguity is blocked when both customers have credit profiles.
- Sales, orders, warranty claims, returns, credit records, support, tasks, notes, tags, consents and customer documents are migrated or reassigned.
- Merge history stores snapshots and moved-record counts.
- Merged customer is retained as inactive rather than hard deleted.

### Customer master controls
- Address update/delete.
- Contact update/delete.
- Primary address/contact uniqueness protection with existing duplicate normalization before unique indexes.

### Privacy
- Existing consent, privacy and anonymization flows preserved.
- Sensitive actions continue through the audit system.

## Cross-module verification
- Catalog: customer identity remains available to sales/order flows.
- Inventory: customer-linked sales/orders remain the operational source of truth.
- Procurement: unaffected and preserved.
- Sales: customer-linked sales are included in Customer 360.
- Orders: customer-linked orders included.
- Delivery: shipment history is correctly joined through orders because shipments are order-linked rather than directly customer-linked.
- Warranty: customer claims included.
- Returns: customer returns included.
- Credit: accounts and exposure included; unsafe dual-credit-profile merges are blocked.
- Documents: Customer entity documents included and moved during merge.
- Finance/BI: Customer 360 uses real operational records and does not create synthetic financial facts.
- Audit: new sensitive operations emit audit records.

## Static acceptance
- All JavaScript files syntax checked: PASS
- Render preflight: PASS
- YAML files: 0
- Legacy procurement runtime reference: absent except the intentional preflight detector string
- MFA login enforcement remains disabled as required
- No database reset introduced
- Complete cumulative project retained

## Known intentional boundaries
- MFA remains final-phase work.
- Advanced dynamic customer-group rule evaluation is not used to invent membership; groups are explicit and auditable.
- Customer merge refuses ambiguous dual credit profiles rather than silently discarding credit information.
