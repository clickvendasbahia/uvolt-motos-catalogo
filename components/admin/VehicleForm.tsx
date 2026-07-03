import type { Vehicle } from '@/lib/types';

export default function VehicleForm({
  action,
  vehicle,
}: {
  action: (formData: FormData) => void;
  vehicle?: Vehicle;
}) {
  return (
    <form action={action} className="grid gap-6 md:grid-cols-2">
      <Field label="Nome" name="name" defaultValue={vehicle?.name} required />
      <Field
        label="Imagem (URL ou /vehicles/arquivo.svg)"
        name="image_url"
        defaultValue={vehicle?.image}
      />
      <Field
        label="Autonomia (km)"
        name="autonomy_km"
        type="number"
        defaultValue={vehicle?.autonomy_km}
      />
      <Field label="Preço (R$)" name="price" type="number" defaultValue={vehicle?.price ?? ''} />

      <div className="md:col-span-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate">
          Descrição
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={vehicle?.description}
          className="mt-2 w-full rounded-xl border border-white/10 bg-graphite px-4 py-3 text-mist outline-none focus:border-electric"
        />
      </div>

      <div className="md:col-span-2">
        <label className="text-xs font-medium uppercase tracking-wide text-slate">Status</label>
        <select
          name="status"
          defaultValue={vehicle?.status ?? 'available'}
          className="mt-2 w-full rounded-xl border border-white/10 bg-graphite px-4 py-3 text-mist outline-none focus:border-electric"
        >
          <option value="available">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-electric px-6 py-3 font-semibold text-graphite hover:shadow-glow"
        >
          Salvar veículo
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-slate">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-2 w-full rounded-xl border border-white/10 bg-graphite px-4 py-3 text-mist outline-none focus:border-electric"
      />
    </div>
  );
}
