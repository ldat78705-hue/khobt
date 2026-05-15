import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser, adminResetPassword } from '@/lib/neon/auth';
import { getDb } from '@/lib/neon/client';

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
      const body = await req.json();
      const { id, new_password, ...updates } = body;
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      
      // Handle password reset
      if (new_password) {
        const success = await adminResetPassword(id, new_password);
        if (!success) return NextResponse.json({ error: 'User not found' }, { status: 404 });
        return NextResponse.json({ success: true });
      }
      
      // Handle is_approved update
      if (updates.is_approved !== undefined) {
        const sql = getDb();
        await sql`UPDATE public.users SET is_approved = ${updates.is_approved}, updated_at = NOW() WHERE id = ${id}`;
        
        // If approving, also activate the user
        if (updates.is_approved === true) {
          await sql`UPDATE public.users SET is_active = true WHERE id = ${id}`;
        }
      }
      
      // Handle other updates (role, is_active)
      const fieldUpdates: any = {};
      if (updates.role !== undefined) fieldUpdates.role = updates.role;
      if (updates.is_active !== undefined) fieldUpdates.is_active = updates.is_active;
      
      if (Object.keys(fieldUpdates).length > 0) {
        await neonQueries.updateUser(id, fieldUpdates);
      }
      
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
