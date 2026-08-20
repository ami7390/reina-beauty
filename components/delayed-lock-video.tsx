"use client";

import { useEffect, useRef, useState } from "react";
import { ManagedImage } from "@/components/managed-image";

export function DelayedLockVideo({
  image,
  video,
  alt,
  highlight,
}: {
  image: string;
  video: string;
  alt: string;
  highlight?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  const startVideo = () => {
    if (startedRef.current) return;
    const element = videoRef.current;
    if (!element) return;
    startedRef.current = true;
    element.play().catch(() => {
      startedRef.current = false;
    });
  };

  useEffect(() => {
    const timer = window.setTimeout(startVideo, 30000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative h-72 overflow-hidden bg-black"
      onPointerEnter={startVideo}
    >
      <ManagedImage
        src={image}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        controls
        preload="none"
        poster={image}
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        aria-label={`Vidéo ${alt}`}
      >
        <source src={video} type="video/mp4" />
      </video>
      {highlight && (
        <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-luxury-wine/90 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
          {highlight}
        </span>
      )}
    </div>
  );
}
