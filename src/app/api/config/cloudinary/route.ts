import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * API endpoint để lưu cấu hình Cloudinary vào file .env.local
 * POST /api/config/cloudinary
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cloud_name, api_key, api_secret, upload_preset } = body;

    if (!cloud_name) {
      return NextResponse.json({ error: 'Thiếu Cloud Name' }, { status: 400 });
    }

    // Read existing .env.local
    const envPath = path.resolve(process.cwd(), '.env.local');
    let envContent = '';
    try {
      envContent = await fs.readFile(envPath, 'utf-8');
    } catch {
      envContent = '';
    }

    // Helper to update or add env var
    const updateEnv = (content: string, key: string, value: string): string => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(content)) {
        return content.replace(regex, `${key}=${value}`);
      }
      return content + `\n${key}=${value}`;
    };

    envContent = updateEnv(envContent, 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', cloud_name);
    if (api_key && api_key !== 'KEEP_EXISTING') {
      envContent = updateEnv(envContent, 'CLOUDINARY_API_KEY', api_key);
    }
    if (api_secret && api_secret !== 'KEEP_EXISTING') {
      envContent = updateEnv(envContent, 'CLOUDINARY_API_SECRET', api_secret);
    }
    if (upload_preset) {
      envContent = updateEnv(envContent, 'CLOUDINARY_UPLOAD_PRESET', upload_preset);
    }

    await fs.writeFile(envPath, envContent, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      message: 'Đã lưu cấu hình. Khởi động lại server (npm run dev) để áp dụng.' 
    });
  } catch (error) {
    console.error('Config save error:', error);
    return NextResponse.json({ error: 'Không thể lưu cấu hình' }, { status: 500 });
  }
}

export async function GET() {
  // Return current config status (without secrets)
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const hasApiKey = !!process.env.CLOUDINARY_API_KEY;
  const hasApiSecret = !!process.env.CLOUDINARY_API_SECRET;
  
  return NextResponse.json({
    cloud_name: cloudName,
    has_api_key: hasApiKey,
    has_api_secret: hasApiSecret,
    configured: !!(cloudName && hasApiKey && hasApiSecret),
  });
}
