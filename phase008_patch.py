from pathlib import Path
import re
root=Path('/mnt/data/phase008')
# Remove manufacturer URL data from public catalogue definitions.
for rel in ['apps/public-web/lib/computer-catalogue.ts','apps/public-web/lib/audio-catalogue.ts','apps/public-web/lib/tv-catalogue.ts']:
    p=root/rel; s=p.read_text()
    s=re.sub(r",?\s*oemUrl:\s*'https?://[^']*'", "", s)
    s=re.sub(r",?\s*oemUrl:\s*\"https?://[^\"]*\"", "", s)
    s=s.replace("; oemUrl?: string", "").replace(";oemUrl?:string", "")
    s=s.replace(" oemUrl?: string;", "")
    p.write_text(s)

# Public detail pages: no manufacturer links, no product photos; always show coming-soon media.
p=root/'apps/public-web/app/categories/computers/laptops/[slug]/page.tsx'
s=p.read_text(); s=s.replace("<div className=\"devicePlaceholder large\"><span>{p.brand}</span><strong>{p.family}</strong><small>Product imagery is added when stock is listed.</small></div>","<div className=\"devicePlaceholder large\"><span>AMAAL</span><strong>{p.name}</strong><small>Product photo coming soon.</small></div>")
s=re.sub(r"<div className=\"detailActions\">.*?</div>","<div className=\"detailActions\"><span className=\"sourceNote\">Product photo and price coming soon.</span></div>",s)
p.write_text(s)

p=root/'apps/public-web/app/categories/entertainment/audio/[slug]/page.tsx'
s=p.read_text();
s=s.replace("const api=process.env.NEXT_PUBLIC_API_BASE_URL||process.env.AMAAL_API_BASE_URL||'http://localhost:4000'; let remote=''; try{const r=await fetch(`${api}/api/public/catalog`,{next:{revalidate:60}}); if(r.ok){const d=await r.json(); const live=d?.products?.find((x:any)=>x?.slug===slug && x?.category_slug?.startsWith('entertainment-audio')); remote=live?.images?.find((x:any)=>x.primary)?.url||live?.images?.[0]?.url||''}}catch{} const media=remote||getAudioMedia(item);", "")
s=s.replace("{media?<img src={media} alt={item.name}/>:<div className=\"audio-detail-placeholder\">", "<div className=\"audio-detail-placeholder\">")
s=s.replace("</div></div><div className=\"audio-detail-copy\">", "</div><div className=\"audio-detail-copy\">")
s=re.sub(r"\{item\.oemUrl&&<a[^>]*>.*?</a>\}","<p className=\"sourceNote\">Product photo and price coming soon.</p>",s)
p.write_text(s)

p=root/'apps/public-web/app/tvs/[slug]/page.tsx'
s=p.read_text();
s=re.sub(r"<div className=\"tv-detail-media\">.*?</div><div className=\"tv-detail-copy\">", "<div className=\"tv-detail-media\"><div className=\"tv-detail-placeholder\"><span>AMAAL</span><strong>{p.fullName}</strong><small>Product photo coming soon.</small></div></div><div className=\"tv-detail-copy\">", s)
s=re.sub(r"\{p\.oemUrl&&<a[^>]*>.*?</a>\}","<p className=\"sourceNote\">Product photo and price coming soon.</p>",s)
p.write_text(s)

# Homepage: never show existing bundled product photos or prices.
p=root/'apps/public-web/app/page.tsx'; s=p.read_text()
s=re.sub(r"\{p\.images\?\.\[0\] \? <img[^>]*/> : <div className=\"product-placeholder\">", "<div className=\"product-placeholder\">", s)
# If the ternary tail remains, normalize the known JSX segment.
s=s.replace("</div>}</div><div className=\"product-meta\">", "</div></div><div className=\"product-meta\">")
s=s.replace("{ugx(p.price)}", "Price coming soon")
s=s.replace("{p.price>0?<AddToBag id={p.slug} name={p.name} price={ugx(p.price)}/>:<Link className=\"button gold\" href=\"/contact\">Enquire about this product</Link>}","<Link className=\"button gold\" href={`/contact?product=${encodeURIComponent(p.name)}`}>Ask about this product</Link>")
p.write_text(s)

# Curated detail: no photos and no prices.
p=root/'apps/public-web/app/product/[slug]/page.tsx'; s=p.read_text()
s=s.replace("const photos=p.images??[];const hero=photos[0];", "const photos:string[]=[];const hero=undefined;")
s=s.replace("{hero?<img src={hero} alt={p.name}/>:<div className=\"detail-placeholder\">", "<div className=\"detail-placeholder\">")
s=s.replace("</div>}</div>{photos.length>1", "</div></div>{photos.length>1")
s=re.sub(r"<div className=\"detail-price\">.*?</div>","<div className=\"detail-price\">Price coming soon</div>",s)
s=re.sub(r"\{p\.price>0\?<AddToBag.*?:<Link", "<Link", s)
p.write_text(s)

# Generic product card: photo and price are always coming soon.
p=root/'apps/public-web/components/ProductCard.tsx'; s=p.read_text(); s=s.replace("{image(product)?<img src={image(product)} alt=\"\"/>:<span>AMAAL</span>}","<span>AMAAL</span><small>Product photo coming soon</small>"); s=re.sub(r"<strong>\{formatted\|\|'View product'\}</strong>","<strong>Price coming soon</strong>",s); s=re.sub(r"\{formatted&&<AddToBag[^}]*/>\}","",s); p.write_text(s)

# Audio catalogue: no media fallback.
p=root/'apps/public-web/components/AudioCatalogueClient.tsx'; s=p.read_text(); s=s.replace("const media = remoteMedia || getAudioMedia(product);", "const media = '';" ); s=s.replace("import { getAudioMedia } from '../lib/audio-media';\n",""); s=s.replace("{media ? <img src={media} alt={product.name} loading=\"lazy\" /> : <div", "<div"); s=s.replace("</div>}\n      <span className=\"audio-tier-badge\">", "</div>\n      <span className=\"audio-tier-badge\">"); p.write_text(s)

# Computer card already placeholder; explicit photo wording.
p=root/'apps/public-web/components/ComputerCatalogueClient.tsx'; s=p.read_text().replace("<div className=\"computerCardMedia\"><span>{p.brand}</span><strong>{p.family}</strong></div>","<div className=\"computerCardMedia\"><span>AMAAL</span><strong>{p.name}</strong><small>Product photo coming soon</small></div>"); p.write_text(s)

# Phone card/detail/related: suppress static media.
p=root/'apps/public-web/components/PhoneCatalogueCard.tsx'; s=p.read_text(); s=s.replace("import { getPhoneMedia } from '../lib/phone-media';\n",""); s=s.replace("  const media = getPhoneMedia(product);\n",""); s=re.sub(r"\{media\[0\] \? <img[^>]* /> : <div", "<div", s); s=s.replace("</div>}\n        <span className=\"phone-config-count\">", "</div>\n        <span className=\"phone-config-count\">"); p.write_text(s)
p=root/'apps/public-web/components/PhoneRelated.tsx'; s=p.read_text(); s=s.replace("import { getPhoneMedia } from '../lib/phone-media';\n",""); s=s.replace("{related.map((p) => { const media = getPhoneMedia(p); return", "{related.map((p) => { return"); s=re.sub(r"\{media\[0\] \? <img[^>]*\/> : <div", "<div", s); s=s.replace("</div>}</div><p>{p.brand}","</div></div><p>{p.brand}"); p.write_text(s)
p=root/'apps/public-web/components/PhoneDetail.tsx'; s=p.read_text(); s=s.replace("import { getPhoneMedia } from '../lib/phone-media';\n",""); s=s.replace("  const media = getPhoneMedia(product);\n", "  const media:string[] = [];\n"); p.write_text(s)

# Remove stale imports that became unused but are harmless; make data explicitly price/photo-coming-soon semantics.
p=root/'apps/public-web/lib/catalog.ts'; s=p.read_text();
s=s.replace("export function price(p:Product){const v=p.variants?.[0];return v?.sellingPrice==null?'':new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(Number(v.sellingPrice))}", "export function price(p:Product){const v=p.variants?.[0];return v?.sellingPrice==null?'':new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(Number(v.sellingPrice))}\nexport function publicPrice(){return 'Price coming soon'}\nexport function publicPhoto(){return ''}")
p.write_text(s)

# Add production catalogue foundation helpers (DB is authoritative; static catalogue remains verified fallback metadata).
p=root/'apps/public-web/lib/catalog.ts'; s=p.read_text();
insert="""
export type PublicCatalogueResult = Catalog & {source:'database'|'fallback'};
export async function getPublicCatalogue():Promise<PublicCatalogueResult>{
  const live=await getCatalog();
  if(live) return {...live,source:'database'};
  return {updatedAt:new Date().toISOString(),categories:[],brands:[],products:[],collections:[],source:'fallback'};
}
export function searchProducts(catalog:Catalog, query:string){
  const q=query.trim().toLowerCase();
  if(!q) return catalog.products;
  return catalog.products.filter(p=>`${p.name} ${p.brand_name??''} ${p.category_name??''} ${p.short_description??''} ${p.description??''}`.toLowerCase().includes(q));
}
"""
if 'getPublicCatalogue' not in s: s += insert
p.write_text(s)

# Add admin guidance: structured product details and commercial configuration are first-class in existing editor.
p=root/'apps/business-admin/components/ProductAdmin.tsx'; s=p.read_text();
s=s.replace('<Field label="Product details"', '<div className="adminFormSectionTitle">Customer-facing product information</div><Field label="Product details"')
s=s.replace('<Field label="Short description"', '<Field label="Short description"')
s=s.replace('<Field label="Description"', '<Field label="Description"')
p.write_text(s)

# Add audit script for Phase 008 requirements.
(root/'phase008-production-audit.js').write_text(r'''const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'apps','public-web');
const files=[];(function walk(d){for(const x of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,x.name);if(x.isDirectory()&&!['node_modules','.next'].includes(x.name))walk(p);else if(/\.(tsx|ts)$/.test(x.name))files.push(p)}})(root);
const text=files.map(f=>fs.readFileSync(f,'utf8')).join('\n');
const externalLinks=(text.match(/href=\\?[^\n]*https?:\\?\\?/g)||[]).length;
const manufacturerButtons=/Manufacturer information|View manufacturer information/.test(text);
const oemRendered=/\boemUrl\b/.test(text);
const priceCurrencyRendered=/Intl\.NumberFormat\(['"]en-UG['"]/.test(text);
const checks={noPublicExternalLinks:externalLinks===0&&!manufacturerButtons&&!oemRendered,noManufacturerDataLinks:!oemRendered,pricePlaceholdersPresent:text.includes('Price coming soon'),photoPlaceholdersPresent:text.includes('Product photo coming soon')||text.includes('Product image coming soon'),publicCatalogueHelpers:text.includes('getPublicCatalogue')};
for(const [k,v] of Object.entries(checks))console.log(`${v?'PASS':'FAIL'} ${k}`);
if(Object.values(checks).some(v=>!v))process.exit(1);
''')
