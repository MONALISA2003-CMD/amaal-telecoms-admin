# Amaal Telecoms — Phase 7 Deployment/Catalogue Integrity Fix

Date: 2026-08-28

## Scope

This phase hardens the deployment path using the latest audited project as the base.

## Fixes

1. Render starter brand seeding now conflicts on the canonical unique `brands.slug`, preventing the existing `chiq` record from crashing startup.
2. Business Admin product loading now retrieves all catalogue pages instead of relying on a single 100/500-row window.
3. TV master catalogue remains the source of truth.
4. Global Star remains the canonical brand; `LG Global Star` is legacy data to be normalized/archived safely.
5. No production database reset, truncate, replacement, or destructive reseed was performed.

## Verification

- JavaScript syntax: PASS for all repository JS files.
- TV master catalogue audit: PASS — 210 unique models/families across 7 brands, 236 variant rows.
- `npm test`: NOT AVAILABLE — package.json has no test script.
- `npm run build`: NOT AVAILABLE — package.json has no build script; this project uses the Node/Express + static frontend start path.
- Live Neon mutation: NOT performed because the connected Neon operation was blocked before SQL execution.
- GitHub write: attempted but integration returned HTTP 403; no deployment claim is made.

## Safety rule

The next live database action must be read-only inspection first, followed by a dependency-aware transaction that only removes unreferenced obsolete catalogue rows and archives referenced historical rows.
