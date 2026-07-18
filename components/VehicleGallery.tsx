'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function VehicleGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const pics = images && images.length ? images : ['/vehicles/max-12-maj.svg'];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/5 bg-carbon">
        <Image
          src={pics[active]}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>

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
    </div>
  );
}
