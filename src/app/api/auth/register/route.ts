import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';

export async function POST(request: NextRequest) {
  const provider = getDatabaseProvider();

  if (provider === 'demo') {
    return NextResponse.json({ error: 'Demo mode - đăng ký không khả dụng' }, { status: 400 });
  }

  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Vui lòng nhập email và mật khẩu' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu tối thiểu 6 ký tự' }, { status: 400 });
    }

    if (provider === 'neon') {
      const { register } = await import('@/lib/neon/auth');
      const { user, needsApproval } = await register(email, password, fullName || 'Giáo viên');
      
      if (needsApproval) {
        return NextResponse.json({
          success: true,
          needsApproval: true,
          message: 'Đăng ký thành công! Tài khoản đang chờ admin duyệt. Bạn sẽ nhận thông báo qua email khi được duyệt.',
          user: { email: user.email, full_name: user.full_name },
        });
      }
      
      return NextResponse.json({ user });
    }

    return NextResponse.json({ error: 'Provider not supported' }, { status: 501 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Đăng ký thất bại';
    if (message.includes('duplicate') || message.includes('unique')) {
      return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
