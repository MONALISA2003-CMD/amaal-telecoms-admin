# Phase A-C Hardening: Issues 1-10

Completed hardening for items 1-10 from the pre-Phase-D review.

1. Password recovery: UI, secure single-use reset token, expiry, password history, session/device revocation, audit events, IP/account rate limits. Production email remains externally dependent on Resend/domain configuration.
2. Invitation delivery: invitation email architecture, acceptance UI/API, expiry/revocation/accepted-token protection, invitation rate limiting.
3. Session/device testing controls: server-side sessions, inactivity/absolute expiry, device binding, browser user-agent binding, individual/all-session revocation, current-user revoke-others control.
4. Deployment verification: render-preflight validates canonical procurement naming and critical build conditions.
5. User deletion: Super Admin-only anonymization/tombstone preserves historical business records and removes authentication access.
6. Authorization: role/permission API enforcement, Super Admin protections, custom role lifecycle validation.
7. Custom roles: duplicate-name prevention, assignment protection, system-role protection, permission updates.
8. Invitation lifecycle: pending/accepted/revoked/expired states and single-use acceptance.
9. Departments: active-manager validation, unique code protection, reassignment-before-delete protection.
10. Suspension: sessions/trusted devices revoked on suspension; auth rejects inactive accounts.

MFA is intentionally excluded and remains disabled until the final security phase.
