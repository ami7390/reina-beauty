import { requireD1 } from "@/lib/cloudflare-bindings";

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

export async function ensureProductsTable() {
  const db = await requireD1("La base de données produits est indisponible.");
  await db.batch([db.prepare(createProductsSql), db.prepare("CREATE INDEX IF NOT EXISTS catalog_products_published_idx ON catalog_products(published)")]);
  return db;
}
