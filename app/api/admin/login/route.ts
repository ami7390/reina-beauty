import { NextResponse } from "next/server";
import { adminCookieName, adminCookieOptions, adminPasswordConfigured, createAdminSessionToken, passwordMatches } from "@/lib/admin-session";

export async function POST(request: Request) {
  if (!adminPasswordConfigured()) return NextResponse.json({ error: "Configuration admin manquante." }, { status: 503 });
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(adminCookieName(), await createAdminSessionToken(), adminCookieOptions());
  return response;
}
