import { readJsonSnapshot, writeJsonSnapshot } from '@/lib/blob-json-store';

export type SiteMediaOverrides = Record<string, string>;
const PREFIX = 'reina-data/site-media/';

export async function getSiteMediaOverrides(): Promise<SiteMediaOverrides> {
  return readJsonSnapshot<SiteMediaOverrides>(PREFIX, {});
}
export async function setSiteMediaOverride(path: string, url?: string) {
  const current = await getSiteMediaOverrides();
  if (url) current[path] = url;
  else delete current[path];
  await writeJsonSnapshot(PREFIX, current);
  return current;
}
