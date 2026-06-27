export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-carbon py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-xl font-bold text-mist">
            U<span className="text-electric">VOLT</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-slate">
            Motos e bicicletas elétricas em Salvador e Lauro de Freitas. Mobilidade
            elétrica para a Bahia.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">Contato</p>
          <ul className="mt-3 space-y-2 text-sm text-slate">
            <li>WhatsApp: +55 71 99375-7208</li>
            <li>Instagram: @uvolt_</li>
            <li>Av. Jequitaia, 319 – Calçada – Salvador/BA</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-mist">UVOLT</p>
          <p className="mt-3 text-sm text-slate">
            Loja de motos elétricas em Salvador especializada em mobilidade elétrica
            urbana e bicicletas elétricas para Salvador e Lauro de Freitas.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs text-slate/60 md:px-8">
        © {new Date().getFullYear()} UVOLT. Todos os direitos reservados.
      </p>
    </footer>
  );
}
