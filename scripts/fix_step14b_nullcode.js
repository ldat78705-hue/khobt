const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Câu thiếu question_code
  const noCode = await sql`
    SELECT id, content, grade, question_type, answer 
    FROM public.questions 
    WHERE question_code IS NULL
    ORDER BY grade
  `;
  console.log(`Câu thiếu question_code: ${noCode.length}`);
  for (const q of noCode) {
    console.log(`  [${q.id.slice(0,8)}] L${q.grade} (${q.question_type}): "${(q.content||'').slice(0,60)}..." ans=${(q.answer||'').length>0?'✅':'❌'}`);
  }

  // Gán question_code cho các câu thiếu
  if (noCode.length > 0) {
    console.log('\nGán question_code...');
    for (const q of noCode) {
      const prefix = `G${q.grade}-AUTO`;
      const existing = await sql`
        SELECT question_code FROM public.questions 
        WHERE question_code LIKE ${prefix + '-%'}
        ORDER BY question_code DESC LIMIT 1
      `;
      let nextNum = 1;
      if (existing.length > 0) {
        const last = existing[0].question_code;
        nextNum = parseInt(last.split('-').pop() || '0') + 1;
      }
      const code = `${prefix}-${String(nextNum).padStart(4, '0')}`;
      await sql`UPDATE public.questions SET question_code = ${code}, updated_at = NOW() WHERE id = ${q.id}`;
      console.log(`  ✅ ${q.id.slice(0,8)} → ${code}`);
    }
  }

  // 2 câu dien_dap_an - kiểm tra
  console.log('\n--- Câu điền đáp án ---');
  const fill = await sql`SELECT id, question_code, content, answer, grade FROM public.questions WHERE question_type = 'dien_dap_an'`;
  console.log(`Tổng: ${fill.length}`);
  for (const q of fill) {
    console.log(`  [${q.question_code}] L${q.grade}: "${(q.content||'').slice(0,60)}..." → "${(q.answer||'').slice(0,30)}"`);
  }
}

main().catch(console.error);
