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
