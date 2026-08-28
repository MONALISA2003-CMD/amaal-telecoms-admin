# Phase 14 — Finance / Credit Integrity Audit

## Completed
- Preserved unpaid credit-installment history during restructuring by superseding rows instead of deleting them.
- Active credit balance queries now exclude superseded installments.
- Credit payment allocation ignores superseded installments.
- Reversed payments now restore `Overdue` when a remaining unpaid installment is past due.
- Added repeat-safe migration columns/indexes for installment supersession.

## Safety
- No production database write performed.
- No reset, truncate, drop, destructive reseed, or historical installment deletion.
- MFA intentionally untouched.

## Remaining verification
- Run migration against a disposable test database and exercise restructure/payment reversal.
- Run live Neon read-only reconciliation once authorization is available.
