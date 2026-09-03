'use client';
import Link from 'next/link';
import {useMemo,useState} from 'react';
import ProductCard from './ProductCard';
import type {Product} from '../lib/catalog';
import {Search,SlidersHorizontal,X} from 'lucide-react';

export default function DatabaseCatalogueClient({items,title='Catalogue'}:{items:Product[];title?:string}){
 const [q,setQ]=useState(''),[brand,setBrand]=useState('All'),[sort,setSort]=useState('Featured'),[open,setOpen]=useState(false);
 const brands=useMemo(()=>['All',...Array.from(new Set(items.map(x=>x.brand_name).filter(Boolean) as string[])).sort(),],[items]);
 const filtered=useMemo(()=>{let r=items.filter(p=>{const hay=`${p.name} ${p.brand_name||''} ${p.category_name||''} ${p.short_description||''} ${p.description||''}`.toLowerCase();return (brand==='All'||p.brand_name===brand)&&(!q||hay.includes(q.toLowerCase()))});if(sort==='A–Z')r=[...r].sort((a,b)=>a.name.localeCompare(b.name));return r},[items,q,brand,sort]);
 const clear=()=>{setQ('');setBrand('All');setSort('Featured')};
 return <div className="universal-shop"><div className="shop-toolbar"><div className="shop-search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Search ${title.toLowerCase()}…`} aria-label={`Search ${title}`}/></div><button className="mobile-filter-button" onClick={()=>setOpen(v=>!v)}><SlidersHorizontal size={16}/> Filters</button><div className={`shop-selects ${open?'open':''}`}><label>Brand<select value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(b=><option key={b}>{b}</option>)}</select></label><label>Sort<select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>A–Z</option></select></label></div></div><div className="shop-result-row"><span><b>{filtered.length.toLocaleString()}</b> published products</span>{(q||brand!=='All'||sort!=='Featured')&&<button onClick={clear}><X size={14}/> Clear filters</button>}</div>{filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="empty"><Search/><h2>No products are currently listed here.</h2><p>Try another search or browse the full Amaal catalogue.</p><Link className="button outline" href="/shop">Shop everything</Link></div>}</div>
}
