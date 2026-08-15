import { NextResponse } from "next/server";
import { adminCookieName, adminCookieOptions } from "@/lib/admin-session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(adminCookieName(), "", { ...adminCookieOptions(), maxAge: 0 });
  return response;
}
