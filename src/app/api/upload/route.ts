import { NextRequest, NextResponse } from 'next/server';

/**
 * Upload API - Hỗ trợ 2 chế độ:
 * 1. Cloudinary (server-side signed upload) - khi có đầy đủ env vars
 * 2. Cloudinary unsigned upload - khi chỉ có cloud_name (không cần api_secret)
 * 3. Base64 fallback - khi không có gì
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // ===== METHOD 1: Server-side signed upload (full credentials) =====
    if (cloudName && apiKey && apiSecret) {
      try {
        const { v2: cloudinary } = await import('cloudinary');
        cloudinary.config({
          cloud_name: cloudName,
          api_key: apiKey,
          api_secret: apiSecret,
        });

        const result = await cloudinary.uploader.upload(base64, {
          folder: 'khodetoan',
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        });

        return NextResponse.json({
          url: result.secure_url,
          public_id: result.public_id,
          width: result.width,
          height: result.height,
        });
      } catch (err) {
        console.warn('Cloudinary signed upload failed:', err);
        // Fall through to unsigned upload
      }
    }

    // ===== METHOD 2: Unsigned upload (only cloud_name needed) =====
    if (cloudName) {
      try {
        const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'khodetoan_unsigned';
        
        const cloudinaryForm = new FormData();
        cloudinaryForm.append('file', base64);
        cloudinaryForm.append('upload_preset', uploadPreset);
        cloudinaryForm.append('folder', 'khodetoan');

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: cloudinaryForm }
        );

        if (res.ok) {
          const data = await res.json();
          return NextResponse.json({
            url: data.secure_url,
            public_id: data.public_id,
            width: data.width,
            height: data.height,
          });
        }

        // If unsigned upload fails (preset not created), try auto-creating or fallback
        const errorData = await res.json().catch(() => ({}));
        console.warn('Cloudinary unsigned upload failed:', errorData);
        // Fall through to base64 fallback
      } catch (err) {
        console.warn('Cloudinary unsigned upload error:', err);
      }
    }

    // ===== METHOD 3: Base64 fallback =====
    console.log('Using base64 fallback for image upload');
    return NextResponse.json({
      url: base64,
      public_id: `local-${Date.now()}`,
      width: 0,
      height: 0,
      fallback: true,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
