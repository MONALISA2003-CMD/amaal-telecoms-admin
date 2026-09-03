const fs=require('fs'),path=require('path'),root=process.cwd();
const pub=path.join(root,'apps/public-web');let failures=[];
function read(p){return fs.readFileSync(path.join(root,p),'utf8')}
function walk(dir){let out=[];for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory()&&!['node_modules','.next'].includes(e.name))out=out.concat(walk(p));else if(e.isFile())out.push(p)}return out}
const tsx=walk(pub).filter(f=>/\.(ts|tsx)$/.test(f));
const staticImport=/from\s+['\"][^'\"]*lib\/(phone|computer|tv|audio|appliance|tablet|accessory)-catalogue['\"]/;
const appFiles=tsx.filter(f=>f.includes(path.sep+'app'+path.sep));
for(const f of appFiles)if(staticImport.test(fs.readFileSync(f,'utf8')))failures.push(`Public route still imports static catalogue: ${path.relative(root,f)}`);
const text=walk(pub).filter(f=>/\.(ts|tsx)$/.test(f)).map(f=>fs.readFileSync(f,'utf8')).join('\n');
for(const phrase of ['Product photo coming soon','Product media coming soon','Product photo to be supplied by Amaal'])if(text.includes(phrase))failures.push(`Customer-facing media placeholder remains: ${phrase}`);
const schema=read('schema.sql');const mediaPos=schema.indexOf('CREATE TABLE IF NOT EXISTS media_assets');const imageAlter=schema.indexOf('ALTER TABLE product_images ADD COLUMN IF NOT EXISTS media_id');if(mediaPos<0||imageAlter<0||imageAlter<mediaPos)failures.push('product_images.media_id migration is not ordered after media_assets creation');
const media=read('media-management.js');for(const x of ["app.post('/api/media'","app.post('/api/media/:id/versions'","app.patch('/api/media/:id'","app.post('/api/media/:id/archive'","app.get('/api/public/media/:id/file'"])if(!media.includes(x))failures.push(`Missing media endpoint: ${x}`);
const server=read('server.js');for(const x of ["app.get('/api/catalog/products/:id/images'","app.post('/api/catalog/products/:id/media'","app.patch('/api/catalog/product-images/:id'","app.delete('/api/catalog/product-images/:id'"])if(!server.includes(x))failures.push(`Missing product media endpoint: ${x}`);
const cat=read('apps/public-web/lib/catalog.ts');if(!cat.includes("/api/public/catalog"))failures.push('Public catalogue resolver does not use /api/public/catalog');
if(failures.length){console.error('WORKSTREAM 1 AUDIT FAILED');failures.forEach(x=>console.error('- '+x));process.exit(1)}
console.log(`WORKSTREAM 1 AUDIT PASS — ${appFiles.length} public route files checked; DB catalogue authority enforced; media pipeline endpoints present; no customer-facing media placeholders; additive media schema migration ordered safely.`);
