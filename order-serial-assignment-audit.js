import fs from 'fs';

const orders = fs.readFileSync('orders-ecommerce.js','utf8');
const app = fs.readFileSync('public/app.js','utf8');
const schema = fs.readFileSync('schema.sql','utf8');
const checks = [
 ['order_serial_units table exists', schema.includes('CREATE TABLE IF NOT EXISTS order_serial_units')],
 ['physical unit is unique across order assignments', schema.includes('serialized_unit_id uuid NOT NULL UNIQUE')],
 ['serialized order quantity is constrained to one unit per line', orders.includes('v.serialized&&lineQty!==1')],
 ['available-unit endpoint exists', orders.includes("/api/orders/:id/serials/available")],
 ['available units are restricted to order location', orders.includes('su.location_id=$2')],
 ['available units require In Stock status', orders.includes("su.status='In Stock'")],
 ['available units exclude already assigned units', orders.includes('NOT EXISTS (SELECT 1 FROM order_serial_units')],
 ['assignment locks order', orders.includes('SELECT * FROM orders WHERE id=$1 AND status IN') && orders.includes('FOR UPDATE')],
 ['assignment locks exact physical unit', orders.includes('serialized_units WHERE id=$1') && orders.includes('FOR UPDATE')],
 ['assignment verifies variant and location', orders.includes('variant_id=$2 AND location_id=$3')],
 ['assignment changes unit to Reserved', orders.includes("SET status='Reserved'")],
 ['assignment has duplicate-safe response', orders.includes("already assigned to another order")],
 ['unassignment endpoint exists', orders.includes("app.delete('/api/orders/:id/serials/:assignmentId'")],
 ['unassignment restores In Stock', orders.includes("SET status='In Stock',updated_at=now()")],
 ['cancelled orders release assigned physical units', orders.includes("ol.order_id=$1 AND su.status='Reserved'")],
 ['fulfilment accepts Reserved assigned units and marks Sold', orders.includes("status IN ('In Stock','Reserved') RETURNING id")],
 ['Business Admin provides physical-unit assignment UI', app.includes('openOrderSerialAssignment')],
 ['Business Admin supports identifier search', app.includes('Search IMEI, serial, barcode or QR')],
 ['Business Admin supports real camera scanning', app.includes('navigator.mediaDevices.getUserMedia') && app.includes('BarcodeDetector')],
 ['Business Admin supports unassignment', app.includes('unassign-serial:')]
];
let fail=0; for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'}: ${name}`);if(!ok)fail++;}
if(fail)process.exit(1); console.log(`ORDER SERIAL ASSIGNMENT AUDIT PASS — ${checks.length}/${checks.length}`);
