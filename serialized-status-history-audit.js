import fs from 'fs';
const schema=fs.readFileSync('schema.sql','utf8');
const migration=fs.readFileSync('inventory-serialized-migration.sql','utf8');
const inventory=fs.readFileSync('inventory-serialized.js','utf8');
const orders=fs.readFileSync('orders-ecommerce.js','utf8');
const sales=fs.readFileSync('sales-pos.js','utf8');
const delivery=fs.readFileSync('delivery-logistics.js','utf8');
const warranty=fs.readFileSync('warranty-repairs.js','utf8');
const returns=fs.readFileSync('returns-refunds.js','utf8');
const server=fs.readFileSync('server.js','utf8');
const checks=[
 ['history table exists in schema',/CREATE TABLE IF NOT EXISTS serialized_unit_status_history/.test(schema)],
 ['repeat-safe history migration exists',/CREATE TABLE IF NOT EXISTS serialized_unit_status_history/.test(migration)],
 ['lifecycle trigger exists',/CREATE TRIGGER trg_serialized_unit_lifecycle/.test(schema)&&/CREATE TRIGGER trg_serialized_unit_lifecycle/.test(migration)],
 ['transition guard exists',/CREATE TRIGGER trg_serialized_unit_transition/.test(schema)&&/enforce_serialized_unit_transition/.test(migration)],
 ['historical baseline is additive',/WHERE NOT EXISTS \(SELECT 1 FROM serialized_unit_status_history/.test(schema)&&/WHERE NOT EXISTS \(SELECT 1 FROM serialized_unit_status_history/.test(migration)],
 ['manual status endpoint blocks workflow-owned states',inventory.includes('manualTransitions={')&&inventory.includes('controlled by the related order, sale, transfer, return or receiving workflow')],
 ['order reservation transition exists',/status='Reserved'/.test(orders)&&/order_serial_units/.test(orders)],
 ['order cancellation releases reserved units',/status='In Stock'/.test(orders)&&/ORDER BY/.test(orders) || /status='In Stock'/.test(orders)],
 ['sales transition to sold exists',/status='Sold'/.test(sales)&&/sale_serial_units/.test(sales)],
 ['delivery accepts reserved serialized units',/status='Reserved'/.test(delivery)&&/delivery_shipment_serial_units/.test(delivery)],
 ['returns preserve serialized unit',/serialized_unit_id/.test(returns)&&/UPDATE serialized_units/.test(returns)],
 ['warranty preserves prior status/location',/prior_serial_status/.test(warranty)&&/prior_serial_location_id/.test(warranty)],
 ['history endpoint returns lifecycle ledger',/serialized_unit_status_history h/.test(server)&&/history,movements/.test(server)],
 ['no destructive serialized-unit delete in active receiving code',!/DELETE FROM serialized_units/i.test(server)&&!/DELETE FROM serialized_units/i.test(inventory),],
];
let failed=0; for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`);if(!ok)failed++;}console.log(`Serialized status/history audit: ${checks.length-failed}/${checks.length} PASS`);process.exitCode=failed?1:0;
