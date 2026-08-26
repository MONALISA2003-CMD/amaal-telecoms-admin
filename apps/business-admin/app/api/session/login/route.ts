import { NextResponse } from 'next/server';
import { requireEngineUrl } from '@/lib/config';

export const runtime = 'nodejs';
function cookiePairs(header: string) {
  return header.split(/,(?=[^;]+?=)/).map((value) => value.split(';')[0]).filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const upstream = await fetch(`${requireEngineUrl()}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
      cache: 'no-store',
    });
    const text = await upstream.text();
    const response = new NextResponse(text, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
    });
    const setCookies = typeof upstream.headers.getSetCookie === 'function'
      ? upstream.headers.getSetCookie()
      : cookiePairs(upstream.headers.get('set-cookie') || '');
    for (const raw of setCookies) {
      const pair = raw.split(';')[0];
      const index = pair.indexOf('=');
      if (index < 1) continue;
      const name = pair.slice(0, index);
      const value = pair.slice(index + 1);
      response.cookies.set({
        name,
        value,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    }
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The business service is unavailable.';
    const status = message.includes('AMAAL_ENGINE_URL') ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
