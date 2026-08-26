# Vercel Build Notes

## Deployment fixes included

1. `@tanstack/react-query` corrected from the unresolvable `5.90.0` pin to `5.102.4`.
2. `Workspace` card values now accept `string | number`, matching live business metrics.
3. Next.js 16 middleware convention migrated from `middleware.ts` to `proxy.ts`.
4. The existing `amaal_session` authentication redirect behavior is preserved.

## Database safety

This package is a frontend/Business Admin deployment repair only.

- PostgreSQL remains the system of record.
- No database connection was made during this repair.
- No SQL migration was run.
- No schema was changed.
- No seed/reset/cleanup operation was run.
- No database tables or records were modified.
- The Business Admin continues to obtain business data through the existing Amaal Engine APIs rather than creating a second source of truth.

## Vercel settings

- Framework: Next.js
- Root Directory: `apps/business-admin`
- Node.js: 24.x
- Build Command: automatic / `npm run build`
- Output Directory: automatic
- Install Command: automatic / `npm install`
- `AMAAL_ENGINE_URL`: public URL of the deployed Render Amaal Engine
