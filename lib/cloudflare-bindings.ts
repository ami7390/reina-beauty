/**
 * Runtime-only access to Cloudflare bindings.
 *
 * The application is deployed to Vercel as native Next.js. Vercel/webpack
 * cannot parse the special `cloudflare:workers` URL scheme at build time, so
 * this module deliberately hides that optional import from the bundler.
 *
 * On Vercel this returns an empty object and callers can fail gracefully.
 * On a compatible Cloudflare runtime it attempts to load the bindings module.
 */
export type CloudflareBindings = {
  DB?: D1Database;
  BUCKET?: R2Bucket;
};

let cached: Promise<CloudflareBindings> | null = null;

export function getCloudflareBindings(): Promise<CloudflareBindings> {
  if (cached) return cached;

  cached = (async () => {
    if (process.env.VERCEL) return {};

    try {
      // Keep this import opaque to webpack. A literal import("cloudflare:workers")
      // makes Next.js fail with UnhandledSchemeError before aliases are applied.
      const runtimeImport = new Function(
        "specifier",
        "return import(specifier)",
      ) as (specifier: string) => Promise<{ env?: CloudflareBindings }>;

      const mod = await runtimeImport("cloudflare:workers");
      return mod.env ?? {};
    } catch {
      return {};
    }
  })();

  return cached;
}

export async function requireD1(message = "La base de données est indisponible.") {
  const { DB } = await getCloudflareBindings();
  if (!DB) throw new Error(message);
  return DB;
}

export async function requireBucket(message = "Le stockage des images est indisponible.") {
  const { BUCKET } = await getCloudflareBindings();
  if (!BUCKET) throw new Error(message);
  return BUCKET;
}
