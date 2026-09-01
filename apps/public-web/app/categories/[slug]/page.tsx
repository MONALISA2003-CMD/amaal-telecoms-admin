import { redirect } from 'next/navigation';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import ProductCard from '../../../components/ProductCard';
import { getCatalog, type Product } from '../../../lib/catalog';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === 'phones') redirect('/phones');

  const catalog = await getCatalog();
  const category = catalog?.categories.find(c => c.slug === slug);
  const products = (catalog?.products ?? []).filter((p: Product) => p.category_slug === slug);
  const name = category?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <main>
      <SiteHeader />
      <section className="section listing-page">
        <p className="eyebrow">CATEGORY</p>
        <h1>{name}.</h1>
        <p>{category?.description || `Explore Amaal's ${name.toLowerCase()} collection.`}</p>
        <div className="listing-toolbar">
          <span>{products.length} published products</span>
          <a href="/search">Search</a>
        </div>
        <div className="product-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {products.length === 0 && <div className="empty">We couldn't find published products in this category yet.</div>}
      </section>
      <SiteFooter />
    </main>
  );
}
