import crypto from 'crypto';
export function registerSalesPos({app,auth,need,q,pool,audit,changeStock}){
  const text=v=>String(v??'').trim();
  const money=v=>{const n=Number(v);return Number.isFinite(n)?Math.round(n*100)/100:0};
  const saleNo=()=>`SAL-${new Date().toISOString().replace(/[-:TZ.]/g,'').slice(0,14)}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;
  const round2=n=>Math.round(Number(n)*100)/100;
  const validPaymentMethods=['Cash','Mobile Money','Card','Bank Transfer','Online Payment'];
  const dateRange=req=>{const iso=v=>/^\d{4}-\d{2}-\d{2}$/.test(String(v||''))?String(v):null;let start=iso(req.query.start)||new Date(Date.now()-29*86400000).toISOString().slice(0,10),end=iso(req.query.end)||new Date().toISOString().slice(0,10);if(start>end)[start,end]=[end,start];return {start,end};};

  async function saleById(id){
    const s=(await q(`SELECT s.*,c.customer_no,c.name customer_name,c.phone customer_phone,c.email customer_email,l.name location_name,u.email cashier_email
      FROM sales s LEFT JOIN customers c ON c.id=s.customer_id JOIN inventory_locations l ON l.id=s.location_id JOIN users u ON u.id=s.cashier_id WHERE s.id=$1`,[id]))[0];
    if(!s)return null;
    s.lines=await q(`SELECT sl.*,v.sku,v.variant_name,v.serialized,p.name product_name,b.name brand_name,
      COALESCE((SELECT json_agg(json_build_object('id',su.id,'serialNumber',su.serial_number,'imei1',su.imei1,'imei2',su.imei2)) FROM sale_serial_units ss JOIN serialized_units su ON su.id=ss.serialized_unit_id WHERE ss.sale_line_id=sl.id),'[]'::json) serial_units
      FROM sale_lines sl JOIN product_variants v ON v.id=sl.variant_id JOIN products p ON p.id=v.product_id LEFT JOIN brands b ON b.id=p.brand_id WHERE sl.sale_id=$1 ORDER BY sl.created_at`,[id]);
    s.payments=await q(`SELECT id,method,amount,reference,received_at FROM sale_payments WHERE sale_id=$1 ORDER BY received_at,id`,[id]);
    s.history=await q(`SELECT h.*,u.email actor_email FROM sale_status_history h LEFT JOIN users u ON u.id=h.actor_id WHERE h.sale_id=$1 ORDER BY h.created_at`,[id]);
    s.receipt=(await q('SELECT * FROM sale_receipts WHERE sale_id=$1',[id]))[0]||null;
    s.approvals=await q('SELECT a.*,u.email requested_by_email,au.email approved_by_email FROM sales_approvals a LEFT JOIN users u ON u.id=a.requested_by LEFT JOIN users au ON au.id=a.approved_by WHERE a.sale_id=$1 ORDER BY a.requested_at DESC',[id]);
    return s;
  }

  app.get('/api/sales/summary',auth,need('sales.view'),async(req,res)=>{
    const {start,end}=dateRange(req);const [today,month,open,units,payments]=await Promise.all([
      q("SELECT COALESCE(SUM(grand_total),0)::numeric total,COUNT(*)::int count FROM sales WHERE status IN ('Completed','Paid','Partially Paid') AND created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COALESCE(SUM(grand_total),0)::numeric total,COUNT(*)::int count FROM sales WHERE status IN ('Completed','Paid','Partially Paid') AND created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COUNT(*)::int count FROM sales WHERE status='Draft' AND created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COALESCE(SUM(sl.quantity),0)::numeric units FROM sale_lines sl JOIN sales s ON s.id=sl.sale_id WHERE s.status IN ('Completed','Paid','Partially Paid') AND s.created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT method,COALESCE(SUM(amount),0)::numeric amount FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.status IN ('Completed','Paid','Partially Paid') AND s.created_at::date BETWEEN $1 AND $2 GROUP BY method ORDER BY method",[start,end])
    ]);
    res.json({today:today[0],month:month[0],openDrafts:open[0].count,unitsToday:units[0].units,payments,range:{start,end}});
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
    const limit=Math.min(Math.max(Number(req.query.limit)||100,1),300); const {start,end}=dateRange(req); const params=[start,end]; const where=["s.created_at::date BETWEEN $1 AND $2"]; const t=text(req.query.q);
    if(t){params.push(`%${t}%`);where.push(`(s.sale_no ILIKE $${params.length} OR COALESCE(c.name,'') ILIKE $${params.length} OR COALESCE(c.phone,'') ILIKE $${params.length})`)}
    if(req.query.status){params.push(req.query.status);where.push(`s.status=$${params.length}`)}
    if(req.query.locationId){params.push(req.query.locationId);where.push(`s.location_id=$${params.length}`)}
    params.push(limit);
    res.json(await q(`SELECT s.id,s.sale_no,s.status,s.subtotal,s.discount_amount,s.tax_amount,s.grand_total,s.created_at,s.completed_at,c.name customer_name,c.phone customer_phone,l.name location_name,u.email cashier_email,COUNT(sl.id)::int line_count,COALESCE(SUM(sl.quantity),0)::numeric units
      FROM sales s LEFT JOIN customers c ON c.id=s.customer_id JOIN inventory_locations l ON l.id=s.location_id JOIN users u ON u.id=s.cashier_id LEFT JOIN sale_lines sl ON sl.sale_id=s.id ${where.length?'WHERE '+where.join(' AND '):''} GROUP BY s.id,c.name,c.phone,l.name,u.email ORDER BY s.created_at DESC LIMIT $${params.length}` ,params));
  });


  app.post('/api/sales',auth,need('sales.create'),async(req,res)=>{
    const b=req.body||{}; const lines=Array.isArray(b.lines)?b.lines:[]; if(!b.locationId)return res.status(400).json({error:'Selling location is required'}); if(!lines.length)return res.status(400).json({error:'At least one product is required'});
    const client=await pool.connect();
    try{
      await client.query('BEGIN');
      const loc=(await client.query("SELECT id,name,status FROM inventory_locations WHERE id=$1 FOR SHARE",[b.locationId])).rows[0]; if(!loc||loc.status!=='Active')throw new Error('Selling location is not active');
      if(b.customerId){const c=(await client.query('SELECT id,status FROM customers WHERE id=$1 FOR SHARE',[b.customerId])).rows[0];if(!c)throw new Error('Customer not found');if(c.status==='Anonymized')throw new Error('Anonymized customers cannot be used for new sales')}
      let subtotal=0,discountTotal=0,taxTotal=0; const prepared=[];
      const controls=(await client.query('SELECT * FROM sales_controls WHERE id=$1 FOR SHARE',['00000000-0000-0000-0000-000000000001'])).rows[0]||{max_discount_percent:5,max_price_override_percent:0,require_discount_approval:true,require_price_override_approval:true};
      const approvalIds=Array.isArray(b.approvalIds)?b.approvalIds.map(text).filter(Boolean):[]; const couponCode=text(b.couponCode).toUpperCase(); let coupon=null; if(couponCode){ coupon=(await client.query('SELECT c.* FROM coupons c JOIN promotions p ON p.id=c.promotion_id WHERE c.code=$1 FOR UPDATE',[couponCode])).rows[0]; if(!coupon)throw new Error('Coupon code is invalid'); if(coupon.status!=='Active')throw new Error('Coupon is not active'); if(coupon.starts_at&&new Date(coupon.starts_at)>new Date())throw new Error('Coupon is not active yet'); if(coupon.ends_at&&new Date(coupon.ends_at)<=new Date())throw new Error('Coupon has expired'); const used=Number((await client.query('SELECT count(*)::int c FROM coupon_redemptions WHERE coupon_id=$1',[coupon.id])).rows[0].c); if(coupon.max_redemptions!=null&&used>=Number(coupon.max_redemptions))throw new Error('Coupon redemption limit has been reached'); if(b.customerId&&coupon.per_customer_limit!=null){const cu=Number((await client.query('SELECT count(*)::int c FROM coupon_redemptions WHERE coupon_id=$1 AND customer_id=$2',[coupon.id,b.customerId])).rows[0].c);if(cu>=Number(coupon.per_customer_limit))throw new Error('Customer coupon redemption limit has been reached');}}
      for(const raw of lines){
        const variantId=text(raw.variantId); const qty=Number(raw.quantity); if(!variantId||!(qty>0))throw new Error('Every sale line requires a valid product and positive quantity');
        const v=(await client.query(`SELECT v.*,p.name product_name FROM product_variants v JOIN products p ON p.id=v.product_id WHERE v.id=$1 AND v.status='Active' FOR SHARE`,[variantId])).rows[0]; if(!v)throw new Error('Product variant not found or inactive');
        const customerType=b.customerId?((await client.query('SELECT customer_type FROM customers WHERE id=$1',[b.customerId])).rows[0]?.customer_type||'Retail'):'Retail'; const effective=(await client.query('SELECT * FROM amaal_effective_variant_price_qty($1,$2,$3,$4)',[v.id,customerType,qty,text(b.couponCode)||null])).rows[0]; const basePrice=money(effective?.final_price??v.selling_price); const price=raw.unitPrice===undefined?basePrice:money(raw.unitPrice); if(price<0)throw new Error('Unit price cannot be negative');
        const overridePct=basePrice>0?Math.max(0,(basePrice-price)/basePrice*100):0;
        if(raw.unitPrice!==undefined && Math.abs(price-basePrice)>0.009 && controls.require_price_override_approval && overridePct>Number(controls.max_price_override_percent)){const ok=approvalIds.length&& (await client.query(`SELECT 1 FROM sales_approvals WHERE id=ANY($1::uuid[]) AND approval_type='Price Override' AND status='Approved'`,[approvalIds])).rows[0];if(!ok)throw new Error('Price override approval is required for this sale line');}
        const lineDiscount=Math.min(Math.max(money(raw.discountAmount||0),0),round2(price*qty));
        const discountPct=price*qty>0?lineDiscount/(price*qty)*100:0;
        if(controls.require_discount_approval && discountPct>Number(controls.max_discount_percent)){const ok=approvalIds.length&&(await client.query(`SELECT 1 FROM sales_approvals WHERE id=ANY($1::uuid[]) AND approval_type='Discount' AND status='Approved'`,[approvalIds])).rows[0];if(!ok)throw new Error('Discount approval is required for this sale line');}
        const taxable=Math.max(0,round2(price*qty-lineDiscount)); const taxRate=raw.taxRate===undefined?money(v.tax_rate):Math.max(0,money(raw.taxRate)); const tax=round2(taxable*taxRate/100); const lineTotal=round2(taxable+tax);
        if(v.track_inventory){const bal=(await client.query('SELECT * FROM inventory_balances WHERE variant_id=$1 AND location_id=$2 FOR UPDATE',[variantId,b.locationId])).rows[0];const available=bal?Number(bal.on_hand)-Number(bal.reserved):0;if(available+1e-9<qty)throw new Error(`Insufficient available stock for ${v.product_name} (${v.sku})`)}
        let serials=Array.isArray(raw.serials)?raw.serials.map(text).filter(Boolean):[];
        if(v.serialized){if(qty!==1||serials.length!==1)throw new Error(`${v.product_name} is serialized; sell exactly one unit and select one serial/IMEI`);const su=(await client.query(`SELECT id FROM serialized_units WHERE id=$1 AND variant_id=$2 AND location_id=$3 AND status='In Stock' FOR UPDATE`,[serials[0],variantId,b.locationId])).rows[0];if(!su)throw new Error('Selected serial/IMEI is not available at this location')}
        prepared.push({v,qty,price,lineDiscount,taxRate,tax,lineTotal,serials,effective}); subtotal=round2(subtotal+price*qty);discountTotal=round2(discountTotal+lineDiscount);taxTotal=round2(taxTotal+tax);
      }
      const grandTotal=round2(subtotal-discountTotal+taxTotal); const payments=Array.isArray(b.payments)?b.payments:[];if(!payments.length)throw new Error('At least one payment is required');let paid=0;for(const p of payments){if(!validPaymentMethods.includes(p.method))throw new Error('Invalid payment method');const amount=money(p.amount);if(amount<=0)throw new Error('Payment amounts must be positive');paid=round2(paid+amount)}if(paid>grandTotal+0.009)throw new Error(`Payment total ${paid.toFixed(2)} cannot exceed sale total ${grandTotal.toFixed(2)}`);if(!b.allowPartial&&Math.abs(paid-grandTotal)>0.009)throw new Error(`Payment total ${paid.toFixed(2)} must equal sale total ${grandTotal.toFixed(2)}`);
      const saleStatus=Math.abs(paid-grandTotal)<0.009?'Paid':'Partially Paid';
      const idem=text(req.get('Idempotency-Key')||b.idempotencyKey); if(idem){const existing=(await client.query('SELECT id FROM sales WHERE idempotency_key=$1',[idem])).rows[0];if(existing){await client.query('ROLLBACK');return res.json(await saleById(existing.id))}} const shift=(await client.query("SELECT id FROM till_shifts WHERE cashier_id=$1 AND location_id=$2 AND status='Open' FOR SHARE",[req.user.id,b.locationId])).rows[0];
      const sale=(await client.query(`INSERT INTO sales(sale_no,idempotency_key,customer_id,promotion_id,coupon_code,location_id,status,subtotal,discount_amount,tax_amount,grand_total,currency,cashier_id,notes,till_shift_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`,[saleNo(),idem||null,b.customerId||null,prepared.find(x=>x.effective?.promotion_id)?.effective?.promotion_id||null,text(b.couponCode).toUpperCase()||null,b.locationId,saleStatus,subtotal,discountTotal,taxTotal,grandTotal,text(b.currency)||'UGX',req.user.id,text(b.notes),shift?.id||null])).rows[0];
      for(const x of prepared){
        const line=(await client.query(`INSERT INTO sale_lines(sale_id,variant_id,quantity,unit_price,discount_amount,tax_rate,tax_amount,line_total,cost_price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,[sale.id,x.v.id,x.qty,x.price,x.lineDiscount,x.taxRate,x.tax,x.lineTotal,money(x.v.cost_price)])).rows[0];
        if(x.v.track_inventory)await changeStock(client,{variantId:x.v.id,locationId:b.locationId,delta:-x.qty,type:'SALE',actorId:req.user.id,referenceType:'Sale',referenceId:sale.id,reason:`Sale ${sale.sale_no}`,unitCost:money(x.v.cost_price)});
        if(x.v.serialized){await client.query(`UPDATE serialized_units SET status='Sold',location_id=NULL,sold_at=now(),updated_at=now() WHERE id=$1`,[x.serials[0]]);await client.query('INSERT INTO sale_serial_units(sale_line_id,serialized_unit_id) VALUES($1,$2)',[line.id,x.serials[0]])}
      }
      for(const p of payments)await client.query('INSERT INTO sale_payments(sale_id,method,amount,reference,received_by) VALUES($1,$2,$3,$4,$5)',[sale.id,p.method,money(p.amount),text(p.reference),req.user.id]);
      await client.query('INSERT INTO sale_status_history(sale_id,status,actor_id,notes) VALUES($1,$2,$3,$4)',[sale.id,saleStatus,req.user.id,saleStatus==='Paid'?'Sale completed':'Sale partially paid']);
      await ensureSalesReceipt(client,sale,req.user.id);await postSalesJournal(client,sale,req.user.id); const promoId=prepared.find(x=>x.effective?.promotion_id)?.effective?.promotion_id; if(promoId) await client.query('INSERT INTO promotion_redemptions(promotion_id,customer_id,sale_id,amount) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING',[promoId,b.customerId||null,sale.id,discountTotal]); if(coupon) await client.query('INSERT INTO coupon_redemptions(coupon_id,customer_id,sale_id,amount) VALUES($1,$2,$3,$4)',[coupon.id,b.customerId||null,sale.id,discountTotal]);
      await client.query('COMMIT');await audit(req.user,'SALE_COMPLETED','Sale',sale.id,`${saleStatus==='Paid'?'Completed':'Partially paid'} sale ${sale.sale_no}`,null,sale,req.req);res.status(201).json(await saleById(sale.id));
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/sales/:id/void',auth,need('sales.void'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const s=(await client.query("SELECT * FROM sales WHERE id=$1 AND status IN ('Completed','Paid','Partially Paid') FOR UPDATE",[req.params.id])).rows[0];if(!s)throw new Error('Only operational sales can be voided');
      const lines=(await client.query('SELECT sl.*,v.cost_price,v.serialized,v.track_inventory FROM sale_lines sl JOIN product_variants v ON v.id=sl.variant_id WHERE sl.sale_id=$1 FOR UPDATE',[s.id])).rows;
      for(const l of lines){if(l.track_inventory)await changeStock(client,{variantId:l.variant_id,locationId:s.location_id,delta:Number(l.quantity),type:'SALE_VOID',actorId:req.user.id,referenceType:'Sale',referenceId:s.id,reason:`Voided sale ${s.sale_no}`,unitCost:Number(l.cost_price||0)});if(l.serialized)await client.query(`UPDATE serialized_units su SET status='In Stock',location_id=$1,sold_at=NULL,updated_at=now() FROM sale_serial_units ss WHERE ss.serialized_unit_id=su.id AND ss.sale_line_id=$2`,[s.location_id,l.id])}
      const updated=(await client.query("UPDATE sales SET status='Voided',voided_at=now(),voided_by=$1,void_reason=$2,updated_at=now() WHERE id=$3 RETURNING *",[req.user.id,text(req.body?.reason)||'Voided by administrator',s.id])).rows[0];await client.query("UPDATE sale_payments SET status='Reversed',reversed_at=now(),reversed_by=$1 WHERE sale_id=$2 AND status='Completed'",[req.user.id,s.id]);await client.query('INSERT INTO sale_status_history(sale_id,status,actor_id,notes) VALUES($1,\'Voided\',$2,$3)',[s.id,req.user.id,updated.void_reason]);await postSaleReversalJournal(client,updated,req.user.id);await client.query('COMMIT');await audit(req.user,'SALE_VOIDED','Sale',s.id,`Voided sale ${s.sale_no}`,s,updated,req.req);res.json(await saleById(s.id));
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.get('/api/sales/:id/receipt',auth,need('sales.view'),async(req,res)=>{const s=await saleById(req.params.id);if(!s)return res.status(404).json({error:'Sale not found'});res.json({sale:s,receiptNo:s.sale_no,issuedAt:s.completed_at||s.created_at})});
  app.get('/api/sales/export',auth,need('sales.export'),async(req,res)=>{const rows=await q(`SELECT s.sale_no,s.status,s.created_at,c.customer_no,c.name customer_name,l.name location_name,s.subtotal,s.discount_amount,s.tax_amount,s.grand_total,s.currency,u.email cashier FROM sales s LEFT JOIN customers c ON c.id=s.customer_id JOIN inventory_locations l ON l.id=s.location_id JOIN users u ON u.id=s.cashier_id ORDER BY s.created_at DESC LIMIT 10000`);const esc=v=>{const x=String(v??'');return /[",\n]/.test(x)?`"${x.replace(/"/g,'""')}"`:x};res.setHeader('Content-Type','text/csv; charset=utf-8');res.setHeader('Content-Disposition','attachment; filename=amaal-sales-export.csv');res.send(['sale_no,status,created_at,customer_no,customer_name,location,subtotal,discount,tax,total,currency,cashier',...rows.map(r=>[r.sale_no,r.status,r.created_at,r.customer_no,r.customer_name,r.location_name,r.subtotal,r.discount_amount,r.tax_amount,r.grand_total,r.currency,r.cashier].map(esc).join(','))].join('\n'))});

  const text2=v=>String(v??'').trim();
  const money2=v=>Math.round((Number(v)||0)*100)/100;
  const refNo=(prefix)=>`${prefix}-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  async function ensureSalesReceipt(client,sale,userId){
    const existing=(await client.query('SELECT * FROM sale_receipts WHERE sale_id=$1',[sale.id])).rows[0];
    if(existing)return existing;
    return (await client.query('INSERT INTO sale_receipts(sale_id,receipt_no,issued_by) VALUES($1,$2,$3) RETURNING *',[sale.id,`RCT-${sale.sale_no}`,userId])).rows[0];
  }
  async function financeAccount(client,code){
    const r=(await client.query('SELECT id FROM finance_accounts WHERE code=$1',[code])).rows[0];
    if(r)return r.id;
    const seed={1000:['Cash','Asset'],1010:['Mobile Money','Asset'],1020:['Bank','Asset'],1100:['Accounts Receivable','Asset'],1200:['Inventory','Asset'],2100:['Tax Payable','Liability'],4000:['Sales Revenue','Revenue'],5000:['Cost of Goods Sold','Expense'],6200:['Refunds & Returns Expense','Expense']};
    if(!seed[code])throw new Error(`Finance account ${code} is not configured`);
    return (await client.query('INSERT INTO finance_accounts(code,name,account_type,system) VALUES($1,$2,$3,true) ON CONFLICT(code) DO UPDATE SET name=EXCLUDED.name RETURNING id',[code,seed[code][0],seed[code][1]])).rows[0].id;
  }
  async function postSalesJournal(client,sale,userId){
    const exists=(await client.query("SELECT journal_id FROM finance_sync_log WHERE source_type='Sale' AND source_id=$1",[String(sale.id)])).rows[0];
    if(exists)return exists.journal_id;
    const lines=[];
    const payments=(await client.query("SELECT method,amount FROM sale_payments WHERE sale_id=$1 AND status='Completed'",[sale.id])).rows;
    const map={Cash:'1000','Mobile Money':'1010',Card:'1020','Bank Transfer':'1020','Online Payment':'1020'};
    for(const p of payments)lines.push({accountId:await financeAccount(client,map[p.method]||'1020'),debit:money2(p.amount),credit:0,description:`${p.method} receipt`});
    const netSales=money2(Number(sale.subtotal)-Number(sale.discount_amount));
    if(netSales>0)lines.push({accountId:await financeAccount(client,'4000'),debit:0,credit:netSales,description:'Sales revenue',customerId:sale.customer_id||null});
    if(Number(sale.tax_amount)>0)lines.push({accountId:await financeAccount(client,'2100'),debit:0,credit:money2(sale.tax_amount),description:'Sales tax',customerId:sale.customer_id||null});
    const paidTotal=money2(payments.reduce((a,x)=>a+Number(x.amount||0),0)); const due=money2(Number(sale.grand_total)-paidTotal); if(due>0)lines.push({accountId:await financeAccount(client,'1100'),debit:0,credit:due,description:'Accounts receivable',customerId:sale.customer_id||null});
    const cogs=Number((await client.query('SELECT COALESCE(sum(cost_price*quantity),0) v FROM sale_lines WHERE sale_id=$1',[sale.id])).rows[0].v||0);
    if(cogs>0){lines.push({accountId:await financeAccount(client,'5000'),debit:money2(cogs),credit:0,description:'Cost of goods sold'});lines.push({accountId:await financeAccount(client,'1200'),debit:0,credit:money2(cogs),description:'Inventory consumed'});}
    const debit=money2(lines.reduce((a,x)=>a+Number(x.debit||0),0)),credit=money2(lines.reduce((a,x)=>a+Number(x.credit||0),0));
    if(Math.abs(debit-credit)>0.01)throw new Error('Sales finance journal is not balanced');
    const j=(await client.query(`INSERT INTO finance_journals(journal_no,journal_date,description,source_type,source_id,source_ref,created_by) VALUES($1,current_date,$2,'Sale',$3,$4,$5) RETURNING id`,[`J-SALE-${String(sale.sale_no).replace(/[^A-Za-z0-9]/g,'')}`,`Sale ${sale.sale_no}`,String(sale.id),`Sale:${sale.id}`,userId])).rows[0];
    for(const l of lines)await client.query('INSERT INTO finance_journal_lines(journal_id,account_id,description,debit,credit,customer_id) VALUES($1,$2,$3,$4,$5,$6)',[j.id,l.accountId,l.description||'',l.debit||0,l.credit||0,l.customerId||null]);
    await client.query('INSERT INTO finance_sync_log(source_type,source_id,journal_id) VALUES(\'Sale\',$1,$2) ON CONFLICT DO NOTHING',[String(sale.id),j.id]);
    return j.id;
  }

  async function postSaleReversalJournal(client,sale,userId){
    const exists=(await client.query("SELECT journal_id FROM finance_sync_log WHERE source_type='SaleReversal' AND source_id=$1",[String(sale.id)])).rows[0];
    if(exists)return exists.journal_id;
    const original=(await client.query("SELECT j.id FROM finance_journals j WHERE j.source_type='Sale' AND j.source_id=$1 ORDER BY j.created_at DESC LIMIT 1",[String(sale.id)])).rows[0];
    if(!original)return null;
    const originalLines=(await client.query('SELECT * FROM finance_journal_lines WHERE journal_id=$1',[original.id])).rows;
    const j=(await client.query(`INSERT INTO finance_journals(journal_no,journal_date,description,source_type,source_id,source_ref,created_by) VALUES($1,current_date,$2,'SaleReversal',$3,$4,$5) RETURNING id`,[`J-REV-${String(sale.sale_no).replace(/[^A-Za-z0-9]/g,'')}`,`Reversal of sale ${sale.sale_no}`,String(sale.id),`SaleReversal:${sale.id}`,userId])).rows[0];
    for(const l of originalLines)await client.query('INSERT INTO finance_journal_lines(journal_id,account_id,description,debit,credit,customer_id,supplier_id) VALUES($1,$2,$3,$4,$5,$6,$7)',[j.id,l.account_id,`Reversal: ${l.description||''}`,l.credit,l.debit,l.customer_id,l.supplier_id]);
    await client.query('INSERT INTO finance_sync_log(source_type,source_id,journal_id) VALUES(\'SaleReversal\',$1,$2) ON CONFLICT DO NOTHING',[String(sale.id),j.id]);
    return j.id;
  }

  app.get('/api/sales/controls',auth,need('sales.view'),async(req,res)=>res.json((await q('SELECT * FROM sales_controls WHERE id=$1',['00000000-0000-0000-0000-000000000001']))[0]));
  app.patch('/api/sales/controls',auth,need('sales.approve_discount'),async(req,res)=>{
    const b=req.body||{};const r=(await q('UPDATE sales_controls SET max_discount_percent=COALESCE($1,max_discount_percent),max_price_override_percent=COALESCE($2,max_price_override_percent),require_discount_approval=COALESCE($3,require_discount_approval),require_price_override_approval=COALESCE($4,require_price_override_approval),updated_by=$5,updated_at=now() WHERE id=$6 RETURNING *',[b.maxDiscountPercent,b.maxPriceOverridePercent,b.requireDiscountApproval,b.requirePriceOverrideApproval,req.user.id,'00000000-0000-0000-0000-000000000001']))[0];await audit(req.user,'SALES_CONTROLS_UPDATED','SalesControl',r.id,'Updated pricing approval controls',null,r,req.req);res.json(r);
  });

  app.post('/api/sales/:id/approvals',auth,need('sales.create'),async(req,res)=>{
    const b=req.body||{},type=text2(b.type);if(!['Discount','Price Override','Refund','Void','Cash Variance'].includes(type))return res.status(400).json({error:'Invalid approval type'});
    const sale=(await q('SELECT * FROM sales WHERE id=$1',[req.params.id]))[0];if(!sale)return res.status(404).json({error:'Sale not found'});
    const r=(await q('INSERT INTO sales_approvals(sale_id,approval_type,requested_by,reason,metadata_json) VALUES($1,$2,$3,$4,$5) RETURNING *',[sale.id,type,req.user.id,text2(b.reason),JSON.stringify(b.metadata||{})]))[0];
    await audit(req.user,'SALES_APPROVAL_REQUESTED','SalesApproval',r.id,`Requested ${type} approval for ${sale.sale_no}`,null,r,req.req);res.status(201).json(r);
  });
  app.post('/api/sales/approvals/:id/decision',auth,async(req,res)=>{
    const a=(await q('SELECT * FROM sales_approvals WHERE id=$1',[req.params.id]))[0];if(!a)return res.status(404).json({error:'Approval not found'});
    const can=(a.approval_type==='Discount'&&req.permissions.has('sales.approve_discount'))||(a.approval_type==='Price Override'&&req.permissions.has('sales.approve_price'))||(['Refund','Void','Cash Variance'].includes(a.approval_type)&&req.permissions.has('sales.reconcile'));
    if(!can)return res.status(403).json({error:'You are not authorized to decide this approval'});
    const status=['Approved','Rejected'].includes(text2(req.body?.status))?text2(req.body.status):'Rejected';
    const r=(await q('UPDATE sales_approvals SET status=$1,approved_by=$2,approved_at=now() WHERE id=$3 AND status=\'Pending\' RETURNING *',[status,req.user.id,a.id]))[0];if(!r)return res.status(409).json({error:'Approval is no longer pending'});await audit(req.user,'SALES_APPROVAL_DECIDED','SalesApproval',r.id,`${status} ${r.approval_type} approval`,a,r,req.req);res.json(r);
  });

  app.get('/api/sales/suspended',auth,need('sales.view'),async(req,res)=>{
    const rows=await q(`SELECT ss.*,c.name customer_name,c.phone customer_phone,l.name location_name,u.email cashier_email FROM suspended_sales ss LEFT JOIN customers c ON c.id=ss.customer_id JOIN inventory_locations l ON l.id=ss.location_id JOIN users u ON u.id=ss.cashier_id WHERE ss.status='Suspended' ORDER BY ss.created_at DESC LIMIT 300`);res.json(rows);
  });
  app.post('/api/sales/suspended',auth,need('sales.create'),async(req,res)=>{
    const b=req.body||{};if(!b.locationId||!Array.isArray(b.cart)||!b.cart.length)return res.status(400).json({error:'Location and a non-empty cart are required'});
    const r=(await q('INSERT INTO suspended_sales(hold_no,location_id,customer_id,cashier_id,cart_json,notes) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[refNo('HLD'),b.locationId,b.customerId||null,req.user.id,JSON.stringify(b.cart),text2(b.notes)]))[0];
    await audit(req.user,'SALE_SUSPENDED','SuspendedSale',r.id,`Suspended sale ${r.hold_no}`,null,r,req.req);res.status(201).json(r);
  });
  app.post('/api/sales/suspended/:id/retrieve',auth,need('sales.create'),async(req,res)=>{
    const r=(await q("UPDATE suspended_sales SET status='Retrieved',retrieved_at=now(),retrieved_by=$1,updated_at=now() WHERE id=$2 AND status='Suspended' RETURNING *",[req.user.id,req.params.id]))[0];if(!r)return res.status(409).json({error:'Suspended sale is no longer available'});await audit(req.user,'SALE_SUSPENDED_RETRIEVED','SuspendedSale',r.id,`Retrieved sale ${r.hold_no}`,null,r,req.req);res.json(r);
  });
  app.post('/api/sales/suspended/:id/cancel',auth,need('sales.void'),async(req,res)=>{
    const r=(await q("UPDATE suspended_sales SET status='Cancelled',updated_at=now() WHERE id=$1 AND status='Suspended' RETURNING *",[req.params.id]))[0];if(!r)return res.status(409).json({error:'Suspended sale is no longer active'});await audit(req.user,'SALE_SUSPENDED_CANCELLED','SuspendedSale',r.id,`Cancelled suspended sale ${r.hold_no}`,null,r,req.req);res.json(r);
  });

  app.get('/api/sales/shifts',auth,need('sales.shift'),async(req,res)=>{
    res.json(await q(`SELECT ts.*,l.name location_name,u.email cashier_email,COALESCE((SELECT sum(sp.amount) FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.till_shift_id=ts.id AND s.status IN ('Completed','Partially Paid','Paid') AND sp.method='Cash' AND sp.status='Completed'),0)::numeric cash_sales,COALESCE((SELECT sum(amount) FROM till_cash_movements m WHERE m.shift_id=ts.id AND m.movement_type IN ('Cash In','Float Top Up')),0)::numeric cash_in,COALESCE((SELECT sum(amount) FROM till_cash_movements m WHERE m.shift_id=ts.id AND m.movement_type IN ('Cash Out','Petty Cash')),0)::numeric cash_out FROM till_shifts ts JOIN inventory_locations l ON l.id=ts.location_id JOIN users u ON u.id=ts.cashier_id ORDER BY ts.opened_at DESC LIMIT 200`));
  });
  app.post('/api/sales/shifts/open',auth,need('sales.shift'),async(req,res)=>{
    const b=req.body||{},opening=money2(b.openingCash);if(!b.locationId||opening<0)return res.status(400).json({error:'Location and non-negative opening cash are required'});
    const client=await pool.connect();try{await client.query('BEGIN');const active=(await client.query("SELECT id FROM till_shifts WHERE cashier_id=$1 AND status='Open' FOR UPDATE",[req.user.id])).rows[0];if(active)throw new Error('You already have an open till shift');const r=(await client.query('INSERT INTO till_shifts(location_id,cashier_id,opening_cash,expected_cash) VALUES($1,$2,$3,$3) RETURNING *',[b.locationId,req.user.id,opening])).rows[0];await client.query('COMMIT');await audit(req.user,'TILL_SHIFT_OPENED','TillShift',r.id,'Opened cashier till shift',null,r,req.req);res.status(201).json(r)}catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });
  app.post('/api/sales/shifts/:id/cash-movement',auth,need('sales.cash_adjust'),async(req,res)=>{
    const amount=money2(req.body?.amount);const type=text2(req.body?.movementType);if(amount<=0||!['Cash In','Cash Out','Float Top Up','Petty Cash'].includes(type)||!text2(req.body?.reason))return res.status(400).json({error:'Movement type, positive amount and reason are required'});
    const shift=(await q("SELECT * FROM till_shifts WHERE id=$1 AND status='Open'",[req.params.id]))[0];if(!shift)return res.status(404).json({error:'Open till shift not found'});
    const r=(await q('INSERT INTO till_cash_movements(shift_id,movement_type,amount,reason,reference,actor_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',[shift.id,type,amount,text2(req.body.reason),text2(req.body.reference),req.user.id]))[0];await audit(req.user,'TILL_CASH_MOVEMENT','TillCashMovement',r.id,`Recorded ${type} of ${amount}`,null,r,req.req);res.status(201).json(r);
  });
  app.post('/api/sales/shifts/:id/close',auth,need('sales.reconcile'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const sh=(await client.query("SELECT * FROM till_shifts WHERE id=$1 AND status='Open' FOR UPDATE",[req.params.id])).rows[0];if(!sh)throw new Error('Open till shift not found');
      const cashSales=Number((await client.query("SELECT COALESCE(sum(sp.amount),0) v FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.till_shift_id=$1 AND s.status NOT IN ('Cancelled','Voided','Reversed') AND sp.method='Cash' AND sp.status='Completed'",[sh.id])).rows[0].v||0);
      const cashRefunds=Number((await client.query("SELECT COALESCE(sum(rt.amount),0) v FROM refund_transactions rt JOIN return_requests rr ON rr.id=rt.return_id WHERE rr.status='Refunded' AND rt.method='Cash' AND rr.created_at>=(SELECT opened_at FROM till_shifts WHERE id=$1) AND rr.created_at<=now()",[sh.id])).rows[0].v||0);
      const cashIn=Number((await client.query("SELECT COALESCE(sum(amount),0) v FROM till_cash_movements WHERE shift_id=$1 AND movement_type IN ('Cash In','Float Top Up')",[sh.id])).rows[0].v||0);
      const cashOut=Number((await client.query("SELECT COALESCE(sum(amount),0) v FROM till_cash_movements WHERE shift_id=$1 AND movement_type IN ('Cash Out','Petty Cash')",[sh.id])).rows[0].v||0);
      const expected=money2(Number(sh.opening_cash)+cashSales+cashIn-cashOut-cashRefunds),actual=money2(req.body?.actualCash);const variance=money2(actual-expected);if(actual<0)throw new Error('Actual cash cannot be negative');if(Math.abs(variance)>0.009&&!text2(req.body?.varianceReason))throw new Error('A variance reason is required');
      const r=(await client.query("UPDATE till_shifts SET status='Closed',expected_cash=$1,actual_cash=$2,variance=$3,variance_reason=$4,supervisor_id=$5,closed_at=now(),updated_at=now() WHERE id=$6 RETURNING *",[expected,actual,variance,text2(req.body?.varianceReason),req.user.id,sh.id])).rows[0];await client.query('COMMIT');await audit(req.user,'TILL_SHIFT_CLOSED','TillShift',r.id,`Closed till with variance ${variance}`,sh,r,req.req);res.json(r);
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });
  app.post('/api/sales/shifts/:id/reconcile',auth,need('sales.reconcile'),async(req,res)=>{
    const r=(await q("UPDATE till_shifts SET status='Reconciled',reconciled_at=now(),supervisor_id=$1,updated_at=now() WHERE id=$2 AND status='Closed' RETURNING *",[req.user.id,req.params.id]))[0];if(!r)return res.status(409).json({error:'Only closed shifts can be reconciled'});await audit(req.user,'TILL_SHIFT_RECONCILED','TillShift',r.id,'Reconciled till shift',null,r,req.req);res.json(r);
  });

  app.get('/api/sales/quotes',auth,need('sales.quotes'),async(req,res)=>{
    res.json(await q(`SELECT q.*,c.name customer_name,c.customer_no,l.name location_name,u.email created_by_email,COALESCE(count(ql.id),0)::int line_count FROM sales_quotes q LEFT JOIN customers c ON c.id=q.customer_id JOIN inventory_locations l ON l.id=q.location_id LEFT JOIN users u ON u.id=q.created_by LEFT JOIN sales_quote_lines ql ON ql.quote_id=q.id GROUP BY q.id,c.name,c.customer_no,l.name,u.email ORDER BY q.created_at DESC LIMIT 300`));
  });
  app.get('/api/sales/quotes/:id',auth,need('sales.quotes'),async(req,res)=>{
    const quote=(await q('SELECT q.*,c.name customer_name,c.customer_no,l.name location_name FROM sales_quotes q LEFT JOIN customers c ON c.id=q.customer_id JOIN inventory_locations l ON l.id=q.location_id WHERE q.id=$1',[req.params.id]))[0];if(!quote)return res.status(404).json({error:'Quote not found'});quote.lines=await q('SELECT ql.*,v.sku,v.variant_name,p.name product_name FROM sales_quote_lines ql JOIN product_variants v ON v.id=ql.variant_id JOIN products p ON p.id=v.product_id WHERE ql.quote_id=$1',[quote.id]);res.json(quote);
  });
  app.post('/api/sales/quotes',auth,need('sales.quotes'),async(req,res)=>{
    const b=req.body||{},lines=Array.isArray(b.lines)?b.lines:[];if(!b.locationId||!lines.length)return res.status(400).json({error:'Location and quote lines are required'});
    const client=await pool.connect();try{await client.query('BEGIN');let subtotal=0,discount=0,tax=0;for(const l of lines){const v=(await client.query('SELECT v.*,p.name product_name FROM product_variants v JOIN products p ON p.id=v.product_id WHERE v.id=$1 AND v.status=\'Active\'',[l.variantId])).rows[0];if(!v)throw new Error('Product variant not found');const qty=Number(l.quantity);if(!(qty>0))throw new Error('Quote quantity must be positive');const unit=money2(l.unitPrice===undefined?v.selling_price:l.unitPrice);const disc=Math.min(money2(l.discountAmount||0),money2(unit*qty));const rate=Math.max(0,money2(l.taxRate===undefined?v.tax_rate:l.taxRate));const tx=money2(Math.max(0,unit*qty-disc)*rate/100);subtotal=money2(subtotal+unit*qty);discount=money2(discount+disc);tax=money2(tax+tx)}
      const quote=(await client.query(`INSERT INTO sales_quotes(quote_no,customer_id,location_id,status,subtotal,discount_amount,tax_amount,grand_total,currency,valid_until,notes,created_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,[refNo('QUO'),b.customerId||null,b.locationId,text2(b.status)||'Draft',subtotal,discount,tax,money2(subtotal-discount+tax),text2(b.currency)||'UGX',b.validUntil||null,text2(b.notes),req.user.id])).rows[0];
      for(const l of lines){const v=(await client.query('SELECT selling_price,tax_rate FROM product_variants WHERE id=$1',[l.variantId])).rows[0];if(!v)throw new Error('Product variant not found');const qty=Number(l.quantity);if(!(qty>0))throw new Error('Quote quantities must be positive');const customerType=b.customerId?((await client.query('SELECT customer_type FROM customers WHERE id=$1',[b.customerId])).rows[0]?.customer_type||'Retail'):'Retail';const effective=(await client.query('SELECT * FROM amaal_effective_variant_price_qty($1,$2,$3,$4)',[l.variantId,customerType,qty,null])).rows[0];const unit=money2(l.unitPrice===undefined?(effective?.final_price??v.selling_price):l.unitPrice),disc=Math.min(money2(l.discountAmount||0),money2(unit*qty)),rate=Math.max(0,money2(l.taxRate===undefined?v.tax_rate:l.taxRate)),tx=money2(Math.max(0,unit*qty-disc)*rate/100);await client.query('INSERT INTO sales_quote_lines(quote_id,variant_id,quantity,unit_price,discount_amount,tax_rate,tax_amount,line_total) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[quote.id,l.variantId,qty,unit,disc,rate,tx,money2(unit*qty-disc+tx)])}
      await client.query('COMMIT');await audit(req.user,'QUOTE_CREATED','SalesQuote',quote.id,`Created quote ${quote.quote_no}`,null,quote,req.req);res.status(201).json(quote);
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/sales/quotes/:id/approve',auth,need('sales.approve_discount'),async(req,res)=>{
    const r=(await q("UPDATE sales_quotes SET status='Approved',approved_by=$1,updated_at=now() WHERE id=$2 AND status IN ('Draft','Pending Approval') RETURNING *",[req.user.id,req.params.id]))[0];if(!r)return res.status(409).json({error:'Quote is not awaiting approval'});await audit(req.user,'QUOTE_APPROVED','SalesQuote',r.id,`Approved quote ${r.quote_no}`,null,r,req.req);res.json(r);
  });
  app.post('/api/sales/quotes/:id/cancel',auth,need('sales.quotes'),async(req,res)=>{
    const r=(await q("UPDATE sales_quotes SET status='Cancelled',updated_at=now() WHERE id=$1 AND status NOT IN ('Converted','Cancelled') RETURNING *",[req.params.id]))[0];if(!r)return res.status(409).json({error:'Quote cannot be cancelled'});await audit(req.user,'QUOTE_CANCELLED','SalesQuote',r.id,`Cancelled quote ${r.quote_no}`,null,r,req.req);res.json(r);
  });

  app.post('/api/sales/quotes/:id/convert',auth,need('sales.create'),async(req,res)=>{
    const b=req.body||{},client=await pool.connect();try{await client.query('BEGIN');const quote=(await client.query("SELECT * FROM sales_quotes WHERE id=$1 AND status IN ('Draft','Approved') FOR UPDATE",[req.params.id])).rows[0];if(!quote)throw new Error('Quote is not convertible');if(quote.valid_until&&new Date(quote.valid_until)<new Date())throw new Error('Quote has expired');
      const lines=(await client.query('SELECT * FROM sales_quote_lines WHERE quote_id=$1',[quote.id])).rows;if(!lines.length)throw new Error('Quote has no lines');const payments=Array.isArray(b.payments)?b.payments:[];const paid=money2(payments.reduce((a,p)=>a+money2(p.amount),0));if(Math.abs(paid-Number(quote.grand_total))>0.009)throw new Error('Conversion requires payment equal to the quote total');
      const sale=(await client.query(`INSERT INTO sales(sale_no,customer_id,location_id,status,subtotal,discount_amount,tax_amount,grand_total,currency,cashier_id,notes,quote_id,till_shift_id) VALUES($1,$2,$3,'Completed',$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,[saleNo(),quote.customer_id,quote.location_id,quote.subtotal,quote.discount_amount,quote.tax_amount,quote.grand_total,quote.currency,req.user.id,text2(b.notes)||quote.notes,quote.id,b.tillShiftId||null])).rows[0];
      for(const l of lines){const v=(await client.query('SELECT * FROM product_variants WHERE id=$1 AND status=\'Active\' FOR SHARE',[l.variant_id])).rows[0];if(!v)throw new Error('Quoted product is no longer active');if(v.track_inventory){const bal=(await client.query('SELECT * FROM inventory_balances WHERE variant_id=$1 AND location_id=$2 FOR UPDATE',[v.id,quote.location_id])).rows[0];const available=bal?Number(bal.on_hand)-Number(bal.reserved):0;if(available<Number(l.quantity))throw new Error(`Insufficient stock for ${v.sku}`)}
        const sl=(await client.query('INSERT INTO sale_lines(sale_id,variant_id,quantity,unit_price,discount_amount,tax_rate,tax_amount,line_total,cost_price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',[sale.id,l.variant_id,l.quantity,l.unit_price,l.discount_amount,l.tax_rate,l.tax_amount,l.line_total,v.cost_price])).rows[0];if(v.serialized){const serialId=text2((b.serialsByLine||{})[l.id]);if(Number(l.quantity)!==1||!serialId)throw new Error(`Serialized product ${v.sku} requires a selected serial/IMEI at conversion`);const su=(await client.query("SELECT id FROM serialized_units WHERE id=$1 AND variant_id=$2 AND location_id=$3 AND status='In Stock' FOR UPDATE",[serialId,v.id,quote.location_id])).rows[0];if(!su)throw new Error('Selected serial/IMEI is not available at the quote location');await client.query('UPDATE serialized_units SET status=\'Sold\',location_id=NULL,sold_at=now(),updated_at=now() WHERE id=$1',[serialId]);await client.query('INSERT INTO sale_serial_units(sale_line_id,serialized_unit_id) VALUES($1,$2)',[sl.id,serialId]);}if(v.track_inventory)await changeStock(client,{variantId:v.id,locationId:quote.location_id,delta:-Number(l.quantity),type:'SALE',actorId:req.user.id,referenceType:'Sale',referenceId:sale.id,reason:`Sale ${sale.sale_no} from quote ${quote.quote_no}`,unitCost:Number(v.cost_price||0)});
      }
      for(const p of payments)await client.query('INSERT INTO sale_payments(sale_id,method,amount,reference,received_by) VALUES($1,$2,$3,$4,$5)',[sale.id,text2(p.method),money2(p.amount),text2(p.reference),req.user.id]);
      await ensureSalesReceipt(client,sale,req.user.id);await client.query('INSERT INTO sale_status_history(sale_id,status,actor_id,notes) VALUES($1,\'Completed\',$2,$3)',[sale.id,req.user.id,`Converted from quote ${quote.quote_no}`]);await client.query("UPDATE sales_quotes SET status='Converted',converted_sale_id=$1,updated_at=now() WHERE id=$2",[sale.id,quote.id]);await postSalesJournal(client,sale,req.user.id);await client.query('COMMIT');await audit(req.user,'QUOTE_CONVERTED_TO_SALE','SalesQuote',quote.id,`Converted ${quote.quote_no} to ${sale.sale_no}`,quote,sale,req.req);res.status(201).json(await saleById(sale.id));
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.get('/api/sales/orders',auth,need('sales.orders'),async(req,res)=>{
    res.json(await q(`SELECT o.id,o.order_no,o.status,o.payment_status,o.fulfillment_status,o.grand_total,o.created_at,c.name customer_name,l.name location_name,COUNT(ol.id)::int line_count,COALESCE(sum(ol.quantity),0)::numeric units FROM orders o LEFT JOIN customers c ON c.id=o.customer_id JOIN inventory_locations l ON l.id=o.location_id LEFT JOIN order_lines ol ON ol.order_id=o.id GROUP BY o.id,c.name,l.name ORDER BY o.created_at DESC LIMIT 300`));
  });
  app.post('/api/sales/orders/:id/link',auth,need('sales.orders'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const order=(await client.query('SELECT * FROM orders WHERE id=$1 FOR UPDATE',[req.params.id])).rows[0];if(!order)throw new Error('Order not found');const sale=(await client.query('SELECT * FROM sales WHERE id=$1 FOR SHARE',[req.body?.saleId])).rows[0];if(!sale)throw new Error('Sale not found');if(String(sale.customer_id||'')!==String(order.customer_id||''))throw new Error('Sale customer does not match order customer');if(String(sale.location_id)!==String(order.location_id))throw new Error('Sale location does not match order location');const existing=(await client.query('SELECT id FROM sales_order_links WHERE order_id=$1',[order.id])).rows[0];if(existing)throw new Error('A sale is already linked to this order');const r=(await client.query('INSERT INTO sales_order_links(sales_id,order_id) VALUES($1,$2) RETURNING *',[sale.id,order.id])).rows[0];await client.query('COMMIT');await audit(req.user,'SALES_ORDER_LINKED','SalesOrderLink',r.id,`Linked order ${order.order_no} to sale ${r.sales_id}`,null,r,req.req);res.status(201).json(r);}catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/sales/:id/receipt/reprint',auth,need('sales.receipts'),async(req,res)=>{
    const sale=(await q('SELECT * FROM sales WHERE id=$1',[req.params.id]))[0];if(!sale)return res.status(404).json({error:'Sale not found'});const receipt=(await q('SELECT * FROM sale_receipts WHERE sale_id=$1',[sale.id]))[0];if(!receipt)return res.status(404).json({error:'Receipt has not been issued'});const r=(await q('INSERT INTO receipt_reprints(receipt_id,reason,authorized_by) VALUES($1,$2,$3) RETURNING *',[receipt.id,text2(req.body?.reason)||'Customer requested receipt reprint',req.user.id]))[0];await audit(req.user,'RECEIPT_REPRINTED','Receipt',receipt.id,`Reprinted ${receipt.receipt_no}`,null,r,req.req);res.json({receipt,reprint:r});
  });

  app.get('/api/sales/:id/receipt/history',auth,need('sales.receipts'),async(req,res)=>{
    const receipt=(await q('SELECT * FROM sale_receipts WHERE sale_id=$1',[req.params.id]))[0];if(!receipt)return res.status(404).json({error:'Receipt not found'});res.json({receipt,reprints:await q('SELECT rr.*,u.email authorized_email FROM receipt_reprints rr JOIN users u ON u.id=rr.authorized_by WHERE rr.receipt_id=$1 ORDER BY rr.reprinted_at DESC',[receipt.id])});
  });

  app.post('/api/sales/:id/payment/reverse',auth,need('sales.refund'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const p=(await client.query("SELECT sp.*,s.status sale_status FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE sp.id=$1 AND sp.sale_id=$2 FOR UPDATE",[req.body?.paymentId,req.params.id])).rows[0];if(!p)throw new Error('Payment not found');if(p.status!=='Completed')throw new Error('Only completed payments can be reversed');const amount=money2(p.amount);const x=(await client.query('INSERT INTO payment_reversals(sale_payment_id,sale_id,amount,method,reference,reason,processed_by) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[p.id,p.sale_id,amount,p.method,text2(req.body?.reference),text2(req.body?.reason)||'Payment reversal',req.user.id])).rows[0];await client.query("UPDATE sale_payments SET status='Reversed',reversed_at=now(),reversed_by=$1 WHERE id=$2",[req.user.id,p.id]);
      await client.query('COMMIT');await audit(req.user,'SALE_PAYMENT_REVERSED','SalePayment',p.id,`Reversed ${amount} ${p.method}`,p,x,req.req);res.json(x);
    }catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.get('/api/sales/reconciliation',auth,need('sales.reconcile'),async(req,res)=>{
    const date=text2(req.query.date)||new Date().toISOString().slice(0,10);const [salesTotals,payments,returns,voids]=await Promise.all([
      q("SELECT COALESCE(sum(grand_total),0)::numeric total,count(*)::int count FROM sales WHERE status IN ('Completed','Paid','Partially Paid') AND created_at::date=$1",[date]),
      q("SELECT sp.method,COALESCE(sum(sp.amount),0)::numeric amount FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.status IN ('Completed','Paid','Partially Paid') AND s.created_at::date=$1 AND sp.status='Completed' GROUP BY sp.method ORDER BY sp.method",[date]),
      q("SELECT COALESCE(sum(refund_amount),0)::numeric amount,count(*)::int count FROM return_requests WHERE status='Refunded' AND created_at::date=$1",[date]),
      q("SELECT COALESCE(sum(grand_total),0)::numeric amount,count(*)::int count FROM sales WHERE status IN ('Voided','Cancelled','Reversed') AND created_at::date=$1",[date])
    ]);res.json({date,sales:salesTotals[0],payments,returns:returns[0],voids:voids[0]});
  });

  app.get('/api/sales/analytics',auth,need('sales.view'),async(req,res)=>{
    const days=Math.min(Math.max(Number(req.query.days)||30,1),365);
    const [trend,byCashier,byProduct,byPayment,discounts]=await Promise.all([
      q(`SELECT created_at::date date,COALESCE(sum(grand_total),0)::numeric sales,count(*)::int transactions,COALESCE(sum(discount_amount),0)::numeric discounts FROM sales WHERE status IN ('Completed','Paid','Partially Paid') AND created_at>=current_date-$1::int GROUP BY created_at::date ORDER BY date`,[days]),
      q(`SELECT u.email cashier,COALESCE(sum(s.grand_total),0)::numeric sales,count(*)::int transactions FROM sales s JOIN users u ON u.id=s.cashier_id WHERE s.status IN ('Completed','Paid','Partially Paid') AND s.created_at>=current_date-$1::int GROUP BY u.email ORDER BY sales DESC`,[days]),
      q(`SELECT p.name product,v.sku,COALESCE(sum(sl.quantity),0)::numeric units,COALESCE(sum(sl.line_total),0)::numeric sales,COALESCE(sum(sl.cost_price*sl.quantity),0)::numeric cogs FROM sale_lines sl JOIN sales s ON s.id=sl.sale_id JOIN product_variants v ON v.id=sl.variant_id JOIN products p ON p.id=v.product_id WHERE s.status IN ('Completed','Paid','Partially Paid') AND s.created_at>=current_date-$1::int GROUP BY p.name,v.sku ORDER BY sales DESC LIMIT 100`,[days]),
      q(`SELECT sp.method,COALESCE(sum(sp.amount),0)::numeric amount FROM sale_payments sp JOIN sales s ON s.id=sp.sale_id WHERE s.status IN ('Completed','Paid','Partially Paid') AND s.created_at>=current_date-$1::int AND sp.status='Completed' GROUP BY sp.method ORDER BY amount DESC`,[days]),
      q(`SELECT COALESCE(sum(discount_amount),0)::numeric amount,COALESCE(avg(NULLIF(discount_amount,0)),0)::numeric average FROM sales WHERE status IN ('Completed','Paid','Partially Paid') AND created_at>=current_date-$1::int`,[days])
    ]);res.json({days,trend,byCashier,byProduct,byPayment,discounts:discounts[0]});
  });

  app.post('/api/sales/:id/finance-sync',auth,need('finance.sync'),async(req,res)=>{
    const sale=(await q('SELECT * FROM sales WHERE id=$1',[req.params.id]))[0];if(!sale)return res.status(404).json({error:'Sale not found'});if(!['Completed','Paid','Partially Paid'].includes(sale.status))return res.status(400).json({error:'Only operational sales can be synchronized'});
    const client=await pool.connect();try{await client.query('BEGIN');const id=await postSalesJournal(client,sale,req.user.id);await client.query('COMMIT');await audit(req.user,'SALE_FINANCE_SYNCED','Sale',sale.id,`Synchronized ${sale.sale_no} to Finance`,null,{journalId:id},req.req);res.json({journalId:id})}catch(e){await client.query('ROLLBACK');res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.get('/api/sales/:id',auth,need('sales.view'),async(req,res)=>{const s=await saleById(req.params.id);if(!s)return res.status(404).json({error:'Sale not found'});res.json(s)});
}
