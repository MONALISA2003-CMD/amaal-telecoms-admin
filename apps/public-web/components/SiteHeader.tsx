'use client';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
export default function SiteHeader(){
 const [open,setOpen]=useState(false);
 return <>
  <div className="topline">Genuine products <span>·</span> Trusted brands <span>·</span> Delivery across Uganda</div>
  <header className="site-header"><Link className="brand" href="/">AMAAL</Link>
   <nav className="desktop-nav" aria-label="Primary"><Link href="/shop">Shop</Link><Link href="/categories">Categories</Link><Link href="/audio">Audio</Link><Link href="/brands">Brands</Link><Link href="/deals">Deals</Link><Link href="/services">Services</Link></nav>
   <div className="nav-actions"><Link href="/search" aria-label="Search"><Search size={19}/></Link><Link href="/account" aria-label="Account"><UserRound size={19}/></Link><Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={19}/></Link><button className="mobile-menu" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu size={21}/></button></div>
  </header>
  {open&&<div className="mobile-drawer"><div className="drawer-head"><span className="brand">AMAAL</span><button onClick={()=>setOpen(false)} aria-label="Close menu"><X/></button></div><nav><Link onClick={()=>setOpen(false)} href="/shop">Shop</Link><Link onClick={()=>setOpen(false)} href="/categories">Categories</Link><Link onClick={()=>setOpen(false)} href="/audio">Audio</Link><Link onClick={()=>setOpen(false)} href="/brands">Brands</Link><Link onClick={()=>setOpen(false)} href="/deals">Deals</Link><Link onClick={()=>setOpen(false)} href="/services">Services</Link><Link onClick={()=>setOpen(false)} href="/search">Search</Link><Link onClick={()=>setOpen(false)} href="/account">Account</Link></nav></div>}
 </>
}
