import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { maintenanceEnabled, setMaintenanceEnabled } from '@/lib/site-settings';

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  return NextResponse.json({ enabled: await maintenanceEnabled() });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Accès refusé.' }, { status: 403 });
  try {
    const body = await request.json() as { enabled?: boolean };
    const enabled = Boolean(body.enabled);
    await setMaintenanceEnabled(enabled);
    return NextResponse.json({ enabled });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Impossible d’enregistrer la maintenance.' }, { status: 503 });
  }
}
