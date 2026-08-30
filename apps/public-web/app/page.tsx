import Link from 'next/link';
import { ArrowRight, ChevronRight, CircleCheck, Headphones, ShieldCheck, Truck, Wrench } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import AddToBag from '../components/AddToBag';
import { getCatalog, type Brand } from '../lib/catalog';

const products = [
  { slug:'iphone-17-pro-max-256gb', name:'iPhone 17 Pro Max 256GB', brand:'Apple', price:5200000, image:'/products/iphone17-pro-max.webp', label:'Flagship' },
  { slug:'galaxy-s26-ultra-256gb', name:'Galaxy S26 Ultra 256GB', brand:'Samsung', price:3800000, image:'/products/galaxy-s26-ultra.webp', label:'Flagship' },
  { slug:'samsung-u8000f-75-inch', name:'Samsung U8000F 75” 4K Smart TV', brand:'Samsung', price:5400000, image:'/products/samsung-u8000f-tv.webp', label:'Home entertainment' },
  { slug:'samsung-b550-soundbar', name:'Samsung B550 2.1ch Soundbar', brand:'Samsung', price:0, image:'/products/samsung-b550-soundbar.webp', label:'Audio' },
  { slug:'tcl-606l-refrigerator', name:'TCL 606L Top Mount Refrigerator', brand:'TCL', price:2900000, image:'/products/tcl-606l-fridge.webp', label:'Home' },
  { slug:'hisense-hfg60121x-cooker', name:'Hisense HFG60121X 4-Burner Gas Cooker', brand:'Hisense', price:1200000, image:'/products/hisense-hfg60121x.webp', label:'Kitchen' },
  { slug:'hp-omen-gaming-laptop', name:'HP Omen Gaming Laptop', brand:'HP', price:5100000, image:'/products/hp-omen.webp', label:'Computing' },
];

const categories = [
  ['Phones','phones','Everyday connection','/products/iphone17-pro-max.webp'],
  ['TV & Home Entertainment','tvs','Screens, sound & cinema','/products/samsung-u8000f-tv.webp'],
  ['Audio','sound-speakers','Sound worth hearing','/products/samsung-b550-soundbar.webp'],
  ['Home Appliances','home-appliances','Comfort for every day','/products/tcl-606l-fridge.webp'],
  ['Kitchen Appliances','kitchen-appliances','Cook with confidence','/products/hisense-hfg60121x.webp'],
  ['Computing','office-electronics','Work, study & play','/products/hp-omen.webp'],
  ['Office Electronics','office-electronics','Tools for productive days','/products/hp-omen.webp'],
  ['Accessories','accessories','The finishing touch','/products/galaxy-s26-ultra.webp'],
];

const lifestyles = [
  ['Stay Connected','Phones and tablets for the way you live.','/categories/phones','/products/iphone17-pro-max.webp'],
  ['Entertainment at Home','Brilliant screens and sound for shared moments.','/categories/tvs','/products/samsung-u8000f-tv.webp'],
  ['Home Made Better','Practical appliances with a premium feel.','/categories/home-appliances','/products/tcl-606l-fridge.webp'],
  ['Work & Play','Computing built for focus, creativity and fun.','/categories/office-electronics','/products/hp-omen.webp'],
];

function ugx(value:number){return value?new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(value):'Price on request'}

function ProductTile({p}:{p:typeof products[number]}){
  const price=ugx(p.price);
  return <article className="home-product-card">
    <Link href={`/product/${p.slug}`} className="home-product-link">
      <div className="home-product-image"><span className="product-label">{p.label}</span><img src={p.image} alt={p.name}/><span className="image-sheen"/></div>
      <div className="home-product-meta"><p>{p.brand}</p><h3>{p.name}</h3><strong>{price}</strong></div>
    </Link>
    {p.price>0 && <AddToBag id={p.slug} name={p.name} price={price}/>} 
  </article>
}

export default async function Home(){
  const catalog=await getCatalog();
  const brands=(catalog?.brands??[]).filter((b:Brand)=>b.featured).slice(0,6);
  const brandNames=brands.length?brands.map(b=>({name:b.name,slug:b.slug})):['Apple','Samsung','TCL','Hisense','HP','JBL'].map(name=>({name,slug:name.toLowerCase()}));
  return <main>
    <SiteHeader/>

    <section className="lux-hero">
      <div className="hero-copy">
        <p className="eyebrow">THE NEW STANDARD IN TECHNOLOGY</p>
        <h1>Better technology.<br/><em>Better every day.</em></h1>
        <p>Premium devices and appliances for your home, work and lifestyle — selected for the way you live.</p>
        <div className="hero-actions"><Link className="button gold" href="/shop">Shop now <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/about">Discover Amaal</Link></div>
        <div className="hero-note"><CircleCheck size={15}/> Genuine products from trusted brands</div>
      </div>
      <div className="hero-stage" aria-label="Featured Amaal technology">
        <div className="hero-ambient"/>
        <div className="hero-tv"><img src="/products/samsung-u8000f-tv.webp" alt="Samsung 75 inch 4K Smart TV"/></div>
        <div className="hero-phone hero-phone-one"><img src="/products/iphone17-pro-max.webp" alt="iPhone 17 Pro Max"/></div>
        <div className="hero-phone hero-phone-two"><img src="/products/galaxy-s26-ultra.webp" alt="Galaxy S26 Ultra"/></div>
        <div className="hero-sound"><img src="/products/samsung-b550-soundbar.webp" alt="Samsung B550 Soundbar"/></div>
        <div className="hero-floor"/>
      </div>
    </section>

    <section className="trust-strip" aria-label="Amaal assurances">
      <div><ShieldCheck/><span><strong>100% authentic</strong><small>Genuine products</small></span></div>
      <div><ShieldCheck/><span><strong>Trusted brands</strong><small>Brands you know</small></span></div>
      <div><Truck/><span><strong>Fast delivery</strong><small>Across Uganda</small></span></div>
      <div><Wrench/><span><strong>Warranty support</strong><small>Here after the sale</small></span></div>
      <div><Headphones/><span><strong>Expert assistance</strong><small>Help when you need it</small></span></div>
    </section>

    <section className="section category-section">
      <div className="section-head"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2>Shop by category</h2><p className="section-intro">Everyday technology, home and office essentials — thoughtfully curated.</p></div><Link className="quiet-link" href="/categories">View all <ArrowRight size={15}/></Link></div>
      <div className="category-grid premium-grid">{categories.map(([name,slug,desc,img],i)=><Link className="category-card" href={`/categories/${slug}`} key={`${name}-${i}`}><div className="category-art"><img src={img} alt=""/></div><div className="category-copy"><span>0{i+1}</span><h3>{name}</h3><p>{desc}</p></div><ChevronRight size={17}/></Link>)}</div>
    </section>

    <section className="section featured-section">
      <div className="section-head"><div><p className="eyebrow">THE AMAAL EDIT</p><h2>Featured at Amaal</h2><p className="section-intro">A considered selection of products worth discovering.</p></div><Link className="quiet-link" href="/shop">Shop all <ArrowRight size={15}/></Link></div>
      <div className="product-grid home-product-grid">{products.slice(0,4).map(p=><ProductTile key={p.slug} p={p}/>)}</div>
    </section>

    <section className="lifestyle-feature">
      <div className="lifestyle-copy"><p className="eyebrow">AMAAL EDIT</p><h2>Bring home experiences that matter.</h2><p>From brilliant screens to powerful sound, from the kitchen to the office — discover technology selected for real everyday life.</p><Link className="button gold" href="/deals">Explore deals <ArrowRight size={16}/></Link></div>
      <div className="lifestyle-scene"><img className="scene-tv" src="/products/samsung-u8000f-tv.webp" alt="Samsung 75 inch TV"/><img className="scene-sound" src="/products/samsung-b550-soundbar.webp" alt="Samsung soundbar"/></div>
    </section>

    <section className="section lifestyle-section"><div className="section-head"><div><p className="eyebrow">SHOP YOUR WAY</p><h2>Explore by lifestyle</h2><p className="section-intro">Start with what you want to do, then find the technology that fits.</p></div></div><div className="lifestyle-grid">{lifestyles.map(([title,desc,href,img],i)=><Link href={href} className={`lifestyle-card l${i}`} key={title}><img src={img} alt=""/><div><p>0{i+1}</p><h3>{title}</h3><span>{desc}</span><b>Explore <ArrowRight size={14}/></b></div></Link>)}</div></section>

    <section className="section deals-section"><div className="deals-panel"><div><p className="eyebrow">AMAAL DEALS</p><h2>Better technology,<br/><em>beautifully priced.</em></h2><p>Curated promotions and seasonal offers across the Amaal catalogue — presented with clarity, never clutter.</p><Link className="button light" href="/deals">View deals <ArrowRight size={16}/></Link></div><div className="deal-stack"><div><span>TV deals</span><strong>Home entertainment</strong></div><div><span>Phone deals</span><strong>Stay connected</strong></div><div><span>Appliance deals</span><strong>Home made better</strong></div></div></div></section>

    <section className="section arrivals-section"><div className="section-head"><div><p className="eyebrow">JUST IN</p><h2>New at Amaal</h2><p className="section-intro">The latest additions to our collection.</p></div><Link className="quiet-link" href="/shop">View collection <ArrowRight size={15}/></Link></div><div className="product-grid home-product-grid">{products.slice(4).map(p=><ProductTile key={p.slug} p={p}/>)}</div></section>

    <section className="section brand-section"><div className="section-head"><div><p className="eyebrow">TRUSTED NAMES</p><h2>The brands you know.</h2><p className="section-intro">Quality and technology from brands worth bringing home.</p></div><Link className="quiet-link" href="/brands">Explore brands <ArrowRight size={15}/></Link></div><div className="brand-row">{brandNames.map(b=><Link href={`/brands/${b.slug}`} className="brand-card" key={b.name}>{b.name}</Link>)}</div></section>

    <section className="difference-section"><div className="difference-intro"><p className="eyebrow">THE AMAAL DIFFERENCE</p><h2>More than a purchase.</h2><p>Authentic products, clear information and helpful support — before, during and after you buy.</p></div><div className="difference-grid"><div><span>01</span><h3>Authentic by design</h3><p>Buy with confidence.</p></div><div><span>02</span><h3>Advice that helps</h3><p>Choose with clarity.</p></div><div><span>03</span><h3>Support that stays</h3><p>We're here after checkout.</p></div><div><span>04</span><h3>Technology made simple</h3><p>For real everyday life.</p></div></div></section>

    <section className="section breadth-section"><div className="section-head"><div><p className="eyebrow">MORE OF EVERYDAY LIFE</p><h2>Home, kitchen, work & play.</h2></div></div><div className="breadth-grid"><Link href="/categories/home-appliances" className="breadth-card"><img src="/products/tcl-606l-fridge.webp" alt="TCL refrigerator"/><div><span>HOME</span><h3>TCL 606L Refrigerator</h3><b>Explore home appliances <ArrowRight size={14}/></b></div></Link><Link href="/categories/kitchen-appliances" className="breadth-card"><img src="/products/hisense-hfg60121x.webp" alt="Hisense gas cooker"/><div><span>KITCHEN</span><h3>Hisense Gas Cooker</h3><b>Explore kitchen <ArrowRight size={14}/></b></div></Link><Link href="/categories/office-electronics" className="breadth-card"><img src="/products/hp-omen.webp" alt="HP Omen gaming laptop"/><div><span>WORK & PLAY</span><h3>HP Omen Gaming Laptop</h3><b>Explore computing <ArrowRight size={14}/></b></div></Link></div></section>

    <section className="section service-section"><div><p className="eyebrow">BEYOND THE SALE</p><h2>We're here after the purchase, too.</h2><p>Delivery, warranty, repairs, returns and support — in one place.</p></div><div className="service-links"><Link href="/tracking">Track an order <ArrowRight size={16}/></Link><Link href="/delivery">Delivery information <ArrowRight size={16}/></Link><Link href="/warranty">Warranty support <ArrowRight size={16}/></Link><Link href="/repairs">Repairs & service <ArrowRight size={16}/></Link><Link href="/contact">Make an enquiry <ArrowRight size={16}/></Link></div></section>

    <section className="assist-section"><div><p className="eyebrow">NEED A LITTLE HELP?</p><h2>Not sure what you need?</h2><p>Tell us what you're looking for and our team can help you find the right technology for your home, work or everyday life.</p></div><Link className="button gold" href="/contact">Talk to Amaal <ArrowRight size={16}/></Link></section>

    <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Technology worth knowing about.</h2><p>New arrivals, offers and useful stories from Amaal.</p></div><form><input placeholder="Enter your email" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight size={17}/></button></form></section>
    <SiteFooter/>
  </main>
}
