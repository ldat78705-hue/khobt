import { NextRequest, NextResponse } from 'next/server';
import { getDatabaseProvider, getDb } from '@/lib/neon';
import { getCurrentUser } from '@/lib/neon/auth';

// Helper to chunk arrays
function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export async function POST(req: NextRequest) {
  const provider = getDatabaseProvider();
  
  if (provider === 'neon') {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      const body = await req.json();
      if (!body.version || !body.data) {
        return NextResponse.json({ error: 'File sao lưu không hợp lệ' }, { status: 400 });
      }

      const sql = getDb();
      const { categories, questions, exams, exam_questions } = body.data;

      // Restore Categories
      if (categories && categories.length > 0) {
        const chunks = chunkArray(categories, 50);
        for (const chunk of chunks) {
          await Promise.all(chunk.map((c: any) => sql`
            INSERT INTO public.categories (id, name, slug, parent_id, sort_order, created_at, updated_at)
            VALUES (${c.id}, ${c.name}, ${c.slug}, ${c.parent_id}, ${c.sort_order}, ${c.created_at}, ${c.updated_at})
            ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name, slug = EXCLUDED.slug, parent_id = EXCLUDED.parent_id, sort_order = EXCLUDED.sort_order
          `));
        }
      }

      // Restore Questions
      if (questions && questions.length > 0) {
        const chunks = chunkArray(questions, 50);
        for (const chunk of chunks) {
          await Promise.all(chunk.map((q: any) => sql`
            INSERT INTO public.questions (
              id, question_code, content, answer, solution, grade, topic, difficulty, 
              question_type, options, correct_answer, images, tags, is_public, status, 
              user_id, category_id, created_at, updated_at
            ) VALUES (
              ${q.id}, ${q.question_code}, ${q.content}, ${q.answer}, ${q.solution}, ${q.grade}, 
              ${q.topic}, ${q.difficulty}, ${q.question_type}, ${JSON.stringify(q.options || null)}, 
              ${q.correct_answer}, ${q.images}, ${q.tags}, ${q.is_public}, ${q.status}, 
              ${q.user_id}, ${q.category_id}, ${q.created_at}, ${q.updated_at}
            )
            ON CONFLICT (id) DO UPDATE SET
              content = EXCLUDED.content, answer = EXCLUDED.answer, solution = EXCLUDED.solution,
              grade = EXCLUDED.grade, topic = EXCLUDED.topic, difficulty = EXCLUDED.difficulty,
              question_type = EXCLUDED.question_type, options = EXCLUDED.options, 
              correct_answer = EXCLUDED.correct_answer, images = EXCLUDED.images, tags = EXCLUDED.tags,
              is_public = EXCLUDED.is_public, status = EXCLUDED.status, 
              category_id = EXCLUDED.category_id, updated_at = EXCLUDED.updated_at
          `));
        }
      }

      // Restore Exams
      if (exams && exams.length > 0) {
        const chunks = chunkArray(exams, 50);
        for (const chunk of chunks) {
          await Promise.all(chunk.map((e: any) => sql`
            INSERT INTO public.exams (
              id, title, description, grade, duration, exam_type, is_public,
              settings, tags, user_id, created_at, updated_at
            ) VALUES (
              ${e.id}, ${e.title}, ${e.description}, ${e.grade}, ${e.duration}, ${e.exam_type}, ${e.is_public},
              ${JSON.stringify(e.settings || null)}, ${e.tags}, ${e.user_id}, ${e.created_at}, ${e.updated_at}
            )
            ON CONFLICT (id) DO UPDATE SET
              title = EXCLUDED.title, description = EXCLUDED.description, grade = EXCLUDED.grade,
              duration = EXCLUDED.duration, exam_type = EXCLUDED.exam_type, is_public = EXCLUDED.is_public,
              settings = EXCLUDED.settings, tags = EXCLUDED.tags, updated_at = EXCLUDED.updated_at
          `));
        }
      }

      // Restore Exam Questions
      if (exam_questions && exam_questions.length > 0) {
        const chunks = chunkArray(exam_questions, 50);
        for (const chunk of chunks) {
          await Promise.all(chunk.map((eq: any) => sql`
            INSERT INTO public.exam_questions (
              id, exam_id, question_id, sort_order, points, created_at
            ) VALUES (
              ${eq.id}, ${eq.exam_id}, ${eq.question_id}, ${eq.sort_order}, ${eq.points}, ${eq.created_at}
            )
            ON CONFLICT (id) DO UPDATE SET
              sort_order = EXCLUDED.sort_order, points = EXCLUDED.points
          `));
        }
      }

      return NextResponse.json({ success: true, message: 'Phục hồi dữ liệu thành công' }, { status: 200 });
      
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Neon not active' }, { status: 501 });
}
