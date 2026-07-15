/**
 * BƯỚC 11: SỬA CÁC LỖI CÒN LẠI SAU AUDIT
 * 
 * 1. 4 câu MCQ answer != correct_answer → sync
 * 2. 7 câu duplicate options → loại bỏ trùng
 * 3. 1 nhóm trùng nội dung → xóa bản thừa
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 11: SỬA LỖI CÒN LẠI ===\n');

  // 1. Sync answer = correct_answer cho MCQ
  console.log('--- 1. Sync answer = correct_answer ---');
  const mismatch = await sql`
    SELECT id, question_code, answer, correct_answer 
    FROM public.questions 
    WHERE question_type = 'trac_nghiem' 
      AND answer IS NOT NULL AND correct_answer IS NOT NULL
      AND answer != correct_answer
  `;
  console.log(`Câu MCQ answer != correct_answer: ${mismatch.length}`);
  for (const q of mismatch) {
    // correct_answer là nguồn chính xác cho MCQ
    await sql`UPDATE public.questions SET answer = ${q.correct_answer}, updated_at = NOW() WHERE id = ${q.id}`;
    console.log(`  ✅ [${q.question_code}] "${q.answer}" → "${q.correct_answer}"`);
  }

  // 2. Sửa options trùng
  console.log('\n--- 2. Sửa options trùng ---');
  const allMCQ = await sql`
    SELECT id, question_code, options, correct_answer
    FROM public.questions
    WHERE question_type = 'trac_nghiem' AND options IS NOT NULL
  `;
  
  let fixedDup = 0;
  for (const q of allMCQ) {
    if (!Array.isArray(q.options) || q.options.length < 2) continue;
    const seen = new Map();
    const unique = [];
    let hasDup = false;
    for (const opt of q.options) {
      if (!opt || !opt.value) continue;
      const v = opt.value.trim().toLowerCase();
      if (seen.has(v)) { hasDup = true; continue; }
      seen.set(v, opt.key);
      unique.push(opt);
    }
    if (!hasDup) continue;

    const labels = ['A','B','C','D','E','F','G','H'];
    const correctVal = q.options.find(o => o.key === q.correct_answer)?.value?.trim().toLowerCase();
    let newCA = 'A';
    const newOpts = unique.map((opt, i) => {
      const k = labels[i];
      if (correctVal && opt.value.trim().toLowerCase() === correctVal) newCA = k;
      return { key: k, value: opt.value };
    });

    await sql`UPDATE public.questions SET 
      options = ${JSON.stringify(newOpts)}::jsonb,
      correct_answer = ${newCA}, answer = ${newCA},
      updated_at = NOW()
    WHERE id = ${q.id}`;
    fixedDup++;
    console.log(`  ✅ [${q.question_code}] ${q.options.length} → ${newOpts.length} options, CA=${newCA}`);
  }
  console.log(`Đã sửa: ${fixedDup}`);

  // 3. Xóa nội dung trùng
  console.log('\n--- 3. Xóa nội dung trùng ---');
  const allQ = await sql`SELECT id, question_code, content, answer, solution, category_id, created_at FROM public.questions ORDER BY created_at`;
  const groups = new Map();
  for (const q of allQ) {
    const key = q.content.trim().replace(/\s+/g, ' ').toLowerCase();
    if (key.length < 10) continue;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }
  
  let deleted = 0;
  for (const [key, qs] of groups) {
    if (qs.length < 2) continue;
    const scored = qs.map(q => {
      let s = 0;
      if (q.answer?.trim().length > 0) s += 10;
      if (q.solution?.trim().length > 10) s += 8;
      if (q.category_id) s += 5;
      return { ...q, score: s };
    });
    scored.sort((a, b) => b.score - a.score || new Date(a.created_at) - new Date(b.created_at));
    
    for (let i = 1; i < scored.length; i++) {
      try {
        await sql`DELETE FROM public.exam_questions WHERE question_id = ${scored[i].id}`;
        await sql`DELETE FROM public.favorites WHERE question_id = ${scored[i].id}`;
        await sql`DELETE FROM public.questions WHERE id = ${scored[i].id}`;
        deleted++;
        console.log(`  🗑️ Xóa [${scored[i].question_code}]`);
      } catch(e) {}
    }
  }
  console.log(`Đã xóa: ${deleted}`);

  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`\n📊 Tổng câu: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
