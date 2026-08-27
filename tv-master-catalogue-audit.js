import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const data=JSON.parse(fs.readFileSync(path.join(__dirname,'tv-master-catalog.json'),'utf8'));
const brands=new Set(data.brands);
const entries=data.entries;
const seen=new Set();
const errors=[];
for(const e of entries){
  if(!brands.has(e.brand)) errors.push(`Unknown brand: ${e.brand}`);
  const k=`${e.brand.toLowerCase()}|${e.model.toLowerCase()}`;
  if(seen.has(k)) errors.push(`Duplicate model: ${e.brand} ${e.model}`);
  seen.add(k);
  if(!e.model) errors.push('Missing model');
  if(!['CURRENT','PREVIOUS','LEGACY','UNKNOWN'].includes(e.generation)) errors.push(`Bad generation: ${e.model}`);
  if(!['VERIFIED','PARTIALLY_VERIFIED','UNVERIFIED','RETIRED'].includes(e.verification)) errors.push(`Bad verification: ${e.model}`);
  if(!['UGANDA','EAST_AFRICA','AFRICA','GLOBAL'].includes(e.market)) errors.push(`Bad market: ${e.model}`);
}
console.log(`TV master catalogue: ${entries.length} unique models/families across ${brands.size} brands.`);
console.log(`TV variant rows: ${entries.reduce((n,e)=>n+(e.sizes.length||1),0)}.`);
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('TV master catalogue audit: PASS');
