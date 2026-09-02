# Phase 011 — Amaal Appliance Catalogue Expansion

## Scope
Expanded the public catalogue using the locked Home Appliances / Kitchen Appliances architecture and researched Uganda-market product ranges for Hisense, ADH, Roch, Saachi, Hoffmans, RAF, Pixel, Geepas and Midea.

## Catalogue
- 362 unique appliance product definitions in the public catalogue after the researched-brand expansion and duplicate cleanup.
- 115 Home Appliances entries.
- 165 Kitchen Appliances entries.
- Brand is an attribute/filter, not a category.
- Product family is the category-specific secondary filter.
- Prices remain `Price coming soon`.
- Images remain `Product photo coming soon` until supplied through the Business Console.
- No manufacturer links are exposed on the public website.

## Locked hierarchy
### Home Appliances
- Refrigerators & Freezers
- Washing Machines
- Air Conditioners
- Fans & Air Care
- Vacuum Cleaners
- Irons & Garment Care

### Kitchen Appliances
- Microwaves
- Ovens & Cooking
- Cookers & Hobs
- Air Fryers
- Pressure Cookers & Multicookers
- Blenders & Food Preparation
- Juicers
- Mixers
- Coffee & Beverage
- Grills & Breakfast
- Fryers
- Specialty
- Dishwashers

## UX implementation
The catalogue layout was refined around research-backed ecommerce patterns: clear category navigation before product browsing, restrained product-card density, persistent desktop controls, category-aware filtering, simple mobile controls, clear result counts, and consistent product information. This follows Baymard's guidance that intermediary category pages should prioritize subcategory navigation and that product-list filtering should use category-specific attributes with visible applied choices and appropriate desktop/mobile behavior.

## Safety / architecture
- Existing Amaal architecture preserved.
- Business Console remains the product-management surface.
- No destructive database changes.
- No public CRUD.
- No bundled product-image library.
- No Business Laptops reintroduced.
- Audio remains under Entertainment → Audio.
