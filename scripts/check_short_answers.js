/**
 * KIỂM TRA MCQ CÓ ANSWER = 1 KÝ TỰ
 * Xác nhận: MCQ có correct_answer khớp, options đầy đủ
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const shortAns = await sql`
    SELECT question_code, answer, correct_answer, question_type, options, grade
    FROM public.questions
    WHERE LENGTH(TRIM(answer)) < 3
    ORDER BY grade, question_code
    LIMIT 20
  `;
  
  console.log(`=== MCQ ANSWER NGẮN: 20 MẪU ===\n`);
  
  let okCount = 0;
  for (const q of shortAns) {
    const isValid = q.question_type === 'trac_nghiem' && 
                    q.correct_answer && 
                    Array.isArray(q.options) && 
                    q.options.length >= 2 &&
                    q.options.find(o => o.key === q.correct_answer);
    
    if (isValid) {
      okCount++;
    } else {
      console.log(`  ❌ [${q.question_code}] L${q.grade}: type=${q.type}, ans="${q.answer}", correct="${q.correct_answer}"`);
    }
  }
  console.log(`\n✅ ${okCount}/20 đều là MCQ hợp lệ (answer = correct_answer letter)`);
  
  // Đếm tổng
  const total = await sql`
    SELECT COUNT(*)::int as cnt FROM public.questions WHERE LENGTH(TRIM(answer)) < 3
  `;
  const mcqCount = await sql`
    SELECT COUNT(*)::int as cnt FROM public.questions 
    WHERE LENGTH(TRIM(answer)) < 3 AND question_type = 'trac_nghiem'
  `;
  const dsCount = await sql`
    SELECT COUNT(*)::int as cnt FROM public.questions 
    WHERE LENGTH(TRIM(answer)) < 3 AND question_type = 'dung_sai'
  `;
  const otherCount = await sql`
    SELECT COUNT(*)::int as cnt FROM public.questions 
    WHERE LENGTH(TRIM(answer)) < 3 AND question_type NOT IN ('trac_nghiem', 'dung_sai')
  `;
  
  console.log(`\nTổng answer < 3c: ${total[0].cnt}`);
  console.log(`  MCQ: ${mcqCount[0].cnt}`);
  console.log(`  Đúng/Sai: ${dsCount[0].cnt}`);
  console.log(`  Khác: ${otherCount[0].cnt}`);
  
  // Kiểm tra "khác" - tự luận có answer ngắn
  if (otherCount[0].cnt > 0) {
    const others = await sql`
      SELECT question_code, content, answer, question_type, grade FROM public.questions
      WHERE LENGTH(TRIM(answer)) < 3 AND question_type NOT IN ('trac_nghiem', 'dung_sai')
      LIMIT 10
    `;
    console.log('\nCÂU TỰ LUẬN CÓ ĐÁP ÁN NGẮN:');
    for (const q of others) {
      console.log(`  [${q.question_code}] L${q.grade} (${q.question_type}): "${q.answer}" | Đề: "${(q.content||'').slice(0,50)}"`);
    }
  }
}

main().catch(console.error);
