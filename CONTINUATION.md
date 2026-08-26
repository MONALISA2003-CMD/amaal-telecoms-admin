# Amaal Telecoms — Phase 5+ Continuation

## Master Plan

The authoritative architecture and engineering direction is defined in `Amaal_plan.md`.

## Locked Architecture

- Phase 4 remains the existing Technical Console and Super Engine on Render.
- PostgreSQL remains the single source of truth.
- Business Admin is a new Vercel application.
- Public Website is a new Vercel application.
- Business Admin and Public Website communicate with the existing Render engine through controlled APIs.
- Vercel applications must not directly administer PostgreSQL.
- CEO and Superadmin are the same highest business role.
- Do not create a separate Executive role.
- Do not expose technical modules or developer terminology in Business Admin.
- Technical administration remains in the existing Technical Console.
- Do not rebuild Phase 4.
- Do not reset PostgreSQL.
- Do not add YAML files.
- Do not commit secrets.
- MFA remains outside this architecture plan unless explicitly activated in a later approved phase.

## Technology Direction

Business Admin:
- TypeScript
- React
- Next.js App Router
- Tailwind CSS
- TanStack Query where useful
- React Hook Form
- Zod
- Playwright
- Vitest
- Vercel

Public Website:
- TypeScript
- React
- Next.js App Router
- Tailwind CSS
- Zod
- Playwright
- Vitest
- Vercel

Existing engine:
- Node.js 20
- Express 5
- JavaScript
- PostgreSQL
- Existing Phase 4 modules and APIs

## Required First Engineering Step

Before further Business Admin or Public Website implementation:

1. Audit the actual Phase 4 route inventory.
2. Audit authentication and authorization.
3. Map every Phase 4 module to its APIs and data.
4. Identify reusable APIs.
5. Identify API gaps.
6. Identify public-safe fields.
7. Identify private business fields.
8. Define Business Admin API contracts.
9. Define Public Website API contracts.
10. Define the authentication/session bridge.
11. Define website publishing flow.
12. Define product/stock/order ownership.
13. Define integration and error boundaries.
14. Produce the API/data mapping documentation.
15. Only then continue implementation.

## Development Rule

Every feature must be built from the existing Technical Console capability.

If the required capability does not exist:

1. document the gap,
2. design the smallest additive engine/API change,
3. preserve existing behaviour,
4. implement the engine change,
5. test the engine,
6. then implement the Business Admin/Public Website experience.

Never create a duplicate business database to work around a missing API.

## Deployment Rule

Render stays online as the engine.

Vercel hosts:

- Public Website
- Business Admin

Recommended domains:

- `amaaltelecoms.com`
- `business.amaaltelecoms.com`
- `console.amaaltelecoms.com`

Exact domains may be changed later.

## Definition of a Connected Platform

A feature is only considered connected when:

- Business Admin reads authoritative data from the Render engine.
- Business Admin writes authorized changes through the Render engine.
- Public Website reads approved public data from the engine.
- Customer actions return to the engine.
- Existing permissions remain enforced.
- Audit behaviour remains intact.
- No duplicate source of truth is introduced.

## Current Build Rule

Do not treat the existing Phase 5 ZIP as the final architecture.

The master plan now takes precedence.

The next implementation should start with the Phase 4 Technical Console/API Discovery and produce the API/data map before large-scale Business Admin or Public Website coding.
