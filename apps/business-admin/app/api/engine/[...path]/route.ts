import { cookies } from 'next/headers';
import { requireEngineUrl } from '@/lib/config';

async function forward(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = `/${path.join('/')}`;
  const url = new URL(request.url);
  const target = `${requireEngineUrl()}${targetPath}${url.search}`;
  if (!targetPath.startsWith('/api/')) {
    return Response.json({ error: 'Invalid business service route.' }, { status: 400 });
  }
  const jar = await cookies();
  const headers = new Headers();
  const cookieHeader = jar.getAll().map((c) => `${c.name}=${c.value}`).join('; ');
  if (cookieHeader) headers.set('Cookie', cookieHeader);
  headers.set('Accept', request.headers.get('accept') || 'application/json');
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);
  const csrf = jar.get('amaal_csrf')?.value || '';
  if (csrf && request.method !== 'GET' && request.method !== 'HEAD') headers.set('X-CSRF-Token', csrf);

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  let response: Response;
  try {
    response = await fetch(target, { method: request.method, headers, body, cache: 'no-store', signal: controller.signal });
  } catch (error) {
    const message = error instanceof Error && error.name === 'AbortError' ? 'The business service timed out. Please try again.' : 'The business service is unavailable.';
    return Response.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
  const responseBody = await response.arrayBuffer();
  const out = new Headers();
  const responseType = response.headers.get('content-type');
  if (responseType) out.set('Content-Type', responseType);
  const disposition = response.headers.get('content-disposition');
  if (disposition) out.set('Content-Disposition', disposition);
  return new Response(responseBody, { status: response.status, headers: out });
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
export const PUT = forward;
export const DELETE = forward;
