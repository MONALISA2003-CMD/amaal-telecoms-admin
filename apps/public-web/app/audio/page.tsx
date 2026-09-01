import Link from 'next/link';
import { ArrowRight, Music2, Sparkles } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import AudioCatalogueClient from '../../components/AudioCatalogueClient';
import { audioBrands, audioProducts, audioTiers } from '../../lib/audio-catalogue';

export default function AudioPage() {
  return <main><SiteHeader/>
    <section className="audio-hero">
      <div><p className="eyebrow">AMAAL · AUDIO</p><h1>Bring the<br/><em>room to life.</em></h1><p>From everyday home sound to powerful party systems, discover speakers selected for music, movies, celebrations and everything between.</p><div className="audio-hero-actions"><a className="button gold" href="#audio-catalogue">Explore audio <ArrowRight size={15}/></a><Link className="button" href="/shop">Shop everything</Link></div></div>
      <div className="audio-hero-art"><div className="audio-hero-placeholder"><Music2 size={40}/><span>HERO IMAGE / VIDEO</span><small>Upload Amaal's audio campaign media from the Business Console.</small></div></div>
    </section>
    <section className="audio-trust"><div><strong>Everyday</strong><span>Home listening</span></div><div><strong>Party</strong><span>Big bass & big moments</span></div><div><strong>Premium</strong><span>Leading audio brands</span></div><div><strong>Uganda</strong><span>Local delivery & support</span></div></section>
    <section className="section audio-discover"><div className="section-head"><div><p className="eyebrow">SHOP BY EXPERIENCE</p><h2>Choose your kind of sound.</h2></div><Sparkles size={22}/></div><div className="audio-tier-grid">{audioTiers.map(([tier,label]) => <a href={`#tier-${tier.toLowerCase()}`} key={tier}><span>{tier}</span><strong>{label}</strong><small>{audioProducts.filter(p => p.tier === tier).length} products</small><ArrowRight size={16}/></a>)}</div></section>
    <section className="section audio-brands"><div className="section-head"><div><p className="eyebrow">BRANDS</p><h2>Explore by brand.</h2></div></div><div className="audio-brand-grid">{audioBrands.map(b => <Link href={`/audio/brand/${b.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} key={b}><span>{b}</span><small>{audioProducts.filter(p => p.brand === b).length} products</small><ArrowRight size={14}/></Link>)}</div></section>
    <section id="audio-catalogue" className="section audio-catalogue"><div className="section-head"><div><p className="eyebrow">AUDIO COLLECTION</p><h2>Find your sound.</h2><p className="section-intro">Browse by brand, experience or product type. Prices appear as coming soon until Amaal confirms current stock and pricing.</p></div></div><AudioCatalogueClient/></section>
    <SiteFooter/></main>;
}
