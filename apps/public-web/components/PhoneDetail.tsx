'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, GitCompareArrows, ShieldCheck } from 'lucide-react';
import type { PhoneProduct, PhoneVariant } from '../lib/phone-catalogue';
import { customerPhoneDescription } from '../lib/phone-catalogue-utils';import SiteHeader from './SiteHeader';import SiteFooter from './SiteFooter';import WishlistButton from './WishlistButton';
import { togglePhoneCompare, isPhoneCompared } from './PhoneCompareTray';

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
  const [compared, setCompared] = useState(false);
  useEffect(() => setCompared(isPhoneCompared(product.slug)), [product.slug]);
  const variant = product.variants[selected] ?? product.variants[0];
  const media:string[] = [];
  const gallerySlots = Math.max(1, Math.min(4, media.length || 4));
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
    <main><SiteHeader/>
      <section className="phone-detail-hero">
        <div className="phone-detail-breadcrumbs">
          <Link href="/phones"><ArrowLeft size={14} /> All phones</Link><span>/</span><span>{product.brand}</span><span>/</span><span>{product.series}</span>
        </div>
        <div className="phone-detail-layout">
          <div className="phone-detail-gallery" aria-label={`${product.name} product gallery`}>
            <div className="phone-detail-main-media">
              <div className="phone-detail-photo-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>Product image unavailable</small></div>
              <div className="phone-gallery-index">{galleryIndex + 1} / {gallerySlots}</div>
              <button className="phone-gallery-arrow left" type="button" aria-label="Previous product image" onClick={previousGallery}><ChevronLeft size={18} /></button>
              <button className="phone-gallery-arrow right" type="button" aria-label="Next product image" onClick={nextGallery}><ChevronRight size={18} /></button>
            </div>
            <div className="phone-detail-thumbnails" aria-label="Product image views">
              {Array.from({ length: gallerySlots }).map((_, i) => <button type="button" key={i} className={galleryIndex === i ? 'active' : ''} aria-label={`View ${product.name} image ${i + 1}`} onClick={() => setGalleryIndex(i)}><span>{i + 1}</span></button>)}
            </div>
          </div>
          <div className="phone-detail-content">
            <p className="eyebrow">{modelPosition(product)} · {product.network || 'Connectivity details'}</p>
            <div className="detail-title-row"><div><h1>{product.name}</h1></div><WishlistButton id={product.slug}/></div>
            <p className="phone-detail-intro">{customerPhoneDescription(product)}</p><div className="phone-price-detail">Price coming soon</div>
            <div className="phone-detail-quickfacts">{quickFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>
            <div className="phone-detail-config">
              <div className="phone-detail-config-heading"><div><p className="eyebrow">OPTIONS</p><h2>Choose your preferred option</h2></div><span>{product.variants.length} available</span></div>
              <div className="phone-detail-variant-list" role="radiogroup" aria-label={`${product.name} available options`}>
                {product.variants.map((v, i) => <button type="button" role="radio" aria-checked={selected === i} key={`${v.label}-${i}`} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><span><strong>{v.label}</strong><small>{variantSummary(v)}</small></span>{selected === i && <Check size={16} />}</button>)}
              </div>
              <div className="phone-selected-config"><span>Your choice</span><strong>{variant?.label}</strong></div>
            </div>
            <div className="phone-detail-actions"><Link className="button gold" href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(variant?.label ?? '')}`}>Ask about this phone</Link><button type="button" className="button phone-detail-compare-button" onClick={() => { togglePhoneCompare(product.slug); setCompared(!compared); }}><GitCompareArrows size={15}/> {compared ? 'Added to comparison' : 'Compare phone'}</button><Link className="button" href="/phones">Continue browsing</Link></div>
            <div className="phone-detail-assurances"><span><ShieldCheck size={16} /> Trusted product information</span><span><ShieldCheck size={16} /> Clear choices</span></div>
          </div>
        </div>
      </section>
      <section className="section phone-detail-information">
        <div className="phone-detail-information-intro"><p className="eyebrow">AT A GLANCE</p><h2>Everything you need before you choose.</h2><p>See the main details for this phone and choose the storage or memory option that suits you.</p></div>
        <div className="phone-detail-information-grid"><div><span>Brand</span><strong>{product.brand}</strong></div><div><span>Range</span><strong>{product.family}</strong></div><div><span>Series</span><strong>{product.series}</strong></div><div><span>Connectivity</span><strong>{product.network || '—'}</strong></div><div><span>Choices</span><strong>{product.variants.length} options</strong></div><div><span>Availability</span><strong>Ask Amaal</strong></div></div>
      </section>
      <section className="section phone-variant-table-section">
        <div className="section-head"><div><p className="eyebrow">AVAILABLE OPTIONS</p><h2>Compare the available choices.</h2></div><p>Compare the available choices and select the one that fits your needs.</p></div>
        <div className="phone-variant-table-wrap"><table className="phone-variant-table"><thead><tr><th>Option</th><th>Storage</th><th>Memory</th><th>Connectivity</th></tr></thead><tbody>{product.variants.map((v, i) => <tr key={`${v.label}-${i}`}><td><strong>{v.label}</strong>{i === selected && <span className="table-selected">Selected</span>}</td><td>{v.storage || '—'}</td><td>{v.ram || '—'}</td><td>{v.network || product.network || '—'}</td></tr>)}</tbody></table></div>
      </section>
      <section className="section phone-detail-verification"><div><p className="eyebrow">SHOP WITH CONFIDENCE</p><h2>Need a final check?</h2></div><p>Contact Amaal to confirm current stock, colour, exact option, warranty and delivery before you order.</p></section>
      <section className="section phone-detail-bottom-cta"><div><p className="eyebrow">STILL EXPLORING?</p><h2>Find your next phone.</h2></div><Link className="button gold" href={`/phones/brand/${product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>Browse {product.brand} phones</Link></section>
    <SiteFooter/></main>
  );
}
