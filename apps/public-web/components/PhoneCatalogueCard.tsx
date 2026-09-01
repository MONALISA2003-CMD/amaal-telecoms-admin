import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';
import { getPhoneImage } from '../lib/phone-catalogue-utils';

export default function PhoneCatalogueCard({ product }: { product: PhoneProduct }) {
  const image = getPhoneImage(product);
  const storage = Array.from(new Set(product.variants.map((v) => v.storage).filter(Boolean)));
  const ram = Array.from(new Set(product.variants.map((v) => v.ram).filter(Boolean)));
  const summary = [...(ram.length ? ram : []), ...(storage.length ? storage : [])].slice(0, 4);

  return (
    <article className="phone-catalogue-card-v3">
      <Link href={`/phones/${product.slug}`} aria-label={`View ${product.name}`}>
        <div className="phone-catalogue-card-media-v3">
          {image ? <img src={image} alt={product.name} loading="lazy" /> : (
            <div className="phone-media-fallback-v3" aria-hidden="true">
              <span>AMAAL</span><strong>{product.name}</strong><small>{product.brand}</small>
            </div>
          )}
          {product.variants.length > 1 && <span className="phone-option-badge-v3">{product.variants.length} options</span>}
        </div>
        <div className="phone-catalogue-card-body-v3">
          <p>{product.brand} <span>·</span> {product.series}</p>
          <h3>{product.name}</h3>
          <div className="phone-card-meta-v3">
            {summary.length ? summary.map((value) => <span key={value}>{value}</span>) : <span>{product.network}</span>}
          </div>
          <div className="phone-card-action-v3"><span>Explore</span><span aria-hidden="true">↗</span></div>
        </div>
      </Link>
    </article>
  );
}
