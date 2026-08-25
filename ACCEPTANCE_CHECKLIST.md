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

## AI Business Intelligence acceptance
- [ ] Add `GEMINI_API_KEY` to Render Environment using a current Google AI Studio authorization key.
- [ ] Confirm AI Health shows Gemini configured.
- [ ] Generate an executive report from a selected date range.
- [ ] Open the generated report and verify figures match live BI data.
- [ ] As Super Admin, add one training example and verify it appears in AI Training.
- [ ] Create a schedule and verify a report is generated when due.
- [ ] Confirm the Super Admin receives the report-ready notification.
- [ ] Confirm public AI answers published product questions and refuses internal-data questions.

## Integration Hub acceptance
- [ ] Set `INTEGRATION_ENCRYPTION_KEY` on Render.
- [ ] Add an HTTPS test connection and run its health test.
- [ ] Confirm private/localhost URLs are rejected.
- [ ] Add an outbound webhook with a secret and event type.
- [ ] Perform a normal audited admin mutation and confirm an integration event appears.
- [ ] Confirm the webhook receives the signed event and delivery history records status/latency.
- [ ] Add an inbound webhook and verify an invalid signature is rejected.
- [ ] Verify valid inbound HMAC requests are accepted and recorded.
- [ ] For a separate public website, set `PUBLIC_WEB_ORIGINS` to the exact HTTPS origin and test `/api/public/ai/ask` from that site.

## Runtime verification boundary
The build audit validates source syntax and cross-reference consistency. Render/PostgreSQL, Gemini quota and external webhook delivery must be verified in the deployed environment before production use.


## Hardening 1–20 — Live acceptance
- [ ] Login works on Android with email + password only.
- [ ] Forgot password displays a non-enumerating response.
- [ ] Reset link expires and is single-use.
- [ ] Reset invalidates prior sessions.
- [ ] Staff invitation can be accepted.
- [ ] Suspended account cannot authenticate.
- [ ] Existing suspended-user sessions stop working.
- [ ] Super Admin can delete a test user without deleting historical business records.
- [ ] Role changes affect API permissions, not only UI visibility.
- [ ] Session revoke controls work from phone.
- [ ] Unknown API route returns JSON 404.
- [ ] API failures show safe messages without PostgreSQL/stack details.
- [ ] Document upload/download works with an authorized account.
- [ ] Unauthorized document download is rejected.
- [ ] 10-minute inactivity is enforced.
- [ ] MFA remains disabled during development.
