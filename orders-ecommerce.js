import crypto from "crypto";

export function registerOrdersEcommerce({app,auth,need,q,pool,audit,changeStock,reserveStock,releaseReservation}){
  const text=v=>String(v??'').trim();
  const money=v=>Math.round((Number(v)||0)*100)/100;
  const qty=v=>Math.round((Number(v)||0)*1000)/1000;
  const validMethods=new Set(['Cash','Mobile Money','Card','Bank Transfer','Online Payment']);
  const statuses=new Set(['Pending Payment','Paid','Processing','Packed','Ready for Dispatch','Dispatched','Delivered','Cancelled','Refunded','Returned']);
  const transitions={
    'Pending Payment':['Paid','Cancelled'],
    'Paid':['Processing','Cancelled'],
    'Processing':['Packed','Cancelled'],
    'Packed':['Ready for Dispatch','Cancelled'],
    'Ready for Dispatch':['Dispatched','Cancelled'],
    'Dispatched':['Delivered'],
    'Delivered':['Returned'],
    'Cancelled':[], 'Refunded':[], 'Returned':[]
  };
  const orderNo=()=>`WEB-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const receiptNo=()=>`RC-ORD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const saleNo=()=>`SAL-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;

  async function orderById(id){
    const o=(await q(`SELECT o.*,c.name customer_name,c.customer_no,c.phone customer_phone,c.email customer_email,l.name location_name,u.email created_by_email
      FROM orders o LEFT JOIN customers c ON c.id=o.customer_id JOIN inventory_locations l ON l.id=o.location_id LEFT JOIN users u ON u.id=o.created_by WHERE o.id=$1`,[id]))[0];
    if(!o)return null;
    o.lines=await q(`SELECT ol.*,v.sku,v.variant_name,v.serialized,p.name product_name FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id JOIN products p ON p.id=v.product_id WHERE ol.order_id=$1 ORDER BY ol.created_at`,[id]);
    o.serials=await q(`SELECT os.*,su.serial_number,su.imei1,su.imei2,ol.variant_id FROM order_serial_units os JOIN serialized_units su ON su.id=os.serialized_unit_id JOIN order_lines ol ON ol.id=os.order_line_id WHERE ol.order_id=$1 ORDER BY os.created_at`,[id]);
    o.payments=await q(`SELECT * FROM order_payments WHERE order_id=$1 ORDER BY created_at`,[id]);
    o.statusHistory=await q(`SELECT h.*,u.email actor_email FROM order_status_history h LEFT JOIN users u ON u.id=h.actor_id WHERE h.order_id=$1 ORDER BY h.created_at`,[id]);
    o.fulfillments=await q(`SELECT f.*,u.email assigned_email FROM order_fulfillments f LEFT JOIN users u ON u.id=f.assigned_to WHERE f.order_id=$1 ORDER BY f.created_at DESC`,[id]);
    o.delivery=await q(`SELECT * FROM delivery_shipments WHERE order_id=$1 ORDER BY created_at DESC LIMIT 1`,[id]);
    o.sale=await q(`SELECT s.id,s.sale_no,s.status,s.grand_total,sol.created_at linked_at FROM sales_order_links sol JOIN sales s ON s.id=sol.sales_id WHERE sol.order_id=$1 ORDER BY sol.created_at DESC LIMIT 1`,[id]);
    return o;
  }

  async function releaseReservations(client,id,status='Released'){
    if(!releaseReservation)throw new Error('Inventory reservation release service is unavailable');
    const rows=(await client.query("SELECT id FROM inventory_reservations WHERE reference_type='Order' AND reference_id=$1 AND status='Active' FOR UPDATE",[id])).rows;
    for(const r of rows)await releaseReservation(client,r.id,null,status);
  }

  async function ensureFinanceAccount(client,code,name,type){
    return (await client.query('INSERT INTO finance_accounts(code,name,account_type,system) VALUES($1,$2,$3,true) ON CONFLICT(code) DO UPDATE SET name=EXCLUDED.name RETURNING id',[code,name,type])).rows[0].id;
  }
  async function postOrderPaymentJournal(client,payment,order,userId){
    const exists=(await client.query("SELECT journal_id FROM finance_sync_log WHERE source_type='OrderPayment' AND source_id=$1",[String(payment.id)])).rows[0];
    if(exists)return exists.journal_id;
    const map={Cash:'1000','Mobile Money':'1010',Card:'1020','Bank Transfer':'1020','Online Payment':'1020'};
    const debit=await ensureFinanceAccount(client,map[payment.method]||'1000',payment.method==='Mobile Money'?'Mobile Money':payment.method==='Cash'?'Cash':'Bank','Asset');
    const deposits=await ensureFinanceAccount(client,'2200','Customer Deposits','Liability');
    const amount=money(payment.amount); const ref=`OrderPayment:${payment.id}`;
    const j=(await client.query(`INSERT INTO finance_journals(journal_no,journal_date,description,source_type,source_id,source_ref,created_by) VALUES($1,current_date,$2,'OrderPayment',$3,$4,$5) ON CONFLICT(source_ref) DO UPDATE SET source_ref=EXCLUDED.source_ref RETURNING id`,[`J-OP-${String(payment.id).replace(/-/g,'').slice(0,18)}`,`Order payment ${order.order_no}`,String(payment.id),ref,userId])).rows[0];
    const lines=[
      [debit,'Payment received',amount,0],
      [deposits,'Customer deposit liability',0,amount]
    ];
    for(const [account,description,d,c] of lines)await client.query('INSERT INTO finance_journal_lines(journal_id,account_id,description,debit,credit,customer_id) VALUES($1,$2,$3,$4,$5,$6)',[j.id,account,description,d,c,order.customer_id||null]);
    await client.query('INSERT INTO finance_sync_log(source_type,source_id,journal_id) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',['OrderPayment',String(payment.id),j.id]);
    return j.id;
  }
  async function postOrderCompletionJournal(client,order,userId){
    const exists=(await client.query("SELECT journal_id FROM finance_sync_log WHERE source_type='Order' AND source_id=$1",[String(order.id)])).rows[0];
    if(exists)return exists.journal_id;
    const deposits=await ensureFinanceAccount(client,'2200','Customer Deposits','Liability');
    const revenue=await ensureFinanceAccount(client,'4000','Sales Revenue','Revenue');
    const taxPay=await ensureFinanceAccount(client,'2100','Tax Payable','Liability');
    const cogsAcc=await ensureFinanceAccount(client,'5000','Cost of Goods Sold','Expense');
    const invAcc=await ensureFinanceAccount(client,'1200','Inventory','Asset');
    const netRevenue=money(Number(order.subtotal)-Number(order.discount_amount)+Number(order.shipping_amount));
    const tax=money(order.tax_amount);
    const cogsRows=(await client.query('SELECT COALESCE(sum(quantity*cost_price),0)::numeric cogs FROM order_lines WHERE order_id=$1',[order.id])).rows[0];
    const cogs=money(cogsRows.cogs);
    const ref=`Order:${order.id}`;
    const j=(await client.query(`INSERT INTO finance_journals(journal_no,journal_date,description,source_type,source_id,source_ref,created_by) VALUES($1,current_date,$2,'Order',$3,$4,$5) RETURNING id`,[`J-ORD-${String(order.id).replace(/-/g,'').slice(0,18)}`,`Order ${order.order_no} fulfilled`,String(order.id),ref,userId])).rows[0];
    const lines=[];
    const totalDeposit=money(Number(order.grand_total));
    if(totalDeposit>0)lines.push([deposits,'Recognize customer deposit',totalDeposit,0]);
    if(netRevenue>0)lines.push([revenue,'Order revenue',0,netRevenue]);
    if(tax>0)lines.push([taxPay,'Order tax',0,tax]);
    if(cogs>0){lines.push([cogsAcc,'Cost of goods sold',cogs,0]);lines.push([invAcc,'Inventory consumed',0,cogs]);}
    const debit=money(lines.reduce((s,x)=>s+x[2],0)); const credit=money(lines.reduce((s,x)=>s+x[3],0));
    if(Math.abs(debit-credit)>0.01)throw new Error('Order finance journal is not balanced');
    for(const [account,description,d,c] of lines)await client.query('INSERT INTO finance_journal_lines(journal_id,account_id,description,debit,credit,customer_id) VALUES($1,$2,$3,$4,$5,$6)',[j.id,account,description,d,c,order.customer_id||null]);
    await client.query('INSERT INTO finance_sync_log(source_type,source_id,journal_id) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',['Order',String(order.id),j.id]);
    return j.id;
  }

  async function consumeOrder(client,o,userId){
    const lines=(await client.query('SELECT ol.*,v.serialized,v.track_inventory,v.cost_price FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id WHERE ol.order_id=$1 FOR UPDATE',[o.id])).rows;
    for(const line of lines){
      if(line.serialized){const assigned=(await client.query('SELECT count(*)::int c FROM order_serial_units WHERE order_line_id=$1',[line.id])).rows[0].c;if(assigned!==Number(line.quantity))throw new Error(`Every serialized order line must have all serial/IMEI units assigned before completion`)}
    }
    const reservations=(await client.query("SELECT * FROM inventory_reservations WHERE reference_type='Order' AND reference_id=$1 AND status='Active' FOR UPDATE",[o.id])).rows;
    for(const r of reservations){
      await changeStock(client,{variantId:r.variant_id,locationId:r.location_id,delta:-Number(r.quantity),type:'ORDER_FULFILLMENT',actorId:userId,referenceType:'Order',referenceId:o.id,reason:`Order ${o.order_no} fulfilled`,unitCost:Number((lines.find(x=>String(x.variant_id)===String(r.variant_id))||{}).cost_price||0)});
      await client.query("UPDATE inventory_reservations SET status='Consumed',released_at=now() WHERE id=$1",[r.id]);
    }
    const serials=(await client.query('SELECT su.id FROM order_serial_units os JOIN serialized_units su ON su.id=os.serialized_unit_id JOIN order_lines ol ON ol.id=os.order_line_id WHERE ol.order_id=$1 FOR UPDATE',[o.id])).rows;
    for(const su of serials){const updated=await client.query("UPDATE serialized_units SET status='Sold',location_id=NULL,sold_at=now(),updated_at=now() WHERE id=$1 AND status IN ('In Stock','Reserved') RETURNING id",[su.id]);if(!updated.rows[0])throw new Error('A serialized unit assigned to this order is no longer available for fulfillment')}
  }

  app.get('/api/orders/summary',auth,need('orders.view'),async(req,res)=>{
    try{
      const [all,pending,paid,processing,dispatch,delivered,revenue,partial]=await Promise.all([
        q('SELECT count(*)::int c FROM orders'),
        q("SELECT count(*)::int c FROM orders WHERE status='Pending Payment'"),
        q("SELECT count(*)::int c FROM orders WHERE status='Paid'"),
        q("SELECT count(*)::int c FROM orders WHERE status IN ('Processing','Packed','Ready for Dispatch')"),
        q("SELECT count(*)::int c FROM orders WHERE status='Dispatched'"),
        q("SELECT count(*)::int c FROM orders WHERE status='Delivered'"),
        q("SELECT COALESCE(sum(grand_total),0)::numeric total FROM orders WHERE status NOT IN ('Cancelled','Refunded') AND created_at>=date_trunc('month',now())"),
        q("SELECT count(*)::int c FROM orders WHERE payment_status='Partially Paid'")
      ]);
      res.json({total:all[0].c,pending:pending[0].c,paid:paid[0].c,partialPaid:partial[0].c,processing:processing[0].c,dispatched:dispatch[0].c,delivered:delivered[0].c,monthRevenue:revenue[0].total});
    }catch(e){res.status(500).json({error:'Unable to load order summary'})}
  });

  app.get('/api/orders',auth,need('orders.view'),async(req,res)=>{
    try{
      const limit=Math.min(Math.max(Number(req.query.limit)||100,1),200);const params=[];const where=[];const qtext=text(req.query.q);
      if(qtext){params.push(`%${qtext}%`);where.push(`(o.order_no ILIKE $${params.length} OR COALESCE(c.name,'') ILIKE $${params.length} OR COALESCE(c.phone,'') ILIKE $${params.length})`)}
      if(req.query.status){if(!statuses.has(req.query.status))return res.status(400).json({error:'Invalid order status'});params.push(req.query.status);where.push(`o.status=$${params.length}`)}
      params.push(limit);
      const rows=await q(`SELECT o.id,o.order_no,o.status,o.payment_status,o.fulfillment_status,o.currency,o.grand_total,o.created_at,o.updated_at,c.name customer_name,c.customer_no,l.name location_name,COUNT(ol.id)::int line_count,COALESCE(SUM(ol.quantity),0)::numeric units FROM orders o LEFT JOIN customers c ON c.id=o.customer_id JOIN inventory_locations l ON l.id=o.location_id LEFT JOIN order_lines ol ON ol.order_id=o.id ${where.length?'WHERE '+where.join(' AND '):''} GROUP BY o.id,c.name,c.customer_no,l.name ORDER BY o.created_at DESC LIMIT $${params.length}`,params);
      res.json(rows);
    }catch(e){res.status(500).json({error:'Unable to load orders'})}
  });

  app.get('/api/orders/analytics',auth,need('orders.view'),async(req,res)=>{try{const days=Math.min(Math.max(Number(req.query.days)||30,1),365);const [daily,methods,top,statusesQ]=await Promise.all([
    q(`SELECT date_trunc('day',created_at)::date day,count(*)::int orders,COALESCE(sum(grand_total),0)::numeric value FROM orders WHERE created_at>=current_date-$1::int GROUP BY 1 ORDER BY 1`,[days]),
    q(`SELECT method,count(*)::int transactions,COALESCE(sum(amount),0)::numeric value FROM order_payments WHERE status='Completed' AND created_at>=current_date-$1::int GROUP BY method ORDER BY value DESC`,[days]),
    q(`SELECT v.sku,p.name product_name,COALESCE(sum(ol.quantity),0)::numeric units,COALESCE(sum(ol.line_total),0)::numeric value FROM order_lines ol JOIN orders o ON o.id=ol.order_id JOIN product_variants v ON v.id=ol.variant_id JOIN products p ON p.id=v.product_id WHERE o.status NOT IN ('Cancelled','Refunded') AND o.created_at>=current_date-$1::int GROUP BY v.sku,p.name ORDER BY units DESC LIMIT 20`,[days]),
    q(`SELECT status,count(*)::int count FROM orders GROUP BY status ORDER BY count DESC`)
  ]);res.json({daily,paymentMethods:methods,topProducts:top,statuses:statusesQ})}catch(e){res.status(500).json({error:'Unable to load order analytics'})}});

  app.get('/api/orders/export',auth,need('orders.export'),async(req,res)=>{try{const rows=await q(`SELECT o.order_no,o.status,o.payment_status,o.fulfillment_status,o.created_at,c.customer_no,c.name customer_name,l.name location,o.grand_total,o.currency FROM orders o LEFT JOIN customers c ON c.id=o.customer_id JOIN inventory_locations l ON l.id=o.location_id ORDER BY o.created_at DESC LIMIT 10000`);const csv=v=>{const x=String(v??'');return /[",\n]/.test(x)?`"${x.replace(/"/g,'""')}"`:x};res.setHeader('Content-Type','text/csv; charset=utf-8');res.setHeader('Content-Disposition','attachment; filename=amaal-orders-export.csv');res.send(['order_no,status,payment_status,fulfillment_status,created_at,customer_no,customer_name,location,total,currency',...rows.map(r=>[r.order_no,r.status,r.payment_status,r.fulfillment_status,r.created_at,r.customer_no,r.customer_name,r.location,r.grand_total,r.currency].map(csv).join(','))].join('\n'))}catch(e){res.status(500).json({error:'Unable to export orders'})}});

  app.get('/api/orders/:id',auth,need('orders.view'),async(req,res)=>{try{const o=await orderById(req.params.id);if(!o)return res.status(404).json({error:'Order not found'});res.json(o)}catch(e){res.status(500).json({error:'Unable to load order'})}});

  app.post('/api/orders',auth,need('orders.create'),async(req,res)=>{
    const b=req.body||{},lines=Array.isArray(b.lines)?b.lines:[];if(!b.locationId||!lines.length)return res.status(400).json({error:'Selling location and at least one order line are required'});
    const idem=text(req.get('Idempotency-Key')||b.idempotencyKey);const client=await pool.connect();
    try{
      await client.query('BEGIN');
      if(idem){const existing=(await client.query('SELECT id FROM orders WHERE idempotency_key=$1 FOR SHARE',[idem])).rows[0];if(existing){await client.query('ROLLBACK');return res.json(await orderById(existing.id))}}
      const loc=(await client.query("SELECT id,status FROM inventory_locations WHERE id=$1 FOR SHARE",[b.locationId])).rows[0];if(!loc||loc.status!=='Active')throw new Error('Selling location is not active');
      let customerType='Retail';
      if(b.customerId){const c=(await client.query('SELECT id,status,customer_type FROM customers WHERE id=$1 FOR SHARE',[b.customerId])).rows[0];if(!c)throw new Error('Customer not found');if(c.status==='Anonymized')throw new Error('Anonymized customers cannot be used for orders');customerType=c.customer_type||'Retail'}
      let subtotal=0,discount=0,tax=0;const prepared=[]; const couponCode=text(b.couponCode).toUpperCase(); let coupon=null; if(couponCode){coupon=(await client.query('SELECT c.* FROM coupons c JOIN promotions p ON p.id=c.promotion_id WHERE c.code=$1 FOR UPDATE',[couponCode])).rows[0];if(!coupon||coupon.status!=='Active')throw new Error('Coupon code is invalid or inactive');if(coupon.starts_at&&new Date(coupon.starts_at)>new Date())throw new Error('Coupon is not active yet');if(coupon.ends_at&&new Date(coupon.ends_at)<=new Date())throw new Error('Coupon has expired');const used=Number((await client.query('SELECT count(*)::int c FROM coupon_redemptions WHERE coupon_id=$1',[coupon.id])).rows[0].c);if(coupon.max_redemptions!=null&&used>=Number(coupon.max_redemptions))throw new Error('Coupon redemption limit has been reached');if(b.customerId&&coupon.per_customer_limit!=null){const cu=Number((await client.query('SELECT count(*)::int c FROM coupon_redemptions WHERE coupon_id=$1 AND customer_id=$2',[coupon.id,b.customerId])).rows[0].c);if(cu>=Number(coupon.per_customer_limit))throw new Error('Customer coupon redemption limit has been reached');}}
      for(const raw of lines){
        const lineQty=qty(raw.quantity);if(!raw.variantId||!(lineQty>0)||lineQty>100000)throw new Error('Every order line requires a valid quantity');
        const v=(await client.query(`SELECT v.*,p.name product_name FROM product_variants v JOIN products p ON p.id=v.product_id WHERE v.id=$1 AND v.status='Active' FOR SHARE`,[raw.variantId])).rows[0];if(!v)throw new Error('Product variant not found or inactive');
        const effective=(await client.query('SELECT * FROM amaal_effective_variant_price_qty($1,$2,$3,$4)',[v.id,customerType,lineQty,text(b.couponCode)||null])).rows[0];
        const base=money(effective?.final_price??v.selling_price);const unit=money(raw.unitPrice===undefined?base:raw.unitPrice);if(unit<0)throw new Error('Unit price cannot be negative');
        if(raw.unitPrice!==undefined&&Math.abs(unit-base)>0.009)throw new Error('Manual order price overrides are not permitted; use the Sales/POS approval workflow');
        const disc=money(raw.discountAmount||0);if(disc!==0)throw new Error('Manual order discounts are not permitted; use configured pricing and promotions');
        const rate=money(raw.taxRate===undefined?v.tax_rate:raw.taxRate);if(Math.abs(rate-money(v.tax_rate))>0.0001)throw new Error('Manual tax overrides are not permitted');
        const taxable=Math.max(0,money(unit*lineQty-disc));const tx=money(taxable*rate/100);const total=money(taxable+tx);
        if(v.track_inventory){const bal=(await client.query('SELECT on_hand,reserved FROM inventory_balances WHERE variant_id=$1 AND location_id=$2 FOR UPDATE',[v.id,b.locationId])).rows[0];const available=bal?Number(bal.on_hand)-Number(bal.reserved):0;if(available+1e-9<lineQty)throw new Error(`Insufficient available stock for ${v.product_name} (${v.sku})`)}
        if(v.serialized&&lineQty!==1)throw new Error(`${v.product_name} is serialized; order exactly one unit per line`);
        prepared.push({v,qty:lineQty,unit,disc,rate,tx,total,effective});subtotal=money(subtotal+unit*lineQty);discount=money(discount+disc);tax=money(tax+tx);
      }
      const shipping=money(b.shippingAmount||0);if(shipping<0||shipping>1000000000)throw new Error('Invalid shipping amount');const grand=money(subtotal-discount+tax+shipping);
      const o=(await client.query(`INSERT INTO orders(order_no,idempotency_key,customer_id,promotion_id,coupon_code,location_id,status,payment_status,fulfillment_status,subtotal,discount_amount,tax_amount,shipping_amount,grand_total,currency,shipping_name,shipping_phone,shipping_email,shipping_address,notes,created_by) VALUES($1,$2,$3,$4,$5,$6,'Pending Payment','Pending','Unfulfilled',$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) RETURNING *`,[orderNo(),idem||null,b.customerId||null,prepared.find(x=>x.effective?.promotion_id)?.effective?.promotion_id||null,couponCode||null,b.locationId,subtotal,discount,tax,shipping,grand,text(b.currency)||'UGX',text(b.shippingName),text(b.shippingPhone),text(b.shippingEmail),text(b.shippingAddress),text(b.notes),req.user.id])).rows[0];
      if(!reserveStock)throw new Error('Inventory reservation service is unavailable');
      for(const x of prepared){await client.query(`INSERT INTO order_lines(order_id,variant_id,quantity,unit_price,discount_amount,tax_rate,tax_amount,line_total,cost_price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[o.id,x.v.id,x.qty,x.unit,x.disc,x.rate,x.tx,x.total,money(x.v.cost_price)]);if(x.v.track_inventory)await reserveStock(client,{variantId:x.v.id,locationId:b.locationId,quantity:x.qty,actorId:req.user.id,referenceType:'Order',referenceId:o.id,expiresAt:new Date(Date.now()+24*60*60*1000)});}
      await client.query("INSERT INTO order_status_history(order_id,status,actor_id,notes) VALUES($1,'Pending Payment',$2,$3)",[o.id,req.user.id,'Order created']);
      await client.query('COMMIT');await audit(req.user,'ORDER_CREATED','Order',o.id,`Created order ${o.order_no}`,null,o,req.req);res.status(201).json(await orderById(o.id));
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(e.code==='23505'?409:400).json({error:e.code==='23505'?'An order with the supplied idempotency key already exists':e.message})}finally{client.release()}
  });

  app.post('/api/orders/:id/payment',auth,need('orders.manage'),async(req,res)=>{
    const amount=money(req.body?.amount),method=text(req.body?.method);if(amount<=0||!method||!validMethods.has(method))return res.status(400).json({error:'A valid payment method and positive amount are required'});
    const client=await pool.connect();try{await client.query('BEGIN');const o=(await client.query("SELECT * FROM orders WHERE id=$1 FOR UPDATE",[req.params.id])).rows[0];if(!o)throw new Error('Order not found');if(['Cancelled','Refunded','Delivered','Returned'].includes(o.status))throw new Error('Order cannot receive payment in its current status');
      const existing=(await client.query("SELECT COALESCE(sum(amount),0)::numeric total FROM order_payments WHERE order_id=$1 AND status='Completed'",[o.id])).rows[0].total;const due=money(Number(o.grand_total)-Number(existing));if(amount>due+0.009)throw new Error(`Payment exceeds balance of ${due}`);
      const idem=text(req.get('Idempotency-Key')||req.body?.idempotencyKey);if(idem){const prior=(await client.query('SELECT * FROM order_payments WHERE order_id=$1 AND reference=$2 ORDER BY created_at DESC LIMIT 1',[o.id,idem])).rows[0];if(prior){await client.query('ROLLBACK');return res.json(await orderById(o.id))}}
      const p=(await client.query('INSERT INTO order_payments(order_id,method,amount,reference,status,received_by) VALUES($1,$2,$3,$4,\'Completed\',$5) RETURNING *',[o.id,method,amount,text(req.body?.reference||idem),req.user.id])).rows[0];
      const newPaid=money(Number(existing)+amount);const fullyPaid=Math.abs(newPaid-Number(o.grand_total))<0.009;const ps=fullyPaid?'Paid':'Partially Paid';const status=fullyPaid&&o.status==='Pending Payment'?'Paid':o.status;const u=(await client.query('UPDATE orders SET payment_status=$1,status=$2,updated_at=now() WHERE id=$3 RETURNING *',[ps,status,o.id])).rows[0]; if(fullyPaid&&o.promotion_id){const alreadyPromo=(await client.query('SELECT 1 FROM promotion_redemptions WHERE order_id=$1 LIMIT 1',[o.id])).rows[0];if(!alreadyPromo)await client.query('INSERT INTO promotion_redemptions(promotion_id,customer_id,order_id,amount) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING',[o.promotion_id,o.customer_id,o.id,o.discount_amount]);} if(fullyPaid&&o.coupon_code){const c=(await client.query('SELECT * FROM coupons WHERE code=$1 FOR UPDATE',[o.coupon_code])).rows[0];if(c){const already=(await client.query('SELECT 1 FROM coupon_redemptions WHERE order_id=$1 LIMIT 1',[o.id])).rows[0];if(!already){const used=Number((await client.query('SELECT count(*)::int c FROM coupon_redemptions WHERE coupon_id=$1',[c.id])).rows[0].c);if(c.max_redemptions!=null&&used>=Number(c.max_redemptions))throw new Error('Coupon redemption limit has been reached');if(o.customer_id&&c.per_customer_limit!=null){const cu=Number((await client.query('SELECT count(*)::int c FROM coupon_redemptions WHERE coupon_id=$1 AND customer_id=$2',[c.id,o.customer_id])).rows[0].c);if(cu>=Number(c.per_customer_limit))throw new Error('Customer coupon redemption limit has been reached');}await client.query('INSERT INTO coupon_redemptions(coupon_id,customer_id,order_id,amount) VALUES($1,$2,$3,$4)',[c.id,o.customer_id,o.id,o.discount_amount]);}}}
      if(status!==o.status)await client.query('INSERT INTO order_status_history(order_id,status,actor_id,notes) VALUES($1,$2,$3,$4)',[o.id,status,req.user.id,'Order fully paid']);
      await postOrderPaymentJournal(client,p,o,req.user.id);await client.query('COMMIT');await audit(req.user,'ORDER_PAYMENT_RECORDED','Order',o.id,`Recorded ${method} payment for ${o.order_no}`,o,u,req.req);res.json(await orderById(o.id));
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.get('/api/orders/:id/serials/available',auth,need('orders.view'),async(req,res)=>{
    try{
      const o=(await q('SELECT id,location_id,status FROM orders WHERE id=$1',[req.params.id]))[0];
      if(!o)return res.status(404).json({error:'Order not found'});
      if(!['Paid','Processing','Packed','Ready for Dispatch','Dispatched'].includes(o.status))return res.status(400).json({error:'Order is not ready for physical-unit assignment'});
      const lineId=String(req.query.orderLineId||'').trim();
      const line=(await q('SELECT ol.id,ol.variant_id,ol.quantity,v.serialized,v.sku,v.variant_name,p.name product_name FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id JOIN products p ON p.id=v.product_id WHERE ol.id=$1 AND ol.order_id=$2',[lineId,o.id]))[0];
      if(!line)return res.status(404).json({error:'Order line not found'});
      if(!line.serialized)return res.status(400).json({error:'This order line is not serialized'});
      const assigned=(await q('SELECT os.id,su.id serialized_unit_id,su.serial_number,su.imei1,su.imei2,su.barcode,su.qr_code,su.status,su.location_id FROM order_serial_units os JOIN serialized_units su ON su.id=os.serialized_unit_id WHERE os.order_line_id=$1',[line.id]));
      const term=String(req.query.q||'').trim().slice(0,120);
      const params=[line.variant_id,o.location_id];
      let where="su.variant_id=$1 AND su.location_id=$2 AND su.status='In Stock'";
      if(term){params.push(`%${term}%`);where+=` AND (su.serial_number ILIKE $${params.length} OR su.imei1 ILIKE $${params.length} OR su.imei2 ILIKE $${params.length} OR su.barcode ILIKE $${params.length} OR su.qr_code ILIKE $${params.length})`;}
      const available=await q(`SELECT su.id serialized_unit_id,su.serial_number,su.imei1,su.imei2,su.barcode,su.qr_code,su.status,su.location_id,b.batch_number FROM serialized_units su LEFT JOIN inventory_batches b ON b.id=su.batch_id WHERE ${where} AND NOT EXISTS (SELECT 1 FROM order_serial_units os WHERE os.serialized_unit_id=su.id) ORDER BY su.created_at DESC LIMIT 100`,params);
      res.json({orderId:o.id,orderLineId:line.id,variantId:line.variant_id,quantity:Number(line.quantity),assigned,available});
    }catch(e){res.status(400).json({error:e.message})}
  });

  app.post('/api/orders/:id/serials',auth,need('orders.manage'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');
      const o=(await client.query("SELECT * FROM orders WHERE id=$1 AND status IN ('Paid','Processing','Packed','Ready for Dispatch','Dispatched') FOR UPDATE",[req.params.id])).rows[0];if(!o)throw new Error('Order is not available for serial assignment');
      const line=(await client.query('SELECT * FROM order_lines WHERE id=$1 AND order_id=$2 FOR SHARE',[req.body?.orderLineId,o.id])).rows[0];if(!line)throw new Error('Order line not found');
      const v=(await client.query('SELECT serialized,product_id FROM product_variants WHERE id=$1',[line.variant_id])).rows[0];if(!v?.serialized)throw new Error('This order line is not serialized');
      const assigned=(await client.query('SELECT count(*)::int c FROM order_serial_units WHERE order_line_id=$1',[line.id])).rows[0].c;if(assigned>=Number(line.quantity))throw new Error('All required serial units are already assigned');
      const su=(await client.query("SELECT * FROM serialized_units WHERE id=$1 AND variant_id=$2 AND location_id=$3 AND status='In Stock' AND NOT EXISTS (SELECT 1 FROM order_serial_units os WHERE os.serialized_unit_id=serialized_units.id) FOR UPDATE",[req.body?.serializedUnitId,line.variant_id,o.location_id])).rows[0];if(!su)throw new Error('Serialized unit is not available at the order location or is already assigned to another order');
      const r=(await client.query('INSERT INTO order_serial_units(order_line_id,serialized_unit_id,assigned_by) VALUES($1,$2,$3) RETURNING *',[line.id,su.id,req.user.id])).rows[0];
      await client.query("UPDATE serialized_units SET status='Reserved',updated_at=now() WHERE id=$1",[su.id]);
      await client.query('COMMIT');await audit(req.user,'ORDER_SERIAL_ASSIGNED','Order',o.id,`Assigned physical unit ${su.id} to ${o.order_no}`,null,r,req.req);res.status(201).json(r)
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(e.code==='23505'?409:400).json({error:e.code==='23505'?'That physical unit is already assigned to another order':e.message})}finally{client.release()}
  });

  app.delete('/api/orders/:id/serials/:assignmentId',auth,need('orders.manage'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');
      const o=(await client.query("SELECT * FROM orders WHERE id=$1 AND status IN ('Paid','Processing','Packed','Ready for Dispatch') FOR UPDATE",[req.params.id])).rows[0];if(!o)throw new Error('Order is not eligible for changing physical-unit assignment');
      const a=(await client.query('SELECT os.*,su.status unit_status,su.location_id FROM order_serial_units os JOIN serialized_units su ON su.id=os.serialized_unit_id JOIN order_lines ol ON ol.id=os.order_line_id WHERE os.id=$1 AND ol.order_id=$2 FOR UPDATE',[req.params.assignmentId,o.id])).rows[0];if(!a)throw new Error('Physical-unit assignment not found');
      if(a.unit_status!=='Reserved')throw new Error('Only a reserved physical unit can be unassigned here');const shipment=(await client.query("SELECT ds.shipment_no,ds.status FROM delivery_shipments ds JOIN delivery_shipment_serial_units dsu ON dsu.shipment_id=ds.id WHERE ds.order_id=$1 AND dsu.serialized_unit_id=$2 AND ds.status NOT IN ('Cancelled','Returned') LIMIT 1 FOR SHARE",[o.id,a.serialized_unit_id])).rows[0];if(shipment)throw new Error(`This physical unit is already attached to active delivery ${shipment.shipment_no} (${shipment.status})`);
      await client.query('DELETE FROM order_serial_units WHERE id=$1',[a.id]);
      await client.query("UPDATE serialized_units SET status='In Stock',updated_at=now() WHERE id=$1",[a.serialized_unit_id]);
      await client.query('COMMIT');await audit(req.user,'ORDER_SERIAL_UNASSIGNED','Order',o.id,`Unassigned physical unit ${a.serialized_unit_id} from ${o.order_no}`,a,null,req.req);res.json({ok:true,serializedUnitId:a.serialized_unit_id})
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/orders/:id/status',auth,need('orders.manage'),async(req,res)=>{
    const next=text(req.body?.status),client=await pool.connect();try{await client.query('BEGIN');const o=(await client.query('SELECT * FROM orders WHERE id=$1 FOR UPDATE',[req.params.id])).rows[0];if(!o)throw new Error('Order not found');if(!statuses.has(next)||!transitions[o.status]?.includes(next))throw new Error(`Cannot move order from ${o.status} to ${next}`);if(['Processing','Packed','Ready for Dispatch','Dispatched','Delivered'].includes(next)&&o.payment_status!=='Paid')throw new Error('Order must be fully paid before fulfillment');
if(next==='Dispatched'){const serialLines=(await client.query('SELECT ol.id,ol.quantity FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id WHERE ol.order_id=$1 AND v.serialized',[o.id])).rows;for(const line of serialLines){const assigned=(await client.query('SELECT count(*)::int c FROM order_serial_units WHERE order_line_id=$1',[line.id])).rows[0].c;if(assigned!==Number(line.quantity))throw new Error('Every serialized order line must have all physical units assigned before dispatch');}}

      if(next==='Cancelled'){if(o.fulfillment_status!=='Unfulfilled'&&o.status!=='Paid')throw new Error('Only unfulfilled orders can be cancelled');await releaseReservations(client,o.id,'Cancelled');await client.query("UPDATE serialized_units su SET status='In Stock',updated_at=now() FROM order_serial_units os JOIN order_lines ol ON ol.id=os.order_line_id WHERE os.serialized_unit_id=su.id AND ol.order_id=$1 AND su.status='Reserved'",[o.id]);}
      if(next==='Delivered'){
        const activeShipment=(await client.query("SELECT status FROM delivery_shipments WHERE order_id=$1 AND status NOT IN ('Cancelled','Returned') LIMIT 1 FOR SHARE",[o.id])).rows[0];
        if(activeShipment && activeShipment.status!=='Delivered')throw new Error(`This order has an active delivery shipment in ${activeShipment.status} status. Complete delivery through the Delivery workflow.`);
        await consumeOrder(client,o,req.user.id);await postOrderCompletionJournal(client,o,req.user.id)
      }
      const fulStatus=['Processing','Packed','Ready for Dispatch','Dispatched','Delivered'].includes(next)?next:(next==='Cancelled'?'Cancelled':'Unfulfilled');const u=(await client.query('UPDATE orders SET status=$1,fulfillment_status=$2,updated_at=now(),cancelled_at=CASE WHEN $1=\'Cancelled\' THEN now() ELSE cancelled_at END,cancellation_reason=CASE WHEN $1=\'Cancelled\' THEN $4 ELSE cancellation_reason END WHERE id=$3 RETURNING *',[next,fulStatus,o.id,text(req.body?.reason||req.body?.notes)])).rows[0];await client.query('INSERT INTO order_status_history(order_id,status,actor_id,notes) VALUES($1,$2,$3,$4)',[o.id,next,req.user.id,text(req.body?.notes)||`Order moved to ${next}`]);await client.query('COMMIT');await audit(req.user,'ORDER_STATUS_CHANGED','Order',o.id,`Moved ${o.order_no} to ${next}`,o,u,req.req);res.json(await orderById(o.id));
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/orders/:id/cancel',auth,need('orders.manage'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const o=(await client.query("SELECT * FROM orders WHERE id=$1 FOR UPDATE",[req.params.id])).rows[0];if(!o)throw new Error('Order not found');if(!['Pending Payment','Paid'].includes(o.status))throw new Error('Only pending or paid orders can be cancelled');const reason=text(req.body?.reason);if(reason.length<3)throw new Error('A cancellation reason is required');await releaseReservations(client,o.id,'Cancelled');await client.query("UPDATE serialized_units su SET status='In Stock',updated_at=now() FROM order_serial_units os JOIN order_lines ol ON ol.id=os.order_line_id WHERE os.serialized_unit_id=su.id AND ol.order_id=$1 AND su.status='Reserved'",[o.id]);const u=(await client.query("UPDATE orders SET status='Cancelled',fulfillment_status='Cancelled',cancelled_at=now(),cancellation_reason=$1,updated_at=now() WHERE id=$2 RETURNING *",[reason,o.id])).rows[0];await client.query('INSERT INTO order_status_history(order_id,status,actor_id,notes) VALUES($1,\'Cancelled\',$2,$3)',[o.id,req.user.id,reason]);await client.query('COMMIT');await audit(req.user,'ORDER_CANCELLED','Order',o.id,`Cancelled ${o.order_no}`,o,u,req.req);res.json(await orderById(o.id));}catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/orders/:id/fulfillment',auth,need('orders.manage'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const o=(await client.query("SELECT * FROM orders WHERE id=$1 FOR UPDATE",[req.params.id])).rows[0];if(!o)return res.status(404).json({error:'Order not found'});if(!['Processing','Packed','Ready for Dispatch','Dispatched'].includes(o.status))throw new Error('Order is not ready for fulfillment');const allowed=['Pending','Assigned','Picked Up','In Transit','Failed','Cancelled'];const status=text(req.body?.status)||'Pending';if(!allowed.includes(status))throw new Error('Invalid fulfillment status');const f=(await client.query('INSERT INTO order_fulfillments(order_id,method,tracking_number,carrier,assigned_to,status,notes) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[o.id,text(req.body?.method)||'Delivery',text(req.body?.trackingNumber),text(req.body?.carrier),req.body?.assignedTo||null,status,text(req.body?.notes)])).rows[0];await client.query('COMMIT');await audit(req.user,'ORDER_FULFILLMENT_CREATED','OrderFulfillment',f.id,`Created fulfillment for order ${o.order_no}`,null,f,req.req);res.status(201).json(f)}catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/orders/:id/convert-to-sale',auth,need('sales.create'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const o=(await client.query("SELECT * FROM orders WHERE id=$1 FOR UPDATE",[req.params.id])).rows[0];if(!o)throw new Error('Order not found');if(o.status!=='Paid')throw new Error('Only fully paid orders can be converted to a sale');const linked=(await client.query('SELECT sales_id FROM sales_order_links WHERE order_id=$1',[o.id])).rows[0];if(linked){await client.query('ROLLBACK');return res.json(await orderById(o.id))}
      const payments=(await client.query("SELECT method,amount,reference FROM order_payments WHERE order_id=$1 AND status='Completed' ORDER BY created_at",[o.id])).rows;const paid=money(payments.reduce((s,p)=>s+Number(p.amount),0));if(Math.abs(paid-Number(o.grand_total))>0.009)throw new Error('Order payment total is inconsistent with order total');
      const sale=(await client.query(`INSERT INTO sales(sale_no,customer_id,location_id,status,subtotal,discount_amount,tax_amount,grand_total,currency,cashier_id,notes,order_id) VALUES($1,$2,$3,'Completed',$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,[saleNo(),o.customer_id,o.location_id,o.subtotal,o.discount_amount,o.tax_amount,o.grand_total,o.currency,req.user.id,`Converted from order ${o.order_no}`,o.id])).rows[0];
      const lines=(await client.query('SELECT ol.*,v.serialized,v.track_inventory,v.cost_price FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id WHERE ol.order_id=$1 FOR UPDATE',[o.id])).rows;
      for(const l of lines){const sl=(await client.query('INSERT INTO sale_lines(sale_id,variant_id,quantity,unit_price,discount_amount,tax_rate,tax_amount,line_total,cost_price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id',[sale.id,l.variant_id,l.quantity,l.unit_price,l.discount_amount,l.tax_rate,l.tax_amount,l.line_total,l.cost_price])).rows[0];const serial=(await client.query('SELECT serialized_unit_id FROM order_serial_units WHERE order_line_id=$1',[l.id])).rows[0];if(l.serialized){if(!serial)throw new Error(`Serialized order line ${l.id} has no assigned IMEI/serial`);await client.query('INSERT INTO sale_serial_units(sale_line_id,serialized_unit_id) VALUES($1,$2)',[sl.id,serial.serialized_unit_id])}}
      for(const p of payments)await client.query('INSERT INTO sale_payments(sale_id,method,amount,reference,received_by) VALUES($1,$2,$3,$4,$5)',[sale.id,p.method,p.amount,p.reference,req.user.id]);
      const receipt=(await client.query('INSERT INTO sale_receipts(sale_id,receipt_no,issued_by) VALUES($1,$2,$3) RETURNING *',[sale.id,receiptNo(),req.user.id])).rows[0];
      await client.query('INSERT INTO sale_status_history(sale_id,status,actor_id,notes) VALUES($1,\'Completed\',$2,$3)',[sale.id,req.user.id,`Converted from order ${o.order_no}`]);
      await client.query('INSERT INTO sales_order_links(sales_id,order_id) VALUES($1,$2)',[sale.id,o.id]);
      const _consumeResult=await consumeOrder(client,o,req.user.id);
      const orderJournalId=await postOrderCompletionJournal(client,o,req.user.id);
      await client.query('INSERT INTO finance_sync_log(source_type,source_id,journal_id) VALUES($1,$2,$3) ON CONFLICT DO NOTHING',['Sale',String(sale.id),orderJournalId]);
      await client.query("UPDATE orders SET status='Delivered',fulfillment_status='Delivered',updated_at=now() WHERE id=$1",[o.id]);
      await client.query("INSERT INTO order_status_history(order_id,status,actor_id,notes) VALUES($1,'Delivered',$2,$3)",[o.id,req.user.id,`Converted ${o.order_no} to retail sale and fulfilled`]);
      await client.query('COMMIT');await audit(req.user,'ORDER_CONVERTED_TO_SALE','Order',o.id,`Converted ${o.order_no} to ${sale.sale_no}`,o,{saleId:sale.id,receiptId:receipt.id},req.req);res.status(201).json({sale,receipt,order:await orderById(o.id)});
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });

  app.post('/api/orders/:id/refund',auth,need('returns.manage'),async(req,res)=>{
    const client=await pool.connect();try{await client.query('BEGIN');const o=(await client.query("SELECT * FROM orders WHERE id=$1 FOR UPDATE",[req.params.id])).rows[0];if(!o)throw new Error('Order not found');if(!['Paid','Delivered','Returned','Cancelled'].includes(o.status))throw new Error('Order is not eligible for a refund handoff');const lines=(await client.query('SELECT ol.*,v.serialized FROM order_lines ol JOIN product_variants v ON v.id=ol.variant_id WHERE ol.order_id=$1',[o.id])).rows;const returnLines=[];for(const l of lines){const serial=(await client.query('SELECT serialized_unit_id FROM order_serial_units WHERE order_line_id=$1',[l.id])).rows[0];returnLines.push({orderLineId:l.id,variantId:l.variant_id,quantity:l.quantity,unitPrice:l.unit_price,serializedUnitId:serial?.serialized_unit_id||null,disposition:o.status==='Cancelled'?'Scrap':'Restock',reason:text(req.body?.reason)||'Order refund request'})}
      await client.query('ROLLBACK');
      const base=String(req.headers.host||'').trim();if(!base)throw new Error('Unable to create return handoff');
      const url=`http://127.0.0.1:${process.env.PORT||4000}/api/returns`;const headers={'content-type':'application/json'};if(req.headers.authorization)headers.authorization=req.headers.authorization;if(req.headers.cookie){headers.cookie=req.headers.cookie;const csrf=(String(req.headers.cookie).split(';').map(x=>x.trim()).find(x=>x.startsWith('amaal_csrf='))||'').slice('amaal_csrf='.length);if(csrf)headers['x-csrf-token']=decodeURIComponent(csrf)}
      const r=await fetch(url,{method:'POST',headers,body:JSON.stringify({orderId:o.id,locationId:o.location_id,refundMethod:req.body?.refundMethod||'Original Payment',reason:req.body?.reason||'Order refund request',notes:req.body?.notes||'',lines:returnLines})});const data=await r.json().catch(()=>({}));if(!r.ok)return res.status(r.status).json(data);res.status(201).json(data);
    }catch(e){try{await client.query('ROLLBACK')}catch{}res.status(400).json({error:e.message})}finally{client.release()}
  });


  return {postOrderCompletionFinance: postOrderCompletionJournal};
}
