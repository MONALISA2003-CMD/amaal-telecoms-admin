import Image from 'next/image';
import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';

const curatedImages: Record<string, string> = {
  'apple-iphone-16-pro-max': '/products/featured/iphone-16-pro-max-256gb-1.webp',
  'apple-iphone-17-pro-max': '/products/iphone17-pro-max.webp',
  'google-pixel-pixel-9': '/products/featured/google-pixel-9-256gb-1.webp',
  'samsung-galaxy-s26-ultra': '/products/galaxy-s26-ultra.webp',
  'samsung-galaxy-a07': '/products/featured/galaxy-a07-64gb-1.webp',
  'samsung-galaxy-a17': '/products/featured/galaxy-a17-128gb-1.webp',
};

export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  const shownVariants = product.variants.slice(0, 3);
  const extra = Math.max(0, product.variants.length - shownVariants.length);
  const image = product.image || curatedImages[product.slug] || '';
  return <article className="phone-modern-card">
    <Link href={`/phones/${product.slug}`} className="phone-modern-card-link" aria-label={`View ${product.name}`}>
      <div className="phone-modern-media">
        {image ? <Image src={image} alt={product.name} fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" className="phone-modern-product-image" /> : <div className="phone-model-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>Photography coming soon</small></div>}
        <span className="phone-config-count">{product.variants.length} {product.variants.length === 1 ? 'option' : 'options'}</span>
      </div>
      <div className="phone-modern-card-body"><p className="phone-modern-brand">{product.brand} <span>·</span> {product.series}</p><h2>{product.name}</h2><p className="phone-modern-summary">Available in {product.variants.map((v) => v.label).join(", ")}.</p><div className="phone-modern-variants" aria-label={`${product.name} available storage options`}>{shownVariants.map((v) => <span key={v.label}>{v.label}</span>)}{extra > 0 && <span>+{extra}</span>}</div><div className="phone-modern-card-footer"><span>View phone</span><span aria-hidden="true">↗</span></div></div>
    </Link>
  </article>;
}
