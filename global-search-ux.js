export function registerGlobalSearchUX({app,auth,need,q}){
 const esc=(v)=>String(v??'').replace(/[%_\\]/g,'\\$&');
 const text=(v)=>String(v??'').trim().slice(0,120);
 const sources=[
  ['Product',`SELECT p.id,p.name title,COALESCE(b.name,'') subtitle,COALESCE(p.status,'') status,'catalog' module,CASE WHEN p.name ILIKE $2 THEN 100 WHEN p.slug ILIKE $2 THEN 90 WHEN COALESCE(b.name,'') ILIKE $2 THEN 80 WHEN EXISTS(SELECT 1 FROM product_variants v WHERE v.product_id=p.id AND v.sku ILIKE $2) THEN 85 ELSE 50 END score FROM products p LEFT JOIN brands b ON b.id=p.brand_id WHERE p.name ILIKE $1 OR p.slug ILIKE $1 OR COALESCE(b.name,'') ILIKE $1 OR EXISTS(SELECT 1 FROM product_variants v WHERE v.product_id=p.id AND v.sku ILIKE $1) ORDER BY score DESC,p.updated_at DESC LIMIT 15`,2],
  ['Customer',`SELECT c.id,c.name title,concat_ws(' · ',c.customer_no,c.phone,c.email) subtitle,COALESCE(c.status,'') status,'customers' module,CASE WHEN c.customer_no ILIKE $2 THEN 100 WHEN c.phone ILIKE $2 OR c.email ILIKE $2 THEN 95 WHEN c.name ILIKE $2 THEN 90 ELSE 50 END score FROM customers c WHERE c.name ILIKE $1 OR c.customer_no ILIKE $1 OR COALESCE(c.phone,'') ILIKE $1 OR COALESCE(c.email,'') ILIKE $1 ORDER BY score DESC,c.updated_at DESC LIMIT 15`,2],
  ['Supplier',`SELECT s.id,s.legal_name title,concat_ws(' · ',s.supplier_code,s.email,s.phone) subtitle,COALESCE(s.status,'') status,'procurement' module,CASE WHEN s.supplier_code ILIKE $2 THEN 100 WHEN s.email ILIKE $2 OR s.phone ILIKE $2 THEN 95 WHEN s.legal_name ILIKE $2 THEN 90 ELSE 50 END score FROM suppliers s WHERE s.legal_name ILIKE $1 OR s.supplier_code ILIKE $1 OR COALESCE(s.email,'') ILIKE $1 OR COALESCE(s.phone,'') ILIKE $1 ORDER BY score DESC,s.updated_at DESC LIMIT 15`,2],
  ['Sale',`SELECT s.id,s.sale_no title,concat_ws(' · ',COALESCE(c.name,'Walk-in'),s.status) subtitle,COALESCE(s.status,'') status,'sales' module,CASE WHEN s.sale_no ILIKE $2 THEN 100 WHEN COALESCE(c.name,'') ILIKE $2 THEN 80 ELSE 50 END score FROM sales s LEFT JOIN customers c ON c.id=s.customer_id WHERE s.sale_no ILIKE $1 OR COALESCE(c.name,'') ILIKE $1 ORDER BY score DESC,s.created_at DESC LIMIT 15`,2],
  ['Order',`SELECT o.id,o.order_no title,concat_ws(' · ',COALESCE(c.name,'Walk-in'),o.status) subtitle,COALESCE(o.status,'') status,'orders' module,CASE WHEN o.order_no ILIKE $2 THEN 100 WHEN COALESCE(c.name,'') ILIKE $2 THEN 80 ELSE 50 END score FROM orders o LEFT JOIN customers c ON c.id=o.customer_id WHERE o.order_no ILIKE $1 OR COALESCE(c.name,'') ILIKE $1 ORDER BY score DESC,o.created_at DESC LIMIT 15`,2],
  ['IMEI / Serial',`SELECT su.id,COALESCE(su.imei1,su.imei2,su.serial_number) title,concat_ws(' · ',v.sku,su.status) subtitle,COALESCE(su.status,'') status,'inventory' module,CASE WHEN su.imei1 ILIKE $2 OR su.imei2 ILIKE $2 OR su.serial_number ILIKE $2 THEN 100 ELSE 50 END score FROM serialized_units su JOIN product_variants v ON v.id=su.variant_id WHERE COALESCE(su.imei1,'') ILIKE $1 OR COALESCE(su.imei2,'') ILIKE $1 OR COALESCE(su.serial_number,'') ILIKE $1 ORDER BY score DESC LIMIT 15`,2],
  ['Document',`SELECT d.id,d.name title,concat_ws(' · ',d.entity_type,d.status) subtitle,COALESCE(d.status,'') status,'documents' module,CASE WHEN d.name ILIKE $2 THEN 100 ELSE 70 END score FROM documents d WHERE d.name ILIKE $1 OR COALESCE(d.description,'') ILIKE $1 ORDER BY score DESC,d.updated_at DESC LIMIT 15`,2],
  ['Requisition',`SELECT r.id,r.requisition_no title,concat_ws(' · ',r.priority,r.status) subtitle,r.status status,'procurement' module,CASE WHEN r.requisition_no ILIKE $2 THEN 100 ELSE 70 END score FROM purchase_requisitions r WHERE r.requisition_no ILIKE $1 OR r.justification ILIKE $1 ORDER BY score DESC,r.created_at DESC LIMIT 10`,2],
  ['Supplier Invoice',`SELECT i.id,i.invoice_no title,concat_ws(' · ',s.legal_name,i.status) subtitle,i.status status,'procurement' module,CASE WHEN i.invoice_no ILIKE $2 THEN 100 WHEN s.legal_name ILIKE $2 THEN 80 ELSE 60 END score FROM supplier_invoices i JOIN suppliers s ON s.id=i.supplier_id WHERE i.invoice_no ILIKE $1 OR s.legal_name ILIKE $1 ORDER BY score DESC,i.created_at DESC LIMIT 10`,2],
  ['Delivery',`SELECT d.id,d.shipment_no title,concat_ws(' · ',d.tracking_number,d.status) subtitle,d.status status,'delivery' module,CASE WHEN d.shipment_no ILIKE $2 OR d.tracking_number ILIKE $2 THEN 100 ELSE 70 END score FROM delivery_shipments d WHERE d.shipment_no ILIKE $1 OR d.tracking_number ILIKE $1 OR d.recipient_name ILIKE $1 OR d.recipient_phone ILIKE $1 ORDER BY score DESC,d.created_at DESC LIMIT 10`,2],
  ['Warranty Claim',`SELECT w.id,w.claim_no title,concat_ws(' · ',c.name,w.status) subtitle,w.status status,'warranty' module,CASE WHEN w.claim_no ILIKE $2 THEN 100 WHEN COALESCE(c.name,'') ILIKE $2 THEN 80 ELSE 60 END score FROM warranty_claims w LEFT JOIN customers c ON c.id=w.customer_id WHERE w.claim_no ILIKE $1 OR w.issue ILIKE $1 OR COALESCE(c.name,'') ILIKE $1 ORDER BY score DESC,w.created_at DESC LIMIT 10`,2],
  ['Return',`SELECT r.id,r.return_no title,concat_ws(' · ',r.reason,r.status) subtitle,r.status status,'returns' module,CASE WHEN r.return_no ILIKE $2 THEN 100 ELSE 70 END score FROM return_requests r LEFT JOIN customers c ON c.id=r.customer_id WHERE r.return_no ILIKE $1 OR r.reason ILIKE $1 OR COALESCE(c.name,'') ILIKE $1 ORDER BY score DESC,r.created_at DESC LIMIT 10`,2],
  ['Credit Account',`SELECT a.id,a.account_no title,concat_ws(' · ',c.name,a.status) subtitle,a.status status,'credit' module,CASE WHEN a.account_no ILIKE $2 THEN 100 WHEN c.name ILIKE $2 THEN 80 ELSE 60 END score FROM credit_accounts a JOIN customers c ON c.id=a.customer_id WHERE a.account_no ILIKE $1 OR c.name ILIKE $1 ORDER BY score DESC,a.opened_at DESC LIMIT 10`,2],
  ['Finance Journal',`SELECT j.id,j.journal_no title,concat_ws(' · ',j.source_type,j.status) subtitle,j.status status,'finance' module,CASE WHEN j.journal_no ILIKE $2 OR j.source_ref ILIKE $2 THEN 100 ELSE 70 END score FROM finance_journals j WHERE j.journal_no ILIKE $1 OR j.description ILIKE $1 OR j.source_ref ILIKE $1 ORDER BY score DESC,j.created_at DESC LIMIT 10`,2]
 ];
 app.get('/api/global-search',auth,need('search.view'),async(req,res,next)=>{
  try{
   const term=text(req.query.q); const limit=Math.min(Math.max(Number(req.query.limit)||30,1),100);
   if(term.length<2)return res.json({query:term,results:[],total:0,minimumLength:2});
   const exact=esc(term), p=`%${exact}%`, exactPattern=exact.replace(/\\%/g,'')+'%';
   const settled=await Promise.allSettled(sources.map(([,sql])=>q(sql,[p,exactPattern])));
   const results=[]; const failures=[];
   settled.forEach((r,i)=>{if(r.status==='fulfilled')r.value.forEach(row=>results.push({...row,type:sources[i][0]}));else failures.push(sources[i][0])});
   results.sort((a,b)=>Number(b.score||0)-Number(a.score||0)||String(a.type).localeCompare(String(b.type))||String(a.title).localeCompare(String(b.title)));
   res.json({query:term,results:results.slice(0,limit),total:results.length,partial:failures.length>0,failedSources:failures});
  }catch(e){next(e)}
 });
 app.get('/api/global-search/health',auth,need('search.view'),async(_req,res,next)=>{
  try{
   const checks=await Promise.allSettled(['products','customers','suppliers','sales','orders','documents'].map(t=>q(`SELECT count(*)::int c FROM ${t}`)));
   const indexedSources={}; checks.forEach((r,i)=>{indexedSources[['products','customers','suppliers','sales','orders','documents'][i]]=r.status==='fulfilled'?r.value[0].c:null});
   res.json({ok:checks.every(r=>r.status==='fulfilled'),indexedSources,checkedAt:new Date().toISOString()});
  }catch(e){next(e)}
 });
}
