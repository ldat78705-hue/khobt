const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // ===== FIX: Câu format rác "Thực hiện phép tính..." =====
  // These questions have a bad format: "Thực hiện phép tính theo yêu cầu bài toán:\n[actual question]\n\nNhư vậy, kết quả chính xác..."
  // Need to extract just the actual question part
  console.log('=== FIX: Câu format rác "Thực hiện phép tính..." ===');
  
  const junk = await sql`
    SELECT id, question_code, content, answer
    FROM public.questions
    WHERE content LIKE '%Như vậy, kết quả chính xác%'
    ORDER BY question_code
  `;
  console.log(`Found ${junk.length} questions to clean\n`);
  
  let fixed = 0;
  for (const q of junk) {
    let content = q.content;
    
    // Remove prefix "Thực hiện phép tính theo yêu cầu bài toán:\n"
    content = content.replace(/^Thực hiện phép tính theo yêu cầu bài toán:\n/i, '');
    
    // Remove suffix "\n\nNhư vậy, kết quả chính xác..."
    const idx = content.indexOf('\n\nNhư vậy');
    if (idx > 0) {
      content = content.substring(0, idx);
    } else {
      const idx2 = content.indexOf('\nNhư vậy');
      if (idx2 > 0) content = content.substring(0, idx2);
    }
    
    content = content.trim();
    
    if (content !== q.content && content.length > 10) {
      await sql`UPDATE public.questions SET content = ${content} WHERE id = ${q.id}`;
      fixed++;
      console.log(`  ✅ ${q.question_code}: "${content.substring(0, 80)}..."`);
    } else {
      console.log(`  ⚠️ ${q.question_code}: couldn't clean — content too short or unchanged`);
    }
  }
  console.log(`\nCleaned: ${fixed}/${junk.length} questions`);

  // ===== FIX: Xử lý trùng lặp G9-L10 (cùng pattern "Cặp số (1;1)...") =====
  console.log('\n=== FIX: Xử lý trùng lặp ===');
  
  const dupes = await sql`
    SELECT id, question_code, content
    FROM public.questions
    WHERE question_code LIKE 'G9-L10-%'
    AND content LIKE '%Cặp số%có phải là nghiệm%'
    ORDER BY question_code
  `;
  console.log(`Found ${dupes.length} "Cặp số (1;1) là nghiệm?" questions`);
  
  if (dupes.length > 3) {
    // Keep first 3, delete the rest (too many near-identical questions)
    const toDelete = dupes.slice(3);
    for (const d of toDelete) {
      await sql`DELETE FROM public.questions WHERE id = ${d.id}`;
      console.log(`  🗑️ Deleted ${d.question_code}: ${d.content.substring(0, 60)}...`);
    }
    console.log(`Deleted ${toDelete.length} duplicate questions (kept 3)`);
  }
  
  // Also check other duplicate patterns
  const allG9 = await sql`
    SELECT id, question_code, content
    FROM public.questions
    WHERE grade = 9
    ORDER BY content
  `;
  
  // Find exact content duplicates
  const contentMap = new Map();
  let exactDupes = 0;
  for (const q of allG9) {
    const key = q.content.replace(/\s+/g, ' ').trim();
    if (contentMap.has(key)) {
      const other = contentMap.get(key);
      console.log(`  🔴 EXACT DUPE: ${q.question_code} = ${other.code}`);
      exactDupes++;
      // Delete the duplicate (keep the first one)
      await sql`DELETE FROM public.questions WHERE id = ${q.id}`;
      console.log(`    🗑️ Deleted ${q.question_code}`);
    } else {
      contentMap.set(key, { code: q.question_code, id: q.id });
    }
  }
  console.log(`\nExact duplicates removed: ${exactDupes}`);
  
  // Final count
  const total = await sql`SELECT COUNT(*) as c FROM public.questions WHERE grade = 9`;
  console.log(`\nGrade 9 total after cleanup: ${total[0].c}`);
})();
