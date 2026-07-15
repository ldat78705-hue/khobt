import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import { getCurrentUser } from '@/lib/neon/auth';
import { neon } from '@neondatabase/serverless';

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const provider = getDatabaseProvider();
  
  if (provider !== 'neon') {
    return NextResponse.json({ error: 'Database không hoạt động' }, { status: 501 });
  }

  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Bạn không có quyền thực hiện thao tác này' }, { status: 401 });
  }
  
  try {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      return NextResponse.json({ error: 'DATABASE_URL chưa được cấu hình' }, { status: 500 });
    }
    
    const sql = neon(databaseUrl);
    
    // Query each table individually - if one fails, the rest continue
    let categories: any[] = [], questions: any[] = [], exams: any[] = [], exam_questions: any[] = [], users: any[] = [], favorites: any[] = [], saved_exams: any[] = [];
    try { categories = await sql`SELECT * FROM public.categories`; } catch(e: any) { console.error('[Backup] categories:', e.message); }
    try { questions = await sql`SELECT * FROM public.questions`; } catch(e: any) { console.error('[Backup] questions:', e.message); }
    try { exams = await sql`SELECT * FROM public.exams`; } catch(e: any) { console.error('[Backup] exams:', e.message); }
    try { exam_questions = await sql`SELECT * FROM public.exam_questions`; } catch(e: any) { console.error('[Backup] exam_questions:', e.message); }
    try { users = await sql`SELECT id, email, full_name, role, is_active, is_approved, created_at, updated_at FROM public.users`; } catch(e: any) { console.error('[Backup] users:', e.message); }
    try { favorites = await sql`SELECT * FROM public.favorites`; } catch(_) { /* optional table */ }
    try { saved_exams = await sql`SELECT * FROM public.saved_exams`; } catch(_) { /* optional table */ }

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
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `khode_backup_${dateStr}.json`;

    return new NextResponse(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
    
  } catch (err: any) {
    console.error('[Backup Error]', err);
    return NextResponse.json({ 
      error: err.message || 'Không thể sao lưu dữ liệu. Vui lòng thử lại.' 
    }, { status: 500 });
  }
}


