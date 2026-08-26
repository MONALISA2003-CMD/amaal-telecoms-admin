# Business Admin dependency and build audit

## Findings

- `@tanstack/react-query@5.90.0` could not be resolved by Vercel and caused `ETARGET` during dependency installation.
- The package is now pinned to `5.102.4`, which was successfully installed by the subsequent Vercel deployment.
- Next.js 16.3.3 and React 19.2.0 are retained. Next.js 16.3.3 is an Active LTS release.
- ESLint 9.0.0 was deprecated. It is now pinned to 9.39.5 and uses the flat `eslint.config.mjs` format recommended for Next.js 16.
- No package dependency in the Business Admin imports PostgreSQL or a database client.

## Source audit

- No `middleware.ts`, `middleware.js`, or `middleware.tsx` remains in the Business Admin.
- `proxy.ts` is the sole Next.js request-proxy file.
- All Business Admin API reads go through the existing Render engine.
- The API proxy forwards the existing session and CSRF cookies to the engine.
- Upstream Render failures are converted into controlled HTTP errors rather than uncaught serverless exceptions.
- Production refuses to silently fall back to `localhost:10000`.
- Missing business metrics render as `—` rather than fabricated zeroes.

## Database safety

This audit did not connect to PostgreSQL and did not execute SQL. No database file was changed. The existing database remains the source of truth.
