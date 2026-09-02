import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname);
const files = [
  'audio-catalogue-seed.sql',
  'apps/public-web/lib/audio-catalogue.ts',
  'apps/public-web/components/AudioCatalogueClient.tsx',
  'apps/public-web/app/categories/entertainment/audio/page.tsx',
  'apps/public-web/app/categories/entertainment/audio/[slug]/page.tsx',
  'apps/public-web/app/audio/brand/[brand]/page.tsx',
  'apps/public-web/lib/audio-media.ts',
  'apps/business-admin/data/starter-catalogue.ts',
  'server.js',
];
const failures = [];
for (const file of files) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) failures.push(`Missing ${file}`);
}
const seed = fs.readFileSync(path.join(root, 'audio-catalogue-seed.sql'), 'utf8');
if (/DROP\s+(DATABASE|SCHEMA|TABLE)\b|TRUNCATE\b|DELETE\s+FROM\s+(products|brands|product_categories)/i.test(seed)) failures.push('Audio seed contains a destructive catalogue operation.');
if (!/BEGIN;/.test(seed) || !/COMMIT;/.test(seed)) failures.push('Audio seed is not transaction-wrapped.');
const ts = fs.readFileSync(path.join(root, 'apps/public-web/lib/audio-catalogue.ts'), 'utf8');
const slugs = [...ts.matchAll(/slug:'([^']+)'/g)].map(m => m[1]);
const duplicateSlugs = slugs.filter((x, i) => slugs.indexOf(x) !== i);
if (duplicateSlugs.length) failures.push(`Duplicate audio slugs: ${[...new Set(duplicateSlugs)].join(', ')}`);
if (!/Price coming soon/.test(fs.readFileSync(path.join(root, 'apps/public-web/components/AudioCatalogueClient.tsx'), 'utf8'))) failures.push('Customer price placeholder missing.');
if (!/api\/public\/catalog/.test(fs.readFileSync(path.join(root, 'apps/public-web/app/categories/entertainment/audio/[slug]/page.tsx'), 'utf8'))) failures.push('Audio detail page is not connected to the public catalogue media path.');
if (failures.length) { console.error('AUDIO AUDIT FAILED'); failures.forEach(x => console.error(`- ${x}`)); process.exit(1); }
console.log(`AUDIO AUDIT PASS — ${slugs.length} product definitions, ${new Set(slugs).size} unique slugs, non-destructive seed, media fallback and public catalogue integration present.`);
