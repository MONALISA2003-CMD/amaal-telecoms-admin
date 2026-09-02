'use client';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';import {getCart} from '../lib/commerce';import {amaalCategoryNavigation} from '../lib/category-navigation';import SearchAssist from './SearchAssist';
export default function SiteHeader(){
 const [open,setOpen]=useState(false); const [catOpen,setCatOpen]=useState(false); const [bagCount,setBagCount]=useState(0); useEffect(()=>{const sync=()=>setBagCount(getCart().reduce((n,x)=>n+x.qty,0));sync();window.addEventListener('amaal-commerce-updated',sync);return()=>window.removeEventListener('amaal-commerce-updated',sync)},[]);
 return <>
  <div className="topline">Genuine products <span>·</span> Trusted brands <span>·</span> Delivery across Uganda</div>
  <header className="site-header"><Link className="brand" href="/" aria-label="Amaal home"><Image src="/assets/amaal/logo-official.png" alt="Amaal" width={172} height={27} priority /></Link>
   <nav className="desktop-nav" aria-label="Primary"><Link href="/shop">Shop</Link><Link href="/categories">Categories</Link><Link href="/brands">Brands</Link><Link href="/collections">Collections</Link><Link href="/deals">Deals</Link><Link href="/services">Services</Link></nav>
   <div className="nav-actions"><Link href="/search" aria-label="Search"><Search size={19}/></Link><Link href="/account" aria-label="Account"><UserRound size={19}/></Link><Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={19}/><span className="bag-count">{bagCount}</span></Link><button className="mobile-menu" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu size={21}/></button></div>
  </header><div className="header-search-assist"><SearchAssist/></div>
  {open&&<div className="mobile-drawer"><div className="drawer-head"><Link className="brand" href="/" onClick={()=>setOpen(false)} aria-label="Amaal home"><Image src="/assets/amaal/logo-official.png" alt="Amaal" width={172} height={27} /></Link><button onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button></div><nav><Link onClick={()=>setOpen(false)} href="/shop">Shop</Link><div className="mobile-category-menu"><button type="button" onClick={()=>setCatOpen(!catOpen)}>Categories <span>{catOpen?"−":"+"}</span></button>{catOpen&&<div className="mobile-category-list">{amaalCategoryNavigation.map(c=><div key={c.slug}><Link onClick={()=>setOpen(false)} href={c.href}>{c.name}</Link>{c.children?.map(ch=><Link className="nested" onClick={()=>setOpen(false)} href={ch.href} key={ch.slug}>{ch.name}</Link>)}</div>)}</div>}</div><Link onClick={()=>setOpen(false)} href="/brands">Brands</Link><Link onClick={()=>setOpen(false)} href="/collections">Collections</Link><Link onClick={()=>setOpen(false)} href="/deals">Deals</Link><Link onClick={()=>setOpen(false)} href="/services">Services</Link><Link onClick={()=>setOpen(false)} href="/search">Search</Link><Link onClick={()=>setOpen(false)} href="/account">Account</Link></nav></div>}
 </>
}
