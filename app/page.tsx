import Link from 'next/link';
import Image from 'next/image';
import { getVehicles } from '@/lib/vehicles';
import VehicleCard from '@/components/VehicleCard';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const vehicles = await getVehicles();
  const featured = vehicles.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-grid-fade px-5 pb-20 pt-24 md:px-8 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-block rounded-full border border-white/10 bg-carbon px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon">
            Mobilidade elétrica para a Bahia
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-mist sm:text-6xl md:text-7xl">
            O futuro roda <span className="text-electric">elétrico</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-slate md:text-lg">
            A UVOLT é referência em motos elétricas e bicicletas elétricas em
            Salvador e Lauro de Freitas. Performance, tecnologia e design em
            cada modelo do nosso catálogo.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/catalogo"
              className="w-full rounded-full bg-electric px-8 py-4 text-center text-base font-bold text-graphite shadow-glow transition hover:scale-[1.02] sm:w-auto"
            >
              Ver catálogo completo
            </Link>
            <a
              href="https://wa.me/5571993757208"
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-full border border-white/10 bg-carbon px-8 py-4 text-center text-base font-bold text-mist transition hover:border-white/20 sm:w-auto"
            >
              Falar com a UVOLT
            </a>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/5">
            <Image
              src={vehicles[0]?.images[0] ?? '/vehicles/max-12-maj.svg'}
              alt="UVOLT showroom"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-mist md:text-3xl">Destaques do catálogo</h2>
            <Link href="/catalogo" className="text-sm font-semibold text-electric hover:underline">
              Ver tudo →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-carbon px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          {[
            { title: 'Autonomia real', desc: 'Baterias de alta densidade testadas para o trânsito de Salvador.' },
            { title: 'Tecnologia embarcada', desc: 'Painéis digitais, conectividade e segurança em cada modelo.' },
            { title: 'Suporte local', desc: 'Atendimento direto via WhatsApp, em Salvador e Lauro de Freitas.' },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="text-lg font-bold text-mist">{f.title}</h3>
              <p className="mt-2 text-sm text-slate">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
