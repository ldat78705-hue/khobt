import { NextResponse } from 'next/server';

/**
 * Health check endpoint
 * - UptimeRobot ping để kiểm tra system status
 * - Không cần giữ Supabase sống nữa (đã chuyển Neon - scale-to-zero 350ms)
 */
export async function GET() {
  const status: Record<string, unknown> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '2.1.0',
    services: {} as Record<string, string>,
    provider: 'unknown',
  };

  const services = status.services as Record<string, string>;

  // Detect database provider
  const databaseUrl = process.env.DATABASE_URL || '';
  const isNeon = databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isSupabase = supabaseUrl.length > 10 && supabaseUrl.startsWith('http');

  if (isNeon) {
    status.provider = 'neon';
    try {
      const { getDb } = await import('@/lib/neon/client');
      const sql = getDb();
      const result = await sql`SELECT COUNT(*) as count FROM public.categories`;
      services.database = `connected (${result[0]?.count} categories)`;
    } catch (e) {
      services.database = `error: ${e instanceof Error ? e.message : 'unknown'}`;
    }
  } else if (isSupabase) {
    status.provider = 'supabase';
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/categories?select=id&limit=1`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''}`,
        },
        next: { revalidate: 0 },
      });
      services.database = res.ok ? 'connected' : 'error';
    } catch {
      services.database = 'unreachable';
    }
  } else {
    status.provider = 'demo';
    services.database = 'demo_mode (localStorage)';
  }

  // Check Cloudinary
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  services.image_storage = cloudName ? `cloudinary:${cloudName}` : 'base64_fallback';
  services.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET || 'not_configured';

  return NextResponse.json(status, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}
