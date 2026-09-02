import fs from 'node:fs';import path from 'node:path';
const root=path.join(process.cwd(),'apps/public-web');
const must=[
 'app/categories/page.tsx','app/categories/[...path]/page.tsx',
 'app/categories/computers/laptops/[slug]/page.tsx','app/categories/computers/laptops/brand/[brand]/page.tsx',
 'app/categories/entertainment/audio/[slug]/page.tsx','app/categories/entertainment/audio/brand/[brand]/page.tsx',
 'lib/category-navigation.ts','components/ComputerCatalogueClient.tsx'
];
const missing=must.filter(x=>!fs.existsSync(path.join(root,x)));
const starter=fs.readFileSync(path.join(root,'../business-admin/data/starter-catalogue.ts'),'utf8');
const checks=[['root Audio removed',!/['"]Audio['"]\s*,\s*\n/.test(starter)],['Entertainment Audio exists',starter.includes("'Entertainment / Audio'")],['Computers category exists',starter.includes("'Computers'")]];
const sql=fs.readFileSync(path.join(process.cwd(),'catalogue-category-hierarchy.sql'),'utf8').toUpperCase();
checks.push(['hierarchy SQL non-destructive',!/(DROP\s|TRUNCATE\s|DELETE\s+FROM)/.test(sql)]);
if(missing.length||checks.some(([,ok])=>!ok)){console.error(JSON.stringify({missing,checks},null,2));process.exit(1)}
console.log(JSON.stringify({status:'PASS',missing:[],checks},null,2));
