# Vercel Build Notes

## Final audit status

The Business Admin source in this ZIP was audited against `Amaal_plan.md` and `CONTINUATION.md` before packaging.

### TypeScript

The dynamic Business workspace explicitly normalizes card entries to the `Card` contract:

- `label: string`
- `value: string`

This removes the previous TS2322 failure where tuple inference produced `string | number` for `Card.label`.

### Dependencies

- `@tanstack/react-query`: `5.102.4` (not the invalid `5.90.0` that caused ETARGET).
- Next.js: `16.3.3`.
- React/React DOM: `19.2.0`.
- ESLint: `9.39.5` with flat config.

### Next.js 16 migration

- `proxy.ts` is used for the request proxy.
- No `middleware.ts`, `middleware.js`, or `middleware.tsx` remains in the Business Admin.

### Serverless/API boundary

- Server-side API calls use `AMAAL_ENGINE_URL`.
- Production does not silently fall back to localhost.
- Upstream Render failures are converted to controlled 502/503 responses.
- Session and CSRF cookies are kept server-side.

### Database safety

No PostgreSQL client, database URL, migration, seed, reset, schema modification, or direct database access exists in `apps/business-admin`.
The existing Render Amaal Engine remains the only business-data boundary and PostgreSQL remains the source of truth.

### Vercel settings

- Framework: Next.js
- Root Directory: `apps/business-admin`
- Node.js: `24.x`
- Build Command: Automatic (`next build`)
- Output Directory: Automatic
- Required environment variable: `AMAAL_ENGINE_URL` = the public HTTPS URL of the existing Render backend.

### Important deployment verification

This ZIP is the audited source package. The final Vercel build still must be executed by Vercel after the ZIP's files are committed to the GitHub `main` branch. If Vercel reports the old `Card.label string | number` error, it is building an older Git commit rather than this source package.

## First-time administrator setup correction

- Removed the login-page security-code field.
- Added `/setup` for first-time administrator creation.
- `/login` checks `/api/setup/status` and redirects to `/setup` when the existing Render engine reports that administrator setup is required.
- `/setup` calls the existing Render `/api/setup` endpoint through a server-side Vercel route and preserves the existing auth-cookie bridge.
- No database schema, SQL, migration, reset, or direct PostgreSQL access was added to Business Admin.

## Permission and Delivery hardening — 2026-08-27

- `Workspace` card data is normalized through `cardEntries`, so card labels and values are always strings. This directly addresses the previous Vercel TypeScript failure where `Card.label` was inferred as `string | number`.
- The Business Admin Team workspace now supports staff creation, role assignment, activation/deactivation and Super Admin-only deletion through the existing Render engine.
- Deleted staff remain separated from active staff.
- The Business Admin sidebar now recognises Super Admin as a top-level authority instead of depending only on the returned permission list.
- Delivery now has an operational workspace with shipment creation/editing/status updates, delivery zones and delivery partners.
- No PostgreSQL client or database access was added to the Next.js application. All business mutations continue through the existing Render engine proxy.
- No database reset, migration, seed, truncate, drop or direct data manipulation was performed.
- TypeScript/TSX transpile syntax audit passed for 52 source files. Full `next build` still requires dependency installation and the Vercel environment.
