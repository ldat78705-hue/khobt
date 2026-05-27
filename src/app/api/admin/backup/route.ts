import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider, getDb } from '@/lib/neon';
import { getCurrentUser } from '@/lib/neon/auth';

export const maxDuration = 60; // Allow up to 60 seconds for large backups

export async function GET(req: NextRequest) {
  const provider = getDatabaseProvider();
  
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const sql = getDb();
      
      // Fetch data from all core tables sequentially to avoid memory spikes
      const categories = await sql`SELECT * FROM public.categories`;
      const questions = await sql`SELECT * FROM public.questions`;
      const exams = await sql`SELECT * FROM public.exams`;
      const exam_questions = await sql`SELECT * FROM public.exam_questions`;
      const users = await sql`SELECT id, email, full_name, role, status, created_at, updated_at FROM public.users`;
      
      // Optional tables - don't fail if they don't exist
      let favorites: any[] = [];
      let saved_exams: any[] = [];
      try {
        favorites = await sql`SELECT * FROM public.favorites`;
      } catch (e) { /* table may not exist */ }
      try {
        saved_exams = await sql`SELECT * FROM public.saved_exams`;
      } catch (e) { /* table may not exist */ }

      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        stats: {
          categories: categories.length,
          questions: questions.length,
          exams: exams.length,
          exam_questions: exam_questions.length,
          users: users.length,
          favorites: favorites.length,
          saved_exams: saved_exams.length,
        },
        data: {
          categories,
          questions,
          exams,
          exam_questions,
          users,
          favorites,
          saved_exams
        }
      };

      const jsonString = JSON.stringify(backupData);
      const filename = `khode_backup_${new Date().toISOString().replace(/[:.]/g, '-').split('T')[0]}.json`;

      return new NextResponse(jsonString, {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': String(new TextEncoder().encode(jsonString).length),
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });
      
    } catch (err: any) {
      console.error('[Backup Error]', err);
      return NextResponse.json({ error: err.message || 'Không thể sao lưu dữ liệu' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}

