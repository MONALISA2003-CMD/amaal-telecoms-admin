# Amaal Telecoms Admin — Phase 1B

Phase 1B extends the working Phase 1A administration foundation into an international-ready administration and security layer.

## Included
- Real PostgreSQL/Neon persistence; no mock business data.
- First-admin setup and secure login with lockout controls.
- Password policy and password-history protection.
- Optional TOTP MFA with encrypted-at-rest MFA secret.
- Organization profile: legal/trading identity, registration/tax data, country, currency, timezone, locale and contact details.
- Departments and staff profile metadata.
- Roles and permissions foundation with expanded administrative permissions.
- Active session/device visibility and session revocation.
- Login/security event monitoring.
- Structured security policy.
- Feature flag persistence.
- Expanded audit trail and filtered audit API.
- Responsive admin console designed to work from a phone.
- Express 5 compatible SPA fallback route.
- No external frontend CDN dependencies.

## Deployment
Render:
- Runtime: Node
- Root Directory: blank
- Build Command: `npm install`
- Start Command: `npm start`

Required environment variables:
- `DATABASE_URL`
- `JWT_SECRET`
- `COOKIE_SECURE=true` (reserved for the hardened cookie migration)

## Important
This release is still the administration/platform layer. Customer, product, inventory, sales, credit and finance modules are deliberately not mixed into Phase 1B.
