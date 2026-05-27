const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Kiểm tra 180 câu thiếu answer
  const noAnswer = await sql`
    SELECT question_code, grade, question_type, content, solution, correct_answer
    FROM public.questions
    WHERE (answer IS NULL OR answer = '')
    ORDER BY grade, question_type, question_code
    LIMIT 30
  `;

  console.log(`Mẫu câu thiếu answer:`);
  for (const q of noAnswer) {
    const sol = (q.solution || '').slice(0, 60);
    console.log(`  [${q.question_code}] L${q.grade} ${q.question_type} | CA="${q.correct_answer || ''}" | sol="${sol}"`);
  }

  // Thống kê theo loại
  const stats = await sql`
    SELECT question_type, COUNT(*)::int as c
    FROM public.questions
    WHERE (answer IS NULL OR answer = '')
    GROUP BY question_type
  `;
  console.log(`\nThống kê theo loại:`);
  for (const s of stats) console.log(`  ${s.question_type}: ${s.c}`);

  // Fill answer cho tất cả - nếu có solution → dùng solution, nếu có correct_answer → dùng nó
  const toFix = await sql`
    SELECT id, question_type, correct_answer, solution
    FROM public.questions
    WHERE (answer IS NULL OR answer = '')
  `;
  
  let fixed = 0;
  for (const q of toFix) {
    let newAnswer = null;
    if (q.correct_answer && q.correct_answer.trim().length > 0) {
      newAnswer = q.correct_answer.trim();
    } else if (q.solution && q.solution.trim().length > 0) {
      newAnswer = q.solution.trim();
    }
    
    if (newAnswer) {
      await sql`UPDATE public.questions SET answer = ${newAnswer}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed++;
    }
  }
  console.log(`\n✅ Đã fill answer: ${fixed}`);
  
  const remaining = await sql`SELECT COUNT(*)::int as c FROM public.questions WHERE (answer IS NULL OR answer = '')`;
  console.log(`📊 Còn thiếu answer: ${remaining[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
