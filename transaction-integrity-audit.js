import fs from 'fs';
const files={
 receiving:fs.readFileSync('suppliers-procurement.js','utf8'),
 orders:fs.readFileSync('orders-ecommerce.js','utf8'),
 sales:fs.readFileSync('sales-pos.js','utf8'),
 delivery:fs.readFileSync('delivery-logistics.js','utf8'),
 returns:fs.readFileSync('returns-refunds.js','utf8'),
 warranty:fs.readFileSync('warranty-repairs.js','utf8'),
 inventory:fs.readFileSync('server.js','utf8'),
};
const checks=[];
function tx(name,s){checks.push([`${name} uses transaction boundaries`,/BEGIN/.test(s)&&/COMMIT/.test(s)&&/ROLLBACK/.test(s)]);}
tx('Receiving',files.receiving); tx('Orders',files.orders); tx('Sales',files.sales); tx('Delivery',files.delivery); tx('Returns',files.returns); tx('Warranty/Service',files.warranty); tx('Inventory',files.inventory);
checks.push(['Orders exact-unit reservation uses lifecycle guard',/toStatus:'Reserved'/.test(files.orders)&&/transitionSerializedUnit/.test(files.orders)]);
checks.push(['Sales serialized sale uses lifecycle guard',/toStatus:'Sold'/.test(files.sales)&&/transitionSerializedUnit/.test(files.sales)]);
checks.push(['Delivery serialized completion uses lifecycle guard',/toStatus:'Sold'/.test(files.delivery)&&/transitionSerializedUnit/.test(files.delivery)]);
checks.push(['Returns serialized disposition uses lifecycle guard',/toStatus:'Returned'/.test(files.returns)&&/transitionSerializedUnit/.test(files.returns)]);
checks.push(['Transfers use lifecycle guard',/toStatus:'Transferred'/.test(files.inventory)&&/toStatus:'In Stock'/.test(files.inventory)&&/transitionSerializedUnit/.test(files.inventory)]);
let failed=0; for(const [n,ok] of checks){console.log(`${ok?'PASS':'FAIL'}: ${n}`); if(!ok) failed++;}
console.log(`TRANSACTION INTEGRITY AUDIT: ${checks.length-failed}/${checks.length} PASS`); process.exitCode=failed?1:0;
