# Amaal Workstream 1 — Catalogue Authority + Media Hardening Closure

Date: 2026-09-03

## Source inspected

- Current uploaded Amaal source package
- `apps/public-web/AMAAL_MASTER_IMPROVEMENT_BP.md`
- `apps/public-web/AMAAL_PHASE023_CONTINUATION.md`
- Existing Workstream 1 audit and source implementation
- Current catalogue/media server routes and public catalogue components

## Scope

This pass continues Workstream 1 from the existing green baseline. It does not reset data and does not introduce payment functionality.

## Gap closure

| Area | Before this pass | Result |
|---|---|---|
| Public catalogue authority | DB-backed, legacy modules retained as reference | 🟢 Verified |
| Public product media authority | Product image URL could remain an unmanaged legacy URL | 🟢 Closed |
| Legacy image creation endpoint | Could accept arbitrary external URLs | 🟢 Closed |
| Publication image gate | Any `product_images` row could satisfy image readiness | 🟢 Closed |
| Media replacement caching | Immutable cache could outlive a replaced asset at the same URL | 🟢 Closed |
| Customer image fallback copy | Some public source still exposed `Product image unavailable` / preparation wording | 🟢 Closed |
| Managed upload/association | Upload → media asset → product/variant association exists | 🟢 Verified |
| Actual product photography | Database currently has no managed media | 🟡 Operational catalogue-enrichment dependency |
| Image transformation/object storage/CDN | Not implemented in this package | 🔴 Remaining architecture/infrastructure gap |

## Changes made

### 1. Managed media is now the public authority

The public catalogue API no longer trusts `product_images.url` for public product media. Product images exposed through `/api/public/catalog` must resolve to an Active + Public `media_assets` record.

### 2. Legacy external-image insertion is closed

The compatibility endpoint `/api/catalog/products/:id/images` now requires a managed `mediaId`. Arbitrary external image URLs are rejected with a migration message.

### 3. Publication readiness is stricter

Publishing a product now requires an Active + Public managed media asset. A stale, private, archived, or unmanaged image row cannot satisfy the publication image requirement.

### 4. Media replacement is cache-safe

Managed public media URLs emitted by the catalogue carry the current media checksum as a version token. Immutable caching is used only when the request version matches the current checksum. This prevents a replaced image from remaining indefinitely cached under the same logical asset ID.

### 5. Public fallback language is deliberate

Customer-facing catalogue components no longer use internal/development wording such as `Product image unavailable` or `Product photography is being prepared for this listing.` The neutral fallback is simply `Product image`.

## Verification

- `node --check server.js` — PASS
- `node --check media-management.js` — PASS
- `node --check docs/phase023/workstream1-audit.cjs` — PASS
- Workstream 1 audit — PASS
- Public TypeScript/TSX transpilation — 194 files, 0 failures
- Business Console TypeScript/TSX transpilation — included in 196-file scan; only `next-env.d.ts` declaration files were excluded from transpile success counting because the compiler API cannot emit them
- No database reset, truncate, or destructive catalogue operation introduced
- Payment providers, payment intents, webhooks, reconciliation and payment credentials were not added

## Current Workstream 1 certification

**Runtime architecture: 🟢 CLOSED / VERIFIED**

**Operational catalogue enrichment: 🟡**

The remaining operational work is to supply and approve real product photography and enrich/publish products intentionally held in Draft/Hidden state.

The Master BP's longer-term media target of image transformation plus object storage/CDN remains a separate infrastructure evolution and is not falsely marked complete by this pass.

## Next boundary

Workstream 1 is now stable enough to hand its foundations to Workstream 2: authentication and account identity.
