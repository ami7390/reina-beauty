import { NextResponse } from "next/server";
import { ensureProductsTable } from "@/lib/catalog-products";

export async function GET() {
  const db = await ensureProductsTable();
  const result = await db.prepare("SELECT id, title, category, description, price, image_url, badge FROM catalog_products WHERE published=1 ORDER BY created_at DESC").all();
  return NextResponse.json({ products: result.results });
}
