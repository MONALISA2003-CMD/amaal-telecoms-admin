# Amaal Telecoms — Phase 5 Continuation & Build-Control Prompt

## Continuity rule

This file travels with **every project ZIP**. It is the hand-off contract for the next build. The next builder must read this file **and `Amaal_plan.md` before changing anything**.

The existing Phase 4/Render business engine and PostgreSQL database are authoritative and frozen for this UI/product increment.

> **ABSOLUTE RULE: DO NOT TOUCH, RESET, RESEED, ALTER, MIGRATE, RECREATE, CLEAR, TRUNCATE, OR EXPERIMENT WITH THE DATABASE. DO NOT MODIFY THE BACKEND ENGINE. DO NOT REPLACE OR REWRITE EXISTING BACKEND ROUTES.**
>
> Business Admin may consume existing backend APIs and may submit normal user actions through those already-existing APIs. Any database write caused by an intentional business action must be performed by the existing engine exactly as it already does today. The Business Admin itself must never connect directly to PostgreSQL or create a second source of truth.

---

# 1. Current Architecture

```text
Public Website (future Vercel experience)
              |
Business Admin (current Vercel/Next.js experience)
              |
       Existing controlled API
              |
Existing Phase 4 Render Business Engine
              |
        PostgreSQL database
```

The Business Admin is a presentation/business-workflow layer. It is **not** a replacement engine and **not** a database owner.

---

# 2. Current Build Status

## Foundation already built

- Next.js 16 Business Admin application.
- TypeScript.
- Vercel-compatible configuration.
- Server-side engine request layer.
- Secure cookie forwarding through the Business Admin proxy.
- Business authentication and first-account setup flow.
- Premium restrained champagne/gold glassmorphism for login/setup.
- Role/permission-aware Business Admin navigation.
- Responsive business shell, sidebar and topbar.
- Global search workspace.
- Executive Overview.
- Business workspace routing for core modules.
- Real engine-backed summary cards.
- Safe unavailable states instead of fabricated figures.
- No PostgreSQL credentials in the frontend.
- No duplicate business data store.

## Sales module now built

The current increment is the **Sales workspace**.

### Sales dashboard

- Sales-value KPI.
- Transaction KPI.
- Units-sold KPI.
- Draft-sales KPI.
- 30-day sales trend.
- Payment-method donut chart.
- Top-product sales chart.
- Cashier-performance chart.
- Searchable sales history.
- Status filtering.
- Quote visibility and approval workflow where the current role has the corresponding existing permissions.

### Sales detail

- Sale summary.
- Sale lines.
- Payments.
- Approval history.
- Status history.
- Existing permission-aware actions such as void and Finance sync.

### POS

- Existing inventory-location selection.
- Product/SKU search against the existing sales product endpoint.
- Cart.
- Quantity controls.
- Payment method selection.
- Completion through the existing `/api/sales` transaction endpoint.
- Existing engine remains responsible for price calculation, stock validation, tax, approval rules, inventory movement, finance posting and audit logging.

---

# 3. Existing Modules Already Routed / Foundationed

The current Business Admin has business-facing routes for:

- Overview
- Sales
- Products
- Stock
- Purchasing
- Customers
- Orders
- Finance
- Credit
- Delivery
- Service
- Website
- Reports
- Team
- Business Settings
- Search

Most of these remain **visibility/routing/summary foundations** rather than fully finished operational workspaces.

Do not mark a module complete merely because its route renders.

---

# 4. What Remains To Be Built

## Immediate next modules

1. **Products** — full catalogue workspace, product detail, variants, pricing, publishing controls.
2. **Stock** — warehouse control center, receiving, transfers, stocktakes, incidents, reorder actions.
3. **Purchasing** — suppliers, purchase requests, purchase orders, receiving and procurement detail workflows.
4. **Customers** — customer directory, customer detail, balances, cases and permitted customer actions.
5. **Orders & Delivery** — operational pipeline, order detail, fulfilment and delivery exceptions.
6. **Finance & Credit** — conservative financial dashboards, receivables/payables, credit workflows.
7. **Service** — returns, warranty and repairs.
8. **Website Management** — approved content and publishing workflows.
9. **Reports / Business Intelligence** — investigation-grade filters and drill-down.
10. **Team / role-specific experiences** — only after backend permissions are explicitly aligned.
11. **Public Website**.
12. **Commerce**.
13. **Unified cross-platform polish and regression pass**.

---

# 5. Required Build Procedure For EVERY Future Increment

Before writing code:

1. Read `Amaal_plan.md`.
2. Read this `CONTINUATION.md`.
3. Inspect the current ZIP/project tree.
4. Inspect the existing implementation of the module being continued.
5. Inspect the existing Render/Phase 4 API contracts needed by that module.
6. Identify reusable existing endpoints and permission names.
7. Do **not** invent backend contracts when an existing one already exists.
8. Do **not** modify backend code, schema, SQL, migrations, seeds or database configuration.
9. Do **not** create a second database or local business-data cache.

Then build the **next module in the remaining-build list**, not an unrelated feature.

---

# 6. Required UI/UX Standard

Every module must feel like one premium business-management system.

Use:

- restrained champagne/gold accents;
- clean stable surfaces for dense business data;
- glassmorphism primarily for premium/auth/modal surfaces;
- strong information hierarchy;
- KPI summary first;
- trend/performance second;
- composition/breakdown third;
- operational detail fourth;
- attention/actions fifth;
- graphs that answer real business questions;
- tables for investigation;
- mobile-first responsive behaviour;
- accessible labels and readable charts;
- real business terminology rather than technical terminology.

Do not turn the dashboard into a decorative collection of cards.

---

# 7. Data Integrity Rules

Every future module must:

- read authoritative data from the existing engine;
- use the existing permission model;
- never fabricate numbers;
- never silently convert unavailable data to zero;
- never expose PostgreSQL credentials;
- never create local business tables;
- never duplicate authoritative business records in Vercel;
- never reset or migrate PostgreSQL;
- never rewrite Phase 4 backend behaviour;
- preserve existing auditability;
- keep financial, stock, customer, order and operational truth in the existing engine.

If an existing API cannot provide a planned metric, display an honest unavailable state and record the gap in the audit report. Do **not** invent a replacement data source.

---

# 8. Full Audit Requirement

After building the next module, perform a **full regression audit of ALL existing Business Admin modules**, not just the newly changed files.

Audit at minimum:

- Authentication.
- Setup/login routing.
- Protected routes.
- Permission-aware navigation.
- Overview.
- Sales.
- Products.
- Stock.
- Purchasing.
- Customers.
- Orders.
- Finance.
- Credit.
- Delivery.
- Service.
- Website.
- Reports.
- Team.
- Settings.
- Search.
- API proxy.
- Mobile layouts.
- Loading/error/empty states.
- TypeScript types.
- React/Next.js route behaviour.
- Dependency compatibility.
- Security boundaries.
- Accidental backend/database changes.

Check for:

- compile errors;
- TypeScript errors;
- lint errors;
- broken imports;
- invalid routes;
- incorrect permissions;
- stale/hard-coded business data;
- fabricated dashboard values;
- broken mobile layouts;
- unsafe client-side secrets;
- accidental database/backend modifications;
- regressions caused by the new module.

Fix discovered issues before packaging whenever the fix stays inside the Business Admin/UI layer.

If a defect requires backend/database changes, **do not make that change**. Record it clearly as a blocked dependency in `AUDIT_REPORT.md`.

---

# 9. Verification Before ZIP

Run, where dependencies/environment permit:

```bash
npm install
npm run build
npm run lint
npm test
```

Also perform static inspections of routes, imports, permissions and engine contracts.

A failed local dependency installation caused by unavailable package registry/network access is **not** permission to change dependency versions blindly. Preserve the known-good dependency contract unless a verified compatibility issue exists.

---

# 10. Required ZIP Contents

Every future ZIP must contain the complete project plus these continuity documents at the project root:

- `Amaal_plan.md` — current master plan, updated with the latest implementation status where appropriate.
- `CONTINUATION.md` — this hand-off prompt, updated for the current build.
- `AUDIT_REPORT.md` — latest full audit, findings, fixes and any blocked dependencies.
- `PLAN_UPDATE_NOTES.md` — concise record of what changed in the plan for this increment.
- existing project README/documentation files.

Do not omit the continuity documents from a future ZIP.

---

# 11. Required Final Packaging Procedure

Before packaging:

1. Build the next module.
2. Audit the new module.
3. Audit **all** existing modules.
4. Debug and fix Business Admin issues found.
5. Re-run build/lint/tests where possible.
6. Confirm no backend files were modified.
7. Confirm no schema/database/migration/seed changes were introduced.
8. Confirm no PostgreSQL reset/reseed/truncate/drop operation was added.
9. Update `Amaal_plan.md` if implementation status changed.
10. Rewrite this `CONTINUATION.md` to describe:
   - current build;
   - what is already complete;
   - what remains;
   - known limitations;
   - exact next module;
   - exact continuity instructions.
11. Update `AUDIT_REPORT.md`.
12. Update `PLAN_UPDATE_NOTES.md`.
13. Create the ZIP only after the audit is complete.
14. Verify the ZIP actually contains the updated MD files and the complete application.

---

# 12. NEXT BUILDER PROMPT

> **Continue the Amaal Telecoms Phase 5 Business Admin from the project contained in this ZIP. First deeply inspect `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md`, and the existing code. Do not assume previous work is correct. Audit the existing implementation and the existing Render/Phase 4 API contracts. Then build the NEXT unfinished module in the stated build order. Do not build an unrelated feature. Treat the existing Render business engine and PostgreSQL database as the single source of truth. Do not touch, reset, reseed, migrate, alter, truncate, recreate or experiment with the database. Do not modify, rewrite or replace the backend engine. Consume existing APIs and permissions only. During development, audit all existing Business Admin modules for regressions, TypeScript/build/lint errors, route problems, permission problems, UI/UX defects, mobile issues, hard-coded/fabricated data and security boundary problems. Debug and fix all Business Admin-layer defects found. Do not hide failures with fabricated values or bypass backend authorization. After the next module is built, perform a full regression audit of every existing module. Run build/lint/tests where the environment permits. Update `Amaal_plan.md`, rewrite `CONTINUATION.md` with the new current state and next step, update `AUDIT_REPORT.md` and `PLAN_UPDATE_NOTES.md`, then package the complete project into the next ZIP. The ZIP must contain all four continuity MD files at its root. Before delivering the ZIP, verify that no backend/database files were changed and that the ZIP contains the complete corrected project.**

---

# 13. Current Next Module

**Products workspace.**

The next builder should deepen Products into a real business catalogue workspace while preserving the same dashboard/visual system used by Sales.

Priority:

1. Product catalogue dashboard.
2. Product search/filtering.
3. Product detail.
4. Variants.
5. Pricing visibility.
6. Website publishing status.
7. Product intelligence widgets.
8. Permission-aware actions using only existing catalogue contracts.
9. Full regression audit.
10. Update all continuity MD files.
11. Package the next ZIP.
