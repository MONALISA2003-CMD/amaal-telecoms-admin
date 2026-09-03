'use client';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal, Tv } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { TVDisplayProduct } from '../lib/tv-catalogue';

export default function TVCatalogueClient({ products, brands }: { products: TVDisplayProduct[]; brands: readonly string[] }) {
  const [query,setQuery]=useState(''); const [brand,setBrand]=useState('ALL'); const [size,setSize]=useState('ALL'); const [technology,setTechnology]=useState('ALL');
  const sizes=useMemo(()=>Array.from(new Set(products.map(p=>p.size))).sort((a,b)=>Number(a)-Number(b)),[products]);
  const technologies=useMemo(()=>Array.from(new Set(products.map(p=>p.technology).filter(Boolean))).sort(),[products]);
  const filtered=useMemo(()=>products.filter(p=>{
    const hay=`${p.brand} ${p.model} ${p.fullName} ${p.technology} ${p.size}`.toLowerCase();
    return (!query||hay.includes(query.toLowerCase())) && (brand==='ALL'||p.brand===brand) && (size==='ALL'||p.size===size) && (technology==='ALL'||p.technology===technology);
  }),[products,query,brand,size,technology]);
  const grouped=useMemo(()=>sizes.reduce<Record<string,TVDisplayProduct[]>>((acc,s)=>{const rows=filtered.filter(p=>p.size===s);if(rows.length)acc[s]=rows.sort((a,b)=>a.brand.localeCompare(b.brand)||a.model.localeCompare(b.model));return acc},{}),[filtered,sizes]);
  return <>
    <div className="tv-toolbar tv-toolbar-premium"><div className="tv-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a brand or model…" aria-label="Search televisions"/></div><div className="tv-filters"><select value={brand} onChange={e=>setBrand(e.target.value)} aria-label="Brand"><option value="ALL">All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select><select value={size} onChange={e=>setSize(e.target.value)} aria-label="Screen size"><option value="ALL">All sizes</option>{sizes.map(s=><option key={s}>{s}&quot;</option>)}</select><select value={technology} onChange={e=>setTechnology(e.target.value)} aria-label="Display technology"><option value="ALL">All display types</option>{technologies.map(t=><option key={t}>{t}</option>)}</select></div></div>
    <div className="tv-result-line"><span>{filtered.length} screen options</span><span><SlidersHorizontal size={14}/> Refine your selection</span></div>
    {Object.keys(grouped).map(screenSize=><section className="tv-size-section" key={screenSize} id={`size-${screenSize}`}><div className="tv-size-heading"><div><p className="eyebrow">SCREEN SIZE</p><h2>{screenSize}&quot;</h2></div><span>{grouped[screenSize].length} models</span></div><div className="tv-size-brands">{brands.filter(b=>grouped[screenSize].some(p=>p.brand===b)).map(b=><div className="tv-size-brand" key={b}><div className="tv-size-brand-head"><h3>{b}<span>{grouped[screenSize].filter(p=>p.brand===b).length}</span></h3><Link href={`/tvs/brand/${b.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`}>View brand <ArrowRight size={13}/></Link></div><div className="tv-model-row">{grouped[screenSize].filter(p=>p.brand===b).map(p=><TVModelCard key={p.slug} product={p}/>)}</div></div>)}</div></section>)}
    {!filtered.length&&<div className="tv-empty"><Tv size={30}/><h2>No televisions found</h2><p>Try another brand, model or screen size.</p><button onClick={()=>{setQuery('');setBrand('ALL');setSize('ALL');setTechnology('ALL')}}>Clear filters</button></div>}
  </>;
}
function TVModelCard({product:p}:{product:TVDisplayProduct}) { return <Link className="tv-model-card" href={`/tvs/${p.slug}`}><div className="tv-model-art"><Tv size={26}/><span>{p.brand}</span></div><div><small>{p.size}&quot; · {p.technology || 'Television'}</small><h4>{p.fullName}</h4><div className="tv-quick-specs">{p.quickSpecs.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><strong>Price coming soon</strong><span className="tv-model-view">View full specifications <ArrowRight size={13}/></span></div></Link>; }
