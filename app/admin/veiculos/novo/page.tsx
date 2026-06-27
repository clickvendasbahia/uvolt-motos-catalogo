import VehicleForm from '@/components/admin/VehicleForm';
import { createVehicleAction } from '@/lib/admin-actions';

export default function NovoVeiculoPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-mist">Novo veículo</h1>

        {searchParams.error && (
          <p className="mt-4 rounded-lg bg-flame/10 px-3 py-2 text-sm text-flame">
            {searchParams.error}
          </p>
        )}

        <div className="mt-8 rounded-3xl border border-white/5 bg-carbon p-6">
          <VehicleForm action={createVehicleAction} />
        </div>
      </div>
    </section>
  );
}
