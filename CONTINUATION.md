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
