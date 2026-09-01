'use client';

import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getNetworkOptions, getRamOptions, getStorageOptions, sortPhones, type PhoneSort, filterPhones, searchPhones } from '../lib/phone-catalogue-utils';
import type { PhoneProduct } from '../lib/phone-catalogue';
import PhoneCatalogueCard from './PhoneCatalogueCard';

export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'] as const;

export function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const brandCopy: Record<string, string> = {
  Apple: 'iPhone models, grouped by generation and available choices.',
  Samsung: 'Galaxy phones across A, S and Z families.',
  'Google Pixel': 'Pixel phones, organized by generation and model.',
  TECNO: 'CAMON, SPARK, POVA, PHANTOM and POP collections.',
  Infinix: 'NOTE, HOT, SMART and performance-led phone families.',
  itel: 'Everyday smartphones organized by their model families.',
};

export function BrandDirectory({ counts, active = 'All' }: { counts: Record<string, number>; active?: string }) {
  return (
    <nav className="phone-brand-directory-v2" aria-label="Browse phone brands">
      <Link className={active === 'All' ? 'active' : ''} href="/phones"><span>All phones</span><small>Complete collection</small></Link>
      {PHONE_BRANDS.map((brand) => (
        <Link key={brand} className={active === brand ? 'active' : ''} href={`/phones/brand/${brandSlug(brand)}`}>
          <span>{brand}</span><small>{counts[brand] ?? 0} models</small>
        </Link>
      ))}
    </nav>
  );
}

export function BrandSubcatalog({ brand, products, preview = false }: { brand: string; products: PhoneProduct[]; preview?: boolean }) {
  const series = Array.from(new Set(products.map((p) => p.series)));
  const visibleProducts = preview ? products.slice(0, 6) : products;
  return (
    <section id={`brand-${brandSlug(brand)}`} className="phone-brand-showcase-v2">
      <div className="phone-brand-showcase-head-v2">
        <div className="phone-brand-showcase-title">
          <div className="phone-brand-mark-v2" aria-hidden="true">{brand === 'Google Pixel' ? 'G' : brand.slice(0, 1)}</div>
          <div><p className="eyebrow">{brand.toUpperCase()} · PHONE CATALOGUE</p><h2>{brand}</h2><p>{brandCopy[brand]}</p></div>
        </div>
        <Link className="phone-brand-link-v2" href={`/phones/brand/${brandSlug(brand)}`}>View all {products.length} models <ChevronRight size={15} /></Link>
      </div>
      {series.slice(0, preview ? 1 : series.length).map((currentSeries) => {
        const seriesProducts = visibleProducts.filter((p) => p.series === currentSeries);
        if (!seriesProducts.length) return null;
        return <div className="phone-series-block-v2" key={currentSeries}>
          <div className="phone-series-label-v2"><span>{currentSeries}</span><small>{products.filter((p) => p.series === currentSeries).length} models</small></div>
          <div className="phone-horizontal-grid-v2">{seriesProducts.map((product) => <PhoneCatalogueCard key={product.slug} product={product} />)}</div>
        </div>;
      })}
      {preview && products.length > visibleProducts.length && <Link className="phone-brand-more-v2" href={`/phones/brand/${brandSlug(brand)}`}>Browse the complete {brand} catalogue <ChevronRight size={15} /></Link>}
    </section>
  );
}

export function BrandCatalogueBrowser({ brand, products }: { brand: string; products: PhoneProduct[] }) {
  const [query, setQuery] = useState('');
  const [seriesFilter, setSeriesFilter] = useState('All');
  const [storageFilter, setStorageFilter] = useState('All');
  const [ramFilter, setRamFilter] = useState('All');
  const [networkFilter, setNetworkFilter] = useState('All');
  const [sort, setSort] = useState<PhoneSort>('featured');
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const series = useMemo(() => Array.from(new Set(products.map((p) => p.series))).sort(), [products]);
  const storage = useMemo(() => getStorageOptions(products), [products]);
  const ram = useMemo(() => getRamOptions(products), [products]);
  const networks = useMemo(() => getNetworkOptions(products), [products]);
  const filtered = useMemo(() => {
    const searched = searchPhones(products, query);
    return sortPhones(filterPhones(searched, {
      series: seriesFilter === 'All' ? undefined : seriesFilter,
      storage: storageFilter === 'All' ? undefined : storageFilter,
      ram: ramFilter === 'All' ? undefined : ramFilter,
      network: networkFilter === 'All' ? undefined : networkFilter,
    }), sort);
  }, [products, query, seriesFilter, storageFilter, ramFilter, networkFilter, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
  const resetPage = () => setPage(1);
  const clear = () => { setQuery(''); setSeriesFilter('All'); setStorageFilter('All'); setRamFilter('All'); setNetworkFilter('All'); setSort('featured'); resetPage(); };
  const activeFilters = [seriesFilter, storageFilter, ramFilter, networkFilter].filter((v) => v !== 'All').length;

  return <div className="phone-brand-browser-v2">
    <aside className="phone-brand-filter-v2">
      <div className="phone-filter-heading"><p className="eyebrow">REFINE {brand.toUpperCase()}</p><h2>Find your phone</h2>{activeFilters > 0 && <button type="button" onClick={clear}>Clear {activeFilters}</button>}</div>
      <div className="phone-filter-section-v2"><span>Series</span><button className={seriesFilter === 'All' ? 'active' : ''} onClick={() => { setSeriesFilter('All'); resetPage(); }}>All series <b>{products.length}</b></button>{series.map((s) => <button key={s} className={seriesFilter === s ? 'active' : ''} onClick={() => { setSeriesFilter(s); resetPage(); }}>{s}<b>{products.filter((p) => p.series === s).length}</b></button>)}</div>
      <div className="phone-filter-selects-v2"><label>Storage<select value={storageFilter} onChange={(e) => { setStorageFilter(e.target.value); resetPage(); }}><option>All</option>{storage.map((v) => <option key={v}>{v}</option>)}</select></label><label>Memory<select value={ramFilter} onChange={(e) => { setRamFilter(e.target.value); resetPage(); }}><option>All</option>{ram.map((v) => <option key={v}>{v}</option>)}</select></label><label>Connectivity<select value={networkFilter} onChange={(e) => { setNetworkFilter(e.target.value); resetPage(); }}><option>All</option>{networks.map((v) => <option key={v}>{v}</option>)}</select></label></div>
      <Link className="phone-side-back-v2" href="/phones">← All phone brands</Link>
    </aside>
    <div className="phone-brand-browser-results-v2">
      <div className="phone-brand-browser-toolbar-v2"><div className="phone-brand-inline-search-v2"><Search size={17}/><input value={query} onChange={(e) => { setQuery(e.target.value); resetPage(); }} placeholder={`Search ${brand} phones`} aria-label={`Search ${brand} phones`} /></div><label className="phone-sort-control-v2"><span>Sort</span><select value={sort} onChange={(e) => { setSort(e.target.value as PhoneSort); resetPage(); }}><option value="featured">Featured</option><option value="name-asc">Name A–Z</option><option value="name-desc">Name Z–A</option><option value="options">Most choices</option></select></label><div className="phone-brand-result-count-v2"><strong>{filtered.length}</strong><span>phones</span></div></div>
      {current.length ? <div className="phone-brand-grid-v2">{current.map((product) => <PhoneCatalogueCard key={product.slug} product={product} />)}</div> : <div className="phone-empty-v2"><p className="eyebrow">NOTHING FOUND</p><h2>No {brand} phones match those choices.</h2><p>Try a different search or clear the filters.</p><button onClick={clear}>Clear filters</button></div>}
      {totalPages > 1 && <div className="phone-pagination-v2" aria-label="Phone pages"><button disabled={page === 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">←</button>{Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, Math.min(page - 4, totalPages - 7)), Math.max(7, Math.min(totalPages, page + 3))).map((n) => <button key={n} className={page === n ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>)}<button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page">→</button></div>}
    </div>
  </div>;
}
