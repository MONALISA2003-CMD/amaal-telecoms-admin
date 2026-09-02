import Link from 'next/link';
import { image, price, type Product } from '../lib/catalog';
import AddToBag from './AddToBag';
import WishlistButton from './WishlistButton';
export default function ProductCard({product}:{product:Product}){
 const formatted=price(product); const variant=product.variants?.[0];
 return <article className="product-card"><div className="product-card-media"><Link href={`/product/${product.slug??product.id}`} aria-label={product.name}><div className="product-image"><span>AMAAL</span><small>{image(product)?'Product image':'Product photo coming soon'}</small></div></Link><WishlistButton id={String(product.id)}/></div><div className="product-meta"><p className="product-brand">{product.brand_name??'AMAAL'}</p><h3><Link href={`/product/${product.slug??product.id}`}>{product.name}</Link></h3><strong>{formatted||'Price coming soon'}</strong>{formatted&&<AddToBag id={String(product.id)} variantId={variant?.code} name={product.name} brand={product.brand_name} slug={product.slug} price={formatted} numericPrice={Number(variant?.sellingPrice||0)}/>}</div></article>
}
