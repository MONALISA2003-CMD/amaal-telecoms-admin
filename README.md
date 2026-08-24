# Amaal Telecoms Admin — Cumulative 1–9

Production-oriented admin console for Amaal Telecoms (Uganda).

## Feature files
- `phase4.js` — Suppliers & Procurement
- `phase5.js` — Customers & CRM
- `phase6.js` — Sales & POS
- `phase7.js` — Orders & E-commerce
- `web_and_hosting.js` / `web_and_hosting.sql` — Web & Hosting
- `phase9_pricing_and_promotions.js` / `phase9_pricing_and_promotions.sql` — Pricing & Promotions

## Phase 9
Pricing and Promotions centralizes:
- customer-type price lists
- variant-specific price overrides
- effective-price calculation
- percentage/fixed promotions
- product/category/brand targeting
- scheduled campaigns
- coupons
- pricing export
- audit events and permissions

The effective pricing function is also used by the public catalog and default POS/order pricing, while administrators can still explicitly supply an authorized custom unit price where the existing workflow permits it.

## Deployment
Run `npm install` then `npm start` with `DATABASE_URL` and `JWT_SECRET` configured. The schema is applied automatically at startup.

No mock business records are included. No GitHub workflow/YAML is included in this ZIP.
