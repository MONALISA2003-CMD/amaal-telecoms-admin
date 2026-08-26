import { NextResponse } from 'next/server';
import { requireEngineUrl } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const upstream = await fetch(`${requireEngineUrl()}/api/setup/status`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The business service is unavailable.';
    const status = message.includes('AMAAL_ENGINE_URL') ? 503 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
