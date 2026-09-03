const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../..');
const server = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
const manager = fs.readFileSync(path.join(root, 'apps/business-admin/components/CatalogueManager.tsx'), 'utf8');
const checks = [
  ['readiness endpoint', server.includes("app.get('/api/catalog/readiness'")],
  ['bulk enrichment endpoint', server.includes("app.post('/api/catalog/products/bulk-enrich'")],
  ['positive selling price gate', server.includes("v.selling_price>0")],
  ['managed public media gate', server.includes("m.status='Active' AND m.visibility='Public'")],
  ['enrichment UI', manager.includes('EnrichmentModal')],
  ['validation action', manager.includes("run(true)")],
  ['save action', manager.includes("run(false)")],
];
const failed = checks.filter(([,ok]) => !ok);
console.log(JSON.stringify({overall: failed.length ? 'FAIL' : 'PASS', checks}, null, 2));
if (failed.length) process.exit(1);
