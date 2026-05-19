import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider, getDb } from '@/lib/neon';
import { getCurrentUser } from '@/lib/neon/auth';

export async function GET(req: NextRequest) {
  const provider = getDatabaseProvider();
  
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const sql = getDb();
      
      // Fetch data from all core tables
      const [
        categories,
        questions,
        exams,
        exam_questions,
        users,
        favorites,
        saved_exams
      ] = await Promise.all([
        sql`SELECT * FROM public.categories`,
        sql`SELECT * FROM public.questions`,
        sql`SELECT * FROM public.exams`,
        sql`SELECT * FROM public.exam_questions`,
        sql`SELECT id, email, full_name, role, status, created_at, updated_at FROM public.users`,
        sql`SELECT * FROM public.favorites`,
        sql`SELECT * FROM public.saved_exams`
      ]);

      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
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

      return new NextResponse(JSON.stringify(backupData), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="khode_backup_${new Date().toISOString().split('T')[0]}.json"`
        }
      });
      
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
