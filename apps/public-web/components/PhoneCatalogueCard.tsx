import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';
import { getPhoneMedia } from '../lib/phone-media';
import { customerPhoneDescription } from '../lib/phone-catalogue-utils';
import PhoneCompareButton from './PhoneCompareButton';

export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  const shownVariants = product.variants.slice(0, 3);
  const extra = Math.max(0, product.variants.length - shownVariants.length);
  const media = getPhoneMedia(product);
  return <article className="phone-modern-card">
    <div className="phone-modern-media">
      <Link href={`/phones/${product.slug}`} className="phone-modern-card-link" aria-label={`View ${product.name}`}>
        {media[0] ? <img src={media[0]} alt={product.name} loading="lazy" /> : <div className="phone-model-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>Product image coming soon</small></div>}
        <span className="phone-config-count">{product.variants.length} {product.variants.length === 1 ? 'option' : 'options'}</span>
      </Link>
      <PhoneCompareButton slug={product.slug} name={product.name} />
    </div>
    <div className="phone-modern-card-body"><p className="phone-modern-brand">{product.brand} <span>·</span> {product.series}</p><h2><Link href={`/phones/${product.slug}`}>{product.name}</Link></h2><p className="phone-modern-summary">{customerPhoneDescription(product)}</p><div className="phone-modern-variants" aria-label={`${product.name} available options`}>{shownVariants.map((v) => <span key={v.label}>{v.label}</span>)}{extra > 0 && <span>+{extra}</span>}</div><div className="phone-modern-card-footer"><Link href={`/phones/${product.slug}`}>View phone</Link><span aria-hidden="true">↗</span></div></div>
  </article>;
}
