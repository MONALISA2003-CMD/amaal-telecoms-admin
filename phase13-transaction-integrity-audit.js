import fs from 'fs';
const server=fs.readFileSync('server.js','utf8');
const orders=fs.readFileSync('orders-ecommerce.js','utf8');
const procurement=fs.readFileSync('suppliers-procurement.js','utf8');
const lifecycle=fs.readFileSync('serialized-unit-lifecycle.js','utf8');
const checks=[
 ['procurement receipt validates serialized identifiers',/serializedConflict\(client,\[serial,imei1,imei2,barcode,qrCode\]\)/.test(procurement)],
 ['procurement receipt stores barcode and QR',/barcode,qr_code,status/.test(procurement)],
 ['receipt cancellation blocks moved serialized units',/su\.status!==['"]In Stock['"]/.test(procurement)],
 ['order reservation exists before payment',/reserveStock\(client,\{variantId:x\.v\.id/.test(orders)],
 ['exact serialized assignment required before dispatch',/all physical units assigned before dispatch/.test(orders)],
 ['fulfillment consumes reservations',/type:'ORDER_FULFILLMENT'/.test(orders)],
 ['fulfillment uses caller actor id',/toStatus:'Sold',actorId:userId,reason:`Sold with \${o.order_no}`/.test(orders)],
 ['serialized unit transitions to Sold on fulfillment',/toStatus:'Sold'.*OrderFulfillment/s.test(orders)],
 ['sale serialized unit requires In Stock',/status='In Stock' FOR UPDATE/.test(fs.readFileSync('sales-pos.js','utf8'))],
 ['serialized lifecycle has Reserved transition',/['"]In Stock['"]: new Set\(\[['"]Reserved['"]/.test(lifecycle)],
 ['database destructive operations absent',!/(^|\n)\s*(DROP\s+DATABASE|TRUNCATE\s+)/im.test([server,orders,procurement,lifecycle].join('\n'))]
];
let failed=0; for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} | ${name}`); if(!ok)failed++;}
process.exitCode=failed?1:0;
