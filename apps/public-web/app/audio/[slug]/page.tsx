import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import { audioProducts, audioProduct } from '../../../lib/audio-catalogue';
import { getAudioMedia } from '../../../lib/audio-media';

export function generateStaticParams() { return audioProducts.map(p => ({ slug: p.slug })); }

async function getLiveMedia(slug: string) {
  const base = process.env.AMAAL_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return undefined;
  try {
    const r = await fetch(`${base.replace(/\/$/, '')}/api/public/catalog`, { next: { revalidate: 60 } });
    if (!r.ok) return undefined;
    const data = await r.json();
    const p = data?.products?.find((x: any) => x.slug === slug && x.category_slug?.startsWith('entertainment-audio'));
    return p?.images?.find((x: any) => x.primary)?.url || p?.images?.[0]?.url;
  } catch { return undefined; }
}

export default async function AudioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = audioProduct(slug);
  if (!p) notFound();
  const item = p!;
  const media = (await getLiveMedia(item.slug)) || getAudioMedia(item);
  const related = audioProducts.filter(x => x.brand === item.brand && x.slug !== item.slug).slice(0, 4);
  const brandSlug = item.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return <main><SiteHeader/><section className="audio-detail"><div className="audio-detail-media">{media ? <img src={media} alt={item.name}/> : <div className="audio-detail-placeholder"><span>{item.brand}</span><strong>{item.type}</strong><small>Product image or video coming soon.</small></div>}</div><div className="audio-detail-copy"><Link className="quiet-link" href={`/audio/brand/${brandSlug}`}>← {item.brand} collection</Link><p className="eyebrow">{item.type} · {item.tier === 'EVERYDAY' ? 'Everyday' : item.tier}</p><h1>{item.name}</h1><div className="audio-price-detail">Price coming soon</div><p className="audio-detail-lead">{item.description}</p><div className="audio-specs">{Object.entries(item.specs).map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>{item.oemUrl && <a className="button gold" href={item.oemUrl} target="_blank" rel="noreferrer">Manufacturer information <span>↗</span></a>}</div></section>{related.length > 0 && <section className="section audio-related"><div className="section-head"><div><p className="eyebrow">MORE FROM {item.brand.toUpperCase()}</p><h2>Explore more sound.</h2></div></div><div className="audio-related-grid">{related.map(r => <Link href={`/audio/${r.slug}`} key={r.slug}><span>{r.type}</span><strong>{r.name}</strong><small>Price coming soon →</small></Link>)}</div></section>}<SiteFooter/></main>;
}
