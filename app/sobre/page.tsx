import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre a UVOLT | Mobilidade Elétrica em Salvador',
  description:
    'Conheça a UVOLT, loja de motos elétricas e bicicletas elétricas em Salvador e Lauro de Freitas, referência em mobilidade elétrica na Bahia.',
};

export default function SobrePage() {
  return (
    <section className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold text-mist md:text-5xl">Sobre a UVOLT</h1>
        <p className="mt-6 text-base leading-relaxed text-slate">
          A UVOLT nasceu para acelerar a transição da mobilidade urbana em Salvador e
          Lauro de Freitas. Trabalhamos com motos elétricas e bicicletas elétricas que
          unem tecnologia, design e economia — sem abrir mão de performance real para
          o dia a dia da cidade.
        </p>
        <p className="mt-4 text-base leading-relaxed text-slate">
          Como loja de motos elétricas em Salvador, nosso compromisso é oferecer
          mobilidade elétrica acessível para a Bahia, com atendimento próximo e
          suporte direto via WhatsApp.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-carbon p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate">Endereço</p>
            <p className="mt-2 text-mist">Av. Jequitaia, 319 – Calçada – Salvador/BA</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-carbon p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate">Contato</p>
            <p className="mt-2 text-mist">WhatsApp: +55 71 99375-7208</p>
            <p className="text-mist">Instagram: @uvolt_</p>
          </div>
        </div>
      </div>
    </section>
  );
}
