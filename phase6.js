export function registerPhase6({app,auth,need,q,pool,audit,changeStock}){
  const text=v=>String(v??'').trim();
  const money=v=>{const n=Number(v);return Number.isFinite(n)?Math.round(n*100)/100:0};
  const saleNo=()=>`SAL-${new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14)}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const round2=n=>Math.round(Number(n)*100)/100;
  const validPaymentMethods=['Cash','Mobile Money','Card','Bank Transfer','Online Payment'];

  async function saleById(id){
    const s=(await q(`SELECT s.*,c.customer_no,c.name customer_name,c.phone customer_phone,c.email customer_email,l.name location_name,u.email cashier_email
      FROM sales s LEFT JOIN customers c ON c.id=s.customer_id JOIN inventory_locations l ON l.id=s.location_id JOIN users u ON u.id=s.cashier_id WHERE s.id=$1`,[id]))[0];
    if(!s)return null;
    s.lines=await q(`SELECT sl.*,v.sku,v.variant_name,v.serialized,p.name product_name,b.name brand_name,
      COALESCE((SELECT json_agg(json_build_object('id',su.id,'serialNumber',su.serial_number,'imei1',su.imei1,'imei2',su.imei2)) FROM sale_serial_units ss JOIN serialized_units su ON su.id=ss.serialized_unit_id WHERE ss.sale_line_id=sl.id),'[]'::json) serial_units
      FROM sale_lines sl JOIN product_variants v ON v.id=sl.variant_id JOIN products p ON p.id=v.product_id LEFT JOIN brands b ON b.id=p.brand_id WHERE sl.sale_id=$1 ORDER BY sl.created_at`,[id]);
    s.payments=await q(`SELECT id,method,amount,reference,received_at FROM sale_payments WHERE sale_id=$1 ORDER BY received_at,id`,[id]);
    s.history=await q(`SELECT h.*,u.email actor_email FROM sale_status_history h LEFT JOIN users u ON u.id=h.actor_id WHERE h.sale_id=$1 ORDER BY h.created_at`,[id]);
    return s;
  }

  app.get('/api/sales/summary',auth,need('sales.view'),async(req,res)=>{
    const [today,month,open,units,payments]=await Promise.all([
      q("SELECT COALESCE(SUM(grand_total),0)::numeric total,COUNT(*)::int count FROM sales WHERE status='Completed' AND created_at>=current_date"),
      q("SELECT COALESCE(SUM(grand_total),0)::numeric total,COUNT(*)::int count FROM sales WHERE status='Completed' AND created_at>=date_trunc('month',current_date)"),
      q("SELECT COUNT(*)::int count FROM sales WHERE status='Draft'"),
      q("SELECT COALESCE(SUM(sl.quantity),0)::numeric units FROM sale_lines sl JOIN sales s ON s.id=sl.sale_id WHERE s.status='Completed' AND s.created_at>=current_date"),
      q("SELECT method,COALESCE(SUM(amount),0)::numeric amount FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.status='Completed' AND s.created_at>=current_date GROUP BY method ORDER BY method")
    ]);
    res.json({today:today[0],month:month[0],openDrafts:open[0].count,unitsToday:units[0].units,payments});
  });

  app.get('/api/sales/products',auth,need('sales.view'),async(req,res)=>{
    const qtext=text(req.query.q); const params=[]; let where="v.status='Active' AND p.status='Active'";
    if(qtext){params.push(`%${qtext}%`);where+=` AND (p.name ILIKE $${params.length} OR v.sku ILIKE $${params.length} OR v.barcode ILIKE $${params.length} OR COALESCE(v.variant_name,'') ILIKE $${params.length})`}
    const locationId=text(req.query.locationId);
    let stockJoin='LEFT JOIN inventory_balances ib ON ib.variant_id=v.id';
    if(locationId){params.push(locationId);const lp=params.length;where+=` AND (ib.location_id=$${lp} OR ib.location_id IS NULL)`;stockJoin=`LEFT JOIN inventory_balances ib ON ib.variant_id=v.id AND ib.location_id=$${lp}`;}
    const limit=Math.min(Math.max(Number(req.query.limit)||50,1),100);params.push(limit);const lim=params.length;
    res.json(await q(`SELECT v.id variant_id,v.sku,v.barcode,v.variant_name,v.serialized,v.selling_price,v.tax_rate,v.track_inventory,p.id product_id,p.name product_name,b.name brand_name,COALESCE(ib.on_hand,0)::numeric on_hand,COALESCE(ib.reserved,0)::numeric reserved,(COALESCE(ib.on_hand,0)-COALESCE(ib.reserved,0))::numeric available
      FROM product_variants v JOIN products p ON p.id=v.product_id LEFT JOIN brands b ON b.id=p.brand_id ${stockJoin} WHERE ${where} ORDER BY p.name,v.variant_name,v.sku LIMIT $${lim}`,params));
  });

  app.get('/api/sales/product/:variantId',auth,need('sales.view'),async(req,res)=>{
    if(!req.query.locationId)return res.status(400).json({error:'Location is required'});
    const v=(await q(`SELECT v.id variant_id,v.sku,v.barcode,v.variant_name,v.serialized,v.track_inventory,v.selling_price,v.tax_rate,p.id product_id,p.name product_name,b.name brand_name,COALESCE(ib.on_hand,0)::numeric on_hand,COALESCE(ib.reserved,0)::numeric reserved,(COALESCE(ib.on_hand,0)-COALESCE(ib.reserved,0))::numeric available FROM product_variants v JOIN products p ON p.id=v.product_id LEFT JOIN brands b ON b.id=p.brand_id LEFT JOIN inventory_balances ib ON ib.variant_id=v.id AND ib.location_id=$2 WHERE v.id=$1 AND v.status='Active' AND p.status='Active'`,[req.params.variantId,req.query.locationId]))[0];
    if(!v)return res.status(404).json({error:'Product variant not found'});res.json(v);
  });

  app.get('/api/sales/serials/:variantId',auth,need('sales.view'),async(req,res)=>{
    if(!req.query.locationId)return res.status(400).json({error:'Location is required'});
    res.json(await q(`SELECT id,serial_number,imei1,imei2,status FROM serialized_units WHERE variant_id=$1 AND location_id=$2 AND status='In Stock' ORDER BY created_at LIMIT 100`,[req.params.variantId,req.query.locationId]));
  });

  app.get('/api/sales',auth,need('sales.view'),async(req,res)=>{
    const limit=Math.min(Math.max(Number(req.query.limit)||100,1),300); const params=[]; const where=[]; const t=text(req.query.q);
    if(t){params.push(`%${t}%`);where.push(`(s.sale_no ILIKE $${params.length} OR COALESCE(c.name,'') ILIKE $${params.length} OR COALESCE(c.phone,'') ILIKE $${params.length})`)}
    if(req.query.status){params.push(req.query.status);where.push(`s.status=$${params.length}`)}
    if(req.query.locationId){params.push(req.query.locationId);where.push(`s.location_id=$${params.length}`)}
    params.push(limit);
    res.json(await q(`SELECT s.id,s.sale_no,s.status,s.subtotal,s.discount_amount,s.tax_amount,s.grand_total,s.created_at,s.completed_at,c.name customer_name,c.phone customer_phone,l.name location_name,u.email cashier_email,COUNT(sl.id)::int line_count,COALESCE(SUM(sl.quantity),0)::numeric units
      FROM sales s LEFT JOIN customers c ON c.id=s.customer_id JOIN inventory_locations l ON l.id=s.location_id JOIN users u ON u.id=s.cashier_id LEFT JOIN sale_lines sl ON sl.sale_id=s.id ${where.length?'WHERE '+where.join(' AND '):''} GROUP BY s.id,c.name,c.phone,l.name,u.email ORDER BY s.created_at DESC LIMIT $${params.length}` ,params));
  });

  app.get('/api/sales/:id',auth,need('sales.view'),async(req,res)=>{const s=await saleById(req.params.id);if(!s)return res.status(404).json({error:'Sale not found'});res.json(s)});

  app.post('/api/sales',auth,need('sales.create'),async(req,res)=>{
    const b=req.body||{}; const lines=Array.isArray(b.lines)?b.lines:[]; if(!b.locationId)return res.status(400).json({error:'Selling location is required'}); if(!lines.length)return res.status(400).json({error:'At least one product is required'});
    const client=await pool.connect();
    try{
      await client.query('BEGIN');
      const loc=(await client.query("SELECT id,name,status FROM inventory_locations WHERE id=$1 FOR SHARE",[b.locationId])).rows[0]; if(!loc||loc.status!=='Active')throw new Error('Selling location is not active');
      if(b.customerId){const c=(await client.query('SELECT id,status FROM customers WHERE id=$1 FOR SHARE',[b.customerId])).rows[0];if(!c)throw new Error('Customer not found');if(c.status==='Anonymized')throw new Error('Anonymized customers cannot be used for new sales')}
      let subtotal=0,discountTotal=0,taxTotal=0; const prepared=[];
      for(const raw of lines){
        const variantId=text(raw.variantId); const qty=Number(raw.quantity); if(!variantId||!(qty>0))throw new Error('Every sale line requires a valid product and positive quantity');
        const v=(await client.query(`SELECT v.*,p.name product_name FROM product_variants v JOIN products p ON p.id=v.product_id WHERE v.id=$1 AND v.status='Active' FOR SHARE`,[variantId])).rows[0]; if(!v)throw new Error('Product variant not found or inactive');
        const price=raw.unitPrice===undefined?money(v.selling_price):money(raw.unitPrice); if(price<0)throw new Error('Unit price cannot be negative');
        const lineDiscount=Math.min(Math.max(money(raw.discountAmount||0),0),round2(price*qty));
        const taxable=Math.max(0,round2(price*qty-lineDiscount)); const taxRate=raw.taxRate===undefined?money(v.tax_rate):Math.max(0,money(raw.taxRate)); const tax=round2(taxable*taxRate/100); const lineTotal=round2(taxable+tax);
        if(v.track_inventory){const bal=(await client.query('SELECT * FROM inventory_balances WHERE variant_id=$1 AND location_id=$2 FOR UPDATE',[variantId,b.locationId])).rows[0];const available=bal?Number(bal.on_hand)-Number(bal.reserved):0;if(available+1e-9<qty)throw new Error(`Insufficient available stock for ${v.product_name} (${v.sku})`)}
        let serials=Array.isArray(raw.serials)?raw.serials.map(text).filter(Boolean):[];
        if(v.serialized){if(qty!==1||serials.length!==1)throw new Error(`${v.product_name} is serialized; sell exactly one unit and select one serial/IMEI`);const su=(await client.query(`SELECT id FROM serialized_units WHERE id=$1 AND variant_id=$2 AND location_id=$3 AND status='In Stock' FOR UPDATE`,[serials[0],variantId,b.locationId])).rows[0];if(!su)throw new Error('Selected serial/IMEI is not available at this location')}
        prepared.push({v,qty,price,lineDiscount,taxRate,tax,lineTotal,serials}); subtotal=round2(subtotal+price*qty);discountTotal=round2(discountTotal+lineDiscount);taxTotal=round2(taxTotal+tax);
      }
      const grandTotal=round2(subtotal-discountTotal+taxTotal); const payments=Array.isArray(b.payments)?b.payments:[];if(!payments.length)throw new Error('At least one payment is required');let paid=0;for(const p of payments){if(!validPaymentMethods.includes(p.method))throw new Error('Invalid payment method');const amount=money(p.amount);if(amount<=0)throw new Error('Payment amounts must be positive');paid=round2(paid+amount)}if(Math.abs(paid-grandTotal)>0.009)throw new Error(`Payment total ${paid.toFixed(2)} must equal sale total ${grandTotal.toFixed(2)}`);
      const idem=text(req.get('Idempotency-Key')||b.idempotencyKey); if(idem){const existing=(await client.query('SELECT id FROM sales WHERE idempotency_key=$1',[idem])).rows[0];if(existing){await client.query('ROLLBACK');return res.json(await saleById(existing.id))}} const sale=(await client.query(`INSERT INTO sales(sale_no,idempotency_key,customer_id,location_id,status,subtotal,discount_amount,tax_amount,grand_total,currency,cashier_id,notes) VALUES($1,$2,$3,$4,'Completed',$5,$6,$7,$8,$9,$10,$11) RETURNING *`,[saleNo(),idem||null,b.customerId||null,b.locationId,subtotal,discountTotal,taxTotal,grandTotal,text(b.currency)||'UGX',req.user.id,text(b.notes)])).rows[0];
      for(const x of prepared){
        const line=(await client.query(`INSERT INTO sale_lines(sale_id,variant_id,quantity,unit_price,discount_amount,tax_rate,tax_amount,line_total,cost_price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,[sale.id,x.v.id,x.qty,x.price,x.lineDiscount,x.taxRate,x.tax,x.lineTotal,money(x.v.cost_price)])).rows[0];
        if(x.v.track_inventory)await changeStock(client,{variantId:x.v.id,locationId:b.locationId,delta:-x.qty,type:'SALE',actorId:req.user.id,referenceType:'Sale',referenceId:sale.id,reason:`Sale ${sale.sale_no}`,unitCost:money(x.v.cost_price)});
        if(x.v.serialized){await client.query(`UPDATE serialized_units SET status='Sold',location_id=NULL,sold_at=now(),updated_at=now() WHERE id=$1`,[x.serials[0]]);await client.query('INSERT INTO sale_serial_units(sale_line_id,serialized_unit_id) VALUES($1,$2)',[line.id,x.serials[0]])}
      }
      for(const p of payments)await client.query('INSERT INTO sale_payments(sale_id,method,amount,reference,received_by) VALUES($1,$2,$3,$4,$5)',[sale.id,p.method,money(p.amount),text(p.reference),req.user.id]);
      await client.query('INSERT INTO sale_status_history(sale_id,status,actor_id,notes) VALUES($1,\'Completed\',$2,$3)',[sale.id,req.user.id,'Sale completed']);
      await client.query('COMMIT');await audit(req.user,'SALE_COMPLETED','Sale',sale.id,`Completed sale ${sale.sale_no}`,null,sale,req.req);res.status(201).json(await saleById(sale.id));
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/sales/:id/void',auth,need('sales.void'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const s=(await client.query("SELECT * FROM sales WHERE id=$1 AND status='Completed' FOR UPDATE",[req.params.id])).rows[0];if(!s)throw new Error('Only completed sales can be voided');
      const lines=(await client.query('SELECT sl.*,v.cost_price,v.serialized,v.track_inventory FROM sale_lines sl JOIN product_variants v ON v.id=sl.variant_id WHERE sl.sale_id=$1 FOR UPDATE',[s.id])).rows;
      for(const l of lines){if(l.track_inventory)await changeStock(client,{variantId:l.variant_id,locationId:s.location_id,delta:Number(l.quantity),type:'SALE_VOID',actorId:req.user.id,referenceType:'Sale',referenceId:s.id,reason:`Voided sale ${s.sale_no}`,unitCost:Number(l.cost_price||0)});if(l.serialized)await client.query(`UPDATE serialized_units su SET status='In Stock',location_id=$1,sold_at=NULL,updated_at=now() FROM sale_serial_units ss WHERE ss.serialized_unit_id=su.id AND ss.sale_line_id=$2`,[s.location_id,l.id])}
      const updated=(await client.query("UPDATE sales SET status='Voided',voided_at=now(),voided_by=$1,void_reason=$2,updated_at=now() WHERE id=$3 RETURNING *",[req.user.id,text(req.body?.reason)||'Voided by administrator',s.id])).rows[0];await client.query('INSERT INTO sale_status_history(sale_id,status,actor_id,notes) VALUES($1,\'Voided\',$2,$3)',[s.id,req.user.id,updated.void_reason]);await client.query('COMMIT');await audit(req.user,'SALE_VOIDED','Sale',s.id,`Voided sale ${s.sale_no}`,s,updated,req.req);res.json(await saleById(s.id));
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.get('/api/sales/:id/receipt',auth,need('sales.view'),async(req,res)=>{const s=await saleById(req.params.id);if(!s)return res.status(404).json({error:'Sale not found'});res.json({sale:s,receiptNo:s.sale_no,issuedAt:s.completed_at||s.created_at})});
  app.get('/api/sales/export',auth,need('sales.export'),async(req,res)=>{const rows=await q(`SELECT s.sale_no,s.status,s.created_at,c.customer_no,c.name customer_name,l.name location_name,s.subtotal,s.discount_amount,s.tax_amount,s.grand_total,s.currency,u.email cashier FROM sales s LEFT JOIN customers c ON c.id=s.customer_id JOIN inventory_locations l ON l.id=s.location_id JOIN users u ON u.id=s.cashier_id ORDER BY s.created_at DESC LIMIT 10000`);const esc=v=>{const x=String(v??'');return /[",\n]/.test(x)?`"${x.replace(/"/g,'""')}"`:x};res.setHeader('Content-Type','text/csv; charset=utf-8');res.setHeader('Content-Disposition','attachment; filename=amaal-sales-export.csv');res.send(['sale_no,status,created_at,customer_no,customer_name,location,subtotal,discount,tax,total,currency,cashier',...rows.map(r=>[r.sale_no,r.status,r.created_at,r.customer_no,r.customer_name,r.location_name,r.subtotal,r.discount_amount,r.tax_amount,r.grand_total,r.currency,r.cashier].map(esc).join(','))].join('\n'))});
}
