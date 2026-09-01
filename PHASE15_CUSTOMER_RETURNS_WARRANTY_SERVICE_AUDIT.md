# Amaal Telecoms — Phase 15 Customer / Returns / Warranty / Service Integrity Audit

Date: 2026-08-28

## Scope
Customer → Sale/Order → Return → Refund → Physical Unit → Warranty → Repair → Service.

MFA is intentionally out of scope and was not changed.

## Fix applied
A warranty claim in `In Repair` could be cancelled while an active repair job still existed. That could leave an active repair job attached to a cancelled claim while the serialized unit was restored.

Cancellation of an `In Repair` claim is now blocked while a repair job for that claim is not `Completed` or `Cancelled`. The operator must close the active repair job first.

## Existing integrity verified
- Returns validate the original transaction line and prevent over-returning.
- Serialized return lines require quantity 1 and verify physical-unit ownership.
- A serialized unit cannot be attached to an active duplicate return.
- Return dispositions use the serialized lifecycle engine transactionally.
- Warranty creation records prior unit status/location and moves the unit into Service.
- Warranty rejection/cancellation restores the recorded prior state.
- Duplicate active warranty claims for the same serialized unit and issue are rejected.
- Repair-part consumption is transactional with inventory deduction and usage recording.
- Closed repair jobs cannot consume additional parts.
- Customer merges are transactional and preserve merge history; both-credit-profile merges are blocked.

## Database safety
No production Neon write was performed.
No reset, truncate, database replacement, or destructive reseed was performed.

## Verification
- warranty-repairs.js: PASS
- returns-refunds.js: PASS
- customers-crm.js: PASS
- serialized-unit-lifecycle.js: PASS

## Remaining
Live Neon reconciliation remains pending until authorized read-only production access is available.
