import { cookies } from "next/headers";
import { adminCookieName, verifyAdminSessionToken } from "@/lib/admin-session";

export async function isAdmin() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(adminCookieName())?.value);
}
