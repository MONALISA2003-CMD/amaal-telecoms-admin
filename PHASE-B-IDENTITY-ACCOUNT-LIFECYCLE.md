# Phase B — Identity & Account Lifecycle

## Scope
Strengthen staff identity lifecycle without adding branch-specific access rules.

## Delivered
- Staff profile editing.
- Staff invitations and revocation.
- Account activation/suspension.
- Staff role assignment and replacement.
- Super Admin-only control over granting/removing the Super Admin role.
- Last-active-Super-Admin protection.
- Super Admin permanent account deletion with exact email confirmation.
- Session/MFA/trusted-device/password-history cleanup through cascades.
- Historical procurement requester records are detached safely before deletion.
- Deletion is audited by the acting Super Admin.
- `/api/me` exposes `isSuperAdmin` for safe UI gating; authorization remains server-side.

## Security properties
- A Super Admin cannot delete their own account.
- A Super Admin cannot delete the last active Super Admin account.
- Non-Super-Admins receive HTTP 403 from the deletion endpoint.
- Non-Super-Admins cannot grant the Super Admin role.
- A target account must exist and its email must be typed exactly for permanent deletion.
- Business records are not deleted merely because the staff login is deleted.

## Email setup later
Password-reset delivery remains application-ready but is intentionally environment-dependent. When a production domain and mail sender are available, configure `RESEND_API_KEY`, `EMAIL_FROM`, and `APP_BASE_URL` in Render. Never commit those secrets to GitHub.
