import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { ensureProductsTable } from "@/lib/catalog-products";

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const db = await ensureProductsTable();
  const result = await db.prepare("SELECT * FROM catalog_products ORDER BY created_at DESC").all();
  return NextResponse.json({ products: result.results });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const body = await request.json() as Record<string, unknown>;
  const title = clean(body.title, 120), category = clean(body.category, 60), description = clean(body.description, 800);
  if (title.length < 2 || !category || description.length < 10) return NextResponse.json({ error: "Nom, catégorie et description sont obligatoires." }, { status: 400 });
  const db = await ensureProductsTable();
  const result = await db.prepare("INSERT INTO catalog_products (title, category, description, price, image_url, badge, published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *").bind(title, category, description, clean(body.price, 40), clean(body.imageUrl, 500), clean(body.badge, 40) || "Nouveau", body.published ? 1 : 0, Date.now()).first();
  return NextResponse.json({ product: result }, { status: 201 });
}
