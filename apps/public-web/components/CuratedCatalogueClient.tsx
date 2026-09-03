'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import {Search,SlidersHorizontal,X,ArrowRight} from 'lucide-react';

type Item={slug:string;brand:string;name:string;segment:string;shortDescription:string;quickSpecs:string[]};
export default function CuratedCatalogueClient({items,basePath,filterLabel='Type',filterOptions=[],filterKey='segment'}:{items:Item[];basePath:string;filterLabel?:string;filterOptions?:string[];filterKey?:'segment'|'type'|'family'}){
 const [q,setQ]=useState('');const [brand,setBrand]=useState('All brands');const [filter,setFilter]=useState('All');const [sort,setSort]=useState('Featured');const [open,setOpen]=useState(false);
 const brands=useMemo(()=>Array.from(new Set(items.map(x=>x.brand))),[items]);
 const filtered=useMemo(()=>{let a=items.filter(x=>(brand==='All brands'||x.brand===brand)&&(filter==='All'||String((x as any)[filterKey]).toLowerCase()===filter.toLowerCase())&&(!q||`${x.name} ${x.brand} ${x.shortDescription} ${x.quickSpecs.join(' ')}`.toLowerCase().includes(q.toLowerCase())));if(sort==='A–Z')a=[...a].sort((x,y)=>x.name.localeCompare(y.name));if(sort==='Brand')a=[...a].sort((x,y)=>x.brand.localeCompare(y.brand)||x.name.localeCompare(y.name));return a},[items,brand,filter,q,sort,filterKey]);
 const clear=()=>{setQ('');setBrand('All brands');setFilter('All');setSort('Featured')};
 return <>
  <div className="smart-catalogue-tools">
   <div className="smart-search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products, brands or features" aria-label="Search products"/>{q&&<button onClick={()=>setQ('')} aria-label="Clear search"><X size={15}/></button>}</div>
   <button className="filterToggle" onClick={()=>setOpen(v=>!v)}><SlidersHorizontal size={15}/> Filters</button>
   <div className={`smart-filters ${open?'open':''}`}>
    <label>Brand<select value={brand} onChange={e=>setBrand(e.target.value)}><option>All brands</option>{brands.map(b=><option key={b}>{b}</option>)}</select></label>
    {filterOptions.length>0&&<label>{filterLabel}<select value={filter} onChange={e=>setFilter(e.target.value)}><option value="All">All</option>{filterOptions.map(x=><option key={x}>{x}</option>)}</select></label>}
    <label>Sort<select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>A–Z</option><option>Brand</option></select></label>
    <button className="clearFilters" onClick={clear}>Clear</button>
   </div>
  </div>
  <div className="smart-results"><span>{filtered.length} {filtered.length===1?'product':'products'}</span>{(q||brand!=='All brands'||filter!=='All'||sort!=='Featured')&&<button onClick={clear}>Clear filters</button>}</div>
  {filtered.length?<div className="premium-product-grid">{filtered.map(x=><Link href={`${basePath}/${x.slug}`} className="premium-product-card" key={x.slug}>
   <div className="premium-product-media"><span>{x.brand}</span><strong>{x.name}</strong><small>Product photo coming soon</small></div>
   <div className="premium-product-body"><p>{x.brand}</p><h3>{x.name}</h3><p>{x.shortDescription}</p><div className="spec-pills">{x.quickSpecs.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><div className="card-footer"><strong>Price coming soon</strong><span>View details <ArrowRight size={13}/></span></div></div>
  </Link>)}</div>:<div className="catalogue-empty"><h3>No products match those choices.</h3><p>Try another brand, filter or search term.</p><button className="button gold" onClick={clear}>Show all products</button></div>}
 </>;
}
