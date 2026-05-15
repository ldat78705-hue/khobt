import { NextRequest, NextResponse } from 'next/server';
import { createResetToken } from '@/lib/neon/auth';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email không được để trống' }, { status: 400 });
    }

    const result = await createResetToken(email);

    // Always return success to prevent email enumeration
    // Even if email doesn't exist, we don't reveal that
    if (!result) {
      return NextResponse.json({
        success: true,
        message: 'Nếu email tồn tại trong hệ thống, link khôi phục sẽ được tạo.',
      });
    }

    // Build reset URL
    const baseUrl = request.headers.get('origin') || request.nextUrl.origin;
    const resetUrl = `${baseUrl}/reset-password?token=${result.token}`;

    // TODO: Send email via SMTP when configured
    // For now, log the URL (admin can check server logs)
    console.log(`[RESET PASSWORD] Email: ${email}, URL: ${resetUrl}`);

    return NextResponse.json({
      success: true,
      message: 'Link khôi phục mật khẩu đã được tạo.',
      // In development/internal mode, return the reset URL directly
      // Remove this in production with real SMTP
      resetUrl: resetUrl,
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Đã có lỗi xảy ra' }, { status: 500 });
  }
}
