# Amaal Telecoms Business Admin Audit Report — Overview / Staff / Catalogue Hardening

Date: 2026-08-27

## Scope

Deep audit of the current Business Admin baseline after Purchasing, focused on:
- Executive Overview charts and empty states;
- staff deletion lifecycle and active/deleted separation;
- Products catalogue structure and requested starter catalogue;
- visible business-facing language;
- cross-module data boundaries;
- database protection;
- syntax and build readiness.

## Executive Overview findings

### Fixed
- Revenue chart previously depended on fields not reliably returned by the summary response. The Overview now reads the dedicated revenue-trend view.
- Payment mix now reads the dedicated payment-method view.
- Top products now reads the dedicated product-performance view and correctly maps the product name field.
- Empty sales periods now display calm business copy instead of technical wording.

### Source-of-truth rule
All Overview metrics continue to come from existing business records. No values are fabricated.

## Staff lifecycle findings

The existing deletion process already performs the required safety behaviour: it removes login/session access, anonymises the identity, sets the account to Suspended and preserves historical business references.

The Business Admin previously requested `/api/staff` without filtering, so a deleted tombstone could still appear in the ordinary staff list. This is corrected by:
- making `/api/staff` return active staff only;
- adding `/api/staff/deleted` for deleted identities;
- adding a dedicated Active Staff / Deleted Staff business presentation.

No database schema change was required.

## Product catalogue findings

A preview-only starter catalogue was added to support UI/behaviour testing without writing live records.

Requested coverage:
- Phones
- Tablets
- Entertainment
- iPhones 11–17 with Pro / Pro Max requested variants
- Samsung Galaxy S20–S26 base / + / Ultra
- Samsung Galaxy Z Fold / Z Flip 4–8
- Samsung Galaxy A57, A56, A36, A37, A26, A27, A16, A17, A07, A06
- Entertainment: TV and Speakers
- TV brands: TCL, Hisense, Samsung, LG Global Star, SPJ, Chiq, Smart Plus
- TV sizes: 32, 43, 50, 55, 65 and 75 inch
- Stock: 0 in the preview

The blueprint is explicitly labelled preview-only and cannot silently alter authoritative catalogue data.

## Business-language audit

Reviewed visible Business Admin copy and removed technical/developer wording found in:
- login/setup notes;
- Website workspace description;
- Team workspace;
- global search messaging;
- POS serialized-product guidance;
- dashboard chart empty states;
- catalogue import guidance.

Developer implementation terms remain in source code where technically necessary, but they are not presented as business-facing labels or guidance.

## Cross-module inspection

Inspected the current Business Admin routes and their existing business boundaries for:
- Overview
- Sales / POS / sale detail
- Products / catalogue / product detail
- Warehouse Control / Stock
- Purchasing
- Customers entry point
- Orders entry point
- Finance / Credit
- Delivery
- Service / Returns / Warranty
- Website
- Reports
- Team
- Settings
- authentication/setup

The Business Admin continues to consume the existing business system rather than creating parallel records.

## Database protection

- No database reset.
- No seed or re-seed.
- No migration.
- No schema modification.
- No catalogue test records inserted.
- No destructive data operation.
- Existing PostgreSQL remains authoritative.

## Backend scope

One narrowly targeted application-level correction was made to the existing staff listing boundary so deleted identities cannot appear in the active staff list. The existing deletion mechanism itself was not redesigned and no database schema was changed.

## Validation

- `node --check server.js`: PASS.
- TypeScript parser check was attempted, but project dependencies are not installed in the audit container; therefore a full production Next.js type/build run could not be completed here.
- `npm install --no-audit --no-fund`: timed out in the audit environment.
- No successful production build is falsely claimed.
- ZIP integrity will be checked with `unzip -t` before delivery.

## Final assessment

The requested Overview issues, staff lifecycle presentation, business-language audit and starter catalogue blueprint have been addressed without altering the live database or inserting test stock/data.

## Customers / catalogue increment — 2026-08-27

### Technical-console comparison
Reviewed `customers-crm.js` as the authoritative Phase 4 customer/CRM module. Existing customer routes and Customer 360 relationships were mapped before building the Business Admin workspace.

### Business Admin changes
- Added Customers workspace and customer detail route.
- Added permission-aware customer creation, export, follow-up, service-case, notes, groups and consent actions.
- Added cross-module relationship cards for Sales, Orders, Credit, Delivery, Warranty/Service and follow-up.
- Removed the visible customer-group developer wording from the new Business Admin experience.

### Catalogue changes
- Added additive starter catalogue SQL with 104 requested phone/TV product records, 8 brands and 20 category levels/top-level categories.
- No inventory balances or stock movement records are created.
- Seed uses `ON CONFLICT DO NOTHING` and is only additive.

### Regression/debug pass
- Fixed `ExecutiveDashboard` so its trend, payment-method and top-product inputs are actually received by the component.
- Root `server.js` and `customers-crm.js` syntax checks passed.
- Next.js dependency installation timed out before a complete production build could be run in this environment. The package was therefore not represented as a successful production-build verification.

## Orders & Fulfilment increment — 2026-08-27

### Technical-console comparison
Reviewed the existing `orders-ecommerce.js` order capability before implementing the Business Admin module. The Business Admin uses the established order lifecycle, payment rules, stock reservation behaviour, fulfilment creation, cancellation, refund handoff, sale conversion and order analytics already provided by the existing engine.

### Business Admin changes
- Added a dedicated Orders command centre rather than relying on the generic summary page.
- Added order KPIs for total, open orders, monthly order value and part-paid orders.
- Added order value trend, payment mix and top ordered product charts.
- Added order pipeline view.
- Added searchable/filterable order book.
- Added payment follow-up and fulfilment queues.
- Added order insights and direct links to Stock, Delivery, Sales and Customers.
- Added business-facing order creation using existing pricing and stock rules.
- Added dedicated order detail pages.
- Added payment recording, next-stage progression, cancellation, fulfilment creation, refund handoff and sale conversion actions where the existing permissions allow them.
- Preserved the existing order engine as the source of truth.

### Regression audit
- Overview, Sales/POS, Products, Stock, Purchasing, Customers, Team, authentication/setup, navigation and shared Business Admin components were inspected again.
- Visible business-facing wording was searched for developer terminology. No new technical wording was found in Business Admin presentation copy.
- Existing backend JavaScript syntax: PASS.
- All Business Admin TypeScript/TSX files passed a TypeScript transpile/syntax check after excluding generated declaration files.
- Full Next.js production build remains unverified because dependency installation timed out in this environment.
- No backend source file was modified in this increment.
- No PostgreSQL operation, seed, migration, reset or schema change was performed in this increment.

### Database protection
The previously authorised additive starter catalogue remains unchanged. This Orders increment does not add, delete, reset or modify database records directly. Order actions in the Business Admin continue through the existing business engine and its existing rules.

### Next
Next core module: **Finance & Credit**, beginning with Finance and then connecting Credit to the same money/customer/order records.
