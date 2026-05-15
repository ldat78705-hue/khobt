import { NextRequest, NextResponse } from 'next/server';
import { resetPassword } from '@/lib/neon/auth';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token và mật khẩu mới không được để trống' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự' },
        { status: 400 }
      );
    }

    const success = await resetPassword(token, password);

    if (!success) {
      return NextResponse.json(
        { error: 'Link khôi phục không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu link mới.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Mật khẩu đã được đổi thành công. Vui lòng đăng nhập lại.',
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Đã có lỗi xảy ra' }, { status: 500 });
  }
}
