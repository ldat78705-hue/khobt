import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();
  
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const search = searchParams.get('search') || undefined;
      const users = await neonQueries.getUsers(search);
      return NextResponse.json(users);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

export async function PATCH(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const { id, role, is_active } = await req.json();
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      
      const updates: any = {};
      if (role !== undefined) updates.role = role;
      if (is_active !== undefined) updates.is_active = is_active;
      
      await neonQueries.updateUser(id, updates);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
