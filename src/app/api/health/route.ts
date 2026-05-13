import { NextResponse } from 'next/server';

/**
 * Health check endpoint - giữ Supabase project sống
 * UptimeRobot ping endpoint này mỗi 5 phút
 * Cũng dùng để kiểm tra status hệ thống
 */
export async function GET() {
  const status: Record<string, unknown> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    services: {} as Record<string, string>,
  };

  const services = status.services as Record<string, string>;

  // Check Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (supabaseUrl.length > 10 && supabaseUrl.startsWith('http')) {
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
    services.database = 'demo_mode';
  }

  // Check Cloudinary
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  services.image_storage = cloudName ? `cloudinary:${cloudName}` : 'base64_fallback';

  // Check upload preset
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;
  services.upload_preset = uploadPreset || 'not_configured';

  return NextResponse.json(status, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
