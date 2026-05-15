import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();
  
  // Single question by ID
  const id = searchParams.get('id');
  if (id && provider === 'neon') {
    try {
      const question = await neonQueries.getQuestionById(id);
      if (!question) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      return NextResponse.json(question);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  
  const filters = {
    grade: searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : undefined,
    topic: searchParams.get('topic') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 500,
    offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
  };

  if (provider === 'neon') {
    try {
      const questions = await neonQueries.getQuestions(filters);
      return NextResponse.json(questions);
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
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      const data = await req.json();
      const question = await neonQueries.createQuestion({
        ...data,
        user_id: user.id,
      });
      return NextResponse.json(question);
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
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      const { id, ...updates } = await req.json();
      if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
      
      // If updating status, check permissions
      if (updates.status && updates.status !== 'draft') {
        if (user.role !== 'admin' && user.role !== 'reviewer') {
          return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
        }
        updates.reviewed_by = user.id;
        updates.reviewed_at = new Date().toISOString();
      }

      await neonQueries.updateQuestion(id, updates);
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
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    try {
      await neonQueries.deleteQuestion(id);
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
