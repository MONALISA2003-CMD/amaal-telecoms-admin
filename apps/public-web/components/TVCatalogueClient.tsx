'use client';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal, Tv } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { TVProduct } from '../lib/tv-catalogue';
import { tvDescription, tvMedia } from '../lib/tv-catalogue';

export default function TVCatalogueClient({ products, brands }: { products: TVProduct[]; brands: readonly string[] }) {
  const [query,setQuery]=useState(''); const [brand,setBrand]=useState('ALL'); const [size,setSize]=useState('ALL'); const [technology,setTechnology]=useState('ALL');
  const sizes=useMemo(()=>Array.from(new Set(products.flatMap(p=>p.sizes))).sort((a,b)=>Number(a)-Number(b)),[products]);
  const technologies=useMemo(()=>Array.from(new Set(products.map(p=>p.technology).filter(Boolean))).sort(),[products]);
  const filtered=useMemo(()=>products.filter(p=>{
    const hay=`${p.brand} ${p.model} ${p.technology} ${p.generation} ${p.sizes.join(' ')}`.toLowerCase();
    return (!query||hay.includes(query.toLowerCase())) && (brand==='ALL'||p.brand===brand) && (size==='ALL'||p.sizes.includes(size)) && (technology==='ALL'||p.technology===technology);
  }),[products,query,brand,size,technology]);
  return <>
    <div className="tv-toolbar">
      <div className="tv-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search TVs by brand or model…" aria-label="Search televisions"/></div>
      <div className="tv-filters"><select value={brand} onChange={e=>setBrand(e.target.value)} aria-label="Brand"><option value="ALL">All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select><select value={size} onChange={e=>setSize(e.target.value)} aria-label="Screen size"><option value="ALL">All sizes</option>{sizes.map(s=><option key={s} value={s}>{s}&quot; screen</option>)}</select><select value={technology} onChange={e=>setTechnology(e.target.value)} aria-label="Display technology"><option value="ALL">All display types</option>{technologies.map(t=><option key={t}>{t}</option>)}</select></div>
    </div>
    <div className="tv-result-line"><span>{filtered.length} models</span><span><SlidersHorizontal size={14}/> Refine your selection</span></div>
    <div className="tv-product-grid">{filtered.map(p=><TVCard key={p.slug} product={p}/>)}</div>
    {!filtered.length&&<div className="tv-empty"><Tv size={30}/><h2>No televisions found</h2><p>Try another brand, model or screen size.</p><button onClick={()=>{setQuery('');setBrand('ALL');setSize('ALL');setTechnology('ALL')}}>Clear filters</button></div>}
  </>;
}
function TVCard({product:p}:{product:TVProduct}){const media=tvMedia(p);return <article className="tv-card"><Link href={`/tvs/${p.slug}`} className="tv-card-media">{media?<img src={media} alt={`${p.brand} ${p.model}`} loading="lazy"/>:<div className="tv-placeholder"><Tv size={34}/><span>AMAAL</span><strong>{p.brand}</strong><small>Product image coming soon</small></div>}<span>{p.generation==='CURRENT'?'Current collection':'Explore model'}</span></Link><div className="tv-card-body"><p className="tv-card-brand">{p.brand}</p><h2><Link href={`/tvs/${p.slug}`}>{p.model}</Link></h2><p>{tvDescription(p)}</p><div className="tv-card-meta">{p.sizes.slice(0,4).map(s=><b key={s}>{s}&quot;</b>)}{p.sizes.length>4&&<b>+{p.sizes.length-4}</b>}</div><Link className="tv-card-action" href={`/tvs/${p.slug}`}>View television <ArrowRight size={14}/></Link></div></article>}
