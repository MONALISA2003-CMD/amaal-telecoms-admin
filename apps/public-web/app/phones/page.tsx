'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import PhoneCatalogueCard from '../../components/PhoneCatalogueCard';
import { PHONE_BRANDS, brandSlug } from '../../lib/phone-brand-utils';
import { phoneCatalogue } from '../../lib/phone-catalogue';
import { filterPhones, getPhoneBrandSeries, getPhoneCounts, phoneNetworks, phoneRamOptions, phoneStorageOptions, searchPhones, sortPhones, type PhoneSort } from '../../lib/phone-catalogue-utils';

const counts = getPhoneCounts();

export default function PhonesPage() {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('');
  const [series, setSeries] = useState('');
  const [storage, setStorage] = useState('');
  const [ram, setRam] = useState('');
  const [network, setNetwork] = useState('');
  const [sort, setSort] = useState<PhoneSort>('recommended');
  const [page, setPage] = useState(1);
  const pageSize = 24;

  const searched = useMemo(() => searchPhones(query), [query]);
  const filtered = useMemo(() => sortPhones(filterPhones(searched, { brand, series, storage, ram, network }), sort), [searched, brand, series, storage, ram, network, sort]);
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const activeCount = [brand, series, storage, ram, network].filter(Boolean).length;
  const seriesOptions = useMemo(() => brand ? getPhoneBrandSeries(brand) : Array.from(new Set(phoneCatalogue.map((p) => p.series))), [brand]);
  const clear = () => { setBrand(''); setSeries(''); setStorage(''); setRam(''); setNetwork(''); setQuery(''); setPage(1); };
  const update = <T,>(setter: (value: T) => void, value: T) => { setter(value); setPage(1); };

  return <main><SiteHeader />
    <section className="phones-catalogue-intro-v3">
      <div>
        <p className="eyebrow">AMAAL · PHONES</p>
        <h1>Phones, without<br/><em>the clutter.</em></h1>
        <p>Explore phones by brand, series and configuration. One catalogue, built to grow with every product category Amaal will add next.</p>
      </div>
      <div className="phones-search-v3">
        <label htmlFor="phones-search">Search the catalogue</label>
        <div><Search size={18}/><input id="phones-search" value={query} onChange={(e) => update(setQuery, e.target.value)} placeholder="Search iPhone, Galaxy, Pixel, CAMON…"/><kbd>⌘ K</kbd></div>
        <small>Try a brand, model, series, storage, RAM or network.</small>
      </div>
    </section>

    <section className="phones-brand-rail-v3 section">
      <div className="section-head-v2"><div><p className="eyebrow">SHOP BY BRAND</p><h2>Start with what you know.</h2></div><p>{phoneCatalogue.length} models across {PHONE_BRANDS.length} phone collections.</p></div>
      <div className="phones-brand-scroll-v3">
        <Link className={!brand ? 'active' : ''} href="/phones" onClick={() => clear()}><strong>All phones</strong><small>{phoneCatalogue.length} models</small></Link>
        {PHONE_BRANDS.map((item) => <Link key={item} className={brand === item ? 'active' : ''} href={`/phones/brand/${brandSlug(item)}`}><strong>{item}</strong><small>{counts[item] ?? 0} models</small></Link>)}
      </div>
    </section>

    <section className="phones-series-rail-v3">
      <div className="section"><div className="section-head-v2"><div><p className="eyebrow">EXPLORE SERIES</p><h2>Browse by family.</h2></div><p>Shortcuts are derived from the catalogue, so new series can be added without redesigning the page.</p></div>
        <div className="phones-series-scroll-v3">{seriesOptions.slice(0, 14).map((item) => <button key={item} className={series === item ? 'active' : ''} onClick={() => update(setSeries, series === item ? '' : item)}>{item}<ArrowRight size={14}/></button>)}</div>
      </div>
    </section>

    <section className="phones-main-catalogue-v3 section">
      <div className="phones-catalogue-heading-v3"><div><p className="eyebrow">ALL PHONES</p><h2>{filtered.length} {filtered.length === 1 ? 'model' : 'models'}</h2></div><span className="phones-catalogue-count-note">A single catalogue for every phone model</span></div>
      <div className="phones-filterbar-v3">
        <div className="phones-filter-mobile-label"><SlidersHorizontal size={15}/> Filters {activeCount ? `(${activeCount})` : ''}</div>
        <Filter label="Brand" value={brand} options={PHONE_BRANDS as unknown as string[]} onChange={(v) => update(setBrand, v)} />
        <Filter label="Series" value={series} options={seriesOptions} onChange={(v) => update(setSeries, v)} />
        <Filter label="Storage" value={storage} options={phoneStorageOptions} onChange={(v) => update(setStorage, v)} />
        <Filter label="RAM" value={ram} options={phoneRamOptions} onChange={(v) => update(setRam, v)} />
        <Filter label="Network" value={network} options={phoneNetworks} onChange={(v) => update(setNetwork, v)} />
        <select className="phones-sort-v3" value={sort} onChange={(e) => update(setSort, e.target.value as PhoneSort)} aria-label="Sort phones"><option value="recommended">Recommended</option><option value="brand-az">Brand A–Z</option><option value="model-az">Model A–Z</option></select>
      </div>
      {(activeCount || query) ? <div className="phones-active-filters-v3">{query && <button onClick={() => update(setQuery, '')}>“{query}” <X size={12}/></button>}{brand && <Chip value={brand} clear={() => update(setBrand, '')}/>} {series && <Chip value={series} clear={() => update(setSeries, '')}/>} {storage && <Chip value={storage} clear={() => update(setStorage, '')}/>} {ram && <Chip value={ram} clear={() => update(setRam, '')}/>} {network && <Chip value={network} clear={() => update(setNetwork, '')}/>}<button className="clear-all-v3" onClick={clear}>Clear all</button></div> : null}
      {current.length ? <div className="phones-grid-v3">{current.map((product) => <PhoneCatalogueCard key={product.slug} product={product}/>)}</div> : <div className="phone-empty-v2"><p className="eyebrow">NO MATCHES</p><h2>Nothing matches those filters.</h2><p>Try a different brand, series, storage or network.</p><button onClick={clear}>Reset catalogue</button></div>}
      {totalPages > 1 && <div className="phone-pagination-v2"><button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>←</button>{Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7).map((n) => <button key={n} className={page === n ? 'active' : ''} onClick={() => setPage(n)}>{n}</button>)}<button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>→</button></div>}
    </section>
    <SiteFooter />
  </main>;
}

function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <label className="phone-filter-select-v3"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}><option value="">All {label.toLowerCase()}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={13}/></label>;
}

function Chip({ value, clear }: { value: string; clear: () => void }) { return <button onClick={clear}>{value} <X size={12}/></button>; }
