'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Overrides = Record<string, string>;
const SiteMediaContext = createContext<Overrides>({});

export function SiteMediaProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<Overrides>({});
  useEffect(() => {
    fetch('/api/site-media', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data: { images?: Overrides }) => setImages(data.images ?? {}))
      .catch(() => undefined);
  }, []);
  const value = useMemo(() => images, [images]);
  return <SiteMediaContext.Provider value={value}>{children}</SiteMediaContext.Provider>;
}

export function useSiteImage(src: string) {
  const images = useContext(SiteMediaContext);
  return src.startsWith('/images/') ? (images[src] || src) : src;
}
