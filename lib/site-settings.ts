import { getCloudflareBindings } from '@/lib/cloudflare-bindings';
import { readJsonSnapshot, writeJsonSnapshot } from '@/lib/blob-json-store';

type SiteSettings = { maintenance: boolean; updatedAt: number };
const SETTINGS_PREFIX = 'reina-data/site-settings/';
const FALLBACK: SiteSettings = { maintenance: false, updatedAt: 0 };
let memory: { value: boolean; expires: number } | null = null;

const createSettingsSql = `CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL
)`;

export async function maintenanceEnabled() {
  if (memory && memory.expires > Date.now()) return memory.value;
  const { DB } = await getCloudflareBindings();
  let value = false;
  if (DB) {
    try {
      await DB.prepare(createSettingsSql).run();
      const row = await DB.prepare("SELECT value FROM site_settings WHERE key='maintenance_mode'").first<{ value: string }>();
      value = row?.value === 'on';
    } catch { value = false; }
  } else {
    value = (await readJsonSnapshot<SiteSettings>(SETTINGS_PREFIX, FALLBACK)).maintenance;
  }
  memory = { value, expires: Date.now() + 5000 };
  return value;
}

export async function setMaintenanceEnabled(enabled: boolean) {
  const { DB } = await getCloudflareBindings();
  if (DB) {
    await DB.prepare(createSettingsSql).run();
    await DB.prepare("INSERT INTO site_settings (key,value,updated_at) VALUES ('maintenance_mode',?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at")
      .bind(enabled ? 'on' : 'off', Date.now()).run();
  } else {
    await writeJsonSnapshot<SiteSettings>(SETTINGS_PREFIX, { maintenance: enabled, updatedAt: Date.now() });
  }
  memory = { value: enabled, expires: Date.now() + 5000 };
}
