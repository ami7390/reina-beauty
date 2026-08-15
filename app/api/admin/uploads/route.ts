import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { getCloudflareBindings } from '@/lib/cloudflare-bindings';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const safeScope = (value: FormDataEntryValue | null) => typeof value === 'string' && /^[a-z0-9-]{1,30}$/i.test(value) ? value : 'products';

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const data = await request.formData();
  const file = data.get('image');
  const scope = safeScope(data.get('scope'));
  if (!(file instanceof File) || !allowedTypes.has(file.type)) return NextResponse.json({ error: 'Choisissez une image JPG, PNG, WebP ou AVIF.' }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: 'L’image optimisée doit rester sous 4 Mo.' }, { status: 400 });

  try {
    if (process.env.VERCEL || process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN) {
      const extension = file.type.split('/')[1].replace('jpeg', 'jpg');
      const pathname = `reina-images/${scope}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const blob = await put(pathname, file, { access: 'public', addRandomSuffix: false, cacheControlMaxAge: 31536000 });
      return NextResponse.json({ url: blob.url }, { status: 201 });
    }
    const { BUCKET } = await getCloudflareBindings();
    if (!BUCKET) throw new Error('Aucun stockage d’images n’est configuré.');
    const extension = file.type.split('/')[1].replace('jpeg', 'jpg');
    const key = `${scope}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    await BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' } });
    return NextResponse.json({ url: `/api/media/${key}` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Le stockage de l’image est indisponible.' }, { status: 503 });
  }
}
