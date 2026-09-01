'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Sparkles } from 'lucide-react';
import type { PhoneProduct, PhoneVariant } from '../lib/phone-catalogue';

function variantSummary(v: PhoneVariant) {
  return [v.storage, v.ram, v.network].filter(Boolean).join(' · ') || v.label;
}

function modelPosition(product: PhoneProduct) {
  if (product.family === 'iPhone') return 'Apple iPhone';
  if (product.family === 'Galaxy') return 'Samsung Galaxy';
  return product.family;
}

export default function PhoneDetail({ product }: { product: PhoneProduct }) {
  const [selected, setSelected] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const variant = product.variants[selected] ?? product.variants[0];
  const hasPhoto = Boolean(product.image);
  const gallerySlots = hasPhoto ? 1 : 0;
  const quickFacts = useMemo(() => {
    const values = new Set<string>();
    for (const v of product.variants) {
      if (v.storage) values.add(v.storage);
      if (v.ram) values.add(v.ram);
      if (v.network) values.add(v.network);
    }
    return [...values].slice(0, 5);
  }, [product]);
  const nextGallery = () => setGalleryIndex(0);
  const previousGallery = () => setGalleryIndex(0);

  return (
    <main>
      <section className="phone-detail-hero">
        <div className="phone-detail-breadcrumbs">
          <Link href="/phones"><ArrowLeft size={14} /> All phones</Link><span>/</span><span>{product.brand}</span><span>/</span><span>{product.series}</span>
        </div>
        <div className="phone-detail-layout">
          <div className="phone-detail-gallery" aria-label={`${product.name} product gallery`}>
            <div className="phone-detail-main-media">
              {hasPhoto ? <img className="phone-detail-product-image" src={product.image} alt={product.name} /> : <div className="phone-detail-photo-placeholder"><span>{product.brand === 'Google Pixel' ? 'G' : product.brand.slice(0,1)}</span><strong>{product.name}</strong><small>Product image coming soon</small></div>}
            </div>
            {hasPhoto && <div className="phone-detail-thumbnails" aria-label="Product image views"><button type="button" className="active" aria-label={`View ${product.name} image`}><img src={product.image} alt="" /></button></div>}
          </div>
          <div className="phone-detail-content">
            <p className="eyebrow">{modelPosition(product)} · {product.network}</p>
            <h1>{product.name}</h1>
            <p className="phone-detail-intro">{product.brand} {product.family} in the {product.series}, with {product.variants.length} configuration{product.variants.length === 1 ? '' : 's'} to choose from. Explore the available options below or ask Amaal for help choosing.</p>
            <div className="phone-detail-quickfacts">{quickFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>
            <div className="phone-detail-config">
              <div className="phone-detail-config-heading"><div><p className="eyebrow">CONFIGURATION</p><h2>Choose your model variant</h2></div><span>{product.variants.length} options</span></div>
              <div className="phone-detail-variant-list" role="radiogroup" aria-label={`${product.name} configurations`}>
                {product.variants.map((v, i) => <button type="button" role="radio" aria-checked={selected === i} key={`${v.label}-${i}`} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><span><strong>{v.label}</strong><small>{variantSummary(v)}</small></span>{selected === i && <Check size={16} />}</button>)}
              </div>
              <div className="phone-selected-config"><span>Selected</span><strong>{variant?.label}</strong></div>
            </div>
            <div className="phone-detail-actions"><Link className="button gold" href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(variant?.label ?? '')}`}>Ask about this model</Link><Link className="button" href="/phones">Continue browsing</Link></div>
            <div className="phone-detail-assurances"><span><ShieldCheck size={16} /> Genuine product</span><span><Sparkles size={16} /> Clear configurations</span></div>
          </div>
        </div>
      </section>
      <section className="section phone-detail-information">
        <div className="phone-detail-information-intro"><p className="eyebrow">MODEL GUIDE</p><h2>One model. Clear choices.</h2><p>Choose the configuration that suits you. Storage, RAM and network details are grouped together so it is easy to compare the options without duplicate product pages.</p></div>
        <div className="phone-detail-information-grid"><div><span>Brand</span><strong>{product.brand}</strong></div><div><span>Family</span><strong>{product.family}</strong></div><div><span>Series</span><strong>{product.series}</strong></div><div><span>Network</span><strong>{product.network}</strong></div><div><span>Variants</span><strong>{product.variants.length} configurations</strong></div><div><span>Shopping support</span><strong>Available from Amaal</strong></div></div>
      </section>
      <section className="section phone-variant-table-section">
        <div className="section-head"><div><p className="eyebrow">AVAILABLE CONFIGURATIONS</p><h2>Compare the variants.</h2></div><p>Choose the configuration that matches your needs. Storage, memory and network details are shown where available.</p></div>
        <div className="phone-variant-table-wrap"><table className="phone-variant-table"><thead><tr><th>Configuration</th><th>Storage</th><th>RAM</th><th>Network</th></tr></thead><tbody>{product.variants.map((v, i) => <tr key={`${v.label}-${i}`}><td><strong>{v.label}</strong>{i === selected && <span className="table-selected">Selected</span>}</td><td>{v.storage || '—'}</td><td>{v.ram || '—'}</td><td>{v.network || product.network || '—'}</td></tr>)}</tbody></table></div>
      </section>
      <section className="section phone-detail-verification"><div><p className="eyebrow">SHOP WITH CONFIDENCE</p><h2>Need a little more information?</h2></div><p>Ask Amaal about current availability, exact configuration, delivery, warranty and any specifications you want to confirm before placing your order.</p></section>
      <section className="section phone-detail-bottom-cta"><div><p className="eyebrow">STILL EXPLORING?</p><h2>See every phone in the Amaal catalogue.</h2></div><Link className="button gold" href="/phones">Browse all {product.brand} phones</Link></section>
    </main>
  );
}
