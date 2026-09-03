const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=process.cwd(), original='/mnt/data/old22/apps/public-web', restored=path.join(root,'apps/public-web');
const files=[
'app/page.tsx','lib/homepage-data.ts','lib/category-navigation.ts',
'lib/phone-catalogue.ts','lib/computer-catalogue.ts','lib/tv-catalogue.ts','lib/audio-catalogue.ts','lib/appliance-catalogue.ts','lib/tablet-catalogue.ts','lib/accessory-catalogue.ts',
'components/PhoneVariantSelector.tsx','components/PhoneCompareTray.tsx','components/PhoneCatalogueCard.tsx','components/ComputerCatalogueClient.tsx','components/PhoneRelated.tsx','components/TVCatalogueClient.tsx','components/PhoneDetail.tsx','components/PhoneBrandSubcatalog.tsx','components/AudioCatalogueClient.tsx','components/PhoneCompareButton.tsx','components/CuratedProductDetail.tsx','components/CuratedCatalogueClient.tsx',
'app/compare/page.tsx','app/brands/page.tsx','app/brands/[slug]/page.tsx','app/categories/page.tsx','app/categories/[...path]/page.tsx','app/phones/page.tsx','app/phones/[slug]/page.tsx','app/phones/brand/[brand]/page.tsx','app/phones/compare/page.tsx','app/tvs/page.tsx','app/tvs/[slug]/page.tsx','app/tvs/brand/[brand]/page.tsx',
'app/categories/accessories/page.tsx','app/categories/accessories/[slug]/page.tsx','app/categories/tablets/page.tsx','app/categories/tablets/[slug]/page.tsx','app/categories/tablets/ipad/page.tsx','app/categories/tablets/samsung-galaxy-tab/page.tsx','app/categories/home-appliances/page.tsx','app/categories/home-appliances/[category]/page.tsx','app/categories/home-appliances/product/[slug]/page.tsx','app/categories/kitchen-appliances/page.tsx','app/categories/kitchen-appliances/[category]/page.tsx','app/categories/kitchen-appliances/product/[slug]/page.tsx','app/categories/computers/laptops/[slug]/page.tsx','app/categories/computers/laptops/brand/[brand]/page.tsx','app/categories/entertainment/audio/page.tsx','app/categories/entertainment/audio/[slug]/page.tsx','app/categories/entertainment/audio/brand/[brand]/page.tsx','app/categories/entertainment/audio/party-speakers/page.tsx','app/categories/entertainment/audio/portable-speakers/page.tsx','app/categories/entertainment/audio/sound-towers/page.tsx','app/categories/entertainment/audio/woofers/page.tsx','app/product/[slug]/page.tsx'
];
let failures=[];
for(const rel of files){const a=path.join(original,rel),b=path.join(restored,rel);if(!fs.existsSync(a)||!fs.existsSync(b)){failures.push(`${rel}: missing`);continue}const ha=crypto.createHash('sha256').update(fs.readFileSync(a)).digest('hex'),hb=crypto.createHash('sha256').update(fs.readFileSync(b)).digest('hex');if(ha!==hb)failures.push(`${rel}: differs from archived original`)}
const nav=fs.readFileSync(path.join(restored,'lib/category-navigation.ts'),'utf8');
if(!nav.includes("{slug:'phones'")) failures.push('original category navigation missing Phones');
if(!nav.includes("{slug:'kitchen-appliances'")) failures.push('original category navigation missing Kitchen Appliances');
if(!nav.includes("{slug:'accessories'")) failures.push('original category navigation missing Accessories');
console.log(`restoration files checked: ${files.length}`);
console.log(`failures: ${failures.length}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
