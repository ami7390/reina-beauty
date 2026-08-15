import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { ensureMessagesTable } from "@/lib/contact-messages";

async function authorized() {
  if (!(await isAdmin())) return null;
  return ensureMessagesTable();
}

export async function GET() {
  const db = await authorized();
  if (!db) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const result = await db.prepare("SELECT id, name, phone, email, subject, message, status, created_at FROM contact_messages ORDER BY created_at DESC").all();
  return NextResponse.json({ messages: result.results });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await authorized();
  if (!db) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const id = Number((await params).id);
  const body = await request.json() as { status?: string };
  if (!Number.isInteger(id) || !["read", "unread"].includes(body.status ?? "")) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  await db.prepare("UPDATE contact_messages SET status = ? WHERE id = ?").bind(body.status, id).run();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const db = await authorized();
  if (!db) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  await db.prepare("DELETE FROM contact_messages WHERE id = ?").bind(id).run();
  return NextResponse.json({ ok: true });
}
