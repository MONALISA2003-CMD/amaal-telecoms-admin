# Phase 023 Workstream 2 Vercel Fix

## Root cause
Vercel TypeScript failed in `apps/public-web/app/account/orders/page.tsx` because `authHeaders()` inferred a union object type when it returned either a customer-token header object or `{}`. The resulting optional property type was incompatible with `fetch()`'s `HeadersInit` / `Record<string,string>` expectation under strict TypeScript checking.

## Fix
`authHeaders()` is explicitly typed as `Record<string,string>`, preserving a valid string-valued header map in both branches.

## Validation
- Reviewed the exact failing source from commit `a8d8487`.
- Confirmed the reported error is localized to `authHeaders()` in `account/orders/page.tsx`.
- Searched the public web for the same customer-token header pattern; no other equivalent inferred-header declaration was found.
- Payment remains deferred and untouched.
- No database reset, DROP, TRUNCATE, DELETE, or destructive migration was introduced.
- This package does not claim a full production Next build because dependencies are not installed in the supplied local workspace.
