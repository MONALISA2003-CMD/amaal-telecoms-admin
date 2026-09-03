import {notFound} from 'next/navigation';import {tabletProducts,tabletProduct} from '../../../../lib/tablet-catalogue';import CuratedProductDetail from '../../../../components/CuratedProductDetail';
export function generateStaticParams(){return tabletProducts.map(p=>({slug:p.slug}))}
export default async function TabletDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=tabletProduct(slug);if(!product)notFound();return <CuratedProductDetail product={product} backHref="/categories/tablets" backLabel="Tablets"/>}
