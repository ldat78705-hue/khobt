const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // ===== FIX 1: \appro\times → \approx =====
  console.log('=== FIX 1: \\appro\\times → \\approx ===');
  const broken = await sql`
    SELECT id, question_code, content, answer, solution
    FROM public.questions
    WHERE content LIKE '%appro%times%' OR answer LIKE '%appro%times%' OR solution LIKE '%appro%times%'
  `;
  console.log(`Found ${broken.length} questions with \\appro\\times`);
  
  let fixed1 = 0;
  for (const q of broken) {
    function fixApprox(t) {
      if (!t) return t;
      return t.replace(/\\appro\\times/g, '\\approx');
    }
    const nc = fixApprox(q.content);
    const na = fixApprox(q.answer);
    const ns = fixApprox(q.solution);
    if (nc !== q.content || na !== q.answer || ns !== q.solution) {
      await sql`UPDATE public.questions SET content=${nc}, answer=${na}, solution=${ns} WHERE id=${q.id}`;
      fixed1++;
      console.log(`  ✅ ${q.question_code}`);
    }
  }
  console.log(`Fixed: ${fixed1}\n`);

  // ===== FIX 2: Câu hỏi sai chuyên mục (PT bậc 2 nằm trong Chương I) =====
  console.log('=== FIX 2: Kiểm tra câu sai chuyên mục ===');
  // Get Chương I category IDs
  const ch1 = await sql`
    SELECT id, name FROM public.categories 
    WHERE name LIKE 'CHƯƠNG I%' AND grade = 9
  `;
  if (ch1.length > 0) {
    const ch1Id = ch1[0].id;
    const wrongCat = await sql`
      SELECT id, question_code, content 
      FROM public.questions 
      WHERE category_id = ${ch1Id}
      AND (content LIKE '%x^2%' OR content LIKE '%bậc hai%' OR content LIKE '%căn bậc%' 
           OR content LIKE '%hàm số%' OR content LIKE '%đồ thị%')
    `;
    console.log(`Found ${wrongCat.length} possibly wrong category questions in Chương I`);
    for (const q of wrongCat) {
      console.log(`  ⚠️ ${q.question_code}: ${q.content.substring(0, 100)}...`);
    }
  }
  
  // ===== FIX 3: Detect and count "rác" format questions =====
  console.log('\n=== FIX 3: Câu hỏi format rác ===');
  const junk = await sql`
    SELECT id, question_code, content, category_id
    FROM public.questions
    WHERE grade = 9 
    AND content LIKE '%Như vậy, kết quả chính xác%'
  `;
  console.log(`Found ${junk.length} questions with "Như vậy, kết quả chính xác..." format`);
  for (const q of junk) {
    console.log(`  ⚠️ ${q.question_code}: ${q.content.substring(0, 120)}...`);
  }

  // ===== SUMMARY =====
  console.log('\n=== TỔNG KẾT FIX ===');
  console.log(`Fix \\appro\\times → \\approx: ${fixed1} câu`);
})();
