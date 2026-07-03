import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  // TEMP DEBUG — diagnóstico de "TypeError: fetch failed". Remover depois.
  console.log('[supabase][debug] NEXT_PUBLIC_SUPABASE_URL =', url);

  const cookieStore = cookies();

  return createServerClient(url, key, {
    global: {
      // TEMP DEBUG — loga URL/status de cada requisição e o erro completo em caso de falha. Remover depois.
      fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const reqUrl = typeof input === 'string' ? input : (input as Request).url;
        console.log('[supabase][debug] fetch ->', reqUrl);
        try {
          const res = await fetch(input, { ...init, cache: 'no-store' });
          console.log('[supabase][debug] fetch <- status:', res.status, res.statusText, 'url:', reqUrl);
          return res;
        } catch (err) {
          const e = err as Error & { cause?: unknown };
          console.error('[supabase][debug] fetch FALHOU para', reqUrl);
          console.error('[supabase][debug] message:', e?.message);
          console.error('[supabase][debug] cause:', e?.cause);
          console.error('[supabase][debug] stack:', e?.stack);
          throw err;
        }
      },
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // chamado de um Server Component sem permissão de escrita — ignorado
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // idem
        }
      },
    },
  });
}
