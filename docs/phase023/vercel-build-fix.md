# Vercel build fix

The Vercel failure on commit d05571b was caused by `SiteHeader.tsx` importing `buildCategoryNavigation` from `lib/category-navigation.ts` while that module only exported `amaalCategoryNavigation` and `CategoryNavNode`.

The original category navigation remains intact. A compatibility `buildCategoryNavigation()` export now returns the restored original navigation so the public header does not replace the restored catalogue with a reduced API category list.

Validation completed locally:

* Node syntax check: PASS
* 129 public TypeScript/TSX source files transpile: PASS, 0 failures
* Category navigation export/import check: PASS
* No database reset, drop, truncate, or recreation
* Payment code was not modified by this build fix

A full Next.js production build could not be executed in the isolated workspace because npm dependencies could not be installed from the external registry. Vercel should therefore be used for the authoritative production build check after the patched source is uploaded.
