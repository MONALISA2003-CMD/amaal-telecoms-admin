'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { BrandSubcatalog, PHONE_BRANDS, brandSlug } from '../../components/PhoneBrandSubcatalog';
import { phoneCatalogue } from '../../lib/phone-catalogue';

function normalize(value: string) { return value.toLowerCase().trim(); }

export default function PhonesPage() {
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const q = normalize(query);

  const grouped = useMemo(() => {
    const filtered = phoneCatalogue.filter((p) => {
      const text = normalize(`${p.name} ${p.brand} ${p.series} ${p.family} ${p.network} ${p.variants.map((v) => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''} ${v.network ?? ''}`).join(' ')}`);
      return (!q || text.includes(q)) && (selectedBrand === 'All' || p.brand === selectedBrand);
    });
    return PHONE_BRANDS.map((brand) => ({ brand, products: filtered.filter((p) => p.brand === brand) })).filter((group) => group.products.length);
  }, [q, selectedBrand]);

  const jump = (brand: string) => {
    setSelectedBrand(brand);
    requestAnimationFrame(() => document.getElementById(`brand-${brandSlug(brand)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return <main><SiteHeader />
    <section className="phone-catalogue-hero-modern">
      <div className="phone-catalogue-hero-modern-inner">
        <div>
          <p className="eyebrow">THE AMAAL PHONE COLLECTION</p>
          <h1>Every brand.<br /><em>Its own catalogue.</em></h1>
          <p>Explore Amaal&apos;s phone collection by brand. Each brand has its own dedicated sub-catalogue, organized by series and model, with configurations kept together on the model page.</p>
        </div>
        <div className="phone-catalogue-hero-metrics"><div><strong>{phoneCatalogue.length}</strong><span>models</span></div><div><strong>{phoneCatalogue.reduce((n, p) => n + p.variants.length, 0)}</strong><span>configurations</span></div><div><strong>{PHONE_BRANDS.length}</strong><span>brand catalogues</span></div></div>
      </div>
    </section>

    <section className="phone-catalogue-page section" id="phone-results">
      <div className="phone-search-first phone-search-brand-first">
        <div className="phone-search-first-copy"><p className="eyebrow">SEARCH AMAAL PHONES</p><h2>Start with a brand, or search everything.</h2><p>Search by model, series, storage, RAM or network. Results remain separated by brand so the catalogue never becomes one mixed product wall.</p></div>
        <div className="phone-catalogue-search phone-search-primary"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search phones, e.g. iPhone 15, Galaxy S, Pixel 9, 256GB…" aria-label="Search the Amaal phone catalogue" />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X size={17} /></button>}</div>
      </div>

      <nav className="phone-brand-directory" aria-label="Phone brand catalogues">
        <button type="button" className={selectedBrand === 'All' ? 'active' : ''} onClick={() => setSelectedBrand('All')}>All brands <span>{phoneCatalogue.length}</span></button>
        {PHONE_BRANDS.map((brand) => <button key={brand} type="button" className={selectedBrand === brand ? 'active' : ''} onClick={() => jump(brand)}>{brand}<span>{phoneCatalogue.filter((p) => p.brand === brand).length}</span></button>)}
      </nav>

      <div className="phone-catalogue-summary phone-brand-summary"><div><p className="eyebrow">PHONE CATALOGUE</p><h2>{q || selectedBrand !== 'All' ? `${phoneCatalogue.filter((p) => (!q || normalize(`${p.name} ${p.brand} ${p.series} ${p.family} ${p.network} ${p.variants.map(v => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''} ${v.network ?? ''}`).join(' ')}`).includes(q)) && (selectedBrand === 'All' || p.brand === selectedBrand)).length} models` : 'All Amaal phone models'}</h2></div><span>{selectedBrand === 'All' ? 'Separated into brand sub-catalogues' : `${selectedBrand} sub-catalogue`}</span></div>

      {grouped.length ? grouped.map(({ brand, products }) => <BrandSubcatalog key={brand} brand={brand} products={products} />) : <div className="phone-empty-modern"><p className="eyebrow">NO MATCHES</p><h2>Try another model or brand.</h2><p>Search again or return to every Amaal phone catalogue.</p><button type="button" className="button gold" onClick={() => { setQuery(''); setSelectedBrand('All'); }}>Browse all phone catalogues</button></div>}

      <div className="phone-catalogue-footnote"><div><Search size={18} /><strong>One catalogue. Six dedicated brand collections.</strong></div><p>Every model remains available to browse. Each brand is kept separate, each series is grouped, and storage/RAM/network configurations stay together on the model page.</p></div>
    </section>
    <SiteFooter />
  </main>;
}
