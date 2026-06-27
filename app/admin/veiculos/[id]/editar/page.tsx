import { notFound } from 'next/navigation';
import { getAllVehiclesAdmin } from '@/lib/vehicles';
import { updateVehicleAction } from '@/lib/admin-actions';
import VehicleForm from '@/components/admin/VehicleForm';

export default async function EditarVeiculoPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const vehicles = await getAllVehiclesAdmin();
  const vehicle = vehicles.find((v) => v.id === params.id);
  if (!vehicle) notFound();

  const action = updateVehicleAction.bind(null, vehicle.id);

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-mist">Editar {vehicle.name}</h1>

        {searchParams.error && (
          <p className="mt-4 rounded-lg bg-flame/10 px-3 py-2 text-sm text-flame">
            {searchParams.error}
          </p>
        )}

        <div className="mt-8 rounded-3xl border border-white/5 bg-carbon p-6">
          <VehicleForm action={action} vehicle={vehicle} />
        </div>
      </div>
    </section>
  );
}
