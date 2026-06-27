import { whatsappLink } from '@/lib/whatsapp';

export default function WhatsAppButton({
  vehicleName,
  fixed = false,
  label = 'Quero essa moto no WhatsApp',
}: {
  vehicleName: string;
  fixed?: boolean;
  label?: string;
}) {
  const href = whatsappLink(vehicleName);

  if (fixed) {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-graphite/95 px-5 py-4 backdrop-blur-xl md:hidden">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-full bg-neon px-6 py-4 text-base font-bold text-graphite shadow-glow-lime transition active:scale-95"
        >
          {label}
        </a>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-neon px-6 py-3 text-sm font-bold text-graphite shadow-glow-lime transition hover:scale-[1.02] active:scale-95"
    >
      {label}
    </a>
  );
}
