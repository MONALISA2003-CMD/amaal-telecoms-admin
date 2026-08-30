import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, Wrench, ChevronRight } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import ProductCard from '../components/ProductCard';
import { getCatalog, type Product, type Brand } from '../lib/catalog';

const fallbackVisuals=[
 ['/products/iphone17-pro-max.webp','iPhone 17 Pro Max'],
 ['/products/galaxy-s26-ultra.webp','Galaxy S26 Ultra'],
 ['/products/samsung-u8000f-tv.webp','Samsung 75-inch TV'],
 ['/products/samsung-b550-soundbar.webp','Samsung Soundbar'],
];
const categories=[['Phones','phones','Smartphones & tablets'],['TV & Entertainment','tvs','Screens, sound & home cinema'],['Home Appliances','home-appliances','Comfort for every day'],['Kitchen Appliances','kitchen-appliances','Cook with confidence'],['Computing','office-electronics','Work, study & play'],['Sound & Speakers','sound-speakers','Sound worth hearing']];
const supplied=[
 {name:'iPhone 17 Pro Max',brand:'Apple',img:'/products/iphone17-pro-max.webp'},
 {name:'Galaxy S26 Ultra',brand:'Samsung',img:'/products/galaxy-s26-ultra.webp'},
 {name:'Samsung U8000F 75” TV',brand:'Samsung',img:'/products/samsung-u8000f-tv.webp'},
 {name:'Samsung B550 Soundbar',brand:'Samsung',img:'/products/samsung-b550-soundbar.webp'},
 {name:'TCL 606L Refrigerator',brand:'TCL',img:'/products/tcl-606l-fridge.webp'},
 {name:'Hisense HFG60121X Cooker',brand:'Hisense',img:'/products/hisense-hfg60121x.webp'},
 {name:'HP Omen Gaming Laptop',brand:'HP',img:'/products/hp-omen.webp'},
];
export default async function Home(){const catalog=await getCatalog();const products=(catalog?.products??[]).slice(0,8);const brands=(catalog?.brands??[]).filter(b=>b.featured).slice(0,8);return <main><SiteHeader/>
 <section className="lux-hero"><div className="hero-copy"><p className="eyebrow">THE NEW STANDARD IN EVERYDAY TECHNOLOGY</p><h1>Better technology.<br/><em>Better every day.</em></h1><p>Premium devices and appliances for your home, work and lifestyle — selected for the way you live.</p><div className="hero-actions"><Link className="button gold" href="/shop">Shop now <ArrowRight size={16}/></Link><Link className="button ghost-light" href="/about">Discover Amaal</Link></div></div><div className="hero-stage" aria-label="Amaal premium product collection">{fallbackVisuals.map(([src,label],i)=><div key={src} className={`hero-product hero-product-${i}`}><img src={src} alt={label}/></div>)}<div className="hero-reflection"/></div></section>
 <section className="trust-strip"><div><ShieldCheck/><span><strong>100% authentic</strong><small>Genuine products</small></span></div><div><ShieldCheck/><span><strong>Secure payments</strong><small>Safe & encrypted</small></span></div><div><Truck/><span><strong>Fast delivery</strong><small>Across Uganda</small></span></div><div><Wrench/><span><strong>Warranty support</strong><small>We're here after the sale</small></span></div></section>
 <section className="section category-section"><div className="section-head"><div><p className="eyebrow">EXPLORE OUR WORLD</p><h2>Shop by category</h2></div><Link className="quiet-link" href="/categories">View all <ArrowRight size={15}/></Link></div><div className="category-grid premium-grid">{categories.map(([name,slug,desc],i)=><Link className={`category-card c${i}`} href={`/categories/${slug}`} key={slug}><div className="category-art"><img src={supplied[i%supplied.length].img} alt=""/></div><div><span>0{i+1}</span><h3>{name}</h3><p>{desc}</p></div><ChevronRight size={17}/></Link>)}</div></section>
 <section className="campaign"><div className="campaign-copy"><p className="eyebrow">AMAAL EDIT</p><h2>Bring home experiences that matter.</h2><p>From brilliant screens to powerful sound, from the kitchen to the office — discover technology selected for real everyday life.</p><Link className="button gold" href="/deals">Explore deals <ArrowRight size={16}/></Link></div><div className="campaign-products"><img src="/products/samsung-u8000f-tv.webp" alt="Samsung TV"/><img src="/products/samsung-b550-soundbar.webp" alt="Samsung soundbar"/></div></section>
 <section className="section featured-section"><div className="section-head"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Featured products</h2></div><Link className="quiet-link" href="/shop">Shop all <ArrowRight size={15}/></Link></div>{products.length>0?<div className="product-grid">{products.map((p:Product)=><ProductCard key={p.id} product={p}/>)}</div>:<div className="product-grid">{supplied.map((p,i)=><div className="product-card" key={p.name}><div className="product-image"><img src={p.img} alt={p.name}/></div><div className="product-meta"><p className="product-brand">{p.brand}</p><h3>{p.name}</h3><strong>View product</strong></div></div>)}</div>}</section>
 <section className="section brand-section"><div className="section-head"><div><p className="eyebrow">TRUSTED NAMES</p><h2>The brands you know.</h2></div><Link className="quiet-link" href="/brands">Explore brands <ArrowRight size={15}/></Link></div><div className="brand-row">{(brands.length?brands:([{name:'Apple'},{name:'Samsung'},{name:'TCL'},{name:'Hisense'},{name:'HP'},{name:'JBL'}] as Brand[])).map((b:Brand)=><Link href={`/brands/${b.slug??b.name.toLowerCase()}`} className="brand-card" key={b.name}>{b.name}</Link>)}</div></section>
 <section className="dark-story"><div><p className="eyebrow">THE AMAAL DIFFERENCE</p><h2>More than a purchase.</h2><p>Authentic products, clear information and helpful support — before, during and after you buy.</p></div><div className="story-points"><span>01 <b>Authentic by design</b></span><span>02 <b>Advice that helps</b></span><span>03 <b>Support that stays</b></span><span>04 <b>Technology made simple</b></span></div></section>
 <section className="section service-section"><div><p className="eyebrow">BEYOND THE SALE</p><h2>We stay with you.</h2><p>Track delivery, understand your warranty, request service or speak to our team whenever you need us.</p></div><div className="service-links"><Link href="/tracking">Track an order <ArrowRight size={16}/></Link><Link href="/warranty">Warranty support <ArrowRight size={16}/></Link><Link href="/repairs">Repairs & service <ArrowRight size={16}/></Link><Link href="/contact">Make an enquiry <ArrowRight size={16}/></Link></div></section>
 <section className="newsletter"><div><p className="eyebrow">STAY IN THE LOOP</p><h2>Technology worth knowing about.</h2><p>New arrivals, offers and useful stories from Amaal.</p></div><form><input placeholder="Enter your email" aria-label="Email address"/><button aria-label="Subscribe"><ArrowRight size={17}/></button></form></section>
 <SiteFooter/></main>}
