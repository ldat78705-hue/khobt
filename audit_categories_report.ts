import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load env
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const DIFFICULTY_LABELS: Record<string, string> = {
  nhan_biet: 'NB',
  thong_hieu: 'TH',
  van_dung: 'VD',
  van_dung_cao: 'VDC',
};

const QUESTION_TYPE_LABELS: Record<string, string> = {
  trac_nghiem: 'TN',
  tu_luan: 'TL',
  dung_sai: 'ĐS',
  dien_dap_an: 'ĐĐA',
};

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL not configured');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  // 1. Get all categories
  const categories = await sql`
    SELECT id, name, parent_id, grade, sort_order
    FROM public.categories
    WHERE is_active = true
    ORDER BY grade, sort_order
  `;

  // 2. Get question counts grouped by category_id, difficulty, question_type
  const stats = await sql`
    SELECT 
      q.category_id,
      q.difficulty,
      q.question_type,
      COUNT(*)::int as count
    FROM public.questions q
    WHERE q.status = 'approved'
    GROUP BY q.category_id, q.difficulty, q.question_type
    ORDER BY q.category_id
  `;

  // Build stats map: category_id -> { difficulty -> count, question_type -> count, total }
  const statsMap: Record<string, any> = {};
  for (const row of stats) {
    const catId = row.category_id;
    if (!statsMap[catId]) {
      statsMap[catId] = { total: 0, byDifficulty: {}, byType: {} };
    }
    statsMap[catId].total += row.count;
    
    const diff = row.difficulty as string;
    if (!statsMap[catId].byDifficulty[diff]) statsMap[catId].byDifficulty[diff] = 0;
    statsMap[catId].byDifficulty[diff] += row.count;

    const qtype = row.question_type as string;
    if (!statsMap[catId].byType[qtype]) statsMap[catId].byType[qtype] = 0;
    statsMap[catId].byType[qtype] += row.count;
  }

  // Build tree: grade -> chapters (parent_id = null) -> lessons (parent_id = chapter)
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
      // Root level = chapter
      const grade = c.grade || 0;
      if (!gradeMap.has(grade)) gradeMap.set(grade, []);
      gradeMap.get(grade)!.push(node);
    }
  }

  // Sort grades
  const sortedGrades = [...gradeMap.keys()].sort((a, b) => a - b);

  // Generate report
  const lines: string[] = [];
  lines.push('='.repeat(120));
  lines.push('BÁO CÁO THỐNG KÊ SỐ LƯỢNG BÀI TẬP THEO CẤU TRÚC: LỚP → CHƯƠNG → BÀI → DẠNG BÀI');
  lines.push(`Ngày tạo: ${new Date().toLocaleString('vi-VN')}`);
  lines.push('Chỉ tính câu hỏi đã duyệt (approved)');
  lines.push('NB = Nhận biết | TH = Thông hiểu | VD = Vận dụng | VDC = Vận dụng cao');
  lines.push('TN = Trắc nghiệm | TL = Tự luận | ĐS = Đúng/Sai | ĐĐA = Điền đáp án');
  lines.push('='.repeat(120));

  let grandTotal = 0;
  const grandByDiff: Record<string, number> = {};
  const grandByType: Record<string, number> = {};

  for (const grade of sortedGrades) {
    const chapters = gradeMap.get(grade)!;
    lines.push('');
    lines.push('━'.repeat(120));
    lines.push(`📚 LỚP ${grade}`);
    lines.push('━'.repeat(120));

    let gradeTotal = 0;
    const gradeByDiff: Record<string, number> = {};
    const gradeByType: Record<string, number> = {};

    for (const chapter of chapters) {
      lines.push('');
      
      // Aggregate chapter stats (own + children)
      let chapterTotal = 0;
      const chapterByDiff: Record<string, number> = {};
      const chapterByType: Record<string, number> = {};

      // Chapter's own questions
      const chapterStat = statsMap[chapter.id];
      if (chapterStat) {
        chapterTotal += chapterStat.total;
        for (const [k, v] of Object.entries(chapterStat.byDifficulty)) {
          chapterByDiff[k] = (chapterByDiff[k] || 0) + (v as number);
        }
        for (const [k, v] of Object.entries(chapterStat.byType)) {
          chapterByType[k] = (chapterByType[k] || 0) + (v as number);
        }
      }

      // Children (lessons)
      const lessons = chapter.children.sort((a: any, b: any) => a.sort_order - b.sort_order);
      
      for (const lesson of lessons) {
        const lessonStat = statsMap[lesson.id];
        if (lessonStat) {
          chapterTotal += lessonStat.total;
          for (const [k, v] of Object.entries(lessonStat.byDifficulty)) {
            chapterByDiff[k] = (chapterByDiff[k] || 0) + (v as number);
          }
          for (const [k, v] of Object.entries(lessonStat.byType)) {
            chapterByType[k] = (chapterByType[k] || 0) + (v as number);
          }
        }

        // Sub-lessons (level 3)
        const subLessons = lesson.children?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];
        for (const subLesson of subLessons) {
          const subStat = statsMap[subLesson.id];
          if (subStat) {
            chapterTotal += subStat.total;
            for (const [k, v] of Object.entries(subStat.byDifficulty)) {
              chapterByDiff[k] = (chapterByDiff[k] || 0) + (v as number);
            }
            for (const [k, v] of Object.entries(subStat.byType)) {
              chapterByType[k] = (chapterByType[k] || 0) + (v as number);
            }
          }
        }
      }

      // Print chapter header
      const chapterDiffStr = Object.entries(DIFFICULTY_LABELS)
        .map(([k, label]) => `${label}: ${chapterByDiff[k] || 0}`)
        .join(' | ');
      const chapterTypeStr = Object.entries(QUESTION_TYPE_LABELS)
        .map(([k, label]) => `${label}: ${chapterByType[k] || 0}`)
        .join(' | ');

      lines.push(`  📖 ${chapter.name}  [Tổng: ${chapterTotal}]`);
      lines.push(`     Dạng bài: ${chapterDiffStr}`);
      lines.push(`     Loại:     ${chapterTypeStr}`);

      // Print each lesson
      for (const lesson of lessons) {
        const lessonStat = statsMap[lesson.id] || { total: 0, byDifficulty: {}, byType: {} };
        
        // Also include sub-lesson stats in the lesson total
        let lessonTotal = lessonStat.total;
        const lessonByDiff = { ...lessonStat.byDifficulty };
        const lessonByType = { ...lessonStat.byType };

        const subLessons = lesson.children?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];
        for (const subLesson of subLessons) {
          const subStat = statsMap[subLesson.id];
          if (subStat) {
            lessonTotal += subStat.total;
            for (const [k, v] of Object.entries(subStat.byDifficulty)) {
              lessonByDiff[k] = (lessonByDiff[k] || 0) + (v as number);
            }
            for (const [k, v] of Object.entries(subStat.byType)) {
              lessonByType[k] = (lessonByType[k] || 0) + (v as number);
            }
          }
        }

        const diffStr = Object.entries(DIFFICULTY_LABELS)
          .map(([k, label]) => `${label}:${lessonByDiff[k] || 0}`)
          .join(' ');
        const typeStr = Object.entries(QUESTION_TYPE_LABELS)
          .map(([k, label]) => `${label}:${lessonByType[k] || 0}`)
          .join(' ');

        const marker = lessonTotal === 0 ? '⚠️' : '✅';
        lines.push(`     ${marker} ${lesson.name}  [${lessonTotal}]  ${diffStr}  | ${typeStr}`);

        // Print sub-lessons if any
        for (const subLesson of subLessons) {
          const subStat = statsMap[subLesson.id] || { total: 0, byDifficulty: {}, byType: {} };
          const subDiffStr = Object.entries(DIFFICULTY_LABELS)
            .map(([k, label]) => `${label}:${subStat.byDifficulty[k] || 0}`)
            .join(' ');
          const subMarker = subStat.total === 0 ? '⚠️' : '✅';
          lines.push(`        ${subMarker} ${subLesson.name}  [${subStat.total}]  ${subDiffStr}`);
        }
      }

      gradeTotal += chapterTotal;
      for (const [k, v] of Object.entries(chapterByDiff)) {
        gradeByDiff[k] = (gradeByDiff[k] || 0) + v;
      }
      for (const [k, v] of Object.entries(chapterByType)) {
        gradeByType[k] = (gradeByType[k] || 0) + v;
      }
    }

    // Grade summary
    const gradeDiffStr = Object.entries(DIFFICULTY_LABELS)
      .map(([k, label]) => `${label}: ${gradeByDiff[k] || 0}`)
      .join(' | ');
    const gradeTypeStr = Object.entries(QUESTION_TYPE_LABELS)
      .map(([k, label]) => `${label}: ${gradeByType[k] || 0}`)
      .join(' | ');

    lines.push('');
    lines.push(`  📊 TỔNG LỚP ${grade}: ${gradeTotal} câu hỏi`);
    lines.push(`     ${gradeDiffStr}`);
    lines.push(`     ${gradeTypeStr}`);

    grandTotal += gradeTotal;
    for (const [k, v] of Object.entries(gradeByDiff)) {
      grandByDiff[k] = (grandByDiff[k] || 0) + v;
    }
    for (const [k, v] of Object.entries(gradeByType)) {
      grandByType[k] = (grandByType[k] || 0) + v;
    }
  }

  // Grand total
  lines.push('');
  lines.push('='.repeat(120));
  lines.push(`🏆 TỔNG CỘNG TOÀN HỆ THỐNG: ${grandTotal} câu hỏi (đã duyệt)`);
  const grandDiffStr = Object.entries(DIFFICULTY_LABELS)
    .map(([k, label]) => `${label}: ${grandByDiff[k] || 0}`)
    .join(' | ');
  const grandTypeStr = Object.entries(QUESTION_TYPE_LABELS)
    .map(([k, label]) => `${label}: ${grandByType[k] || 0}`)
    .join(' | ');
  lines.push(`   ${grandDiffStr}`);
  lines.push(`   ${grandTypeStr}`);
  lines.push('='.repeat(120));

  const report = lines.join('\n');
  console.log(report);

  // Save to file
  const outputFile = path.resolve(__dirname, 'audit_categories_report.txt');
  fs.writeFileSync(outputFile, report, 'utf-8');
  console.log(`\nĐã lưu báo cáo vào: ${outputFile}`);
}

main().catch(console.error);
