# Amaal public commerce completion plan

## Phase 0 — Audit and preservation
- Inspect existing database, backend, Admin Console and public website.
- Reuse existing commerce tables/endpoints/workspaces.
- No reset, reseed, duplicate catalogue, or replacement architecture.

## Phase 1 — Payment foundation (implemented now)
- Add a provider-neutral payment adapter boundary.
- Add public payment configuration/status endpoint without exposing secrets.
- Keep payment provider API URL/key/public key/webhook/return/callback values as environment variables.
- Create/reuse a real `order_payments` Pending record from checkout.
- Keep orders, payments and inventory authoritative in the existing database.
- Add payment-method selection to public checkout.
- Do not mark a payment Completed without verified provider confirmation.
- Production gateway request/webhook verification remains intentionally open until the provider is selected and credentials are supplied.

## Phase 2 — Customer identity completion
- Google OAuth/OpenID Connect.
- Safe account linking and duplicate-account prevention.
- Guest-to-customer cart/wishlist merge.
- Full customer portal consistency.

## Phase 3 — Full public shopping cycle
- Product/variant purchase from every public surface.
- Cart and wishlist consistency across pages/devices.
- Checkout validation, delivery, payment initiation and recovery.
- Order confirmation and customer order history.

## Phase 4 — Live Admin synchronization
- Customer-created carts/orders/payments/wishlist activity flow into existing Admin data.
- Admin status/stock/pricing changes flow back to public clients.
- Add SSE/WebSocket only where the existing event infrastructure cannot provide the required immediacy.

## Phase 5 — Production payment completion
- Select the actual Uganda payment provider.
- Fill the provider-specific adapter using the existing neutral contract.
- Configure production API credentials through secrets/environment variables.
- Implement signed webhook/callback verification.
- Reconciliation, retries, duplicate protection and payment reversal/refund handling.
- End-to-end sandbox and production smoke tests.

## Phase 6 — Notifications and operational hardening
- Activate the existing transactional email path where configured.
- Optional SMS/WhatsApp integration after core payment/order flow is stable.
- Monitoring, alerting, reconciliation and regression tests.

### External services/plugins required
- Google Identity / OAuth: required in Phase 2; no suitable installable ChatGPT plugin is currently available.
- Payment gateway: required in Phase 5; provider selection is pending. No suitable installable ChatGPT payment plugin is currently available.
- Realtime transport: required in Phase 4 if existing event infrastructure is insufficient; preferably implemented in Amaal backend rather than adding an unnecessary third-party dependency.
- Transactional email: existing Resend environment placeholders are already present.
- SMS/WhatsApp: optional later; provider depends on Amaal's chosen business account and Uganda coverage.
