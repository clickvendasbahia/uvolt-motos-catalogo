import Link from 'next/link';
import { getAllVehiclesAdmin } from '@/lib/vehicles';
import VehicleRowActions from '@/components/admin/VehicleRowActions';

export default async function AdminVeiculosPage() {
  const vehicles = await getAllVehiclesAdmin();

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-mist">Veículos</h1>
          <Link
            href="/admin/veiculos/novo"
            className="rounded-full bg-electric px-5 py-2.5 text-sm font-semibold text-graphite hover:shadow-glow"
          >
            + Novo veículo
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
          <table className="w-full text-left text-sm">
            <thead className="bg-carbon text-slate">
              <tr>
                <th className="px-5 py-3">Nome</th>
                <th className="px-5 py-3">Autonomia</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {vehicles.map((v) => (
                <tr key={v.id} className="bg-graphite">
                  <td className="px-5 py-4 font-semibold text-mist">{v.name}</td>
                  <td className="px-5 py-4 text-slate">{v.autonomy_km} km</td>
                  <td className="px-5 py-4">
                    <VehicleRowActions id={v.id} status={v.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/veiculos/${v.id}/editar`}
                      className="text-sm font-semibold text-electric hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
