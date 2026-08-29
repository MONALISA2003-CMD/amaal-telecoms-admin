import Link from 'next/link';
import { getCatalog } from '../../lib/catalog';

export default async function ShopPage() {
  const catalog = await getCatalog();
  const products = catalog?.products ?? [];
  return <main><header className="site-header"><div className="nav-wrap"><Link className="brand" href="/">AMAAL<span>.</span></Link><nav className="desktop-nav"><Link href="/categories">Categories</Link><Link href="/brands">Brands</Link><Link href="/deals">Deals</Link></nav></div></header><section className="section listing-page"><div className="listing-intro"><p className="eyebrow">THE COLLECTION</p><h1>Shop Amaal.</h1><p>Explore genuine consumer electronics and appliances across our collection.</p></div><div className="listing-toolbar"><span>{products.length} products</span><Link href="/search">Search products</Link></div><div className="product-grid">{products.map((p: any) => <Link className="product-card" href={`/product/${p.slug ?? p.id}`} key={p.id ?? p.slug}><div className="product-image">{p.image_url ? <img src={p.image_url} alt=""/> : <span>AMAAL</span>}</div><p className="product-brand">{p.brand_name ?? p.brand ?? 'AMAAL'}</p><h3>{p.name}</h3><strong>{p.price ? `UGX ${Number(p.price).toLocaleString()}` : 'View product'}</strong></Link>)}</div>{products.length === 0 && <div className="empty">No published products are available yet.</div>}</section></main>;
}
