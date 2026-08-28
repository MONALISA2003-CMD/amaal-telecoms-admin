# Phase 21 — Production Certification & Release Hardening

Date: 2026-08-28
Project: Amaal Telecoms

## Executive result

**Release status: CONDITIONAL — application/database design is substantially verified, but production deployment certification is blocked by the local build environment and lack of an authenticated staging web runtime.**

No production business data was fabricated or changed during this phase.

## Completed gates

- Production Neon branch inspected read-only.
- Development Neon branch inspected and used for isolated E2E validation.
- Disposable E2E branch was created, exercised, verified, and deleted.
- Complete serialized-device business chain passed in the isolated test.
- Permission catalogue verified at 130 permissions.
- Database structure contains 201 public tables, 41 public functions, 3 triggers, 439 foreign keys and 542 indexes.
- Production catalogue is populated (417 products / 694 variants).
- Production operational transaction tables remain empty at audit time; this is treated as a state finding, not seeded as a defect.
- JavaScript source syntax check passed for the root livefix scripts.
- Existing Phase 19/20 permission and cross-module audit scripts retained.
- Business Admin Phase 20 workspaces retained: Reports/BI, Team & Access, Business Settings.
- Figma Phase 20 Admin design file created.

## Build gate

### Blocked

The Business Admin package declares Node 24.x, while the available local runtime is Node 22.16.0. Dependency installation was attempted with npm but did not complete within the available execution window. A dependency-free TypeScript check therefore reports missing installed modules rather than application-level type failures.

**Required external gate:** run `npm ci` with network access under Node 24.x, then run:

- `npm run lint`
- `npm test`
- `npm run build`
- `npm run test:e2e`

The root package separately targets Node 20.x and should be validated in its own deployment runtime.

## Database gate

Production database was not modified. The live production state observed during the audit:

- PostgreSQL 18.6
- 201 public tables
- 0 views
- 41 public functions
- 3 triggers
- 439 foreign keys
- 542 indexes
- 130 permissions
- 3 roles
- 1 active user
- 417 products
- 694 variants
- 0 orders
- 0 sales
- 0 customers
- 0 inventory balances
- 0 serialized units
- 0 finance journals
- 0 returns
- 0 warranty claims
- 0 repair jobs
- 96 audit log records
- 0 security-event records

The operationally empty state means live financial/inventory reconciliation against business transactions cannot be performed until real transactions exist.

## Isolated E2E gate

A disposable development branch successfully exercised:

Supplier → PO → Receiving → Batch → Serialized Unit → Inventory → Customer → Order → Payment → Exact Serialized Assignment → Delivery → Sale → Finance → Warranty → Repair → Return.

The final assertions passed for delivered/paid/completed state, sold serialized unit, zero remaining stock/reservation for the sold unit, intact order/sale serial links, no orphan variants and no duplicate SKUs.

The branch was deleted after testing.

## Security gate

The Phase 19 controls remain the release baseline:

- permission enforcement
- session controls
- CSRF/origin boundaries
- public/private API boundaries
- destructive-operation protections
- Super Admin safeguards
- sidebar permission consistency

The repository includes regression/audit scripts for these controls. They must be run against the installed runtime and authenticated staging environment before production deployment.

## Release checklist

- [x] Production DB inspected without synthetic writes
- [x] Disposable E2E branch tested and removed
- [x] Business transaction chain structurally verified
- [x] Permission inventory verified
- [x] Catalogue integrity checked
- [x] Admin/Superadmin UI workspaces implemented
- [x] Reports/BI workspace implemented
- [x] Business Settings workspace implemented
- [ ] Node 24 dependency install completed in a networked environment
- [ ] ESLint clean in installed environment
- [ ] TypeScript/Next build clean in installed environment
- [ ] Playwright authenticated staging run completed
- [ ] Browser/mobile smoke test completed against deployed staging
- [ ] Production deployment completed
- [ ] Post-deploy read-only reconciliation completed

## Deployment decision

Do **not** label the release fully production-certified until the unchecked environment-level gates have passed. The application work is ready for that verification step; the remaining blocker is execution infrastructure, not an identified production data-integrity failure.

## Deep Phase 21 completion pass — 2026-08-28

Completed after the initial release-candidate review:
- Disposable Neon E2E chain rerun and verified across purchase, receipt, batch, serial/IMEI, warehouse transfer, order, payment, serial assignment/picking, dispatch, delivery, sale, warranty, repair and return/restock.
- Production read-only BI reconciliation rerun: sales/payments, posted finance balance, serialized provenance, sold-unit location safety, and website management activity.
- Added dedicated website activity BI endpoint and Business Admin/legacy report navigation.
- Corrected BI failure presentation so unavailable backend data cannot masquerade as legitimate zero-valued KPIs.
- Added Admin/Superadmin permission matrix and deep business-integrity regression.
- Saved BI snapshots are presented as retained audit records; the UI no longer offers a misleading delete action.

Final deep audit artifact: `PHASE21_DEEP_AUDIT_RESULT.md`.
