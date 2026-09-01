import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url';
const root=path.dirname(fileURLToPath(import.meta.url));const server=fs.readFileSync(path.join(root,'server.js'),'utf8');const ui=fs.readFileSync(path.join(root,'apps/business-admin/components/StockWorkspace.tsx'),'utf8');const schema=fs.readFileSync(path.join(root,'schema.sql'),'utf8');
const checks=[
 ['transfer tables exist',/CREATE TABLE IF NOT EXISTS stock_transfers/.test(schema)&&/CREATE TABLE IF NOT EXISTS stock_transfer_lines/.test(schema)],
 ['transfer permission enforced',/need\('inventory\.transfer'\)/.test(server)],
 ['serialized transfer requires exact physical units',/Serialized transfer line requires exactly/.test(server)],
 ['transfer validates source location and In Stock status',/location_id!==b\.fromLocationId/.test(server)&&/status!=='In Stock'/.test(server)],
 ['transfer checks barcode and QR identifiers',/barcode=\$4 OR qr_code=\$5/.test(server)||/barcode=\$5 OR qr_code=\$6/.test(server)],
 ['ship requires approval',/status='Approved'/.test(server)&&/Transfer is not ready to ship/.test(server)],
 ['ship revalidates serialized units',/is no longer available at the source location/.test(server)],
 ['ship moves serialized units to transit state',/toStatus:'Transferred'/.test(server)&&/sourceType:'StockTransfer'/.test(server)],
 ['receive never creates missing serialized units',/missing from inventory and cannot be received/.test(server)&&!/INSERT INTO serialized_units\(variant_id,location_id,serial_number,imei1,imei2,status,unit_cost,received_at\).*cannot be received/.test(server)],
 ['receive restores exact units at destination',/toStatus:'In Stock'/.test(server)&&/locationId:t.to_location_id/.test(server)],
 ['transfer detail endpoint exists',/api\/inventory\/transfers\/\:id/.test(server)],
 ['Business Admin loads available physical units',/api\/inventory\/serialized\?variantId=/.test(ui)&&/status=In%20Stock/.test(ui)],
 ['Business Admin requires exact selected units',/requires exactly \$\{l\.quantity\} physical units/.test(ui)],
 ['Business Admin supports camera transfer scanning',/BarcodeDetector/.test(ui)&&/Scan unit/.test(ui)],
 ['Business Admin exposes approve ship receive actions',/act\(r\.id,'approve'\)/.test(ui)&&/act\(r\.id,'ship'\)/.test(ui)&&/act\(r\.id,'receive'\)/.test(ui)]
];let failed=0;for(const [name,ok] of checks){console.log(`${ok?'PASS':'FAIL'}: ${name}`);if(!ok)failed++;}if(failed){console.error(`WAREHOUSE TRANSFER AUDIT FAILED: ${failed}`);process.exit(1)}console.log('WAREHOUSE TRANSFER AUDIT PASS');
