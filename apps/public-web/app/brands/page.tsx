import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import {getPublishedCatalog} from '../../lib/catalog-runtime';

export default async function BrandsPage(){
  const c=await getPublishedCatalog();
  const brands=[...c.brands]
    .map(b=>({...b,count:c.products.filter(p=>p.brand_slug===b.slug).length}))
    .filter(b=>b.count>0)
    .sort((a,b)=>a.name.localeCompare(b.name));
  const letters=[...new Set(brands.map(b=>b.name.trim().charAt(0).toUpperCase()).filter(Boolean))];

  return <main>
    <SiteHeader/>
    <section className="section listing-page brand-directory-page">
      <p className="eyebrow">BRANDS</p>
      <h1>Trusted names.</h1>
      <p className="listing-lead">Explore brands with products currently published in the Amaal catalogue.</p>

      <nav className="brand-letter-nav" aria-label="Browse brands by letter">
        {letters.map(letter=><a href={`#brand-${letter}`} key={letter}>{letter}</a>)}
      </nav>

      <div className="brand-directory-groups">
        {letters.map(letter=>{
          const rows=brands.filter(b=>b.name.trim().toUpperCase().startsWith(letter));
          return <section className="brand-directory-group" id={`brand-${letter}`} key={letter}>
            <div className="brand-directory-heading"><span>{letter}</span><small>{rows.length} {rows.length===1?'brand':'brands'}</small></div>
            <div className="brand-grid">
              {rows.map(b=><Link href={`/brands/${b.slug}`} key={b.slug} className="brand-directory-card">
                <div className="brand-mark" aria-hidden="true">
                  {b.logo_url||b.image_url ? <img src={b.logo_url||b.image_url} alt="" loading="lazy"/> : <span>{b.name.charAt(0)}</span>}
                </div>
                <div><strong>{b.name}</strong><span>{b.count} {b.count===1?'product':'products'}</span></div>
                <span className="brand-arrow" aria-hidden="true">→</span>
              </Link>)}
            </div>
          </section>;
        })}
      </div>

      {!brands.length&&<div className="empty"><h2>No published brands yet.</h2><p>Brands will appear here when they have published products.</p><Link className="button gold" href="/shop">Browse the catalogue</Link></div>}
    </section>
    <SiteFooter/>
  </main>;
}
