'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Box, Check, ChevronDown, ExternalLink, Filter, Grid2X2, List, PackageSearch, Search, Star, Tag, X, Plus, UploadCloud } from 'lucide-react';
import { CatalogueAdminBar, ImportModal, ProductCreateModal, TaxonomyModal } from '@/components/ProductAdmin';

type Product = {
  id: string;
  name: string;
  slug: string;
  product_type?: string;
  status?: string;
  website_visibility?: string;
  featured?: boolean;
  brand_name?: string;
  category_name?: string;
  variant_count?: number;
  min_price?: number | string | null;
  max_price?: number | string | null;
  image_url?: string | null;
  updated_at?: string;
};

type Option = { id: string; name: string; product_count?: number };

type Props = {
  summary: { products?: number; brands?: number; categories?: number; variants?: number; published?: number } | null;
  products: Product[];
  total: number;
  brands: Option[];
  categories: Option[];
  canManage: boolean;
  canPublish: boolean;
};

const money = (value: unknown) => {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(n);
};

const number = (value: unknown) => value == null ? '—' : new Intl.NumberFormat('en-UG').format(Number(value));

function statusClass(value?: string) {
  const v = String(value || '').toLowerCase().replace(/\s+/g, '-');
  return `catalogStatus ${v}`;
}

function formatDate(value?: string) {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('en-UG', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

export function ProductCatalogue({ summary, products, total, brands, categories, canManage, canPublish }: Props) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [visibility, setVisibility] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [adminModal, setAdminModal] = useState<'product'|'brand'|'category'|'tag'|'import'|null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || [p.name, p.slug, p.brand_name, p.category_name].some((x) => String(x || '').toLowerCase().includes(q));
      const matchesBrand = brand === 'All' || p.brand_name === brand;
      const matchesCategory = category === 'All' || p.category_name === category;
      const matchesStatus = status === 'All' || p.status === status;
      const matchesVisibility = visibility === 'All' || p.website_visibility === visibility;
      return matchesQuery && matchesBrand && matchesCategory && matchesStatus && matchesVisibility;
    });
  }, [products, query, brand, category, status, visibility]);

  const activeFilters = [brand, category, status, visibility].filter((v) => v !== 'All').length;

  function clearFilters() {
    setQuery(''); setBrand('All'); setCategory('All'); setStatus('All'); setVisibility('All');
  }

  return (
    <div className="catalogueWorkspace">
      {canManage && <CatalogueAdminBar onCreate={() => setAdminModal('product')} onTaxonomy={(kind: any) => setAdminModal(kind)} onImport={() => setAdminModal('import')} />}
      <section className="catalogueHero">
        <div>
          <div className="eyebrowRow"><span className="eyebrow">Commerce · Catalogue</span><span className="catalogueLive"><i /> Live catalogue</span></div>
          <h2>Products</h2>
          <p>A clean catalogue-first workspace for finding products, understanding their commercial identity and opening the full product record when you need more detail.</p>
        </div>
        <div className="catalogueHeroActions">
          {canManage && <span className="catalogueCapability"><Check size={13} /> Catalogue editing enabled</span>}
          {canPublish && <span className="catalogueCapability"><ExternalLink size={13} /> Publishing enabled</span>}
        </div>
      </section>

      <section className="catalogueStats">
        <Stat icon={<PackageSearch size={17} />} label="Products" value={number(summary?.products)} note={`${number(total)} currently visible in this catalogue`} featured />
        <Stat icon={<Tag size={17} />} label="Categories" value={number(summary?.categories)} note="Active catalogue structure" />
        <Stat icon={<Box size={17} />} label="Variants" value={number(summary?.variants)} note="Product codes and commercial variants" />
        <Stat icon={<ExternalLink size={17} />} label="Published online" value={number(summary?.published)} note="Active products visible to web channels" />
      </section>

      <section className="catalogueToolbar panel">
        <div className="catalogueSearch"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, Product code, brand or category" aria-label="Search catalogue" /></div>
        <button className={`filterButton ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen((v) => !v)}><Filter size={15} /> Filters {activeFilters > 0 && <b>{activeFilters}</b>}<ChevronDown size={14} /></button>
        <div className="viewToggle" aria-label="Catalogue view">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><Grid2X2 size={15} /></button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><List size={15} /></button>
        </div>
      </section>

      {filtersOpen && <section className="catalogueFilters panel">
        <FilterSelect label="Brand" value={brand} onChange={setBrand} options={brands.map((x) => x.name)} />
        <FilterSelect label="Category" value={category} onChange={setCategory} options={categories.map((x) => x.name)} />
        <FilterSelect label="Status" value={status} onChange={setStatus} options={['Draft', 'Active', 'Archived']} />
        <FilterSelect label="Website" value={visibility} onChange={setVisibility} options={['Published', 'Hidden']} />
        {activeFilters > 0 && <button className="clearFilters" onClick={clearFilters}><X size={14} /> Clear filters</button>}
      </section>}

      <section className="catalogueResultsHeader">
        <div><strong>{number(filtered.length)}</strong> products shown <span>· {number(total)} total available</span></div>
        <span className="catalogueHint">Select a product to inspect its commercial record.</span>
      </section>

      {filtered.length === 0 ? <div className="panel catalogueEmpty"><PackageSearch size={28} /><strong>No products match this view</strong><span>Try another search or clear the filters. The catalogue remains authoritative to the business records.</span><button onClick={clearFilters}>Clear filters</button></div> : view === 'grid' ? (
        <div className="productGrid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="panel catalogueList"><table><thead><tr><th>Product</th><th>Brand</th><th>Category</th><th>Variants</th><th>Price</th><th>Status</th><th>Website</th><th>Updated</th><th /></tr></thead><tbody>{filtered.map((product) => <tr key={product.id}>
          <td><Link className="productListName" href={`/products/${product.id}`}><ProductThumb product={product} compact /><span><strong>{product.name}</strong><small>{product.slug}</small></span></Link></td>
          <td>{product.brand_name || '—'}</td><td>{product.category_name || '—'}</td><td>{number(product.variant_count)}</td><td>{priceRange(product)}</td>
          <td><span className={statusClass(product.status)}>{product.status || '—'}</span></td><td>{product.website_visibility || '—'}</td><td>{formatDate(product.updated_at)}</td>
          <td><Link className="tableArrow" href={`/products/${product.id}`} aria-label={`Open ${product.name}`}><ArrowRight size={16} /></Link></td>
        </tr>)}</tbody></table></div>
      )}
      {adminModal === 'product' && <ProductCreateModal brands={brands} categories={categories} onClose={() => setAdminModal(null)} onCreated={() => window.location.reload()} />}
      {adminModal === 'brand' && <TaxonomyModal kind="brand" onClose={() => setAdminModal(null)} onSaved={() => window.location.reload()} />}
      {adminModal === 'category' && <TaxonomyModal kind="category" onClose={() => setAdminModal(null)} onSaved={() => window.location.reload()} />}
      {adminModal === 'tag' && <TaxonomyModal kind="tag" onClose={() => setAdminModal(null)} onSaved={() => window.location.reload()} />}
      {adminModal === 'import' && <ImportModal onClose={() => setAdminModal(null)} onDone={() => window.location.reload()} />}
    </div>
  );
}

function Stat({ icon, label, value, note, featured = false }: { icon: React.ReactNode; label: string; value: string; note: string; featured?: boolean }) {
  return <article className={`catalogueStat ${featured ? 'featured' : ''}`}><div className="statIcon">{icon}</div><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="filterSelect"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}><option>All</option>{options.filter(Boolean).map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function ProductThumb({ product, compact = false }: { product: Product; compact?: boolean }) {
  return <div className={`productThumb ${compact ? 'compact' : ''}`}>{product.image_url ? <img src={product.image_url} alt="" /> : <PackageSearch size={compact ? 17 : 28} />}</div>;
}

function priceRange(product: Product) {
  const min = Number(product.min_price);
  const max = Number(product.max_price);
  if (!Number.isFinite(min)) return '—';
  if (Number.isFinite(max) && max !== min) return `${money(min)} – ${money(max)}`;
  return money(min);
}

function ProductCard({ product }: { product: Product }) {
  return <article className="productCard">
    <Link href={`/products/${product.id}`} className="productImageLink"><ProductThumb product={product} /><span className="productCardBadge"><span className={statusClass(product.status)}>{product.status || '—'}</span></span>{product.featured && <span className="featuredBadge"><Star size={11} fill="currentColor" /> Featured</span>}</Link>
    <div className="productCardBody">
      <div className="productMeta"><span>{product.brand_name || 'Unbranded'}</span><span>{product.category_name || 'Uncategorised'}</span></div>
      <Link href={`/products/${product.id}`} className="productName">{product.name}</Link>
      <p>{product.variant_count == null ? '—' : `${number(product.variant_count)} variant${Number(product.variant_count) === 1 ? '' : 's'}`} · {product.website_visibility || 'Hidden'}</p>
      <div className="productCardFooter"><strong>{priceRange(product)}</strong><Link href={`/products/${product.id}`} aria-label={`Open ${product.name}`}><ArrowRight size={16} /></Link></div>
    </div>
  </article>;
}
