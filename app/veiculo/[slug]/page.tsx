import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getVehicleBySlug } from '@/lib/vehicles';
import { formatPrice } from '@/lib/whatsapp';
import WhatsAppButton from '@/components/WhatsAppButton';
import type { Vehicle } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Campos legados que não existem na tabela real do Supabase (sem coluna própria).
// Mantidos como opcionais aqui só para permitir fallback seguro, sem alterar o schema.
type VehicleDetail = Vehicle & {
  images?: string[];
  tagline?: string;
  max_speed_kmh?: number;
  recharge_time?: string;
  type?: 'moto' | 'bike';
};

const FALLBACK_IMAGE = '/vehicles/max-12-maj.svg';

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

function buildSpecs(v: VehicleDetail) {
  return [
    { label: 'Autonomia', value: `${v.autonomy_km} km` },
    v.max_speed_kmh != null ? { label: 'Velocidade máxima', value: `${v.max_speed_kmh} km/h` } : null,
    v.recharge_time ? { label: 'Tempo de recarga', value: v.recharge_time } : null,
    v.type ? { label: 'Tipo', value: v.type === 'bike' ? 'Bicicleta elétrica' : 'Moto elétrica' } : null,
  ].filter((s): s is { label: string; value: string } => s !== null);
}

export default async function VehiclePage({ params }: { params: { slug: string } }) {
  const vehicle = (await getVehicleBySlug(params.slug)) as VehicleDetail | null;
  if (!vehicle) notFound();

  const imageSrc = vehicle.images?.[0] || vehicle.image || FALLBACK_IMAGE;
  const tagline = vehicle.tagline ?? '';
  const typeLabel = vehicle.type === 'bike' ? 'Bike elétrica' : 'Moto elétrica';
  const specs = buildSpecs(vehicle);

  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[75vh]">
        <Image
          src={imageSrc}
          alt={vehicle.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-8 md:pb-16">
          <div className="mx-auto max-w-5xl">
            <span className="rounded-full bg-graphite/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon backdrop-blur">
              {typeLabel}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold text-mist md:text-6xl">{vehicle.name}</h1>
            {tagline && <p className="mt-3 max-w-xl text-lg text-slate">{tagline}</p>}
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
              {specs.map((s) => (
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
