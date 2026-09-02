import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import {kitchenApplianceProducts,kitchenApplianceCategories} from '../../../lib/appliance-catalogue';
const slug=(v:string)=>v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export default function KitchenAppliancesPage(){
 const featured=kitchenApplianceProducts.slice(0,8);
 return <main><SiteHeader/><section className="section appliance-landing">
  <Link className="backLink" href="/categories">← All categories</Link>
  <div className="appliance-landing-head"><div><p className="eyebrow">KITCHEN APPLIANCES</p><h1>Better tools for better cooking.</h1><p className="listingLead">Cook, blend, bake, brew and prepare with a deliberately organized kitchen catalogue.</p></div><div className="appliance-stat"><strong>{kitchenApplianceProducts.length}</strong><span>catalogue entries</span></div></div>
  <div className="appliance-category-groups"><div className="appliance-section-label"><span>Browse by need</span><b>Choose a department first</b></div><div className="category-subcategory-grid">{kitchenApplianceCategories.map(c=>{const count=kitchenApplianceProducts.filter(p=>p.category===c).length;return <Link key={c} className="subcategory-card appliance-category-card" href={`/categories/kitchen-appliances/${slug(c)}`}><span>KITCHEN</span><h2>{c}</h2><p>{count?`${count} catalogue ${count===1?'entry':'entries'}`:'Products being curated'}</p><b>Explore →</b></Link>})}</div></div>
  <div className="appliance-brand-strip"><div><p className="eyebrow">BRANDS IN THIS RANGE</p><h2>Useful choices across everyday budgets.</h2></div><div className="brand-pills">{Array.from(new Set(kitchenApplianceProducts.map(p=>p.brand))).sort().map(b=><span key={b}>{b}</span>)}</div></div>
  <div className="appliance-featured"><div className="appliance-section-label"><span>Selected catalogue</span><b>Start with a few highlights</b></div><div className="premium-product-grid">{featured.map(p=><Link href={`/categories/kitchen-appliances/product/${p.slug}`} className="premium-product-card" key={p.slug}><div className="premium-product-media"><span>{p.brand}</span><strong>{p.family||p.category}</strong><small>Product photo coming soon</small></div><div className="premium-product-body"><p>{p.category}</p><h3>{p.name}</h3><p>{p.shortDescription}</p><div className="spec-pills">{p.quickSpecs.slice(0,3).map(s=><span key={s}>{s}</span>)}</div><div className="card-footer"><strong>Price coming soon</strong><span>View →</span></div></div></Link>)}</div></div>
 </section><SiteFooter/></main>
}
