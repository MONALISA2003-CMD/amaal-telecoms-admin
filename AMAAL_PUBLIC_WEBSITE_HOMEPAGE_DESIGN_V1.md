# Amaal Public Website — Homepage Design V1

## Direction

**Premium Retail / Luxury Lifestyle**

Reference direction: the selected middle concept (#2) from the three homepage explorations.

The homepage must communicate in approximately five seconds:

> Amaal is a premium, trusted, genuine consumer-electronics and home retailer.

## Hero

**Headline:**

> Better technology. Better every day.

**Support copy:**

> Premium devices and appliances for your home, work and lifestyle — selected for the way you live.

**Hero products:**

- iPhone 17 Pro Max
- Galaxy S26 Ultra
- Samsung U8000F 75-inch TV
- Samsung B550 Soundbar

The hero should feel like one premium environment rather than a product collage. Phones are the foreground anchors; TV and soundbar establish scale and the home-entertainment lifestyle.

## Homepage sequence

1. Header
2. Hero
3. Trust / reassurance strip
4. Shop by category
5. Featured at Amaal
6. Cinematic home-entertainment feature
7. Explore by lifestyle
8. Amaal Deals
9. New at Amaal
10. Trusted brands
11. The Amaal Difference
12. Home / Kitchen / Work & Play
13. After-sales / customer self-service
14. Customer assistance / enquiry CTA
15. Newsletter
16. Final brand CTA
17. Footer

## Visual system

### Palette

- Warm ivory / paper white
- Deep charcoal
- Warm brown
- Restrained champagne / gold
- Product photography supplies most visual colour

### Typography

- Editorial serif for major lifestyle headlines
- Clean sans-serif for navigation, metadata, controls and product information
- Generous whitespace
- Tight, intentional hierarchy

### Interaction

- Subtle hover lift/scale on cards
- Quiet link treatments
- Clear primary CTAs
- No excessive badges, gradients or marketplace-style visual noise

## Merchandising principle

The hero is intentionally restrained. The broader catalogue is demonstrated through category cards, featured products, lifestyle collections and the Home / Kitchen / Work & Play section.

The homepage should not attempt to show every product above the fold.

## Real supplied products

| Product | Price |
|---|---:|
| iPhone 17 Pro Max 256GB | UGX 5,200,000 |
| Galaxy S26 Ultra 256GB | UGX 3,800,000 |
| Samsung U8000F 75-inch 4K Smart TV | UGX 5,400,000 |
| Samsung B550 Soundbar | Price on request pending authoritative value |
| TCL 606L Top Mount Refrigerator | UGX 2,900,000 |
| Hisense HFG60121X 4-Burner Gas Cooker | UGX 1,200,000 |
| HP Omen Gaming Laptop | UGX 5,100,000 |

## Architecture constraint

The public website remains a separate frontend under:

`apps/public-web/`

The Business Admin Console remains:

`apps/business-admin/`

The existing backend and database remain authoritative.

**No database reset or destructive backend change is permitted for homepage work.**

## Approval gate

Homepage implementation should be visually and structurally approved before extending the design system to the rest of the customer commerce journeys.

## Phase 29 Homepage Refinement — Locked Merchandising Rules

### Categories
Phones; TV & Home Entertainment; Audio; Home Appliances; Kitchen Appliances; Gaming & Computing; Accessories.

### Motion
Category, Featured, New at Amaal and Brand sections are horizontal continuous rails with automatic motion. Hover/focus pauses motion. Reduced-motion users receive a non-animated horizontal scroll experience.

### Product cards
Homepage cards show only quick details and price. Clicking opens the product detail route for the fuller description/specifications.

### Asset policy
No product photograph is reused across homepage sections. Current homepage visuals are explicit placeholders awaiting unique Amaal-supplied photography.

### Weekly Deals
Weekly Deals is present as a merchandising section but contains no fabricated discount percentage or promotional price until Amaal supplies approved promotion data.
