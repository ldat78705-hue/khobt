import { NextRequest, NextResponse } from 'next/server';
import { createResetToken } from '@/lib/neon/auth';
import { sendResetPasswordEmail, isSmtpConfigured } from '@/lib/email';
import { getDb } from '@/lib/neon/client';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email không được để trống' }, { status: 400 });
    }

    const result = await createResetToken(email);

    // Always return success to prevent email enumeration
    if (!result) {
      return NextResponse.json({
        success: true,
        message: 'Nếu email tồn tại, link khôi phục sẽ được gửi.',
        smtpConfigured: isSmtpConfigured(),
      });
    }

    // Build reset URL
    const baseUrl = request.headers.get('origin') || request.nextUrl.origin;
    const resetUrl = `${baseUrl}/reset-password?token=${result.token}`;

    // Get user name for email
    const sql = getDb();
    const users = await sql`SELECT full_name FROM public.users WHERE id = ${result.userId}`;
    const userName = users[0]?.full_name || '';

    // Try sending email via SMTP
    const emailSent = await sendResetPasswordEmail(email, resetUrl, userName);

    console.log(`[RESET] Email: ${email}, Sent: ${emailSent}, URL: ${resetUrl}`);

    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Link khôi phục đã được gửi tới email của bạn.'
        : 'Link khôi phục đã được tạo.',
      emailSent,
      // Return reset URL only when SMTP is not configured (internal use)
      resetUrl: !emailSent ? resetUrl : undefined,
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Đã có lỗi xảy ra' }, { status: 500 });
  }
}
