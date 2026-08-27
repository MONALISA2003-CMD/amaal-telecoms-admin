import { cookies } from 'next/headers';
import { requireEngineUrl } from '@/lib/config';

const ALLOWED_PREFIX = '/api/catalog/';

async function forward(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetPath = `/${path.join('/')}`;
  const url = new URL(request.url);
  const target = `${requireEngineUrl()}${targetPath}${url.search}`;
  if (!targetPath.startsWith(ALLOWED_PREFIX) && targetPath !== '/api/catalog') {
    return Response.json({ error: 'Business Admin proxy route is restricted.' }, { status: 403 });
  }
  const jar = await cookies();
  const headers = new Headers();
  const cookieHeader = jar.getAll().map((c) => `${c.name}=${c.value}`).join('; ');
  if (cookieHeader) headers.set('Cookie', cookieHeader);
  headers.set('Accept', request.headers.get('accept') || 'application/json');
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);

  const body = ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer();
  const response = await fetch(target, { method: request.method, headers, body, cache: 'no-store' });
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
