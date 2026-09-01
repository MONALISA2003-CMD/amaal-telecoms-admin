import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { phoneCatalogue } from '../../lib/phone-catalogue';
import { brandSlug } from '../../lib/phone-brand-utils';

const featured = [
  { brand: 'Apple', name: 'iPhone 17 Pro Max', eyebrow: 'Pro collection', image: '/products/iphone17-pro-max.webp', slug: 'apple-iphone-17-pro-max' },
  { brand: 'Samsung', name: 'Galaxy S26 Ultra', eyebrow: 'Ultra collection', image: '/products/galaxy-s26-ultra.webp', slug: 'samsung-galaxy-s26-ultra' },
  { brand: 'Google', name: 'Pixel 11 Pro XL', eyebrow: 'Pro collection', image: '', slug: 'google-pixel-pixel-11-pro-xl' },
];

const byBrand = ['Apple', 'Samsung', 'Google Pixel'].map((brand) => ({
  brand,
  count: phoneCatalogue.filter((p) => p.brand === brand).length,
}));

function findPhone(slug: string) { return phoneCatalogue.find((p) => p.slug === slug); }

export default function PhonesPage() {
  return <main><SiteHeader />
    <section className="phones-premium-hero">
      <div className="phones-premium-hero-copy">
        <p className="eyebrow">AMAAL · PHONES</p>
        <h1>Exceptional<br/><em>phones.</em></h1>
        <p>Discover a refined selection of flagship smartphones from Apple, Samsung and Google — chosen for people who expect more.</p>
        <div className="phones-premium-hero-actions">
          <Link className="button gold" href="/phones/catalogue">Explore all phones <ArrowRight size={15}/></Link>
          <a className="phones-premium-play" href="#featured"><span><Play size={12} fill="currentColor"/></span> Featured collection</a>
        </div>
      </div>
      <div className="phones-premium-hero-media" aria-label="Amaal premium phones hero media placeholder">
        <div className="phones-premium-media-placeholder">
          <span>AMAAL</span>
          <strong>Hero image<br/>or video</strong>
          <small>Image or film</small>
        </div>
      </div>
    </section>

    <section className="phones-premium-brand-strip">
      <p className="eyebrow">THE BRANDS</p>
      {byBrand.map(({brand,count}) => <Link key={brand} href={`/phones/brand/${brandSlug(brand)}`}><span>{brand === 'Google Pixel' ? 'Google Pixel' : brand}</span><small>{count} models</small><ArrowRight size={14}/></Link>)}
    </section>

    <section className="section phones-premium-featured" id="featured">
      <div className="section-head-v2 phones-premium-section-head"><div><p className="eyebrow">THE FLAGSHIP EDIT</p><h2>Made to stand apart.</h2></div><p>Explore a few of the phones at the top of their ranges. There is much more in the full collection.</p></div>
      <div className="phones-premium-grid">
        {featured.map((item) => {
          const product = findPhone(item.slug);
          return <Link className="phones-premium-card" href={`/phones/${item.slug}`} key={item.slug}>
            <div className="phones-premium-card-media">
              {item.image ? <Image src={item.image} alt={item.name} fill sizes="(max-width: 700px) 90vw, 31vw" className="phone-modern-product-image" /> : <div className="phones-premium-image-placeholder"><span>GOOGLE</span><strong>Pixel</strong><small>Photography coming soon</small></div>}
              <span className="phones-premium-card-index">0{featured.indexOf(item)+1}</span>
            </div>
            <div className="phones-premium-card-copy"><p>{item.brand} · {item.eyebrow}</p><h3>{item.name}</h3><span>{product?.variants.length ?? 0} storage options <ArrowRight size={14}/></span></div>
          </Link>;
        })}
      </div>
    </section>

    <section className="phones-premium-bridge">
      <div><p className="eyebrow">LOOKING FOR SOMETHING ELSE?</p><h2>The full Amaal phone collection is waiting.</h2><p>From everyday favourites to premium flagships, browse every available brand and model in one place.</p></div>
      <Link className="button" href="/phones/catalogue">Browse the full collection <ArrowRight size={15}/></Link>
    </section>

    <SiteFooter />
  </main>;
}
