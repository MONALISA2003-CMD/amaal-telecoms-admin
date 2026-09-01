import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../../../../components/SiteHeader';
import SiteFooter from '../../../../components/SiteFooter';
import AudioCatalogueClient from '../../../../components/AudioCatalogueClient';
import { audioBrands } from '../../../../lib/audio-catalogue';

export function generateStaticParams() { return audioBrands.map(b => ({ brand: b.toLowerCase().replace(/[^a-z0-9]+/g, '-') })); }
export default async function AudioBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = await params;
  const name = audioBrands.find(b => b.toLowerCase().replace(/[^a-z0-9]+/g, '-') === brand);
  if (!name) notFound();
  return <main><SiteHeader/><section className="section audio-brand-hero"><p className="eyebrow">AMAAL · {name.toUpperCase()}</p><h1>{name}<br/><em>audio.</em></h1><p>Explore the {name} sound collection available through Amaal.</p><Link className="quiet-link" href="/audio">← All audio</Link></section><section className="section audio-catalogue"><div className="section-head"><div><p className="eyebrow">{name.toUpperCase()} COLLECTION</p><h2>Sound, selected.</h2></div></div><AudioCatalogueClient initialBrand={name}/></section><SiteFooter/></main>;
}
