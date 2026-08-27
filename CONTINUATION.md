# Amaal Telecoms — Phase 6 Continuation & Build-Control Prompt

## Continuity rule

This file travels with every project ZIP. The next builder must read this file and `Amaal_plan.md` before changing anything.

> **ABSOLUTE RULE: Treat the existing PostgreSQL records and existing business engine as the source of truth. Do not reset, reseed, migrate, recreate, truncate, drop, clear, or experiment with the database. Do not rewrite or replace the existing backend.**
>
> Business actions may use existing business capabilities. The Business Admin must remain a presentation and workflow layer and must never create a second source of truth.

## Current architecture

```text
Public Website
      |
Business Admin
      |
Existing controlled business engine
      |
PostgreSQL business records
```

The Technical Console remains the authoritative technical/advanced administration experience. Business Admin should expose normal business language and business workflows.

## Completed through this ZIP

- Business Admin foundation and authentication/setup.
- Premium restrained champagne/gold glassmorphism for login/setup/password reset.
- Executive Overview with meaningful business charts and operational attention.
- Sales and POS.
- Product catalogue and product administration.
- Warehouse Control / Stock.
- Purchasing and supplier operations.
- Customers and Customer 360.
- Orders and Fulfilment.
- Finance.
- Credit & instalments.
- Active/deleted staff separation and staff lifecycle presentation.
- Starter catalogue coverage for requested phone, tablet, entertainment, TV and brand structures.
- Cross-module navigation and business relationships using existing capabilities.

## Finance & Credit now completed

### Finance workspace
- Finance overview.
- Revenue, expenses and net result.
- Cash and bank position.
- Customer balances to collect.
- Supplier balances to pay.
- Income versus expense visual comparison.
- Largest expense areas.
- Assets, liabilities and equity snapshot.
- Financial entries.
- Expenses.
- Bank/cash activity.
- Taxes.
- Accounting periods and closing.
- Trial balance.
- Profit and loss.
- Reconciliation entry point.
- Controlled finance refresh/synchronization.

### Credit workspace
- Credit exposure summary.
- Credit applications and review.
- Customer credit limits.
- Open credit accounts.
- Overdue repayment attention.
- Payment recording.
- Collection follow-ups.
- Authorized restructuring.
- Customer/order/sales relationships through the existing engine.

## Audit completed in this increment

- Compared Finance against `finance-accounting.js` before building.
- Compared Credit against `credit-installments.js` before building.
- Confirmed required finance and credit permissions already exist.
- Confirmed no existing backend source module changed.
- Confirmed no SQL/schema/migration/seed/database file changed.
- Confirmed all JavaScript files pass syntax checking.
- Confirmed Render preflight passes.
- Reviewed visible business wording in newly changed areas and removed developer wording where found.
- Rechecked authentication/setup presentation and upgraded it to restrained premium glassmorphism with champagne/gold accents.

## Known validation limitation

A live production build was not executed during this packaging pass because doing so would require the deployment environment and live business-data connection. Do not claim a production build passed unless the deployment system actually reports success.

## Next module: Delivery & Logistics

The next builder must first inspect `delivery-logistics.js` and compare every business capability against the Technical Console before implementing the Business Admin Delivery workspace.

Build the module as a complete operational workspace, not a decorative summary. Include, where existing capabilities support them:

- Delivery command centre.
- Orders ready for dispatch.
- Deliveries in transit.
- Delivered and failed deliveries.
- Delayed deliveries.
- Delivery detail and journey.
- Delivery areas.
- Delivery partners.
- Assignment and status actions.
- Proof/notes/history where already supported.
- Connections to Orders, Customers, Stock and Finance where existing business relationships support them.

Preserve the restrained premium business ERP visual language, useful charts, operational tables, clear attention areas, mobile-first behaviour and ordinary business language.

## Mandatory continuity build prompt

> **Continue Amaal Telecoms from this exact ZIP.**
>
> First read `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md` and `PLAN_UPDATE_NOTES.md`. Then deeply inspect the complete current project and the existing Technical Console Delivery & Logistics capability before editing anything.
>
> Treat the existing business engine and PostgreSQL records as the only source of truth. **DO NOT reset, reseed, migrate, recreate, truncate, drop, clear, overwrite or experiment with PostgreSQL. DO NOT rewrite, replace or refactor the existing backend.** Reuse existing capabilities and permissions. If a required capability is missing, record it as a blocked dependency rather than changing the database or backend without explicit authorization.
>
> Build **Delivery & Logistics** next. Compare all existing delivery routes, permissions, status transitions, partner/area capabilities and order relationships first. Make the Business Admin a real business-management workspace with useful KPIs, delivery pipeline, trend/breakdown visuals, actionable exceptions, searchable tables, detail/journey views and safe operational actions already supported by the existing system.
>
> Business Admin must use ordinary business language only. Never expose developer terms such as API, endpoint, JSON, database, backend, server, schema, webhook, infrastructure or internal identifiers to business users. Technical words may remain inside source code where required, but not in business-facing labels, help text, errors or instructions.
>
> Preserve the premium restrained champagne/gold visual language, mobile-first layout, readable dense tables, meaningful charts and calm empty/error/loading states. Never fabricate business figures or turn missing data into zero without evidence.
>
> After Delivery & Logistics is built, audit ALL modules already built: authentication/setup, Overview, Sales/POS, Products, Warehouse Control, Purchasing, Customers, Orders/Fulfilment, Finance, Credit, Team, navigation, permissions, shared UI and the cross-module relationships. Check data mapping, loading/empty/error states, mobile behaviour, stale assumptions, wording, permission enforcement, source-of-truth boundaries and syntax/build compatibility. Debug every safe issue found.
>
> Confirm the existing backend source and database files remain unchanged. Update `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md`, `PLAN_UPDATE_NOTES.md` and `BUILD_SOURCE_FINGERPRINT.txt`. Only after the audit and validation are complete, package a complete integrity-checked ZIP containing all required continuity MD files.
