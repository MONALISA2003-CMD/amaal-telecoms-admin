# AMAAL TELECOMS — PHASE 19 DEEP SECURITY / PERMISSION / LOGIN AUDIT

Date: 2026-08-28
Baseline: Phase 18 ZIP
MFA: intentionally unchanged
Neon production: not modified

## Scope

- Backend role and permission enforcement
- Business Admin permission navigation
- Login/session behavior excluding MFA implementation changes
- Vercel Business Admin → Render engine proxy
- CSRF and origin boundaries
- Public/private API exposure
- Destructive catalogue operations
- JavaScript syntax and available regression scripts

## Findings and fixes

### 1. Role regression false-positive
The regression script treated `/api/recovery/status` as an unguarded business route even though it is an intentional public recovery-status endpoint. It was added to the explicit public endpoint allow-list.

Result: 134 defined permissions, 131 protected business routes, 0 unexpected unguarded routes, 0 unknown sidebar permission IDs.

### 2. Business Admin engine timeout
The catch-all `/api/engine/[...path]` proxy previously had no explicit upstream timeout. A slow Render instance could leave a Business Admin operation waiting indefinitely.

Fix: bounded 15-second upstream timeout with a controlled 502 response.

### 3. Login/session audit
Verified:
- Login rate limiting
- Account inactive / locked handling
- Session expiry
- Idle timeout
- Device binding
- User-agent binding
- Logout
- Password recovery/session revocation
- CSRF enforcement
- no-store handling for authentication responses

MFA code paths were not changed in this phase.

### 4. Public/private boundary
Verified public catalogue filtering and public AI/catalogue origin controls. Business Admin continues to use server-side proxy routes rather than exposing the Render engine URL directly in browser code.

### 5. Catalogue deletion safety
Product removal is an archive operation. Brand/category deletion requires dependency checks. Variant deletion archives when stock is zero. Product images cannot be permanently deleted through the production API.

## Automated verification

- All JavaScript syntax checks: PASS
- Role/permission regression: PASS
- Security regression: PASS
- Cross-module regression available in baseline: PASS
- No executable `DROP DATABASE` / `TRUNCATE` detected in project SQL scan
- Business Admin TypeScript full check: BLOCKED by absent installed dependencies in ZIP (`react`, `next`, type packages); this is an environment/dependency-install limitation, not a claimed source pass.

## Remaining

- Live Neon reconciliation remains pending and must start read-only.
- Render/Vercel production smoke verification remains required after deployment.
- MFA audit remains intentionally deferred.
