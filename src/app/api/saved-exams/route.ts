import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

// GET — lấy danh sách đề đã lưu (IDs hoặc full)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();

  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      const full = searchParams.get('full') === 'true';
      if (full) {
        const exams = await neonQueries.getSavedExams(user.id);
        return NextResponse.json(exams);
      } else {
        const ids = await neonQueries.getSavedExamIds(user.id);
        return NextResponse.json({ ids });
      }
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

// POST — toggle saved exam (add/remove)
export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();

  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      const { exam_id } = await req.json();
      if (!exam_id) return NextResponse.json({ error: 'exam_id required' }, { status: 400 });

      const saved = await neonQueries.toggleSavedExam(user.id, exam_id);
      return NextResponse.json({ saved });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
