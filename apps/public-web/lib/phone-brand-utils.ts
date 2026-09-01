export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'] as const;

export function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
