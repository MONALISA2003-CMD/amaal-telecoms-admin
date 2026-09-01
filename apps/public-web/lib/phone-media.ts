import type { PhoneProduct } from './phone-catalogue';

const localMedia: Record<string, string[]> = {
  'samsung-galaxy-s26-ultra': ['/products/galaxy-s26-ultra.webp'],
  'apple-iphone-17-pro-max': ['/products/iphone17-pro-max.webp'],
};

export function getPhoneMedia(product: PhoneProduct): string[] {
  if (product.image) return [product.image];
  return localMedia[product.slug] ?? [];
}
