Continue the Amaal Telecoms Admin project from Phase C — Session & Device Security.

Current state:
- Phase A and B are complete.
- Phase C is complete.
- MFA MUST remain disabled until the final security phase.
- Do not add branches or branch-specific business logic.
- Login must remain email + password only during development.
- Existing Render/PostgreSQL database must be preserved; never reset it.
- Canonical procurement table is `purchase_requisitions`; never reintroduce `procurement_requisitions`.
- Render startup must remain compatible with the existing database.

Phase C delivered:
- DB-backed sessions
- HttpOnly/Secure/SameSite auth cookies
- CSRF protection
- Device-bound sessions
- User-agent session binding
- 10-minute default idle timeout
- Absolute session lifetime
- Concurrent-session cap
- Individual and bulk session revocation
- Revoke-other-sessions UI
- Login throttling/lockout
- Password reset/session revocation compatibility
- Trusted-device creation disabled while MFA is disabled
- Startup cleanup for expired security artifacts

Before starting Phase D, audit the complete project, not only new files. Run syntax checks, Render preflight, database-schema compatibility checks and cross-module API/UI checks. Do not return a ZIP until the audit passes.
