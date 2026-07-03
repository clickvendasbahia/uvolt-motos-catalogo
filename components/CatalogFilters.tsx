'use client';

import { useMemo, useState } from 'react';
import type { Vehicle } from '@/lib/types';
import VehicleCard from './VehicleCard';

export default function CatalogFilters({ vehicles }: { vehicles: Vehicle[] }) {
  const [minAutonomy, setMinAutonomy] = useState(0);

  const filtered = useMemo(() => {
    return vehicles.filter((v) => v.autonomy_km >= minAutonomy);
  }, [vehicles, minAutonomy]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/5 bg-carbon p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wide text-slate">
            Autonomia mínima: {minAutonomy} km
          </label>
          <input
            type="range"
            min={0}
            max={130}
            step={10}
            value={minAutonomy}
            onChange={(e) => setMinAutonomy(Number(e.target.value))}
            className="h-1 w-full max-w-xs cursor-pointer accent-electric"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-slate">Nenhum veículo encontrado com esses filtros.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
