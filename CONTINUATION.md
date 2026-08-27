# Amaal Telecoms — Continuation & Build-Control Prompt

## Read first

Before changing anything, read:

1. `Amaal_plan.md`
2. `CONTINUATION.md`
3. `AUDIT_REPORT.md`
4. `PLAN_UPDATE_NOTES.md`
5. `BUILD_SOURCE_FINGERPRINT.txt`

## Absolute source-of-truth rule

> **The existing Render business engine and PostgreSQL records are authoritative. Do not reset, reseed, truncate, drop, recreate, migrate, overwrite or experiment with the database. Do not create a second business database. Do not replace the existing backend.**
>
> If a desired business capability is not supported by the existing engine, record it as a blocked dependency unless explicit authorization is given to change the backend/database.

## Current architecture

```text
Public Website
      |
Business Admin
      |
Existing business engine on Render
      |
PostgreSQL business records
      |
Technical Console
```

Business Admin is the business experience. The Technical Console remains the technical/advanced administration experience.

## Current completed modules

- Authentication and administrator setup.
- Premium restrained champagne/gold glass login/setup/password-reset direction.
- Executive Overview.
- Sales & POS.
- Products / catalogue.
- Stock / Warehouse Control.
- Purchasing / suppliers.
- Customers / CRM / Customer 360.
- Orders & Fulfilment.
- Finance.
- Credit & instalments.
- Staff lifecycle, including Active Staff and Deleted Staff separation.
- Delivery & Logistics.
- Starter catalogue coverage requested for phones, tablets, entertainment, iPhones, Samsung Galaxy families and TV brands/sizes.

## Permission model now enforced

- Administrator has the normal full business-operational permission set already defined by the engine.
- Super Admin is treated as the top-level authority for all supported permissions.
- Sensitive destructive identity actions remain explicitly Super Admin controlled.
- Business records that must remain historically traceable should use cancel, void, reverse, archive, deactivate or another safe lifecycle action rather than physical deletion.
- Permission checks are enforced by the service, not only by hiding browser buttons.

## Business-language boundary

Do not expose developer/technical terminology in normal Business Admin screens. Avoid terms such as:

- API
- endpoint
- database
- webhook
- payload
- server
- deployment
- infrastructure
- UUID
- JSON
- schema
- raw technical IDs

Technical-only workspaces are not part of normal Business Admin navigation. Keep system operations, monitoring, backup/recovery execution, connection administration, webhook administration, feature controls and similar developer controls in the Technical Console.

## Delivery & Logistics completed in this increment

- Delivery command centre.
- Pending, in-transit, out-for-delivery, delayed, delivered, failed and returned KPIs.
- Delivery zones, fees and expected timing.
- Delivery partner management and performance.
- Shipment creation.
- Shipment editing while still open.
- Driver and partner assignment.
- Delivery journey/status history.
- Delivery attempts.
- Proof/recipient confirmation and failure notes.
- Connections to Orders, Customers, Stock and Finance using existing engine behaviour.
- Auditable shipment updates.
- Closed deliveries cannot be edited through the ordinary shipment editor.

## Validation completed for this ZIP

- All JavaScript files pass syntax checking.
- Render preflight passes.
- Permission reference audit passes: 127 used permission IDs, 0 undefined.
- No database/schema/seed files were modified.
- No database reset, migration, truncate, drop, reseed or direct data manipulation was performed.
- Production deployment build is not claimed until Vercel reports success.

## Next module: Service

Build the Business Admin **Service** workspace next, covering:

- Returns.
- Warranty.
- Repairs.
- Customer service cases.
- Enquiries and follow-ups.
- Service queues and attention areas.
- Customer, order, product and delivery relationships.
- Repair partners and service performance.
- Parts/cost information where supported.
- Status journey and history.
- Clear mobile-first operational screens.

Before building Service, inspect the existing Technical Console capabilities in:

- `returns-refunds.js`
- `warranty-repairs.js`
- the customer/CRM routes
- the order routes
- relevant inventory and finance relationships

Then compare the complete technical capabilities against the Business Admin experience and expose every safe business action already supported.

## Mandatory continuity build prompt

> **Continue Amaal Telecoms from this exact ZIP.**
>
> First read `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md`, `PLAN_UPDATE_NOTES.md` and `BUILD_SOURCE_FINGERPRINT.txt`.
>
> Treat the existing Render business engine and PostgreSQL records as the only source of truth. **DO NOT reset, reseed, migrate, truncate, drop, recreate, overwrite or experiment with PostgreSQL. DO NOT replace or rewrite the existing backend.** Reuse existing capabilities and permissions. If something is missing, record it as a dependency instead of changing the database/backend without explicit authorization.
>
> Before editing, deeply inspect the Technical Console modules that correspond to the next Business Admin workspace. Compare routes, actions, permissions, statuses, data relationships and historical/audit behaviour.
>
> Build **Service** next as a complete real-business workspace. It must support every safe business action already available through the existing engine, not merely display cards. Include useful KPIs, service queues, attention areas, search/filtering, detail views, status journeys, customer/order/product links, operational actions and clear mobile layouts.
>
> Make sure Administrator can perform all normal business actions supported by the existing permission model. Make sure Super Admin can perform all supported actions. Keep destructive business history safe by using archive/cancel/reverse/deactivate where appropriate rather than erasing historical records.
>
> Business Admin must use ordinary business language. Do not expose API, endpoint, database, webhook, payload, server, deployment, infrastructure, UUID, JSON, schema or raw technical identifiers to business users.
>
> Preserve the premium restrained champagne/gold business ERP visual direction. Use meaningful charts and operational visuals where real data exists. Never fabricate figures. Empty, loading and error states must be calm and honest.
>
> After Service is built, audit **ALL** existing modules: authentication/setup, Overview, Sales/POS, Products, Stock/Warehouse, Purchasing, Customers/CRM, Orders/Fulfilment, Delivery, Finance, Credit, Staff, Website/content, Reports, permissions, shared UI and cross-module relationships.
>
> Check for bugs, stale assumptions, broken links, incorrect permissions, missing actions, technical wording, mobile problems, data-source mistakes, inconsistent statuses and unsafe destructive behaviour. Debug every safe issue found.
>
> Confirm database/schema/seed files remain unchanged and no database reset or destructive migration occurred.
>
> Update `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md`, `PLAN_UPDATE_NOTES.md` and `BUILD_SOURCE_FINGERPRINT.txt` with the new state and next-module prompt.
>
> Only after the full audit and validation, package a complete ZIP containing the entire project and all required MD continuity files. Verify the ZIP contents before delivery.

## Service completed in this increment — 2026-08-27

- Business Admin Service workspace is complete for the capabilities already supported by the existing engine.
- Returns, warranty, repairs, warranty policies and repair partners are connected to existing customers, orders, sales, products, stock and staff records.
- Return creation/status/refund and warranty/repair actions use the existing business routes and permission checks.
- Business Admin uses ordinary business terminology in the Service workspace.
- No backend or SQL changes were made and no database operation was performed.
- JavaScript syntax validation passed.

## Next module: Website Management

Build the Business Admin **Website Management** workspace next. Inspect the existing website/content/media/pricing capabilities first. Keep hosting, domain, deployment, connection and infrastructure administration in the Technical Console. Business Admin should expose only safe business content operations already supported by the engine: product/category presentation, banners/content, promotions where supported, publishing workflow, preview/status and content ownership. Do not invent capabilities or fabricate website metrics.

### Mandatory continuity prompt

> Continue Amaal Telecoms from this exact ZIP. First read `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md`, `PLAN_UPDATE_NOTES.md` and `BUILD_SOURCE_FINGERPRINT.txt`.
>
> Treat the existing Render business engine and PostgreSQL records as the only source of truth. **DO NOT reset, reseed, migrate, truncate, drop, recreate, overwrite or experiment with PostgreSQL. DO NOT replace or rewrite the existing backend.** Reuse existing capabilities and permissions. If a desired capability is not supported, record it as a dependency instead of changing the backend/database.
>
> Before editing, deeply inspect the Technical Console website/content/media/pricing routes and compare every safe business action, permission, status and data relationship.
>
> Build **Website Management** next as a complete real-business workspace. Keep technical hosting, domains, deployment and infrastructure out of Business Admin. Include useful business content management, publishing/approval states, product/category presentation, promotions where supported, search/filtering, detail views and mobile-first layouts.
>
> Ensure Administrator can perform all normal business actions supported by the current permission model and Super Admin can perform all supported actions. Preserve historical records with safe lifecycle actions instead of destructive erasure.
>
> Audit all existing modules after the Website build, including Authentication/Setup, Overview, Sales/POS, Products, Stock/Warehouse, Purchasing, Customers/CRM, Orders/Fulfilment, Delivery, Finance, Credit, Team, Service, permissions, shared UI and cross-module relationships. Check for bugs, stale data assumptions, broken links, incorrect permissions, technical wording, mobile issues and unsafe actions. Debug all safe issues found.
>
> Confirm backend and SQL/schema files remain unchanged. Update all continuity MD files and the build fingerprint. Only after the audit, validation and ZIP integrity check package the complete project.

## Website Management completed in this increment — 2026-08-27

- Built the Business Admin Website Management workspace on top of the existing website/content engine.
- Connected website administration to the existing website records through the Business Admin proxy and authenticated engine routes.
- Added website overview, site selection, site creation/editing, pages, menus, banners, reusable content areas, media, publishing requests, releases, domains, redirects, website settings and storefront catalogue visibility.
- Added safe publishing workflow: request, approval, execution and release rollback where supported by the existing engine.
- Connected storefront visibility to the existing Product Catalogue so Business Admin can see which authoritative products are prepared for the public website. Product and stock truth remains in their existing modules.
- Kept hosting-provider/domain verification execution outside normal Business Admin controls; Business Admin only shows the business-relevant domain state.
- No backend source, SQL, schema, migration or seed files were changed. Existing website backend routes were reused as-is.
- Business-facing labels avoid developer terminology.
- Website UI is mobile-aware and follows the premium restrained champagne/gold ERP direction.
- WebsiteWorkspace.tsx and the route integration passed TypeScript transpilation checks.
- All backend JavaScript files passed syntax checks.

## Next module: Reports & Business Intelligence hardening

Build the Business Admin Reports/Business Intelligence workspace next. Compare it deeply against `business-intelligence.js`, `business-intelligence.sql`, `ai-business-intelligence.js` and existing sales/orders/stock/finance data relationships. It must use authoritative records, provide meaningful charts, filters, drill-downs and export/report actions where already supported, and never invent figures. Then perform a full cross-module regression audit.

### Mandatory continuity prompt

> Continue Amaal Telecoms from this exact ZIP. Read all five continuity documents first. Treat Render and PostgreSQL as the source of truth. Do not reset, reseed, migrate, truncate, drop, recreate, overwrite or experiment with PostgreSQL. Do not replace or rewrite the backend. Reuse existing routes and permissions.
>
> Build Reports & Business Intelligence next. Compare every safe existing reporting capability with Business Admin and expose the useful business actions already supported. Keep technical administration in the Technical Console and use ordinary business language.
>
> Ensure Administrator can perform all supported normal business reporting actions and Super Admin can perform all supported actions. Do not fabricate metrics. Empty/loading/error states must be honest.
>
> After the module, audit every existing Business Admin module, permissions, shared UI, cross-module relationships and mobile layouts; fix safe bugs; confirm backend/SQL/schema files remain unchanged; update all MD continuity documents; validate the project and ZIP; then package the complete project.

## 2026-08-27 — Business Intelligence / Reports upgrade
- Built a full Business Performance Centre in Business Admin.
- Connected it to existing `/api/bi/*` backend routes and live business records.
- Added executive KPIs, sales trends, payment mix, product/category performance, customer ranking, cashier performance, purchasing, returns, delivery, inventory ageing/turnover, finance account activity, credit ageing, warranty/repair performance, saved reports and CSV export.
- Added date-range and location filters.
- Added management report snapshots through existing BI snapshot endpoints.
- No database reset, migration, truncate, drop, schema rewrite, seed execution, or backend business-rule modification performed.
- Existing PostgreSQL/Render backend remains source of truth.
- Validation: TSX transpilation passed for the new ReportsWorkspace and route; ZIP integrity passed.
- Full Next.js production build was not claimed locally because dependency installation timed out in the restricted build environment; Vercel remains the production build authority.

### Continuity prompt for next build
Continue from the current Amaal Telecoms Business Admin build. First deeply audit all modules already built, especially Business Performance Centre/Reports, Executive Overview, Sales, Products, Stock/Warehouse, Purchasing, Customers, Orders, Finance, Credit, Delivery, Service, Website, Team and Settings. Treat the existing Render backend and PostgreSQL database as the source of truth. Do not reset, truncate, drop, migrate, recreate, reseed, or alter the database unless the user explicitly requests a database change. Compare every Business Admin module with its corresponding Technical Console module and existing backend routes before adding functionality. Ensure Admin can perform all business actions appropriate to Admin permissions and Super Admin can add, edit and delete anything permitted by the system's highest authority, with sensitive/destructive actions audited. Keep technical/developer language out of the Business Admin console. Build the next module completely and interconnect it with Customers, Products, Orders, Sales, Stock, Purchasing, Finance, Credit, Delivery, Service, Website and Reports wherever business relationships require it. Use premium, restrained, non-futuristic ERP UX with strong information hierarchy, graphs, drill-downs, tables, filters, clear actions, responsive layouts and accessible empty/error/loading states. Before packaging: audit all modules, inspect for broken routes, stale assumptions, TypeScript errors, permission mismatches, undefined data, missing backend connections and business-language leaks; debug every issue found; verify JavaScript/TypeScript syntax and ZIP integrity; update Amaal_plan.md, CONTINUATION.md, AUDIT_REPORT.md and BUILD_SOURCE_FINGERPRINT.txt; then produce one complete ZIP containing the whole project and all continuity MDs. Never claim a production build passed unless it was actually executed successfully.

## Team & Organisation hardening completed — 2026-08-27

- Team now includes staff profiles and department management in addition to staff status, roles and deleted-staff separation.
- Department creation, editing and safe archiving use the existing backend routes.
- Staff profile editing uses the existing profile route.
- Role actions are only shown when the viewer has role-management access; profile and department actions are similarly permission-aware.
- Super Admin remains the highest supported authority, while self-protection and historical-record safeguards remain intact.
- No backend source, SQL, schema or database data was modified.

## Next build prompt
Continue from this complete Amaal Telecoms Business Admin build. First perform a full regression audit of Authentication/Setup, Overview, Sales/POS, Products/Catalogue, Stock/Warehouse, Purchasing, Customers/CRM, Orders/Fulfilment, Delivery, Finance, Credit, Team/Organisation, Service, Website Management, Reports/Business Intelligence, shared navigation and permissions. Compare each Business Admin workspace against its corresponding Technical Console module and the existing Render backend before changing anything. Treat PostgreSQL as the source of truth: do not reset, truncate, drop, recreate, migrate, reseed or directly alter the database unless explicitly requested. Ensure Admin can perform all supported business operations allowed by Admin permissions and Super Admin can add, edit, archive/delete where the underlying business lifecycle safely permits it. Connect every module through existing authoritative records and backend routes; never invent figures or duplicate data stores. Remove technical/developer language from Business Admin. Use the premium restrained non-futuristic ERP experience with strong hierarchy, charts, drill-downs, filters, tables, detail views, action panels, mobile layouts and honest loading/error/empty states. Before packaging, audit routes, permissions, data shapes, TypeScript, stale assumptions, cross-module relationships, mobile behaviour and destructive actions; debug all safe issues; verify backend/SQL/schema remain unchanged; update all continuity MDs and the source fingerprint; validate and produce one complete ZIP. Never claim a production build passed unless actually executed successfully.

## Latest Vercel fix

Vercel reached TypeScript successfully but failed in `WebsiteWorkspace.tsx` with TS2538 because a dynamic `data[...]` lookup used `[]` as a possible key. This was corrected with an explicit string section key and typed record lookup. Before the next module, run a full regression audit and production build; do not assume the build is clean until Vercel confirms it.
