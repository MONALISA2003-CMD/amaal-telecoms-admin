# Vercel Build Notes

## Live Business Pulse + navigation reliability — 2026-08-27

- Removed the duplicate `app/api/[...path]/route.ts` catch-all. The only Business Admin catch-all API proxy is now `app/api/[...proxy]/route.ts`.
- Business Intelligence summary queries are isolated so one unavailable business table/query does not collapse the complete live overview.
- Sales trend is also isolated and continues returning an empty trend when its query is temporarily unavailable.
- The Live Business Pulse refreshes automatically and reports partial availability without exposing technical database details to business users.
- Mobile navigation is a slide-out sidebar rather than a horizontal navigation ribbon.
- The existing Render Amaal Engine remains the business-data boundary and PostgreSQL remains the source of truth.
- No database reset, recreation, truncation or destructive migration was performed.

## Deployment requirements

- Vercel root directory: `apps/business-admin`
- Node.js: `24.x`
- Required environment variable: `AMAAL_ENGINE_URL` pointing to the existing public Amaal Engine service.
- The final production build must be executed by Vercel after these files are committed to `main`.
