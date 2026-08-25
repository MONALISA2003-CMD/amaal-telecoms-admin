Continue the Amaal Telecoms administration platform from the ZIP you were given.

Current completed work:
- Modules 1–18 exist in the project using business/module filenames, not phase-number filenames.
- Phase A — Account Recovery & MFA Governance is complete.
- Phase B — Identity & Account Lifecycle is complete.
- No branch-specific access work is to be introduced unless explicitly requested later.
- Super Admin can permanently delete staff accounts through a server-authorized endpoint, with exact email confirmation.
- Super Admin cannot delete their own account or the final active Super Admin.
- Staff role assignment is available; only Super Admin may grant/remove the Super Admin role.
- Password recovery remains application-ready but Resend/domain/email environment variables are intentionally deferred until Amaal Telecoms has a production domain and sender email.

Before changing anything, audit the complete ZIP and preserve all working modules. Do not regress existing AI, BI, Integration Hub, documents, recovery, MFA or mobile UI behavior.

Next task: proceed to the next retouch module only after auditing Phase A and Phase B. Build it completely, test syntax/routes/database migrations, test every affected button from the Render root URL, and return a ZIP only after the full audit passes.

## Latest deployment correction
The previous build failed on Render because `server.js` referenced `procurement_requisitions`, while the canonical database table is `purchase_requisitions`. The corrected build now uses `purchase_requisitions` everywhere. MFA login enforcement is hard-disabled during the build so administrator login is email + password only. Do not re-enable MFA until the final security phase.
