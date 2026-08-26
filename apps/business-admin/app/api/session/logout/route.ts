import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { requireEngineUrl } from '@/lib/config';

export const runtime = 'nodejs';
export async function POST() {
  const jar = await cookies();
  const cookie = jar.getAll().map((item) => `${item.name}=${item.value}`).join('; ');
  const csrf = jar.get('amaal_csrf')?.value || '';

  try {
    await fetch(`${requireEngineUrl()}/api/logout`, {
      method: 'POST',
      headers: { Cookie: cookie, 'X-CSRF-Token': csrf },
      cache: 'no-store',
    });
  } catch {
    // Local session cleanup must still happen if the upstream service is unavailable.
  }

  const response = NextResponse.json({ ok: true });
  for (const name of ['amaal_session', 'amaal_device', 'amaal_csrf']) response.cookies.delete(name);
  return response;
}
