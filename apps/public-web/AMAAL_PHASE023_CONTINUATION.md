# Amaal Phase 023 — Workstream 1 Closure

## COMPLETED

### Catalogue authority

Public catalogue routes now consume the published database catalogue through the existing `/api/public/catalog` path. Static category catalogue modules remain in the repository as historical seed/reference material, but public route runtime no longer imports those curated datasets.

The Business Console remains the authoritative management surface for products, variants, categories and brands. No second public product CRUD surface was introduced.

### Media pipeline

The catalogue media flow now supports:

Business Console → upload media → public media asset → product/variant association → public product delivery.

Product media supports upload, association, variant association, display ordering, primary image selection, replacement through media versions, archive/restore, and removal from a product without deleting the underlying media asset.

### Public media delivery

Public media delivery now uses content length, ETag validation and long lived immutable caching based on the media checksum. The public endpoint only serves Active media with Public visibility.

### Product image integrity

Product image associations now retain a nullable `media_id` reference so an image can be traced back to its managed media asset. Existing product image records remain compatible.

## IMPROVED

- Public phone, tablet, computer, television, audio, accessory and appliance category routes now resolve from the database catalogue.
- Public brand routes resolve against database brands and published products.
- Public product routes resolve against database products.
- Public comparison resolves against database products rather than category-specific static datasets.
- Customer-facing media placeholder language was removed from public TypeScript/TSX catalogue components.
- Product media administration no longer requires manually pasting a media ID for normal upload and selection workflows.

## BUGS FOUND AND FIXED

- Removed remaining public route dependencies on legacy curated catalogue modules.
- Added missing product image management endpoints for listing, editing, ordering/primary control and removal.
- Validated variant ownership before attaching variant-specific product media.
- Restricted product media attachment to Public managed media so a product cannot point at an inaccessible private asset.
- Corrected schema migration ordering so the new `product_images.media_id` foreign key is added only after `media_assets` exists.
- Added cache validation to public media delivery.

## VERIFIED

- 67 public route files checked for legacy static catalogue imports.
- No customer-facing `Product photo coming soon`, `Product media coming soon`, or `Product photo to be supplied by Amaal` strings remain in public catalogue source.
- Backend JS syntax check passed.
- Media management JS syntax check passed.
- 194 TypeScript/TSX files transpiled with zero syntax/transpile failures.
- Workstream 1 audit passed.
- Existing Neon data was inspected read-only. No production data was reset or deleted.

## STILL NOT BUILT

- Actual product photography for products that do not yet have approved media.
- Image transformation/resizing service for generated derivatives.
- A standalone enterprise media library workspace for bulk asset operations beyond the product media workflow.
- Full catalogue enrichment and publication of products that are intentionally still Hidden/Draft.

## INTENTIONALLY DEFERRED

- Payment gateway integration.
- External email, SMS and WhatsApp delivery providers.

## NEXT RECOMMENDED WORKSTREAM

Workstream 2: secure customer authentication and account identity, using the stabilized database catalogue and media foundations.


## WORKSTREAM 1 HARDENING PASS — 2026-09-03

The original Workstream 1 closure was re-audited from the uploaded production source package. Four additional catalogue/media authority issues were closed:

- Public catalogue image payloads now resolve only through Active + Public managed media assets. Legacy `product_images.url` values are no longer trusted by the public catalogue.
- The legacy product-image creation endpoint no longer accepts arbitrary external image URLs. It remains as a compatibility route but requires a managed `mediaId`.
- Product publication now requires an Active + Public managed media asset, rather than merely any row in `product_images`.
- Media replacement is now cache-safe. Public product image URLs carry the current media checksum, and immutable caching is used only when that version token matches the current checksum.

No data reset, truncation or deletion was introduced.
Payment remains completely deferred.

## WORKSTREAM 2 — SECURE CUSTOMER AUTHENTICATION & ACCOUNT IDENTITY — 2026-09-03

### COMPLETED

- Added a dedicated customer credential model separate from internal staff users.
- Added password-based customer registration using email or phone identity.
- Added secure customer sign-in with failed-attempt tracking and temporary lockout.
- Added device-bound customer sessions with HttpOnly, Secure, SameSite=None cookies for the cross-origin public web/API deployment model.
- Added a readable customer CSRF cookie with double-submit header validation for authenticated mutations.
- Added customer session expiry, revocation, sign-out-all and per-session revocation.
- Added customer authentication event logging without exposing passwords or authentication internals in the UI.
- Added profile editing protected by the current password.
- Added password change protected by the current password and revocation of other active sessions.
- Added activation of existing guest-checkout customer records using their existing high-entropy Amaal access token, allowing customers to establish a permanent password without forcing account creation before purchase.
- Updated existing customer account, order, address, wishlist, notification, preference, returns, warranty and service routes to accept secure customer sessions while retaining the previous access-token compatibility path.
- Updated cart merge to accept the authenticated customer session.
- Added public account UI for sign-in, registration, activation, profile, password security and active-session management.

### RECOVERY BOUNDARY

No fake email, SMS or WhatsApp provider was introduced. Account activation can use the existing private post-checkout access token. External message-based recovery remains dependent on a real delivery provider and is not fabricated.

### PRESERVED

- Guest checkout remains available.
- Customers are not forced to create an account before purchasing.
- Business Console remains the only internal management surface.
- Existing customer/order/catalogue records remain authoritative.
- Payment gateway integration remains completely deferred.
- No database reset, DROP, TRUNCATE or destructive migration was introduced.

### VALIDATION

- Backend JavaScript syntax checks passed.
- Workstream 2 static audit passed all required authentication/session/security checks.
- 131 public-web TypeScript/TSX source files transpiled with zero syntax diagnostics (excluding the framework-generated `next-env.d.ts`).
- Relative import audit passed with zero missing relative imports.
- Production Next.js build was not falsely claimed as locally executed because dependencies are not installed in the supplied source package.

### NEXT RECOMMENDED WORKSTREAM

Workstream 3: continue from the Master Blueprint after reviewing the exact remaining commerce/checkout requirements and verified backend capability. Payment remains excluded unless explicitly reopened.
