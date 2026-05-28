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

    const [categories, stats] = await Promise.all([
      sql`
        SELECT id, name, parent_id, grade, sort_order
        FROM public.categories
        WHERE is_active = true
        ORDER BY grade, sort_order
      `,
      sql`
        SELECT
          q.category_id,
          q.difficulty,
          q.question_type,
          COUNT(*)::int as count
        FROM public.questions q
        WHERE q.status = 'approved'
        GROUP BY q.category_id, q.difficulty, q.question_type
      `,
    ]);

    // Build stats map: category_id -> { total, byDifficulty, byType }
    const statsMap: Record<string, {
      total: number;
      byDifficulty: Record<string, number>;
      byType: Record<string, number>;
    }> = {};

    for (const row of stats) {
      const catId = row.category_id;
      if (!catId) continue;
      if (!statsMap[catId]) {
        statsMap[catId] = { total: 0, byDifficulty: {}, byType: {} };
      }
      statsMap[catId].total += row.count;
      const diff = row.difficulty as string;
      statsMap[catId].byDifficulty[diff] = (statsMap[catId].byDifficulty[diff] || 0) + row.count;
      const qtype = row.question_type as string;
      statsMap[catId].byType[qtype] = (statsMap[catId].byType[qtype] || 0) + row.count;
    }

    // Build category map
    const catMap = new Map<string, any>();
    for (const c of categories) {
      catMap.set(c.id, { ...c, children: [] });
    }

    // Organize tree
    const gradeMap = new Map<number, any[]>();
    for (const c of categories) {
      const node = catMap.get(c.id)!;
      if (c.parent_id && catMap.has(c.parent_id)) {
        catMap.get(c.parent_id)!.children.push(node);
      } else if (!c.parent_id) {
        const grade = c.grade || 0;
        if (!gradeMap.has(grade)) gradeMap.set(grade, []);
        gradeMap.get(grade)!.push(node);
      }
    }

    // Build response by grade
    const sortedGrades = [...gradeMap.keys()].sort((a, b) => a - b);

    const result = sortedGrades.map(grade => {
      const chapters = gradeMap.get(grade)!.sort((a: any, b: any) => a.sort_order - b.sort_order);

      const gradeData = {
        grade,
        total: 0,
        byDifficulty: {} as Record<string, number>,
        byType: {} as Record<string, number>,
        chapters: chapters.map((chapter: any) => {
          const lessons = (chapter.children || []).sort((a: any, b: any) => a.sort_order - b.sort_order);

          // Accumulate chapter stats
          let chapterTotal = 0;
          const chapterByDiff: Record<string, number> = {};
          const chapterByType: Record<string, number> = {};

          function accumulateStats(catId: string) {
            const s = statsMap[catId];
            if (!s) return;
            chapterTotal += s.total;
            for (const [k, v] of Object.entries(s.byDifficulty)) {
              chapterByDiff[k] = (chapterByDiff[k] || 0) + v;
            }
            for (const [k, v] of Object.entries(s.byType)) {
              chapterByType[k] = (chapterByType[k] || 0) + v;
            }
          }

          // Chapter's own questions
          accumulateStats(chapter.id);

          const lessonsData = lessons.map((lesson: any) => {
            let lessonTotal = 0;
            const lessonByDiff: Record<string, number> = {};
            const lessonByType: Record<string, number> = {};

            function accLesson(catId: string) {
              const s = statsMap[catId];
              if (!s) return;
              lessonTotal += s.total;
              chapterTotal += s.total;
              for (const [k, v] of Object.entries(s.byDifficulty)) {
                lessonByDiff[k] = (lessonByDiff[k] || 0) + v;
                chapterByDiff[k] = (chapterByDiff[k] || 0) + v;
              }
              for (const [k, v] of Object.entries(s.byType)) {
                lessonByType[k] = (lessonByType[k] || 0) + v;
                chapterByType[k] = (chapterByType[k] || 0) + v;
              }
            }

            accLesson(lesson.id);

            // Sub-lessons
            const subLessons = (lesson.children || []).sort((a: any, b: any) => a.sort_order - b.sort_order);
            for (const sub of subLessons) {
              accLesson(sub.id);
            }

            return {
              id: lesson.id,
              name: lesson.name,
              total: lessonTotal,
              byDifficulty: lessonByDiff,
              byType: lessonByType,
              subLessons: subLessons.map((sub: any) => ({
                id: sub.id,
                name: sub.name,
                total: statsMap[sub.id]?.total || 0,
                byDifficulty: statsMap[sub.id]?.byDifficulty || {},
                byType: statsMap[sub.id]?.byType || {},
              })),
            };
          });

          return {
            id: chapter.id,
            name: chapter.name,
            total: chapterTotal,
            byDifficulty: chapterByDiff,
            byType: chapterByType,
            lessons: lessonsData,
          };
        }),
      };

      // Sum grade totals
      for (const ch of gradeData.chapters) {
        gradeData.total += ch.total;
        for (const [k, v] of Object.entries(ch.byDifficulty)) {
          gradeData.byDifficulty[k] = (gradeData.byDifficulty[k] || 0) + v;
        }
        for (const [k, v] of Object.entries(ch.byType)) {
          gradeData.byType[k] = (gradeData.byType[k] || 0) + v;
        }
      }

      return gradeData;
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
