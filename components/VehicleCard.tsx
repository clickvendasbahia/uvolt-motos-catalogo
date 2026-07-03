import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { formatPrice } from '@/lib/whatsapp';

const DEFAULT_FEATURES = [
  { icon: '🔋', label: 'Bateria removível' },
  { icon: '⚡', label: 'Carregamento 110V / 220V' },
] as const;

const FALLBACK_IMAGE = '/vehicles/max-12-maj.svg';

// Campos legados que não existem na tabela real do Supabase (sem coluna própria).
// Mantidos como opcionais aqui só para permitir fallback seguro, sem alterar o schema.
type VehicleCardData = Vehicle & {
  images?: string[];
  tagline?: string;
  max_speed_kmh?: number;
  type?: 'moto' | 'bike';
};

export default function VehicleCard({ vehicle }: { vehicle: VehicleCardData }) {
  const imageSrc = vehicle.images?.[0] || vehicle.image || FALLBACK_IMAGE;
  const tagline = vehicle.tagline ?? '';
  const typeLabel = vehicle.type === 'bike' ? 'Bike elétrica' : vehicle.type === 'moto' ? 'Moto elétrica' : '';
  const autonomyKm = vehicle.autonomy_km ?? '—';
  const maxSpeedKmh = vehicle.max_speed_kmh ?? '—';

  return (
    <Link
      href={`/veiculo/${vehicle.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-carbon transition hover:border-white/10 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={imageSrc}
          alt={vehicle.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {typeLabel && (
          <span className="absolute left-4 top-4 rounded-full bg-graphite/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon backdrop-blur">
            {typeLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-bold text-mist">{vehicle.name}</h3>
          {tagline && <p className="text-sm text-slate">{tagline}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_FEATURES.map((feature) => (
            <span
              key={feature.label}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate"
            >
              <span aria-hidden>{feature.icon}</span>
              {feature.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-sm">
          <div className="flex gap-4 text-slate">
            <span>{autonomyKm} km</span>
            <span>{maxSpeedKmh} km/h</span>
          </div>
          <span className="font-semibold text-electric">{formatPrice(vehicle.price)}</span>
        </div>
      </div>
    </Link>
  );
}
