# Amaal Telecoms Admin — Phase 1–3 Stabilization

This release is a stabilization/fix release on top of Phase 3 Inventory.

## Important fixes
- Frontend JavaScript moved from inline `<script>` to `/public/app.js` so the production CSP no longer blocks the application.
- Kept `script-src 'self'` CSP; no `unsafe-inline` JavaScript was added.
- Added a JSON API error boundary for predictable server errors.
- Added automatic expiry processing for active inventory reservations.
- Prevented a product category from being assigned itself as its parent before the database update.
- Kept existing HTTP-only session authentication and CSRF protection.
- No mock products, stock, suppliers, customers, or transactions were added.
- No branch functionality was added.

## Deployment
Use the existing GitHub extraction workflow. This ZIP intentionally contains no GitHub Actions YAML.

Render remains the current admin/API deployment target. Vercel is not required for this admin deployment.
