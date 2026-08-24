# Amaal Telecoms — Acceptance Checklist

## 13–15: Credit & Installments
- [ ] Open Credit Dashboard.
- [ ] Create/update a customer credit profile.
- [ ] Create a credit application.
- [ ] Approve an application and confirm an account is created.
- [ ] Confirm installment schedule is generated.
- [ ] Record a payment and confirm it is allocated.
- [ ] Confirm outstanding balance changes.
- [ ] Open account details and verify payment history.
- [ ] Restructure an account and verify the schedule is rebuilt while paid installments remain protected.
- [ ] Test collection workflow against an overdue account.

## 13–15: Finance & Accounting
- [ ] Open Finance Dashboard.
- [ ] Confirm system chart of accounts loads.
- [ ] Create a custom finance account.
- [ ] Create and open a balanced manual journal.
- [ ] Create cash/bank account metadata.
- [ ] Add a tax rate.
- [ ] Create an accounting period and close it.
- [ ] Create at least one real sale with payment.
- [ ] Create a supplier invoice/payment if the procurement workflow is available.
- [ ] Create a return/refund if applicable.
- [ ] Create a credit payment.
- [ ] Run **Sync operations to finance** twice; the second run must not duplicate journals.
- [ ] Verify source journals and debit/credit totals.

## 13–15: Business Intelligence
- [ ] Open Business Intelligence.
- [ ] Verify revenue, gross margin, orders, refunds, delivery, warranty, inventory and credit figures load.
- [ ] Open Sales Trend.
- [ ] Open Product Performance.
- [ ] Open Inventory Ageing.
- [ ] Open Delivery Performance.
- [ ] Open Warranty Performance.
- [ ] Export the BI sales CSV.

## Integration checks
- [ ] Catalog products appear in sales reporting after completed sales.
- [ ] Inventory stock affects inventory BI.
- [ ] Delivery partner/unit-cost data appears in BI.
- [ ] Repair partner/job data appears in BI.
- [ ] Credit balances appear in BI.
- [ ] Finance sync remains idempotent.
- [ ] Audit events are created for mutations.
- [ ] Public website routes cannot access admin-only BI/finance/credit data.

## Client-facing quality
- [ ] No developer instructions are shown in the normal UI.
- [ ] Every visible button is clickable.
- [ ] Mobile layout remains usable.
- [ ] No numbered phase filenames are introduced.
