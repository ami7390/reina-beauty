import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { uploadSupabaseImage } from '@/lib/supabase-rest';

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
    const url = await uploadSupabaseImage(file, scope);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Le stockage Supabase est indisponible.' }, { status: 503 });
  }
}
