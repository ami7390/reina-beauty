import { NextResponse } from 'next/server';
import { listCatalogProducts } from '@/lib/catalog-products';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await listCatalogProducts(true);
    return NextResponse.json({ products: products.map(({ id,title,category,description,price,image_url,badge }) => ({ id,title,category,description,price,image_url,badge })) });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
