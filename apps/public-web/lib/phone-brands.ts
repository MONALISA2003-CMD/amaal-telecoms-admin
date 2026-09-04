/** Shared phone brand metadata safe for Server and Client Components. */
export const PHONE_BRANDS = ['Apple', 'Samsung', 'Google Pixel', 'TECNO', 'Infinix'] as const;

export type PhoneBrand = (typeof PHONE_BRANDS)[number];

export function brandSlug(brand: string): string {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
