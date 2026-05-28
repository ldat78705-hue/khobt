import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider } from '@/lib/neon';
import { getCurrentUser } from '@/lib/neon/auth';
import { neon } from '@neondatabase/serverless';

export const maxDuration = 60;

async function safeQuery(sql: any, query: string, label: string) {
  try {
    // Use raw SQL string for maximum compatibility
    const result = await sql(query);
    return result;
  } catch (err: any) {
    console.error(`[Backup] Failed to query ${label}:`, err.message);
    return [];
  }
}

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
    
    // Query each table individually with error isolation
    const categories = await safeQuery(sql, 'SELECT * FROM public.categories', 'categories');
    const questions = await safeQuery(sql, 'SELECT * FROM public.questions', 'questions');
    const exams = await safeQuery(sql, 'SELECT * FROM public.exams', 'exams');
    const exam_questions = await safeQuery(sql, 'SELECT * FROM public.exam_questions', 'exam_questions');
    const users = await safeQuery(sql, 
      'SELECT id, email, full_name, role, is_active, is_approved, created_at, updated_at FROM public.users', 
      'users'
    );
    const favorites = await safeQuery(sql, 'SELECT * FROM public.favorites', 'favorites');
    const saved_exams = await safeQuery(sql, 'SELECT * FROM public.saved_exams', 'saved_exams');

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

