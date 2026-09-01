import Link from 'next/link';
import { image, price, type Product } from '../lib/catalog';
import AddToBag from './AddToBag';
export default function ProductCard({product}:{product:Product}){const formatted=price(product);return <article className="product-card"><Link href={`/product/${product.slug??product.id}`}><div className="product-image">{image(product)?<img src={image(product)} alt=""/>:<span>AMAAL</span>}</div><div className="product-meta"><p className="product-brand">{product.brand_name??'AMAAL'}</p><h3>{product.name}</h3><strong>{formatted||'View product'}</strong></div></Link>{formatted&&<AddToBag id={String(product.id)} name={product.name} price={formatted}/>}</article>}
