import type { Metadata } from 'next';
import { getVehicles } from '@/lib/vehicles';
import CatalogFilters from '@/components/CatalogFilters';

export const metadata: Metadata = {
  title: 'Catálogo | UVOLT Motos Elétricas Salvador',
  description:
    'Catálogo completo de motos elétricas e bicicletas elétricas da UVOLT em Salvador. Compare autonomia, velocidade e preço.',
};

export const dynamic = 'force-dynamic';

export default async function CatalogoPage() {
  const vehicles = await getVehicles();

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-3xl font-extrabold text-mist md:text-5xl">Catálogo UVOLT</h1>
          <p className="mt-4 text-slate">
            Motos elétricas e bicicletas elétricas pensadas para Salvador e Lauro de
            Freitas. Filtre por tipo e autonomia para encontrar o modelo ideal.
          </p>
        </div>
        <CatalogFilters vehicles={vehicles} />
      </div>
    </section>
  );
}
