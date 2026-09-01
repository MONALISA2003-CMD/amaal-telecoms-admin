import { requireEngineUrl } from './config';

export async function engineRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = requireEngineUrl();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const response = await fetch(url, {
    ...init,
    headers,
    cache: 'no-store',
  });

  const text = await response.text();
  let payload: unknown = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = { error: 'The business service returned an invalid response.' };
  }

  if (!response.ok) {
    const message = typeof payload === 'object' && payload && 'error' in payload
      ? String((payload as { error?: unknown }).error)
      : 'The business service could not complete the request.';
    throw new Error(message);
  }
  return payload as T;
}
