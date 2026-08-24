import crypto from 'crypto';

export function registerAIBusinessIntelligence({app,auth,need,q,pool,audit,superAdminOnly}){
  const MODEL_FALLBACK='gemini-3.7-flash';
  const publicWindow=new Map();

  const text=v=>String(v??'').trim();
  const dateOnly=v=>{const s=text(v);return /^\d{4}-\d{2}-\d{2}$/.test(s)?s:null};
  function range(req){
    const end=dateOnly(req.query.end)||new Date().toISOString().slice(0,10);
    const start=dateOnly(req.query.start)||new Date(Date.now()-29*86400000).toISOString().slice(0,10);
    return start<=end?{start,end}:{start:end,end:start};
  }
  function publicRateLimit(req){
    const now=Date.now(), key=req.ip||'unknown', row=publicWindow.get(key)||{count:0,start:now};
    if(now-row.start>60000){row.count=0;row.start=now;}
    row.count++; publicWindow.set(key,row);
    return row.count<=20;
  }
  function parseJson(v, fallback={}){try{return typeof v==='string'?JSON.parse(v):v??fallback}catch{return fallback}}
  function getApiKey(){return process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY||''}
  function safeModel(m){return /^gemini-[a-z0-9.\-]+$/i.test(text(m))?text(m):MODEL_FALLBACK}

  async function config(){return (await q('SELECT * FROM ai_configuration WHERE id=true'))[0]||null}
  async function trainingContext(){
    return q("SELECT title,instruction,expected_behavior FROM ai_training_examples WHERE active=true ORDER BY created_at DESC LIMIT 25");
  }
  async function callGemini({systemPrompt,input,model}){
    const key=getApiKey();
    if(!key) throw new Error('Gemini is not configured. Add GEMINI_API_KEY as a server-side Render secret.');
    const response=await fetch('https://generativelanguage.googleapis.com/v1/interactions',{
      method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':key},
      body:JSON.stringify({model:safeModel(model),store:false,system_instruction:systemPrompt,input})
    });
    const body=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(body?.error?.message||`Gemini request failed (${response.status})`);
    const out=text(body.output_text)||text(body.steps?.slice?.().reverse?.().find?.(x=>x.type==='model_output')?.content?.find?.(x=>x.type==='text')?.text);
    if(!out) throw new Error('Gemini returned no text output');
    return {text:out,raw:body};
  }

  async function businessSnapshot(start,end){
    const [sales,margin,inventory,delivery,warranty,credit,procurement,finance,orders,returns]=await Promise.all([
      q("SELECT COALESCE(sum(grand_total),0)::numeric revenue,count(*)::int transactions,COALESCE(sum(discount_amount),0)::numeric discounts FROM sales WHERE status='Completed' AND created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COALESCE(sum((sl.unit_price*sl.quantity)-sl.discount_amount),0)::numeric revenue,COALESCE(sum(sl.cost_price*sl.quantity),0)::numeric cost,COALESCE(sum(((sl.unit_price*sl.quantity)-sl.discount_amount)-(sl.cost_price*sl.quantity)),0)::numeric gross_margin FROM sale_lines sl JOIN sales s ON s.id=sl.sale_id WHERE s.status='Completed' AND s.created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COALESCE(sum(b.on_hand*COALESCE(v.cost_price,0)),0)::numeric stock_value,COALESCE(sum(b.on_hand),0)::numeric units,COUNT(DISTINCT b.variant_id)::int variants FROM inventory_balances b JOIN product_variants v ON v.id=b.variant_id"),
      q("SELECT count(*)::int shipments,COALESCE(sum(unit_count),0)::numeric units,COALESCE(sum(total_delivery_cost),0)::numeric cost,count(*) FILTER(WHERE status='Delivered')::int delivered FROM delivery_shipments WHERE created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT count(*)::int claims,count(*) FILTER(WHERE status IN ('Resolved','Cancelled'))::int closed,count(*) FILTER(WHERE status NOT IN ('Resolved','Cancelled'))::int open,COALESCE(avg(EXTRACT(EPOCH FROM (COALESCE(resolved_at,now())-created_at))/86400),0)::numeric avg_days FROM warranty_claims WHERE created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COALESCE(sum(outstanding_principal),0)::numeric outstanding,count(*)::int accounts,count(*) FILTER(WHERE status='Defaulted')::int defaulted FROM credit_accounts WHERE status IN ('Active','Defaulted','Restructured')"),
      q("SELECT count(DISTINCT p.id)::int orders,COALESCE(sum((l.quantity*l.unit_price)-l.discount_amount),0)::numeric merchandise_value FROM purchase_orders p JOIN purchase_order_lines l ON l.purchase_order_id=p.id WHERE p.status<>'Cancelled' AND p.created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT COALESCE(sum(CASE WHEN a.account_type='Revenue' THEN l.credit-l.debit WHEN a.account_type='Expense' THEN l.debit-l.credit ELSE 0 END),0)::numeric net_activity FROM finance_journal_lines l JOIN finance_accounts a ON a.id=l.account_id JOIN finance_journals j ON j.id=l.journal_id WHERE j.status='Posted' AND j.journal_date BETWEEN $1 AND $2",[start,end]),
      q("SELECT count(*)::int total,count(*) FILTER(WHERE status IN ('Pending Payment','Paid','Processing','Packed','Ready for Dispatch','Dispatched'))::int open FROM orders WHERE created_at::date BETWEEN $1 AND $2",[start,end]),
      q("SELECT count(*)::int total,COALESCE(sum(refund_amount),0)::numeric refunded FROM return_requests WHERE created_at::date BETWEEN $1 AND $2",[start,end])
    ]);
    return {range:{start,end},sales:sales[0],margin:margin[0],inventory:inventory[0],delivery:delivery[0],warranty:warranty[0],credit:credit[0],procurement:procurement[0],finance:finance[0],orders:orders[0],returns:returns[0]};
  }

  async function generateReport({reportType='executive',start,end,generatedBy=null}){
    const c=await config();
    if(!c?.enabled) throw new Error('AI Business Intelligence is disabled by Super Admin.');
    const r=await businessSnapshot(start,end);
    const examples=await trainingContext();
    const prompt=`REPORT TYPE: ${reportType}\nPERIOD: ${start} to ${end}\n\nLIVE BUSINESS SNAPSHOT (source of truth):\n${JSON.stringify(r,null,2)}\n\nGOVERNED TRAINING EXAMPLES:\n${JSON.stringify(examples,null,2)}\n\n${c.report_prompt}\nReturn a management-ready report with clear headings and no fabricated figures.`;
    try{
      const out=await callGemini({systemPrompt:c.system_prompt,input:prompt,model:c.model});
      const title=`Amaal Telecoms AI ${reportType} report — ${end}`;
      const saved=(await q('INSERT INTO ai_generated_reports(report_type,period_start,period_end,model,title,content,data_snapshot,status,generated_by) VALUES($1,$2,$3,$4,$5,$6,$7,\'Completed\',$8) RETURNING *',[reportType,start,end,safeModel(c.model),title,out.text,JSON.stringify(r),generatedBy]))[0];
      if(generatedBy===null){
        const admins=await q("SELECT DISTINCT u.id FROM users u JOIN user_roles ur ON ur.user_id=u.id JOIN roles ro ON ro.id=ur.role_id WHERE u.status='Active' AND ro.name='Super Admin'");
        for(const a of admins) await pool.query('INSERT INTO notifications(user_id,title,body) VALUES($1,$2,$3)',[a.id,'AI business report ready',`A new ${reportType} report for ${start} to ${end} is available in AI Business Intelligence.`]);
      }
      return saved;
    }catch(e){
      await q('INSERT INTO ai_generated_reports(report_type,period_start,period_end,model,title,content,data_snapshot,status,error_message,generated_by) VALUES($1,$2,$3,$4,$5,$6,$7,\'Failed\',$8,$9)',[reportType,start,end,safeModel(c?.model),`Amaal Telecoms AI ${reportType} report`, '',JSON.stringify(r),e.message,generatedBy]);
      throw e;
    }
  }

  app.get('/api/ai/health',auth,need('ai.view'),async(req,res)=>{
    const c=await config();res.json({enabled:Boolean(c?.enabled),configured:Boolean(getApiKey()),model:safeModel(c?.model),api:'Gemini Interactions API',serverSideKey:true});
  });
  app.get('/api/ai/config',auth,need('ai.view'),async(req,res)=>{const c=await config();res.json({...c,geminiKeyConfigured:Boolean(getApiKey())});});
  app.patch('/api/ai/config',auth,need('ai.manage'),superAdminOnly,async(req,res)=>{
    const b=req.body||{}; const current=await config();
    const next={enabled:b.enabled===undefined?current.enabled:Boolean(b.enabled),model:safeModel(b.model||current.model),system_prompt:text(b.systemPrompt||current.system_prompt).slice(0,12000),public_system_prompt:text(b.publicSystemPrompt||current.public_system_prompt).slice(0,12000),report_prompt:text(b.reportPrompt||current.report_prompt).slice(0,12000)};
    const r=(await q('UPDATE ai_configuration SET enabled=$1,model=$2,system_prompt=$3,public_system_prompt=$4,report_prompt=$5,updated_by=$6,updated_at=now() WHERE id=true RETURNING *',[next.enabled,next.model,next.system_prompt,next.public_system_prompt,next.report_prompt,req.user.id]))[0];
    await audit(req.user,'AI_CONFIGURATION_UPDATED','AIConfiguration','true','Updated governed AI configuration',current,r,req.req);res.json(r);
  });
  app.get('/api/ai/training',auth,need('ai.view'),async(req,res)=>res.json(await q('SELECT id,title,instruction,expected_behavior,active,created_at,updated_at FROM ai_training_examples ORDER BY created_at DESC')));
  app.post('/api/ai/training',auth,need('ai.manage'),superAdminOnly,async(req,res)=>{const b=req.body||{};if(!text(b.title)||!text(b.instruction)||!text(b.expectedBehavior))return res.status(400).json({error:'Title, instruction and expected behavior are required'});const r=(await q('INSERT INTO ai_training_examples(title,instruction,expected_behavior,created_by,updated_by) VALUES($1,$2,$3,$4,$4) RETURNING *',[text(b.title).slice(0,160),text(b.instruction).slice(0,8000),text(b.expectedBehavior).slice(0,8000),req.user.id]))[0];await audit(req.user,'AI_TRAINING_ADDED','AITrainingExample',r.id,'Added a governed AI training example',null,r,req.req);res.status(201).json(r)});
  app.patch('/api/ai/training/:id',auth,need('ai.manage'),superAdminOnly,async(req,res)=>{const old=(await q('SELECT * FROM ai_training_examples WHERE id=$1',[req.params.id]))[0];if(!old)return res.status(404).json({error:'Training example not found'});const b=req.body||{};const r=(await q('UPDATE ai_training_examples SET title=COALESCE($1,title),instruction=COALESCE($2,instruction),expected_behavior=COALESCE($3,expected_behavior),active=COALESCE($4,active),updated_by=$5,updated_at=now() WHERE id=$6 RETURNING *',[b.title?text(b.title).slice(0,160):null,b.instruction?text(b.instruction).slice(0,8000):null,b.expectedBehavior?text(b.expectedBehavior).slice(0,8000):null,b.active===undefined?null:Boolean(b.active),req.user.id,req.params.id]))[0];await audit(req.user,'AI_TRAINING_UPDATED','AITrainingExample',r.id,'Updated a governed AI training example',old,r,req.req);res.json(r)});
  app.delete('/api/ai/training/:id',auth,need('ai.manage'),superAdminOnly,async(req,res)=>{const old=(await q('DELETE FROM ai_training_examples WHERE id=$1 RETURNING *',[req.params.id]))[0];if(!old)return res.status(404).json({error:'Training example not found'});await audit(req.user,'AI_TRAINING_DELETED','AITrainingExample',old.id,'Deleted a governed AI training example',old,null,req.req);res.json({ok:true})});
  app.get('/api/ai/reports',auth,need('ai.reports'),async(req,res)=>res.json(await q('SELECT id,report_type,period_start,period_end,model,title,content,status,error_message,generated_by,created_at FROM ai_generated_reports ORDER BY created_at DESC LIMIT 100')));
  app.post('/api/ai/reports/generate',auth,need('ai.reports'),async(req,res)=>{const {start,end}=range(req);try{const r=await generateReport({reportType:text(req.body?.reportType||'executive'),start,end,generatedBy:req.user.id});await audit(req.user,'AI_REPORT_GENERATED','AIReport',r.id,'Generated AI management report',null,r,req.req);res.status(201).json(r)}catch(e){res.status(502).json({error:e.message})}});
  app.get('/api/ai/schedules',auth,need('ai.view'),async(req,res)=>res.json(await q('SELECT * FROM ai_report_schedules ORDER BY name')));
  app.post('/api/ai/schedules',auth,need('ai.manage'),superAdminOnly,async(req,res)=>{const b=req.body||{};const cadence=Math.max(15,Number(b.cadenceMinutes||1440));const r=(await q('INSERT INTO ai_report_schedules(name,report_type,cadence_minutes,enabled,next_run_at,recipients_json,created_by,updated_by) VALUES($1,$2,$3,$4,now(),$5,$6,$6) RETURNING *',[text(b.name).slice(0,160),text(b.reportType||'executive'),cadence,b.enabled===undefined?true:Boolean(b.enabled),JSON.stringify(Array.isArray(b.recipients)?b.recipients:[]),req.user.id]))[0];await audit(req.user,'AI_SCHEDULE_CREATED','AIReportSchedule',r.id,'Created AI report schedule',null,r,req.req);res.status(201).json(r)});
  app.patch('/api/ai/schedules/:id',auth,need('ai.manage'),superAdminOnly,async(req,res)=>{const b=req.body||{};const r=(await q('UPDATE ai_report_schedules SET name=COALESCE($1,name),report_type=COALESCE($2,report_type),cadence_minutes=COALESCE($3,cadence_minutes),enabled=COALESCE($4,enabled),next_run_at=COALESCE($5,next_run_at),recipients_json=COALESCE($6,recipients_json),updated_by=$7,updated_at=now() WHERE id=$8 RETURNING *',[b.name?text(b.name).slice(0,160):null,b.reportType?text(b.reportType):null,b.cadenceMinutes?Math.max(15,Number(b.cadenceMinutes)):null,b.enabled===undefined?null:Boolean(b.enabled),b.nextRunAt||null,b.recipients?JSON.stringify(b.recipients):null,req.user.id,req.params.id]))[0];if(!r)return res.status(404).json({error:'Schedule not found'});res.json(r)});

  app.post('/api/public/ai/ask',async(req,res)=>{
    if(!publicRateLimit(req))return res.status(429).json({error:'Too many AI requests. Please try again shortly.'});
    const question=text(req.body?.question);if(question.length<2||question.length>2000)return res.status(400).json({error:'Question must be between 2 and 2000 characters.'});
    const c=await config();if(!c?.enabled)return res.status(503).json({error:'Customer AI assistant is temporarily unavailable.'});
    const products=await q("SELECT p.name product_name,p.short_description,p.description,p.status,p.website_visibility,v.sku,v.variant_name,v.selling_price,(SELECT pi.url FROM product_images pi WHERE pi.product_id=p.id ORDER BY pi.is_primary DESC,pi.sort_order,pi.created_at LIMIT 1) image_url FROM products p JOIN product_variants v ON v.product_id=p.id WHERE p.status='Active' AND p.website_visibility='Published' AND v.status='Active' ORDER BY p.name LIMIT 80");
    const publicPrompt=`CUSTOMER QUESTION:\n${question}\n\nAPPROVED PUBLIC CATALOG DATA:\n${JSON.stringify(products)}\n\nAnswer the customer helpfully. If the requested information is not present, say so and direct them to contact Amaal Telecoms. Do not reveal internal fields, staff data, customers, security data, finance, inventory balances, supplier data or audit data.`;
    try{const out=await callGemini({systemPrompt:c.public_system_prompt,input:publicPrompt,model:c.model});res.json({answer:out.text,model:safeModel(c.model)})}catch(e){res.status(502).json({error:'Customer AI is temporarily unavailable.'})}
  });

  let running=false;
  async function scheduler(){
    if(running||!getApiKey())return; running=true;
    try{
      const due=await q("SELECT * FROM ai_report_schedules WHERE enabled=true AND next_run_at<=now() ORDER BY next_run_at LIMIT 3");
      for(const s of due){
        const end=new Date().toISOString().slice(0,10), start=new Date(Date.now()-29*86400000).toISOString().slice(0,10);
        try{await generateReport({reportType:s.report_type,start,end,generatedBy:null});await pool.query('UPDATE ai_report_schedules SET last_run_at=now(),next_run_at=now()+($1 || \' minutes\')::interval,updated_at=now() WHERE id=$2',[Number(s.cadence_minutes),s.id]);}
        catch(e){await pool.query('UPDATE ai_report_schedules SET last_run_at=now(),next_run_at=now()+($1 || \' minutes\')::interval,updated_at=now() WHERE id=$2',[Number(s.cadence_minutes),s.id]);}
      }
    }finally{running=false}
  }
  setInterval(()=>scheduler().catch(()=>{}),5*60*1000).unref();
  return {generateReport};
}
