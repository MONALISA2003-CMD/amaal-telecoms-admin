'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { BrandDirectory, BrandSubcatalog, PHONE_BRANDS, brandSlug } from '../../components/PhoneBrandSubcatalog';
import { phoneCatalogue } from '../../lib/phone-catalogue';

const counts = Object.fromEntries(PHONE_BRANDS.map((brand) => [brand, phoneCatalogue.filter((p) => p.brand === brand).length]));

export default function PhonesPage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const searchResults = useMemo(() => q ? phoneCatalogue.filter((p) => `${p.name} ${p.brand} ${p.family} ${p.series} ${p.network} ${p.variants.map((v) => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''}`).join(' ')}`.toLowerCase().includes(q)) : [], [q]);
  const grouped = PHONE_BRANDS.map((brand) => ({ brand, products: searchResults.filter((p) => p.brand === brand) })).filter((g) => g.products.length);

  return <main><SiteHeader />
    <section className="phone-luxury-landing">
      <div className="phone-luxury-hero">
        <div className="phone-luxury-copy">
          <p className="eyebrow">AMAAL · THE FLAGSHIP EDIT</p>
          <h1>The finest<br/><em>phones.</em></h1>
          <p>Discover a carefully presented selection of premium smartphones from Apple, Samsung and Google, then continue into Amaal&apos;s complete phone collection.</p>
          <div className="phone-luxury-actions"><a href="#all-phones">Explore the collection <ArrowRight size={14}/></a></div>
        </div>
        <div className="phone-luxury-media" aria-label="Amaal flagship collection visual">
          <div className="phone-luxury-media-mark"><div><span>AMAAL</span><strong>Designed for<br/>what&apos;s next.</strong><small></small></div></div>
        </div>
      </div>
      <div className="phone-luxury-flagships" aria-label="Featured premium smartphones">
        {[
          {brand:'Apple',name:'iPhone 16 Pro Max',series:'Pro collection',image:'/products/featured/iphone-16-pro-max-256gb-1.webp',slug:'apple-iphone-16-pro-max'},
          {brand:'Samsung',name:'Galaxy S26 Ultra',series:'S series',image:'/products/galaxy-s26-ultra.webp',slug:'samsung-galaxy-s26-ultra'},
          {brand:'Google',name:'Pixel 9',series:'Pixel collection',image:'/products/featured/google-pixel-9-256gb-1.webp',slug:'google-pixel-pixel-9'}
        ].map((phone) => <Link className="phone-luxury-flagship" href={`/phones/${phone.slug}`} key={phone.slug}>
          <div className="phone-luxury-flagship-media"><Image src={phone.image} alt={phone.name} fill sizes="(max-width: 900px) 190px, 30vw" className="phone-modern-product-image" /></div>
          <div className="phone-luxury-flagship-copy"><small>{phone.brand}</small><strong>{phone.name}</strong><span>{phone.series} · Explore</span></div>
        </Link>)}
      </div>
    </section>

    <section className="phone-home-v2-hero" id="all-phones">
      <div className="phone-home-v2-hero-copy">
        <p className="eyebrow">AMAAL · PHONES</p>
        <h1>Find the phone<br/><em>that feels right.</em></h1>
        <p>Explore Amaal&apos;s phone collection by brand, series and model. One clear catalogue, with every configuration kept together where it belongs.</p>
      </div>
      <div className="phone-home-v2-search-wrap">
        <label htmlFor="phone-home-search">Search the phone catalogue</label>
        <div className="phone-home-v2-search"><Search size={20}/><input id="phone-home-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search iPhone, Galaxy, Pixel, CAMON…"/><kbd>⌘ K</kbd></div>
        <div className="phone-home-v2-search-hint"><Sparkles size={14}/> Search model, series, storage, RAM or network</div>
      </div>
    </section>

    <section className="section phone-home-v2-directory">
      <div className="section-head-v2"><div><p className="eyebrow">BROWSE BY BRAND</p><h2>Every brand has its own catalogue.</h2></div><p>{phoneCatalogue.length} models across {PHONE_BRANDS.length} dedicated collections.</p></div>
      <BrandDirectory counts={counts}/>
    </section>

    {q ? <section className="section phone-home-v2-search-results">
      <div className="section-head-v2"><div><p className="eyebrow">SEARCH RESULTS</p><h2>{searchResults.length} {searchResults.length === 1 ? 'model' : 'models'} for “{query}”</h2></div><button className="phone-clear-search-v2" onClick={() => setQuery('')}>Clear search</button></div>
      {grouped.length ? grouped.map(({ brand, products }) => <BrandSubcatalog key={brand} brand={brand} products={products} />) : <div className="phone-empty-v2"><p className="eyebrow">NO MATCHES</p><h2>We couldn&apos;t find that phone.</h2><p>Try a model name, brand, series or storage size.</p></div>}
    </section> : <>
      <section className="section phone-home-v2-featured"><div className="section-head-v2"><div><p className="eyebrow">PHONE COLLECTION</p><h2>Start with a brand.</h2></div><p>Each collection is presented separately, then opens into its complete catalogue.</p></div>
        {PHONE_BRANDS.map((brand) => <BrandSubcatalog key={brand} brand={brand} products={phoneCatalogue.filter((p) => p.brand === brand)} preview />)}
      </section>
      <section className="section phone-home-v2-browse-all"><div><p className="eyebrow">THE COMPLETE COLLECTION</p><h2>Looking for something specific?</h2><p>Open a dedicated brand catalogue to browse every model, search within the collection and move through its series.</p></div><div className="phone-brand-link-grid-v2">{PHONE_BRANDS.map((brand) => <Link key={brand} href={`/phones/brand/${brandSlug(brand)}`}><span>{brand}</span><small>{counts[brand]} models</small><ArrowRight size={15}/></Link>)}</div></section>
    </>}
    <SiteFooter />
  </main>;
}
