import { supabaseRest } from '@/lib/supabase-rest';

type SettingRow = { key: string; value: string; updated_at: number };
let memory: { value: boolean; expires: number } | null = null;

export async function maintenanceEnabled() {
  if (memory && memory.expires > Date.now()) return memory.value;
  try {
    const rows = await supabaseRest<SettingRow[]>('site_settings?key=eq.maintenance_mode&select=key,value,updated_at');
    const value = rows[0]?.value === 'on';
    memory = { value, expires: Date.now() + 5000 };
    return value;
  } catch {
    return false;
  }
}

export async function setMaintenanceEnabled(enabled: boolean) {
  await supabaseRest('site_settings?on_conflict=key', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ key: 'maintenance_mode', value: enabled ? 'on' : 'off', updated_at: Date.now() }),
  }, { admin: true });
  memory = { value: enabled, expires: Date.now() + 5000 };
}
