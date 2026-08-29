# Amaal Telecoms — Phase 16 Public/Private API Security Audit

Version: 1.0
Date: 2026-08-28

## Scope

Audited the ZIP working copy across PostgreSQL-facing Render API and public website API boundaries. MFA was intentionally not modified.

## Findings and fixes

### 1. Public catalogue field minimization
Public catalogue responses were hardened with a recursive allow-by-exclusion filter so internal identifiers and operational/commercial fields are not exposed to the public API, including internal IDs, supplier data, warehouse data, serial/IMEI/barcode/QR data, purchase/cost fields, internal fields, tax-rate and promotion identifiers.

Selling prices remain public catalogue data where the published product response already exposes retail pricing.

### 2. Public website catalogue minimization
The public website catalogue and public site payloads now pass through the same sensitive-field filter. Published page content continues to use existing HTML/script sanitization.

### 3. Integration secret exposure
The integration response helper previously removed `secret_encrypted` but could still expose the complete `config_json`. It now returns an empty configuration object to normal integration-management responses and exposes only `secretConfigured` for secret state.

Webhook responses use a dedicated safe projection so webhook metadata is preserved without secret material.

### 4. Public AI boundary
Public AI remains unauthenticated by design, with rate limiting, question length limits, published-catalogue-only source data, and a system instruction forbidding disclosure of internal business data. No MFA changes were made.

### 5. Existing perimeter controls rechecked
The current Render API perimeter retains:
- no-store caching for API responses
- CSRF validation for authenticated mutations
- same-origin/canonical public-origin checks
- restrictive security headers
- HTTPS-only integration destinations
- private/link-local integration host blocking

## Safety

No Neon production data was modified during this phase.
No database reset, truncate, destructive reseed, or catalogue deletion was performed.

## Verification

- server.js syntax: PASS
- web-and-hosting.js syntax: PASS
- integration-hub.js syntax: PASS
- public route inventory: PASS
- public sensitive-field hardening: PASS
- MFA: UNCHANGED

## Remaining live verification

The production Neon read-only reconciliation remains pending because the live Neon connector has previously failed authorization before SQL execution. The next production operation should remain read-only until that connection is healthy.
