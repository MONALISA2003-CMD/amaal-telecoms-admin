'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { phoneCatalogue } from '../../lib/phone-catalogue';

const premiumSlugs = [
  'apple-iphone-17-pro-max',
  'samsung-galaxy-s26-ultra',
  'google-pixel-10-pro-xl',
  'apple-iphone-16-pro-max',
  'samsung-galaxy-s25-ultra',
  'google-pixel-9-pro-xl',
];

const imagery: Record<string, string> = {
  'apple-iphone-17-pro-max': '/products/iphone17-pro-max.webp',
  'samsung-galaxy-s26-ultra': '/products/galaxy-s26-ultra.webp',
  'google-pixel-10-pro-xl': '/products/featured/google-pixel-9-256gb-1.webp',
  'apple-iphone-16-pro-max': '/products/featured/iphone-16-pro-max-256gb-1.webp',
  'samsung-galaxy-s25-ultra': '/products/galaxy-s26-ultra.webp',
  'google-pixel-9-pro-xl': '/products/featured/google-pixel-9-256gb-1.webp',
};

const premium = premiumSlugs.map((slug) => {
  const product = phoneCatalogue.find((p) => p.slug === slug);
  return product ? { ...product, image: imagery[slug] } : null;
}).filter(Boolean);

const brands = [
  { name: 'Apple', line: 'iPhone Pro', slug: 'apple', image: '/products/featured/iphone-16-pro-max-256gb-1.webp' },
  { name: 'Samsung', line: 'Galaxy Ultra', slug: 'samsung', image: '/products/galaxy-s26-ultra.webp' },
  { name: 'Google Pixel', line: 'Pixel Pro', slug: 'google-pixel', image: '/products/featured/google-pixel-9-256gb-1.webp' },
];

export default function PhonesPage() {
  return (
    <main className="premium-phone-landing">
      <SiteHeader />

      <section className="premium-phone-hero">
        <div className="premium-phone-hero-copy">
          <p className="eyebrow">AMAAL · SIGNATURE PHONES</p>
          <h1>Only the<br /><em>exceptional.</em></h1>
          <p>Discover a considered collection of flagship smartphones from Apple, Samsung and Google Pixel.</p>
          <div className="premium-phone-hero-actions">
            <Link className="button gold" href="#flagship">Explore flagships <ArrowRight size={15} /></Link>
            <Link className="button ghost-light" href="/phones/catalogue">View all phones</Link>
          </div>
          <div className="premium-phone-hero-meta"><span>Apple</span><i /> <span>Samsung</span><i /> <span>Google Pixel</span></div>
        </div>
        <div className="premium-phone-hero-media" aria-label="Amaal premium phone campaign media placeholder">
          <div className="premium-phone-hero-placeholder">
            <span>AMAAL</span>
            <strong>HERO IMAGE / VIDEO</strong>
            <small>Attach campaign photography or a short product film here.</small>
          </div>
          <div className="premium-phone-hero-caption">SIGNATURE COLLECTION · 2026</div>
        </div>
      </section>

      <section className="premium-phone-intro">
        <p className="eyebrow">THE SIGNATURE COLLECTION</p>
        <div><h2>Flagship phones,<br /><em>beautifully selected.</em></h2><p>For customers who want the very best, start here. Every model below is part of Amaal's premium phone selection.</p></div>
      </section>

      <section className="premium-phone-flagships" id="flagship">
        <div className="premium-phone-section-head"><div><p className="eyebrow">FLAGSHIP EDIT</p><h2>The phones worth looking at twice.</h2></div><Link href="/phones/catalogue">See the complete catalogue <ChevronRight size={15} /></Link></div>
        <div className="premium-phone-grid">
          {premium.map((product, index) => product && (
            <Link className={`premium-phone-card ${index === 0 ? 'featured' : ''}`} key={product.slug} href={`/phones/${product.slug}`}>
              <div className="premium-phone-card-media"><img src={product.image} alt={product.name} /><span>{product.brand}</span></div>
              <div className="premium-phone-card-copy"><p>{product.series}</p><h3>{product.name}</h3><span>{product.variants.length} configurations <ArrowRight size={14} /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="premium-phone-brands">
        <div className="premium-phone-section-head"><div><p className="eyebrow">CHOOSE YOUR BRAND</p><h2>Three names. One premium destination.</h2></div></div>
        <div className="premium-phone-brand-grid">
          {brands.map((brand) => <Link key={brand.slug} href={`/phones/brand/${brand.slug}`} className="premium-phone-brand-card"><div><p>{brand.name}</p><h3>{brand.line}</h3></div><img src={brand.image} alt="" /><ArrowRight size={17} /></Link>)}
        </div>
      </section>

      <section className="premium-phone-discover"><div><p className="eyebrow">MORE TO EXPLORE</p><h2>Looking for something beyond the flagship edit?</h2><p>Browse Amaal's complete phone collection, including TECNO, Infinix, itel and every available model.</p></div><Link className="button gold" href="/phones/catalogue">Open full phone catalogue <ArrowRight size={15} /></Link></section>

      <SiteFooter />
    </main>
  );
}
