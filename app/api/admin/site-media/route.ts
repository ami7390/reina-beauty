import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { SITE_IMAGE_SLOTS } from '@/lib/site-image-slots';
import { getSiteMediaOverrides, setSiteMediaOverride } from '@/lib/site-media-store';
const allowed = new Set<string>(SITE_IMAGE_SLOTS.map(([path]) => path));
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  return NextResponse.json({ images: await getSiteMediaOverrides() });
}
export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const body = await request.json() as { path?: string; url?: string | null };
  if (!body.path || !allowed.has(body.path)) return NextResponse.json({ error: 'Emplacement d’image invalide.' }, { status: 400 });
  try {
    const images = await setSiteMediaOverride(body.path, body.url || undefined);
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Impossible d’enregistrer cette image.' }, { status: 503 });
  }
}
