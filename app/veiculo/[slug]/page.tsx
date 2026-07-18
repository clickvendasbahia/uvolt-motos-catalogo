import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getVehicleBySlug } from '@/lib/vehicles';
import { formatPrice } from '@/lib/whatsapp';
import WhatsAppButton from '@/components/WhatsAppButton';

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
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[75vh]">
        <Image
          src={vehicle.images[0]}
          alt={vehicle.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-8 md:pb-16">
          <div className="mx-auto max-w-5xl">
            <span className="rounded-full bg-graphite/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon backdrop-blur">
              {vehicle.type === 'bike' ? 'Bike elétrica' : 'Moto elétrica'}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-mist md:text-6xl">{vehicle.name}</h1>
            <p className="mt-3 max-w-xl text-lg text-slate">{vehicle.tagline}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-xl font-bold text-mist">Sobre o modelo</h2>
            <p className="mt-4 text-base leading-relaxed text-slate">{vehicle.description}</p>
            <div className="mt-10 hidden md:block">
              <WhatsAppButton vehicleName={vehicle.name} />
            </div>
          </div>

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
        </div>
      </section>

      <WhatsAppButton vehicleName={vehicle.name} fixed />
      <div className="h-20 md:hidden" />
    </>
  );
}
