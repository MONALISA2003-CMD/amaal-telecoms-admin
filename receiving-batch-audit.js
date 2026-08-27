import fs from 'fs';
import path from 'path';
const root=path.dirname(new URL(import.meta.url).pathname);
const schema=fs.readFileSync(path.join(root,'schema.sql'),'utf8');
const migration=fs.readFileSync(path.join(root,'inventory-serialized-migration.sql'),'utf8');
const procurement=fs.readFileSync(path.join(root,'suppliers-procurement.js'),'utf8');
const ui=fs.readFileSync(path.join(root,'public/app.js'),'utf8');
const checks=[
 ['batch provenance fields are additive',/ALTER TABLE inventory_batches ADD COLUMN IF NOT EXISTS (?:purchase_order_id|goods_receipt_id|purchase_order_line_id|supplier_id)/i.test(schema)&&/ADD COLUMN IF NOT EXISTS quantity_rejected/i.test(migration)],
 ['batch status supports safe reversal',/inventory_batches_status_check/.test(schema)&&/status IN \('Active','Cancelled'\)/.test(migration)],
 ['serialized units support receiving void state',/serialized_units_status_check/.test(migration)&&/Voided/.test(schema)],
 ['purchase receipt creates a batch',/INSERT INTO inventory_batches\(batch_number,variant_id,location_id,supplier_name,supplier_reference,quantity_received,quantity_rejected,purchase_order_id,purchase_order_line_id,goods_receipt_id,supplier_id/i.test(procurement)],
 ['serialized units link to receiving batch',/INSERT INTO serialized_units\(variant_id,location_id,batch_id,serial_number,imei1,imei2,barcode,qr_code/i.test(procurement)],
 ['receipt ledger links to batch',/INSERT INTO stock_receipt_lines\(receipt_id,variant_id,quantity,unit_cost,serials,batch_id\)/i.test(procurement)],
 ['rejected quantity does not enter stock',/delta:accepted/.test(procurement)&&/received_qty=received_qty\+\$1/.test(procurement)],
 ['PO received quantity tracks accepted quantity',/const accepted=qty-rejected/.test(procurement)&&/received_qty=received_qty\+\$1/.test(procurement)],
 ['duplicate identifiers checked across identifier types',/serializedConflict/.test(procurement)&&/serial_number=\$1 OR imei1=\$1 OR imei2=\$1 OR barcode=\$1 OR qr_code=\$1/.test(procurement)],
 ['receipt cancellation preserves unit history',(/UPDATE serialized_units SET status='Voided'/i.test(procurement)||/transitionSerializedUnit\([\s\S]*toStatus:'Voided'/i.test(procurement))&&!/DELETE FROM serialized_units/i.test(procurement)],
 ['receipt cancellation preserves batch history',/UPDATE inventory_batches SET status='Cancelled'/i.test(procurement)],
 ['receipt detail exposes batch provenance',/batch_number/.test(procurement)&&/serialized_unit_count/.test(procurement)],
 ['Business Admin uses structured receiving workflow',/openPurchaseReceipt/.test(ui)&&/grSerials/.test(ui)&&/grPost/.test(ui)],
 ['camera scan is real',/getUserMedia/.test(ui)&&/BarcodeDetector/.test(ui)&&/facingMode/.test(ui)],
 ['no JSON-only receiving form remains',!ui.split('\n').some(line=>line.includes("if(a.startsWith('receive-po:'))")&&line.includes('jsonLinesField'))],
];
let failed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'}: ${name}`);if(!ok)failed++;}
if(failed){console.error(`Receiving/batch audit failed: ${failed} check(s).`);process.exitCode=1}else console.log('RECEIVING/BATCH AUDIT PASS');
