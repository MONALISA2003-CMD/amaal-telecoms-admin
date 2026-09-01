import type { PhoneProduct } from './phone-catalogue';

export type PhoneSort = 'featured' | 'name-asc' | 'name-desc' | 'brand' | 'options';

export function getBrands(products: PhoneProduct[] = []) {
  return [...new Set(products.map((p) => p.brand))];
}

export function getSeries(products: PhoneProduct[] = []) {
  return [...new Set(products.map((p) => p.series))].sort((a, b) => a.localeCompare(b));
}

export function getStorageOptions(products: PhoneProduct[] = []) {
  return [...new Set(products.flatMap((p) => p.variants.map((v) => v.storage).filter(Boolean) as string[]))]
    .sort((a, b) => parseInt(a) - parseInt(b));
}

export function getRamOptions(products: PhoneProduct[] = []) {
  return [...new Set(products.flatMap((p) => p.variants.map((v) => v.ram).filter(Boolean) as string[]))]
    .sort((a, b) => parseInt(a) - parseInt(b));
}

export function getNetworkOptions(products: PhoneProduct[] = []) {
  return [...new Set(products.map((p) => p.network).filter(Boolean))].sort();
}

export function phoneSearchText(p: PhoneProduct) {
  return `${p.name} ${p.brand} ${p.family} ${p.series} ${p.network} ${p.variants.map((v) => `${v.label} ${v.storage ?? ''} ${v.ram ?? ''} ${v.network ?? ''}`).join(' ')}`.toLowerCase();
}

export function searchPhones(products: PhoneProduct[], query: string) {
  const q = query.trim().toLowerCase();
  return q ? products.filter((p) => phoneSearchText(p).includes(q)) : products;
}

export function filterPhones(
  products: PhoneProduct[],
  filters: { brand?: string; series?: string; storage?: string; ram?: string; network?: string },
) {
  return products.filter((p) => {
    const variants = p.variants;
    return (!filters.brand || p.brand === filters.brand)
      && (!filters.series || p.series === filters.series)
      && (!filters.network || p.network === filters.network || variants.some((v) => v.network === filters.network))
      && (!filters.storage || variants.some((v) => v.storage === filters.storage))
      && (!filters.ram || variants.some((v) => v.ram === filters.ram));
  });
}

export function sortPhones(products: PhoneProduct[], sort: PhoneSort): PhoneProduct[] {
  return [...products].sort((a, b) => {
    if (sort === 'name-desc') return b.name.localeCompare(a.name);
    if (sort === 'brand') return `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`);
    if (sort === 'options') return b.variants.length - a.variants.length || a.name.localeCompare(b.name);
    if (sort === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });
}

export function getRelatedPhones(product: PhoneProduct, products: PhoneProduct[] = [], limit = 4) {
  return products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.brand === product.brand) - Number(a.brand === product.brand) || Number(b.series === product.series) - Number(a.series === product.series))
    .slice(0, limit);
}

export function customerPhoneDescription(product: PhoneProduct) {
  const custom: Record<string, string> = {
    Apple: `Explore ${product.name} with the storage choices available from Amaal.`,
    Samsung: `Explore ${product.name} with the available storage and memory choices from Amaal.`,
    'Google Pixel': `Explore ${product.name} and choose the option that suits you.`,
    TECNO: `Explore ${product.name} and choose the memory and storage option you prefer.`,
    Infinix: `Explore ${product.name} and choose the option that fits your needs.`,
    itel: `Explore ${product.name} with the available choices from Amaal.`,
  };
  return custom[product.brand] ?? `Explore ${product.name} and choose the option that suits you.`;
}
