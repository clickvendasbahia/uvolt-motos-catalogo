import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Localização | UVOLT Salvador',
  description: 'Encontre a UVOLT em Salvador: Av. Jequitaia, 319 – Calçada – Salvador/BA.',
};

export default function LocalizacaoPage() {
  return (
    <section className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-extrabold text-mist md:text-5xl">Onde estamos</h1>
        <p className="mt-4 text-slate">Av. Jequitaia, 319 – Calçada – Salvador/BA</p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/5">
          <iframe
            title="Localização UVOLT"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Av.+Jequitaia,+319,+Cal%C3%A7ada,+Salvador+-+BA&output=embed"
          />
        </div>

        <a
          href="https://wa.me/5571993757208"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-neon px-6 py-3 text-sm font-bold text-graphite shadow-glow-lime"
        >
          Falar no WhatsApp
        </a>
      </div>
    </section>
  );
}
