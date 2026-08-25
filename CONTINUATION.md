# Amaal Telecoms Admin System — Phase 39 Continuation Prompt

## Starting point

This archive is the cumulative Amaal Telecoms Admin System after **Phase 39 — Global Search, UX & Operational Polish**, with a full cumulative audit and debugging pass applied.

Do not rebuild the project. Inspect the cumulative codebase first and continue from the existing architecture.

## Phase 39 status

Phase 39 is considered implemented and strengthened.

The latest audit specifically corrected a security/data-isolation weakness in Global Search: a user with `search.view` can now search only the operational domains for which that user also has the corresponding view permission. Global-search health counts follow the same boundary.

Search wildcard escaping was also corrected so literal `%`, `_` and `\\` characters are preserved correctly in ILIKE patterns and exact-match ranking.

## Required audit discipline for every future rezip

Before modifying or packaging anything:

1. Inspect the entire cumulative project.
2. Audit every existing module for missing dependencies, broken routes, inconsistent permissions and cross-module state errors.
3. Check schema/table/column compatibility.
4. Check financial, inventory, order, return, warranty and credit transaction integrity.
5. Debug confirmed issues before adding new functionality.
6. Run JavaScript syntax checks across the complete application.
7. Run module registration/import checks.
8. Run Render preflight.
9. Run secret/security scans.
10. Remove obsolete/useless Markdown files.
11. Keep only useful `README.md` and `CONTINUATION.md` documentation.
12. Update `README.md` to describe the actual build.
13. Replace this `CONTINUATION.md` with the exact next continuation instructions.
14. Rezip only after the cumulative audit and verification pass.

Never claim live production verification unless a real deployment/database test was performed.

## MFA — STRICTLY OUT OF SCOPE

Do not implement MFA.

Do not create or modify:

- MFA tables
- MFA APIs
- TOTP
- recovery codes
- trusted-device flows
- MFA middleware
- MFA login enforcement
- MFA screens
- MFA recovery functionality

Existing MFA-related artifacts must remain untouched.

MFA remains deferred until after domain acquisition, deployment, public testing and production feedback.

## Next build — Phase 40A: Media Management

Build Media Management as the first new Phase 40 subsystem.

Before coding, audit the existing document/media foundations and the web-media implementation so the new system complements rather than duplicates them.

Build:

### Media library

Support approved:

- product images
- variant images
- brand assets
- category images
- website assets
- marketing assets
- documents where appropriate
- user-uploaded media

### Metadata

Store and expose safely:

- filename
- MIME type
- extension
- size
- dimensions where applicable
- checksum
- storage reference
- uploader
- timestamps
- status
- visibility
- tags
- description
- alt text
- caption
- entity relationships

### Processing

Implement:

- actual-content validation
- MIME validation
- extension validation
- file-size limits
- image dimension validation
- thumbnails
- optimized image variants
- checksum/duplicate detection
- safe filename handling

Never trust a filename extension.

Never expose private media through predictable public URLs.

### Organization

Build:

- folders/collections where appropriate
- tags
- categories
- search
- filters
- sorting
- bulk selection
- bulk tagging
- bulk association
- archive
- restore
- controlled deletion

### Relationships

Allow reusable media references for:

- Products
- Variants
- Brands
- Categories
- Pages
- Content blocks
- Marketing content
- Documents where appropriate

Avoid unnecessary duplicate files.

### API and UI

Provide complete authorized operations for:

- upload
- list
- search
- metadata update
- association
- replacement
- versioning where required
- archive
- restore
- delete
- bulk operations

The UI must support desktop, tablet and mobile layouts.

## Integration requirements

Media must integrate cleanly with the existing Catalog, Web & Hosting, Document Management and public e-commerce publishing architecture.

Do not break existing `web_media` behavior. Decide deliberately whether it should be reused, generalized or bridged into the new media abstraction.

## Database rules

Use additive, safe migrations.

Never reset PostgreSQL.

Never delete operational records to make a migration pass.

Preserve canonical `purchase_requisitions`.

Never reintroduce `procurement_requisitions` into runtime code.

## Completion gate

Do not proceed to System Operations until Media Management has:

- backend APIs
- authorization
- safe storage handling
- database migration
- admin UI
- existing-module integration
- regression checks
- syntax checks
- Render preflight pass
- README update
- fresh continuation prompt
- clean rezip

The next rezip must again contain only useful Markdown documentation: `README.md` and `CONTINUATION.md`.
