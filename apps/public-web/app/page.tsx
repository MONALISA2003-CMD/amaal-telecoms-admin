import Link from 'next/link';
import { ArrowRight, CircleCheck, ChevronRight, Headphones, ShieldCheck, Truck, Wrench } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import AddToBag from '../components/AddToBag';
import AutoRail from '../components/AutoRail';
import ProductGallery from '../components/ProductGallery';
import { featuredProducts, homeBrands, homeCategories, newProducts, weeklyDeals, type HomeProduct } from '../lib/homepage-data';

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

function CategoryCard({name,slug,index,photo}:{name:string;slug:string;index:number;photo:string}){
  return <Link className="category-card" href={`/categories/${slug}`}><div className="category-image"><img src={photo} alt={name} loading="lazy"/><span>0{index+1}</span></div><div className="category-copy"><h3>{name}</h3><p>Explore {name.toLowerCase()} at Amaal.</p></div><ChevronRight size={17}/></Link>
}

const brandMarks: Record<string,string> = {
  TCL:'https://cdn.simpleicons.org/tcl', Samsung:'https://cdn.simpleicons.org/samsung', Apple:'https://cdn.simpleicons.org/apple', 'Google Pixel':'https://cdn.simpleicons.org/google', TECNO:'https://cdn.simpleicons.org/tecno', Infinix:'https://cdn.simpleicons.org/infinix', Saachi:'', Hoffmans:'', LG:'https://cdn.simpleicons.org/lg', Hisense:'', Skyworth:'', 'Harman Kardon':'https://cdn.simpleicons.org/harmankardon', JBL:'https://cdn.simpleicons.org/jbl', Sony:'https://cdn.simpleicons.org/sony'
};

function BrandCard({name}:{name:string}){const mark=brandMarks[name];return <Link href={`/brands/${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} className="brand-card">{mark?<img src={mark} alt={`${name} logo`} loading="lazy"/>:<strong>{name}</strong>}<small>{name}</small></Link>}

export default function Home(){
  return <main>
    <SiteHeader/>
    <section className="lux-hero"><div className="hero-copy"><p className="eyebrow">THE NEW STANDARD IN TECHNOLOGY</p><h1>Better technology.<br/><em>Better every day.</em></h1><p>Premium devices and appliances for your home, work and lifestyle — selected for the way you live.</p><div className="hero-actions"><Link className="button gold" href="/shop">Shop now <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/about">Discover Amaal</Link></div><div className="hero-note"><CircleCheck size={15}/> Genuine products from trusted brands</div></div><div className="hero-stage" aria-label="Luxury technology collection"><div className="hero-ambient"/><img className="hero-photo hero-tv-photo" src="/products/samsung-u8000f-tv.webp" alt="Premium Samsung television"/><img className="hero-photo hero-phone-photo" src="https://www.apple.com/v/iphone-17-pro/h/images/overview/welcome/hero__bsveixlwbms2_xlarge.jpg" alt="Cosmic Orange iPhone 17 Pro"/><img className="hero-photo hero-phone-photo-two" src="/products/galaxy-s26-ultra.webp" alt="Samsung Galaxy flagship phone"/><img className="hero-photo hero-sound-photo" src="/products/samsung-b550-soundbar.webp" alt="Premium soundbar"/><div className="hero-floor"/></div></section>

    <section className="trust-strip" aria-label="Amaal assurances"><div><ShieldCheck/><span><strong>100% authentic</strong><small>Genuine products</small></span></div><div><ShieldCheck/><span><strong>Trusted brands</strong><small>Brands you know</small></span></div><div><Truck/><span><strong>Fast delivery</strong><small>Across Uganda</small></span></div><div><Wrench/><span><strong>Warranty support</strong><small>Here after the sale</small></span></div><div><Headphones/><span><strong>Expert assistance</strong><small>Help when you need it</small></span></div></section>

    <section className="section category-section"><div className="section-head"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2>Shop by category</h2><p className="section-intro">Signature products and luxury environments give every category a clear visual identity.</p></div><Link className="quiet-link" href="/categories">View all <ArrowRight size={15}/></Link></div><AutoRail className="category-rail">{homeCategories.map(([name,slug,,photo],i)=><CategoryCard name={name} slug={slug} index={i} photo={photo} key={name}/>)}</AutoRail></section>

    <section className="section featured-section"><div className="section-head"><div><p className="eyebrow">THE AMAAL EDIT</p><h2>Featured at Amaal</h2><p className="section-intro">Quick details and clear pricing on a rotating selection. Open any product for the full story, specifications and buying information.</p></div><Link className="quiet-link" href="/shop">Shop all <ArrowRight size={15}/></Link></div><AutoRail className="product-rail">{featuredProducts.map(p=><ProductTile key={p.slug} p={p}/>)}</AutoRail></section>

    <section className="lifestyle-feature"><div className="lifestyle-copy"><p className="eyebrow">AMAAL EDIT</p><h2>Bring home experiences that matter.</h2><p>From brilliant screens to powerful sound, from the kitchen to the office — discover technology selected for real everyday life.</p><Link className="button gold" href="/deals">Explore deals <ArrowRight size={16}/></Link></div><div className="lifestyle-scene"><img src="https://www.ultimea.com/cdn/shop/articles/EN_4e71e692-aff8-4d85-8ba6-e42b4ca15dab.webp?v=1756389773" alt="Luxury TV and soundbar living room"/><div className="scene-label">TV · SOUND · HOME ENTERTAINMENT</div></div></section>

    <section className="section arrivals-section"><div className="section-head"><div><p className="eyebrow">JUST IN</p><h2>New at Amaal</h2><p className="section-intro">Fresh arrivals with richer product photography and the essentials customers need to understand at a glance.</p></div><Link className="quiet-link" href="/shop">View collection <ArrowRight size={15}/></Link></div><AutoRail className="product-rail">{newProducts.map(p=><ProductTile key={p.slug} p={p}/>)}</AutoRail></section>

    <section className="section brand-section"><div className="section-head"><div><p className="eyebrow">TRUSTED NAMES</p><h2>Shop by brand</h2><p className="section-intro">Recognisable brand marks, presented cleanly across the full Amaal collection.</p></div><Link className="quiet-link" href="/brands">Explore brands <ArrowRight size={15}/></Link></div><AutoRail className="brand-rail">{homeBrands.map(name=><BrandCard name={name} key={name}/>)}</AutoRail></section>

    <section className="section weekly-section"><div className="weekly-heading"><div><p className="eyebrow">THIS WEEK</p><h2>Weekly deals</h2><p>Seven live-style offers, presented as products rather than generic promotion blocks. Tap any item for its full description.</p></div><Link className="button gold" href="/deals">See all deals <ArrowRight size={16}/></Link></div><AutoRail className="product-rail deals-rail">{weeklyDeals.map(p=><ProductTile key={p.slug} p={p}/>)}</AutoRail></section>

    <section className="difference-section"><div className="difference-intro"><p className="eyebrow">THE AMAAL DIFFERENCE</p><h2>More than a purchase.</h2><p>Authentic products, clear information and helpful support — before, during and after you buy.</p></div><div className="difference-grid"><div><span>01</span><h3>Authentic by design</h3><p>Buy with confidence.</p></div><div><span>02</span><h3>Advice that helps</h3><p>Choose with clarity.</p></div><div><span>03</span><h3>Support that stays</h3><p>We're here after checkout.</p></div><div><span>04</span><h3>Technology made simple</h3><p>For real everyday life.</p></div></div></section>
    <section className="section service-section"><div><p className="eyebrow">BEYOND THE SALE</p><h2>We're here after the purchase, too.</h2><p>Delivery, warranty, repairs, returns and support — in one place.</p></div><div className="service-links"><Link href="/tracking">Track an order <ArrowRight size={16}/></Link><Link href="/delivery">Delivery information <ArrowRight size={16}/></Link><Link href="/warranty">Warranty support <ArrowRight size={16}/></Link><Link href="/repairs">Repairs & service <ArrowRight size={16}/></Link><Link href="/contact">Make an enquiry <ArrowRight size={16}/></Link></div></section>
    <section className="assist-section"><div><p className="eyebrow">NEED A LITTLE HELP?</p><h2>Not sure what you need?</h2><p>Tell us what you're looking for and our team can help you find the right technology for your home, work or everyday life.</p></div><Link className="button gold" href="/contact">Talk to Amaal <ArrowRight size={16}/></Link></section>
    <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Technology worth knowing about.</h2><p>New arrivals, offers and useful stories from Amaal.</p></div><form><input placeholder="Enter your email" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight size={17}/></button></form></section><SiteFooter/>
  </main>
}
