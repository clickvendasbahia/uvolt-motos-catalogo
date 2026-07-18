import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const isAdminHost = host.startsWith('admin.');
  const { pathname } = request.nextUrl;

  if (isAdminHost && pathname === '/') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return NextResponse.next();
  if (pathname === '/admin/login') return NextResponse.next();

  if (pathname.startsWith('/admin')) {
    const hasSession = request.cookies.getAll().some((c) => c.name.includes('-auth-token'));
    if (!hasSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*'],
};
