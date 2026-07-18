import Image from 'next/image';
import Link from 'next/link';
import type { Vehicle } from '@/lib/types';
import { formatPrice } from '@/lib/whatsapp';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={`/veiculo/${vehicle.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-carbon transition hover:border-white/10 hover:shadow-glow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Image
          src={vehicle.images[0]}
          alt={vehicle.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-graphite/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon backdrop-blur">
          {vehicle.type === 'bike' ? 'Bike elétrica' : 'Moto elétrica'}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-bold text-mist">{vehicle.name}</h3>
          <p className="text-sm text-slate">{vehicle.tagline}</p>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-sm">
          <div className="flex gap-4 text-slate">
            <span>{vehicle.autonomy_km} km</span>
            <span>{vehicle.max_speed_kmh} km/h</span>
          </div>
          <span className="font-semibold text-electric">{formatPrice(vehicle.price)}</span>
        </div>
      </div>
    </Link>
  );
}
