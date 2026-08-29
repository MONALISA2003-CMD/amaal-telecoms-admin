# Amaal Phase 23 — Public Website Continuation

**Date:** 29 August 2026
**Baseline:** Phase 22 merged project
**Status:** In progress — discovery/navigation foundation built

## What was built

The public customer website under `apps/public-web` was extended with:

- primary navigation structure;
- Shop, Categories, Brands, Deals and Services entry points;
- search page and query handling;
- shop/product listing page;
- category index;
- category landing route;
- product detail route;
- reusable product listing presentation;
- responsive listing/search/detail styling;
- public-catalogue-driven product data rather than seeded demo products;
- Vercel deployment instructions for the correct monorepo path.

## Repository / Vercel correction

The public website is physically located at:

`src/livefix/apps/public-web`

If the Git repository root is the full extracted project, use that exact path in Vercel.

If the repository was initialized from inside `src/livefix`, the equivalent Vercel root is `apps/public-web`.

The Git repository must actually contain the selected path. Vercel cannot locate a directory that exists only inside a ZIP stored elsewhere.

## Existing system preserved

The original project remains the source of truth. The Business Admin Console, backend, database/schema and existing business modules were not replaced.

## Database rule

**NO DATABASE RESET.**

**NO DATABASE RECREATION.**

**NO TABLE DROPS.**

**NO DESTRUCTIVE MIGRATIONS.**

**NO RE-SEEDING.**

The public website consumes public-safe backend/catalogue capabilities.

## Verification status

The public-web package was inspected and targets Node 24 with Next.js 16 / React 19.

A local dependency installation/build was attempted, but this execution environment timed out during `npm install`; therefore no false claim of a successful production build is made.

## Found / verified

- Existing public catalogue integration foundation exists.
- Existing backend remains the business-system source of truth.
- Public website is a separate frontend application inside the same project tree.
- Product discovery can now be expanded without duplicating the database model.

## Remaining

1. Verify exact public search/filter API capabilities against the backend.
2. Replace provisional category matching with authoritative category IDs/slugs from the API.
3. Verify real product detail payload and image fields.
4. Build cart state against backend commerce capabilities.
5. Build checkout/payment only after verifying existing APIs.
6. Build customer account and authentication.
7. Build order history/tracking.
8. Build deals/promotions from authoritative public promotion data.
9. Build warranty, returns and repairs/service flows.
10. Build enquiry/lead capture.
11. Complete accessibility, SEO and performance pass.
12. Perform production build and deployment verification in the target Node/Vercel environment.

## Next phase

**Phase 24 — Product + Commerce foundation:** authoritative product detail, variant selection, add-to-bag/cart architecture and API capability verification.
