import { getCloudflareBindings } from "@/lib/cloudflare-bindings";

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  const { BUCKET } = await getCloudflareBindings();
  if (!BUCKET) return new Response("Stockage indisponible", { status: 503 });

  const object = await BUCKET.get((await params).key.join("/"));
  if (!object) return new Response("Image introuvable", { status: 404 });

  const headers = new Headers();
  if (object.httpMetadata?.contentType) {
    headers.set("content-type", object.httpMetadata.contentType);
  }
  if (object.httpMetadata?.cacheControl) {
    headers.set("cache-control", object.httpMetadata.cacheControl);
  }
  if (object.httpEtag) {
    headers.set("etag", object.httpEtag);
  }
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "public, max-age=31536000, immutable");
  }

  return new Response(object.body, { headers });
}
