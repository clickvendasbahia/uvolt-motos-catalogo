import { signOutAction } from '@/lib/admin-actions';

export default function ClientDashboardPage() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-mist">Área do cliente</h1>
          <form action={signOutAction.bind(null, '/login')}>
            <button className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate hover:text-mist">
              Sair
            </button>
          </form>
        </div>
        <p className="mt-4 text-sm text-slate">
          Bem-vindo(a). Esta área é exclusiva para clientes autenticados.
        </p>
      </div>
    </section>
  );
}
