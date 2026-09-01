'use client';

import Link from 'next/link';
import { ChevronRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { PhoneProduct } from '../lib/phone-catalogue';
import PhoneCatalogueCard from './PhoneCatalogueCard';

export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'] as const;

export function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const brandCopy: Record<string, string> = {
  Apple: 'Explore iPhone models by generation.',
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
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const series = useMemo(() => Array.from(new Set(products.map((p) => p.series))), [products]);
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      const text = `${p.name} ${p.family} ${p.series} ${p.network} ${p.variants.map((v) => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''}`).join(' ')}`.toLowerCase();
      return (!q || text.includes(q)) && (seriesFilter === 'All' || p.series === seriesFilter);
    });
  }, [products, query, seriesFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
  const updateQuery = (value: string) => { setQuery(value); setPage(1); };
  const updateSeries = (value: string) => { setSeriesFilter(value); setPage(1); };

  return <div className="phone-brand-browser-v2">
    <aside className="phone-brand-filter-v2">
      <p className="eyebrow">BROWSE {brand.toUpperCase()}</p>
      <h2>{brand}</h2>
      <div className="phone-filter-section-v2"><span>Series</span><button className={seriesFilter === 'All' ? 'active' : ''} onClick={() => updateSeries('All')}>All series <b>{products.length}</b></button>{series.map((s) => <button key={s} className={seriesFilter === s ? 'active' : ''} onClick={() => updateSeries(s)}>{s}<b>{products.filter((p) => p.series === s).length}</b></button>)}</div>
      <Link className="phone-side-back-v2" href="/phones">← All phone brands</Link>
    </aside>
    <div className="phone-brand-browser-results-v2">
      <div className="phone-brand-browser-toolbar-v2">
        <div className="phone-brand-inline-search-v2"><Search size={17}/><input value={query} onChange={(e) => updateQuery(e.target.value)} placeholder={`Search ${brand} phones`} aria-label={`Search ${brand} phones`} /></div>
        <div className="phone-brand-result-count-v2"><strong>{filtered.length}</strong><span>models</span></div>
      </div>
      {current.length ? <div className="phone-brand-grid-v2">{current.map((product) => <PhoneCatalogueCard key={product.slug} product={product} />)}</div> : <div className="phone-empty-v2"><p className="eyebrow">NO MATCHES</p><h2>No {brand} models match that search.</h2><button onClick={() => { updateQuery(''); updateSeries('All'); }}>Reset catalogue</button></div>}
      {totalPages > 1 && <div className="phone-pagination-v2" aria-label="Catalogue pages"><button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>←</button>{Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7).map((n) => <button key={n} className={page === n ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>)}<button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>→</button></div>}
    </div>
  </div>;
}
