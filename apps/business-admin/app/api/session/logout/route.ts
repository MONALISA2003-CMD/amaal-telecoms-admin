import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { config } from '@/lib/config';
export async function POST(){
  const jar=await cookies(); const cookie=jar.getAll().map(c=>`${c.name}=${c.value}`).join('; '); const csrf=jar.get('amaal_csrf')?.value||'';
  await fetch(`${config.engineUrl}/api/logout`,{method:'POST',headers:{Cookie:cookie,'X-CSRF-Token':csrf},cache:'no-store'}).catch(()=>undefined);
  const r=NextResponse.json({ok:true}); for(const c of ['amaal_session','amaal_device','amaal_csrf'])r.cookies.delete(c); return r;
}
