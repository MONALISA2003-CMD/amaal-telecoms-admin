import fs from 'fs';
import path from 'path';

const root = new URL('./', import.meta.url);
const server = fs.readFileSync(new URL('server.js', root), 'utf8');
const bi = fs.readFileSync(new URL('business-intelligence.js', root), 'utf8');
const legacyUi = fs.readFileSync(new URL('public/app.js', root), 'utf8');
const reportUi = fs.readFileSync(new URL('apps/business-admin/components/ReportsWorkspace.tsx', root), 'utf8');

const permissions = [...server.matchAll(/\['([^']+)',\s*'([^']+)'\]/g)].map(m => ({ id:m[1], description:m[2] }));
const routes = [...server.matchAll(/app\.(get|post|put|patch|delete)\('([^']+)'[^\n]*?need\('([^']+)'\)/g)].map(m => ({method:m[1].toUpperCase(),route:m[2],permission:m[3]}));
const publicPrefixes=['/api/setup','/api/login','/api/invitations/accept','/api/recovery/reset','/api/password/forgot','/api/password/reset','/api/recovery/status','/api/public','/api/health'];
const apiRoutes=[...server.matchAll(/app\.(get|post|put|patch|delete)\('([^']+)'([^\n]*)/g)].map(m=>({method:m[1].toUpperCase(),route:m[2],body:m[3]}));
const unguarded=apiRoutes.filter(r=>r.route.startsWith('/api/')&&!publicPrefixes.some(p=>r.route===p||r.route.startsWith(p+'/'))&&!r.body.includes('auth'));
const uiPermissions=[...new Set([...legacyUi.matchAll(/has\('([^']+)'\)/g),...reportUi.matchAll(/permissions\.includes\('([^']+)'\)/g)].map(m=>m[1]))];
const unknownUi=uiPermissions.filter(p=>!permissions.some(x=>x.id===p));
const biRequired=['/api/bi/summary','/api/bi/live-pulse','/api/bi/sales-trend','/api/bi/payment-methods','/api/bi/cashiers','/api/bi/products','/api/bi/inventory-ageing','/api/bi/inventory-turnover','/api/bi/delivery','/api/bi/warranty','/api/bi/customers','/api/bi/categories','/api/bi/procurement','/api/bi/returns','/api/bi/credit-aging','/api/bi/finance','/api/bi/tax','/api/bi/website-activity','/api/bi/export'];
const missingBi=biRequired.filter(r=>!bi.includes(`'${r}'`));
const findings=[];
function pass(name){findings.push({name,ok:true});}
function fail(name,detail){findings.push({name,ok:false,detail});}
if(!unguarded.length) pass('API routes are permission guarded outside explicit public/bootstrap endpoints'); else fail('API routes are permission guarded',JSON.stringify(unguarded));
if(!unknownUi.length) pass('UI permission identifiers all exist in backend permission registry'); else fail('UI permission identifiers',unknownUi);
if(!missingBi.length) pass('BI endpoint surface includes deep website activity and export'); else fail('BI endpoint surface',missingBi);
if(bi.includes("need('bi.view')")) pass('BI reads require bi.view'); else fail('BI read permission missing');
if(bi.includes("need('bi.export')")) pass('BI export requires bi.export'); else fail('BI export permission missing');
if(bi.includes("need('bi.manage')")) pass('BI snapshot mutation requires bi.manage'); else fail('BI management permission missing');
if(bi.includes("dataHealth:{complete:false,partial:true,failedSections:['live-pulse']}") && !bi.includes('website:website||')) pass('Live-pulse failure no longer substitutes website/financial zeros'); else fail('Live-pulse failure payload still risks fabricated zeros');
if(reportUi.includes("unavailable?'Unavailable':partial?'Partial':'Live'")) pass('Business Admin distinguishes unavailable/partial/live BI data'); else fail('Business Admin BI status distinction missing');
if(legacyUi.includes("x==null||!Number.isFinite(Number(x))?'—'")) pass('Legacy BI formatting renders null as unavailable rather than zero'); else fail('Legacy BI null formatting missing');
if(server.includes("const perms=[['dashboard.view'")) pass('Canonical backend permission registry is present');

const actionFor = (route,method,permission) => {
  if (permission.endsWith('.view')) return 'View';
  if (permission.endsWith('.export')) return 'Export';
  if (permission.endsWith('.approve')) return 'Approve';
  if (permission.endsWith('.publish') || permission.includes('.publish.')) return method==='GET'?'View':'Publish';
  if (permission.endsWith('.receive')) return 'Receive';
  if (permission.endsWith('.refund')) return 'Refund';
  if (permission.endsWith('.void')) return 'Reverse/Void';
  if (method==='POST') return route.includes('/bulk')?'Bulk/Create':route.includes('/reconcile')?'Reconcile':'Create/Execute';
  if (method==='DELETE') return 'Delete/Archive';
  if (method==='PATCH' || method==='PUT') return 'Edit';
  return 'Manage';
};
const matrix = permissions.map(p => {
  const rs=routes.filter(r=>r.permission===p.id);
  return {permission:p.id, description:p.description, routes:rs.length, actions:[...new Set(rs.map(r=>actionFor(r.route,r.method,p.id)))].join(', ')||'UI/permission only', uiExposed:uiPermissions.includes(p.id)};
});
const out={generatedAt:new Date().toISOString(),summary:{permissions:permissions.length,guardedRoutes:routes.length,unguardedRoutes:unguarded.length,unknownUiPermissions:unknownUi.length,biEndpoints:biRequired.length,missingBiEndpoints:missingBi.length},findings,adminMatrix:matrix};
fs.writeFileSync(new URL('PHASE21_DEEP_BUSINESS_INTEGRITY_AUDIT.json',root),JSON.stringify(out,null,2));
fs.writeFileSync(new URL('PHASE21_ADMIN_PERMISSION_MATRIX.md',root),[
'# Phase 21 — Admin/Superadmin Permission Matrix',
'',`Generated: ${out.generatedAt}`,'',
'Legend: Create/Execute = POST mutation, Edit = PUT/PATCH, Delete/Archive = DELETE, Reverse/Void = explicit reversal permission, Export = data export, View = read access. Super Admin is system-wide and receives the complete permission registry; Administrator receives the operational registry excluding the two intentionally Super-Admin-only controls defined by the source bootstrap.',
'', '| Permission | Capability | Backend routes | Actions | UI exposed |', '|---|---|---:|---|---|',
...matrix.map(x=>`| ${x.permission} | ${x.description.replaceAll('|','\\|')} | ${x.routes} | ${x.actions} | ${x.uiExposed?'Yes':'Backend-only / contextual'} |`),
'','## Certification result',
`- Permission registry: **${permissions.length}** entries discovered from the backend source.`,
`- Guarded API routes: **${routes.length}**.`,
`- Unexpected unguarded API routes: **${unguarded.length}**.`,
`- Unknown UI permission identifiers: **${unknownUi.length}**.`,
`- BI endpoint surface checked: **${biRequired.length}**; missing: **${missingBi.length}**.`,
].join('\n'));

console.log(JSON.stringify({summary:out.summary,failures:findings.filter(x=>!x.ok)},null,2));
if(unguarded.length || unknownUi.length || missingBi.length || findings.some(x=>!x.ok)) process.exitCode=1;
