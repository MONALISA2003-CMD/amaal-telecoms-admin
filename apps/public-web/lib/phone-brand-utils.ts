export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix', 'itel'] as const;

export type PhoneBrand = (typeof PHONE_BRANDS)[number];

export function brandSlug(brand: string) {
  return brand.toLowerCase().replace(/\s+/g, '-');
}
