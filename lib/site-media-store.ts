import { supabaseRest } from '@/lib/supabase-rest';

export type SiteMediaOverrides = Record<string, string>;
type SiteMediaRow = { path: string; url: string };

export async function getSiteMediaOverrides(): Promise<SiteMediaOverrides> {
  const rows = await supabaseRest<SiteMediaRow[]>('site_media?select=path,url');
  return Object.fromEntries(rows.map((row) => [row.path, row.url]));
}

export async function setSiteMediaOverride(path: string, url?: string) {
  if (url) {
    await supabaseRest('site_media?on_conflict=path', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ path, url, updated_at: Date.now() }),
    }, { admin: true });
  } else {
    await supabaseRest(`site_media?path=eq.${encodeURIComponent(path)}`, {
      method: 'DELETE',
      headers: { Prefer: 'return=minimal' },
    }, { admin: true });
  }
  return getSiteMediaOverrides();
}
