import fs from 'fs';import path from 'path';
const root=process.cwd(), server=fs.readFileSync('server.js','utf8'), sql=fs.readFileSync('commerce-phase014.sql','utf8');
const checks=[
 ['phase SQL loaded',server.includes("commerce-phase014.sql")],
 ['customer access token table',sql.includes('customer_access_tokens')],
 ['customer account endpoint',server.includes("/api/public/account")],
 ['persistent wishlist endpoint',server.includes("/api/public/account/wishlist")],
 ['delivery quote endpoint',server.includes("/api/public/delivery/quote")],
 ['public search suggestions',server.includes("/api/public/search/suggestions")],
 ['search analytics event',server.includes("/api/public/search/event")],
 ['related products endpoint',server.includes("/api/public/products/:slug/related")],
 ['public return creation',server.includes("/api/public/account/returns")],
 ['public warranty creation',server.includes("/api/public/account/warranty")],
 ['customer notifications',sql.includes('customer_notifications') && server.includes('customer_notifications')],
 ['media-to-product endpoint',server.includes("/api/catalog/products/:id/media")],
 ['public collections source',server.includes('catalog_collection_products')],
 ['public promotions source',server.includes("FROM promotions")],
 ['cross-origin public API support',server.includes('X-Amaal-Customer-Token') && server.includes('PUBLIC_WEB_ORIGINS')],
 ['master blueprint in public web',fs.existsSync('apps/public-web/AMAAL_MASTER_IMPROVEMENT_BP.md')],
 ['single Phase 014 continuation',fs.existsSync('apps/public-web/AMAAL_PHASE014_CONTINUATION.md')],
];
const stale=[];function walk(d){for(const e of fs.readdirSync(d)){if(['node_modules','.next','.git'].includes(e))continue;const p=path.join(d,e),st=fs.statSync(p);if(st.isDirectory())walk(p);else if(/(CONTINUATION|^PHASE\d).*\.md$/i.test(e))stale.push(p)}}walk(root);
for(const [n,ok] of checks)console.log(`${ok?'PASS':'FAIL'} | ${n}`);console.log(`stale continuation/phase markdown outside approved continuation: ${stale.filter(x=>!x.endsWith('apps/public-web/AMAAL_PHASE014_CONTINUATION.md')).length}`);if(stale.length)console.log(stale);
if(checks.some(x=>!x[1])||stale.some(x=>!x.endsWith('apps/public-web/AMAAL_PHASE014_CONTINUATION.md')))process.exit(1);
