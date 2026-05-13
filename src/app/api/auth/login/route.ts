import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';

export async function POST(request: NextRequest) {
  const provider = getDatabaseProvider();

  if (provider === 'demo') {
    return NextResponse.json({ error: 'Demo mode - đăng nhập tự động' }, { status: 400 });
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Vui lòng nhập email và mật khẩu' }, { status: 400 });
    }

    if (provider === 'neon') {
      const { login, setSessionCookie } = await import('@/lib/neon/auth');
      const { user, token } = await login(email, password);
      await setSessionCookie(token);
      return NextResponse.json({ user });
    }

    // Supabase mode
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ user: data.user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Đăng nhập thất bại';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
