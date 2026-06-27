import Link from 'next/link';

const links = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/localizacao', label: 'Localização' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-graphite/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-mist">
          U<span className="text-electric">VOLT</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate transition hover:text-mist"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          href="/catalogo"
          className="rounded-full bg-electric px-5 py-2 text-sm font-semibold text-graphite transition hover:shadow-glow md:hidden"
        >
          Catálogo
        </Link>
        <a
          href="https://wa.me/5571993757208"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-electric px-5 py-2 text-sm font-semibold text-graphite transition hover:shadow-glow md:inline-block"
        >
          Fale com a UVOLT
        </a>
      </nav>
    </header>
  );
}
