/**
 * BƯỚC 13: RÀ SOÁT CHẤT LƯỢNG NỘI DUNG - KIỂM TRA MẪU
 * Vai trò: Giáo viên toán + học sinh giỏi
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== KIỂM TRA CHẤT LƯỢNG NỘI DUNG ===\n');

  // A. Sample random 5 câu mỗi lớp - kiểm tra MCQ có correct_answer khớp đáp án
  console.log('--- A. VERIFY MCQ CORRECT_ANSWER ---\n');
  for (const grade of [4,5,6,7,8,9]) {
    const mcqs = await sql`
      SELECT id, question_code, content, options, correct_answer, answer, grade
      FROM public.questions 
      WHERE grade = ${grade} AND question_type = 'trac_nghiem' AND options IS NOT NULL
      ORDER BY RANDOM() LIMIT 3
    `;
    for (const q of mcqs) {
      const correctOpt = q.options?.find(o => o.key === q.correct_answer);
      const ok = correctOpt && correctOpt.value && correctOpt.value.trim().length > 0;
      const ansMatch = q.answer === q.correct_answer;
      console.log(`  [${q.question_code}] L${q.grade} CA=${q.correct_answer} answer=${q.answer} opt=${ok?'✅':'❌'} sync=${ansMatch?'✅':'❌'}`);
      if (!ok) console.log(`    ⚠️ Options: ${JSON.stringify(q.options)}`);
    }
  }

  // B. Kiểm tra câu tự luận có đáp án đầy đủ
  console.log('\n--- B. SAMPLE TỰ LUẬN ---\n');
  for (const grade of [4,5,6,7,8,9]) {
    const essays = await sql`
      SELECT question_code, content, answer, solution, grade
      FROM public.questions 
      WHERE grade = ${grade} AND question_type = 'tu_luan'
      ORDER BY RANDOM() LIMIT 2
    `;
    for (const q of essays) {
      const hasAns = q.answer && q.answer.trim().length > 0;
      const hasSol = q.solution && q.solution.trim().length > 10;
      console.log(`  [${q.question_code}] L${q.grade}: ans=${hasAns?'✅':'⚠️'}(${(q.answer||'').length}c) sol=${hasSol?'✅':'⚠️'}(${(q.solution||'').length}c)`);
    }
  }

  // C. Kiểm tra tổng hợp
  console.log('\n--- C. TỔNG HỢP ---\n');
  
  // MCQ với correct_answer nhưng option không tồn tại
  const badCA = await sql`
    SELECT id, question_code, correct_answer, options, grade
    FROM public.questions 
    WHERE question_type = 'trac_nghiem' AND correct_answer IS NOT NULL AND options IS NOT NULL
  `;
  let invalidCA = 0;
  for (const q of badCA) {
    if (!Array.isArray(q.options)) continue;
    const keys = q.options.map(o => o.key);
    if (!keys.includes(q.correct_answer)) invalidCA++;
  }
  console.log(`MCQ correct_answer không khớp option key: ${invalidCA}`);

  // MCQ answer != correct_answer
  const mismatch = await sql`
    SELECT COUNT(*)::int as c FROM public.questions 
    WHERE question_type = 'trac_nghiem' AND answer IS NOT NULL AND correct_answer IS NOT NULL
    AND LENGTH(TRIM(answer)) = 1 AND UPPER(TRIM(answer)) != UPPER(TRIM(correct_answer))
  `;
  console.log(`MCQ answer != correct_answer: ${mismatch[0].c}`);

  // Câu approved thiếu answer
  const noAns = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE status = 'approved' AND (answer IS NULL OR answer = '')`;
  console.log(`Approved thiếu đáp án: ${noAns[0].c}`);

  // Câu thiếu category
  const noCat = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE category_id IS NULL`;
  console.log(`Thiếu category: ${noCat[0].c}`);

  // MCQ options trống
  const emptyOpts = await sql`
    SELECT id, question_code FROM public.questions 
    WHERE question_type = 'trac_nghiem' AND (options IS NULL OR options = '[]'::jsonb)
  `;
  console.log(`MCQ thiếu options: ${emptyOpts.length}`);

  // Question code trùng
  const dupCodes = await sql`
    SELECT question_code, COUNT(*)::int as c 
    FROM public.questions WHERE question_code IS NOT NULL
    GROUP BY question_code HAVING COUNT(*) > 1
  `;
  console.log(`Mã câu hỏi trùng: ${dupCodes.length} nhóm`);

  // Rejected
  const rej = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE status = 'rejected'`;
  console.log(`Rejected: ${rej[0].c}`);

  // Pending
  const pend = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE status = 'pending'`;
  console.log(`Pending: ${pend[0].c}`);
  
  console.log('\n✅ KIỂM TRA HOÀN THÀNH');
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
