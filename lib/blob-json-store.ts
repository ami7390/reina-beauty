import { del, list, put } from '@vercel/blob';

const stamp = (value: Date | string) => typeof value === 'string' ? Date.parse(value) : value.getTime();

export async function readJsonSnapshot<T>(prefix: string, fallback: T): Promise<T> {
  try {
    const { blobs } = await list({ prefix, limit: 100 });
    if (!blobs.length) return fallback;
    const latest = [...blobs].sort((a, b) => stamp(b.uploadedAt) - stamp(a.uploadedAt))[0];
    const response = await fetch(`${latest.url}?v=${stamp(latest.uploadedAt)}`, { cache: 'no-store' });
    if (!response.ok) return fallback;
    return await response.json() as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonSnapshot<T>(prefix: string, data: T): Promise<void> {
  const { blobs: previous } = await list({ prefix, limit: 100 });
  const pathname = `${prefix}${Date.now()}-${crypto.randomUUID()}.json`;
  await put(pathname, JSON.stringify(data), {
    access: 'public',
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60,
    addRandomSuffix: false,
  });
  if (previous.length) await del(previous.map((blob) => blob.url)).catch(() => undefined);
}
