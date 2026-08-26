import { cookies } from 'next/headers';
import { engineRequest } from './engine';

export async function businessCookies() {
  const jar = await cookies();
  return jar.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
}

export async function businessGet<T>(path: string): Promise<T> {
  const cookie = await businessCookies();
  return engineRequest<T>(path, { headers: { Cookie: cookie } });
}

export async function businessGetSafe<T>(path: string): Promise<T | null> {
  try {
    return await businessGet<T>(path);
  } catch {
    return null;
  }
}

export function money(value: unknown, currency = 'UGX') {
  if (value === null || value === undefined || value === '') return '—';
  const amount = Number(value);
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function number(value: unknown) {
  if (value === null || value === undefined || value === '') return '—';
  const amount = Number(value);
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat('en-UG', { maximumFractionDigits: 0 }).format(amount);
}

export type CardEntry = { label: string; value: string };

export function cardEntries(entries: ReadonlyArray<readonly [string, unknown]>): CardEntry[] {
  return entries.map(([label, value]) => ({
    label: String(label),
    value: value == null ? '—' : String(value),
  }));
}
