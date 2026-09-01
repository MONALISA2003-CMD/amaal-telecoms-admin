'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import type { PhoneProduct, PhoneVariant } from '../lib/phone-catalogue';

function variantSummary(v: PhoneVariant) {
  return [v.storage, v.ram, v.network].filter(Boolean).join(' · ') || v.label;
}

function galleryImages(product: PhoneProduct) {
  const galleries: Record<string, string[]> = {
    'apple-iphone-16-pro-max': [
      '/products/featured/iphone-16-pro-max-256gb-1.webp',
      '/products/featured/iphone-16-pro-max-256gb-2.webp',
      '/products/featured/iphone-16-pro-max-256gb-3.webp',
      '/products/featured/iphone-16-pro-max-256gb-4.webp'
    ],
    'google-pixel-pixel-9': [
      '/products/featured/google-pixel-9-256gb-1.webp',
      '/products/featured/google-pixel-9-256gb-2.webp'
    ],
    'samsung-galaxy-a07': ['/products/featured/galaxy-a07-64gb-1.webp'],
    'samsung-galaxy-a17': [
      '/products/featured/galaxy-a17-128gb-1.webp',
      '/products/featured/galaxy-a17-128gb-2.webp',
      '/products/featured/galaxy-a17-128gb-3.webp'
    ],
    'samsung-galaxy-s26-ultra': ['/products/galaxy-s26-ultra.webp']
  };
  return galleries[product.slug] ?? (product.image ? [product.image] : []);
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
  const gallery = galleryImages(product);
  const gallerySlots = gallery.length || 1;
  const quickFacts = useMemo(() => {
    const values = new Set<string>();
    for (const v of product.variants) {
      if (v.storage) values.add(v.storage);
      if (v.ram) values.add(v.ram);
      if (v.network) values.add(v.network);
    }
    return [...values].slice(0, 5);
  }, [product]);
  const nextGallery = () => setGalleryIndex((x) => (x + 1) % gallerySlots);
  const previousGallery = () => setGalleryIndex((x) => (x - 1 + gallerySlots) % gallerySlots);

  return (
    <main>
      <section className="phone-detail-hero">
        <div className="phone-detail-breadcrumbs">
          <Link href="/phones"><ArrowLeft size={14} /> All phones</Link><span>/</span><span>{product.brand}</span><span>/</span><span>{product.series}</span>
        </div>
        <div className="phone-detail-layout">
          <div className="phone-detail-gallery" aria-label={`${product.name} product gallery`}>
            <div className="phone-detail-main-media">
              <div className="phone-detail-photo-placeholder">{gallery.length ? <Image src={gallery[galleryIndex % gallery.length]} alt={product.name} fill sizes="(max-width: 900px) 100vw, 55vw" className="phone-detail-product-image" /> : <><span>AMAAL</span><strong>{product.name}</strong><small>Photography coming soon</small></>}</div>
              <div className="phone-gallery-index">{galleryIndex + 1} / {gallerySlots}</div>
              <button className="phone-gallery-arrow left" type="button" aria-label="Previous product image" onClick={previousGallery}><ChevronLeft size={18} /></button>
              <button className="phone-gallery-arrow right" type="button" aria-label="Next product image" onClick={nextGallery}><ChevronRight size={18} /></button>
            </div>
            <div className="phone-detail-thumbnails" aria-label="Product image views">
              {Array.from({ length: gallerySlots }).map((_, i) => <button type="button" key={i} className={galleryIndex === i ? 'active' : ''} aria-label={`View ${product.name} image ${i + 1}`} onClick={() => setGalleryIndex(i)}><span>{i + 1}</span></button>)}
            </div>
          </div>
          <div className="phone-detail-content">
            <p className="eyebrow">{modelPosition(product)} · {product.network}</p>
            <h1>{product.name}</h1>
            <p className="phone-detail-intro">Explore {product.name} from {product.brand}, with {product.variants.map((v) => v.label).join(", ")} storage options available to enquire about.</p>
            <div className="phone-detail-quickfacts">{quickFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>
            <div className="phone-detail-config">
              <div className="phone-detail-config-heading"><div><p className="eyebrow">STORAGE & OPTIONS</p><h2>Choose your storage</h2></div><span>{product.variants.length} options</span></div>
              <div className="phone-detail-variant-list" role="radiogroup" aria-label={`${product.name} storage options`}>
                {product.variants.map((v, i) => <button type="button" role="radio" aria-checked={selected === i} key={`${v.label}-${i}`} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><span><strong>{v.label}</strong><small>{variantSummary(v)}</small></span>{selected === i && <Check size={16} />}</button>)}
              </div>
              <div className="phone-selected-config"><span>Selected</span><strong>{variant?.label}</strong></div>
            </div>
            <div className="phone-detail-actions"><Link className="button gold" href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(variant?.label ?? '')}`}>Ask about this model</Link><Link className="button" href="/phones">Continue browsing</Link></div>
            <div className="phone-detail-assurances"><span><ShieldCheck size={16} /> Amaal selection</span><span><Sparkles size={16} /> Clear product information</span></div>
          </div>
        </div>
      </section>
      <section className="section phone-detail-information">
        <div className="phone-detail-information-intro"><p className="eyebrow">ABOUT THIS PHONE</p><h2>Choose the storage that suits you.</h2><p>Choose the storage option that suits you. Each phone is shown as one model so it is easy to explore without unnecessary duplicate pages.</p></div>
        <div className="phone-detail-information-grid"><div><span>Brand</span><strong>{product.brand}</strong></div><div><span>Family</span><strong>{product.family}</strong></div><div><span>Series</span><strong>{product.series}</strong></div><div><span>Network</span><strong>{product.network}</strong></div><div><span>Storage options</span><strong>{product.variants.length} storage options</strong></div><div><span>Availability</span><strong>Available to enquire</strong></div></div>
      </section>
      <section className="section phone-variant-table-section">
        <div className="section-head"><div><p className="eyebrow">AVAILABLE OPTIONS</p><h2>Choose the option that suits you.</h2></div><p>Select the storage option you prefer. Ask Amaal for current availability, colour and final details.</p></div>
        <div className="phone-variant-table-wrap"><table className="phone-variant-table"><thead><tr><th>Option</th><th>Storage</th><th>RAM</th><th>Network</th></tr></thead><tbody>{product.variants.map((v, i) => <tr key={`${v.label}-${i}`}><td><strong>{v.label}</strong>{i === selected && <span className="table-selected">Selected</span>}</td><td>{v.storage || '—'}</td><td>{v.ram || '—'}</td><td>{v.network || product.network || '—'}</td></tr>)}</tbody></table></div>
      </section>
      <section className="section phone-detail-verification"><div><p className="eyebrow">CLEAR INFORMATION</p><h2>Clear information, without the clutter.</h2></div><p>Availability, colour, warranty and final details can vary. Contact Amaal for the latest information before ordering.</p></section>
      <section className="section phone-detail-bottom-cta"><div><p className="eyebrow">STILL EXPLORING?</p><h2>Explore more phones from Amaal.</h2></div><Link className="button gold" href="/phones">Browse more {product.brand} phones</Link></section>
    </main>
  );
}
