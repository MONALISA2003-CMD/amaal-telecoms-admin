# Amaal Telecoms Business Admin

Phase 5 Business Experience Foundation.

This is a new Vercel/Next.js business application. It does **not** replace the Phase 4 Render application. It communicates with the existing engine through a server-side API proxy.

- `AMAAL_ENGINE_URL` points to the existing Render engine.
- No PostgreSQL credentials belong in this application.
- CEO and Superadmin are the same top business role.
- Technical administration remains in the Phase 4 console.

## Foundation delivered

- Next.js 16.3.3 / React 19.2 / TypeScript
- business-friendly shell and navigation
- role-oriented navigation model
- login bridge to the existing `/api/login`
- session cookie bridge
- server-side engine proxy
- CSRF forwarding for mutations
- protected business routes
- CEO/Superadmin overview connected to existing `/api/dashboard`
- business terminology only
- responsive/mobile foundation

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set `AMAAL_ENGINE_URL` to the running Phase 4 Render service.
3. Install dependencies.
4. Run `npm run dev`.

The dashboard does not invent financial figures. Future business metrics must be connected to real Phase 4 endpoints.
