import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { getCurrentUser } from '@/lib/neon/auth';

// GET — lấy danh sách favorite IDs hoặc full questions
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();

  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      const full = searchParams.get('full') === 'true';
      if (full) {
        const questions = await neonQueries.getFavoriteQuestions(user.id);
        return NextResponse.json(questions);
      } else {
        const ids = await neonQueries.getFavoriteIds(user.id);
        return NextResponse.json({ ids });
      }
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

// POST — toggle favorite (add/remove)
export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();

  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
      const { question_id } = await req.json();
      if (!question_id) return NextResponse.json({ error: 'question_id required' }, { status: 400 });

      const added = await neonQueries.toggleFavorite(user.id, question_id);
      return NextResponse.json({ favorited: added });
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
