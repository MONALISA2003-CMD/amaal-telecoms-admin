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

- Next.js 16 Business Admin.
- TypeScript.
- Vercel-compatible configuration.
- Server-side engine request layer.
- Secure cookie forwarding through the Business Admin proxy.
- Business authentication and first-account setup flow.
- Premium restrained champagne/gold glassmorphism for login/setup.
- Role/permission-aware navigation.
- Global search.
- Business workspace routing.
- Engine-backed summaries.
- Honest unavailable states.
- No PostgreSQL credentials in the frontend.
- No duplicate business data store.

## ERP experience refinement now built

The shared Business Admin experience has been upgraded before continuing into more modules.

### Executive Overview

- Executive command-centre header.
- KPI hierarchy.
- Revenue trend chart from existing analytics when available.
- Payment composition chart from existing analytics when available.
- Product contribution chart from existing analytics when available.
- Operational Attention Centre.
- Direct action strip.
- Responsive mobile hierarchy.
- Clear unavailable states when the existing engine does not expose a metric.

### Shared shell

- ERP-style grouped navigation.
- Command / Commerce / Operations / Money / Business navigation groups.
- Existing permission checks preserved.
- Improved topbar/search affordance.
- Restrained premium visual language.
- Stable surfaces for dense business information.
- Glassmorphism reserved mainly for authentication/premium surfaces.

## Sales module already built

- Sales dashboard.
- Sales trend.
- Payment mix.
- Top products.
- Cashier comparison.
- Sales history/search/filter.
- Sale detail.
- Quote visibility/actions using existing permissions.
- POS using the existing sales engine.

---

# 3. Existing Modules Already Routed / Foundationed

The current Business Admin has routes for:

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

Most non-Sales modules remain foundation/summary workspaces rather than complete operational experiences. Do not mark them complete merely because a route renders.

---

# 4. What Remains To Be Built

1. **Products** — next module.
2. **Stock**.
3. **Purchasing**.
4. **Customers**.
5. **Orders & Delivery**.
6. **Finance & Credit**.
7. **Service**.
8. **Website Management**.
9. **Reports / Business Intelligence**.
10. **Team / role-specific experiences**.
11. **Public Website**.
12. **Commerce**.
13. **Unified cross-platform polish and final regression.**

---

# 5. Required Build Procedure For EVERY Future Increment

Before writing code:

1. Read `Amaal_plan.md`.
2. Read this `CONTINUATION.md`.
3. Inspect the current ZIP/project tree.
4. Inspect the existing implementation of the module being continued.
5. Inspect existing Render/Phase 4 API contracts required by that module.
6. Identify reusable existing endpoints and permission names.
7. Do not invent backend contracts when an existing contract already exists.
8. Do not modify backend code, schema, SQL, migrations, seeds or database configuration.
9. Do not create a second database or local business-data source.
10. Build the **next module in the remaining-build list**.

After building it, **audit ALL modules**, not only the new module.

Then:

- debug all Business Admin issues found;
- fix frontend/UI issues where safe;
- verify backend/database boundaries;
- update all continuity MD files;
- create the audited ZIP only after these steps.

---

# 6. Mandatory UI/UX Standard

Every module must feel like the same premium business ERP.

Use the master hierarchy:

```text
BUSINESS CONTEXT
      ↓
KPI / PERFORMANCE SUMMARY
      ↓
TREND / PERFORMANCE
      ↓
COMPOSITION / BREAKDOWN
      ↓
OPERATIONAL DETAIL
      ↓
ATTENTION / EXCEPTIONS
      ↓
DIRECT ACTIONS
```

Use:

- restrained champagne/gold accents;
- deep navy navigation;
- stable readable surfaces for dense ERP data;
- glassmorphism mainly for authentication, setup, modals and premium surfaces;
- meaningful graphs;
- tables for exact investigation;
- clear loading/empty/error states;
- mobile-first behaviour;
- accessible labels and readable chart legends;
- real business language.

Do not turn dashboards into decorative collections of cards.

---

# 7. Data Integrity Rules

Every module must read authoritative data from the existing engine and use its existing permission model.

Never:

- fabricate numbers;
- silently turn missing data into zero;
- expose PostgreSQL credentials;
- create local business tables;
- duplicate authoritative records in Vercel;
- reset, reseed, truncate, drop or migrate PostgreSQL;
- rewrite the Render/Phase 4 backend;
- replace existing backend routes.

Normal user actions may call existing backend endpoints. The existing engine remains responsible for all database writes.

---

# 8. Full Audit Requirement

After every new module, audit at minimum:

- Authentication/setup.
- Protected routes.
- Permission-aware navigation.
- Overview.
- Sales/POS/detail.
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
- TypeScript/imports/routes.
- Dependency compatibility.
- Security boundaries.
- Backend/database change detection.

If a defect requires backend/database changes, do not make it. Record it as a blocked dependency in `AUDIT_REPORT.md`.

---

# 9. Verification Before ZIP

Run, where dependencies/environment permit:

```bash
npm install
npm run build
npm run lint
npm test
```

Also perform static route/import/permission/API-contract checks.

Do not claim a successful build if the environment prevents it.

---

# 10. Required ZIP Contents

Every ZIP must contain the complete project plus these root-level continuity documents:

- `Amaal_plan.md`
- `CONTINUATION.md`
- `AUDIT_REPORT.md`
- `PLAN_UPDATE_NOTES.md`
- existing README/documentation files

---

# 11. Final Packaging Procedure

Before packaging every future ZIP:

1. Build the next module.
2. Audit the new module.
3. Audit **all existing modules**.
4. Debug and fix Business Admin issues.
5. Re-run build/lint/tests where possible.
6. Confirm no backend files were modified.
7. Confirm no SQL/schema/migration/seed/database changes were introduced.
8. Update `Amaal_plan.md`.
9. Rewrite this `CONTINUATION.md` with the exact current status.
10. Update `AUDIT_REPORT.md`.
11. Update `PLAN_UPDATE_NOTES.md`.
12. Create the ZIP only after the audit is complete.

The final response must state what was built, what was audited, any validation blocker, and the next module.

---

# 12. Continuity Prompt For The Next Builder

> **CONTINUE Amaal Telecoms Business Admin from the current ZIP.**
>
> First read `Amaal_plan.md` and `CONTINUATION.md`. Then deeply inspect the entire current project and the existing implementation before editing anything.
>
> **Current build:** Next.js Business Admin foundation + premium authentication/setup + permission-aware ERP shell + Executive Overview v2 command centre + Sales dashboard/detail/POS. The shared visual system is now the master ERP template.
>
> **Already built:** authentication/setup, shell/navigation, search, Executive Overview, Sales, Sales detail, POS, shared premium visual language and engine-backed dashboard patterns.
>
> **Next module:** Products. Build the Products workspace deeply using existing authoritative Render APIs only. Make it a real catalogue management experience with dashboard context, search/filtering, product detail, variants, pricing visibility, publication status and permission-aware actions where the existing contracts support them.
>
> **Mandatory workflow:** inspect → build Products → audit Products → audit ALL existing modules → debug/fix frontend issues → verify routes/types/permissions/mobile UX/API contracts → verify backend/database were untouched → update `Amaal_plan.md`, `CONTINUATION.md`, `AUDIT_REPORT.md`, and `PLAN_UPDATE_NOTES.md` → ZIP the complete project.
>
> **ABSOLUTE:** do not touch, reset, reseed, migrate, recreate, truncate, drop or experiment with the PostgreSQL database. Do not modify, rewrite, replace or “fix” the Render/Phase 4 backend. Do not create another database or source of truth. Business Admin may only consume existing backend APIs and perform normal user actions through existing routes.

---

# 13. Current Next Module

**Products workspace.**

The next builder must inherit the upgraded Executive Overview visual system rather than creating a separate design language.
