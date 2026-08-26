import { NextRequest, NextResponse } from 'next/server';
const protectedPrefixes=['/overview','/search','/sales','/products','/stock','/purchasing','/customers','/orders','/finance','/credit','/delivery','/service','/website','/reports','/team','/settings'];
export function middleware(req:NextRequest){if(protectedPrefixes.some(p=>req.nextUrl.pathname.startsWith(p))&&!req.cookies.get('amaal_session'))return NextResponse.redirect(new URL('/login',req.url));return NextResponse.next()}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};
