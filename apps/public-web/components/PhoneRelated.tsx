import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';
import { getRelatedPhones, customerPhoneDescription } from '../lib/phone-catalogue-utils';
import { getPhoneMedia } from '../lib/phone-media';

export default function PhoneRelated({ product, products }: { product: PhoneProduct; products: PhoneProduct[] }) {
  const related = getRelatedPhones(product, products);
  if (!related.length) return null;
  return <section className="section phone-related-section"><div className="section-head-v2"><div><p className="eyebrow">YOU MAY ALSO LIKE</p><h2>More phones to explore.</h2></div><Link href={`/phones/brand/${product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>See {product.brand} phones →</Link></div><div className="phone-related-grid">{related.map((p) => { const media = getPhoneMedia(p); return <Link className="phone-related-card" key={p.slug} href={`/phones/${p.slug}`}><div className="phone-related-media">{media[0] ? <img src={media[0]} alt={p.name} loading="lazy"/> : <div className="phone-related-placeholder"><span>AMAAL</span><strong>{p.name}</strong></div>}</div><p>{p.brand} · {p.series}</p><h3>{p.name}</h3><small>{customerPhoneDescription(p)}</small></Link>; })}</div></section>;
}
