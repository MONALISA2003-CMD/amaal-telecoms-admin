import { notFound } from 'next/navigation';
import PhoneDetail from '../../../components/PhoneDetail';
import PhoneRelated from '../../../components/PhoneRelated';
import PhoneCompareTray from '../../../components/PhoneCompareTray';
import { phoneCatalogue } from '../../../lib/phone-catalogue';
import { getCatalog } from '../../../lib/catalog';

export function generateStaticParams() {
  return phoneCatalogue.map((phone) => ({ slug: phone.slug }));
}

export default async function PhonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = phoneCatalogue.find((phone) => phone.slug === slug);
  if (!product) return notFound();
  const selectedProduct = product;

  const catalog = await getCatalog();
  const dbProduct = catalog?.products?.find((candidate) => candidate.slug === selectedProduct.slug);
  const commerce: Record<string,{id:string;variantId:string;price:number}> = {};

  if (dbProduct?.id) {
    for (const variant of selectedProduct.variants) {
      const match = dbProduct.variants?.find((candidate) => {
        const storageMatch = !variant.storage || String(candidate.storage || '').toLowerCase() === variant.storage.toLowerCase();
        const ramMatch = !variant.ram || String(candidate.name || '').toLowerCase().includes(variant.ram.toLowerCase());
        return storageMatch && ramMatch && Number(candidate.sellingPrice) === Number(variant.price) && candidate.inStock === true;
      });
      if (match?.code) commerce[variant.label] = { id: dbProduct.id, variantId: match.code, price: Number(match.sellingPrice) };
    }
  }

  return <>
    <PhoneDetail product={selectedProduct} commerce={commerce} />
    <PhoneRelated product={selectedProduct} products={phoneCatalogue} />
    <PhoneCompareTray />
  </>;
}
