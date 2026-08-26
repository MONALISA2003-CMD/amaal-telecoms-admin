import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

function cookiePairs(header:string){return header.split(/,(?=[^;]+?=)/).map(x=>x.split(';')[0]).filter(Boolean)}
export async function POST(req:Request){
  const body=await req.text();
  const upstream=await fetch(`${config.engineUrl}/api/login`,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body,cache:'no-store'});
  const text=await upstream.text();
  const response=new NextResponse(text,{status:upstream.status,headers:{'Content-Type':upstream.headers.get('content-type')||'application/json'}});
  const setCookies=typeof upstream.headers.getSetCookie==='function'?upstream.headers.getSetCookie():cookiePairs(upstream.headers.get('set-cookie')||'');
  for(const raw of setCookies){const pair=raw.split(';')[0];const idx=pair.indexOf('=');if(idx<1)continue;const name=pair.slice(0,idx),value=pair.slice(idx+1);response.cookies.set({name,value,path:'/',httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax'});}
  return response;
}
