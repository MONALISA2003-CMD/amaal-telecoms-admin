# CONTINUATION PROMPT — PHASE 25

Continue directly from this complete Phase 24 ZIP.

Do not rebuild the application. Preserve all Phase 1–24 functionality.
Do not add YAML files. Do not reset PostgreSQL. Do not create branches. Do not commit secrets. MFA remains final-phase work.

PHASE 25 — SALES & POS DEEP BUILD

First audit Phases 21–24 and fix any missing or regressed item before adding new work.

Deepen the existing Sales/POS module into a production retail workflow:
- POS cart and fast product lookup
- barcode-ready product lookup
- customer selection and Customer 360 linkage
- line and transaction discounts with approval controls
- price override approval
- suspend/hold sale and retrieve sale
- cashier/till sessions
- opening cash
- closing cash
- cash variance
- shift management
- multi-method payments
- receipt lifecycle and controlled reprint
- quotations
- sales orders
- credit sales
- serialized/IMEI allocation
- sale cancellation/reversal/void controls
- return/exchange/refund integration
- inventory reservation and consumption integrity
- finance synchronization
- sales audit history
- sales analytics and end-of-day reconciliation

Required lifecycle:
Quote → Sale → Payment → Inventory → Customer → Finance
and
Sale → Return/Exchange → Refund → Inventory → Finance

Do not create fake records for BI. Use real operational tables.

Before delivery:
- Audit previous phases and current phase.
- Run all JS syntax checks.
- Run Render preflight.
- Confirm zero YAML files.
- Verify canonical purchase_requisitions remains intact.
- Verify MFA remains untouched.
- Package the complete project in the ZIP with this continuation prompt.
