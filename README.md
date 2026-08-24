# Amaal Telecoms Admin — Phase 1–7

Production-oriented cumulative admin console for Amaal Telecoms (Uganda).

## Included
- Phase 1: administration, authentication, roles, permissions, security, audit, settings
- Phase 2: catalog, categories, brands, products, variants/SKUs, media, SEO, publishing
- Phase 3: inventory, receiving, adjustments, transfers, reservations, serialized/IMEI, stocktakes, incidents
- Phase 4: suppliers, procurement, requisitions, purchase orders, goods receipts, supplier invoices/payments
- Phase 5: customers, CRM, customer 360, support cases, privacy/consent
- Phase 6: sales/POS, payments, receipts, voids, inventory deduction, serialized sales
- Phase 7: orders/e-commerce, payment tracking, order lifecycle, fulfillment, reservations, serialized/IMEI assignment, order export

## Catalog additions
Administrators can create categories with icons, brands with logos, and products with images, descriptions, prices, SKUs, publishing state and promotion type (None, Flash Sale, Promotional).

## Data policy
No mock/demo business records are included.

## Deployment
Run `npm install` then `npm start`. Set `DATABASE_URL` and a strong `JWT_SECRET`. The application listens on `PORT` when provided by the host.

This archive intentionally contains no GitHub workflow/YAML file.
