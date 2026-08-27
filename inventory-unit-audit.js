import fs from 'fs';
import path from 'path';
const root=path.dirname(new URL(import.meta.url).pathname);
const schema=fs.readFileSync(path.join(root,'schema.sql'),'utf8');
const server=fs.readFileSync(path.join(root,'server.js'),'utf8');
const moduleCode=fs.readFileSync(path.join(root,'inventory-serialized.js'),'utf8');
const ui=fs.readFileSync(path.join(root,'apps/business-admin/components/StockWorkspace.tsx'),'utf8');
const checks=[
 ['inventory_batches table',/CREATE TABLE IF NOT EXISTS inventory_batches\s*\(/i.test(schema)],
 ['serialized unit batch link',/ALTER TABLE serialized_units ADD COLUMN IF NOT EXISTS batch_id/i.test(schema)],
 ['barcode and QR storage',/ADD COLUMN IF NOT EXISTS barcode[\s\S]*ADD COLUMN IF NOT EXISTS qr_code/i.test(schema)],
 ['duplicate-safe identifiers',/uq_serialized_units_barcode/.test(schema)&&/uq_serialized_units_qr_code/.test(schema)],
 ['single unit entry API',/app\.post\('\/api\/inventory\/serialized'/i.test(moduleCode)],
 ['batch listing API',/app\.get\('\/api\/inventory\/batches'/i.test(moduleCode)],
 ['manual entry',/Enter manually/.test(ui)],
 ['paste list',/Paste a list/.test(ui)],
 ['CSV upload',/Upload CSV/.test(ui)],
 ['camera scanning',/getUserMedia/.test(ui)&&/BarcodeDetector/.test(ui)],
 ['private business wording',/never appear on the public catalogue/.test(ui)],
 ['public catalogue excludes identifiers',!/serialized_units/.test(fs.readFileSync(path.join(root,'web-and-hosting.js'),'utf8'))],
 ['serialized inventory module registered',/registerSerializedInventory\(\{app,auth,need,q,pool,audit\}\)/.test(server)],
 ['camera permission allowed',/camera=\(self\)/.test(server)],
];
const failed=checks.filter(([,ok])=>!ok);
for(const [name,ok] of checks)console.log(`${ok?'PASS':'FAIL'}: ${name}`);
if(failed.length){process.exitCode=1;console.error(`Inventory unit audit failed: ${failed.length} check(s).`)}else console.log('INVENTORY UNIT AUDIT PASS');
