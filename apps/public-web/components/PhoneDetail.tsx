'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, GitCompareArrows, ShieldCheck } from 'lucide-react';
import type { PhoneProduct, PhoneVariant } from '../lib/phone-catalogue';
import { getPhoneMedia } from '../lib/phone-media';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import WishlistButton from './WishlistButton';
import { togglePhoneCompare, isPhoneCompared } from './PhoneCompareTray';

function variantSummary(v: PhoneVariant) { return [v.storage, v.ram, v.network].filter(Boolean).join(' · ') || v.label; }
function money(value?: number) { return typeof value === 'number' ? `UGX ${value.toLocaleString('en-UG')}` : 'Price to be confirmed'; }
function modelPosition(product: PhoneProduct) { if (product.family === 'iPhone') return 'Apple iPhone'; if (product.family === 'Galaxy') return 'Samsung Galaxy'; return product.family; }

export default function PhoneDetail({ product }: { product: PhoneProduct }) {
  const [selected, setSelected] = useState(0); const [galleryIndex, setGalleryIndex] = useState(0); const [compared, setCompared] = useState(false);
  useEffect(() => setCompared(isPhoneCompared(product.slug)), [product.slug]);
  const variant = product.variants[selected] ?? product.variants[0]; const media = getPhoneMedia(product); const gallerySlots = Math.max(1, media.length);
  const quickFacts = useMemo(() => { const values = new Set<string>(); for (const v of product.variants) { if (v.storage) values.add(v.storage); if (v.ram) values.add(v.ram); if (v.network) values.add(v.network); } return [...values].slice(0, 6); }, [product]);
  const nextGallery = () => setGalleryIndex(x => (x + 1) % gallerySlots); const previousGallery = () => setGalleryIndex(x => (x - 1 + gallerySlots) % gallerySlots);

  return <main><SiteHeader/>
    <section className="phone-detail-hero">
      <div className="phone-detail-breadcrumbs"><Link href="/phones"><ArrowLeft size={14}/> All phones</Link><span>/</span><span>{product.brand}</span><span>/</span><span>{product.series}</span></div>
      <div className="phone-detail-layout">
        <div className="phone-detail-gallery" aria-label={`${product.name} product gallery`}>
          <div className="phone-detail-main-media">
            {media[galleryIndex] ? <img src={media[galleryIndex]} alt={`${product.name} product image ${galleryIndex + 1}`} className="phone-detail-product-image"/> : <div className="phone-detail-photo-placeholder"><span>AMAAL</span><strong>{product.name}</strong><small>Photo coming soon</small></div>}
            <div className="phone-gallery-index">{media.length ? `${galleryIndex + 1} / ${gallerySlots}` : 'Photo coming soon'}</div>
            {gallerySlots > 1 && <><button className="phone-gallery-arrow left" type="button" aria-label="Previous product image" onClick={previousGallery}><ChevronLeft size={18}/></button><button className="phone-gallery-arrow right" type="button" aria-label="Next product image" onClick={nextGallery}><ChevronRight size={18}/></button></>}
          </div>
          {media.length > 1 && <div className="phone-detail-thumbnails" aria-label="Product image views">{media.map((src,i)=><button type="button" key={src} className={galleryIndex===i?'active':''} onClick={()=>setGalleryIndex(i)} aria-label={`View ${product.name} image ${i+1}`}><img src={src} alt=""/></button>)}</div>}
        </div>
        <div className="phone-detail-content">
          <p className="eyebrow">{modelPosition(product)} · {product.network || 'Connectivity details'}</p>
          <div className="detail-title-row"><div><h1>{product.name}</h1></div><WishlistButton id={product.slug}/></div>
          <p className="phone-detail-intro">{product.quickSpecs || product.description.split('. ')[0]}</p>
          <div className="phone-price-detail">{money(variant?.price)}</div>
          <div className="phone-detail-quickfacts">{quickFacts.map(fact=><span key={fact}>{fact}</span>)}</div>
          <div className="phone-detail-config"><div className="phone-detail-config-heading"><div><p className="eyebrow">OPTIONS</p><h2>{product.variants.length ? 'Choose your preferred option' : 'Product configuration'}</h2></div><span>{product.variants.length ? `${product.variants.length} available` : 'Details coming soon'}</span></div>
            {product.variants.length ? <div className="phone-detail-variant-list" role="radiogroup" aria-label={`${product.name} available options`}>{product.variants.map((v,i)=><button type="button" role="radio" aria-checked={selected===i} key={`${v.label}-${i}`} className={selected===i?'selected':''} onClick={()=>setSelected(i)}><span><strong>{v.label}</strong><small>{variantSummary(v)}</small></span><b>{money(v.price)}</b>{selected===i&&<Check size={16}/>}</button>)}</div> : <div className="phone-detail-photo-placeholder"><strong>Product details coming soon</strong><small>Amaal will confirm the exact configuration and price before sale.</small></div>}
            <div className="phone-selected-config"><span>Current option</span><strong>{variant?.label ?? 'To be confirmed'}</strong></div>
          </div>
          <div className="phone-detail-actions"><Link className="button gold" href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(variant?.label??'')}`}>Ask about this phone</Link><button type="button" className="button phone-detail-compare-button" onClick={()=>{togglePhoneCompare(product.slug);setCompared(!compared)}}><GitCompareArrows size={15}/> {compared?'Added to comparison':'Compare phone'}</button><Link className="button" href="/phones">Continue browsing</Link></div>
          <div className="phone-detail-assurances"><span><ShieldCheck size={16}/> Trusted product information</span><span><ShieldCheck size={16}/> Clear choices</span></div>
        </div>
      </div>
    </section>
    <section className="section phone-detail-information"><div className="phone-detail-information-intro"><p className="eyebrow">AT A GLANCE</p><h2>Everything you need before you choose.</h2><p>{product.description}</p></div>
      <div className="phone-detail-information-grid"><div><span>Brand</span><strong>{product.brand}</strong></div><div><span>Range</span><strong>{product.family}</strong></div><div><span>Series</span><strong>{product.series}</strong></div><div><span>Connectivity</span><strong>{product.network||'—'}</strong></div><div><span>Choices</span><strong>{product.variants.length} options</strong></div><div><span>Availability</span><strong>Ask Amaal</strong></div></div>
    </section>
    {product.specifications?.length ? <section className="section phone-variant-table-section"><div className="section-head"><div><p className="eyebrow">DETAILED SPECIFICATIONS</p><h2>Verified product details.</h2></div><p>Only information available in the approved Amaal product source is shown here.</p></div><div className="phone-specification-list">{product.specifications.map((spec,i)=>{const [label,...rest]=spec.split(':'); return <div key={`${spec}-${i}`}><span>{rest.length?label: 'Specification'}</span><strong>{rest.length?rest.join(':').trim():spec}</strong></div>})}</div></section> : null}
    <section className="section phone-variant-table-section"><div className="section-head"><div><p className="eyebrow">AVAILABLE OPTIONS</p><h2>Compare the available choices.</h2></div><p>Select the exact storage or memory configuration you want.</p></div><div className="phone-variant-table-wrap"><table className="phone-variant-table"><thead><tr><th>Option</th><th>Storage</th><th>Memory</th><th>Connectivity</th><th>Price</th></tr></thead><tbody>{product.variants.map((v,i)=><tr key={`${v.label}-${i}`}><td><strong>{v.label}</strong>{i===selected&&<span className="table-selected">Selected</span>}</td><td>{v.storage||'—'}</td><td>{v.ram||'—'}</td><td>{v.network||product.network||'—'}</td><td>{money(v.price)}</td></tr>)}</tbody></table></div></section>
    <section className="section phone-detail-verification"><div><p className="eyebrow">SHOP WITH CONFIDENCE</p><h2>Need a final check?</h2></div><p>Contact Amaal to confirm current stock, colour, exact option, warranty and delivery before you order.</p></section>
    <section className="section phone-detail-bottom-cta"><div><p className="eyebrow">STILL EXPLORING?</p><h2>Find your next phone.</h2></div><Link className="button gold" href={`/phones/brand/${product.brand.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`}>Browse {product.brand} phones</Link></section>
    <SiteFooter/></main>;
}
