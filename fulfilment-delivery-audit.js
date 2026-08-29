import fs from 'fs';
const files={schema:fs.readFileSync('schema.sql','utf8'),migration:fs.readFileSync('delivery-logistics.sql','utf8'),delivery:fs.readFileSync('delivery-logistics.js','utf8'),orders:fs.readFileSync('orders-ecommerce.js','utf8'),server:fs.readFileSync('server.js','utf8')};
const checks=[
 ['delivery shipment unit table migration exists',files.migration.includes('delivery_shipment_serial_units')],
 ['migration is repeat-safe',files.migration.includes('CREATE TABLE IF NOT EXISTS delivery_shipment_serial_units')],
 ['existing shipments are backfilled',files.migration.includes('INSERT INTO delivery_shipment_serial_units')],
 ['server loads delivery migration',files.server.includes('delivery-logistics.sql')],
 ['shipment creation requires complete serialized assignment',files.delivery.includes('must have every physical unit assigned before delivery is created')],
 ['shipment creation requires Reserved units',files.delivery.includes('must still be Reserved before delivery is created')],
 ['shipment stores exact serialized units',files.delivery.includes('INSERT INTO delivery_shipment_serial_units')],
 ['shipment detail exposes serialized units',files.delivery.includes('s.serializedUnits=')],
 ['delivery progression validates exact units',files.delivery.includes('Every serialized unit must still be Reserved')],
 ['delivery completion requires exact linked units',files.delivery.includes('Delivery is missing one or more exact serialized physical units')],
 ['delivery completion requires Reserved then Sold',files.delivery.includes("Every serialized unit must be Reserved before delivery completion") && files.delivery.includes("toStatus:'Sold'")],
 ['dispatch requires serialized assignment',files.orders.includes('before dispatch')],
 ['active delivery blocks unit unassignment',files.orders.includes('already attached to active delivery')],
 ['no destructive delivery unit deletion',!['delete from delivery_shipment_serial_units','truncate delivery_shipment_serial_units','drop table delivery_shipment_serial_units'].some(x=>files.delivery.toLowerCase().includes(x))],
];
let fail=0;for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${n}`);if(!ok)fail++;}console.log(`Fulfilment/delivery reconciliation audit: ${checks.length-fail}/${checks.length} PASS`);process.exitCode=fail?1:0;
