'use client';

import { useTransition } from 'react';
import { toggleVehicleActiveAction, deleteVehicleAction } from '@/lib/admin-actions';

export default function VehicleRowActions({
  id,
  status,
}: {
  id: string;
  status: 'available' | 'inactive';
}) {
  const [isPending, startTransition] = useTransition();
  const active = status === 'available';

  return (
    <div className="flex items-center gap-3">
      <button
        disabled={isPending}
        onClick={() =>
          startTransition(() => toggleVehicleActiveAction(id, active ? 'inactive' : 'available'))
        }
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
          active ? 'bg-neon/15 text-neon' : 'bg-white/10 text-slate'
        }`}
      >
        {active ? 'Ativo' : 'Inativo'}
      </button>
      <button
        disabled={isPending}
        onClick={() => {
          if (confirm('Remover este veículo do catálogo?')) {
            startTransition(() => deleteVehicleAction(id));
          }
        }}
        className="rounded-full px-4 py-1.5 text-xs font-semibold text-flame hover:bg-flame/10"
      >
        Excluir
      </button>
    </div>
  );
}
