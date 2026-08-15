import { requireD1 } from "@/lib/cloudflare-bindings";

const createSettingsSql = `CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
)`;

export async function settingsDb() {
  const db = await requireD1("La base de paramètres est indisponible.");
  await db.prepare(createSettingsSql).run();
  return db;
}

export async function maintenanceEnabled() {
  try {
    const db = await settingsDb();
    const row = await db.prepare("SELECT value FROM site_settings WHERE key='maintenance_mode'").first<{ value: string }>();
    return row?.value === "on";
  } catch { return false; }
}
