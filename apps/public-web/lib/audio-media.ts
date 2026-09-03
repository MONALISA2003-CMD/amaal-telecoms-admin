import type { AudioProduct } from './audio-catalogue';

/**
 * Product imagery is intentionally not bundled with the application.
 * Business Console uploads can be stored remotely and wired through the
 * public catalogue API later without changing the product cards.
 */
const localMedia: Record<string, string> = {};

export function getAudioMedia(product: AudioProduct): string | undefined {
  return product.image || localMedia[product.slug];
}
