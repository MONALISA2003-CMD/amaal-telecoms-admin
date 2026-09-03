import Link from 'next/link';
import { image, price, type Product } from '../lib/catalog';
import AddToBag from './AddToBag';
import WishlistButton from './WishlistButton';import CompareButton from './CompareButton';
export default function ProductCard({product}:{product:Product}){
 const formatted=price(product); const variant=product.variants?.[0];
 return <article className="product-card"><div className="product-card-media"><Link href={`/product/${product.slug??product.id}`} aria-label={product.name}><div className="product-image" style={image(product)?{backgroundImage:`url(${image(product)})`,backgroundSize:'cover',backgroundPosition:'center'}:undefined}><span>{image(product)?'':'AMAAL'}</span><small>{image(product)?'':'Image unavailable'}</small></div></Link><WishlistButton id={String(product.id)}/></div><div className="product-meta"><p className="product-brand">{product.brand_name??'AMAAL'}</p><h3><Link href={`/product/${product.slug??product.id}`}>{product.name}</Link></h3><strong>{formatted||'Price coming soon'}</strong><CompareButton id={String(product.id)}/>{formatted&&<AddToBag id={String(product.id)} variantId={variant?.code} name={product.name} brand={product.brand_name} slug={product.slug} price={formatted} numericPrice={Number(variant?.sellingPrice||0)}/>}</div></article>
}
