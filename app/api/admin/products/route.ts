import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { createCatalogProduct, listCatalogProducts } from '@/lib/catalog-products';

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  try {
    return NextResponse.json({ products: await listCatalogProducts(false) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Catalogue indisponible.', products: [] }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const body = await request.json() as Record<string, unknown>;
  const title = clean(body.title, 120), category = clean(body.category, 60), description = clean(body.description, 800);
  if (title.length < 2 || !category || description.length < 10) return NextResponse.json({ error: 'Nom, catégorie et description sont obligatoires.' }, { status: 400 });
  try {
    const product = await createCatalogProduct({
      title, category, description,
      price: clean(body.price, 40), image_url: clean(body.imageUrl, 1000),
      badge: clean(body.badge, 40) || 'Nouveau', published: body.published ? 1 : 0,
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Impossible d’ajouter le produit.' }, { status: 503 });
  }
}
