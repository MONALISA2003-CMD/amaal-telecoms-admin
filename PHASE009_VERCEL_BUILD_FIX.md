# Phase 009 Vercel Build Fix

## Reported production failure
Vercel failed TypeScript checking in `apps/public-web/app/search/page.tsx`:

`Property 'category' does not exist on type 'AccessoryProduct'.`

## Root cause
`AccessoryProduct` intentionally uses the canonical `type` and `segment` fields. The search page was still using the older `category` field when building its searchable text.

## Fix
Updated the accessory search expression to use:
- `type`
- `segment`
- `shortDescription`
- `description`

No schema, database, migration, destructive change, or public URL was changed.

## Audit
- Confirmed `AccessoryProduct` declaration uses `type` and `segment`.
- Confirmed the reported `.category` reference was removed from `app/search/page.tsx`.
- Searched the public app for remaining `p.category` references. None remain in the affected catalogue/search path.
- Rechecked accessory routes and catalogue references.
- Preserved existing public/admin architecture.

## Local verification limitation
A local dependency install/build could not complete within the execution window. The attempted TypeScript run was therefore not treated as a successful full build. The reported production error itself is directly fixed at its source.

## Expected Vercel result
The specific TS2339 error for `AccessoryProduct.category` should no longer occur. Vercel should proceed to the next build/type-check stage.
