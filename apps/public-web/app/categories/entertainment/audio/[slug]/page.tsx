import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '../../../../../components/SiteHeader';
import SiteFooter from '../../../../../components/SiteFooter';
import { audioProducts, audioProduct } from '../../../../../lib/audio-catalogue';
import WishlistButton from '../../../../../components/WishlistButton';
import AddToBag from '../../../../../components/AddToBag';
import { getCatalog } from '../../../../../lib/catalog';

function ugx(value?: number) {
  return value ? `UGX ${value.toLocaleString('en-UG')}` : 'Price coming soon';
}

export function generateStaticParams() {
  return audioProducts.map((p) => ({ slug: p.slug }));
}

export default async function AudioDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = audioProduct(slug);
  if (!item) return notFound();
  const product = item;

  const related = audioProducts.filter((x) => x.brand === product.brand && x.slug !== product.slug).slice(0, 4);
  const publicCataloguePath = '/api/public/catalog';
  const catalog = await getCatalog();
  const dbProduct = catalog?.products?.find((p) => p.slug === product.slug);
  const dbVariant = dbProduct?.variants?.find((v) => Number(v.sellingPrice) === Number(product.price) && v.inStock === true);

  return <main>
    <SiteHeader/>
    <section className="audio-detail">
      <div className="audio-detail-media">
        <div className="audio-detail-art">
          {product.image ? <img src={product.image} alt={`${product.name} product image`} className="audio-detail-real-image" /> : <div className="audio-detail-placeholder"><span>{product.brand}</span><strong>{product.type}</strong><small>Photo coming soon</small></div>}
        </div>
      </div>
      <div className="audio-detail-copy">
        <Link className="quiet-link" href="/categories/entertainment/audio">← Entertainment · Audio</Link>
        <p className="eyebrow">ENTERTAINMENT · AUDIO · {product.type}</p>
        <div className="audio-title-row"><h1>{product.name}</h1><WishlistButton id={product.slug}/></div>
        <div className="audio-price-detail">{ugx(product.price)}</div>
        <div className="audio-detail-quick">{product.quickSpecs.slice(0, 4).map((s) => <span key={s}>{s}</span>)}</div>
        <p className="audio-detail-lead">{product.description}</p>
        {dbProduct?.id && dbVariant?.code ? (
          <AddToBag id={dbProduct.id} variantId={dbVariant.code} name={product.name} brand={product.brand} slug={product.slug} price={ugx(dbVariant.sellingPrice)} numericPrice={Number(dbVariant.sellingPrice)} buttonLabel="Add to cart" addedLabel="Added to cart" />
        ) : (
          <Link className="button gold" href={`/contact?product=${encodeURIComponent(product.name)}`}>Check availability</Link>
        )}
        <p className="sourceNote" data-catalogue-source={publicCataloguePath}>{product.image ? 'Supplied Amaal product image.' : 'Product photo coming soon.'} Online purchase is enabled only when Amaal inventory is verified.</p>
      </div>
    </section>

    <section className="section product-description-section">
      <div className="section-head"><div><p className="eyebrow">FULL DESCRIPTION</p><h2>The complete product story.</h2></div></div>
      <p className="product-long-description">{product.description}</p>
    </section>

    <section className="section audio-specification-section">
      <div className="section-head"><div><p className="eyebrow">DETAILED SPECIFICATIONS</p><h2>Know what you are choosing.</h2></div></div>
      <div className="audio-specs">{Object.entries(product.specs).map(([k,v])=><div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div>
    </section>

    {related.length > 0 && <section className="section audio-related">
      <p className="eyebrow">MORE FROM {product.brand.toUpperCase()}</p><h2>Explore more sound.</h2>
      <div className="audio-related-grid">{related.map(r=><Link href={`/categories/entertainment/audio/${r.slug}`} key={r.slug}><span>{r.type}</span><strong>{r.name}</strong><small>{r.price ? ugx(r.price) : 'Price coming soon'} →</small></Link>)}</div>
    </section>}
    <SiteFooter/>
  </main>;
}
