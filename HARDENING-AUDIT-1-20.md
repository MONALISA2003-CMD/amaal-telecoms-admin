# Amaal Telecoms — Hardening Audit 1–20

## Scope
This release closes the previously identified hardening items 11–20 and re-audits items 1–20. MFA is intentionally excluded and remains disabled during development.

## 1–10 regression audit
1. Password recovery: implemented; production email delivery remains environment-dependent until domain/Resend configuration.
2. Staff invitation delivery: implemented; actual delivery remains environment-dependent until sender configuration.
3. Session/device controls: server-side sessions, inactivity, expiry, device and user-agent binding, revocation retained.
4. Render startup reliability: canonical `purchase_requisitions`; legacy runtime reference absent.
5. User deletion: Super Admin protected deletion/anonymization path retained; historical business records preserved.
6. API authorization: permission middleware remains mandatory on protected endpoints.
7. Custom roles: system-role protection and assigned-role deletion protection retained.
8. Invitation lifecycle: single-use/expiry/revocation controls retained.
9. Departments: safe deletion/assignment validation retained.
10. Suspension: inactive accounts cannot authenticate and active sessions/devices are revoked.

## 11–20 completed in this release
11. Audit logging: request IDs are propagated; sensitive operations continue to record audit events; audit records are not exposed through mutation endpoints.
12. Mobile UX: responsive layout and mobile-safe controls retained; acceptance checklist updated for phone testing.
13. API error handling: internal errors are logged server-side with request IDs; clients receive generic 5xx messages; API 404s return JSON instead of HTML.
14. Rate limiting: global API burst limiter added in addition to authentication/recovery/invitation-specific limits.
15. HTTP security/CORS: request IDs, security headers, strict same-origin checks, explicit public-AI origin handling, and OPTIONS handling added.
16. Documents: authenticated/permissioned downloads retained; upload MIME allowlist plus content-signature checks added; 15 MB limit retained.
17. Developer-facing UI: no developer/debug labels were found in the public application UI source; internal documentation may mention development controls but is not rendered to clients.
18. Database bootstrap: Render preflight validates canonical procurement naming and legacy reference absence; startup remains additive and does not reset business data.
19. Frontend/API contract: centralized `data-action` dispatch remains the UI action mechanism; syntax and static route checks pass. Full browser click testing still requires the live deployed service and real account/database.
20. Documentation: hardening scope, deployment notes, deferred MFA, environment dependencies, and continuation guidance documented.

## Additional audit improvements
- API responses now include `X-Request-ID` for support/debug correlation without exposing stack traces.
- Unknown `/api/*` endpoints return structured JSON 404 responses.
- Unknown non-API routes continue to serve the SPA shell.
- File content is checked against declared MIME type for common document/image formats.
- No branch-specific functionality was introduced.
- No YAML workflow was introduced.
- No database reset/drop operation was introduced.
- No secrets were packaged.

## Deferred by explicit project instruction
- MFA, trusted-device enforcement and new-device MFA are intentionally postponed to the final security phase.
- Production email sending remains deferred until a verified domain/sender and Resend key are available.

## Verification performed
- `node --check` on every JavaScript file: PASS
- `node render-preflight.js`: PASS
- ZIP extraction/integrity: PASS
- Legacy `procurement_requisitions` runtime reference: absent
- Required project modules: present
- No `node_modules` packaged
- No secrets packaged
