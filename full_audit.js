// Full Audit Script - Truy vấn trực tiếp DB Neon
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const grades = [9, 8, 7, 6, 5, 4];
  const allData = {};

  for (const grade of grades) {
    console.log('\n========== LOP ' + grade + ' ==========');

    // Get parent categories (chapters) for this grade
    const chapters = await sql`SELECT id, name, slug, parent_id, sort_order FROM public.categories WHERE grade = ${grade} AND parent_id IS NULL ORDER BY sort_order`;

    console.log('So chuong: ' + chapters.length);
    allData['grade_' + grade] = { chapters: [] };

    for (const ch of chapters) {
      console.log('  Chuong: ' + ch.name + ' [' + ch.id + ']');

      // Get sub-categories (lessons) in this chapter
      const lessons = await sql`SELECT id, name, slug, parent_id, sort_order FROM public.categories WHERE parent_id = ${ch.id} AND grade = ${grade} ORDER BY sort_order`;

      const chapterData = { id: ch.id, name: ch.name, lessons: [] };

      for (const lesson of lessons) {
        // Get questions for this lesson
        const questions = await sql`SELECT q.id, q.question_code, q.content, q.answer, q.solution, q.difficulty, q.question_type, q.options, q.correct_answer, q.status, q.grade, q.category_id FROM public.questions q WHERE q.category_id = ${lesson.id}::uuid ORDER BY q.question_code, q.created_at`;

        chapterData.lessons.push({
          id: lesson.id,
          name: lesson.name,
          question_count: questions.length,
          questions: questions
        });

        console.log('    ' + lesson.name + ' -> ' + questions.length + ' cau hoi');
      }

      allData['grade_' + grade].chapters.push(chapterData);
    }
  }

  // Write full data to file
  const fs = require('fs');
  fs.writeFileSync('audit_full_dump.json', JSON.stringify(allData, null, 2), 'utf8');
  console.log('\n=== DA LUU TOAN BO DU LIEU VAO audit_full_dump.json ===');
}

main().catch(e => console.error('ERROR:', e.message));
