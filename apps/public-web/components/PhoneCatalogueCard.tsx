import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';
export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  return <article className="phone-catalogue-card"><Link href={`/product/${product.slug}`}><div className="phone-catalogue-media"><div className="product-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>PHONE PHOTO TO BE SUPPLIED</small></div></div><div className="phone-catalogue-meta"><p>{product.brand} · {product.series}</p><h2>{product.name}</h2><div className="phone-meta-line"><span>{product.network}</span><span>{product.variants.length} variant{product.variants.length===1?'':'s'}</span></div><p className="phone-card-description">{product.description}</p><span className="phone-view">View model details →</span></div></Link></article>
}
