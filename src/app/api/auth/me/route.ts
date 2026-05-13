import { NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';

export async function GET() {
  const provider = getDatabaseProvider();

  try {
    if (provider === 'neon') {
      const { getCurrentUser } = await import('@/lib/neon/auth');
      const user = await getCurrentUser();
      if (!user) {
        return NextResponse.json({ user: null }, { status: 401 });
      }
      return NextResponse.json({ user });
    }

    if (provider === 'supabase') {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ user: null }, { status: 401 });
      }
      // Get profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      return NextResponse.json({ user: profile || { id: user.id, email: user.email } });
    }

    // Demo mode
    return NextResponse.json({ user: null, demo: true });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
