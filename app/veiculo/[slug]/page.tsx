import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getVehicleBySlug } from '@/lib/vehicles';
import { formatPrice } from '@/lib/whatsapp';
import WhatsAppButton from '@/components/WhatsAppButton';
import VehicleGallery from '@/components/VehicleGallery';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) return {};
  return {
    title: `${vehicle.name} | UVOLT`,
    description: vehicle.description,
  };
}

const specs = (v: NonNullable<Awaited<ReturnType<typeof getVehicleBySlug>>>) => [
  { label: 'Autonomia', value: `${v.autonomy_km} km` },
  { label: 'Velocidade máxima', value: `${v.max_speed_kmh} km/h` },
  { label: 'Tempo de recarga', value: v.recharge_time },
  { label: 'Tipo', value: v.type === 'bike' ? 'Bicicleta elétrica' : 'Moto elétrica' },
];

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  const vehicle = await getVehicleBySlug(params.slug);
  if (!vehicle) notFound();

  return (
    <>
      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <span className="rounded-full bg-graphite/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon">
              {vehicle.type === 'bike' ? 'Bike elétrica' : 'Moto elétrica'}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-mist md:text-5xl">{vehicle.name}</h1>
            <p className="mt-2 text-lg text-slate">{vehicle.tagline}</p>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
            <VehicleGallery images={vehicle.images} name={vehicle.name} />

            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/5 bg-carbon p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate">
                  Painel técnico
                </h2>
                <dl className="mt-4 divide-y divide-white/5">
                  {specs(vehicle).map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-3">
                      <dt className="text-sm text-slate">{s.label}</dt>
                      <dd className="text-sm font-semibold text-mist">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="text-sm text-slate">Preço</span>
                  <span className="text-lg font-bold text-electric">{formatPrice(vehicle.price)}</span>
                </div>
              </div>

              <div className="hidden md:block">
                <WhatsAppButton vehicleName={vehicle.name} />
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl">
            <h2 className="text-xl font-bold text-mist">Sobre o modelo</h2>
            <p className="mt-4 text-base leading-relaxed text-slate">{vehicle.description}</p>
          </div>
        </div>
      </section>

      <WhatsAppButton vehicleName={vehicle.name} fixed />
      <div className="h-20 md:hidden" />
    </>
  );
}
