# Amaal Audio Catalogue — Phase 006.1 Hardening

## Scope

This hardening pass keeps the existing Amaal public website, Business Console and backend intact. It adds Audio as a first-class catalogue experience without creating a second product-management system.

## Public website

- `/audio` is the customer landing page.
- `/audio/brand/[brand]` provides brand browsing.
- `/audio/[slug]` provides the full product page.
- Search, brand, experience and product-type filtering are client-side and mobile-first.
- Cards expose only customer-useful quick information.
- Full specifications appear only on the product page.
- Prices are intentionally presented as **Price coming soon** until Amaal confirms live pricing.
- Product imagery is not bundled into the repository. Cards use a premium placeholder until media is supplied.
- Product detail pages can consume remote media from the existing public catalogue API after an administrator publishes a product.

## Business Console

Audio uses the existing Catalogue Manager, Product Admin, taxonomy and media workflow. No duplicate Audio CRUD console is introduced.

Starter catalogue data now includes the Phase 006 Audio products so the Business Console's existing catalogue model understands the same category/brand/product vocabulary.

## Backend and database

`audio-catalogue-seed.sql` is additive and transaction-wrapped. It uses `ON CONFLICT` for brands, categories, products and variants and is loaded by the existing server bootstrap.

No database reset, truncate, destructive migration or inventory deletion is used.

The public catalogue endpoint remains the canonical public media bridge. Internal identifiers, costs, supplier information, warehouse data, serial/IMEI data and other sensitive fields continue to be stripped before public output.

## Media lifecycle

```text
Business Console upload
        ↓
Remote/object media storage
        ↓
product_images record
        ↓
existing public catalogue API
        ↓
Audio detail/card media
```

The repository deliberately contains no large product-image library.

## Verification

Run:

```bash
npm run audit:audio
```

Then, in an environment with dependencies available:

```bash
npm run build --prefix apps/public-web
```

and the repository-level production/readiness checks.

A production build must be executed in CI/Vercel before claiming deployment certification.
