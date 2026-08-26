import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { requireEngineUrl } from '@/lib/config';

export const runtime = 'nodejs';
const allowedMethods = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
type ProxyParams = { params: Promise<{ proxy: string[] }> };

export async function GET(request: NextRequest, context: ProxyParams) {
  return forward(request, await context.params);
}
export async function POST(request: NextRequest, context: ProxyParams) {
  return forward(request, await context.params);
}
export async function PUT(request: NextRequest, context: ProxyParams) {
  return forward(request, await context.params);
}
export async function PATCH(request: NextRequest, context: ProxyParams) {
  return forward(request, await context.params);
}
export async function DELETE(request: NextRequest, context: ProxyParams) {
  return forward(request, await context.params);
}

async function forward(request: NextRequest, { proxy }: { proxy: string[] }) {
  if (!allowedMethods.has(request.method)) {
    return NextResponse.json({ error: 'Method not supported.' }, { status: 405 });
  }

  try {
    const path = `/api/${proxy.map(encodeURIComponent).join('/')}`;
    const jar = await cookies();
    const cookie = jar.getAll().map((item) => `${item.name}=${item.value}`).join('; ');
    const csrf = jar.get('amaal_csrf')?.value || '';
    const headers = new Headers({ Accept: 'application/json' });
    const contentType = request.headers.get('content-type');
    if (contentType) headers.set('Content-Type', contentType);
    if (cookie) headers.set('Cookie', cookie);
    if (csrf && request.method !== 'GET') headers.set('X-CSRF-Token', csrf);

    const body = request.method === 'GET' ? undefined : await request.text();
    const upstream = await fetch(`${requireEngineUrl()}${path}${request.nextUrl.search}`, {
      method: request.method,
      headers,
      body,
      cache: 'no-store',
    });

    const text = await upstream.text();
    const response = new NextResponse(text, { status: upstream.status });
    const contentTypeOut = upstream.headers.get('content-type');
    if (contentTypeOut) response.headers.set('content-type', contentTypeOut);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The business service is unavailable.';
    const status = message.includes('AMAAL_ENGINE_URL') ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
