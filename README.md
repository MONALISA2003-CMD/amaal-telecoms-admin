# Amaal Telecoms Admin — Phase 1 Cloud Foundation

This phase replaces browser-only persistence with a real Express API and PostgreSQL database. There are no seeded business records.

## Deploy from a phone

Recommended simple flow:
1. Create a PostgreSQL database with any hosted PostgreSQL provider (Supabase, Neon, Railway, Render, etc.).
2. Create a GitHub repository and upload this folder.
3. Deploy the repository as a Node web service on a provider that supports Node.
4. Add environment variables from `.env.example`.
5. Set `DATABASE_URL` to the provider's PostgreSQL connection string and set a long random `JWT_SECRET`.
6. Open the deployed URL. The first screen creates the real administrator account.

The server automatically applies `schema.sql` on startup. No fake products, orders, customers or inventory are inserted.

## Local

`npm install`

Set `.env`, then `npm start`.

## Phase 1 API

- POST /api/setup
- POST /api/login
- POST /api/logout
- GET /api/me
- GET /api/dashboard
- GET/POST /api/staff (GET is /api/staff; creation is /api/users)
- GET /api/roles
- GET /api/permissions
- POST /api/roles
- GET/POST/PATCH /api/branches
- GET /api/audit
- GET/POST/PATCH /api/notifications
- GET/PUT /api/settings
- GET/DELETE /api/sessions

## Security note

Use HTTPS in production, a strong JWT_SECRET, a managed PostgreSQL database, and provider secret/environment-variable storage. Do not commit `.env`.
