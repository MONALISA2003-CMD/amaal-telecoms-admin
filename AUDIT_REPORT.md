# Amaal Telecoms Cumulative Module Audit — 9 through 12

## Audited business modules

- Pricing & Promotions
- Delivery & Logistics
- Warranty & Repairs
- Returns & Refunds
- Document Management (cross-cutting platform capability)

## Verification completed

- All JavaScript source files pass `node --check`.
- Server imports and module registrations are present.
- New permissions are registered in the central permission list.
- New SQL tables are appended to the cumulative `schema.sql` and also kept in feature-named SQL files.
- Pricing effective-price SQL uses the correct `product_variants v` alias and no longer references the invalid `p` alias that previously caused PostgreSQL `42P01` startup failure.
- Dashboard module control center automatically exposes the newly added modules.
- Mobile navigation remains available through the dashboard module control center.
- Document upload uses database-backed `bytea` storage, not ephemeral Render filesystem storage.
- Document download is authenticated and permission controlled.
- Uploads are limited to 15 MB and restricted to PDF, JPG, PNG, WEBP, TXT, CSV, DOCX and XLSX.
- Document duplicate detection uses SHA-256 per entity.
- Delivery creation only accepts orders in `Ready for Dispatch` or `Dispatched`, preventing delivery from bypassing the order lifecycle.
- Delivery `Out for Delivery` is mapped safely to the existing fulfillment status `In Transit` so it cannot violate the database constraint.
- Delivery completion consumes active order reservations and marks serialized units Sold before completing a Dispatched order.
- Warranty claims validate referenced orders/sales and serialized-unit/variant consistency.
- Serialized warranty units enter `Service` while under service and return to `Sold` on resolution.
- Returns validate every line against the original order/sale line and prevent quantities from exceeding the original sold quantity after previous non-cancelled returns.
- Return restocking is idempotent through `restocked_at` and uses the inventory movement ledger.
- Refunds are recorded in a dedicated refund transaction table with audit events.
- No mock/demo business records were added.
- No YAML workflow file is included.
- No `node_modules` directory is included.
- No phase-number source filenames are used.

## Live-environment limitation

This package was statically audited in the build environment. A live authenticated PostgreSQL transaction against the user's Render/Neon production database cannot be truthfully claimed from this environment. The first deployment should therefore be treated as a controlled acceptance test, with Render logs checked immediately after migration/startup.

## Recommended acceptance chain

1. Open the Render root URL.
2. Use the Dashboard Module Control Center.
3. Open Pricing & Promotions and create a price list/promotion.
4. Open Orders and move an eligible paid order to Ready for Dispatch/Dispatched.
5. Open Delivery & Logistics and create a shipment.
6. Progress the shipment and confirm the order/fulfillment relationship.
7. Open Warranty & Repairs and create a claim against a real order/sale or serialized unit.
8. Open Returns & Refunds and create a return using a real order/sale line.
9. Open Documents, upload a real PDF, download it, edit metadata and delete it.
10. Revisit Dashboard and Audit to confirm the actions are recorded.
