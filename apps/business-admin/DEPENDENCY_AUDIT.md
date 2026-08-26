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
