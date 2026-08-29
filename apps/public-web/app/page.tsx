import Link from 'next/link';
import { Search, ShoppingBag, UserRound, ArrowRight, Truck, ShieldCheck, Wrench, ChevronDown } from 'lucide-react';
import { getCatalog } from '../lib/catalog';

const categories = [
  ['Phones', 'Smartphones & accessories', 'phones'],
  ['Tablets', 'Work, study & play', 'tablets'],
  ['TVs', 'Premium home entertainment', 'tvs'],
  ['Fridges', 'Cooling & refrigeration', 'fridges'],
  ['Home Appliances', 'Comfort for every day', 'home-appliances'],
  ['Kitchen Appliances', 'Cook with confidence', 'kitchen-appliances'],
  ['Office Electronics', 'Power your workspace', 'office-electronics'],
  ['Sound & Speakers', 'Sound worth hearing', 'sound-speakers'],
] as const;

export default async function Home() {
  const catalog = await getCatalog();
  const products = catalog?.products ?? [];

  return (
    <main>
      <header className="site-header">
        <div className="utility">Genuine products · Trusted service · Delivery across Uganda</div>
        <div className="nav-wrap">
          <Link className="brand" href="/">AMAAL<span>.</span></Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/shop">Shop</Link>
            <Link href="/categories">Categories <ChevronDown size={14}/></Link>
            <Link href="/brands">Brands</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/services">Services</Link>
          </nav>
          <div className="nav-actions">
            <Link href="/search" aria-label="Search"><Search size={20}/></Link>
            <Link href="/account" aria-label="Account"><UserRound size={20}/></Link>
            <Link href="/cart" aria-label="Shopping bag"><ShoppingBag size={20}/></Link>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CONSUMER ELECTRONICS, ELEVATED</p>
          <h1>Technology for<br/><em>every day.</em></h1>
          <p className="hero-lede">Discover genuine electronics and appliances from brands you trust, with a shopping experience built around confidence.</p>
          <div className="hero-actions"><Link className="button primary" href="/shop">Shop the collection <ArrowRight size={17}/></Link><Link className="text-link" href="/categories">Explore categories</Link></div>
        </div>
        <div className="hero-art" aria-label="Amaal premium electronics collection"><div className="art-glow"/><div className="device-card phone"/><div className="device-card tv"/><div className="device-card speaker"/></div>
      </section>

      <section className="trust-strip">
        <div><ShieldCheck/><div><strong>Genuine & trusted</strong><span>Products from reputable brands</span></div></div>
        <div><Truck/><div><strong>Reliable delivery</strong><span>Order online, delivered to you</span></div></div>
        <div><Wrench/><div><strong>Support after purchase</strong><span>Warranty, repairs & service</span></div></div>
      </section>

      <section className="section categories"><div className="section-head"><div><p className="eyebrow">DISCOVER</p><h2>Shop by category</h2></div><Link className="text-link" href="/categories">View all <ArrowRight size={15}/></Link></div><div className="category-grid">{categories.map(([name, sub, slug], i) => <Link className={`category-tile tile-${i}`} href={`/categories/${slug}`} key={slug}><span className="tile-number">0{i + 1}</span><div><h3>{name}</h3><p>{sub}</p></div><ArrowRight size={18}/></Link>)}</div></section>

      <section className="section featured"><div className="section-head"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Featured products</h2></div><Link className="text-link" href="/shop">Shop all <ArrowRight size={15}/></Link></div><div className="product-grid">{products.slice(0, 8).map((p: any) => <Link className="product-card" href={`/product/${p.slug ?? p.id}`} key={p.id ?? p.slug}><div className="product-image">{p.image_url ? <img src={p.image_url} alt=""/> : <span>AMAAL</span>}</div><p className="product-brand">{p.brand_name ?? p.brand ?? 'AMAAL'}</p><h3>{p.name}</h3><strong>{p.price ? `UGX ${Number(p.price).toLocaleString()}` : 'View product'}</strong></Link>)}</div>{products.length === 0 && <div className="empty">Our catalogue is being prepared. Check back soon.</div>}</section>

      <section className="dark-section"><div><p className="eyebrow">THE AMAAL STANDARD</p><h2>Premium doesn't have to be complicated.</h2><p>Clear products. Honest information. Trusted brands. Helpful people when you need them.</p></div><Link className="button light" href="/about">Why Amaal <ArrowRight size={17}/></Link></section>

      <section className="section service-section"><div><p className="eyebrow">BEYOND THE SALE</p><h2>We stay with you.</h2><p>Track your order, understand your warranty, request service or talk to our team whenever you need us.</p></div><div className="service-links"><Link href="/tracking"><span>Track an order</span><ArrowRight size={17}/></Link><Link href="/warranty"><span>Warranty support</span><ArrowRight size={17}/></Link><Link href="/repairs"><span>Repairs & service</span><ArrowRight size={17}/></Link><Link href="/contact"><span>Make an enquiry</span><ArrowRight size={17}/></Link></div></section>

      <footer className="footer"><div className="footer-brand"><div className="brand">AMAAL<span>.</span></div><p>Premium consumer electronics for everyday life.</p></div><div><h4>Shop</h4><Link href="/categories">Categories</Link><Link href="/brands">Brands</Link><Link href="/deals">Deals</Link></div><div><h4>Help</h4><Link href="/tracking">Track order</Link><Link href="/warranty">Warranty</Link><Link href="/repairs">Repairs</Link></div><div><h4>Company</h4><Link href="/about">About Amaal</Link><Link href="/contact">Contact</Link><Link href="/faq">FAQ</Link></div></footer>
    </main>
  );
}
