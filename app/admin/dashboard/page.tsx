import Link from 'next/link';
import { getAllVehiclesAdmin } from '@/lib/vehicles';
import { signOutAction } from '@/lib/admin-actions';

export default async function AdminDashboardPage() {
  const vehicles = await getAllVehiclesAdmin();
  const active = vehicles.filter((v) => v.status === 'available').length;

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-mist">Dashboard</h1>
          <form action={signOutAction}>
            <button className="rounded-full border border-white/10 px-5 py-2 text-sm text-slate hover:text-mist">
              Sair
            </button>
          </form>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-carbon p-6">
            <p className="text-sm text-slate">Total de veículos</p>
            <p className="mt-2 text-3xl font-bold text-mist">{vehicles.length}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-carbon p-6">
            <p className="text-sm text-slate">Ativos no catálogo</p>
            <p className="mt-2 text-3xl font-bold text-neon">{active}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-carbon p-6">
            <p className="text-sm text-slate">Inativos</p>
            <p className="mt-2 text-3xl font-bold text-flame">{vehicles.length - active}</p>
          </div>
        </div>

        <Link
          href="/admin/veiculos"
          className="mt-10 inline-flex rounded-full bg-electric px-6 py-3 font-semibold text-graphite hover:shadow-glow"
        >
          Gerenciar veículos
        </Link>
      </div>
    </section>
  );
}
