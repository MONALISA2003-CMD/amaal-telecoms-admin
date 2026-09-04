import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';
import PhoneCompareButton from './PhoneCompareButton';
import WishlistButton from './WishlistButton';
import { masterPhone } from '../lib/amaal-master-data-utils';

function ugx(value: number) {
  return `UGX ${value.toLocaleString('en-UG')}`;
}

export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  const master = masterPhone(product.slug);
  const shownVariants = product.variants.slice(0, 3);
  const extra = Math.max(0, product.variants.length - shownVariants.length);
  const fromPrice = master?.variants?.length ? Math.min(...master.variants.map((v) => v.price)) : (product.slug === 'google-pixel-pixel-9' ? 1800000 : undefined);
  const media = product.image;

  return <article className="phone-modern-card">
    <div className="phone-modern-media">
      <Link href={`/phones/${product.slug}`} className="phone-modern-card-link" aria-label={`View ${product.name}`}>
        {media ? <img className="phone-modern-real-image" src={media} alt={`${product.name} product image`} loading="lazy" decoding="async" /> : (
          <div className="phone-model-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>Photo coming soon</small></div>
        )}
        <span className="phone-config-count">{product.variants.length} {product.variants.length === 1 ? 'option' : 'options'}</span>
      </Link>
      <div className="phone-card-actions"><WishlistButton id={product.slug}/><PhoneCompareButton slug={product.slug} name={product.name} /></div>
    </div>
    <div className="phone-modern-card-body">
      <p className="phone-modern-brand">{product.brand} <span>·</span> {product.series}</p>
      <h2><Link href={`/phones/${product.slug}`}>{product.name}</Link></h2>
      <p className="phone-modern-summary">{master?.quickSpecs?.slice(0, 2).join(' · ') || product.variants.slice(0, 2).map(v => [v.storage, v.ram].filter(Boolean).join(' · ')).join(' · ')}</p>
      {fromPrice ? <p className="phone-modern-price">From {ugx(fromPrice)}</p> : <p className="phone-modern-price">Price coming soon</p>}
      <div className="phone-modern-variants" aria-label={`${product.name} available options`}>{shownVariants.map((v) => <span key={v.label}>{v.label}</span>)}{extra > 0 && <span>+{extra}</span>}</div>
      <div className="phone-modern-card-footer"><Link href={`/phones/${product.slug}`}>View phone</Link><span aria-hidden="true">↗</span></div>
    </div>
  </article>;
}
