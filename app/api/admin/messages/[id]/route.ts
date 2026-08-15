import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { deleteMessage, listMessages, setMessageStatus } from '@/lib/contact-messages';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  try { return NextResponse.json({ messages: await listMessages() }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Messages indisponibles.', messages: [] }, { status: 503 }); }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const id = Number((await params).id);
  const body = await request.json() as { status?: string };
  if (!Number.isInteger(id) || !['read', 'unread'].includes(body.status ?? '')) return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  await setMessageStatus(id, body.status as 'read' | 'unread');
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  await deleteMessage(id);
  return NextResponse.json({ ok: true });
}
