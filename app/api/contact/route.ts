import { NextResponse } from "next/server";
import { ensureMessagesTable } from "@/lib/contact-messages";

const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    if (clean(body.website, 100)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const phone = clean(body.phone, 40);
    const email = clean(body.email, 160);
    const subject = clean(body.subject, 120);
    const message = clean(body.message, 2000);
    if (name.length < 2 || phone.length < 6 || subject.length < 2 || message.length < 10) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs obligatoires." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "L’adresse e-mail n’est pas valide." }, { status: 400 });
    }

    const db = await ensureMessagesTable();
    await db.prepare("INSERT INTO contact_messages (name, phone, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, 'unread', ?)")
      .bind(name, phone, email || null, subject, message, Date.now()).run();
    return NextResponse.json({ ok: true, message: "Votre message a bien été envoyé à Reina Beauty." });
  } catch (error) {
    console.error("contact-message-error", error);
    return NextResponse.json({ error: "L’envoi est momentanément indisponible. Vous pouvez nous écrire sur WhatsApp." }, { status: 500 });
  }
}
