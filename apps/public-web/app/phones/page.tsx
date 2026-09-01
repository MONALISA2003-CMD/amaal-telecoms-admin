'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import PhoneCatalogueCard from '../../components/PhoneCatalogueCard';
import { phoneCatalogue } from '../../lib/phone-catalogue';

const brands = ['All', 'Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'];
const families = ['All', 'iPhone', 'Galaxy', 'Pixel', 'TECNO', 'Infinix', 'itel'];
const networks = ['All', '4G', '5G', '4G / 5G'];
const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB', '2TB'];
const pageSizes = [24, 48, 96, 'all'] as const;

function normalize(value: string) { return value.toLowerCase().trim(); }

export default function PhonesPage() {
  const [brand, setBrand] = useState('All');
  const [family, setFamily] = useState('All');
  const [network, setNetwork] = useState('All');
  const [storage, setStorage] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'catalogue' | 'az'>('catalogue');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(24);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = normalize(query);
    const items = phoneCatalogue.filter((p) => {
      const text = normalize(`${p.name} ${p.brand} ${p.series} ${p.family} ${p.network} ${p.variants.map((v) => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''} ${v.network ?? ''}`).join(' ')}`);
      const storageMatch = storage.length === 0 || p.variants.some((v) => storage.includes(v.storage ?? ''));
      const networkMatch = network === 'All' || p.variants.some((v) => (v.network ?? p.network ?? '').includes(network));
      return (brand === 'All' || p.brand === brand) && (family === 'All' || p.family === family) && networkMatch && storageMatch && (!q || text.includes(q));
    });
    return sort === 'az' ? [...items].sort((a, b) => a.name.localeCompare(b.name)) : items;
  }, [brand, family, network, storage, query, sort]);

  const totalPages = pageSize === 'all' ? 1 : Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = pageSize === 'all' ? filtered : filtered.slice((page - 1) * pageSize, page * pageSize);

  const clearAll = () => {
    setBrand('All'); setFamily('All'); setNetwork('All'); setStorage([]); setQuery(''); setSort('catalogue'); setPage(1);
  };
  const toggleStorage = (value: string) => { setStorage((current) => current.includes(value) ? current.filter((x) => x !== value) : [...current, value]); setPage(1); };
  const updateBrand = (value: string) => { setBrand(value); setPage(1); };
  const updateFamily = (value: string) => { setFamily(value); setPage(1); };
  const updateNetwork = (value: string) => { setNetwork(value); setPage(1); };
  const updateQuery = (value: string) => { setQuery(value); setPage(1); };
  const activeCount = (brand !== 'All' ? 1 : 0) + (family !== 'All' ? 1 : 0) + (network !== 'All' ? 1 : 0) + storage.length + (query ? 1 : 0);

  const scrollToResults = () => document.getElementById('phone-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return <main><SiteHeader />
    <section className="phone-catalogue-hero-modern">
      <div className="phone-catalogue-hero-modern-inner">
        <div>
          <p className="eyebrow">THE AMAAL PHONE COLLECTION</p>
          <h1>Find your next<br /><em>phone.</em></h1>
          <p>Search Amaal&apos;s multi-brand phone catalogue, narrow it by brand or configuration, then open any model for its complete product experience.</p>
          <button type="button" className="button gold phone-hero-browse" onClick={scrollToResults}>Browse the catalogue <ChevronDown size={15} /></button>
        </div>
        <div className="phone-catalogue-hero-metrics"><div><strong>{phoneCatalogue.length}</strong><span>models</span></div><div><strong>{phoneCatalogue.reduce((n, p) => n + p.variants.length, 0)}</strong><span>configurations</span></div><div><strong>{brands.length - 1}</strong><span>brands</span></div></div>
      </div>
    </section>

    <section className="phone-catalogue-page section" id="phone-results">
      <div className="phone-search-first">
        <div className="phone-search-first-copy"><p className="eyebrow">SEARCH AMAAL PHONES</p><h2>What are you looking for?</h2><p>Search by model, series, brand, storage, RAM or network.</p></div>
        <div className="phone-catalogue-search phone-search-primary"><Search size={19} /><input value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="Search phones, e.g. iPhone 15, Galaxy S, Pixel 9, 256GB…" aria-label="Search the Amaal phone catalogue" />{query && <button type="button" aria-label="Clear search" onClick={() => updateQuery('')}><X size={17} /></button>}</div>
      </div>

      <div className="phone-brand-nav phone-brand-nav-modern" aria-label="Browse phone brands">
        <button type="button" className={brand === 'All' ? 'active' : ''} onClick={() => updateBrand('All')}>All phones <span>{phoneCatalogue.length}</span></button>
        {brands.slice(1).map((b) => <button key={b} type="button" className={brand === b ? 'active' : ''} onClick={() => updateBrand(b)}>{b} <span>{phoneCatalogue.filter((p) => p.brand === b).length}</span></button>)}
      </div>

      <div className="phone-catalogue-topbar">
        <div><p className="eyebrow">PHONE CATALOGUE</p><h2>{filtered.length} {filtered.length === 1 ? 'model' : 'models'} found</h2></div>
        <div className="phone-topbar-actions"><button type="button" className="mobile-filter-trigger" onClick={() => setMobileFilters(true)}><Filter size={16} /> Filters{activeCount ? ` (${activeCount})` : ''}</button><label className="phone-sort-control"><span>Sort</span><select value={sort} onChange={(e) => { setSort(e.target.value as 'catalogue' | 'az'); setPage(1); }}><option value="catalogue">Recommended</option><option value="az">Name A–Z</option></select></label><label className="phone-page-size"><span>Show</span><select value={String(pageSize)} onChange={(e) => { const v = e.target.value; setPageSize(v === 'all' ? 'all' : Number(v)); setPage(1); }}><option value="24">24</option><option value="48">48</option><option value="96">96</option><option value="all">All</option></select></label></div>
      </div>

      {activeCount > 0 && <div className="phone-applied-filters"><span>Applied</span>{brand !== 'All' && <button onClick={() => updateBrand('All')}>{brand} <X size={12} /></button>}{family !== 'All' && <button onClick={() => updateFamily('All')}>{family} <X size={12} /></button>}{network !== 'All' && <button onClick={() => updateNetwork('All')}>{network} <X size={12} /></button>}{storage.map((s) => <button key={s} onClick={() => toggleStorage(s)}>{s} <X size={12} /></button>)}{query && <button onClick={() => updateQuery('')}>“{query}” <X size={12} /></button>}<button className="clear-inline" onClick={clearAll}>Clear all</button></div>}

      <div className="phone-catalogue-layout">
        <aside className={`phone-filter-panel ${mobileFilters ? 'open' : ''}`} aria-label="Phone catalogue filters">
          <div className="phone-filter-panel-head"><strong>Filter phones</strong><button type="button" aria-label="Close filters" onClick={() => setMobileFilters(false)}><X size={18} /></button></div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Brand</span><small>{brand === 'All' ? 'All' : brand}</small></div>{brands.map((b) => <button key={b} className={brand === b ? 'active' : ''} onClick={() => updateBrand(b)}>{b}<span>{b === 'All' ? phoneCatalogue.length : phoneCatalogue.filter((p) => p.brand === b).length}</span></button>)}</div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Family</span><small>{family === 'All' ? 'All' : family}</small></div>{families.map((f) => <button key={f} className={family === f ? 'active' : ''} onClick={() => updateFamily(f)}>{f}</button>)}</div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Network</span><small>{network === 'All' ? 'All' : network}</small></div>{networks.map((n) => <button key={n} className={network === n ? 'active' : ''} onClick={() => updateNetwork(n)}>{n}</button>)}</div>
          <div className="phone-filter-group-modern"><div className="phone-filter-heading"><span>Storage</span><small>{storage.length ? `${storage.length} selected` : 'Any'}</small></div>{storageOptions.map((s) => <button key={s} className={storage.includes(s) ? 'active' : ''} onClick={() => toggleStorage(s)}>{s}</button>)}</div>
          <button className="phone-clear-filters" type="button" onClick={clearAll}>Reset filters</button>
          <button className="phone-mobile-apply" type="button" onClick={() => setMobileFilters(false)}>Show {filtered.length} models</button>
        </aside>
        {mobileFilters && <button className="phone-filter-backdrop" aria-label="Close filters" onClick={() => setMobileFilters(false)} />}

        <div className="phone-results">
          <div className="phone-results-heading"><div><p className="eyebrow">ALL MODELS</p><h3>Explore the Amaal phone collection</h3></div><span>{filtered.length ? `Showing ${pageSize === 'all' ? 1 : ((page - 1) * pageSize) + 1}–${pageSize === 'all' ? filtered.length : Math.min(page * pageSize, filtered.length)} of ${filtered.length}` : 'No models'}</span></div>
          {visible.length ? <div className="phone-modern-grid phone-modern-grid-catalogue">{visible.map((p) => <PhoneCatalogueCard key={p.slug} product={p} />)}</div> : <div className="phone-empty-modern"><div><p className="eyebrow">NO MATCHES</p><h2>Try a broader search.</h2><p>Remove a filter or search another model, series, storage option or brand.</p><button type="button" className="button gold" onClick={clearAll}>Browse all phones</button></div></div>}

          {visible.length > 0 && pageSize !== 'all' && <nav className="phone-pagination" aria-label="Phone catalogue pagination">
            <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => { setPage((p) => Math.max(1, p - 1)); scrollToResults(); }}><ChevronLeft size={16} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => totalPages <= 7 || n === 1 || n === totalPages || Math.abs(n - page) <= 1).map((n, i, arr) => <span key={n}>{i > 0 && arr[i - 1] !== n - 1 ? <b>…</b> : null}<button type="button" className={n === page ? 'active' : ''} aria-current={n === page ? 'page' : undefined} onClick={() => { setPage(n); scrollToResults(); }}>{n}</button></span>)}
            <button type="button" aria-label="Next page" disabled={page === totalPages} onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); scrollToResults(); }}><ChevronRight size={16} /></button>
          </nav>}
        </div>
      </div>

      <div className="phone-catalogue-footnote"><div><SlidersHorizontal size={18} /><strong>Built for product discovery</strong></div><p>Browse every phone model in the public catalogue. Select a model to see its configurations and full product information. Inventory and internal business data stay private.</p><Link href="/contact">Need help choosing? Talk to Amaal →</Link></div>
    </section>
    <SiteFooter />
  </main>;
}
