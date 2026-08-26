# Amaal Phase 5 Continuation

Phase 4 is frozen as the validated Technical Console and Super Engine.

Phase 5 foundation now includes `apps/business-admin` as a separate Next.js/Vercel application.

## Architecture lock

Render + Phase 4 remains the engine. Vercel hosts Business Admin and, in a later phase, the Public Website. PostgreSQL remains the single source of truth. CEO and Superadmin are one role. Business Admin must never expose technical modules.

## Current Phase 5 foundation

- Business Admin application scaffold
- Next.js 16.3.3 / React 19.2 / TypeScript
- Amaal business shell
- responsive navigation
- login/session bridge to Phase 4
- server-side API proxy
- CSRF forwarding
- protected business routes
- connected overview using Phase 4 dashboard data

## Next build

Continue with the real Business Admin workspaces, mapping each screen to the existing Phase 4 API and permissions. Do not create duplicate business data. Public Website remains a later connected layer.
