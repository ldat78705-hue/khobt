import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

export async function GET(req: NextRequest) {
  const provider = getDatabaseProvider();
  
  if (provider === 'neon') {
    try {
      const categories = await neonQueries.getCategories();
      return NextResponse.json(categories);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const data = await req.json();
      const newCategory = await neonQueries.createCategory(data);
      return NextResponse.json(newCategory);
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
      const { id, ...updates } = await req.json();
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      
      await neonQueries.updateCategory(id, updates);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      await neonQueries.deleteCategory(id);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
