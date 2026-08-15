import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { getCloudflareBindings } from "@/lib/cloudflare-bindings";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  const data = await request.formData();
  const file = data.get("image");
  if (!(file instanceof File) || !allowedTypes.has(file.type)) return NextResponse.json({ error: "Choisissez une image JPG, PNG, WebP ou AVIF." }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "L’image ne doit pas dépasser 5 Mo." }, { status: 400 });
  const { BUCKET } = await getCloudflareBindings();
  if (!BUCKET) return NextResponse.json({ error: "Le stockage des images est indisponible sur ce déploiement." }, { status: 503 });
  const extension = file.type.split("/")[1].replace("jpeg", "jpg");
  const key = `products/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  await BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
  return NextResponse.json({ url: `/api/media/${key}` }, { status: 201 });
}
