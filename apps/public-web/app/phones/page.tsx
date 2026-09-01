'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import PhoneCatalogueCard from '../../components/PhoneCatalogueCard';
import { phoneCatalogue } from '../../lib/phone-catalogue';

const brands = ['All','Apple','Samsung','Google Pixel','TECNO','Infinix','itel'];
const families = ['All','iPhone','Galaxy','Pixel','TECNO','Infinix','itel'];
export default function PhonesPage(){
  const [brand,setBrand]=useState('All'); const [family,setFamily]=useState('All'); const [query,setQuery]=useState('');
  const filtered=useMemo(()=>phoneCatalogue.filter(p=>{
    const text=`${p.name} ${p.brand} ${p.series}`.toLowerCase();
    return (brand==='All'||p.brand===brand)&&(family==='All'||p.family===family)&&text.includes(query.toLowerCase().trim());
  }),[brand,family,query]);
  return <main><SiteHeader/><section className="section phone-catalogue-page"><div className="listing-intro"><p className="eyebrow">THE PHONE COLLECTION</p><h1>Phones, properly catalogued.</h1><p>Explore Amaal's multi-brand phone catalogue by model and configuration. Each model has one product page with its available storage, memory and network variants.</p></div><div className="phone-catalogue-tools"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search phone models…" aria-label="Search phone models"/><div><p className="filter-label">Brand</p><div className="phone-brand-filters">{brands.map(b=><button type="button" key={b} className={brand===b?'active':''} onClick={()=>setBrand(b)}>{b}</button>)}</div></div><div><p className="filter-label">Family</p><div className="phone-brand-filters">{families.map(b=><button type="button" key={b} className={family===b?'active':''} onClick={()=>setFamily(b)}>{b}</button>)}</div></div></div><div className="catalogue-count"><span>{filtered.length} phone models</span><Link href="/categories/phones">Back to category</Link></div><div className="phone-catalogue-grid">{filtered.map(p=><PhoneCatalogueCard key={p.slug} product={p}/>)}</div>{!filtered.length&&<div className="empty"><h2>No matching phone models.</h2><p>Try another model, family or brand.</p></div>}</section><SiteFooter/></main>
}
