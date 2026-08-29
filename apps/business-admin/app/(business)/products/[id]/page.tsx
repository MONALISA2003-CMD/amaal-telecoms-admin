import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Box, CheckCircle2, ExternalLink, ImageOff, Layers3, Package, Tag } from 'lucide-react';
import { businessGetSafe, money, number } from '@/lib/business';
import { ProductRecordAdmin } from '@/components/ProductAdmin';

type Params = { id: string };
type Product = { id: string; name: string; slug: string; brand_name?: string; category_name?: string; product_type?: string; status?: string; website_visibility?: string; featured?: boolean; short_description?: string; description?: string; seo_title?: string; seo_description?: string; variants?: any[]; images?: any[]; tags?: any[] };

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const me = await businessGetSafe<{ permissions?: string[] }>('/api/me');
  if (!me) redirect('/login');
  if (!(me.permissions ?? []).includes('catalog.view')) redirect('/overview');
  const permissions = new Set(me.permissions ?? []);
  const { id } = await params;
  const product = await businessGetSafe<Product>(`/api/catalog/products/${encodeURIComponent(id)}`);
  if (!product) notFound();
  const [brands, categories, allTags] = await Promise.all([
    businessGetSafe<any[]>('/api/catalog/brands'),
    businessGetSafe<any[]>('/api/catalog/categories'),
    businessGetSafe<any[]>('/api/catalog/tags'),
  ]);
  const variants = Array.isArray(product.variants) ? product.variants : [];
  const images = Array.isArray(product.images) ? product.images : [];
  const productTags = Array.isArray(product.tags) ? product.tags : [];
  const primary = images.find((image) => image.is_primary) ?? images[0];
  return <div className="productDetailWorkspace">
    <ProductRecordAdmin product={product} brands={Array.isArray(brands) ? brands : []} categories={Array.isArray(categories) ? categories : []} tags={Array.isArray(allTags) ? allTags : []} canManage={permissions.has('catalog.manage')} canPublish={permissions.has('catalog.publish')} canTags={permissions.has('catalog.tags')} />
    <Link className="backLink" href="/products"><ArrowLeft size={15} /> Back to catalogue</Link>
    <section className="productDetailHero">
      <div className="productDetailVisual">{primary?.url ? <img src={primary.url} alt={primary.alt_text || product.name} /> : <ImageOff size={34} />}</div>
      <div className="productDetailIntro">
        <div className="eyebrowRow"><span className="eyebrow">Product record</span><span className={`catalogStatus ${String(product.status || '').toLowerCase()}`}>{product.status || '—'}</span><span className="catalogStatus website">{product.website_visibility || 'Hidden'}</span></div>
        <h2>{product.name}</h2>
        <p>{product.short_description || product.description || 'No short description has been provided.'}</p>
        <div className="productIdentity"><span>{product.brand_name || 'Unbranded'}</span><span>{product.category_name || 'Uncategorised'}</span><span>{product.product_type || 'Physical'}</span></div>
        <div className="productDetailActions"><Link className="softAction" href="/products">Catalogue</Link>{product.website_visibility === 'Published' && <span className="publishedNote"><CheckCircle2 size={14} /> Published to website</span>}</div>
      </div>
    </section>
    <section className="detailStatGrid"><DetailStat icon={<Layers3 size={17} />} label="Variants" value={number(variants.length)} /><DetailStat icon={<Tag size={17} />} label="Category" value={product.category_name || '—'} /><DetailStat icon={<Box size={17} />} label="Brand" value={product.brand_name || '—'} /><DetailStat icon={<ExternalLink size={17} />} label="Web visibility" value={product.website_visibility || 'Hidden'} /></section>
    <div className="productDetailGrid">
      <section className="panel detailPanel"><div className="panelHeading"><div><h3>Commercial variants</h3><p>Product codes, pricing and variant-level identity from the existing catalogue records.</p></div></div>{variants.length ? <div className="tableWrap"><table><thead><tr><th>Product code</th><th>Variant</th><th>Price</th><th>Wholesale</th><th>Inventory tracking</th><th>Status</th></tr></thead><tbody>{variants.map((v) => <tr key={v.id}><td><strong>{v.sku || '—'}</strong></td><td>{v.variant_name || 'Default'}{v.color ? ` · ${v.color}` : ''}{v.storage ? ` · ${v.storage}` : ''}</td><td>{money(v.selling_price)}</td><td>{money(v.wholesale_price)}</td><td>{v.track_inventory ? 'Tracked' : 'Not tracked'}</td><td><span className="catalogStatus">{v.status || '—'}</span></td></tr>)}</tbody></table></div> : <div className="detailEmpty"><Package size={23} /><strong>No variants returned</strong><span>The No active product variants are available for this product.</span></div>}</section>
      <section className="panel detailPanel"><div className="panelHeading"><div><h3>Catalogue identity</h3><p>The business-facing metadata currently held by the engine.</p></div></div><dl className="identityList"><div><dt>Website page name</dt><dd>{product.slug}</dd></div><div><dt>Product type</dt><dd>{product.product_type || '—'}</dd></div><div><dt>Featured</dt><dd>{product.featured ? 'Yes' : 'No'}</dd></div><div><dt>Tags</dt><dd>{productTags.length ? productTags.map((tag) => tag.name).join(', ') : '—'}</dd></div><div><dt>Website page title</dt><dd>{product.seo_title || '—'}</dd></div><div><dt>Website search description</dt><dd>{product.seo_description || '—'}</dd></div></dl></section>
    </div>
  </div>;
}
function DetailStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <article className="detailStat"><div>{icon}</div><span>{label}</span><strong>{value}</strong></article>; }
