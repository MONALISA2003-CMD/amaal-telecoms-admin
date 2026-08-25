# CONTINUATION PROMPT — PHASE 23

Continue directly from the supplied Amaal Telecoms Admin Phase 22 ZIP.

## NON-NEGOTIABLE RULES

1. Do NOT rebuild the application.
2. Do NOT replace working modules with new implementations.
3. Inspect the existing code, schema, routes, UI and integrations before modifying anything.
4. Preserve every working feature from Phases 1–22.
5. Do NOT reset, wipe or recreate the PostgreSQL database.
6. Do NOT create Git branches.
7. Do NOT add YAML files or workflow files.
8. Do NOT commit secrets.
9. MFA is deferred to the final security phase and must remain untouched.
10. Every new ZIP must contain the complete project, not only changed files.
11. Add a continuation MD describing the next phase.

# PHASE 23 — SUPPLIERS & PROCUREMENT DEEP BUILD

Take the EXISTING Suppliers & Procurement module and deepen it into a complete controlled procurement lifecycle.

Do not create a second procurement system. Continue from the existing supplier, requisition, purchase order, goods receipt, supplier invoice, supplier payment and performance functionality.

## REQUIRED WORKFLOW

Supplier onboarding → Qualification → Requisition → Approval → Purchase Order → Revision → Partial/Full Receipt → Invoice → Three-way Match → Payment → Supplier Statement → Performance

## Required areas

### Supplier management
- Supplier onboarding and qualification.
- Supplier approval status.
- Supplier compliance documents and expiry monitoring.
- Supplier risk rating.
- Supplier contacts and addresses.
- Supplier product relationships.
- Supplier price comparison.
- Preferred supplier controls.
- Supplier status lifecycle.

### Requisitions
- Draft/submission lifecycle.
- Approval workflow.
- Approval history.
- Approval matrix.
- Budget awareness where the existing finance layer supports it.
- Rejection reasons.
- Reopen/correction workflow.

### Purchase orders
- PO creation.
- PO revision/version history.
- Approval.
- Partial receiving.
- Remaining quantity calculations.
- Backorders.
- Close/reopen controls.
- Supplier delivery references.
- Attachments.

### Goods receipts
- Receive against PO.
- Partial receipts.
- Rejected quantities.
- Serialized/IMEI validation.
- Inventory location control.
- Receipt reversal/correction safeguards.
- Full PO received status synchronization.

### Supplier invoices
- Invoice lifecycle.
- Duplicate invoice detection.
- Three-way matching against PO and receipt.
- Exceptions.
- Approval.
- Tax handling.
- Payment status.

### Supplier payments
- Payment recording.
- Allocation.
- Partial payments.
- Supplier balance.
- Supplier statement.
- Payment history.

### Procurement intelligence
- Supplier spend.
- Supplier performance.
- Price variance.
- Delivery performance.
- Outstanding POs.
- Invoice exceptions.
- Supplier ageing.

## CROSS-MODULE REQUIREMENTS

Preserve and deepen:
- Supplier → Procurement.
- Procurement → Inventory.
- Procurement → Finance.
- Procurement → Documents.
- Procurement → Audit.
- Procurement → BI.

## ACCEPTANCE REQUIREMENTS

Before completion:
- Test all new routes statically and, where a configured environment is available, against PostgreSQL.
- Verify existing procurement functionality still works.
- Verify inventory receiving remains synchronized.
- Verify serialized receiving remains synchronized.
- Verify finance synchronization remains intact.
- Verify permissions on every new route.
- Verify audit entries for sensitive procurement actions.
- Run server syntax checks.
- Run frontend syntax checks.
- Run Render preflight.
- Confirm zero YAML files.
- Package the COMPLETE project into the next ZIP.

## FINAL DELIVERABLE

The Phase 23 ZIP must contain:
- Complete source tree.
- Updated schema.
- Updated backend.
- Updated frontend.
- All existing module files.
- Audit/build documentation.
- `CONTINUATION_PROMPT_PHASE_23.md` or equivalent continuation file for Phase 24.
- No YAML files.
