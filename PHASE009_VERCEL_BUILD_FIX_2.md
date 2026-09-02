# Phase 009 Vercel Build Fix 2

## Reported Vercel error
Next.js prerendering failed on `/categories/accessories` with:
`Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server".`

The server page was passing `getFilter={x => ...}` into the `use client` `CuratedCatalogueClient` component. Next.js 16 correctly rejects this function prop across the Server Component -> Client Component boundary.

## Fix
Removed the function prop entirely. `CuratedCatalogueClient` now accepts a serializable `filterKey` (`segment`, `type`, or `family`) and performs the field lookup inside the Client Component.

Updated callers:
- accessories: `filterKey="type"`
- iPad: `filterKey="family"`
- Galaxy Tab: `filterKey="family"`
- tablets: `filterKey="segment"`

The tablets filter remains user-friendly because comparison is case-insensitive, so labels such as `Everyday` match catalogue values such as `EVERYDAY`.

## Audits
- No `getFilter` references remain in `apps/public-web`.
- TS/TSX transpile syntax audit: PASS.
- Archive integrity: verified after packaging.

## Local build note
A local dependency installation was attempted but timed out in the execution environment. Therefore no claim of a full local Next production build is made. The reported Vercel boundary error is directly addressed in source.
