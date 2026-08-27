# Inventory Unit Management

## Purpose
Amaal now separates the public product catalogue from the private records of physical inventory units. Phones, tablets and other serialized goods can be tracked one unit at a time without exposing identifiers or exact stock counts to customers.

## Business Admin capabilities
- Choose individual-unit tracking on a product variant.
- Add units one at a time with serial number, IMEI 1, IMEI 2, barcode and QR value.
- Paste a list of identifiers.
- Upload a CSV with `serial`, `imei1`, `imei2`, `barcode`, and `qr_code` columns.
- Scan QR codes and supported barcodes with a device camera where the browser supports camera scanning. A 14–16 digit scan is treated as an IMEI; other scans are retained as a QR value.
- Assign units to a warehouse.
- Group received units into a batch with supplier and supplier reference information.
- Prevent duplicate identifiers.
- View private unit history and current status in Business Admin.
- Keep serialized unit counts synchronized with inventory balances when units are added through the unit-entry workflow.

## Public website boundary
The public catalogue exposes the product, pricing, description, specifications, images and normal product variants. It does not expose serial numbers, IMEIs, barcodes, QR values, batch numbers, supplier information, warehouse locations or exact remaining unit counts.

## Data safety
The change is additive. Startup applies the schema amendments with `CREATE TABLE IF NOT EXISTS` and `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`. No reset, truncate, reseed, or deletion of existing business records is part of this build.

## Operational chain
Supplier receipt → batch → physical unit → warehouse → sale/order → delivery → return/service/warranty.
