import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import * as neonQueries from '@/lib/neon/queries';
import { createClient } from '@/lib/supabase/client'; // This might need a server client, but let's see

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = getDatabaseProvider();
  
  const filters = {
    grade: searchParams.get('grade') ? parseInt(searchParams.get('grade')!) : undefined,
    topic: searchParams.get('topic') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    status: searchParams.get('status') || undefined,
    search: searchParams.get('search') || undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50,
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

  // Fallback to Supabase (Server-side)
  // For simplicity in this demo, we'll suggest using Neon if Supabase isn't configured
  return NextResponse.json({ error: 'Supabase fallback not fully implemented in API yet. Please use Neon.' }, { status: 501 });
}
