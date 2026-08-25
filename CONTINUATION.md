# Amaal Telecoms Admin System — Continuation

## Current system state
The cumulative enterprise platform now includes Catalog, Inventory, Suppliers & Procurement, Customers & CRM, Sales & POS, Orders & E-commerce, Pricing & Promotions, Delivery & Logistics, Warranty & Repairs, Returns & Refunds and Document Management. Existing operational data, architecture and the canonical `purchase_requisitions` implementation are preserved.

## Completed module
**Document Management**

Implemented as the canonical document/attachment service for business records. It uses durable PostgreSQL-backed binary storage and does not create duplicate attachment stores inside individual modules.

### Implemented capabilities
- Secure authenticated document listing and retrieval
- Entity attachment to supported business records
- Server-side entity existence validation
- PDF, JPG/JPEG, PNG, WEBP, TXT, CSV, DOCX and XLSX uploads
- Content-type/signature validation
- 15 MB per-file limit
- SHA-256 integrity/checksum calculation
- Duplicate detection per business record
- Database-backed binary persistence
- Document metadata editing
- Visibility controls
- Tags
- Expiry dates and automatic expiry state
- Retention dates
- Retention protection against accidental archival
- Controlled retention override
- Document verification with actor/time
- Immutable version history
- Replacement/version uploads
- Download of current or historical versions
- Archive instead of destructive deletion
- Audit event history
- Existing platform audit-log integration
- Expiring-document endpoint for operational monitoring
- Customer, Supplier, Procurement, Sales, Orders, Delivery, Warranty, Returns, Credit, Finance, Product, Inventory, Web/Hosting and repair-record attachment support where the corresponding entity exists

## Database changes
Additive and backward-compatible only:
- Extended `documents` with status, expiry, retention, verification, version, archive and tag metadata.
- Added `document_versions` for immutable historical versions.
- Added `document_events` for document-specific lifecycle history.
- Existing `document_blobs` remains the current-version compatibility store.
- Added entity/status/expiry/retention/tag/version indexes.
- Existing documents are automatically seeded into version 1 during schema initialization when no version exists.
- No PostgreSQL reset, destructive migration, branch or duplicate procurement requisition table.

## API changes
- `GET /api/documents`
- `GET /api/documents/expiring`
- `GET /api/documents/:id`
- `GET /api/documents/:id/download`
- `GET /api/documents/:id/download?version=N`
- `POST /api/documents`
- `POST /api/documents/:id/versions`
- `PATCH /api/documents/:id`
- `POST /api/documents/:id/verify`
- `POST /api/documents/:id/archive`
- `DELETE /api/documents/:id` now archives rather than physically deleting the document, preserving history.

## Frontend changes
The Documents screen now supports:
- Upload with entity, description, expiry, retention, tags and visibility
- Current version display
- Status and expiry display
- Verification status
- Metadata editing
- Version creation
- Version history/details
- Historical-version downloads
- Document verification
- Controlled archival

## Integrations
- Customers, Suppliers, Procurement, Sales, Orders, Delivery, Warranty, Returns, Credit, Finance, Inventory and Web/Hosting can attach records through the canonical `documents` entity reference model.
- Warranty already consumes the canonical document service for claim evidence.
- Supplier qualification continues to use its existing supplier-document verification records for qualification-specific controls; Document Management does not replace that business workflow.
- No duplicate binary attachment engine was introduced.

## Testing and audit
- `node --check` passed for all application JavaScript files.
- `render-preflight.js` passed.
- Static PostgreSQL UUID aggregate audit passed.
- Canonical `purchase_requisitions` verified.
- No application YAML files.
- No `node_modules` or Git metadata in the deliverable.
- Secret-pattern audit performed.
- MFA remains untouched and deferred to the final security phase.
- Existing Sales, Orders, Pricing, Delivery, Warranty and Returns integration code was re-audited after Document Management changes.

Live Render and production PostgreSQL execution are not available in the local archive environment; no false live-production pass is claimed.

## Known limitations
- Binary files are stored in PostgreSQL, which is appropriate for the current platform scope but should be evaluated against object storage if document volume becomes very large.
- Public visibility remains behind authenticated admin access; it is a classification, not an anonymous public-download mechanism.
- External object storage and document OCR remain future Integration Hub/AI capabilities.

## MFA
MFA is intentionally untouched. No MFA tables, endpoints, UI or enforcement were added by this module.

## Next module
**Credit & Installments**

## Next-module continuation prompt
Continue from this cumulative ZIP. Inspect the complete project and this `CONTINUATION.md` first. Audit all completed modules before modifying anything. Preserve existing architecture and operational data. Never reset PostgreSQL, create database/Git branches, commit secrets or introduce YAML. Preserve canonical `purchase_requisitions`. Keep MFA completely untouched and final-phase only.

Build Credit & Installments as a genuine operational module integrated with Customers, Sales/POS, Orders, Inventory, Payments and Finance. Do not create a second customer, payment or finance engine. Implement credit profiles, eligibility, limits, applications, approvals, down payments, credit sales, installment schedules, payments, allocations, overdue tracking, collections, restructures, settlement, reversals, audit history, permissions, transaction integrity and real operational analytics. Ensure serialized telecom-device credit sales retain IMEI/customer/sale relationships. Use safe additive migrations, server-side authorization, transactional updates and real database data. Then run complete syntax, static, integration, security, migration and Render-preflight checks, perform cumulative regression testing, keep only `README.md` and `CONTINUATION.md`, and produce the next cumulative ZIP only after the audit passes.
