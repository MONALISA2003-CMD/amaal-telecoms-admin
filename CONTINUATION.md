# Amaal Telecoms — Continuation Prompt

## Current build
The project contains a cross-connected Amaal Telecoms Business Admin console backed by PostgreSQL and a separate public-facing website layer. Major operational areas already exist across overview, reports, sales, products/catalogue, stock/warehouse, purchasing, customers/CRM, orders, finance, credit, delivery, service, website management, team administration, governance and supporting operational services.

The catalogue has now been upgraded into a long-term Catalogue Control Centre. It separates Products, Categories, Brands, Collections and Archived records, supports category hierarchy, brand management, curated collections, safe archiving, Super Admin deletion controls and additive starter catalogue data.

## Already built
- Business Admin vertical sidebar and responsive mobile drawer.
- Live business pulse and cross-module business workspaces.
- Catalogue-first product management.
- Product creation, editing, variants, product media, tags, relationships, publishing and revision history.
- Categories and brands with create/edit/archive/delete controls.
- Catalogue collections with create/edit/archive/delete controls and product membership storage.
- Starter catalogue structure for Phones, Tablets and Entertainment.
- Starter iPhone, Samsung Galaxy and TV data remains stock-free.
- PostgreSQL additive catalogue upgrade and starter collection seed scripts.
- Audit events around catalogue changes.

## Remaining to be built
Continue the next business module, but before considering it complete:
1. Compare the module against its equivalent Technical Console module.
2. Establish all appropriate connections with existing Business Admin modules and the PostgreSQL-backed business records.
3. Make Admin able to add, edit, archive, restore and remove every business item that should be manageable.
4. Make Super Admin able to add, edit, archive, restore and permanently delete where safe and appropriate.
5. Preserve historical business records; do not destroy history merely to remove something from the active workspace.
6. Keep the public website driven by approved catalogue/business records rather than duplicated hard-coded content.
7. Ensure dashboards and visual summaries use live business records and remain empty/neutral when no real data exists rather than inventing stock, sales or financial values.
8. Audit all visible wording in the Business Admin console. Do not expose development terminology to business administrators. Use normal business language.
9. Check mobile and desktop layouts, especially the full vertical sidebar navigation.
10. Run a deep regression audit across all existing modules after the new module is built.
11. Debug all discovered issues before packaging.
12. Re-run build/type checks and available smoke/audit checks.
13. Update the plan and audit notes.
14. Package the complete updated project into one ZIP only after the work is complete.

## Critical database rule
Do NOT reset the database. Do NOT truncate tables. Do NOT drop/recreate the database. Do NOT delete existing business history to make tests pass. Use additive migrations and safe, targeted records only.

## Critical testing rule
Starter catalogue data may be added for testing behaviour, but no stock balances should be invented. Product records are catalogue records only until stock is actually received through the stock/warehouse workflow.

## Packaging rule
The final ZIP must contain the complete project, all existing Markdown documentation, the updated plan, the updated continuation prompt, audit notes, database migration/seed scripts and all frontend/backend source needed for the current build.
