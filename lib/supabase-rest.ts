const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_PUBLIC_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export function supabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY);
}

function keyFor(admin: boolean) {
  const key = admin ? SUPABASE_SECRET_KEY : SUPABASE_PUBLIC_KEY;
  if (!SUPABASE_URL) throw new Error('NEXT_PUBLIC_SUPABASE_URL est manquant.');
  if (!key) {
    throw new Error(admin
      ? 'SUPABASE_SECRET_KEY est manquant dans les variables d’environnement Vercel.'
      : 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY est manquant.');
  }
  return key;
}

export async function supabaseRest<T>(
  path: string,
  init: RequestInit = {},
  options: { admin?: boolean } = {},
): Promise<T> {
  const admin = Boolean(options.admin);
  const key = keyFor(admin);
  const headers = new Headers(init.headers);
  headers.set('apikey', key);
  // Les nouvelles clés sb_publishable_/sb_secret_ sont opaques : ne pas les envoyer comme JWT Bearer.
  if (!key.startsWith('sb_')) headers.set('Authorization', `Bearer ${key}`);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`Supabase ${response.status}: ${details || response.statusText}`);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function uploadSupabaseImage(file: File, scope = 'products') {
  const key = keyFor(true);
  const extension = (file.type.split('/')[1] || 'webp').replace('jpeg', 'jpg');
  const safeScope = /^[a-z0-9-]{1,30}$/i.test(scope) ? scope : 'products';
  const objectPath = `${safeScope}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const headers = new Headers({
    apikey: key,
    'Content-Type': file.type,
    'x-upsert': 'false',
    'Cache-Control': '3600',
  });
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/reina-media/${objectPath}`, {
    method: 'POST',
    headers,
    body: file,
    cache: 'no-store',
  });
  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`Upload Supabase impossible (${response.status}): ${details || response.statusText}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/reina-media/${objectPath}`;
}
