'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal, X } from 'lucide-react';
import WishlistButton from './WishlistButton';
import { audioBrands, audioProducts, audioTiers, type AudioProduct, type AudioTier } from '../lib/audio-catalogue';

function AudioCard({ product, remoteMedia, basePath }: { product: AudioProduct; remoteMedia?: string; basePath:string }) {
  const media = product.image || remoteMedia;
  return <article className="audio-card">
    <Link href={`${basePath}/${product.slug}`} className="audio-card-link">
      <div className="audio-media">
        {media ? <img className="audio-real-image" src={media} alt={`${product.name} product image`} loading="lazy" decoding="async" /> : <div className="audio-placeholder"><span>{product.brand}</span><strong>{product.type}</strong><small>Photo coming soon</small></div>}
        <span className="audio-tier-badge">{product.tier === 'EVERYDAY' ? 'EVERYDAY' : product.tier}</span>
      </div>
      <div className="audio-card-body">
        <p>{product.brand}</p>
        <h4>{product.name}</h4>
        <div className="audio-quick">{product.quickSpecs.slice(0, 3).map(s => <span key={s}>{s}</span>)}</div>
        <strong className="audio-price">{product.price ? `UGX ${product.price.toLocaleString('en-UG')}` : 'Price coming soon'}</strong>
        <span className="audio-view">View product <ArrowRight size={13}/></span>
      </div>
    </Link>
    <div className="audio-card-wishlist"><WishlistButton id={product.slug}/></div>
  </article>;
}

export default function AudioCatalogueClient({ initialBrand, basePath='/categories/entertainment/audio' }: { initialBrand?: string; basePath?: string } = {}) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState(initialBrand || 'All brands');
  const [tier, setTier] = useState<'All' | AudioTier>('All');
  const [type, setType] = useState('All types');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [remoteMedia, setRemoteMedia] = useState<Record<string, string>>({});

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_AMAAL_API_BASE_URL;
    if (!base) return;
    let active = true;
    fetch(`${base.replace(/\/$/, '')}/api/public/catalog`, { headers: { Accept: 'application/json' } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!active) return;
        const map: Record<string, string> = {};
        for (const p of data?.products || []) {
          if (p?.slug && p?.category_slug?.startsWith('entertainment-audio')) {
            const image = p?.images?.find((x: any) => x.primary)?.url || p?.images?.[0]?.url;
            if (image) map[p.slug] = image;
          }
        }
        setRemoteMedia(map);
      }).catch(() => {});
    return () => { active = false; };
  }, []);

  const types = useMemo(() => Array.from(new Set(audioProducts.map(p => p.type))), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return audioProducts.filter(p => {
      const haystack = `${p.name} ${p.brand} ${p.type} ${p.shortDescription} ${p.quickSpecs.join(' ')}`.toLowerCase();
      return (!q || haystack.includes(q)) && (brand === 'All brands' || p.brand === brand) && (tier === 'All' || p.tier === tier) && (type === 'All types' || p.type === type);
    });
  }, [query, brand, tier, type]);

  const reset = () => { setQuery(''); setBrand(initialBrand || 'All brands'); setTier('All'); setType('All types'); };
  return <>
    <section className="audio-catalogue-tools" aria-label="Find audio products">
      <div className="audio-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search speakers, woofers and sound systems" aria-label="Search audio" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={15}/></button>}</div>
      <button className="audio-filter-toggle" onClick={() => setFiltersOpen(v => !v)}><SlidersHorizontal size={15}/> Filters</button>
      <div className={`audio-filter-panel ${filtersOpen ? 'open' : ''}`}>
        <label>Brand<select value={brand} onChange={e => setBrand(e.target.value)}><option>All brands</option>{audioBrands.map(b => <option key={b}>{b}</option>)}</select></label>
        <label>Experience<select value={tier} onChange={e => setTier(e.target.value as 'All' | AudioTier)}><option value="All">All experiences</option>{audioTiers.map(([t, label]) => <option value={t} key={t}>{label}</option>)}</select></label>
        <label>Type<select value={type} onChange={e => setType(e.target.value)}><option>All types</option>{types.map(t => <option key={t}>{t}</option>)}</select></label>
        <button className="audio-reset" onClick={reset}>Reset</button>
      </div>
    </section>
    <div className="audio-results-line"><span>{filtered.length} products</span>{(query || brand !== 'All brands' || tier !== 'All' || type !== 'All types') && <button onClick={reset}>Clear filters</button>}</div>
    {filtered.length ? <div className="audio-grid">{filtered.map(p => <AudioCard key={p.slug} product={p} remoteMedia={remoteMedia[p.slug]} basePath={basePath}/>)}</div> : <div className="audio-empty"><h3>No sound products found.</h3><p>Try another brand, product type or search.</p><button className="button gold" onClick={reset}>Show all audio</button></div>}
  </>;
}
