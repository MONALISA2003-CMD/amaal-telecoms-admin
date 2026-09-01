import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/SiteHeader';
import SiteFooter from '../../../../components/SiteFooter';
import { BrandSubcatalog, PHONE_BRANDS, brandSlug } from '../../../../components/PhoneBrandSubcatalog';
import { phoneCatalogue } from '../../../../lib/phone-catalogue';

export function generateStaticParams() { return PHONE_BRANDS.map((brand) => ({ brand: brandSlug(brand) })); }

export default async function BrandPhonePage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = PHONE_BRANDS.find((item) => brandSlug(item) === slug);
  if (!brand) notFound();
  const products = phoneCatalogue.filter((p) => p.brand === brand);
  return <main><SiteHeader /><section className="phone-brand-catalogue-hero"><div><p className="eyebrow">AMAAL PHONES · {brand.toUpperCase()}</p><h1>{brand}<br /><em>phone catalogue.</em></h1><p>Browse every {brand} model in its own Amaal sub-catalogue, organized by series. Open a model to choose its available configurations and view full product information.</p></div><div className="phone-brand-catalogue-count"><strong>{products.length}</strong><span>models in this catalogue</span></div></section><section className="phone-catalogue-page section"><div className="phone-brand-back"><a href="/phones">← All phone catalogues</a></div><BrandSubcatalog brand={brand} products={products} /><div className="phone-catalogue-footnote"><div><strong>{brand} at Amaal</strong></div><p>Public catalogue information only. Internal stock, supplier and business data remain private.</p></div></section><SiteFooter /></main>;
}
