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

# Finance & Credit Increment Audit — 2026-08-27

## Scope

Deep review of the Finance and Credit increment plus regression checks across the current application presentation layer and source-of-truth boundary.

## Technical Console comparison

### Finance
Reviewed `finance-accounting.js` and mapped the Business Admin workspace to the existing capabilities for:
- finance summary;
- financial accounts;
- financial entries;
- cash and bank accounts;
- bank/cash movements;
- taxes;
- accounting periods and closing;
- trial balance;
- profit and loss;
- receivables;
- payables;
- expenses;
- controlled finance synchronization;
- reconciliation.

### Credit
Reviewed `credit-installments.js` and mapped the Business Admin workspace to the existing capabilities for:
- credit summary;
- customer credit profiles;
- applications and decisions;
- credit accounts;
- payment plans;
- payment recording and reversal capability;
- collection follow-ups;
- restructuring;
- links back to sales and orders.

No replacement finance or credit rules were created in the Business Admin.

## Business Admin fixes

- Added Finance to navigation with a management dashboard rather than a plain record list.
- Added Credit & instalments as a dedicated management workspace.
- Added meaningful visual comparisons for finance and credit exposure.
- Added permission-aware actions for financial entries, expenses, account management, synchronization, reconciliation, credit applications, payments, collection follow-ups and restructuring.
- Added finance sub-workspaces for accounts, entries, expenses, bank activity, taxes, periods, trial balance and profit and loss.
- Added credit account detail with payment schedule and payment history.
- Upgraded login, setup and password reset surfaces to restrained premium champagne/gold glassmorphism.
- Removed visible developer-style labels from selected existing catalogue/customer areas, including raw structured-data labels.

## Cross-module audit

Checked the current navigation and business-facing surfaces for:
- authentication/setup;
- Overview;
- Sales/POS;
- Products/catalogue;
- Warehouse Control/Stock;
- Purchasing;
- Customers/CRM;
- Orders/Fulfilment;
- Finance;
- Credit;
- Staff;
- shared navigation and permissions.

Finance and Credit actions are connected to existing business records through the established service layer. No parallel business record store was introduced.

## Database protection

- No database connection was opened during this packaging audit.
- No reset.
- No truncate.
- No drop.
- No recreate.
- No migration.
- No seed execution.
- No direct business-data edits.
- No SQL/schema/seed file changes.
- Existing PostgreSQL remains the source of truth.

## Backend protection

The incoming ZIP was compared with the working tree before documentation changes. The Business Admin implementation files changed for this increment were:
- `apps/business-admin/app/(business)/[...slug]/page.tsx`
- `apps/business-admin/components/FinanceWorkspace.tsx`
- `apps/business-admin/components/CreditWorkspace.tsx`
- `apps/business-admin/app/globals.css`

Backend modules including `server.js`, `finance-accounting.js`, `credit-installments.js`, `customers-crm.js`, `orders-ecommerce.js`, `suppliers-procurement.js`, `sales-pos.js` and inventory modules remain unchanged.

## Validation

- `node --check` across all root JavaScript files: PASS.
- `node --check` across all public JavaScript files: PASS.
- `node render-preflight.js`: PASS.
- Backend source comparison against incoming ZIP: unchanged.
- SQL/schema/seed comparison against incoming ZIP: unchanged.
- No live production build claimed.

## Remaining limitation

A live deployment build was not run from this packaging environment. The deployment platform should remain the final authority for production compilation and deployment status.

## Next

Next core module: **Delivery & Logistics**.

## Permission and business-language hardening — 2026-08-27

### Role behaviour
- Confirmed the existing Administrator role is populated from the complete business permission catalogue during normal application initialization.
- Hardened Super Admin checks so Super Admin is treated as an explicit top-level authority in the permission middleware as well as the existing protected administration routes.
- Confirmed there are no undefined permissions referenced by `need(...)` checks: 127 used permission IDs were compared against the defined permission catalogue and none were missing.
- Preserved the existing Super Admin-only protection around permanent staff-account deletion.

### ERP-safe deletion rule
The audit does not treat physical deletion as the default meaning of “delete”. Where records carry operational or financial history, the correct action is cancellation, reversal, archival, deactivation or another controlled lifecycle action. This matches established ERP authorization patterns where create/change/delete/release/status actions are separately controlled and audited. citeturn0search0turn0search1turn0search36

### Technical-language boundary
Business Admin navigation was reviewed and technical-only workspaces were removed from the normal business navigation, including:
- feature controls;
- hosting/domain/health administration;
- AI administration;
- integration/webhook administration;
- system operations;
- monitoring;
- backup/recovery execution.

The technical capabilities remain in source/technical areas where required; they are not presented as ordinary business modules.

### Delivery & Logistics hardening
- Added delayed-delivery and returned-delivery KPIs.
- Added delivery-zone management presentation.
- Added shipment editing for open deliveries.
- Kept closed deliveries protected from ordinary editing.
- Preserved order fulfilment, stock consumption, serialized-unit validation and finance posting behaviour already provided by the existing engine.
- Added auditable delivery-update events.

### Validation
- All JavaScript source files: PASS.
- Render preflight: PASS.
- Permission reference audit: PASS; 127 used permissions, 0 missing definitions.
- Database/schema/seed files were not modified.
- No database connection was opened for this audit/package pass.
- No database reset, migration, truncate, drop or reseed was performed.
- Full production deployment build remains a deployment-environment validation step and is not claimed here.

## Business Admin / Vercel source audit — 2026-08-27

The ZIP contains the actual Next.js Business Admin application under `apps/business-admin`, so the Vercel build path was audited as part of this increment rather than treating the legacy/public application alone as the source.

### Previous Vercel failure
The reported TS2322 failure was caused by the Business Admin card contract receiving values inferred as `string | number` while `Workspace` requires `Card.label: string`. The current `cardEntries()` helper explicitly converts labels and values to strings. The audited source therefore no longer contains the reported type mismatch at that contract boundary.

### Business Admin permission UX
- Sidebar now recognises Super Admin as the top-level authority.
- Team workspace can create staff, assign roles, activate/deactivate accounts and expose Super Admin-only deletion.
- Deleted staff remain separated from active staff.
- Delivery workspace can create/edit shipments, update delivery status, create/edit zones and create/edit partners.
- Existing Render permission enforcement remains authoritative; the Business Admin UI is not the security boundary by itself.

### Static validation
- TypeScript/TSX transpile syntax: PASS across 52 source files, excluding the generated `next-env.d.ts` declaration stub.
- JavaScript syntax: PASS.
- Render preflight: PASS.
- Permission reference audit: PASS; 127 used permission IDs and 0 missing definitions.

### Build limitation
The local environment could not complete `npm install` for `apps/business-admin` before the allowed execution window, so a local `next build` is not claimed. Vercel must execute the final dependency installation and production build from the committed source.

### Database safety
No PostgreSQL schema/seed file changed. No database reset, migration, truncate, drop, reseed or direct data manipulation was performed by this increment.

## Vercel TypeScript Fix — 2026-08-27

Resolved the two production TypeScript failures reported by Vercel:
- Credit action modal now guards nullable application/account records before using their IDs.
- Finance workspace now imports the Recharts `BarChart` component used by its charts.

These changes are frontend-only. No database, schema, migration, seed, or backend files were modified.

## Service workspace audit — 2026-08-27

### Technical Console comparison
Inspected the existing returns and warranty/repair routes and mapped the Business Admin actions to the capabilities already exposed by the engine:
- Returns: list, detail, create, lifecycle update and refund.
- Warranty: summary, policies, claims, lifecycle update, repair creation, repair updates, parts use, collection and repair partners.
- Cross-module references: customers, orders, sales, products/variants, inventory locations, staff/technicians and repair partners.

### Business Admin changes
- Added `apps/business-admin/components/ServiceWorkspace.tsx`.
- Added Service route handling in `apps/business-admin/app/(business)/[...slug]/page.tsx`.
- Added searchable returns/warranty records, detail views and operational actions.
- Kept destructive business history under the existing controlled lifecycle rather than adding physical deletion.
- Visible service wording was reviewed for business-user readability.

### Protection
- `server.js`, `returns-refunds.js`, `warranty-repairs.js`, other backend JavaScript and all SQL files are byte-for-byte unchanged versus the incoming baseline ZIP.
- No database connection was opened by the build/audit process.
- No reset, migration, truncate, drop, recreate or seed operation was performed.

### Validation
- Root and public JavaScript syntax: PASS.
- Backend/SQL unchanged comparison: PASS.
- Service route/import inspection: PASS.
- ZIP packaging and integrity: to be completed after documentation/final package generation.
- Full Next.js production build: not claimed due environment dependency/build limitation.

### Next
Website Management.

## Website Management audit — 2026-08-27

### Findings and corrections
- Replaced the former website summary-only screen with a complete connected business workspace.
- Website creation/editing uses the existing website routes and supported status values.
- Pages, navigation, banners, content blocks and media use existing authenticated website routes.
- Publishing uses the existing request/approval/execution workflow; release approval, publishing and rollback are exposed where the current engine supports them.
- Storefront catalogue visibility reads the existing product catalogue instead of creating a second product source.
- Domain verification remains provider-controlled and is not falsely represented as an in-app verification action.
- No SQL/schema/backend source was modified.

### Validation
- Website workspace TypeScript transpilation: PASS.
- Business route page TypeScript transpilation: PASS.
- All backend JavaScript syntax checks: PASS.
- Database/schema/seed files: unchanged.

## Business Intelligence / Reports — 2026-08-27
- Added full Business Performance Centre to Business Admin.
- Uses existing backend BI endpoints; no duplicate reporting data source created.
- Added cross-module views for sales, products, customers, purchasing, returns, delivery, inventory, finance, credit and service.
- Added date and location filters, saved management snapshots and CSV export actions.
- Existing backend `business-intelligence.js` and `business-intelligence.sql` retained; no database changes performed.
- New TSX source transpilation check: PASS.
- Route source transpilation check: PASS.
- ZIP integrity: PASS.
- Production Next.js build: not locally claimed due environment dependency-install timeout.

## Team & Organisation hardening — 2026-08-27
- Added permission-aware staff profile editing and department management to Business Admin.
- Existing backend routes were used for profile updates and department create/update/archive.
- Department archive is safe: the backend refuses archival when users remain assigned.
- Role controls are no longer presented when the viewer lacks role-management permission.
- No PostgreSQL/SQL/schema/backend changes were made by this increment.

## Vercel follow-up fix — WebsiteWorkspace

Fixed TypeScript error TS2538 in `WebsiteWorkspace.tsx`. The dynamic section lookup previously used an untyped empty-array fallback, causing TypeScript to infer `never[]` as an index type. It now uses an explicit string section key and a `Record<string, any>` lookup with an empty-list fallback.

Database/schema/backend were not modified.

## Live visual layer — 2026-08-27

### Finding
The deployed Reports screen showed an internal server error and empty chart areas. The Business Admin contained client-side requests to `/api/...`, but the Next.js application did not expose a secure bridge for those requests to the existing business engine.

### Remediation
- Added a dynamic Business Admin API bridge for authenticated business requests.
- Preserved session cookies, CSRF token headers, request methods and response cookies through the bridge.
- Added no-store behaviour so business analytics are not served from stale page/cache data.
- Added a shared live business pulse with revenue trend, orders, stock, customers and gross-margin visuals.
- Added automatic 15-second refresh while the workspace is visible.
- Hardened the Reports workspace so one unavailable analytics feed does not erase every other available visual.

### Data integrity
No PostgreSQL reset, schema reset, destructive migration, or second business data store was introduced by this visual-layer remediation.

### Remaining audit requirement
After deployment, verify the live visual layer against real public-site activity: create a permitted business transaction through the public experience, confirm it reaches the existing business records, then confirm the corresponding Business Admin KPI/chart changes after the normal refresh interval. Continue with full module regression only after this verification passes.

## Live Pulse / Navigation Regression — 2026-08-27
- Global live pulse no longer depends on the large BI summary endpoint for its initial display.
- Dedicated pulse endpoint uses isolated safe queries and returns partial-health information.
- Frontend has independent endpoint fallback for core sales, inventory, orders, and customer figures.
- Mobile navigation is explicitly forced into one vertical column per group inside the slide-out sidebar.
- No PostgreSQL reset or destructive data operation performed during this correction.

# Full-stack cross-connection regression audit — 2026-08-27

## Scope

Audited the supplied Render backend and Vercel Business Admin source together, with emphasis on:
- Vercel-to-Render request flow;
- authentication/session bridge;
- Business Admin API usage versus Render routes;
- cross-module business relationships;
- live business pulse reliability;
- staff lifecycle safety;
- database protection;
- production build readiness.

## Vercel ↔ Render connection

- Business Admin keeps PostgreSQL credentials out of the Vercel application.
- `AMAAL_ENGINE_URL` remains the server-side bridge to the Render engine.
- The Business Admin catch-all proxy forwards authenticated requests and CSRF information to the Render engine.
- The catalogue-specific engine route remains restricted to catalogue paths.
- Only one Vercel catch-all API route exists in the supplied source, removing the earlier ambiguous catch-all route condition.

## Live Business Pulse — strengthened

- Expanded the live pulse to read sales, orders, inventory, customers, margin, purchasing, delivery, service, finance, credit and website records.
- Every live-pulse database read is isolated so one unavailable business area does not break the entire dashboard.
- The endpoint now returns a controlled partial response instead of exposing an Internal Server Error to the business user when an unexpected pulse-level failure occurs.
- The Business Admin keeps the visual dashboard alive during partial data outages and clearly identifies incomplete figures.
- Existing 15-second refresh behaviour is preserved.
- No database structure or data reset was performed.

## Cross-module result

Static cross-module audit: **18/18 core business connections confirmed; 0 unmatched Business Admin API references.**

Confirmed relationships include:
- Sales ↔ Finance
- Orders ↔ Sales
- Orders ↔ Inventory
- Orders ↔ Delivery
- Products ↔ Inventory
- Purchasing ↔ Inventory
- Purchasing ↔ Finance synchronization
- Customers ↔ Credit
- Customers ↔ Sales
- Customers ↔ Orders
- Service ↔ Customers
- Service ↔ Orders
- Service ↔ Inventory
- Website ↔ Products
- Reports ↔ Sales
- Reports ↔ Finance
- Reports ↔ Credit
- Reports ↔ Delivery

The centralized Finance synchronization already supports supplier invoices/payments as well as sales, order payments and refunds, so no duplicate accounting mechanism was introduced.

## Staff deletion regression

Confirmed the existing deletion lifecycle immediately:
- removes roles and active authentication sessions;
- disables trusted devices and MFA credentials;
- changes the account to Suspended;
- anonymises the identity;
- excludes the identity from Active Staff;
- exposes it through Deleted Staff;
- preserves historical business references.

## Validation

- All root JavaScript files: syntax PASS.
- `render-preflight.js`: PASS.
- Cross-module audit: PASS.
- Frontend API reference audit: 101 references inspected; 0 unmatched against the Render route inventory after accounting for intentional Vercel-local session bridges and the restricted catalogue proxy.
- Full Next.js production build could not be completed in this environment because dependency installation timed out. This is explicitly **not** reported as a successful production build.
- Direct production network verification was unavailable from this isolated environment; therefore no claim is made that the live Render/Vercel deployment was changed or redeployed from this session.

## Database protection

No PostgreSQL reset, truncate, drop, recreate, migration, seed, destructive data operation or schema change was performed by this audit.
