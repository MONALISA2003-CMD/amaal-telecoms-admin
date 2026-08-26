# Amaal Telecoms Business Admin — Pre-deployment Audit

Date: 2026-08-26

## Scope

This audit covered the Business Admin application under `apps/business-admin`, its Vercel/Next.js configuration, server-side engine bridge, authentication cookie bridge, request proxy, business workspace pages, dependency declarations, and references to database access.

## Vercel build issues found and corrected

### 1. Dependency resolution

- Failure: `@tanstack/react-query@5.90.0` returned npm `ETARGET`.
- Correction: pinned to `5.102.4`.
- Subsequent Vercel build confirmed dependency installation succeeded.

### 2. TypeScript card construction

- Failure: `Card.label` was inferred as `string | number` in the dynamic workspace page because tuple arrays mixed labels and numeric values.
- Correction: card labels are now explicitly strings and values are formatted before being passed to `Workspace`.
- `Card.value` remains a display string, which is the correct UI contract.

### 3. Next.js 16 middleware migration

- Removed all `middleware.*` files from the Business Admin.
- Kept a single `proxy.ts` request proxy with the same authentication behavior.
- This follows the Next.js 16 `proxy.ts` convention.

### 4. ESLint modernization

- ESLint `9.0.0` was deprecated.
- Pinned ESLint to `9.39.5`.
- Added `eslint.config.mjs` using the Next.js flat configuration and TypeScript rules.
- This is separate from `next build`; Next.js 16 no longer runs lint automatically during build.

### 5. Serverless failure hardening

- The Vercel API proxy previously allowed an upstream `fetch()` rejection to escape the route handler.
- Login and proxy routes now catch Render connection/configuration failures and return controlled `502`/`503` JSON responses.
- Production no longer silently falls back to `http://localhost:10000`.
- Node.js runtime is explicitly selected for server-side API bridges.

### 6. Source-of-truth behavior

- Missing API data no longer becomes a fabricated numeric zero in business cards; unavailable values display `—`.
- Overview quick actions are filtered using the permissions returned by `/api/me`.
- Business data continues to come from the existing Amaal Engine APIs.

## Database safety audit

No PostgreSQL client, database URL, SQL query, migration, seed, reset, schema change, or direct database connection exists under `apps/business-admin`.

No SQL was executed during this audit or build-fix process.

The Business Admin remains a consumer of the existing Render Amaal Engine. PostgreSQL remains the authoritative source of truth behind that engine.

## Static validation performed

- Local alias/relative imports: no missing local imports found.
- Stale middleware files: none; `proxy.ts` is present.
- Direct database references in Business Admin source: none found.
- Navigation routes: all map to the dynamic business workspace route.
- Business API paths used by the admin were cross-checked against the existing backend route source.
- No `node_modules`, `.next`, or build artifacts are included in the package.

## Important deployment note

The final Vercel test must be performed from the GitHub commit containing this package. A ZIP downloaded locally does not update the GitHub repository that Vercel watches.

Required Vercel project configuration:

- Framework: Next.js
- Root Directory: `apps/business-admin`
- Node.js: `24.x`
- Build Command: Automatic
- Output Directory: Automatic
- `AMAAL_ENGINE_URL`: public HTTPS URL of the existing Render backend

No database changes are required for this package.
