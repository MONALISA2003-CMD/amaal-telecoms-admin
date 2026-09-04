import { amaalMasterPhones } from './amaal-master-data';
export function masterPhone(slug: string) {
  return amaalMasterPhones.find((p) => p.slug === slug);
}
