const COOKIE_NAME = "reina_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function signingKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createAdminSessionToken() {
  const key = await signingKey();
  if (!key) throw new Error("ADMIN_SESSION_SECRET n'est pas configuré.");
  const payload = `admin:${Math.floor(Date.now() / 1000) + SESSION_SECONDS}`;
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload)));
  return `${payload}.${bytesToBase64Url(signature)}`;
}

export async function verifyAdminSessionToken(token: string | undefined | null) {
  if (!token) return false;
  const separator = token.lastIndexOf(".");
  if (separator < 0) return false;
  const payload = token.slice(0, separator);
  const signatureText = token.slice(separator + 1);
  const [role, expiryText] = payload.split(":");
  const expiry = Number(expiryText);
  if (role !== "admin" || !Number.isFinite(expiry) || expiry <= Math.floor(Date.now() / 1000)) return false;
  const key = await signingKey();
  if (!key) return false;
  try {
    return await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBytes(signatureText),
      new TextEncoder().encode(payload),
    );
  } catch {
    return false;
  }
}

export function adminCookieName() {
  return COOKIE_NAME;
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}

export function adminPasswordConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

export function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || candidate.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i += 1) diff |= expected.charCodeAt(i) ^ candidate.charCodeAt(i);
  return diff === 0;
}
