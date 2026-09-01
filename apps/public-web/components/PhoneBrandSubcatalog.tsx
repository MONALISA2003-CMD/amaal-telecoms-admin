import Link from 'next/link';
import type { PhoneProduct } from '../lib/phone-catalogue';
import PhoneCatalogueCard from './PhoneCatalogueCard';

export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'] as const;

export function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function BrandSubcatalog({ brand, products, preview = false }: { brand: string; products: PhoneProduct[]; preview?: boolean }) {
  const series = Array.from(new Set(products.map((p) => p.series)));
  const visibleProducts = preview ? products.slice(0, 8) : products;
  return <section id={`brand-${brandSlug(brand)}`} className="phone-brand-subcatalog">
    <div className="phone-brand-subcatalog-head">
      <div>
        <p className="eyebrow">AMAAL PHONE SUB-CATALOG</p>
        <h2>{brand}</h2>
        <p>{products.length} {products.length === 1 ? 'model' : 'models'} · {series.length} {series.length === 1 ? 'series' : 'series'}</p>
      </div>
      <Link className="phone-brand-view-all" href={`/phones/brand/${brandSlug(brand)}`}>Open {brand} catalogue <span>↗</span></Link>
    </div>
    {series.map((currentSeries) => {
      const seriesProducts = visibleProducts.filter((p) => p.series === currentSeries);
      if (!seriesProducts.length) return null;
      return <div className="phone-brand-series" key={currentSeries}>
        <div className="phone-brand-series-head"><h3>{currentSeries}</h3><span>{products.filter((p) => p.series === currentSeries).length} models</span></div>
        <div className="phone-modern-grid phone-brand-grid">{seriesProducts.map((product) => <PhoneCatalogueCard key={product.slug} product={product} />)}</div>
      </div>;
    })}
    {preview && products.length > visibleProducts.length && <div className="phone-brand-more"><Link href={`/phones/brand/${brandSlug(brand)}`}>View all {products.length} {brand} models →</Link></div>}
  </section>;
}
