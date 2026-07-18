'use client';

import { useRef, useState, useCallback } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 10 * 1024 * 1024;
const BUCKET = 'vehicles';

interface UploadItem {
  id: string;
  url: string;
  uploading?: boolean;
  progress?: number;
  error?: string;
}

function uid() {
  return Math.random().toString(36).slice(2);
}

export default function ImageGalleryUploader({
  initialImages = [],
  onChange,
}: {
  initialImages?: string[];
  onChange?: (urls: string[]) => void;
}) {
  const [items, setItems] = useState<UploadItem[]>(
    initialImages.filter(Boolean).map((url) => ({ id: uid(), url }))
  );
  const [dragOver, setDragOver] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const notify = useCallback(
    (next: UploadItem[]) => onChange?.(next.filter((i) => i.url && !i.uploading && !i.error).map((i) => i.url)),
    [onChange]
  );

  async function uploadFile(file: File): Promise<string> {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) throw new Error('Supabase não configurado');

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
    const path = `${Date.now()}-${uid()}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    const valid = arr.filter((f) => {
      if (!ACCEPTED.includes(f.type)) return false;
      if (f.size > MAX_BYTES) return false;
      return true;
    });

    const invalid = arr.filter((f) => !ACCEPTED.includes(f.type) || f.size > MAX_BYTES);
    if (invalid.length) {
      alert(
        `${invalid.length} arquivo(s) ignorado(s): apenas JPG, PNG e WEBP até 10 MB são aceitos.`
      );
    }

    const newItems: UploadItem[] = valid.map((f) => ({
      id: uid(),
      url: URL.createObjectURL(f),
      uploading: true,
      progress: 0,
    }));

    setItems((prev) => {
      const next = [...prev, ...newItems];
      notify(next);
      return next;
    });

    for (let i = 0; i < valid.length; i++) {
      const file = valid[i];
      const item = newItems[i];

      // fake progress tick
      const ticker = setInterval(() => {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id && it.uploading
              ? { ...it, progress: Math.min((it.progress ?? 0) + 15, 85) }
              : it
          )
        );
      }, 200);

      try {
        const publicUrl = await uploadFile(file);
        clearInterval(ticker);
        setItems((prev) => {
          const next = prev.map((it) =>
            it.id === item.id ? { id: it.id, url: publicUrl, uploading: false, progress: 100 } : it
          );
          notify(next);
          return next;
        });
      } catch (err: unknown) {
        clearInterval(ticker);
        const msg = err instanceof Error ? err.message : 'Erro no upload';
        setItems((prev) => {
          const next = prev.map((it) =>
            it.id === item.id ? { ...it, uploading: false, error: msg, progress: undefined } : it
          );
          notify(next);
          return next;
        });
      }
    }
  }

  function remove(id: string) {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id);
      notify(next);
      return next;
    });
  }

  function onDragStart(index: number) {
    dragItem.current = index;
  }

  function onDragEnter(index: number) {
    dragOverItem.current = index;
    setItems((prev) => {
      if (dragItem.current === null || dragItem.current === index) return prev;
      const next = [...prev];
      const [moved] = next.splice(dragItem.current, 1);
      next.splice(index, 0, moved);
      dragItem.current = index;
      notify(next);
      return next;
    });
  }

  function onDragEnd() {
    dragItem.current = null;
    dragOverItem.current = null;
  }

  const urls = items.filter((i) => i.url && !i.uploading && !i.error).map((i) => i.url);

  return (
    <div className="md:col-span-2">
      <label className="text-xs font-medium uppercase tracking-wide text-slate">
        Imagens do veículo
      </label>
      <p className="mt-1 text-xs text-slate/70">
        A primeira imagem será a capa. Arraste para reordenar.
      </p>

      {/* Hidden input para passar URLs ao form server action */}
      <input type="hidden" name="images_json" value={JSON.stringify(urls)} />

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed py-10 transition ${
          dragOver ? 'border-electric bg-electric/10' : 'border-white/15 hover:border-electric/50'
        }`}
      >
        <svg className="mb-3 h-8 w-8 text-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="text-sm font-medium text-mist">Clique ou arraste as imagens aqui</p>
        <p className="mt-1 text-xs text-slate">JPG, PNG, WEBP · máx. 10 MB cada</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Gallery grid */}
      {items.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragEnter={() => onDragEnter(index)}
              onDragEnd={onDragEnd}
              className="relative aspect-square cursor-grab overflow-hidden rounded-xl border border-white/10 bg-carbon active:cursor-grabbing"
            >
              {/* Cover badge */}
              {index === 0 && !item.uploading && !item.error && (
                <span className="absolute left-1.5 top-1.5 z-10 rounded-full bg-electric px-2 py-0.5 text-[10px] font-bold text-graphite">
                  CAPA
                </span>
              )}

              {/* Thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt=""
                className={`h-full w-full object-cover transition ${item.uploading ? 'opacity-40' : 'opacity-100'}`}
              />

              {/* Progress overlay */}
              {item.uploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-graphite/60">
                  <div className="h-1.5 w-3/4 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-electric transition-all duration-200"
                      style={{ width: `${item.progress ?? 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-mist">{item.progress ?? 0}%</span>
                </div>
              )}

              {/* Error overlay */}
              {item.error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-flame/20 p-2">
                  <span className="text-center text-[10px] text-flame">{item.error}</span>
                </div>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(item.id); }}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-graphite/80 text-mist hover:bg-flame"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
