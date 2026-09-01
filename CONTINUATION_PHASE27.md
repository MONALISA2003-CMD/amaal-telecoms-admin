# Amaal Continuation — Phase 27

## Public Website — Prototype UX Merge + Premium Homepage V1

### Built
- Merged the strongest customer-facing UX direction from `amaal-telecoms-prototype.zip` into the existing Next.js public website rather than maintaining a second static storefront.
- Reworked the public homepage around the agreed **Luxury Lifestyle / Premium Retail** direction:
  - cinematic dark hero;
  - restrained champagne/gold accent;
  - premium editorial typography;
  - trust/value strip;
  - category discovery;
  - campaign/editorial section;
  - featured products;
  - trusted brands;
  - Amaal difference/story;
  - after-sales services;
  - newsletter CTA;
  - premium footer.
- Added the supplied real product photography to the public web app under `apps/public-web/public/products/` for the hero and visual catalogue treatment.
- Added reusable public components:
  - `SiteHeader` with responsive mobile navigation;
  - `SiteFooter`;
  - `ProductCard`;
  - `AddToBag` client interaction;
  - `InfoPage` for service/company content.
- Expanded customer-facing routes for:
  - Shop;
  - Search;
  - Categories;
  - Category detail;
  - Brands;
  - Brand detail;
  - Deals;
  - Services;
  - About;
  - Contact;
  - FAQ;
  - Delivery;
  - Returns;
  - Tracking;
  - Warranty;
  - Repairs;
  - Account;
  - Cart.
- Fixed public catalogue typing to match the existing backend contract and added `NEXT_PUBLIC_API_BASE_URL` support.
- Product discovery now uses the authoritative public catalogue endpoint when available.
- Product cards and product detail use the typed `image()` and `price()` helpers.
- Client-side bag is intentionally limited to pre-checkout selection; it does **not** create orders or declare payment success.

### Prototype material intentionally not copied as a second system
- The prototype's static `AMAAL_CATALOG` remains reference material only.
- Prototype `localStorage` overrides, demo prices, demo stock, simulated orders and client-side commerce state are not treated as the production business source of truth.
- Production product/catalogue truth remains the existing backend/database public-safe API boundary.

### Real product photography added
- iPhone 17 Pro Max
- Samsung Galaxy S26 Ultra 256GB
- Samsung U8000F 75-inch TV
- Samsung B550 Soundbar
- TCL 606L Refrigerator
- Hisense HFG60121X Cooker
- HP Omen Gaming Laptop

### Found / verified
- Existing backend already exposes `GET /api/public/catalog` with published categories, brands, products, variants and images.
- Existing Business Admin Console remains a separate Next.js application under `apps/business-admin`.
- Existing backend remains `server.js` plus existing business modules.
- Existing database remains PostgreSQL and is initialized/managed by the existing backend architecture.
- The current backend does not expose a public customer checkout/order/payment API in the inspected modules; therefore production checkout/payment has **not** been fabricated in this phase.

### Intentionally not changed
- Database schema.
- Existing database records.
- Existing migrations.
- Existing backend business logic.
- Existing authentication/authorization for the business system.
- Business Admin Console.
- Internal permissions, finance, inventory, supplier, warehouse, serialized-unit or operational workflows.
- Existing backend API contracts.

### Database safety
**NO DATABASE RESET.**

No `DROP`, `TRUNCATE`, database recreation, destructive migration, production seed, or record deletion was performed.

### Verification
- All public-web TypeScript/TSX files passed a TypeScript transpilation/syntax check using the installed TypeScript compiler.
- Full `npm install` / production Next.js build could not be completed in this execution environment because dependency installation exceeded the available execution window. Therefore a successful Vercel production build is **not claimed** here.
- The previously reported Vercel TypeScript error in product detail (`image_url`, `brand`, `price` missing from `Product`) has been addressed by using the authoritative typed helpers/model.

### Vercel
- If the GitHub repository root is the full extracted project, use Root Directory: `src/livefix/apps/public-web`.
- If the GitHub repository root is `src/livefix`, use Root Directory: `apps/public-web`.
- Framework: Next.js.
- Build command: `npm run build`.
- Install command: `npm install`.
- Node: 24.x for the public-web app.

### Remaining
1. Run a real `npm install` and `npm run build` in CI/Vercel.
2. Verify the live `/api/public/catalog` payload against actual Amaal catalogue records.
3. Replace any remaining illustrative category fallback content with backend-controlled category assets as the catalogue is populated.
4. Implement public checkout/order/payment only after a verified backend contract is available.
5. Implement customer authentication/account/order tracking against the approved customer API boundary.
6. Implement promotions/deals from approved backend promotion data.
7. Connect warranty/returns/repairs/enquiries to the existing business workflows through minimal public-safe endpoints.
8. Complete accessibility, SEO, structured data, sitemap/robots and performance QA.
9. Complete mobile/tablet visual QA in Vercel preview.
10. Continue high-fidelity Figma refinement using the real product imagery.

### Next ZIP rule
Every subsequent ZIP must be produced from this complete baseline, include an updated continuation document, preserve the Business Admin Console/backend/database, and never reset/recreate the database.
