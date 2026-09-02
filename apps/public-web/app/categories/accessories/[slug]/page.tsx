import {notFound} from 'next/navigation';import {accessoryProducts,accessoryProduct} from '../../../../lib/accessory-catalogue';import CuratedProductDetail from '../../../../components/CuratedProductDetail';
export function generateStaticParams(){return accessoryProducts.map(p=>({slug:p.slug}))}
export default async function AccessoryDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=accessoryProduct(slug);if(!product)notFound();return <CuratedProductDetail product={product} backHref="/categories/accessories" backLabel="Accessories"/>}
