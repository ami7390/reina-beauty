import { NextResponse } from 'next/server';
import { getSiteMediaOverrides } from '@/lib/site-media-store';
export const dynamic = 'force-dynamic';
export async function GET() {
  return NextResponse.json({ images: await getSiteMediaOverrides() }, { headers: { 'Cache-Control': 'no-store' } });
}
