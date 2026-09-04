# Amaal production data foundation — 2026-09-04

## Completed

The existing Neon production records were audited before making changes. The catalogue already contains the required product/variant records; no products or variants were created.

Approved homepage offer prices were written to the matching existing `product_variants` rows using stable UUID + SKU guards:

- iPhone 16 Pro Max 256GB — UGX 3,500,000
- Google Pixel 9 256GB / 12GB — UGX 1,800,000
- Samsung Galaxy A17 128GB / 4GB — UGX 700,000
- Google Pixel 11 Pro XL 256GB / 12GB — UGX 5,500,000
- Google Pixel 11 Pro XL 512GB / 16GB — UGX 6,000,000
- Samsung Galaxy Z Fold8 256GB / 12GB — UGX 6,000,000
- Samsung Galaxy Z Fold8 512GB / 12GB — UGX 6,180,000
- Samsung Galaxy Z Fold8 Ultra 256GB / 12GB — UGX 6,450,000
- Samsung Galaxy Z Fold8 Ultra 512GB / 12GB — UGX 6,900,000
- Samsung Galaxy Z Fold8 Ultra 1TB / 16GB — UGX 8,600,000
- TECNO Camon 50 Pro 5G/4G 256GB / 8GB — UGX 1,350,000
- TCL 50 inch TV — UGX 1,200,000
- TCL 75 inch TV — UGX 3,500,000

The exact SQL is retained in `production-pricing-2026-09-04.sql` for audit/reproducibility.

## Intentionally not fabricated

Neon production currently has zero `inventory_locations`, zero `inventory_balances`, and zero customers/orders. The approved catalogue prices do not provide a trustworthy physical stock quantity or fulfilment location. Therefore no warehouse/store, stock quantity, customer, order, or fake inventory was invented.

This means real checkout remains correctly blocked until Amaal enters an actual fulfilment location and actual on-hand quantities through the existing inventory model/Admin Console. The storefront and checkout code should not be changed to bypass that control.

## Verification

The updated variants were re-read from Neon and their `selling_price` values match the approved homepage offers. Their current available quantity remains 0 because no inventory has been entered.
