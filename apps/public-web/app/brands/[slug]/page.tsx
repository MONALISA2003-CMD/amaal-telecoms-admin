import type {Metadata} from 'next';
import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import ProductCard from '../../../components/ProductCard';
import {getPublishedCatalog} from '../../../lib/catalog-runtime';

async function resolveBrand(slug:string){
  const c=await getPublishedCatalog();
  const brand=c.brands.find(x=>x.slug===slug);
  const products=c.products.filter(p=>p.brand_slug===slug);
  return {c,brand,products};
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {brand,products}=await resolveBrand((await params).slug);
  if(!brand) return {title:'Brand not found | Amaal'};
  return {
    title:`${brand.name} | Amaal`,
    description:brand.description||`Explore published ${brand.name} products available from Amaal.`,
    alternates:{canonical:`/brands/${brand.slug}`},
    openGraph:{title:`${brand.name} | Amaal`,description:brand.description||`Explore published ${brand.name} products available from Amaal.`,type:'website'},
  };
}

export default async function BrandPage({params}:{params:Promise<{slug:string}>}){
  const {c,brand,products}=await resolveBrand((await params).slug);
  if(!brand||!products.length) return <main><SiteHeader/><section className="section empty"><p className="eyebrow">BRAND</p><h1>Brand not available.</h1><p>This brand does not currently have published products on Amaal.</p><Link className="button gold" href="/brands">Browse all brands</Link></section><SiteFooter/></main>;

  const categories=[...new Map(products.filter(p=>p.category_slug).map(p=>[p.category_slug!,p.category_name||p.category_slug!])).entries()]
    .map(([slug,name])=>({slug,name,count:products.filter(p=>p.category_slug===slug).length}))
    .sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name));
  const prices=products.flatMap(p=>(p.variants||[]).map(v=>Number(v.sellingPrice))).filter(Number.isFinite).filter(v=>v>0);
  const min=prices.length?Math.min(...prices):0;
  const max=prices.length?Math.max(...prices):0;
  const format=(n:number)=>new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(n);
  const featured=products.filter(p=>p.featured).slice(0,4);
  const showcase=featured.length?featured:products.slice(0,4);

  return <main>
    <SiteHeader/>
    <section className="brand-v5-hero">
      <div>
        <p className="eyebrow">BRAND</p>
        <div className="brand-v5-identity">
          <div className="brand-v5-logo" aria-hidden="true">{brand.logo_url||brand.image_url?<img src={brand.logo_url||brand.image_url} alt=""/>:<span>{brand.name.charAt(0)}</span>}</div>
          <h1>{brand.name}</h1>
        </div>
        <p>{brand.description||`Explore the published ${brand.name} collection available from Amaal.`}</p>
      </div>
      <div className="brand-v5-stat"><strong>{products.length}</strong><span>published products</span></div>
    </section>

    <section className="section brand-v5-content">
      <div className="brand-v5-overview">
        <div><span>Categories</span><strong>{categories.length||'—'}</strong></div>
        <div><span>Published range</span><strong>{prices.length?`${format(min)}${min!==max?` – ${format(max)}`:''}`:'Price available on product'}</strong></div>
      </div>

      {categories.length>0&&<section className="brand-v5-categories">
        <div className="section-head"><div><p className="eyebrow">SHOP BY CATEGORY</p><h2>Find your {brand.name}.</h2></div></div>
        <div className="brand-v5-category-grid">
          {categories.map(cat=><Link href={`/shop?brand=${encodeURIComponent(brand.slug)}&category=${encodeURIComponent(cat.slug)}`} key={cat.slug}><span>{cat.name}</span><small>{cat.count} {cat.count===1?'product':'products'}</small><b>→</b></Link>)}
        </div>
      </section>}

      <section className="brand-v5-products">
        <div className="section-head"><div><p className="eyebrow">{brand.name.toUpperCase()} COLLECTION</p><h2>Explore the range.</h2></div><Link className="text-link" href={`/shop?brand=${encodeURIComponent(brand.slug)}`}>View all {products.length}</Link></div>
        <div className="product-grid">{showcase.map(p=><ProductCard key={p.id} product={p}/>)}</div>
      </section>

      {products.length>showcase.length&&<div className="brand-v5-more"><Link className="button gold" href={`/shop?brand=${encodeURIComponent(brand.slug)}`}>View all {brand.name} products</Link></div>}
    </section>
    <SiteFooter/>
  </main>;
}
