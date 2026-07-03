export const runtime = 'nodejs';

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type Role = 'admin' | 'client' | undefined;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Sem Supabase configurado, admin fica aberto (modo demo).
  if (!url || !key) return NextResponse.next();
  if (pathname === '/admin/login' || pathname === '/login') return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const { data } = await supabase.auth.getUser();
  const role: Role = data.user?.user_metadata?.role;

  if (pathname.startsWith('/admin')) {
    if (!data.user) return NextResponse.redirect(new URL('/login', request.url));
    if (role !== 'admin') {
      return NextResponse.redirect(new URL(role === 'client' ? '/client/dashboard' : '/login', request.url));
    }
    return response;
  }

  if (pathname.startsWith('/client')) {
    if (!data.user) return NextResponse.redirect(new URL('/login', request.url));
    if (role !== 'client') {
      return NextResponse.redirect(new URL(role === 'admin' ? '/admin/dashboard' : '/login', request.url));
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};
