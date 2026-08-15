'use client';

import type { ImgHTMLAttributes } from 'react';
import { useSiteImage } from '@/components/site-media-provider';

export function ManagedImage({ src, alt, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src: string; alt: string }) {
  const resolved = useSiteImage(src);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={resolved} alt={alt} decoding={props.decoding ?? 'async'} {...props} />;
}
