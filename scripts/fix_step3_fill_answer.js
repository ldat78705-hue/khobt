/**
 * BƯỚC 3: SỬA CÂU MCQ THIẾU ANSWER
 * 
 * Nhiều câu MCQ có correct_answer (A/B/C/D) nhưng answer trống
 * → Cần fill answer = correct_answer
 * 
 * Cũng sửa câu MCQ lớp 8 (L8-mpccc*) thiếu correct_answer:
 * → Đọc answer field, nếu là key A-D thì fill correct_answer
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 3: SỬA CÂU MCQ THIẾU ANSWER / CORRECT_ANSWER ===\n');

  // 3A: Fill answer từ correct_answer
  const noAnswer = await sql`
    SELECT id, question_code, grade, answer, correct_answer
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (answer IS NULL OR answer = '')
      AND correct_answer IS NOT NULL 
      AND correct_answer != ''
  `;

  console.log(`Câu MCQ thiếu answer nhưng có correct_answer: ${noAnswer.length}`);
  let fixed1 = 0;
  for (const q of noAnswer) {
    await sql`UPDATE public.questions SET answer = ${q.correct_answer}, updated_at = NOW() WHERE id = ${q.id}`;
    fixed1++;
  }
  console.log(`✅ Đã fill answer: ${fixed1}\n`);

  // 3B: Fill correct_answer từ answer
  const noCA = await sql`
    SELECT id, question_code, grade, answer, correct_answer
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (correct_answer IS NULL OR correct_answer = '')
      AND answer IS NOT NULL
      AND answer != ''
  `;

  console.log(`Câu MCQ thiếu correct_answer nhưng có answer: ${noCA.length}`);
  let fixed2 = 0;
  for (const q of noCA) {
    const ans = q.answer.trim();
    // Chỉ fill nếu answer là key hợp lệ (A-H)
    if (/^[A-Ha-h]$/.test(ans)) {
      await sql`UPDATE public.questions SET correct_answer = ${ans.toUpperCase()}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed2++;
    }
  }
  console.log(`✅ Đã fill correct_answer: ${fixed2}\n`);

  // 3C: Sửa câu đúng/sai (dung_sai) thiếu correct_answer
  const dsBroken = await sql`
    SELECT id, question_code, grade, answer, correct_answer
    FROM public.questions
    WHERE question_type = 'dung_sai'
      AND (correct_answer IS NULL OR correct_answer = '')
  `;
  console.log(`Câu đúng/sai thiếu correct_answer: ${dsBroken.length}`);
  let fixed3 = 0;
  for (const q of dsBroken) {
    if (q.answer && q.answer.trim().length > 0) {
      await sql`UPDATE public.questions SET correct_answer = ${q.answer.trim()}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed3++;
    }
  }
  console.log(`✅ Đã sửa đúng/sai: ${fixed3}\n`);

  // Verify
  const stillBroken = await sql`
    SELECT COUNT(*)::int as c FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (answer IS NULL OR answer = '' OR correct_answer IS NULL OR correct_answer = '')
  `;
  console.log(`📊 Còn câu MCQ thiếu answer/correct_answer: ${stillBroken[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
