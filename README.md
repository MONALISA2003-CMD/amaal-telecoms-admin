# Amaal Telecoms Admin — Phase 1C

Uganda-first, production-oriented administration foundation built on the Phase 1A/1B database.

## Scope
- Hardened cookie-based authentication (HttpOnly Secure SameSite session cookie)
- CSRF protection for authenticated state-changing requests
- Same-origin enforcement
- Security headers and reduced browser attack surface
- Login rate limiting and account lockout
- MFA/TOTP
- Password policy and password history
- Session/device administration and revocation
- Organization profile with Uganda defaults (UG / UGX / Africa/Kampala / en-UG)
- Department administration
- Staff profiles
- Role/permission management
- Staff invitations with one-time invitation tokens and acceptance endpoint
- Security posture and login-event monitoring
- Audit trail
- Feature flags
- Existing legacy branch tables are preserved for compatibility, but Phase 1C adds no branch functionality and the admin navigation does not expose branches.

## Deployment
- Build: `npm install`
- Start: `npm start`
- `DATABASE_URL` and `JWT_SECRET` are required.
- Render supplies `PORT`.

No mock business data is included.
No GitHub workflow/YAML is included in this ZIP. Use the existing repository workflow.
