# Amaal Telecoms Admin

Production-oriented administration console for Amaal Telecoms (Uganda). The application uses a live PostgreSQL database and does not seed mock business records.

## Feature modules
- `server.js` — Core Administration & Security, Catalog, Inventory and shared platform services
- `suppliers-procurement.js` — Suppliers & Procurement
- `customers-crm.js` — Customers & CRM
- `sales-pos.js` — Sales & POS
- `orders-ecommerce.js` — Orders & E-commerce
- `web-and-hosting.js` / `web-and-hosting.sql` — Web & Hosting
- `pricing-and-promotions.js` / `pricing-and-promotions.sql` — Pricing & Promotions
- `schema.sql` — cumulative PostgreSQL schema for all current modules
- `public/app.js` — client administration console

## Module naming rule
Feature files are named by business module, not development phase. Future modules must follow the same rule so maintenance, debugging and rebuilding can target the responsible business capability directly.

See `MODULE_MAP.md` for the canonical module map and future naming convention.

## Deployment
Set `DATABASE_URL` and `JWT_SECRET` in the hosting environment. Start with `npm start`.
