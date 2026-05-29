const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);

  // ===== 1. Xóa nhóm trùng lặp pattern (giữ bài đầu, xóa 9 bài sau) =====
  console.log('=== XỬ LÝ TRÙNG LẶP ===\n');
  
  const dupeGroups = [
    { prefix: 'G9-EXAM-RG-', keep: 1 },     // Rút gọn phân số
    { prefix: 'G8-FIN-', cat: 'Thalès', keep: 1 },  // Thalès
    { prefix: 'G8-FIN-', cat: 'đồng dạng', keep: 1 }, // Đồng dạng tam giác vuông
    { prefix: 'G5-GEO-HTR-', keep: 1 },     // Hình tròn
  ];
  
  // Handle G9-EXAM-RG (9 duplicates of rút gọn phân số)
  const rgQ = await sql`
    SELECT id, question_code, content FROM public.questions
    WHERE question_code LIKE 'G9-EXAM-RG-%' ORDER BY question_code
  `;
  console.log(`G9-EXAM-RG: ${rgQ.length} questions`);
  // These are exam questions with SAME content (template questions) - keep first, delete rest
  const contentSeen = new Map();
  let deletedRG = 0;
  for (const q of rgQ) {
    const norm = q.content.replace(/\s+/g, ' ').trim().substring(0, 120);
    if (contentSeen.has(norm)) {
      await sql`DELETE FROM public.questions WHERE id = ${q.id}`;
      deletedRG++;
    } else {
      contentSeen.set(norm, q.question_code);
    }
  }
  console.log(`  Deleted ${deletedRG} duplicate RG questions\n`);
  
  // Handle G8-FIN (Thalès duplicates)
  const finQ = await sql`
    SELECT q.id, q.question_code, q.content, c.name as cat
    FROM public.questions q
    JOIN public.categories c ON q.category_id = c.id
    WHERE q.question_code LIKE 'G8-FIN-%'
    ORDER BY q.question_code
  `;
  console.log(`G8-FIN: ${finQ.length} questions`);
  const finSeen = new Map();
  let deletedFIN = 0;
  for (const q of finQ) {
    const norm = q.content.replace(/\s+/g, ' ').trim().substring(0, 120);
    if (finSeen.has(norm)) {
      await sql`DELETE FROM public.questions WHERE id = ${q.id}`;
      deletedFIN++;
    } else {
      finSeen.set(norm, q.question_code);
    }
  }
  console.log(`  Deleted ${deletedFIN} duplicate FIN questions\n`);
  
  // Handle G5-GEO-HTR (hình tròn duplicates)
  const htrQ = await sql`
    SELECT id, question_code, content FROM public.questions
    WHERE question_code LIKE 'G5-GEO-HTR-%' ORDER BY question_code
  `;
  console.log(`G5-GEO-HTR: ${htrQ.length} questions`);
  const htrSeen = new Map();
  let deletedHTR = 0;
  for (const q of htrQ) {
    const norm = q.content.replace(/\s+/g, ' ').trim().substring(0, 120);
    if (htrSeen.has(norm)) {
      await sql`DELETE FROM public.questions WHERE id = ${q.id}`;
      deletedHTR++;
    } else {
      htrSeen.set(norm, q.question_code);
    }
  }
  console.log(`  Deleted ${deletedHTR} duplicate HTR questions\n`);
  
  // Handle 7-7-017 and 7-16-020 individual duplicates
  const indivDupes = await sql`
    SELECT id, question_code, content FROM public.questions
    WHERE question_code IN ('7-7-017', '7-16-020')
  `;
  for (const q of indivDupes) {
    await sql`DELETE FROM public.questions WHERE id = ${q.id}`;
    console.log(`Deleted individual dupe: ${q.question_code}`);
  }

  // ===== 2. Fix nội dung quá ngắn =====
  console.log('\n=== FIX NỘI DUNG QUÁ NGẮN ===\n');
  
  const shortQ = await sql`
    SELECT id, question_code, content, answer, grade
    FROM public.questions
    WHERE LENGTH(content) < 15
    ORDER BY grade DESC, question_code
  `;
  
  console.log(`Found ${shortQ.length} too-short questions:`);
  for (const q of shortQ) {
    console.log(`  ${q.question_code} [L${q.grade}]: "${q.content}" | answer: "${(q.answer||'').substring(0,50)}"`);
    // If answer is also empty/short, delete. Otherwise keep (might be intentionally terse)
    if (!q.answer || q.answer.trim().length < 5) {
      await sql`DELETE FROM public.questions WHERE id = ${q.id}`;
      console.log(`    🗑️ Deleted (no useful answer either)`);
    }
  }
  
  // ===== 3. Fix format rác còn sót =====
  console.log('\n=== FIX FORMAT RÁC CÒN SÓT ===\n');
  const junkQ = await sql`
    SELECT id, question_code, content FROM public.questions
    WHERE content LIKE '%Như vậy, kết quả%'
  `;
  console.log(`Found ${junkQ.length} remaining junk format questions`);
  for (const q of junkQ) {
    let c = q.content;
    c = c.replace(/^Thực hiện phép tính theo yêu cầu bài toán:\n/i, '');
    const idx = c.indexOf('\nNhư vậy');
    if (idx > 0) c = c.substring(0, idx);
    c = c.trim();
    if (c.length > 10 && c !== q.content) {
      await sql`UPDATE public.questions SET content = ${c} WHERE id = ${q.id}`;
      console.log(`  ✅ ${q.question_code}: cleaned`);
    }
  }
  
  // Final count
  const total = await sql`SELECT grade, COUNT(*) as c FROM public.questions GROUP BY grade ORDER BY grade DESC`;
  console.log('\n=== SAU KHI DỌN ===');
  total.forEach(r => console.log(`  Lớp ${r.grade}: ${r.c} câu`));
  const t = await sql`SELECT COUNT(*) as c FROM public.questions`;
  console.log(`  TỔNG: ${t[0].c} câu`);
})();
