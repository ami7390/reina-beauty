import { getCloudflareBindings } from '@/lib/cloudflare-bindings';
import { readJsonSnapshot, writeJsonSnapshot } from '@/lib/blob-json-store';

const PRODUCTS_PREFIX = 'reina-data/catalog-products/';
const createProductsSql = `CREATE TABLE IF NOT EXISTS catalog_products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  badge TEXT NOT NULL DEFAULT 'Nouveau',
  published INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
)`;

export type CatalogProduct = { id: number; title: string; category: string; description: string; price: string; image_url: string; badge: string; published: number; created_at: number };
export type ProductInput = Omit<CatalogProduct, 'id' | 'created_at'>;

async function readBlobProducts() {
  return readJsonSnapshot<CatalogProduct[]>(PRODUCTS_PREFIX, []);
}
async function writeBlobProducts(products: CatalogProduct[]) {
  await writeJsonSnapshot(PRODUCTS_PREFIX, products);
}

export async function listCatalogProducts(publishedOnly = false): Promise<CatalogProduct[]> {
  const { DB } = await getCloudflareBindings();
  if (DB) {
    await DB.batch([DB.prepare(createProductsSql), DB.prepare('CREATE INDEX IF NOT EXISTS catalog_products_published_idx ON catalog_products(published)')]);
    const sql = publishedOnly
      ? 'SELECT * FROM catalog_products WHERE published=1 ORDER BY created_at DESC'
      : 'SELECT * FROM catalog_products ORDER BY created_at DESC';
    const result = await DB.prepare(sql).all<CatalogProduct>();
    return (result.results ?? []) as CatalogProduct[];
  }
  const products = await readBlobProducts();
  return products.filter((p) => !publishedOnly || Boolean(p.published)).sort((a,b) => b.created_at - a.created_at);
}

export async function createCatalogProduct(input: ProductInput) {
  const { DB } = await getCloudflareBindings();
  const now = Date.now();
  if (DB) {
    await DB.prepare(createProductsSql).run();
    return await DB.prepare('INSERT INTO catalog_products (title, category, description, price, image_url, badge, published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *')
      .bind(input.title, input.category, input.description, input.price, input.image_url, input.badge, input.published, now).first<CatalogProduct>();
  }
  const products = await readBlobProducts();
  const nextId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const product: CatalogProduct = { ...input, id: nextId, created_at: now };
  await writeBlobProducts([product, ...products]);
  return product;
}

export async function updateCatalogProduct(id: number, input: ProductInput) {
  const { DB } = await getCloudflareBindings();
  if (DB) {
    await DB.prepare(createProductsSql).run();
    await DB.prepare('UPDATE catalog_products SET title=?, category=?, description=?, price=?, image_url=?, badge=?, published=? WHERE id=?')
      .bind(input.title, input.category, input.description, input.price, input.image_url, input.badge, input.published, id).run();
    return;
  }
  const products = await readBlobProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index < 0) throw new Error('Produit introuvable.');
  products[index] = { ...products[index], ...input };
  await writeBlobProducts(products);
}

export async function deleteCatalogProduct(id: number) {
  const { DB } = await getCloudflareBindings();
  if (DB) {
    await DB.prepare(createProductsSql).run();
    await DB.prepare('DELETE FROM catalog_products WHERE id=?').bind(id).run();
    return;
  }
  const products = await readBlobProducts();
  await writeBlobProducts(products.filter((p) => p.id !== id));
}
