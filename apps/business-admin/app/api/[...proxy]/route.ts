import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { config } from '@/lib/config';
const allowed = new Set(['GET','POST','PUT','PATCH','DELETE']);
export async function GET(req:NextRequest,{params}:{params:Promise<{proxy:string[]}>}){return forward(req,await params)}
export async function POST(req:NextRequest,{params}:{params:Promise<{proxy:string[]}>}){return forward(req,await params)}
export async function PUT(req:NextRequest,{params}:{params:Promise<{proxy:string[]}>}){return forward(req,await params)}
export async function PATCH(req:NextRequest,{params}:{params:Promise<{proxy:string[]}>}){return forward(req,await params)}
export async function DELETE(req:NextRequest,{params}:{params:Promise<{proxy:string[]}>}){return forward(req,await params)}
async function forward(req:NextRequest,{proxy}:{proxy:string[]}){
  if(!allowed.has(req.method))return NextResponse.json({error:'Method not supported.'},{status:405});
  const path='/api/'+proxy.map(encodeURIComponent).join('/'); const jar=await cookies();
  const cookie=jar.getAll().map(c=>`${c.name}=${c.value}`).join('; '); const csrf=jar.get('amaal_csrf')?.value||'';
  const headers=new Headers({'Accept':'application/json'}); const contentType=req.headers.get('content-type'); if(contentType)headers.set('Content-Type',contentType); if(cookie)headers.set('Cookie',cookie); if(csrf&&req.method!=='GET')headers.set('X-CSRF-Token',csrf);
  const body=req.method==='GET'?undefined:await req.text();
  const upstream=await fetch(`${config.engineUrl}${path}${req.nextUrl.search}`,{method:req.method,headers,body,cache:'no-store'});
  const text=await upstream.text(); const out=new NextResponse(text,{status:upstream.status}); const ct=upstream.headers.get('content-type'); if(ct)out.headers.set('content-type',ct); return out;
}
