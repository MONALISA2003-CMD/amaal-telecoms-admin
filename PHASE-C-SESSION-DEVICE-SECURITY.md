# Phase C — Session & Device Security

Amaal Telecoms administration platform. No branch features were added in this phase. MFA is intentionally disabled for the build stage.

## Completed
- Database-backed sessions with signed JWT session IDs.
- HttpOnly, Secure, SameSite=Lax authentication cookie.
- Separate CSRF cookie/token for state-changing API requests.
- Device-bound session context using a server-derived device hash.
- Browser user-agent binding for active sessions.
- Configurable idle timeout; default 10 minutes.
- Absolute session lifetime bounded by `sessionAbsoluteMinutes`.
- Maximum concurrent session count via `maxConcurrentSessions`; oldest sessions are revoked after successful login when the cap is exceeded.
- Individual session revocation.
- Administrator ability to revoke another user's sessions.
- Current administrator ability to revoke all other sessions.
- Logout revokes the current database session.
- Password changes revoke all other sessions.
- Password resets revoke all active sessions and trusted-device records.
- Suspended/deleted accounts cannot authenticate and their sessions are revoked by account lifecycle operations.
- Login failure throttling and account lockout remain active.
- Password recovery requests have an additional IP-based rate limit.
- Expired/revoked sessions, old password-reset tokens and stale invitations are cleaned during startup.
- Security events are recorded for idle timeout and session device/user-agent mismatch.
- MFA remains hard-disabled during development (`MFA_LOGIN_ENABLED=false`).
- When MFA is disabled, no device is treated as a trusted MFA device and active trusted-device records are revoked during startup. The device cookie is still used only as a session-binding identifier.

## Important security boundary
No application can truthfully guarantee that session hijacking is "impossible". This build substantially reduces the value of a stolen session by combining server-side session revocation, short inactivity expiry, absolute expiry, device binding, user-agent binding, HttpOnly/Secure cookies, SameSite protection, CSRF validation and audit/security events. Final MFA and recovery hardening will be added in the final security phase.

## Render settings introduced
- `sessionAbsoluteMinutes` defaults to 720 minutes.
- `maxConcurrentSessions` defaults to 5.

These are database settings and can be adjusted from Security policy by an authorized administrator.
