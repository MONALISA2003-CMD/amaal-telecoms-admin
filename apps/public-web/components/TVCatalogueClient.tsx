'use client';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal, Tv } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { TVProduct } from '../lib/tv-catalogue';
import { tvDisplayProduct } from '../lib/tv-catalogue';

export default function TVCatalogueClient({ products, brands }: { products: TVProduct[]; brands: readonly string[] }) {
  const catalogue = useMemo(() => products.map(tvDisplayProduct), [products]);
  const [query,setQuery]=useState(''); const [brand,setBrand]=useState('ALL'); const [size,setSize]=useState('ALL'); const [technology,setTechnology]=useState('ALL');
  const sizes=useMemo(()=>Array.from(new Set(catalogue.flatMap(p=>p.sizes))).sort((a,b)=>Number(a)-Number(b)),[catalogue]);
  const technologies=useMemo(()=>Array.from(new Set(catalogue.map(p=>p.technology).filter(Boolean))).sort(),[products]);
  const filtered=useMemo(()=>catalogue.filter(p=>{
    const hay=`${p.brand} ${p.model} ${p.technology} ${p.sizes.join(' ')}`.toLowerCase();
    return (!query||hay.includes(query.toLowerCase())) && (brand==='ALL'||p.brand===brand) && (size==='ALL'||p.sizes.includes(size)) && (technology==='ALL'||p.technology===technology);
  }),[catalogue,query,brand,size,technology]);
  const grouped=useMemo(()=>sizes.reduce<Record<string,TVProduct[]>>((acc,s)=>{const rows=filtered.filter(p=>p.sizes.includes(s)); if(rows.length) acc[s]=rows.sort((a,b)=>a.brand.localeCompare(b.brand)||a.model.localeCompare(b.model)); return acc},{}),[filtered,sizes]);
  return <>
    <div className="tv-toolbar tv-toolbar-premium">
      <div className="tv-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by brand or model…" aria-label="Search televisions"/></div>
      <div className="tv-filters"><select value={brand} onChange={e=>setBrand(e.target.value)} aria-label="Brand"><option value="ALL">All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select><select value={size} onChange={e=>setSize(e.target.value)} aria-label="Screen size"><option value="ALL">All sizes</option>{sizes.map(s=><option key={s} value={s}>{s}&quot;</option>)}</select><select value={technology} onChange={e=>setTechnology(e.target.value)} aria-label="Display technology"><option value="ALL">All display types</option>{technologies.map(t=><option key={t}>{t}</option>)}</select></div>
    </div>
    <div className="tv-result-line"><span>{filtered.length} televisions</span><span><SlidersHorizontal size={14}/> Refine your selection</span></div>
    {Object.keys(grouped).map((screenSize)=>{ const rows=grouped[screenSize]; return <section className="tv-size-section" key={screenSize} id={`size-${screenSize}`}>
      <div className="tv-size-heading"><div><p className="eyebrow">SCREEN SIZE</p><h2>{screenSize}&quot;</h2></div><span>{rows.length} models</span></div>
      <div className="tv-size-brands">
        {brands.filter(b=>rows.some(p=>p.brand===b)).map(b=><div className="tv-size-brand" key={b}><div className="tv-size-brand-head"><h3>{b} <span>{rows.filter(p=>p.brand===b).length}</span></h3><Link href={`/tvs/brand/${b.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}>View brand <ArrowRight size={13}/></Link></div><div className="tv-model-row">{rows.filter(p=>p.brand===b).map(p=><TVModelCard key={`${p.slug}-${screenSize}`} product={p} size={screenSize}/>)}</div></div>)}
      </div>
    </section>})}
    {!filtered.length&&<div className="tv-empty"><Tv size={30}/><h2>No televisions found</h2><p>Try another brand, model or screen size.</p><button onClick={()=>{setQuery('');setBrand('ALL');setSize('ALL');setTechnology('ALL')}}>Clear filters</button></div>}
  </>;
}
function TVModelCard({product:p,size}:{product:TVProduct;size:string}) { return <Link className="tv-model-card" href={`/tvs/${p.slug}`}><div className="tv-model-art"><Tv size={26}/><span>{p.brand}</span></div><div><small>{size}&quot; · {p.technology || 'Television'}</small><h4>{p.model}</h4><strong>Price coming soon</strong><span className="tv-model-view">View details <ArrowRight size={13}/></span></div></Link>; }
