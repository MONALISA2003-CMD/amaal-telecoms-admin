# Business Admin Dependency Audit

Date: 2026-08-26

## Deployment blocker fixed

- `@tanstack/react-query` was pinned to `5.90.0`. Vercel/npm reported `ETARGET` because that exact version could not be resolved.
- Updated it to `5.102.4`, a published stable release available on npm as of this audit.

## Audit result

- `next@16.3.3`: retained; published and compatible with the configured Next.js app.
- `react@19.2.0` and `react-dom@19.2.0`: retained.
- `zod@4.1.0`: retained.
- `react-hook-form@7.62.0`: retained.
- `lucide-react@0.468.0`: retained.
- `recharts@3.2.0`: retained.
- TypeScript/types/testing packages were retained to avoid unrelated toolchain changes.

## Source-usage audit

The current Business Admin source does not import React Query, React Hook Form, Zod, Lucide React, or Recharts yet. They remain available for the planned business workflows, so this repair does not remove planned UI dependencies.

## Vercel requirements

- Framework: Next.js
- Root Directory: `apps/business-admin`
- Node.js: 24.x
- Build Command: automatic (`next build`)
- Output Directory: automatic
- Install Command: automatic

This audit does not contain credentials or environment values. Production connectivity still requires the Vercel `AMAAL_ENGINE_URL` config variable pointing to the public Render backend URL.

## Vercel TypeScript build repair — 2026-08-26

Vercel successfully installed the Business Admin dependencies and compiled Next.js, but TypeScript failed in `app/(business)/[...slug]/page.tsx` because `Workspace.Card.value` was typed as `string` while several metric-card mappings can produce numbers. The `Card.value` type is now `string | number`, matching the values already rendered by the component. This is a type-only correction and does not change the API or database architecture.

## Next.js 16 Proxy migration

- Migrated `middleware.ts` to `proxy.ts`.
- Renamed the exported `middleware` function to the Next.js 16 `proxy` function.
- Preserved the existing authentication redirect behavior and matcher.
- No database code, schema, migrations, seed data, or SQL execution was changed by this migration.

Next.js 16 deprecates the `middleware` file convention in favor of `proxy`; the named `proxy` export is the supported convention. See the official Next.js migration guidance.
