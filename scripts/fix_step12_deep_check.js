/**
 * BƯỚC 12: KIỂM TRA SÂU
 * 
 * A. Verify 3 "false positive" MATH_ERROR
 * B. Kiểm tra 7 câu MCQ chỉ còn 2 options (cần bổ sung)
 * C. Kiểm tra 28 câu rejected
 * D. Thống kê phân bố cập nhật
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 12: KIỂM TRA SÂU ===\n');

  // A. Verify 3 "false positive"
  console.log('--- A. KIỂM TRA 3 "FALSE POSITIVE" ---\n');
  
  const codes = ['T4-B68-004', 'T5-B42-003', 'T6-C3B14-003'];
  for (const code of codes) {
    const rows = await sql`SELECT id, question_code, content, answer, solution, question_type, correct_answer, options FROM public.questions WHERE question_code = ${code} LIMIT 1`;
    if (rows.length === 0) { console.log(`❌ [${code}] KHÔNG TÌM THẤY\n`); continue; }
    const q = rows[0];
    console.log(`📝 [${code}] (${q.question_type})`);
    console.log(`   Nội dung: "${q.content}"`);
    console.log(`   Đáp án: "${q.answer}"`);
    console.log(`   Lời giải: "${(q.solution || '').slice(0, 100)}..."`);
    if (q.options) console.log(`   Options: ${JSON.stringify(q.options)}`);
    if (q.correct_answer) console.log(`   Correct: ${q.correct_answer}`);
    console.log();
  }

  // B. Kiểm tra MCQ với ít hơn 4 options
  console.log('--- B. CÂU MCQ ÍT HƠN 4 OPTIONS ---\n');
  const lowOpt = await sql`
    SELECT id, question_code, content, options, correct_answer, answer, grade
    FROM public.questions 
    WHERE question_type = 'trac_nghiem' AND options IS NOT NULL
    ORDER BY grade, question_code
  `;
  
  let lowOptCount = 0;
  for (const q of lowOpt) {
    if (!Array.isArray(q.options)) continue;
    if (q.options.length < 3) {
      lowOptCount++;
      console.log(`  ⚠️ [${q.question_code}] Lớp ${q.grade}: ${q.options.length} options`);
      console.log(`     Nội dung: "${q.content.slice(0, 80)}..."`);
      console.log(`     Options: ${JSON.stringify(q.options)}`);
      console.log(`     CA: ${q.correct_answer}`);
      console.log();
    }
  }
  console.log(`Tổng MCQ < 3 options: ${lowOptCount}\n`);

  // C. Kiểm tra 28 câu rejected
  console.log('--- C. CÂU REJECTED ---\n');
  const rejected = await sql`
    SELECT id, question_code, content, grade, question_type, status
    FROM public.questions WHERE status = 'rejected'
    ORDER BY grade, question_code
  `;
  console.log(`Tổng rejected: ${rejected.length}`);
  for (const q of rejected) {
    console.log(`  [${q.question_code}] Lớp ${q.grade} (${q.question_type}): "${q.content.slice(0, 60)}..."`);
  }

  // D. Thống kê cập nhật
  console.log('\n--- D. THỐNG KÊ PHÂN BỐ ---\n');
  const stats = await sql`
    SELECT grade, 
           COUNT(*)::int as total,
           COUNT(*) FILTER (WHERE question_type = 'trac_nghiem')::int as mcq,
           COUNT(*) FILTER (WHERE question_type = 'tu_luan')::int as essay,
           COUNT(*) FILTER (WHERE question_type = 'dung_sai')::int as tf,
           COUNT(*) FILTER (WHERE category_id IS NOT NULL)::int as has_cat,
           COUNT(*) FILTER (WHERE answer IS NOT NULL AND answer != '')::int as has_answer
    FROM public.questions
    WHERE status = 'approved'
    GROUP BY grade ORDER BY grade
  `;
  console.log('Lớp | Tổng | TN  | TL   | ĐS  | Có cat | Có đáp án');
  console.log('----+------+-----+------+-----+--------+----------');
  for (const s of stats) {
    console.log(`  ${s.grade}  | ${String(s.total).padStart(4)} | ${String(s.mcq).padStart(3)} | ${String(s.essay).padStart(4)} | ${String(s.tf).padStart(3)} |  ${String(s.has_cat).padStart(4)}  | ${String(s.has_answer).padStart(4)}`);
  }

  // E. Tìm câu thiếu answer (approved)
  console.log('\n--- E. CÂU APPROVED THIẾU ĐÁP ÁN ---\n');
  const noAnswer = await sql`
    SELECT id, question_code, content, grade, question_type 
    FROM public.questions 
    WHERE status = 'approved' AND (answer IS NULL OR answer = '')
    ORDER BY grade
    LIMIT 20
  `;
  console.log(`Câu approved thiếu đáp án: ${noAnswer.length}`);
  for (const q of noAnswer) {
    console.log(`  [${q.question_code}] Lớp ${q.grade} (${q.question_type}): "${q.content.slice(0, 60)}..."`);
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
