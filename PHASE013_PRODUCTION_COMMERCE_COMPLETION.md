# AMAAL Phase 013 — Production Commerce Completion

Implemented as an additive continuation of Phase 012. Existing architecture, database records, Business Console and catalogue remain intact. No reset or destructive migration was introduced.

## Included
- Payment acceptance presentation for Airtel Money, MTN Mobile Money, Visa and Mastercard.
- Existing order lifecycle retained and connected to public tracking.
- Public tracking now combines order status history with delivery events.
- Existing delivery operations retained for zones, partners, shipments, status progression, attempts and proof.
- Customer-facing account, saved products, order history and tracking surfaces retained.
- Active promotion discovery from Business Console records. No fabricated discounts or countdowns.
- Product reviews with moderation and verified-purchase recognition.
- Product questions with Business Console answers.
- Business Console Reviews & Q&A workspace and permissions.
- Existing media management remains the source for approved website imagery.
- Public catalogue continues to avoid manufacturer website links and price invention.

## Payment status
Payment collection is deliberately not connected to a live gateway in this phase. The storefront communicates accepted methods only. Live provider credentials, callbacks/webhooks and reconciliation can be enabled later without changing the public payment UX contract.

## Database safety
`commerce-plus.sql` contains only `CREATE TABLE IF NOT EXISTS`, `ALTER`-free indexes and no `DROP`, `TRUNCATE`, or data-reset operations. The server loads it during normal additive initialization.
