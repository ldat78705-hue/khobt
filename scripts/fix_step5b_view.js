/**
 * BƯỚC 5B: GIẢI THỦ CÔNG 18 CÂU MCQ LỚP 8 THIẾU CORRECT_ANSWER
 * 
 * Đọc kỹ content + options + solution → xác định đáp án đúng
 * Đóng vai giáo viên toán giỏi để giải
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== XEM CHI TIẾT 18 CÂU MCQ LỚP 8 ===\n');

  const broken = await sql`
    SELECT id, question_code, content, answer, correct_answer, options, solution, grade
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (correct_answer IS NULL OR correct_answer = '')
    ORDER BY question_code
  `;

  for (const q of broken) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`[${q.question_code}] Lớp ${q.grade}`);
    console.log(`ĐỀ: ${q.content}`);
    if (q.options && Array.isArray(q.options)) {
      for (const opt of q.options) {
        console.log(`  ${opt.key}. ${opt.value}`);
      }
    }
    console.log(`\nLỜI GIẢI: ${(q.solution || '').slice(0, 300)}`);
    console.log(`ANSWER: "${q.answer || ''}"`);
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
