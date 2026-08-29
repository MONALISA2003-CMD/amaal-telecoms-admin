import fs from 'fs';
import path from 'path';

const root = path.dirname(new URL(import.meta.url).pathname);
const frontendRoot = path.join(root, 'apps', 'business-admin');
const backendFiles = fs.readdirSync(root).filter(f => f.endsWith('.js') && !['server.js','render-preflight.js','deployment-readiness.js','production-smoke.js','cross-module-audit.js','recovery.js'].includes(f));

function walk(dir, out=[]) {
  for (const entry of fs.readdirSync(dir,{withFileTypes:true})) {
    if (['node_modules','.next','.git'].includes(entry.name)) continue;
    const full=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(full,out); else if(/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const frontendFiles=walk(frontendRoot);
const frontendRefs=new Map();
const refPattern=/['"`]((?:\/api)\/[^'"`?\s\\$]+)(?:[?`'"\\]|$)/g;
for(const file of frontendFiles){
  const text=fs.readFileSync(file,'utf8');
  for(const m of text.matchAll(refPattern)){
    const p=m[1].replace(/\$\{[^}]+\}/g,':id');
    if(p.startsWith('/api/')) frontendRefs.set(p, path.relative(root,file));
  }
}

const backendRoutes=[];
for(const file of ['server.js',...backendFiles]){
  const full=path.join(root,file); if(!fs.existsSync(full)) continue;
  const text=fs.readFileSync(full,'utf8');
  for(const m of text.matchAll(/app\.(get|post|put|patch|delete)\(\s*['"`]([^'"`]+)['"`]/gi)) backendRoutes.push({method:m[1].toUpperCase(),path:m[2],file});
}

function normalize(p){return p.replace(/\[[^\]]+\]/g,':id').replace(/\$\{[^}]+\}/g,':id').replace(/\/$/,'');}
const routeSet=new Set(backendRoutes.map(r=>normalize(r.path)));
const modulePrefixes=[
  ['catalog','Products'],['inventory','Stock'],['sales','Sales'],['orders','Orders'],['customers','Customers'],['procurement','Purchasing'],['finance','Finance'],['credit','Credit'],['delivery','Delivery'],['returns','Service'],['warranty','Service'],['web','Website'],['bi','Reports'],['staff','Team'],['users','Team'],['departments','Team']
];
const findings=[];
for(const [ref,file] of frontendRefs){
  const n=normalize(ref.split('?')[0]);
  const exact=routeSet.has(n);
  const prefix=backendRoutes.some(r=>{const br=normalize(r.path); return br===n || (br.includes(':id') && n.startsWith(br.split(':id')[0]));});
  const localBridge = ref.startsWith('/api/session/') || ref.startsWith('/api/catalog') && file.includes('app/api/engine/');
  if(!exact&&!prefix&&!localBridge) findings.push({type:'FRONTEND_ROUTE_NOT_FOUND_IN_BACKEND_INVENTORY',path:ref,file});
}

const crossLinks=[
  ['Sales','Finance','sales-pos.js','finance-sync'],
  ['Orders','Sales','orders-ecommerce.js','convert-to-sale'],
  ['Orders','Inventory','orders-ecommerce.js','reserveStock'],
  ['Orders','Delivery','delivery-logistics.js','order_id'],
  ['Products','Inventory','schema.sql','product_variants'],
  ['Purchasing','Inventory','suppliers-procurement.js','changeStock'],
  ['Purchasing','Finance','finance-accounting.js','SupplierInvoice'],
  ['Customers','Credit','credit-installments.js','customer_id'],
  ['Customers','Sales','sales-pos.js','customer_id'],
  ['Customers','Orders','orders-ecommerce.js','customer_id'],
  ['Service','Customers','warranty-repairs.js','customer_id'],
  ['Service','Orders','warranty-repairs.js','order_id'],
  ['Service','Inventory','returns-refunds.js','changeStock'],
  ['Website','Products','web-and-hosting.js','products'],
  ['Reports','Sales','business-intelligence.js','sales'],
  ['Reports','Finance','business-intelligence.js','finance'],
  ['Reports','Credit','business-intelligence.js','credit'],
  ['Reports','Delivery','business-intelligence.js','delivery'],
];
const crossResults=crossLinks.map(([from,to,file,needle])=>{
  const text=fs.readFileSync(path.join(root,file),'utf8');
  return {from,to,status:text.toLowerCase().includes(String(needle).toLowerCase())?'Connected':'Review',evidence:`${file} contains ${needle}`};
});

const registrations=fs.readFileSync(path.join(root,'server.js'),'utf8').match(/register[A-Za-z]+\(/g)||[];
const result={
  generatedAt:new Date().toISOString(),
  frontendApiReferences:frontendRefs.size,
  backendRoutes:backendRoutes.length,
  unmatchedFrontendRoutes:findings,
  crossModuleChecks:crossResults,
  moduleRegistrations:[...new Set(registrations)].sort(),
  summary:{
    unmatchedFrontendRoutes:findings.length,
    connectedCrossModuleChecks:crossResults.filter(x=>x.status==='Connected').length,
    reviewCrossModuleChecks:crossResults.filter(x=>x.status!=='Connected').length
  }
};
console.log(JSON.stringify(result,null,2));
process.exitCode=findings.length?1:0;
