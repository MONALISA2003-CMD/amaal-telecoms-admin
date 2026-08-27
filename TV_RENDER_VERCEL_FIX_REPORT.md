# TV + Render + Vercel Correction Report

Source: `MASTER_TELEVISION_PRODUCT_CATALOG.md` v1.0 (2026-08-28)

## Corrections

- Render brand seeding is now conflict-safe on the unique `brands.slug` key.
- Existing `chiq` is reused and normalized to `CHiQ` rather than inserting a duplicate.
- Legacy TV-only brand seed creation was removed from the starter seed.
- The catalogue products endpoint now permits up to 500 rows per request.
- Business Admin Products page loads all catalogue pages instead of only the first 100 records.
- Business Admin catalogue refresh loads all catalogue pages as well.
- Existing Neon data has NOT been reset, truncated, or deleted by this offline correction.

## Verification

- Render server JavaScript syntax: PASS
- TV builder Python syntax: PASS
- Canonical TV product SQL rows have unique product slugs: PASS
- Legacy TV-only seed brands absent: PASS

## Live deployment limitation

This ZIP was corrected from the latest local project snapshot. A live GitHub/Vercel/Render deployment was not claimed because the connected GitHub write operation currently returns HTTP 403. Neon was not modified.


## Global Star correction — 2026-08-28

The canonical television source identifies **Global Star** as the brand. **LG Global Star is not a canonical brand.**

The current source now: 
- uses `Global Star` / `global-star`;
- removes `LG Global Star`, `SPJ`, and `Smart Plus` from the Business Admin starter brand source;
- adds an idempotent Render-start normalization that reassigns legacy TV products from `LG Global Star` to `Global Star`, corrects their displayed name, and preserves historical records;
- makes the legacy brand inactive/hidden after its active TV references are removed.

Live Neon execution is still dependent on the database connector accepting the production project; no destructive database operation is performed by this correction.
