/**
 * BƯỚC 12B: SỬA 7 CÂU MCQ HỎNG + REVIEW REJECTED
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== SỬA 7 CÂU MCQ HỎNG OPTIONS ===\n');

  // Tìm tất cả MCQ có < 3 options (options bị hỏng)
  const badMCQ = await sql`
    SELECT id, question_code, content, answer, solution, options, correct_answer, grade
    FROM public.questions 
    WHERE question_type = 'trac_nghiem' AND options IS NOT NULL
    ORDER BY grade
  `;
  
  let fixed = 0;
  for (const q of badMCQ) {
    if (!Array.isArray(q.options) || q.options.length >= 3) continue;
    
    // Options hỏng → chuyển sang tự luận
    // Giữ lại answer = correct_answer value nếu có
    let newAnswer = q.answer || '';
    
    // Tìm giá trị đáp án đúng từ options gốc nếu có
    if (q.correct_answer && q.options) {
      const correctOpt = q.options.find(o => o.key === q.correct_answer);
      if (correctOpt && correctOpt.value && !['A','B','C','D','Một đáp án khác'].includes(correctOpt.value)) {
        newAnswer = correctOpt.value;
      }
    }

    await sql`UPDATE public.questions SET 
      question_type = 'tu_luan',
      options = NULL,
      correct_answer = NULL,
      answer = ${newAnswer},
      updated_at = NOW()
    WHERE id = ${q.id}`;
    fixed++;
    console.log(`✅ [${q.question_code}] Lớp ${q.grade} → tự luận (answer="${newAnswer.slice(0,30)}")`);
  }
  console.log(`\nĐã chuyển: ${fixed} câu\n`);

  // Review 28 câu rejected → phân loại
  console.log('=== REVIEW CÂU REJECTED ===\n');
  const rejected = await sql`
    SELECT id, question_code, content, answer, solution, grade, question_type
    FROM public.questions WHERE status = 'rejected'
    ORDER BY grade, question_code
  `;
  
  let approved = 0, kept = 0;
  for (const q of rejected) {
    const hasContent = q.content && q.content.trim().length > 10;
    const hasAnswer = q.answer && q.answer.trim().length > 0;
    const hasSolution = q.solution && q.solution.trim().length > 5;
    
    // Nếu có nội dung đầy đủ → approve
    if (hasContent && (hasAnswer || hasSolution)) {
      await sql`UPDATE public.questions SET status = 'approved', updated_at = NOW() WHERE id = ${q.id}`;
      approved++;
      console.log(`✅ [${q.question_code}] Lớp ${q.grade} → approved (có đáp án/lời giải)`);
    } else if (hasContent && !hasAnswer && !hasSolution) {
      // Nội dung nhưng thiếu đáp án → giữ rejected
      kept++;
      console.log(`⏭️ [${q.question_code}] Lớp ${q.grade} → giữ rejected (thiếu đáp án)`);
    } else {
      kept++;
      console.log(`⏭️ [${q.question_code}] Lớp ${q.grade} → giữ rejected (nội dung không đủ)`);
    }
  }
  console.log(`\nApproved: ${approved} | Giữ rejected: ${kept}`);

  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE status = 'approved'`;
  console.log(`📊 Tổng approved: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
