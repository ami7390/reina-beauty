import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { ensureProductsTable } from "@/lib/catalog-products";

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const id = Number((await params).id), body = await request.json() as Record<string, unknown>;
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Produit invalide." }, { status: 400 });
  const db = await ensureProductsTable();
  await db.prepare("UPDATE catalog_products SET title=?, category=?, description=?, price=?, image_url=?, badge=?, published=? WHERE id=?").bind(clean(body.title,120), clean(body.category,60), clean(body.description,800), clean(body.price,40), clean(body.imageUrl,500), clean(body.badge,40)||"Nouveau", body.published ? 1 : 0, id).run();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Produit invalide." }, { status: 400 });
  const db = await ensureProductsTable();
  await db.prepare("DELETE FROM catalog_products WHERE id=?").bind(id).run();
  return NextResponse.json({ ok: true });
}
