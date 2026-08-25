# Phase A + Phase B Final Audit

## Scope
Authentication, password recovery, invitation lifecycle, staff lifecycle, role lifecycle, department lifecycle, session lifecycle, Super Admin protections, database preservation, and build-stage MFA exclusion.

## Phase A — resolved
- Forgot-password entry point added to the email/password login screen.
- Password reset request API added with account-enumeration-safe response.
- Reset tokens are cryptographically random, hashed at rest, single-use and expire after 30 minutes.
- Reset requests are rate-limited to five per account per hour.
- Password history is enforced during reset.
- Successful reset clears lock state and revokes all sessions and trusted devices.
- Reset completion/request events are recorded in security events and audit logs.
- Reset email delivery uses a server-side Resend integration and is intentionally deferred until `RESEND_API_KEY`, `EMAIL_FROM` and `APP_BASE_URL` are configured.
- Dedicated `password-reset.html` flow validates the token before allowing a password change.
- MFA was not changed; login remains email + password only for the build.

## Phase B — resolved
- Invitation status is calculated correctly: Pending, Accepted, Revoked or Expired.
- Dedicated `invite.html` acceptance flow added.
- Invitation acceptance creates the account, role assignment and authenticated session.
- Invitation email delivery uses the same deferred Resend integration.
- When email delivery is not configured, the authenticated inviter receives the one-time token so development can continue.
- Super Admin role cannot be granted, created or invited by ordinary administrators.
- Super Admin role changes require a Super Admin actor.
- The final active Super Admin cannot be removed from the role or suspended.
- Super Admins cannot suspend themselves.
- Suspending an account immediately revokes its sessions and trusted devices.
- Custom roles can be deleted only when unassigned; system roles are protected.
- Departments can be deleted only when no users remain assigned.
- Department managers can be assigned, reassigned or cleared.
- Individual administrator sessions can be revoked by authorized staff; all sessions for a user can also be revoked.
- Session listings now show only active, non-expired sessions.
- Staff profile department assignment can be changed or cleared.
- Super Admin staff removal uses an anonymized identity tombstone instead of physical user-row deletion. This preserves historical business records, including NOT NULL actor references such as sales cashier attribution.
- Staff removal permanently disables authentication, clears roles/sessions/devices/MFA/password history/notifications and scrubs personal identity fields.
- Historical operational records remain intact.

## Database safety
- Added `password_reset_tokens` table.
- Added `email_delivery_logs` table.
- No database reset or destructive migration is included.
- Canonical procurement table remains `purchase_requisitions`.
- No runtime JavaScript references the obsolete `procurement_requisitions` table.

## Build verification
- All JavaScript files pass `node --check`.
- Render preflight passes.
- Required Phase A/B files are present.
- No `node_modules` directory is packaged.
- No secrets/API keys are packaged.
- MFA login enforcement remains hard-disabled by `MFA_LOGIN_ENABLED=false`.

## Deferred intentionally
- MFA enforcement, trusted-device enforcement and final MFA recovery hardening remain for the final security phase.
- Resend/domain/email sender configuration remains deferred until the production domain and sender email are available.
