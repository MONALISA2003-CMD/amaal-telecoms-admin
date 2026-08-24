# Amaal Telecoms Mobile Acceptance Checklist

## Deployment health
- [ ] Deploy ZIP to Render.
- [ ] Build completes.
- [ ] Service starts without exit status 1.
- [ ] `/api/health` returns `{"ok":true}`.
- [ ] `/` loads the administrator UI, not a white page.
- [ ] `/recovery` loads a controlled recovery page rather than a 404.

## Access recovery / setup
- [ ] Add `ADMIN_RECOVERY_TOKEN` temporarily in Render.
- [ ] `/recovery` reports enabled.
- [ ] Recovery token + `AMAAL-RESET` resets only administrator/security records.
- [ ] Business data remains intact.
- [ ] Remove/rotate recovery token immediately.
- [ ] First-time administrator setup works.
- [ ] MFA setup works.
- [ ] New-device login requires MFA when configured.
- [ ] Idle session expires after 10 minutes.
- [ ] Sign out revokes the session.

## Catalog
- [ ] Create category and icon.
- [ ] Create brand and logo.
- [ ] Create product with image, description and pricing.
- [ ] Set None / Promotional / Flash Sale.
- [ ] Publish/unpublish website visibility.
- [ ] Product/variant price history works.

## Inventory
- [ ] Create location.
- [ ] Receive stock.
- [ ] Adjust stock.
- [ ] Transfer stock.
- [ ] Reserve/release stock.
- [ ] Serialized/IMEI workflow works.
- [ ] Stocktake/reconciliation works.
- [ ] Damage/loss incident works.

## Procurement
- [ ] Supplier management works.
- [ ] Requisition → approval → purchase order works.
- [ ] Goods receipt updates inventory.
- [ ] Supplier invoice and payment work.
- [ ] Attachments/documents work.

## Customers / Sales / Orders
- [ ] Customer create/edit/privacy works.
- [ ] POS sale works.
- [ ] Payment recording works.
- [ ] Serial/IMEI assignment works.
- [ ] Online order workflow works.
- [ ] Fulfillment and delivery handoff works.
- [ ] Returns/refunds/restocking work.

## Delivery & Logistics
- [ ] Add delivery partner.
- [ ] Suspend/activate partner.
- [ ] Create shipment.
- [ ] Assign partner/driver.
- [ ] Track shipment events and location.
- [ ] Record delivery attempts.
- [ ] Record units, unit cost and total cost.
- [ ] Partner activity report works.

## Warranty & Repairs
- [ ] Create warranty policy.
- [ ] Create warranty claim.
- [ ] Add repair partner.
- [ ] Suspend/activate partner.
- [ ] Create repair ticket with item description, location and expected return.
- [ ] Update repair progress.
- [ ] Record partner cost and completion.
- [ ] Partner activity report works.

## Documents
- [ ] Upload PDF/JPG/PNG/WEBP/TXT/CSV/DOCX/XLSX.
- [ ] Metadata edit works.
- [ ] Download works from phone.
- [ ] Delete works.
- [ ] File survives redeploy.

## Credit & Finance
- [ ] Credit profile works.
- [ ] Application → decision → account works.
- [ ] Installments and payments work.
- [ ] Collections/restructure work.
- [ ] Chart of accounts works.
- [ ] Manual journal validates balance.
- [ ] Finance sync works.
- [ ] Accounting period close works.

## Reporting & Business Intelligence
- [ ] Executive KPI report loads.
- [ ] Date range can be changed.
- [ ] Sales trend reflects completed sales.
- [ ] Product performance reflects sales and cost.
- [ ] Inventory ageing reflects stock receipts.
- [ ] Delivery report reflects partners, units and costs.
- [ ] Warranty report reflects repair partners and turnaround.
- [ ] Customer report reflects customer-linked sales.
- [ ] Category report reflects category sales/margin.
- [ ] Procurement report reflects supplier spend/receiving.
- [ ] Returns report reflects refund exposure.
- [ ] Credit ageing reflects outstanding installments.
- [ ] Finance report reflects posted journals.
- [ ] Save snapshot works.
- [ ] Delete snapshot works.
- [ ] CSV exports download successfully.

## Client presentation
- [ ] No developer/debug labels are visible.
- [ ] Every dashboard module opens from a clickable button.
- [ ] No section remains stuck on `Loading…` after a successful API response.
- [ ] Error messages are user-friendly and do not expose stack traces.
- [ ] Mobile layout remains usable on a phone.
