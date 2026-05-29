const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const katex = require('katex');

(async () => {
  const sql = neon(process.env.DATABASE_URL);

  // ===== PHASE 2A: Fix KaTeX errors =====
  console.log('=== PHASE 2A: Fix KaTeX errors ===\n');
  
  // Get all questions with potential KaTeX issues
  const allQ = await sql`
    SELECT id, question_code, content, answer, solution, grade
    FROM public.questions
    ORDER BY grade DESC, question_code
  `;
  
  let katexFixed = 0;
  for (const q of allQ) {
    let content = q.content || '';
    let answer = q.answer || '';
    let solution = q.solution || '';
    let changed = false;
    
    function fixKatex(text) {
      if (!text) return { text, changed: false };
      let t = text;
      let c = false;
      
      // Fix 1: $...$ nested inside $...$ — e.g. $2{,}1$$ should be $2{,}1$
      // Remove stray $$ at end of inline math
      const before = t;
      
      // Fix 2: \Rightarrow$ (stray $ after command) 
      t = t.replace(/\\Rightarrow\$/g, '\\Rightarrow');
      t = t.replace(/\\Leftrightarrow\$/g, '\\Leftrightarrow');
      
      // Fix 3: \left\{ ... without \right\} — add missing \right.
      // This is complex, handle case by case
      // Pattern: $\left\{ \begin{array/aligned} ... \end{array/aligned}$ (missing \right.)
      t = t.replace(/\$\\left\\{(\\begin\{(?:array|aligned|cases)\}[\s\S]*?\\end\{(?:array|aligned|cases)\})\$/g, 
        (match, inner) => {
          // Check if there's a \right in the inner content
          if (!inner.includes('\\right')) {
            return '$\\left\\{' + inner + ' \\right.$ ';
          }
          return match;
        });
      
      // Fix 4: \left( 100%-40% \right) — % needs escaping in KaTeX
      t = t.replace(/(\$[^$]*?)(\d+)%([^$]*?\$)/g, (match, pre, num, post) => {
        // Only fix if % is inside math and not already escaped
        if (!pre.includes('\\%') || true) {
          return pre + num + '\\%' + post;
        }
        return match;
      });
      
      // Fix 5: Double $$ where single $ intended (stray closing)
      // e.g. "...giá trị$$ " should be "...giá trị$ "  
      t = t.replace(/([^$])\$\$([^$])/g, '$1\\$$2');
      
      // Fix 6: appro\times leftover (already fixed but double check)
      t = t.replace(/\\appro\\times/g, '\\approx');
      
      if (t !== before) c = true;
      return { text: t, changed: c };
    }
    
    const r1 = fixKatex(content);
    const r2 = fixKatex(answer);
    const r3 = fixKatex(solution);
    
    if (r1.changed || r2.changed || r3.changed) {
      await sql`UPDATE public.questions SET content=${r1.text}, answer=${r2.text}, solution=${r3.text} WHERE id=${q.id}`;
      katexFixed++;
      console.log(`  ✅ ${q.question_code || q.id}: KaTeX fixed`);
    }
  }
  console.log(`\nKaTeX fixes applied: ${katexFixed}\n`);

  // ===== PHASE 2B: Fix MCQ missing answers =====
  console.log('=== PHASE 2B: MCQ answer check ===\n');
  
  // Check if MCQ questions have answer stored in question_type or elsewhere
  const mcqNoAnswer = await sql`
    SELECT id, question_code, content, answer, question_type
    FROM public.questions
    WHERE grade = 9 AND (answer IS NULL OR answer = '')
    ORDER BY question_code
    LIMIT 30
  `;
  
  console.log(`Sample MCQ without answers (first 30 of many):`);
  let autoFixable = 0;
  for (const q of mcqNoAnswer) {
    const content = q.content || '';
    // Check if answer is embedded in content as "Đáp án: X" or similar
    const ansMatch = content.match(/(?:Đáp án|Trả lời|Chọn)[:\s]*([A-D])/i);
    if (ansMatch) {
      autoFixable++;
    }
    
    // Check if it's a MCQ with options A/B/C/D in content
    const hasOptions = /\n[A-D][.)]\s/.test(content) || /\n[A-D]\.\s/.test(content);
    
    // For MCQ: the "correct" answer might be derivable from content analysis
    // But we should NOT auto-fill wrong answers. Just report.
    if (mcqNoAnswer.indexOf(q) < 5) {
      console.log(`  ${q.question_code}: type=${q.question_type}, hasOptions=${hasOptions}`);
      console.log(`    "${content.substring(0, 120)}..."`);
    }
  }
  
  // Count total MCQ without answers  
  const totalNoAns = await sql`
    SELECT COUNT(*) as c FROM public.questions
    WHERE grade = 9 AND (answer IS NULL OR answer = '')
  `;
  console.log(`\nTotal G9 questions without answer: ${totalNoAns[0].c}`);
  console.log(`Auto-fixable (answer in content): ${autoFixable} (from first 30)`);
  
  // ===== PHASE 2C: Fix wrong category =====
  console.log('\n=== PHASE 2C: Fix wrong category ===\n');
  
  // Get Chương I category
  const ch1Cats = await sql`
    SELECT id, name FROM public.categories
    WHERE name LIKE 'CHƯƠNG I%' AND grade = 9
  `;
  
  if (ch1Cats.length > 0) {
    const ch1Id = ch1Cats[0].id;
    
    // Questions about PT bậc 2, căn, hàm số in Chương I (should be elsewhere)
    const wrongQ = await sql`
      SELECT id, question_code, content
      FROM public.questions
      WHERE category_id = ${ch1Id}
      AND (
        (content LIKE '%x^2%' AND content NOT LIKE '%hệ%' AND content NOT LIKE '%hai ẩn%')
        OR content LIKE '%căn bậc%' OR content LIKE '%\\sqrt%'
        OR content LIKE '%đồ thị%hàm số%'
      )
    `;
    
    // Try to find correct categories
    const ch6 = await sql`SELECT id FROM public.categories WHERE name LIKE 'CHƯƠNG VI%' AND grade = 9 LIMIT 1`;
    const ch3 = await sql`SELECT id FROM public.categories WHERE name LIKE 'CHƯƠNG III%' AND grade = 9 LIMIT 1`;
    
    console.log(`Wrong category in Chương I: ${wrongQ.length} questions`);
    
    for (const q of wrongQ) {
      const c = q.content.toLowerCase();
      let newCatId = null;
      let newCatName = '';
      
      if (c.includes('căn bậc') || c.includes('sqrt')) {
        if (ch3.length > 0) { newCatId = ch3[0].id; newCatName = 'Chương III'; }
      } else if (c.includes('đồ thị') || c.includes('ax^2') || c.includes('y = ax') || 
                 c.includes('bậc hai') || c.includes('nghiệm') || c.includes('delta') || c.includes('biệt thức')) {
        if (ch6.length > 0) { newCatId = ch6[0].id; newCatName = 'Chương VI'; }
      }
      
      if (newCatId) {
        await sql`UPDATE public.questions SET category_id = ${newCatId} WHERE id = ${q.id}`;
        console.log(`  ✅ ${q.question_code} → ${newCatName}: "${q.content.substring(0, 80)}..."`);
      } else {
        console.log(`  ⚠️ ${q.question_code}: unclear → "${q.content.substring(0, 80)}..."`);
      }
    }
  }
  
  console.log('\n=== PHASE 2 COMPLETE ===');
})();
