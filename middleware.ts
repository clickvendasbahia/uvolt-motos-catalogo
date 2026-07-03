export const runtime = 'nodejs';

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

type Role = 'admin' | 'client' | undefined;

const ADMIN_HOST = 'admin.uvoltmotos.com.br';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = (request.headers.get('host') ?? '').split(':')[0];

  // Host dedicado: admin.uvoltmotos.com.br serve exclusivamente o painel admin.
  // catalogo.uvoltmotos.com.br (e qualquer outro host) mantém o comportamento atual.
  if (hostname === ADMIN_HOST && !pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/login', request.url), 308);
  }

  // Verificação de sessão/role só é necessária para rotas de admin/client.
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/client')) {
    return NextResponse.next();
  }

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
  // Precisa rodar em (quase) toda rota para o redirect por host funcionar
  // mesmo em "/" — exclui apenas assets estáticos e internals do Next.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
