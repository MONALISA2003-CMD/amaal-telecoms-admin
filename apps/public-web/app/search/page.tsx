import Link from 'next/link';
import { Search } from 'lucide-react';
import { getCatalog } from '../../lib/catalog';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const q = (params.q ?? '').trim();
  const catalog = await getCatalog();
  const products = (catalog?.products ?? []).filter((p: any) => !q || `${p.name} ${p.brand_name ?? p.brand ?? ''}`.toLowerCase().includes(q.toLowerCase()));
  return <main><header className="site-header"><div className="nav-wrap"><Link className="brand" href="/">AMAAL<span>.</span></Link><Link className="back-link" href="/">Back to home</Link></div></header><section className="section search-page"><p className="eyebrow">SEARCH AMAAL</p><h1>Find what you need.</h1><form className="search-form"><Search size={20}/><input name="q" defaultValue={q} placeholder="Search phones, TVs, fridges, speakers…" aria-label="Search products"/><button>Search</button></form><div className="section-head results-head"><h2>{q ? `${products.length} result${products.length === 1 ? '' : 's'} for “${q}”` : 'Browse our catalogue'}</h2></div><div className="product-grid">{products.slice(0, 24).map((p: any) => <Link className="product-card" href={`/product/${p.slug ?? p.id}`} key={p.id ?? p.slug}><div className="product-image">{p.image_url ? <img src={p.image_url} alt=""/> : <span>AMAAL</span>}</div><p className="product-brand">{p.brand_name ?? p.brand ?? 'AMAAL'}</p><h3>{p.name}</h3><strong>{p.price ? `UGX ${Number(p.price).toLocaleString()}` : 'View product'}</strong></Link>)}</div>{products.length === 0 && <div className="empty">No products matched your search. Try another term or browse categories.</div>}</section></main>;
}
