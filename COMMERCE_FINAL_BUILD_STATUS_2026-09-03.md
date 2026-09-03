# AMAAL Commerce Final Build Status — 2026-09-03

## Included
- Full database SQL source and additive migration files
- Node/Express backend and all business modules
- Public Amaal shopping website
- Business Admin Console
- Public website assets and supplied homepage visuals
- Customer email/phone authentication
- Google customer sign-in with PKCE/OpenID Connect boundary
- Server-backed cart with guest cart and authenticated cart merge
- Server-backed wishlist with authenticated account merge
- Public checkout and order creation
- Provider-neutral payment session foundation with environment variables
- Admin live business pulse and storefront activity feed with 5-second refresh

## Neon production change applied
Added `customer_auth_identities` for Google identity linking. The migration was additive and was tested on a temporary Neon branch before being applied to the parent production branch.

## Payment status
Payment integration is intentionally provider-neutral. The following variables remain open in `.env.example`:
- PAYMENT_PROVIDER
- PAYMENT_API_URL
- PAYMENT_API_KEY
- PAYMENT_PUBLIC_KEY
- PAYMENT_WEBHOOK_SECRET
- PAYMENT_RETURN_URL
- PAYMENT_CALLBACK_URL
- PAYMENT_CURRENCY
- PAYMENT_COUNTRY

No payment secret is included in this package.

## Google status
Google OAuth/OpenID Connect endpoints are implemented in the backend and the public account UI exposes “Continue with Google”. Production use requires Google Cloud OAuth credentials to be supplied through environment variables.

## Realtime Admin status
The Admin Console's Live Business Pulse consumes current backend business records and storefront activity and refreshes automatically every 5 seconds. This avoids introducing a new WebSocket infrastructure dependency while preserving the existing architecture.

## Safety / preservation
- No database reset
- No database reseed
- No product duplication
- No destructive catalogue migration
- No production payment credentials stored in source
- Existing architecture preserved; changes are additive and targeted

## Verification notes
`node --check server.js` passes. Full Next.js type/build validation cannot be completed in this environment because application dependencies are not installed in the working tree; the existing codebase reports missing framework/type modules rather than a runtime syntax failure.
