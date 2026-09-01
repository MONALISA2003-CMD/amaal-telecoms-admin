# Amaal Public Phone Catalogue — Search-First Homepage V1

## Purpose
Create a modern public catalogue homepage for Amaal phones where discovery begins with search and simple visual filters, while every catalogue model remains accessible.

## Layout
1. Amaal site header
2. Dark editorial phone collection hero
3. Primary phone search block
4. Horizontal brand navigation
5. Result count, sorting and page-size controls
6. Applied filter chips
7. Desktop filter sidebar / mobile filter drawer
8. Flat model grid
9. Pagination
10. Public-catalogue reassurance / support strip
11. Amaal footer

## Catalogue behavior
- Default view: 24 models per page.
- Optional: 48, 96, or All.
- All 156 phone models remain available through pagination or the All option.
- Search filters live results immediately and returns to page 1.
- Brand, family, network and storage filters can be combined.
- Product variants remain grouped under a single model.
- Clicking a model opens `/phones/[slug]`.

## Card behavior
Cards prioritize:
- brand
- series
- model name
- short model description
- available configurations
- model-detail CTA

Phone imagery is intentionally a model-specific placeholder until Amaal provides approved photography.

## Accessibility
- Native buttons/selects/inputs.
- Accessible search label.
- Accessible filter drawer controls.
- Pagination exposes current page through `aria-current`.
- Reduced-motion behavior should remain respected by any future animated catalogue elements.

## Data boundary
The public catalogue must not expose inventory quantities, warehouse records, suppliers, margins, purchase prices, IMEI/serial data, or other internal business information.
