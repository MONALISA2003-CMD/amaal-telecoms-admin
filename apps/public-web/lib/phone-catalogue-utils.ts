import { phoneCatalogue, type PhoneProduct } from './phone-catalogue';

export const phoneBrands = Array.from(new Set(phoneCatalogue.map((p) => p.brand)));
export const phoneSeries = Array.from(new Set(phoneCatalogue.map((p) => p.series))).sort();
export const phoneNetworks = Array.from(new Set(phoneCatalogue.map((p) => p.network))).sort();
export const phoneStorageOptions = Array.from(new Set(phoneCatalogue.flatMap((p) => p.variants.map((v) => v.storage).filter(Boolean) as string[])))
  .sort((a, b) => Number.parseInt(a) - Number.parseInt(b));
export const phoneRamOptions = Array.from(new Set(phoneCatalogue.flatMap((p) => p.variants.map((v) => v.ram).filter(Boolean) as string[])))
  .sort((a, b) => Number.parseInt(a) - Number.parseInt(b));

export type PhoneSort = 'recommended' | 'brand-az' | 'model-az';

export function phoneSearchText(product: PhoneProduct) {
  return [
    product.name,
    product.brand,
    product.family,
    product.series,
    product.network,
    ...product.variants.flatMap((v) => [v.label, v.storage ?? '', v.ram ?? '', v.network ?? '']),
  ].join(' ').toLowerCase();
}

export function searchPhones(query: string, products = phoneCatalogue) {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter((product) => phoneSearchText(product).includes(q));
}

export function filterPhones(products: PhoneProduct[], filters: {
  brand?: string;
  series?: string;
  storage?: string;
  ram?: string;
  network?: string;
}) {
  return products.filter((product) => {
    const variants = product.variants;
    const hasStorage = !filters.storage || variants.some((v) => v.storage === filters.storage);
    const hasRam = !filters.ram || variants.some((v) => v.ram === filters.ram);
    const hasNetwork = !filters.network || product.network === filters.network || variants.some((v) => v.network === filters.network);
    return (!filters.brand || product.brand === filters.brand)
      && (!filters.series || product.series === filters.series)
      && hasStorage && hasRam && hasNetwork;
  });
}

export function sortPhones(products: PhoneProduct[], sort: PhoneSort) {
  return [...products].sort((a, b) => {
    if (sort === 'brand-az') return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name);
    if (sort === 'model-az') return a.name.localeCompare(b.name);
    return phoneCatalogue.indexOf(a) - phoneCatalogue.indexOf(b);
  });
}

export function getPhoneImage(product: PhoneProduct) {
  if (product.image) return product.image;
  const key = product.slug.toLowerCase();
  const local: Record<string, string> = {
    'apple-iphone-16-pro-max': '/products/featured/iphone-16-pro-max-256gb-1.webp',
    'google-pixel-9': '/products/featured/google-pixel-9-256gb-1.webp',
    'samsung-galaxy-a17': '/products/featured/galaxy-a17-128gb-1.webp',
    'samsung-galaxy-a07': '/products/featured/galaxy-a07-64gb-1.webp',
    'samsung-galaxy-s26-ultra': '/products/galaxy-s26-ultra.webp',
    'apple-iphone-17-pro-max': '/products/iphone17-pro-max.webp',
  };
  return local[key] ?? '';
}

export function getPhoneBrandSeries(brand: string) {
  return Array.from(new Set(phoneCatalogue.filter((p) => p.brand === brand).map((p) => p.series)));
}

export function getPhoneCounts() {
  return Object.fromEntries(phoneBrands.map((brand) => [brand, phoneCatalogue.filter((p) => p.brand === brand).length]));
}
