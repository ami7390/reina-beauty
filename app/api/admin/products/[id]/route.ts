import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { deleteCatalogProduct, updateCatalogProduct } from '@/lib/catalog-products';

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const id = Number((await params).id), body = await request.json() as Record<string, unknown>;
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Produit invalide.' }, { status: 400 });
  try {
    await updateCatalogProduct(id, {
      title: clean(body.title,120), category: clean(body.category,60), description: clean(body.description,800),
      price: clean(body.price,40), image_url: clean(body.imageUrl,1000), badge: clean(body.badge,40) || 'Nouveau', published: body.published ? 1 : 0,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Impossible de modifier le produit.' }, { status: 503 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Produit invalide.' }, { status: 400 });
  try { await deleteCatalogProduct(id); return NextResponse.json({ ok: true }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Impossible de supprimer le produit.' }, { status: 503 }); }
}
