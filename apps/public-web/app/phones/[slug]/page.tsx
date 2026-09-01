import { notFound } from 'next/navigation';
import SiteHeader from '../../../components/SiteHeader';
import PhoneCompareTray from '../../../components/PhoneCompareTray';
import SiteFooter from '../../../components/SiteFooter';
import PhoneDetail from '../../../components/PhoneDetail';
import PhoneRelated from '../../../components/PhoneRelated';
import { phoneCatalogue } from '../../../lib/phone-catalogue';

export function generateStaticParams() { return phoneCatalogue.map((phone) => ({ slug: phone.slug })); }

export default async function PhonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = phoneCatalogue.find((phone) => phone.slug === slug);
  if (!product) notFound();
  return <><SiteHeader /><PhoneDetail product={product} /><PhoneRelated product={product} products={phoneCatalogue} /><PhoneCompareTray /><SiteFooter /></>;
}
