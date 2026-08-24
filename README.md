# Amaal Telecoms Admin

Business administration platform for Amaal Telecoms, Uganda.

## Canonical module naming
Source files use business feature names, not phase numbers. See `MODULE_MAP.md` before changing or adding functionality.

## Current modules
Core Administration & Security; Catalog; Inventory; Suppliers & Procurement; Customers & CRM; Sales & POS; Orders & E-commerce; Web & Hosting; Pricing & Promotions; Delivery & Logistics; Warranty & Repairs; Returns & Refunds; Document Management.

## Deployment
- Node.js 20.x
- Express 5
- PostgreSQL / Neon-compatible `DATABASE_URL`
- `JWT_SECRET` required
- Run with `npm start`

## Important architecture rules
- No mock business records.
- Public website endpoints must expose only public/published data.
- Admin mutations are permission controlled and audited.
- Documents are stored in PostgreSQL, not ephemeral Render disk.
- Do not rename source files to `phaseN.*`; use the actual business module name.
