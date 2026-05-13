import { NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';

export async function POST() {
  const provider = getDatabaseProvider();

  try {
    if (provider === 'neon') {
      const { logout } = await import('@/lib/neon/auth');
      await logout();
    } else if (provider === 'supabase') {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      await supabase.auth.signOut();
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true }); // Always succeed for logout
  }
}
