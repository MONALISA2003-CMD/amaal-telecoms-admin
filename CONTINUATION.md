# Amaal Phase 5 Continuation

Phase 4 remains frozen as the validated Technical Console and Super Engine.

Phase 5 foundation now includes `apps/business-admin` as a separate Next.js/Vercel application. Render + Phase 4 remains the engine and PostgreSQL remains the single source of truth.

## Deep inspection completed

The continuation was checked against both `Amaal_plan.md` and the Phase 5 foundation:

- Business Admin is correctly separated from the Phase 4 Technical Console.
- The Business Admin uses a server-side API proxy and does not carry PostgreSQL credentials.
- The Phase 4 engine registers the major business modules: Sales/POS, Procurement, CRM, Orders, Website, Pricing, Delivery, Warranty, Returns, Credit, Finance, BI, AI BI, Integrations, Search, Media, Operations, Monitoring and Backup.
- Existing catalogue and inventory APIs already expose the core read/write contracts required for the first operational workspaces.
- `/api/me` exposes the authenticated user's permissions, making it the correct source for Business Admin navigation visibility.
- The Phase 4 `Manager` system role currently has a much smaller permission set than the broad Manager experience described in the master plan. The Business Admin now respects the actual backend permissions rather than pretending those screens are available.
- The original overview contained hard-coded chart and attention content. The executive overview is now connected to real engine summaries and displays an em dash when a role cannot access a source rather than inventing a value.
- The original search button targeted a non-existent DOM element. It now opens the Business Search workspace, backed by `/api/global-search` and its existing permission-aware result filtering.

## Continuation delivered

### Executive Experience

- Real executive revenue and gross-profit metrics when BI/Sales permissions are available.
- Live stock, order, customer and procurement signals.
- Attention center based on real counts.
- Quick links into core workspaces.
- No duplicate business data.

### Core Business Workspaces

The main Business Admin routes now resolve to business-facing workspaces backed by existing Phase 4 endpoints:

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

The first increment intentionally focuses on trustworthy visibility and routing before introducing mutation-heavy forms. Detailed create/edit/approve workflows should be added one workspace at a time against the already-implemented API contracts.

### Security and navigation

- Navigation visibility is now based on actual backend permissions returned by `/api/me`.
- The frontend does not grant permissions; backend authorization remains authoritative.
- Search results inherit the existing permission-aware Phase 4 search implementation.
- Technical modules remain outside Business Admin.

## Important architecture findings

1. Do not create a second business database.
2. Do not copy Phase 4 tables into the Vercel application.
3. Do not expose PostgreSQL credentials to Next.js client code.
4. Do not add frontend-only authorization as a replacement for backend `need(...)` checks.
5. Do not silently broaden Manager access. If the planned Manager experience is required, add the required permissions/role policy deliberately in Phase 4 first.
6. Keep finance, inventory, orders and operational history authoritative in the existing engine.
7. Keep Public Website as a later connected layer.

## Next build order

1. Finish Sales workspace: POS, sales history, quotes and approval flows.
2. Finish Products workspace: catalogue, product detail, variants, pricing and website publishing controls.
3. Finish Stock workspace: receiving, transfers, stocktakes, incidents and reorder rules.
4. Finish Purchasing and Customers with detail pages and mutation workflows.
5. Add notifications, loading/error states and richer global search navigation.
6. Add role-specific Manager/Sales/Inventory/Finance/Procurement/Customer Service experiences only after their backend permissions are explicitly aligned.
7. Then proceed to Money and Service, Website Management, Public Website and Commerce according to `Amaal_plan.md`.

No PostgreSQL reset, destructive migration or duplicate data store is part of this continuation.
