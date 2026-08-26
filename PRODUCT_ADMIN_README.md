# Products — Business Admin Management Expansion

This increment expands Products from catalogue browsing into a real business catalogue-management workspace.

## Admin capabilities

- Create products with commercial and initial-variant fields
- Create brands, categories and tags
- Edit product identity/metadata
- Add and edit variants; archive variants through the existing engine
- Add product images
- Assign product tags
- Manage related/cross-sell/upsell relationships
- Publish/unpublish with existing engine validation
- Inspect and restore product revisions
- Validate/import catalogue batches

## Source of truth

The existing Render/Phase 4 engine and PostgreSQL database remain authoritative.
Business Admin does not connect directly to PostgreSQL and does not alter the backend engine.

The Next.js same-origin proxy only forwards authenticated `/api/catalog/*` requests to the existing engine.

## Next module

Stock, after a regression audit of Overview, Sales and Products.
