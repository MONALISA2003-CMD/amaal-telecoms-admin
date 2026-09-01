# Amaal Telecoms — Serialized Inventory Unit Management

## Purpose
Manage individual telecom/electronics physical units without turning product records into storage for IMEIs or serial numbers.

## Model
Product → Variant → Physical Inventory Unit

Each serialized unit may carry:
- IMEI 1
- IMEI 2
- Serial number
- Barcode
- QR value
- Batch
- Supplier provenance
- Purchase reference
- Unit cost
- Warehouse/location
- Status
- Warranty/service notes

## Receiving integration
Purchase-order receiving now creates an `inventory_batches` record per receipt line and attaches newly received serialized units to that batch.

Batch provenance includes:
- purchase order
- purchase-order line
- goods receipt
- supplier
- receiving location
- accepted quantity
- rejected quantity

The same batch is also linked to the compatibility stock-receipt ledger.

## Serialized receiving
Business Admin supports:
- manual identifier entry
- paste/CSV-style identifier entry
- camera scanning when browser/device support exists
- rear-camera preference on mobile
- manual fallback when camera support is unavailable

For accepted serialized units, one identifier record is required per physical unit.

## Duplicate protection
Identifier values are checked across serial, IMEI 1, IMEI 2, barcode and QR fields. A value already used by another serialized unit cannot be registered again.

## Rejections
Rejected quantity does not enter inventory. Serialized receiving currently requires rejected quantity to be zero because rejected physical identifiers are not registered as available business inventory units in the current workflow.

## Reversal
A posted receiving reversal does not delete the physical-unit record. The associated batch becomes `Cancelled`, and affected serialized units become `Voided` after validation that they have not moved, been sold, reserved or serviced.

## Privacy
Serialized identifiers, supplier data, purchase cost, warehouse location and unit history are private administration data. They must not appear in public catalogue responses.

## Next work
1. Exact-unit warehouse transfers.
2. Exact-unit order fulfilment.
3. Complete physical-unit history.
4. Return/warranty/service traceability.
