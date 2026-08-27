# Vercel Build Fix — API Route Collision

## Problem fixed
The Business Admin contained two root API catch-all routes:

- `app/api/[...path]/route.ts`
- `app/api/[...proxy]/route.ts`

Next.js 16 treats both as the same route pattern (`/api/[...]`) and stops the production build with an ambiguous-route error.

## Resolution
The obsolete duplicate `app/api/[...path]/route.ts` was removed.

The remaining `app/api/[...proxy]/route.ts` is the general Business Admin API bridge and forwards `/api/*` requests to the existing Amaal business engine.

The dedicated `app/api/engine/[...path]/route.ts` remains because it intentionally handles the restricted catalogue bridge used by the Business Admin product administration area.

## Data safety
No database was reset, recreated, migrated, seeded, or deleted by this fix.
