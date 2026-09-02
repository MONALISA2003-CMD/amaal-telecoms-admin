import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import { getCatalog } from '../../../lib/catalog';
import { featuredProducts, newProducts, type HomeProduct } from '../../../lib/homepage-data';
import { phoneCatalogue } from '../../../lib/phone-catalogue';
import PhoneDetail from '../../../components/PhoneDetail';

const curated = [...featuredProducts, ...newProducts];

function CuratedDetail({p}:{p:HomeProduct}){
  return <main><SiteHeader/><section className="section product-detail"><div className="detail-media"><div className="detail-image"><div className="detail-placeholder"><span>AMAAL</span><strong>PRODUCT PHOTO</strong><small>Product photo coming soon</small></div></div></div><div className="detail-copy"><p className="eyebrow">{p.brand} · {p.eyebrow}</p><h1>{p.name}</h1><div className="detail-price">Price coming soon</div><p className="detail-note">{p.description}</p><div className="quick-specs">{p.quickDetails.map(x=><span key={x}>{x}</span>)}</div><Link className="button gold" href={`/contact?product=${encodeURIComponent(p.name)}`}>Ask about this product</Link><div className="detail-trust"><span>Genuine product</span><span>Warranty support</span><span>Reliable delivery</span></div></div></section><section className="section product-detail-more"><p className="eyebrow">PRODUCT INFORMATION</p><h2>Everything you need to know.</h2><p>Product photography and pricing will be supplied by Amaal when the item is ready to be listed.</p></section><SiteFooter/></main>
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const phone=phoneCatalogue.find(x=>x.slug===slug);
  if(phone)return <PhoneDetail product={phone}/>;
  const local=curated.find(x=>x.slug===slug);
  if(local)return <CuratedDetail p={local}/>;
  const catalog=await getCatalog();
  const p=(catalog?.products??[]).find(x=>(x.slug??String(x.id))===slug);
  if(!p)return <main><SiteHeader/><section className="section empty"><h1>Product not found.</h1><Link href="/shop">Return to shop</Link></section><SiteFooter/></main>;
  return <main><SiteHeader/><section className="section product-detail"><div className="detail-image"><div className="detail-placeholder"><span>AMAAL</span><strong>PRODUCT PHOTO</strong><small>Product photo coming soon</small></div></div><div className="detail-copy"><p className="eyebrow">{p.brand_name??'AMAAL'}</p><h1>{p.name}</h1><div className="detail-price">Price coming soon</div><p className="detail-note">{p.description||p.short_description||'Product details will be confirmed by Amaal before listing.'}</p><Link className="button gold" href={`/contact?product=${encodeURIComponent(p.name)}`}>Ask about this product</Link><div className="detail-trust"><span>Genuine product</span><span>Warranty support</span><span>Reliable delivery</span></div></div></section><SiteFooter/></main>;
}
