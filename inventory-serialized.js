import crypto from 'crypto';
import { transitionSerializedUnit } from './serialized-unit-lifecycle.js';

function clean(value, max=200){return String(value??'').trim().slice(0,max)}
function normalise(value){return clean(value,120).replace(/^['\"]|['\"]$/g,'').trim()}
function unitKey(x){return normalise(x.serialNumber)||normalise(x.imei1)||normalise(x.imei2)||normalise(x.barcode)||normalise(x.qrCode)}
async function serializedConflict(client,values){for(const value of values.filter(Boolean)){const hit=(await client.query('SELECT id FROM serialized_units WHERE serial_number=$1 OR imei1=$1 OR imei2=$1 OR barcode=$1 OR qr_code=$1 LIMIT 1',[value])).rows[0];if(hit)return hit}return null}
function parseDelimited(text){
  const rows=String(text||'').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  if(!rows.length)return [];
  const split=(line)=>line.split(/[;,\t]/).map(normalise);
  const first=split(rows[0]).map(x=>x.toLowerCase());
  const known=new Set(['serial','serialnumber','serial_number','imei','imei1','imei2','barcode','qr','qrcode','qr_code']);
  const hasHeader=first.some(x=>known.has(x));
  const data=hasHeader?rows.slice(1):rows;
  const headers=hasHeader?first:['serial'];
  return data.map(line=>{const parts=split(line);const out={};headers.forEach((h,i)=>{const v=parts[i]||'';if(['serial','serialnumber','serial_number'].includes(h))out.serialNumber=v;else if(h==='imei'||h==='imei1')out.imei1=v;else if(h==='imei2')out.imei2=v;else if(h==='barcode')out.barcode=v;else if(['qr','qrcode','qr_code'].includes(h))out.qrCode=v;});return out}).filter(unitKey);
}

export function registerSerializedInventory({app,auth,need,q,pool,audit}){
  app.get('/api/inventory/batches',auth,need('inventory.serialized'),async(req,res,next)=>{try{
    const limit=Math.min(Math.max(Number(req.query.limit)||100,1),500);
    const params=[];const w=[];
    if(req.query.variantId){params.push(req.query.variantId);w.push(`b.variant_id=$${params.length}`)}
    if(req.query.locationId){params.push(req.query.locationId);w.push(`b.location_id=$${params.length}`)}
    const rows=await q(`SELECT b.*,v.sku,v.variant_name,p.name product_name,l.name location_name,COUNT(su.id)::int unit_count,COUNT(su.id) FILTER(WHERE su.status='In Stock')::int available_units FROM inventory_batches b JOIN product_variants v ON v.id=b.variant_id JOIN products p ON p.id=v.product_id JOIN inventory_locations l ON l.id=b.location_id LEFT JOIN serialized_units su ON su.batch_id=b.id ${w.length?'WHERE '+w.join(' AND '):''} GROUP BY b.id,v.sku,v.variant_name,p.name,l.name ORDER BY b.received_at DESC LIMIT ${limit}`,params);
    res.json(rows);
  }catch(e){next(e)}});

  app.get('/api/inventory/serialized/:id',auth,need('inventory.serialized'),async(req,res,next)=>{try{
    const u=(await q(`SELECT su.*,v.sku,v.variant_name,p.name product_name,l.name location_name,b.batch_number FROM serialized_units su JOIN product_variants v ON v.id=su.variant_id JOIN products p ON p.id=v.product_id LEFT JOIN inventory_locations l ON l.id=su.location_id LEFT JOIN inventory_batches b ON b.id=su.batch_id WHERE su.id=$1`,[req.params.id]))[0];
    if(!u)return res.status(404).json({error:'Inventory unit not found'});res.json(u);
  }catch(e){next(e)}});

  app.post('/api/inventory/serialized',auth,need('inventory.serialized'),async(req,res)=>{
    const b=req.body||{}; if(!b.variantId||!b.locationId)return res.status(400).json({error:'Product and warehouse are required'});
    const client=await pool.connect();
    try{
      await client.query('BEGIN');
      const variant=(await client.query('SELECT * FROM product_variants WHERE id=$1 FOR SHARE',[b.variantId])).rows[0];
      if(!variant)throw new Error('Product variant not found');
      if(!variant.serialized)throw new Error('This product is set to quantity tracking. Change it to individual-unit tracking before adding serial or IMEI records.');
      const loc=(await client.query("SELECT * FROM inventory_locations WHERE id=$1 AND status='Active'",[b.locationId])).rows[0];
      if(!loc)throw new Error('Warehouse not found or inactive');
      let entries=Array.isArray(b.entries)?b.entries:[];
      if(!entries.length&&b.rawText)entries=parseDelimited(b.rawText);
      if(!entries.length)return res.status(400).json({error:'Add at least one serial number or IMEI'});
      if(entries.length>2000)throw new Error('A single upload can contain at most 2,000 units. Split larger deliveries into batches.');
      const batchNumber=clean(b.batchNumber,100)||`BATCH-${new Date().toISOString().slice(0,10).replaceAll('-','')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      const supplierName=clean(b.supplierName,160),supplierReference=clean(b.supplierReference,160),notes=clean(b.notes,500);
      const existingBatch=(await client.query('SELECT id FROM inventory_batches WHERE batch_number=$1',[batchNumber])).rows[0];
      if(existingBatch)throw new Error('That batch number already exists. Use a new batch number.');
      const seen=new Set();
      const prepared=[];
      for(const raw of entries){
        const x={serialNumber:normalise(raw.serialNumber),imei1:normalise(raw.imei1),imei2:normalise(raw.imei2),barcode:normalise(raw.barcode),qrCode:normalise(raw.qrCode)};
        const key=unitKey(x); if(!key)throw new Error('Every unit needs a serial number, IMEI, barcode or QR value.');
        const compound=[x.serialNumber,x.imei1,x.imei2,x.barcode,x.qrCode].filter(Boolean).map(v=>v.toLowerCase());
        if(compound.some(v=>seen.has(v)))throw new Error(`Duplicate unit identifier in this upload: ${key}`); compound.forEach(v=>seen.add(v));
        const ids=[x.serialNumber,x.imei1,x.imei2,x.barcode,x.qrCode].filter(Boolean).map(v=>v.toLowerCase());
        if(new Set(ids).size!==ids.length)throw new Error(`The same identifier cannot be used twice for ${key}.`);
        const dup=await serializedConflict(client,[x.serialNumber,x.imei1,x.imei2,x.barcode,x.qrCode]);
        if(dup)throw new Error(`A unit with identifier ${key} is already registered.`);
        prepared.push(x);
      }
      const batch=(await client.query(`INSERT INTO inventory_batches(batch_number,variant_id,location_id,supplier_name,supplier_reference,quantity_received,notes,created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,[batchNumber,variant.id,b.locationId,supplierName,supplierReference,prepared.length,notes,req.user.id])).rows[0];
      for(const x of prepared)await client.query(`INSERT INTO serialized_units(variant_id,location_id,batch_id,serial_number,imei1,imei2,barcode,qr_code,status,unit_cost,supplier_name,supplier_reference,notes,received_by,received_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,'In Stock',$9,$10,$11,$12,$13,now())`,[variant.id,b.locationId,batch.id,x.serialNumber||null,x.imei1||null,x.imei2||null,x.barcode||null,x.qrCode||null,Number(b.unitCost??variant.cost_price),supplierName,supplierReference,notes,req.user.id]);
      const bal=(await client.query('SELECT * FROM inventory_balances WHERE variant_id=$1 AND location_id=$2 FOR UPDATE',[variant.id,b.locationId])).rows[0];
      const before=bal?Number(bal.on_hand):0; const after=before+prepared.length;
      if(bal)await client.query('UPDATE inventory_balances SET on_hand=$1,updated_at=now() WHERE id=$2',[after,bal.id]); else await client.query('INSERT INTO inventory_balances(variant_id,location_id,on_hand,reserved) VALUES($1,$2,$3,0)',[variant.id,b.locationId,prepared.length]);
      const movement=(await client.query(`INSERT INTO inventory_movements(variant_id,location_id,movement_type,quantity,unit_cost,before_qty,after_qty,reference_type,reference_id,reason,actor_id) VALUES($1,$2,'RECEIPT',$3,$4,$5,$6,'SerializedBatch',$7,$8,$9) RETURNING id`,[variant.id,b.locationId,prepared.length,Number(b.unitCost??variant.cost_price),before,after,'Batch',batch.id,`Received ${prepared.length} serialized unit(s) in batch ${batchNumber}`,req.user.id])).rows[0];
      await client.query('COMMIT');
      const result={batch,added:prepared.length,beforeQty:before,afterQty:after,movementId:movement.id};
      await audit(req.user,'SERIALIZED_UNITS_ADDED','InventoryBatch',batch.id,`Added ${prepared.length} serialized unit(s) in batch ${batchNumber}`,null,result,req.req);
      res.status(201).json(result);
    }catch(e){await client.query('ROLLBACK');if(e.code==='23505')return res.status(409).json({error:'A serial number, IMEI, barcode or QR value is already registered.'});res.status(400).json({error:e.message});}finally{client.release()}
  });

  app.patch('/api/inventory/serialized/:id/status',auth,need('inventory.serialized'),async(req,res)=>{
    const allowed=['In Stock','Reserved','Sold','Transferred','Damaged','Lost','Returned','Service','Voided']; const next=clean(req.body?.status,40);
    if(!allowed.includes(next))return res.status(400).json({error:'Invalid unit status'});
    if(next==='Voided')return res.status(409).json({error:'Voided units are reserved for receiving reversals and cannot be set manually.'});
    const client=await pool.connect();
    try{
      await client.query('BEGIN');
      await client.query(`SELECT set_config('app.actor_id',$1,true)`,[req.user.id]);
      const old=(await client.query('SELECT * FROM serialized_units WHERE id=$1 FOR UPDATE',[req.params.id])).rows[0];
      if(!old)throw Object.assign(new Error('Inventory unit not found'),{statusCode:404});
      const manualTransitions={
        'In Stock':['Damaged','Lost','Service'],
        'Returned':['In Stock','Service','Damaged'],
        'Service':['In Stock','Damaged','Lost'],
        'Damaged':['Service','In Stock'],
        'Lost':['In Stock','Service','Damaged']
      };
      if(!manualTransitions[old.status]?.includes(next))throw new Error('This status is controlled by the related order, sale, transfer, return or receiving workflow.');
      const reason=clean(req.body?.reason,300)||`Changed physical unit status to ${next}`;
      const u=await transitionSerializedUnit(client,{unitId:req.params.id,toStatus:next,actorId:req.user.id,reason,sourceType:'ManualStatusChange',sourceId:req.params.id});
      await client.query('COMMIT');
      await audit(req.user,'SERIALIZED_UNIT_STATUS_CHANGED','SerializedUnit',u.id,reason,old,u,req.req);
      res.json(u);
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(e.statusCode||400).json({error:e.message});}finally{client.release()}
  });
}
