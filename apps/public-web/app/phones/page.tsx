'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import PhoneCatalogueCard from '../../components/PhoneCatalogueCard';
import { phoneCatalogue } from '../../lib/phone-catalogue';

const brands = ['All', 'Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'];
const families = ['All', 'iPhone', 'Galaxy', 'Pixel', 'TECNO', 'Infinix', 'itel'];
const networks = ['All', '4G', '5G', '4G / 5G'];
const brandOrder = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'];
const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];

function normalize(value: string) { return value.toLowerCase().trim(); }

export default function PhonesPage() {
  const [brand, setBrand] = useState('All');
  const [family, setFamily] = useState('All');
  const [network, setNetwork] = useState('All');
  const [storage, setStorage] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'catalogue' | 'az'>('catalogue');
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = normalize(query);
    const items = phoneCatalogue.filter((p) => {
      const text = normalize(`${p.name} ${p.brand} ${p.series} ${p.family} ${p.variants.map((v) => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''} ${v.network ?? ''}`).join(' ')}`);
      const storageMatch = storage.length === 0 || p.variants.some((v) => storage.includes(v.storage ?? ''));
      const networkMatch = network === 'All' || p.variants.some((v) => (v.network ?? p.network ?? '').includes(network));
      return (brand === 'All' || p.brand === brand) && (family === 'All' || p.family === family) && networkMatch && storageMatch && (!q || text.includes(q));
    });
    if (sort === 'az') return [...items].sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }, [brand, family, network, storage, query, sort]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const p of filtered) {
      if (!map.has(p.brand)) map.set(p.brand, []);
      map.get(p.brand)!.push(p);
    }
    return brandOrder.filter((b) => map.has(b)).map((b) => ({ brand: b, products: map.get(b)! }));
  }, [filtered]);

  const clearAll = () => { setBrand('All'); setFamily('All'); setNetwork('All'); setStorage([]); setQuery(''); setSort('catalogue'); };
  const toggleStorage = (value: string) => setStorage((current) => current.includes(value) ? current.filter((x) => x !== value) : [...current, value]);
  const activeCount = (brand !== 'All' ? 1 : 0) + (family !== 'All' ? 1 : 0) + (network !== 'All' ? 1 : 0) + storage.length + (query ? 1 : 0);

  return <main><SiteHeader />
    <section className="phone-catalogue-hero-modern">
      <div className="phone-catalogue-hero-modern-inner">
        <div>
          <p className="eyebrow">THE AMAAL PHONE COLLECTION</p>
          <h1>Every phone.<br /><em>One clear catalogue.</em></h1>
          <p>Explore Amaal&apos;s multi-brand phone collection by brand, family, series and configuration. Compare models quickly, then open one model for the full detail experience.</p>
        </div>
        <div className="phone-catalogue-hero-metrics"><div><strong>{phoneCatalogue.length}</strong><span>models</span></div><div><strong>{phoneCatalogue.reduce((n, p) => n + p.variants.length, 0)}</strong><span>configurations</span></div><div><strong>6</strong><span>brands</span></div></div>
      </div>
    </section>

    <section className="phone-catalogue-page section">
      <div className="phone-brand-nav" aria-label="Browse by brand">
        <span className="phone-brand-nav-label">Browse by brand</span>
        {brands.slice(1).map((b) => <a key={b} href={`#${b.toLowerCase().replace(/\s+/g, '-')}`}>{b}</a>)}
      </div>

      <div className="phone-catalogue-topbar">
        <div><p className="eyebrow">PHONE CATALOGUE</p><h2>{filtered.length} {filtered.length === 1 ? 'model' : 'models'} to explore</h2></div>
        <div className="phone-topbar-actions"><button type="button" className="mobile-filter-trigger" onClick={() => setMobileFilters(true)}><Filter size={16} /> Filters{activeCount ? ` (${activeCount})` : ''}</button><label className="phone-sort-control"><span>Sort</span><select value={sort} onChange={(e) => setSort(e.target.value as 'catalogue' | 'az')}><option value="catalogue">Amaal catalogue</option><option value="az">Name A–Z</option></select></label></div>
      </div>

      {activeCount > 0 && <div className="phone-applied-filters"><span>Applied</span>{brand !== 'All' && <button onClick={() => setBrand('All')}>{brand} <X size={12} /></button>}{family !== 'All' && <button onClick={() => setFamily('All')}>{family} <X size={12} /></button>}{network !== 'All' && <button onClick={() => setNetwork('All')}>{network} <X size={12} /></button>}{storage.map((s) => <button key={s} onClick={() => toggleStorage(s)}>{s} <X size={12} /></button>)}{query && <button onClick={() => setQuery('')}>“{query}” <X size={12} /></button>}<button className="clear-inline" onClick={clearAll}>Clear all</button></div>}

      <div className="phone-catalogue-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a model, series, storage or brand…" aria-label="Search the phone catalogue" /></div>

      <div className="phone-catalogue-layout">
        <aside className={`phone-filter-panel ${mobileFilters ? 'open' : ''}`} aria-label="Phone catalogue filters">
          <div className="phone-filter-panel-head"><strong>Filter phones</strong><button type="button" aria-label="Close filters" onClick={() => setMobileFilters(false)}><X size={18} /></button></div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Brand</span><small>{brand === 'All' ? 'All' : brand}</small></div>{brands.map((b) => <button key={b} className={brand === b ? 'active' : ''} onClick={() => setBrand(b)}>{b}<span>{b === 'All' ? phoneCatalogue.length : phoneCatalogue.filter((p) => p.brand === b).length}</span></button>)}</div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Family</span><small>{family === 'All' ? 'All' : family}</small></div>{families.map((f) => <button key={f} className={family === f ? 'active' : ''} onClick={() => setFamily(f)}>{f}</button>)}</div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Network</span><small>{network === 'All' ? 'All' : network}</small></div>{networks.map((n) => <button key={n} className={network === n ? 'active' : ''} onClick={() => setNetwork(n)}>{n}</button>)}</div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Storage</span><small>{storage.length ? `${storage.length} selected` : 'Any'}</small></div>{storageOptions.map((s) => <button key={s} className={storage.includes(s) ? 'active' : ''} onClick={() => toggleStorage(s)}>{s}</button>)}</div>
          <button className="phone-clear-filters" type="button" onClick={clearAll}>Reset filters</button>
          <button className="phone-mobile-apply" type="button" onClick={() => setMobileFilters(false)}>Show {filtered.length} models</button>
        </aside>
        {mobileFilters && <button className="phone-filter-backdrop" aria-label="Close filters" onClick={() => setMobileFilters(false)} />}

        <div className="phone-results">
          {groups.map((group) => <section className="phone-result-brand" id={group.brand.toLowerCase().replace(/\s+/g, '-')} key={group.brand}>
            <div className="phone-result-brand-heading"><div><p className="eyebrow">{group.brand}</p><h3>{group.brand === 'Apple' ? 'iPhone' : group.brand === 'Samsung' ? 'Galaxy' : group.brand}</h3></div><span>{group.products.length} models</span></div>
            <div className="phone-modern-grid">{group.products.map((p) => <PhoneCatalogueCard key={p.slug} product={p} />)}</div>
          </section>)}
          {!filtered.length && <div className="phone-empty-modern"><div><p className="eyebrow">NO MATCHES</p><h2>Try a broader search.</h2><p>We have {phoneCatalogue.length} phone models in the catalogue. Remove a filter or search another model, series or storage option.</p><button type="button" className="button gold" onClick={clearAll}>Browse all phones</button></div></div>}
        </div>
      </div>

      <div className="phone-catalogue-footnote"><div><SlidersHorizontal size={18} /><strong>Built for product discovery</strong></div><p>This is a public catalogue, not an inventory screen. Stock, supplier, warehouse, IMEI and internal pricing information stay inside Amaal&apos;s business systems.</p><Link href="/contact">Need help choosing? Talk to Amaal →</Link></div>
    </section>
    <SiteFooter />
  </main>;
}
