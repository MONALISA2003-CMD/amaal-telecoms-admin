import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const data = JSON.parse(fs.readFileSync(path.join(root, 'amaal_master_catalogue.json'), 'utf8'));
const phoneTs = fs.readFileSync(path.join(root, 'apps/public-web/lib/phone-catalogue.ts'), 'utf8');
const audioTs = fs.readFileSync(path.join(root, 'apps/public-web/lib/audio-catalogue.ts'), 'utf8');
const homepage = fs.readFileSync(path.join(root, 'apps/public-web/lib/homepage-data.ts'), 'utf8');
const homepagePage = fs.readFileSync(path.join(root, 'apps/public-web/app/page.tsx'), 'utf8');
const failures = [];
const phoneSlugs = data.phones.map(x => x.slug);
const audioSlugs = data.audio.map(x => x.slug);
if (new Set(phoneSlugs).size !== phoneSlugs.length) failures.push('Duplicate master phone slugs.');
if (new Set(audioSlugs).size !== audioSlugs.length) failures.push('Duplicate master audio slugs.');
for (const group of [...data.phones, ...data.audio]) {
  if (!group.name || !group.slug || !group.description) failures.push(`Incomplete master record: ${group.slug || group.name}`);
  for (const v of group.variants || []) if (!v.price) failures.push(`Missing variant price: ${group.name} / ${v.label}`);
  if (group.imageFile && !fs.existsSync(path.join(root, 'apps/public-web/public/products/amaal-master', group.imageFile))) failures.push(`Missing image asset: ${group.imageFile}`);
}
if (!/amaalMasterPhones/.test(phoneTs)) failures.push('Phone catalogue is not wired to master data.');
if (!/amaalMasterAudio/.test(audioTs)) failures.push('Audio catalogue is not wired to master data.');
if (!/inStock === true/.test(homepagePage)) failures.push('Homepage cart resolver is not strict about verified inventory.');
if (!/google-pixel-pixel-9/.test(homepage)) failures.push('Homepage Pixel 9 offer is missing.');
if (failures.length) { console.error('AMAAL MASTER CATALOGUE AUDIT FAILED'); failures.forEach(x => console.error(`- ${x}`)); process.exit(1); }
console.log(`AMAAL MASTER CATALOGUE AUDIT PASS — ${data.phones.length} phone model records, ${data.audio.length} audio records, ${data.phones.filter(x=>x.imageFile).length + data.audio.filter(x=>x.imageFile).length} supplied images mapped, ${data.phones.filter(x=>!x.imageFile).length + data.audio.filter(x=>!x.imageFile).length} placeholders.`);
