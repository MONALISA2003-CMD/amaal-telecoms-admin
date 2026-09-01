import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';

export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  const shownVariants = product.variants.slice(0, 3);
  const extra = Math.max(0, product.variants.length - shownVariants.length);
  return <article className="phone-modern-card">
    <Link href={`/phones/${product.slug}`} className="phone-modern-card-link" aria-label={`View ${product.name}`}>
      <div className="phone-modern-media"><div className="phone-model-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>PHOTO PLACEHOLDER</small></div><span className="phone-config-count">{product.variants.length} {product.variants.length === 1 ? 'configuration' : 'configurations'}</span></div>
      <div className="phone-modern-card-body"><p className="phone-modern-brand">{product.brand} <span>·</span> {product.series}</p><h2>{product.name}</h2><p className="phone-modern-summary">{product.description}</p><div className="phone-modern-variants" aria-label={`${product.name} available configurations`}>{shownVariants.map((v) => <span key={v.label}>{v.label}</span>)}{extra > 0 && <span>+{extra}</span>}</div><div className="phone-modern-card-footer"><span>Explore model</span><span aria-hidden="true">↗</span></div></div>
    </Link>
  </article>;
}
