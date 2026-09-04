import Link from 'next/link';
import { ArrowRight, CircleCheck } from 'lucide-react';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { featuredProducts, homeBrands, homeCategories, newProducts, type HomeProduct } from '../lib/homepage-data';
import AutoRail from '../components/AutoRail';
import AddToBag from '../components/AddToBag';
import { getCatalog, type Product } from '../lib/catalog';

function ugx(value: number) {
  return `UGX ${value.toLocaleString('en-UG')}`;
}

type HomeCommerce = { productId: string; variantId: string; price: number; variantName?: string };

function ProductTile({ p, commerce }: { p: HomeProduct; commerce?: HomeCommerce }) {
  const variants = p.variants?.length ? p.variants : [{ label: p.quickDetails.slice(0, 2).join(' · '), price: p.price }];
  return (
    <article className="home-product-card">
      <Link href={`/product/${p.slug}`} className="home-product-link" aria-label={`View ${p.name}`}>
        <div className="product-media">
          {p.images.length ? (
            <img
              src={p.images[0]}
              alt={`${p.name} product image`}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 600px) 78vw, (max-width: 1000px) 240px, 270px"
            />
          ) : (
            <div className="product-placeholder product-placeholder-empty" aria-hidden="true">
              <span>{p.brand}</span>
              <strong>Product photo</strong>
              <small>Approved photo not supplied</small>
            </div>
          )}
        </div>
        <div className="home-product-meta">
          <p>{p.brand}</p>
          <h3>{p.name}</h3>
          <div className="variant-price-list" aria-label={`${p.name} variants and prices`}>
            {variants.map((variant) => (
              <div className="variant-price-row" key={`${variant.label}-${variant.price}`}>
                <span>{variant.label}</span>
                <strong>{ugx(variant.price)}</strong>
              </div>
            ))}
          </div>
        </div>
      </Link>
      <div className="home-product-cta">
        {commerce ? (
          <AddToBag
            id={commerce.productId}
            variantId={commerce.variantId}
            name={p.name}
            brand={p.brand}
            slug={p.slug}
            price={ugx(commerce.price)}
            numericPrice={commerce.price}
            buttonLabel="Add to cart"
            addedLabel="Added to cart"
          />
        ) : (
          <Link className="button gold" href={`/product/${p.slug}`}>
            Order Now <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </article>
  );
}

function CategoryCard({ name, slug, imageSrc, description, index }: {
  name: string; slug: string; imageSrc: string; description: string; index: number;
}) {
  return (
    <Link className="category-card" href={`/categories/${slug}`}>
      <div className="category-art">
        <img src={imageSrc} alt="" loading="lazy" decoding="async" />
        <span>0{index + 1}</span>
      </div>
      <div className="category-copy">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

const trustItems = [
  ['trust-authentic.jpg', 'Authentic products', 'Genuine products from trusted brands'],
  ['trust-warranty.jpg', 'Warranty support', 'Here after the sale'],
  ['trust-delivery.jpg', 'Reliable delivery', 'Across Uganda'],
  ['trust-payment.jpg', 'Flexible payment', 'Convenient ways to pay'],
] as const;

function resolveCommerceProduct(p: HomeProduct, catalog: Product[] | undefined): HomeCommerce | undefined {
  const product = catalog?.find((candidate) => candidate.slug === p.slug);
  if (!product?.id || !product.variants?.length) return undefined;

  // Only expose a direct cart action when the existing catalogue has an unambiguous
  // variant matching the exact homepage offer. Never guess a variant.
  const matching = product.variants.find((variant) => Number(variant.sellingPrice) === Number(p.price) && variant.inStock !== false);
  if (!matching) return undefined;
  return {
    productId: product.id,
    variantId: matching.code,
    price: Number(matching.sellingPrice),
    variantName: matching.name,
  };
}

export default async function Home() {
  const catalog = await getCatalog();
  const catalogueProducts = catalog?.products;
  const featuredCommerce = new Map(featuredProducts.map((p) => [p.slug, resolveCommerceProduct(p, catalogueProducts)]));
  const newCommerce = new Map(newProducts.map((p) => [p.slug, resolveCommerceProduct(p, catalogueProducts)]));

  return (
    <main>
      <SiteHeader />

      {/* HERO: intentionally preserved exactly as supplied. */}
      <section className="lux-hero">
        <div className="hero-stage hero-stage-image" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">THE NEW STANDARD IN TECHNOLOGY</p>
          <h1>Better technology.<br /><em>Better every day.</em></h1>
          <p>Premium devices and appliances for your home, work and lifestyle, selected for the way you live.</p>
          <div className="hero-actions">
            <Link className="button gold" href="/shop">Shop now <ArrowRight size={16} /></Link>
            <Link className="button ghost-light" href="/about">Discover Amaal</Link>
          </div>
          <div className="hero-note"><CircleCheck size={15} /> Genuine products from trusted brands</div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Amaal assurances">
        {trustItems.map(([image, title, detail]) => (
          <div key={title}>
            <img src={`/assets/amaal/${image}`} alt="" loading="lazy" decoding="async" />
            <span><strong>{title}</strong><small>{detail}</small></span>
          </div>
        ))}
      </section>

      <section className="section category-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">DISCOVER YOUR NEXT</p>
            <h2>Shop by category</h2>
            <p className="section-intro">Start with what you need. Explore eight carefully presented paths into the Amaal catalogue.</p>
          </div>
          <Link className="quiet-link" href="/categories">View all <ArrowRight size={15} /></Link>
        </div>
        <AutoRail className="category-rail" label="Shop by category" speed={0.42}>
          {homeCategories.map(([name, slug, imageSrc, description], i) => (
            <CategoryCard name={name} slug={slug} imageSrc={imageSrc} description={description} index={i} key={name} />
          ))}
        </AutoRail>
      </section>

      <section className="section featured-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">THE AMAAL EDIT</p>
            <h2>Featured at Amaal</h2>
            <p className="section-intro">A focused selection of real products, clear configurations and exact UGX pricing.</p>
          </div>
          <Link className="quiet-link" href="/shop">Shop all <ArrowRight size={15} /></Link>
        </div>
        <AutoRail className="product-rail" label="Featured at Amaal" speed={0.34}>
          {featuredProducts.map((p) => <ProductTile key={p.slug} p={p} commerce={featuredCommerce.get(p.slug)} />)}
        </AutoRail>
      </section>

      <section className="lifestyle-feature">
        <div className="lifestyle-copy">
          <p className="eyebrow">AMAAL EDIT</p>
          <h2>Technology for real life.</h2>
          <p>From brilliant screens to powerful sound, from the kitchen to the office, discover technology selected for the way you live.</p>
          <Link className="button gold" href="/shop">Shop now <ArrowRight size={16} /></Link>
        </div>
        <div className="lifestyle-scene" aria-hidden="true">
          <img src="/assets/amaal/homepage/lifestyle-image-of-homepage.webp" alt="" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="section arrivals-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">JUST IN</p>
            <h2>New at Amaal</h2>
            <p className="section-intro">A curated collection of current products, with RAM, storage and pricing made unmistakable.</p>
          </div>
          <Link className="quiet-link" href="/shop">View collection <ArrowRight size={15} /></Link>
        </div>
        <AutoRail className="product-rail" label="New at Amaal" speed={0.34}>
          {newProducts.map((p) => <ProductTile key={p.slug} p={p} commerce={newCommerce.get(p.slug)} />)}
        </AutoRail>
      </section>

      <section className="section brand-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">TRUSTED NAMES</p>
            <h2>Shop by brand</h2>
            <p className="section-intro">A curated set of the brands customers know and trust, represented by their approved marks.</p>
          </div>
          <Link className="quiet-link" href="/brands">View all brands <ArrowRight size={15} /></Link>
        </div>
        <AutoRail className="brand-rail" label="Shop by brand" speed={0.4}>
          {homeBrands.slice(0, 10).map(([name, slug, logo]) => (
            <Link href={`/brands/${slug}`} className="brand-card" key={name} aria-label={`Shop ${name}`}>
              <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" />
            </Link>
          ))}
        </AutoRail>
        <div className="brand-directory-link">
          <Link className="button light" href="/brands">Explore all brands <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="trust-feature" aria-labelledby="why-amaal-heading">
        <div className="trust-feature-intro">
          <p className="eyebrow">WHY AMAAL</p>
          <h2 id="why-amaal-heading">Confidence from discovery to delivery.</h2>
          <p>We keep the shopping journey clear with trusted products, practical support and the reassurance you need before you order.</p>
        </div>
        <div className="trust-feature-grid">
          {trustItems.map(([image, title, detail], index) => (
            <article className="trust-feature-card" key={title}>
              <img src={`/assets/amaal/${image}`} alt="" loading="lazy" decoding="async" />
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="service-section section">
        <div>
          <p className="eyebrow">BEYOND THE SALE</p>
          <h2>We're here after the purchase, too.</h2>
          <p>Delivery, warranty, repairs, returns and support, in one place.</p>
        </div>
        <div className="service-links">
          <Link href="/tracking">Track an order <ArrowRight size={16} /></Link>
          <Link href="/delivery">Delivery information <ArrowRight size={16} /></Link>
          <Link href="/warranty">Warranty support <ArrowRight size={16} /></Link>
          <Link href="/repairs">Repairs & service <ArrowRight size={16} /></Link>
          <Link href="/contact">Make an enquiry <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="assist-section">
        <div>
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2>Find what fits your life.</h2>
          <p>Explore the full Amaal catalogue and choose the technology that works for your home, work and everyday life.</p>
        </div>
        <Link className="button gold" href="/shop">Shop now <ArrowRight size={16} /></Link>
      </section>

      <section className="newsletter">
        <div><p className="eyebrow">STAY IN THE LOOP</p><h2>Technology worth knowing about.</h2><p>New arrivals, offers and useful stories from Amaal.</p></div>
        <form><input placeholder="Enter your email" aria-label="Email address" /><button aria-label="Subscribe"><ArrowRight size={17} /></button></form>
      </section>
      <SiteFooter />
    </main>
  );
}
