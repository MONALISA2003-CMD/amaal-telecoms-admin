# Amaal Telecoms — Catalogue Management Build

## Purpose
Create a long-term catalogue control centre for the Business Admin console. The catalogue is the authoritative business source for the public website and for connected sales, stock, purchasing, orders, warranty and reporting workflows.

## Built in this update
- Dedicated Catalogue Control Centre under Products.
- Vertical, business-friendly catalogue tabs: Products, Categories, Brands, Collections and Archived.
- Product search and catalogue counts.
- Product archive, restore and protected permanent deletion for Super Admin.
- Safe deletion rules for categories and brands: records in use must be archived instead of breaking product relationships.
- Category hierarchy management with parent category selection, display order and public visibility.
- Category fields for description, image, banner, icon, featured placement and website page information.
- Brand management with logo, image, banner, website address, display order, featured placement and visibility.
- Curated Collections with create, edit, archive, delete, visibility, featured placement and display order.
- Collection-to-product data model for future merchandising and storefront curation.
- Additive PostgreSQL upgrade script for category/brand presentation fields and collections.
- Additive starter collection data.
- Existing starter catalogue remains additive and stock-free: no inventory balances, receipts or stock quantities are created.
- Business-facing catalogue wording cleaned up so staff see normal commercial terms rather than development terminology.
- Audit events are recorded for catalogue create/update/archive/delete/restore and collection changes.

## Catalogue model
- Category answers: “What kind of product is this?”
- Brand answers: “Who makes this product?”
- Product answers: “What are we selling?”
- Variant answers: “Which commercial version is it?” such as colour or storage.
- Collection answers: “Which products do we want to merchandise together?”
- Archive preserves business history; permanent deletion is deliberately restricted.

## Starter structure
### Phones
- iPhones: models 11 through 17, including Pro and Pro Max variants.
- Samsung Galaxy S: S20 through S26, including base, Plus and Ultra.
- Samsung Galaxy Foldable: Fold and Flip generations 4 through 8.
- Samsung Galaxy A: A57, A56, A36, A37, A26, A27, A16, A17, A07, A06.

### Tablets
- Top-level Tablets category with iPad and Samsung Galaxy Tab starter subcategories.

### Entertainment
- TV
- Speakers
- TV starter records for TCL, Hisense, Samsung, LG Global Star, SPJ, Chiq and Smart Plus in 32, 43, 50, 55, 65 and 75 inch sizes.

## Long-term behaviour
- Products are created as business records, not hard-coded website content.
- Public website visibility is controlled from the catalogue.
- Products can remain active but hidden from the public website while being prepared.
- Published products require core commercial information before publication.
- Product history is preserved through revisions and safe archiving.
- Catalogue relationships remain usable by sales, stock, purchasing, orders, warranty, returns and reporting.

## Database safety
This update is additive. It does not reset, truncate, recreate or clear existing business data and does not create stock quantities.

## Public website connection
A public read-only catalogue endpoint is included so the public storefront can consume the same approved catalogue records. It returns published categories, brands, products, product images, active variants and published collections only. Private stock, cost, employee, customer and administration information is not included.

For a separate public storefront domain, add its origin to `PUBLIC_WEB_ORIGINS` on the backend so browser requests to the public catalogue are allowed. This does not grant the storefront access to the private admin endpoints.
