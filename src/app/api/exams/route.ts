import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();
  
  // Single exam by ID (with questions)
  const id = searchParams.get('id');
  if (id && provider === 'neon') {
    try {
      const exam = await neonQueries.getExamById(id);
      if (!exam) return NextResponse.json({ error: 'Not found' }, { status: 404 });
      const questions = await neonQueries.getExamQuestions(id);
      return NextResponse.json({ exam, questions });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  
  const filters = {
    grade: searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : undefined,
    status: (searchParams.get('status') as any) || undefined,
    search: searchParams.get('search') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
  };

  const activeTab = searchParams.get('tab') || 'shared';

  if (provider === 'neon') {
    try {
      if (activeTab === 'shared') {
        const exams = await neonQueries.getSharedExams(filters);
        return NextResponse.json(exams);
      } else {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const exams = await neonQueries.getPersonalExams(user.id, filters);
        return NextResponse.json(exams);
      }
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
      await neonQueries.deleteExam(id);
      return NextResponse.json({ success: true });
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
    if (!user || (user.role !== 'admin' && user.role !== 'reviewer')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const { id, status, review_note } = await req.json();
      if (!id || !status) return NextResponse.json({ error: 'ID and status required' }, { status: 400 });
      
      await neonQueries.updateExam(id, {
        exam_status: status,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        review_note: review_note || null,
      });
      
      return NextResponse.json({ success: true });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
