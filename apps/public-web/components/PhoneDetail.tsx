'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, GitCompareArrows, ShieldCheck } from 'lucide-react';
import type { PhoneProduct, PhoneVariant } from '../lib/phone-catalogue';
import { getPhoneMedia } from '../lib/phone-media';
import { masterPhone } from '../lib/amaal-master-data-utils';
import WishlistButton from './WishlistButton';
import AddToBag from './AddToBag';
import SiteFooter from './SiteFooter';
import { togglePhoneCompare, isPhoneCompared } from './PhoneCompareTray';

type CommerceOption = { id: string; variantId: string; price: number };

function variantSummary(v: PhoneVariant) {
  return [v.storage, v.ram, v.network].filter(Boolean).join(' · ') || v.label;
}

function formatUGX(value?: number) {
  if (!value) return 'Price coming soon';
  return `UGX ${value.toLocaleString('en-UG')}`;
}

export default function PhoneDetail({
  product,
  commerce = {},
}: {
  product: PhoneProduct;
  commerce?: Record<string, CommerceOption>;
}) {
  const [selected, setSelected] = useState(() => {
    if (product.slug === 'google-pixel-pixel-9') { const index = product.variants.findIndex((v) => v.storage === '256GB'); return index >= 0 ? index : 0; }
    return 0;
  });
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [compared, setCompared] = useState(false);

  useEffect(() => setCompared(isPhoneCompared(product.slug)), [product.slug]);

  const variant = product.variants[selected] ?? product.variants[0];
  const media = getPhoneMedia(product);
  const gallery = media.length ? media : [''];
  const master = masterPhone(product.slug);
  const homepagePrice = product.slug === 'google-pixel-pixel-9' ? 1800000 : undefined;
  const selectedPrice = variant?.price ?? homepagePrice;
  const quickFacts = useMemo(() => master?.quickSpecs?.slice(0, 5) ?? [], [master]);
  const selectedCommerce = variant ? commerce[variant.label] : undefined;

  const nextGallery = () => setGalleryIndex((x) => (x + 1) % gallery.length);
  const previousGallery = () => setGalleryIndex((x) => (x - 1 + gallery.length) % gallery.length);

  return (
    <main>
      <section className="phone-detail-hero">
        <div className="phone-detail-breadcrumbs">
          <Link href="/phones"><ArrowLeft size={14} /> All phones</Link>
          <span>/</span><span>{product.brand}</span><span>/</span><span>{product.series}</span>
        </div>

        <div className="phone-detail-layout">
          <div className="phone-detail-gallery" aria-label={`${product.name} product gallery`}>
            <div className="phone-detail-main-media">
              {gallery[galleryIndex] ? (
                <img
                  src={gallery[galleryIndex]}
                  alt={`${product.name} product image ${galleryIndex + 1}`}
                  className="phone-detail-real-image"
                />
              ) : (
                <div className="phone-detail-photo-placeholder">
                  <span>AMAAL</span><strong>{product.name}</strong><small>Photo coming soon</small>
                </div>
              )}
              <div className="phone-gallery-index">{galleryIndex + 1} / {gallery.length}</div>
              {gallery.length > 1 && <>
                <button className="phone-gallery-arrow left" type="button" aria-label="Previous product image" onClick={previousGallery}><ChevronLeft size={18} /></button>
                <button className="phone-gallery-arrow right" type="button" aria-label="Next product image" onClick={nextGallery}><ChevronRight size={18} /></button>
              </>}
            </div>
            <div className="phone-detail-thumbnails" aria-label="Product image views">
              {gallery.map((src, i) => (
                <button type="button" key={`${src}-${i}`} className={galleryIndex === i ? 'active' : ''} aria-label={`View ${product.name} image ${i + 1}`} onClick={() => setGalleryIndex(i)}>
                  {src ? <img src={src} alt="" /> : <span>Photo<br/>soon</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="phone-detail-content">
            <p className="eyebrow">{product.brand} · {product.series} · {product.network || 'Connectivity details'}</p>
            <div className="detail-title-row"><div><h1>{product.name}</h1></div><WishlistButton id={product.slug}/></div>
            <p className="phone-detail-intro">{product.description}</p>
            <div className="phone-price-detail">{formatUGX(selectedPrice)}</div>
            <div className="phone-detail-quickfacts">{quickFacts.map((fact) => <span key={fact}>{fact}</span>)}</div>

            <div className="phone-detail-config">
              <div className="phone-detail-config-heading">
                <div><p className="eyebrow">OPTIONS</p><h2>Choose your preferred option</h2></div>
                <span>{product.variants.length} available</span>
              </div>
              <div className="phone-detail-variant-list" role="radiogroup" aria-label={`${product.name} available options`}>
                {product.variants.map((v, i) => (
                  <button type="button" role="radio" aria-checked={selected === i} key={`${v.label}-${i}`} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}>
                    <span><strong>{v.label}</strong><small>{variantSummary(v)}{v.price ? ` · ${formatUGX(v.price)}` : (v.storage === '256GB' && homepagePrice ? ` · ${formatUGX(homepagePrice)}` : '')}</small></span>
                    {selected === i && <Check size={16} />}
                  </button>
                ))}
              </div>
              <div className="phone-selected-config"><span>Your choice</span><strong>{variant?.label}</strong></div>
            </div>

            <div className="phone-detail-actions">
              {selectedCommerce ? (
                <AddToBag id={selectedCommerce.id} variantId={selectedCommerce.variantId} name={product.name} brand={product.brand} slug={product.slug} price={formatUGX(selectedCommerce.price)} numericPrice={selectedCommerce.price} buttonLabel="Add to cart" addedLabel="Added to cart" />
              ) : (
                <Link className="button gold" href={`/contact?product=${encodeURIComponent(product.name)}&variant=${encodeURIComponent(variant?.label ?? '')}`}>Check availability</Link>
              )}
              <button type="button" className="button phone-detail-compare-button" onClick={() => { togglePhoneCompare(product.slug); setCompared(!compared); }}><GitCompareArrows size={15}/> {compared ? 'Added to comparison' : 'Compare phone'}</button>
            </div>
            <div className="phone-detail-assurances">
              <span><ShieldCheck size={16} /> Clear pricing</span>
              <span><ShieldCheck size={16} /> Verified availability only</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section phone-detail-information">
        <div className="phone-detail-information-intro"><p className="eyebrow">PRODUCT INFORMATION</p><h2>Everything you need before you choose.</h2><p>Review the supplied product description, specifications and available configurations in one place.</p></div>
        <div className="phone-detail-information-grid">
          <div><span>Brand</span><strong>{product.brand}</strong></div>
          <div><span>Range</span><strong>{product.family}</strong></div>
          <div><span>Series</span><strong>{product.series}</strong></div>
          <div><span>Connectivity</span><strong>{product.network || 'See model'}</strong></div>
          <div><span>Configurations</span><strong>{product.variants.length} options</strong></div>
          <div><span>Photography</span><strong>{media.length ? 'Supplied' : 'Coming soon'}</strong></div>
        </div>
      </section>

      <section className="section product-description-section">
        <div className="section-head"><div><p className="eyebrow">FULL DESCRIPTION</p><h2>Made for the way you use it.</h2></div></div>
        <p className="product-long-description">{product.description}</p>
      </section>

      <section className="section phone-variant-table-section">
        <div className="section-head"><div><p className="eyebrow">DETAILED SPECIFICATIONS</p><h2>Compare the supplied configurations.</h2></div></div>
        <div className="phone-variant-table-wrap">
          <table className="phone-variant-table">
            <thead><tr><th>Option</th><th>Storage</th><th>Memory</th><th>Connectivity</th><th>Price</th></tr></thead>
            <tbody>{product.variants.map((v, i) => <tr key={`${v.label}-${i}`}><td><strong>{v.label}</strong>{i === selected && <span className="table-selected">Selected</span>}</td><td>{v.storage || '—'}</td><td>{v.ram || 'Not specified'}</td><td>{v.network || product.network || '—'}</td><td>{v.price ? formatUGX(v.price) : (v.storage === '256GB' && homepagePrice ? formatUGX(homepagePrice) : 'See current offer')}</td></tr>)}</tbody>
          </table>
        </div>
        {master?.technologySupport && <div className="product-spec-callout"><span>Technology support</span><strong>{master.technologySupport}</strong></div>}
        {master?.quickSpecs?.length ? <div className="product-spec-list"><h3>Key specifications</h3><ul>{master.quickSpecs.map((s) => <li key={s}>{s}</li>)}</ul></div> : null}
      </section>

      <section className="section phone-detail-verification"><div><p className="eyebrow">SHOP WITH CONFIDENCE</p><h2>Need a final check?</h2></div><p>Where online stock is not verified, Amaal keeps the product purchasable by enquiry rather than showing invented inventory.</p></section>
      <section className="section phone-detail-bottom-cta"><div><p className="eyebrow">STILL EXPLORING?</p><h2>Find your next phone.</h2></div><Link className="button gold" href={`/phones/brand/${product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>Browse {product.brand} phones</Link></section>
      <SiteFooter/>
    </main>
  );
}
