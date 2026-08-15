'use client';

import { ImagePlus, LoaderCircle, RotateCcw, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SITE_IMAGE_SLOTS } from '@/lib/site-image-slots';
import { optimizeImageFile } from '@/lib/client-image';

type Overrides = Record<string, string>;

export function AdminSiteImages() {
  const [images, setImages] = useState<Overrides>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/site-media').then(async (response) => {
      const data = await response.json() as { images?: Overrides; error?: string };
      if (!response.ok) throw new Error(data.error || 'Impossible de charger les images.');
      setImages(data.images ?? {});
    }).catch((reason: Error) => setError(reason.message));
  }, []);

  async function changeImage(path: string, file: File) {
    setBusy(path); setError('');
    try {
      const optimized = await optimizeImageFile(file);
      const form = new FormData(); form.append('image', optimized); form.append('scope', 'site');
      const upload = await fetch('/api/admin/uploads', { method: 'POST', body: form });
      const uploaded = await upload.json() as { url?: string; error?: string };
      if (!upload.ok || !uploaded.url) throw new Error(uploaded.error || 'Échec de l’upload.');
      const save = await fetch('/api/admin/site-media', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path, url: uploaded.url }) });
      const data = await save.json() as { images?: Overrides; error?: string };
      if (!save.ok) throw new Error(data.error || 'Échec de l’enregistrement.');
      setImages(data.images ?? {});
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Une erreur est survenue.'); }
    finally { setBusy(null); }
  }

  async function reset(path: string) {
    setBusy(path); setError('');
    try {
      const response = await fetch('/api/admin/site-media', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path, url: null }) });
      const data = await response.json() as { images?: Overrides; error?: string };
      if (!response.ok) throw new Error(data.error || 'Impossible de restaurer l’image.');
      setImages(data.images ?? {});
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Une erreur est survenue.'); }
    finally { setBusy(null); }
  }

  return <section id="images-site" className="mt-20 border-t border-[#e8d3d8] pt-12">
    <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a14d60]">Médias du site</p>
    <h2 className="mt-2 font-serif text-4xl font-bold text-[#4b2029]">Changer les images</h2>
    <p className="mt-3 max-w-3xl text-sm leading-6 text-[#766267]">Choisissez une photo depuis votre ordinateur. Elle est automatiquement redimensionnée et convertie en WebP avant l’envoi afin de préserver la vitesse du site.</p>
    {error && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">{error}</p>}
    <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {SITE_IMAGE_SLOTS.map(([path, label, group]) => {
        const current = images[path] || path; const loading = busy === path;
        return <article key={path} className="overflow-hidden rounded-3xl border border-[#ead9dc] bg-white shadow-sm">
          <div className="relative h-52 bg-[#f8ecee]"><img src={current} alt={label} className="h-full w-full object-cover" loading="lazy" decoding="async" /></div>
          <div className="p-5"><p className="text-[9px] font-bold uppercase tracking-wider text-[#a14d60]">{group}</p><h3 className="mt-1 font-serif text-xl font-bold text-[#4b2029]">{label}</h3><p className="mt-1 truncate text-[9px] text-[#8b7378]">{path}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#6f2636] px-4 py-2.5 text-[9px] font-bold uppercase text-white">{loading ? <LoaderCircle className="size-4 animate-spin" /> : <ImagePlus className="size-4" />} Choisir une photo<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={loading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void changeImage(path, file); event.currentTarget.value = ''; }} /></label>
              {images[path] && <button type="button" disabled={loading} onClick={() => void reset(path)} className="inline-flex items-center gap-2 rounded-full border border-[#d8b9c0] px-4 py-2.5 text-[9px] font-bold uppercase text-[#6f2636]"><RotateCcw className="size-4" /> Originale</button>}
            </div>
            {images[path] && <p className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-green-700"><Save className="size-3.5" /> Image personnalisée active</p>}
          </div>
        </article>;
      })}
    </div>
  </section>;
}
