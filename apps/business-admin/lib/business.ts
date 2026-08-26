import { cookies } from 'next/headers';
import { engineRequest } from './engine';

export async function businessCookies() {
  const jar = await cookies();
  return jar.getAll().map(c => `${c.name}=${c.value}`).join('; ');
}

export async function businessGet<T>(path: string): Promise<T> {
  const cookie = await businessCookies();
  return engineRequest<T>(path, { headers: { Cookie: cookie } });
}

export async function businessGetSafe<T>(path: string): Promise<T | null> {
  try { return await businessGet<T>(path); } catch { return null; }
}

export function money(value: unknown, currency = 'UGX') {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function number(value: unknown) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 })
    .format(Number.isFinite(amount) ? amount : 0);
}
