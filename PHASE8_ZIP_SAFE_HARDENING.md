# Amaal Telecoms — Phase 8 ZIP Safe Hardening

Date: 2026-08-28

## Scope
Deep hardening performed against the latest available generated ZIP, not the GitHub repository.

## Corrected
1. Business Admin engine proxy routing now permits the existing `/api/*` backend surface while rejecting non-API targets.
2. Engine proxy forwards the browser CSRF token to Render for authenticated mutations.
3. Administrator recovery preserves audit/security history; authentication state is revoked without deleting those histories.
4. Product permanent deletion performs explicit dependency checks for sale lines, order lines, serialized inventory, purchase lines, return lines, warranty claims and repair jobs.

## Preserved
- `Amaal_plan.md`
- Master television catalogue
- Global Star canonical identity
- Serialized-unit lifecycle
- Receiving/batch and warehouse-transfer work
- Existing business data

## Verification
- Node syntax: PASS for modified `.js` files.
- No production Neon mutation performed.
- Live Neon read-only inspection remains blocked by authorization.
- GitHub write not used.

## Next step
Deploy this ZIP, then perform a read-only production reconciliation before any database correction.
