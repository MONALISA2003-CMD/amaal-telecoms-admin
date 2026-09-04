import Link from 'next/link';
import { getPhoneMedia } from '../lib/phone-media';
import type { PhoneProduct } from '../lib/phone-catalogue';
import PhoneCompareButton from './PhoneCompareButton';

function money(value?: number) {
  return typeof value === 'number' ? `UGX ${value.toLocaleString('en-UG')}` : null;
}

export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  const shownVariants = product.variants.slice(0, 3);
  const extra = Math.max(0, product.variants.length - shownVariants.length);
  const media = getPhoneMedia(product);
  const firstPrice = product.variants.map(v => v.price).find((v): v is number => typeof v === 'number');
  return <article className="phone-modern-card">
    <div className="phone-modern-media">
      <Link href={`/phones/${product.slug}`} className="phone-modern-card-link" aria-label={`View ${product.name}`}>
        {media[0] ? <img src={media[0]} alt={product.name} className="phone-product-image" /> : <div className="phone-model-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>Photo coming soon</small></div>}
        <span className="phone-config-count">{product.variants.length} {product.variants.length === 1 ? 'option' : 'options'}</span>
      </Link>
      <PhoneCompareButton slug={product.slug} name={product.name} />
    </div>
    <div className="phone-modern-card-body">
      <p className="phone-price-coming">{firstPrice ? `From ${money(firstPrice)}` : 'Price to be confirmed'}</p>
      <p className="phone-modern-brand">{product.brand} <span>·</span> {product.series}</p>
      <h2><Link href={`/phones/${product.slug}`}>{product.name}</Link></h2>
      <p className="phone-modern-summary">{product.quickSpecs || product.description.split('. ')[0]}</p>
      <div className="phone-modern-variants" aria-label={`${product.name} available options`}>{shownVariants.map((v) => <span key={v.label}>{v.label}</span>)}{extra > 0 && <span>+{extra}</span>}</div>
      <div className="phone-modern-card-footer"><Link href={`/phones/${product.slug}`}>View phone</Link><span aria-hidden="true">↗</span></div>
    </div>
  </article>;
}
