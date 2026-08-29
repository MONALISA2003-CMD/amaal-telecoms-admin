# Amaal Public Website — Continuation

## Current build

### Public Website V1 — Foundation + Homepage

This ZIP is the next continuation of the Amaal public website work.

### What is being built in this continuation

1. A new customer-facing Next.js application at `apps/public-web`.
2. Amaal premium light/modern/luxury global visual foundation.
3. Public website header with:
   - Shop
   - Categories
   - Brands
   - Deals
   - Services
   - Search
   - Account
   - Bag
4. Homepage V1 with:
   - premium hero
   - trust/value strip
   - real public catalogue categories
   - real public catalogue featured products
   - brand section
   - deals/campaign section
   - after-sales/service section
   - footer
5. Public catalogue client integration using the existing `GET /api/public/catalog` endpoint.
6. No database schema changes.
7. No database reset.
8. No replacement of the existing Business Admin Console.
9. No duplicate product/order database.
10. Product/category/brand content remains backend-controlled.

## Verified existing foundation used

The existing backend already exposes a public catalogue endpoint at `/api/public/catalog` and filters published products/categories/brands/collections through the existing public-safe boundary.

The public website therefore consumes that data instead of seeding a second catalogue.

The existing public web/content routes in `web-and-hosting.js` remain available for later phases.

## Important safety rule

**DO NOT RESET THE DATABASE.**

Do not:

- drop tables;
- truncate tables;
- recreate the database;
- run starter seeds against production;
- replace the current database;
- delete existing business data.

All public website work in this continuation is additive at the application layer unless a later verified API gap requires a minimal, non-destructive backend change.

## What is still remaining

### Discovery

- verify all public catalogue fields against live/staging data;
- verify category taxonomy;
- verify brand data;
- verify product variants;
- verify availability rules;
- implement real search;
- implement real filters/sorting;
- implement category/brand routes.

### Commerce

- product detail route;
- cart;
- checkout;
- delivery selection;
- payment;
- order confirmation;
- customer account;
- order history;
- order tracking.

### After-sales

- returns;
- warranty claims;
- repair/service requests;
- customer support;
- enquiries/leads.

### Content

- About;
- Contact;
- FAQ;
- Delivery;
- Returns policy;
- Warranty policy;
- Terms;
- Privacy.

### Quality

- SEO metadata per route;
- structured data;
- sitemap/robots configuration appropriate for the public site;
- accessibility review;
- responsive QA;
- performance optimization;
- error/empty/loading states;
- production integration testing.

## Figma status

Figma UX Architecture V1 has been started.

Next Figma screens to build from this continuation:

1. Homepage V1
2. Desktop mega menu
3. Mobile navigation
4. Search
5. Category/PLP
6. Product detail
7. Cart
8. Checkout
9. Account
10. Order tracking
11. Warranty/service

## Next ZIP expectation

The next ZIP should update this continuation file rather than creating an unrelated progress document.

It must state:

- what was built;
- what was found/verified;
- what was intentionally not changed;
- what remains;
- any blockers or API gaps;
- test/build status;
- database safety status.

## Database status

**NO DATABASE RESET.**

No database migration or destructive database operation is part of this continuation.

---

## Phase 23 — Discovery / Navigation / Vercel Continuation (29 Aug 2026)

### Built
- Expanded the public website into customer-facing discovery routes: Shop, Search, Categories, Category detail and Product detail.
- Added responsive discovery/listing/detail styling while preserving the premium light modern luxury direction.
- Added `apps/public-web/VERCEL.md` with the repository-root-dependent Vercel deployment rule.
- Kept the original project, Admin Console, backend and database intact.

### Important deployment finding
The correct Vercel Root Directory is `src/livefix/apps/public-web` only when the Git repository root is the full extracted project. If the repository was initialized from `src/livefix`, use `apps/public-web`. Vercel must see the directory in the Git repository; a ZIP file sitting outside the repository does not count.

### Verification
Local `npm install` was attempted but timed out in the execution environment, so a successful production build is not claimed.

### Remaining
Authoritative search/filter API mapping, product detail/variants, cart, checkout/payment, accounts, orders/tracking, promotions, after-sales, enquiries, accessibility/SEO/performance and production verification.

### Database rule
**NO DATABASE RESET / RECREATION / DROPS / DESTRUCTIVE MIGRATIONS / RE-SEEDING.**
