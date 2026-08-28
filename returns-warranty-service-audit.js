import fs from 'fs';
const returns=fs.readFileSync('returns-refunds.js','utf8');
const warranty=fs.readFileSync('warranty-repairs.js','utf8');
const schema=fs.readFileSync('returns-refunds.sql','utf8');
const checks=[
 ['return serialized line quantity is one',/serialized_unit_id&&qty!==1/.test(returns)&&/return_lines_serialized_qty_one/.test(schema)],
 ['active duplicate return unit blocked',/already attached to active return/.test(returns)],
 ['return restock maps physical unit to Returned',/toStatus:'Returned'/.test(returns)],
 ['return repair maps physical unit to Service',/l\.disposition==='Repair'\?'Service'/.test(returns)],
 ['return scrap maps physical unit to Damaged',/l\.disposition==='Scrap'\?'Damaged'/.test(returns)],
 ['warranty captures prior unit status',/prior_serial_status/.test(warranty)],
 ['warranty captures prior unit location',/prior_serial_location_id/.test(warranty)],
 ['warranty opens unit in Service',/toStatus:'Service'/.test(warranty)],
 ['warranty cancellation/rejection restores prior unit',/restoreSerial\(client,w,req\.user\.id\)/.test(warranty)],
 ['warranty resolution restores prior unit instead of forcing Sold',/const target=w\.prior_serial_status\|\|'Sold'/.test(warranty)],
 ['repair completion gates claim to collection',/status='Ready for Collection'/.test(warranty)],
 ['collection restores prior unit state',/Claim.*collected.*item returned/.test(warranty)],
 ['no serialized unit delete in returns/warranty',!(/DELETE\s+FROM\s+serialized_units/i.test(returns)||/DELETE\s+FROM\s+serialized_units/i.test(warranty))],
 ['return refund remaining amount is bounded',/Refund exceeds remaining eligible amount/.test(returns)],
];
let failed=0; for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'} ${name}`); if(!ok) failed++;}
console.log(`Returns/Warranty/Service audit: ${checks.length-failed}/${checks.length} PASS`);
process.exitCode=failed?1:0;
