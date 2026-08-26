import { NextRequest, NextResponse } from 'next/server';

const protectedPrefixes = [
  '/overview',
  '/search',
  '/sales',
  '/products',
  '/stock',
  '/purchasing',
  '/customers',
  '/orders',
  '/finance',
  '/credit',
  '/delivery',
  '/service',
  '/website',
  '/reports',
  '/team',
  '/settings',
];

export function proxy(request: NextRequest) {
  const isProtected = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix),
  );

  if (isProtected && !request.cookies.get('amaal_session')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
