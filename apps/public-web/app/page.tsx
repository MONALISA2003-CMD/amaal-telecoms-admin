import Link from 'next/link';
import { ArrowRight, CircleCheck, Headphones, ShieldCheck, Truck, Wrench } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ProductCard from '../components/ProductCard';
import {getPublishedCatalog} from '../lib/catalog-runtime';
import {buildCategoryNavigation} from '../lib/category-navigation';
import AutoRail from '../components/AutoRail';

function CategoryCard({name,slug,index}:{name:string;slug:string;index:number}){
  return <Link className="category-card" href={`/shop?category=${encodeURIComponent(slug)}`}><div className="category-placeholder"><span>{String(index+1).padStart(2,'0')}</span><strong>{name}</strong></div><div className="category-copy"><h3>{name}</h3><p>Explore {name.toLowerCase()} at Amaal.</p></div></Link>
}

export default async function Home(){
  const catalog=await getPublishedCatalog();
  const nav=buildCategoryNavigation(catalog.categories);
  const liveProducts=catalog.products;
  const featured=liveProducts.filter(p=>p.featured);
  const featuredProducts=(featured.length?featured:liveProducts).slice(0,8);
  const newProducts=liveProducts.filter(p=>!p.featured).slice(0,8);
  const brands=catalog.brands.filter(b=>liveProducts.some(p=>p.brand_slug===b.slug)).slice(0,12);
  return <main>
    <SiteHeader/>
    <section className="lux-hero">
      <div className="hero-copy"><p className="eyebrow">THE NEW STANDARD IN TECHNOLOGY</p><h1>Better technology.<br/><em>Better every day.</em></h1><p>Premium devices and appliances for your home, work and lifestyle — selected for the way you live.</p><div className="hero-actions"><Link className="button gold" href="/shop">Shop now <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/about">Discover Amaal</Link></div><div className="hero-note"><CircleCheck size={15}/> Genuine products from trusted brands</div></div>
      <div className="hero-stage" aria-hidden="true" />
    </section>

    <section className="trust-strip" aria-label="Amaal assurances"><div><ShieldCheck/><span><strong>100% authentic</strong><small>Genuine products</small></span></div><div><ShieldCheck/><span><strong>Trusted brands</strong><small>Brands you know</small></span></div><div><Truck/><span><strong>Fast delivery</strong><small>Across Uganda</small></span></div><div><Wrench/><span><strong>Warranty support</strong><small>Here after the sale</small></span></div><div><Headphones/><span><strong>Expert assistance</strong><small>Help when you need it</small></span></div></section>

    <section className="section category-section"><div className="section-head"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2>Shop by category</h2><p className="section-intro">Eight everyday categories, moving continuously so customers can discover more without leaving the page.</p></div><Link className="quiet-link" href="/categories">View all <ArrowRight size={15}/></Link></div><AutoRail className="category-rail" label="Shop by category" speed={0.42}>{nav.slice(0,8).map((c,i)=><CategoryCard name={c.name} slug={c.slug} index={i} key={c.slug}/>)}</AutoRail></section>

    <section className="section featured-section"><div className="section-head"><div><p className="eyebrow">THE AMAAL EDIT</p><h2>Featured at Amaal</h2><p className="section-intro">Quick details and clear pricing on a rotating selection. Open any product for the full story, specifications and buying information.</p></div><Link className="quiet-link" href="/shop">Shop all <ArrowRight size={15}/></Link></div><AutoRail className="product-rail" label="Featured at Amaal" speed={0.34}>{featuredProducts.map(p=><ProductCard key={p.id} product={p}/>)}</AutoRail></section>

    <section className="lifestyle-feature"><div className="lifestyle-copy"><p className="eyebrow">AMAAL EDIT</p><h2>Bring home experiences that matter.</h2><p>From brilliant screens to powerful sound, from the kitchen to the office — discover technology selected for real everyday life.</p><Link className="button gold" href="/deals">Explore deals <ArrowRight size={16}/></Link></div><div className="lifestyle-scene" aria-hidden="true"><div className="scene-placeholder scene-tv-placeholder"></div><div className="scene-placeholder scene-sound-placeholder"></div></div></section>

    <section className="section arrivals-section"><div className="section-head"><div><p className="eyebrow">JUST IN</p><h2>New at Amaal</h2><p className="section-intro">Fresh arrivals with the essentials customers need to understand at a glance.</p></div><Link className="quiet-link" href="/shop">View collection <ArrowRight size={15}/></Link></div><AutoRail className="product-rail" label="New at Amaal" speed={0.34}>{newProducts.map(p=><ProductCard key={p.id} product={p}/>)}</AutoRail></section>

    <section className="section brand-section"><div className="section-head"><div><p className="eyebrow">TRUSTED NAMES</p><h2>Shop by brand</h2><p className="section-intro">Recognisable brands, presented simply.</p></div><Link className="quiet-link" href="/brands">Explore brands <ArrowRight size={15}/></Link></div><AutoRail className="brand-rail" label="Shop by brand" speed={0.4}>{brands.map(b=><Link href={`/brands/${b.slug}`} className="brand-card" key={b.slug}><span className="brand-logo-placeholder">{b.name}</span></Link>)}</AutoRail></section>

    <section className="section weekly-section"><div className="weekly-heading"><div><p className="eyebrow">THIS WEEK</p><h2>Weekly deals</h2><p>Fresh weekly offers will live here, with the actual promotion, validity and price supplied by Amaal.</p></div><Link className="button gold" href="/deals">See all deals <ArrowRight size={16}/></Link></div><div className="weekly-grid"><Link href="/deals" className="weekly-card"><span>PHONE DEALS</span><h3>Upgrade your everyday.</h3></Link><Link href="/deals" className="weekly-card dark"><span>HOME ENTERTAINMENT</span><h3>Make movie night better.</h3></Link><Link href="/deals" className="weekly-card"><span>APPLIANCE DEALS</span><h3>Better home, better value.</h3></Link></div></section>

    <section className="difference-section"><div className="difference-intro"><p className="eyebrow">THE AMAAL DIFFERENCE</p><h2>More than a purchase.</h2><p>Authentic products, clear information and helpful support — before, during and after you buy.</p></div><div className="difference-grid"><div><span>01</span><h3>Authentic by design</h3><p>Buy with confidence.</p></div><div><span>02</span><h3>Advice that helps</h3><p>Choose with clarity.</p></div><div><span>03</span><h3>Support that stays</h3><p>We're here after checkout.</p></div><div><span>04</span><h3>Technology made simple</h3><p>For real everyday life.</p></div></div></section>

    <section className="section service-section"><div><p className="eyebrow">BEYOND THE SALE</p><h2>We're here after the purchase, too.</h2><p>Delivery, warranty, repairs, returns and support — in one place.</p></div><div className="service-links"><Link href="/tracking">Track an order <ArrowRight size={16}/></Link><Link href="/delivery">Delivery information <ArrowRight size={16}/></Link><Link href="/warranty">Warranty support <ArrowRight size={16}/></Link><Link href="/repairs">Repairs & service <ArrowRight size={16}/></Link><Link href="/contact">Make an enquiry <ArrowRight size={16}/></Link></div></section>

    <section className="assist-section"><div><p className="eyebrow">NEED A LITTLE HELP?</p><h2>Not sure what you need?</h2><p>Tell us what you're looking for and our team can help you find the right technology for your home, work or everyday life.</p></div><Link className="button gold" href="/contact">Talk to Amaal <ArrowRight size={16}/></Link></section>
    <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Technology worth knowing about.</h2><p>New arrivals, offers and useful stories from Amaal.</p></div><form><input placeholder="Enter your email" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight size={17}/></button></form></section>
    <SiteFooter/>
  </main>
}
