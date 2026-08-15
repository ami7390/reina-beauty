import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { maintenanceEnabled, settingsDb } from "@/lib/site-settings";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  return NextResponse.json({ enabled: await maintenanceEnabled() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const body = await request.json() as { enabled?: boolean };
  const db = await settingsDb();
  await db.prepare("INSERT INTO site_settings (key,value,updated_at) VALUES ('maintenance_mode',?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at").bind(body.enabled ? "on" : "off", Date.now()).run();
  return NextResponse.json({ enabled: Boolean(body.enabled) });
}
