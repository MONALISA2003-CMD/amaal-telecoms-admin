import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/SiteHeader';
import SiteFooter from '../../../../components/SiteFooter';
import { BrandCatalogueBrowser, BrandDirectory, PHONE_BRANDS, brandSlug } from '../../../../components/PhoneBrandSubcatalog';
import { phoneCatalogue } from '../../../../lib/phone-catalogue';

export function generateStaticParams() { return PHONE_BRANDS.map((brand) => ({ brand: brandSlug(brand) })); }

export default async function BrandPhonePage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = PHONE_BRANDS.find((item) => brandSlug(item) === slug);
  if (!brand) notFound();
  const products = phoneCatalogue.filter((p) => p.brand === brand);
  const counts = Object.fromEntries(PHONE_BRANDS.map((item) => [item, phoneCatalogue.filter((p) => p.brand === item).length]));
  return <main><SiteHeader />
    <section className="phone-brand-v2-hero"><div><p className="eyebrow">AMAAL PHONES · {brand.toUpperCase()}</p><h1>{brand}<br/><em>collection.</em></h1><p>Browse the complete {brand} phone catalogue. Search within the collection, move through its series and open any model for its configurations and full information.</p></div><div className="phone-brand-v2-stat"><strong>{products.length}</strong><span>models</span></div></section>
    <section className="section phone-brand-v2-body"><BrandDirectory counts active={brand}/><BrandCatalogueBrowser brand={brand} products={products}/></section>
    <SiteFooter /></main>;
}
