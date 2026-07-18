'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

export default function VehicleGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const pics = images && images.length ? images : ['/vehicles/max-12-maj.svg'];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setZoom(false);
  }, []);

  const go = useCallback(
    (dir: number) => {
      setZoom(false);
      setActive((i) => (i + dir + pics.length) % pics.length);
    },
    [pics.length]
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, go]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-carbon"
      >
        <Image
          src={pics[active]}
          alt={name}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-graphite/80 px-3 py-1 text-xs font-medium text-mist backdrop-blur">
          Clique para ampliar
        </span>
      </button>

      {pics.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {pics.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                i === active ? 'border-electric ring-2 ring-electric/40' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <Image
                src={src}
                alt={`${name} — foto ${i + 1}`}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite/95 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-mist hover:bg-white/20"
            aria-label="Fechar"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {pics.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                className="absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-mist hover:bg-white/20"
                aria-label="Anterior"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                className="absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-mist hover:bg-white/20"
                aria-label="Próxima"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div
            className={`h-full w-full ${zoom ? 'overflow-auto' : 'flex items-center justify-center'}`}
            onClick={(e) => { e.stopPropagation(); setZoom((z) => !z); }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pics[active]}
              alt={`${name} — foto ${active + 1}`}
              className={`mx-auto transition-transform duration-200 ${
                zoom ? 'max-w-none cursor-zoom-out scale-[1.8] md:scale-[2.2]' : 'max-h-[85vh] max-w-[90vw] cursor-zoom-in object-contain'
              }`}
            />
          </div>

          {pics.length > 1 && (
            <span className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-mist">
              {active + 1} / {pics.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
