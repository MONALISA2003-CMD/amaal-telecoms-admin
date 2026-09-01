import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import SiteFooter from '../../../components/SiteFooter';
import ProductCard from '../../../components/ProductCard';
import { getCatalog, type Product } from '../../../lib/catalog';
import { phoneCatalogue } from '../../../lib/phone-catalogue';
import PhoneCatalogueCard from '../../../components/PhoneCatalogueCard';
export default async function CategoryPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;

  if(slug==='phones'){
    const featuredSlugs=['apple-iphone-17-pro-max','samsung-galaxy-s25-ultra','google-pixel-pixel-10-pro-xl'];
    const featured=featuredSlugs.map((id)=>phoneCatalogue.find((p)=>p.slug===id)).filter(Boolean);

    return <main>
      <SiteHeader/>
      <section className="phone-category-luxury-hero">
        <div className="phone-category-luxury-copy">
          <p className="eyebrow">AMAAL PHONES</p>
          <h1>Only the<br/><em>exceptional.</em></h1>
          <p>Discover a handpicked selection of flagship smartphones from Apple, Samsung Galaxy and Google Pixel.</p>
          <div className="phone-category-luxury-actions">
            <Link className="button gold" href="/phones">Explore all phones <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="phone-category-hero-media" aria-label="Amaal Phones hero media placeholder">
          <div className="phone-hero-media-placeholder">
            <span>AMAAL PHONES</span>
            <strong>Featured<br/>visual</strong>
            <small>Coming soon</small>
          </div>
        </div>
      </section>

      <section className="section phone-category-luxury-featured">
        <div className="section-head">
          <div>
            <p className="eyebrow">THE FLAGSHIP EDIT</p>
            <h2>Made for those<br/>who expect more.</h2>
          </div>
          <p className="section-intro">Three of the finest flagship families in one refined collection. Choose your favourite, then explore the full Amaal phone range.</p>
        </div>
        <div className="phone-flagship-grid">
          {featured.map((product)=>product&&<article className="phone-flagship-card" key={product.slug}>
            <Link href={`/phones/${product.slug}`} aria-label={`View ${product.name}`}>
              <div className="phone-flagship-media">
                {product.image ? <img src={product.image} alt={product.name}/> : <div className="phone-flagship-placeholder"><span>{product.brand === 'Samsung' ? 'Samsung Galaxy' : product.brand === 'Google Pixel' ? 'Google Pixel' : product.brand}</span><strong>{product.name}</strong><small>Photography coming soon</small></div>}
                <span className="phone-flagship-badge">Flagship</span>
              </div>
              <div className="phone-flagship-copy">
                <p>{product.brand === 'Samsung' ? 'Samsung Galaxy' : product.brand === 'Google Pixel' ? 'Google Pixel' : product.brand}</p>
                <h3>{product.name}</h3>
                <span>Explore phone <b aria-hidden="true">↗</b></span>
              </div>
            </Link>
          </article>)}
        </div>
      </section>

      <section className="phone-category-luxury-bottom">
        <div>
          <p className="eyebrow">THE FULL COLLECTION</p>
          <h2>More phones.<br/>More choice.</h2>
          <p>From flagship favourites to everyday essentials, explore every phone available through Amaal.</p>
          <Link className="button light" href="/phones">View all phones <span aria-hidden="true">→</span></Link>
        </div>
      </section>
      <SiteFooter/>
    </main>;
  }

  const catalog=await getCatalog();const category=catalog?.categories.find(c=>c.slug===slug);const products=(catalog?.products??[]).filter((p:Product)=>p.category_slug===slug);const name=category?.name??slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());return <main><SiteHeader/><section className="section listing-page"><p className="eyebrow">CATEGORY</p><h1>{name}.</h1><p>{category?.description||`Explore Amaal's ${name.toLowerCase()} collection.`}</p><div className="listing-toolbar"><span>{products.length} published products</span><Link href="/search">Search</Link></div><div className="product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>{products.length===0&&<div className="empty">We couldn't find published products in this category yet.</div>}</section><SiteFooter/></main>
}
