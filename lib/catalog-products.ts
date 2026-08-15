import { supabaseRest } from '@/lib/supabase-rest';

export type CatalogProduct = {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  image_url: string;
  badge: string;
  published: number;
  created_at: number;
};
export type ProductInput = Omit<CatalogProduct, 'id' | 'created_at'>;

type ProductRow = Omit<CatalogProduct, 'published'> & { published: boolean };
const fromRow = (row: ProductRow): CatalogProduct => ({ ...row, published: row.published ? 1 : 0 });
const toRow = (input: ProductInput) => ({ ...input, published: Boolean(input.published) });

export async function listCatalogProducts(publishedOnly = false): Promise<CatalogProduct[]> {
  const filter = publishedOnly ? '&published=eq.true' : '';
  const rows = await supabaseRest<ProductRow[]>(`catalog_products?select=*&order=created_at.desc${filter}`, {}, { admin: !publishedOnly });
  return rows.map(fromRow);
}

export async function createCatalogProduct(input: ProductInput) {
  const rows = await supabaseRest<ProductRow[]>('catalog_products?select=*', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ ...toRow(input), created_at: Date.now() }),
  }, { admin: true });
  return rows[0] ? fromRow(rows[0]) : null;
}

export async function updateCatalogProduct(id: number, input: ProductInput) {
  await supabaseRest(`catalog_products?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(toRow(input)),
  }, { admin: true });
}

export async function deleteCatalogProduct(id: number) {
  await supabaseRest(`catalog_products?id=eq.${id}`, {
    method: 'DELETE',
    headers: { Prefer: 'return=minimal' },
  }, { admin: true });
}
