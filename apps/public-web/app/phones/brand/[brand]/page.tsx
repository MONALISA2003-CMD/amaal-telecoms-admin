import { notFound } from 'next/navigation';
import SiteHeader from '../../../../components/SiteHeader';
import PhoneCompareTray from '../../../../components/PhoneCompareTray';
import SiteFooter from '../../../../components/SiteFooter';
import { BrandCatalogueBrowser, BrandDirectory, PHONE_BRANDS, brandSlug } from '../../../../components/PhoneBrandSubcatalog';
import { phoneCatalogue } from '../../../../lib/phone-catalogue';

export function generateStaticParams() { return PHONE_BRANDS.map((brand) => ({ brand: brandSlug(brand) })); }

export default async function BrandPhonePage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = PHONE_BRANDS.find((item) => brandSlug(item) === slug);
  if (!brand) notFound();
  const selectedBrand = brand;
  const products = phoneCatalogue.filter((p) => p.brand === selectedBrand);
  const counts = Object.fromEntries(PHONE_BRANDS.map((item) => [item, phoneCatalogue.filter((p) => p.brand === item).length]));
  return <main><SiteHeader />
    <section className="phone-brand-v2-hero"><div><p className="eyebrow">AMAAL PHONES · {selectedBrand.toUpperCase()}</p><h1>{selectedBrand}<br/><em>collection.</em></h1><p>Browse the complete {selectedBrand} phone catalogue. Search within the collection, move through its series and open any model for its available choices and full information.</p></div><div className="phone-brand-v2-stat"><strong>{products.length}</strong><span>models</span></div></section>
    <section className="section phone-brand-v2-body"><BrandDirectory counts={counts} active={selectedBrand}/><BrandCatalogueBrowser brand={selectedBrand} products={products}/></section>
    <PhoneCompareTray /><SiteFooter /></main>;
}
