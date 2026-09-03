# Amaal Phase 023 — Workstream 2 Complete

## Scope
Secure customer authentication and account identity on top of the existing customer/commerce model.

## Built
- Separate customer credentials table; staff `users` authentication remains separate.
- Email or phone + secure password registration.
- Existing customer account activation using the private checkout access token.
- HttpOnly, Secure, SameSite=None customer session cookie for cross-origin public web/API deployments.
- Separate readable CSRF cookie plus `X-Amaal-Customer-CSRF` double-submit protection for customer mutations.
- Device and user-agent binding for customer sessions.
- Session expiry, revocation and active-session management.
- Failed-login tracking and temporary account lockout.
- Customer authentication event audit trail.
- Sign out and sign out of all sessions.
- Customer profile editing.
- Password change with current-password verification.
- Existing order, address, wishlist, notification, preference, returns, warranty and service endpoints now accept secure authenticated customer sessions while retaining the existing access-token compatibility path.
- Public account UI now provides sign-in, registration, account activation, profile and security/session management.
- Guest checkout remains available; account creation is not required before purchase.

## Recovery boundary
External email/SMS/WhatsApp delivery is not fabricated. The existing checkout access token is supported as a secure account-activation credential. Full external message delivery remains outside this workstream until a real provider is configured.

## Preserved
- Business Console remains the internal management surface.
- Existing customer/order/catalogue data remains authoritative.
- Payment gateway integration remains completely deferred.
- No DROP, TRUNCATE, DELETE-as-migration shortcut, database reset or destructive migration introduced.
