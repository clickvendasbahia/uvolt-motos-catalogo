import { signInAction } from '@/lib/admin-actions';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="w-full max-w-sm rounded-3xl border border-white/5 bg-carbon p-8">
        <h1 className="text-2xl font-bold text-mist">Entrar</h1>
        <p className="mt-1 text-sm text-slate">Acesse sua conta UVOLT.</p>

        {searchParams.error && (
          <p className="mt-4 rounded-lg bg-flame/10 px-3 py-2 text-sm text-flame">
            {searchParams.error}
          </p>
        )}

        <form action={signInAction} className="mt-6 space-y-4">
          <input type="hidden" name="origin" value="/login" />
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-slate">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-graphite px-4 py-3 text-mist outline-none focus:border-electric"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-slate">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-graphite px-4 py-3 text-mist outline-none focus:border-electric"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-electric px-6 py-3 font-semibold text-graphite transition hover:shadow-glow"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
