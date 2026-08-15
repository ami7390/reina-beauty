import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminCookieName, verifyAdminSessionToken } from "@/lib/admin-session";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/admin") && path !== "/admin/login") {
    const valid = await verifyAdminSessionToken(request.cookies.get(adminCookieName())?.value);
    if (!valid) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (path !== "/maintenance" && !path.startsWith("/admin")) {
    const { maintenanceEnabled } = await import("@/lib/site-settings");
    if (await maintenanceEnabled()) return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|images|videos|favicon.ico).*)"],
};
