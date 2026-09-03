import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import { getCatalog, image } from '../../../lib/catalog';
import ProductTrustPanel from '../../../components/ProductTrustPanel';import { featuredProducts, newProducts, type HomeProduct } from '../../../lib/homepage-data';
import { phoneCatalogue } from '../../../lib/phone-catalogue';
import PhoneDetail from '../../../components/PhoneDetail';import WishlistButton from '../../../components/WishlistButton';import AddToBag from '../../../components/AddToBag';import RelatedProducts from '../../../components/RelatedProducts';import RecentViewed from '../../../components/RecentViewed';
import AvailabilityAlert from '../../../components/AvailabilityAlert';
import CompatibilityPanel from '../../../components/CompatibilityPanel';import RecommendationRail from '../../../components/RecommendationRail';

const curated = [...featuredProducts, ...newProducts];

function CuratedDetail({p}:{p:HomeProduct}){
  return <main><SiteHeader/><section className="section product-detail"><div className="detail-media"><div className="detail-image"><div className="detail-placeholder"><span>AMAAL</span><strong>PRODUCT PHOTO</strong><small>Product photo coming soon</small></div></div></div><div className="detail-copy"><p className="eyebrow">{p.brand} · {p.eyebrow}</p><div className="detail-title-row"><h1>{p.name}</h1><WishlistButton id={p.slug}/></div><div className="detail-price">Price coming soon</div><p className="detail-note">{p.description}</p><div className="quick-specs">{p.quickDetails.map(x=><span key={x}>{x}</span>)}</div><Link className="button gold" href={`/contact?product=${encodeURIComponent(p.name)}`}>Ask about this product</Link><div className="detail-trust"><span>Genuine product</span><span>Warranty support</span><span>Reliable delivery</span></div></div></section><section className="section product-detail-more"><p className="eyebrow">PRODUCT INFORMATION</p><h2>Everything you need to know.</h2><p>Product photography and pricing will be supplied by Amaal when the item is ready to be listed.</p></section><ProductTrustPanel slug={p.slug}/><CompatibilityPanel slug={p.slug}/><RelatedProducts slug={p.slug}/><RecommendationRail productId={p.id}/><RecentViewed slug={p.slug}/><SiteFooter/></main>
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
  const variant=p.variants?.[0]; const numericPrice=Number(variant?.sellingPrice||0); const productImage=image(p);
  return <main><SiteHeader/><section className="section product-detail"><div className="detail-image"><div className="detail-placeholder" style={productImage?{backgroundImage:`url(${productImage})`,backgroundSize:'contain',backgroundPosition:'center',backgroundRepeat:'no-repeat'}:undefined}><span>{productImage?'':'AMAAL'}</span><strong>{productImage?'': 'PRODUCT PHOTO'}</strong><small>{productImage?'Verified catalogue image':'Product photo coming soon'}</small></div></div><div className="detail-copy"><p className="eyebrow">{p.brand_name??'AMAAL'}{p.category_name?` · ${p.category_name}`:''}</p><div className="detail-title-row"><h1>{p.name}</h1><WishlistButton id={p.slug}/></div><div className="detail-price">{numericPrice>0?new Intl.NumberFormat('en-UG',{style:'currency',currency:'UGX',maximumFractionDigits:0}).format(numericPrice):'Price coming soon'}</div><p className="detail-note">{p.description||p.short_description||'Product details will be confirmed by Amaal before listing.'}</p><div className="quick-specs">{Object.entries((p.specifications&&typeof p.specifications==='object'&&!Array.isArray(p.specifications))?(p.specifications as Record<string,unknown>):{}).slice(0,6).map(([k,v])=><span key={k}>{k}: {String(v)}</span>)}</div>{numericPrice>0&&<AddToBag id={p.id} variantId={variant?.code} name={p.name} brand={p.brand_name} slug={p.slug} price="" numericPrice={numericPrice}/>}<AvailabilityAlert slug={p.slug} variantId={variant?.code}/><Link className="button" href={`/contact?product=${encodeURIComponent(p.name)}`}>Ask about this product</Link><div className="detail-trust"><span>Genuine product information</span><span>Warranty support</span><span>Reliable delivery information</span></div></div></section><ProductTrustPanel slug={p.slug}/><CompatibilityPanel slug={p.slug}/><RelatedProducts slug={p.slug}/><RecommendationRail productId={p.id}/><RecentViewed slug={p.slug}/><SiteFooter/></main>;
}
