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
      const { register, setSessionCookie } = await import('@/lib/neon/auth');
      const { user, token } = await register(email, password, fullName || 'Giáo viên');
      await setSessionCookie(token);
      return NextResponse.json({ user });
    }

    // Supabase mode
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName || 'Giáo viên' } },
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ user: data.user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Đăng ký thất bại';
    if (message.includes('duplicate') || message.includes('unique')) {
      return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 409 });
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
