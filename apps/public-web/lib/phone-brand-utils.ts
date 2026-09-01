/**
 * Server-safe phone brand helpers.
 * Keep catalogue constants and pure transformations outside Client Components
 * so Next.js can safely use them during static generation.
 */
import { phoneCatalogue } from './phone-catalogue';

export const PHONE_BRANDS = Array.from(new Set(phoneCatalogue.map((product) => product.brand)));

export function brandSlug(brand: string): string {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
