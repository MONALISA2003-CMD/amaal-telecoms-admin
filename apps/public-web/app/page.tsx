import Link from 'next/link';
import { ArrowRight, CircleCheck, ChevronRight, Headphones, ShieldCheck, Truck, Wrench } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import AddToBag from '../components/AddToBag';
import AutoRail from '../components/AutoRail';
import ProductGallery from '../components/ProductGallery';
import { featuredProducts, homeBrands, homeCategories, newProducts, type HomeProduct } from '../lib/homepage-data';

function ugx(value:number){return value ? new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(value) : 'Price on request'}

function ProductTile({p}:{p:HomeProduct}){
  return <article className="home-product-card">
    <ProductGallery images={p.images} compact label={p.name}/>
    <Link href={`/product/${p.slug}`} className="home-product-link" aria-label={`View ${p.name}`}>
      <div className="home-product-meta"><p>{p.brand}</p><h3>{p.name}</h3><span>{p.quickDetails.slice(0,2).join(' · ')}</span><strong>{ugx(p.price)}</strong></div>
    </Link>
    {p.price>0 && <AddToBag id={p.slug} name={p.name} price={ugx(p.price)}/>}
  </article>
}

function CategoryCard({name,slug,index}:{name:string;slug:string;index:number}){
  return <Link className="category-card" href={`/categories/${slug}`}><div className="category-placeholder"><span>0{index+1}</span><strong>{name}</strong><small>PHOTO TO BE SUPPLIED</small></div><div className="category-copy"><h3>{name}</h3><p>Explore {name.toLowerCase()} at Amaal.</p></div><ChevronRight size={17}/></Link>
}

export default function Home(){
  return <main>
    <SiteHeader/>
    <section className="lux-hero">
      <div className="hero-copy"><p className="eyebrow">THE NEW STANDARD IN TECHNOLOGY</p><h1>Better technology.<br/><em>Better every day.</em></h1><p>Premium devices and appliances for your home, work and lifestyle — selected for the way you live.</p><div className="hero-actions"><Link className="button gold" href="/shop">Shop now <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/about">Discover Amaal</Link></div><div className="hero-note"><CircleCheck size={15}/> Genuine products from trusted brands</div></div>
      <div className="hero-stage" aria-label="Amaal hero product composition awaiting supplied product photography"><div className="hero-ambient"/><div className="hero-asset hero-tv"><span>TV HERO PHOTO</span><small>Samsung 75-inch asset</small></div><div className="hero-asset hero-phone hero-phone-one"><span>PHONE PHOTO</span><small>iPhone asset</small></div><div className="hero-asset hero-phone hero-phone-two"><span>PHONE PHOTO</span><small>Galaxy asset</small></div><div className="hero-asset hero-sound"><span>AUDIO PHOTO</span><small>Soundbar asset</small></div><div className="hero-floor"/></div>
    </section>

    <section className="trust-strip" aria-label="Amaal assurances"><div><ShieldCheck/><span><strong>100% authentic</strong><small>Genuine products</small></span></div><div><ShieldCheck/><span><strong>Trusted brands</strong><small>Brands you know</small></span></div><div><Truck/><span><strong>Fast delivery</strong><small>Across Uganda</small></span></div><div><Wrench/><span><strong>Warranty support</strong><small>Here after the sale</small></span></div><div><Headphones/><span><strong>Expert assistance</strong><small>Help when you need it</small></span></div></section>

    <section className="section category-section"><div className="section-head"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2>Shop by category</h2><p className="section-intro">Seven everyday categories, moving continuously so customers can discover more without leaving the page.</p></div><Link className="quiet-link" href="/categories">View all <ArrowRight size={15}/></Link></div><AutoRail className="category-rail">{homeCategories.map(([name,slug],i)=><CategoryCard name={name} slug={slug} index={i} key={name}/>)}</AutoRail></section>

    <section className="section featured-section"><div className="section-head"><div><p className="eyebrow">THE AMAAL EDIT</p><h2>Featured at Amaal</h2><p className="section-intro">Quick details and clear pricing on a rotating selection. Open any product for the full story, specifications and buying information.</p></div><Link className="quiet-link" href="/shop">Shop all <ArrowRight size={15}/></Link></div><AutoRail className="product-rail">{featuredProducts.map(p=><ProductTile key={p.slug} p={p}/>)}</AutoRail></section>

    <section className="lifestyle-feature"><div className="lifestyle-copy"><p className="eyebrow">AMAAL EDIT</p><h2>Bring home experiences that matter.</h2><p>From brilliant screens to powerful sound, from the kitchen to the office — discover technology selected for real everyday life.</p><Link className="button gold" href="/deals">Explore deals <ArrowRight size={16}/></Link></div><div className="lifestyle-scene"><div className="scene-placeholder scene-tv-placeholder">HOME ENTERTAINMENT PHOTO</div><div className="scene-placeholder scene-sound-placeholder">SOUNDBAR PHOTO</div></div></section>

    <section className="section arrivals-section"><div className="section-head"><div><p className="eyebrow">JUST IN</p><h2>New at Amaal</h2><p className="section-intro">Fresh arrivals with the essentials customers need to understand at a glance.</p></div><Link className="quiet-link" href="/shop">View collection <ArrowRight size={15}/></Link></div><AutoRail className="product-rail">{newProducts.map(p=><ProductTile key={p.slug} p={p}/>)}</AutoRail></section>

    <section className="section brand-section"><div className="section-head"><div><p className="eyebrow">TRUSTED NAMES</p><h2>Shop by brand</h2><p className="section-intro">Recognisable brands, presented simply. Brand artwork can be replaced with supplied official logos.</p></div><Link className="quiet-link" href="/brands">Explore brands <ArrowRight size={15}/></Link></div><AutoRail className="brand-rail">{homeBrands.map((name,i)=><Link href={`/brands/${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} className="brand-card" key={`${name}-${i}`}><span className="brand-logo-placeholder">{name}</span><small>LOGO ASSET</small></Link>)}</AutoRail></section>

    <section className="section weekly-section"><div className="weekly-heading"><div><p className="eyebrow">THIS WEEK</p><h2>Weekly deals</h2><p>Fresh weekly offers will live here, with the actual promotion, validity and price supplied by Amaal.</p></div><Link className="button gold" href="/deals">See all deals <ArrowRight size={16}/></Link></div><div className="weekly-grid"><Link href="/deals" className="weekly-card"><span>PHONE DEALS</span><h3>Upgrade your everyday.</h3><small>Promotion artwork to be supplied.</small></Link><Link href="/deals" className="weekly-card dark"><span>HOME ENTERTAINMENT</span><h3>Make movie night better.</h3><small>Promotion artwork to be supplied.</small></Link><Link href="/deals" className="weekly-card"><span>APPLIANCE DEALS</span><h3>Better home, better value.</h3><small>Promotion artwork to be supplied.</small></Link></div></section>

    <section className="difference-section"><div className="difference-intro"><p className="eyebrow">THE AMAAL DIFFERENCE</p><h2>More than a purchase.</h2><p>Authentic products, clear information and helpful support — before, during and after you buy.</p></div><div className="difference-grid"><div><span>01</span><h3>Authentic by design</h3><p>Buy with confidence.</p></div><div><span>02</span><h3>Advice that helps</h3><p>Choose with clarity.</p></div><div><span>03</span><h3>Support that stays</h3><p>We're here after checkout.</p></div><div><span>04</span><h3>Technology made simple</h3><p>For real everyday life.</p></div></div></section>

    <section className="section service-section"><div><p className="eyebrow">BEYOND THE SALE</p><h2>We're here after the purchase, too.</h2><p>Delivery, warranty, repairs, returns and support — in one place.</p></div><div className="service-links"><Link href="/tracking">Track an order <ArrowRight size={16}/></Link><Link href="/delivery">Delivery information <ArrowRight size={16}/></Link><Link href="/warranty">Warranty support <ArrowRight size={16}/></Link><Link href="/repairs">Repairs & service <ArrowRight size={16}/></Link><Link href="/contact">Make an enquiry <ArrowRight size={16}/></Link></div></section>

    <section className="assist-section"><div><p className="eyebrow">NEED A LITTLE HELP?</p><h2>Not sure what you need?</h2><p>Tell us what you're looking for and our team can help you find the right technology for your home, work or everyday life.</p></div><Link className="button gold" href="/contact">Talk to Amaal <ArrowRight size={16}/></Link></section>
    <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Technology worth knowing about.</h2><p>New arrivals, offers and useful stories from Amaal.</p></div><form><input placeholder="Enter your email" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight size={17}/></button></form></section>
    <SiteFooter/>
  </main>
}
