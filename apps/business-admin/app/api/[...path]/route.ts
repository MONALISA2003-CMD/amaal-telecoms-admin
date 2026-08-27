import { NextRequest, NextResponse } from 'next/server';
import { requireEngineUrl } from '@/lib/config';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const base = requireEngineUrl();
  const target = `${base}/${path.join('/')}${request.nextUrl.search}`;

  const headers = new Headers();
  const pass = ['accept', 'content-type', 'cookie', 'authorization', 'x-csrf-token', 'user-agent'];
  for (const name of pass) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  headers.set('accept', 'application/json');

  const init: RequestInit = { method: request.method, headers, cache: 'no-store' };
  if (!['GET', 'HEAD'].includes(request.method)) init.body = await request.arrayBuffer();

  const response = await fetch(target, init);
  const responseHeaders = new Headers();
  const contentType = response.headers.get('content-type');
  if (contentType) responseHeaders.set('content-type', contentType);
  const cacheControl = response.headers.get('cache-control');
  responseHeaders.set('cache-control', cacheControl || 'no-store, max-age=0');
  const vary = response.headers.get('vary');
  if (vary) responseHeaders.set('vary', vary);

  const setCookies = response.headers.getSetCookie?.() ?? [];
  for (const cookie of setCookies) responseHeaders.append('set-cookie', cookie);

  return new NextResponse(response.body, { status: response.status, headers: responseHeaders });
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, context); }
export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, context); }
export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, context); }
export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, context); }
export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, context); }
export async function OPTIONS(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, context); }
