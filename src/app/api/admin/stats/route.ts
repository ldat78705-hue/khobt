import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

function getRawDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured');
  return neon(databaseUrl);
}

export async function GET() {
  try {
    const sql = getRawDb();

    const [
      totalResult,
      byGradeResult,
      byDifficultyResult,
      byTopicResult,
      byStatusResult,
      examCountResult,
      userCountResult,
      categoryCountResult,
      byCategoryResult,
    ] = await Promise.all([
      sql`SELECT COUNT(*)::int as count FROM public.questions`,
      sql`SELECT grade, COUNT(*)::int as count FROM public.questions GROUP BY grade ORDER BY grade`,
      sql`SELECT difficulty, COUNT(*)::int as count FROM public.questions GROUP BY difficulty ORDER BY difficulty`,
      sql`SELECT topic, COUNT(*)::int as count FROM public.questions GROUP BY topic ORDER BY count DESC`,
      sql`SELECT status, COUNT(*)::int as count FROM public.questions GROUP BY status`,
      sql`SELECT COUNT(*)::int as count FROM public.exams`,
      sql`SELECT COUNT(*)::int as count FROM public.users WHERE is_active = true`,
      sql`SELECT COUNT(*)::int as count FROM public.categories WHERE is_active = true`,
      sql`SELECT c.name, c.grade, COUNT(q.id)::int as count
          FROM public.categories c
          LEFT JOIN public.questions q ON q.category_id = c.id
          WHERE c.parent_id IS NOT NULL
          GROUP BY c.id, c.name, c.grade
          HAVING COUNT(q.id) > 0
          ORDER BY c.grade, count DESC`,
    ]);

    const statusMap: Record<string, number> = {};
    byStatusResult.forEach((r: any) => { statusMap[r.status] = r.count; });

    return NextResponse.json({
      total: totalResult[0]?.count || 0,
      approved: statusMap['approved'] || 0,
      pending: statusMap['pending'] || 0,
      rejected: statusMap['rejected'] || 0,
      draft: statusMap['draft'] || 0,
      byGrade: byGradeResult.map((r: any) => ({ grade: r.grade, count: r.count })),
      byDifficulty: byDifficultyResult.map((r: any) => ({ difficulty: r.difficulty, count: r.count })),
      byTopic: byTopicResult.map((r: any) => ({ topic: r.topic, count: r.count })),
      byCategory: byCategoryResult.map((r: any) => ({ name: r.name, grade: r.grade, count: r.count })),
      totalExams: examCountResult[0]?.count || 0,
      totalUsers: userCountResult[0]?.count || 0,
      totalCategories: categoryCountResult[0]?.count || 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
