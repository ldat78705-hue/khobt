import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

// GET — check like status + count
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const questionId = searchParams.get('question_id');
  if (!questionId) return NextResponse.json({ error: 'question_id required' }, { status: 400 });

  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    try {
      const count = await neonQueries.getLikeCount(questionId);
      const liked = user ? await neonQueries.isLiked(user.id, questionId) : false;
      return NextResponse.json({ liked, count });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ liked: false, count: 0 });
}

// POST — toggle like
export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      const { question_id } = await req.json();
      if (!question_id) return NextResponse.json({ error: 'question_id required' }, { status: 400 });
      const result = await neonQueries.toggleLike(user.id, question_id);
      return NextResponse.json(result);
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
