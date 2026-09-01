import process from 'process';

const base=String(process.env.PRODUCTION_BASE_URL||'').trim().replace(/\/$/,'');
const cookie=String(process.env.SMOKE_SESSION_COOKIE||'').trim();
const start=String(process.env.SMOKE_START||new Date(Date.now()-29*86400000).toISOString().slice(0,10));
const end=String(process.env.SMOKE_END||new Date().toISOString().slice(0,10));

if(!base){
  console.error(JSON.stringify({overall:'ConfigurationRequired',error:'Set PRODUCTION_BASE_URL before running the production smoke test.'},null,2));
  process.exit(2);
}

let origin;
try{origin=new URL(base);}catch{
  console.error(JSON.stringify({overall:'ConfigurationRequired',error:'PRODUCTION_BASE_URL must be a valid absolute URL.'},null,2));
  process.exit(2);
}

const checks=[];
const add=(name,status,detail)=>checks.push({name,status,detail});

async function get(path,authenticated=false){
  const headers={accept:'application/json'};
  if(authenticated&&cookie)headers.cookie=cookie;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),15000);
  try{
    const r=await fetch(base+path,{headers,redirect:'manual',signal:controller.signal});
    const text=await r.text();
    let body={};try{body=text?JSON.parse(text):{};}catch{body={};}
    return {r,body};
  }finally{clearTimeout(timer);}
}

try{
  const h=await get('/healthz');
  add('Public health endpoint',h.r.status===200&&h.body?.status==='ok'?'Healthy':'Critical',`HTTP ${h.r.status}`);
  const ah=await get('/api/health');
  add('Application/database health',ah.r.status===200&&ah.body?.ok===true?'Healthy':'Critical',`HTTP ${ah.r.status}`);

  const root=await get('/');
  const csp=root.r.headers.get('content-security-policy')||'';
  const xcto=root.r.headers.get('x-content-type-options')||'';
  const xfo=root.r.headers.get('x-frame-options')||'';
  add('Security headers',csp.includes("frame-ancestors 'none'")&&xcto.toLowerCase()==='nosniff'&&xfo.toUpperCase()==='DENY'?'Healthy':'Warning','CSP, X-Content-Type-Options and X-Frame-Options checked.');
  add('HTTPS',origin.protocol==='https:'?'Healthy':'Critical','Production base URL must use HTTPS.');

  if(!cookie){
    add('Authenticated smoke suite','Skipped','Set SMOKE_SESSION_COOKIE to run non-mutating authenticated module checks.');
  }else{
    const authChecks=[
      ['/api/me','Authentication/session'],
      ['/api/dashboard','Dashboard'],
      [`/api/sales/summary?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,'Sales/date range'],
      ['/api/inventory/overview','Inventory'],
      ['/api/procurement/requisitions','Procurement'],
      [`/api/finance/summary?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,'Finance/date range'],
      [`/api/finance/journals?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`,'Finance journals/date range'],
      ['/api/media/folders','Media Management'],
      ['/api/web/sites','Web & Hosting'],
      ['/api/integration-health','Integration Hub'],
      ['/api/ai/health','AI']
    ];
    for(const [path,name] of authChecks){
      try{
        const x=await get(path,true);
        add(name,x.r.ok?'Healthy':(x.r.status===403||x.r.status===404?'Warning':'Critical'),`HTTP ${x.r.status}`);
      }catch(e){add(name,'Critical',e.message);}
    }
  }
}catch(e){add('Smoke runner','Critical',e.message);}

const critical=checks.filter(x=>x.status==='Critical');
const overall=critical.length?'Critical':checks.some(x=>x.status==='Warning')?'Warning':checks.some(x=>x.status==='Skipped')?'ReadyWithManualChecks':'Healthy';
console.log(JSON.stringify({overall,base,generatedAt:new Date().toISOString(),checks},null,2));
process.exitCode=critical.length?1:0;
