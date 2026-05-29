const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Get HKG and VIE questions (answers written manually with \( \) format)
  const questions = await sql`
    SELECT id, question_code, answer, solution
    FROM public.questions
    WHERE question_code LIKE 'V10-HKG-%' OR question_code LIKE 'V10-VIE-%'
  `;
  
  console.log(`Processing ${questions.length} questions`);
  
  let fixed = 0;
  for (const q of questions) {
    function fixDelimiters(text) {
      if (!text) return text;
      // Replace \( with $ and \) with $ for inline math
      // In the DB, \( is stored as \\( (single escaped)
      let f = text;
      f = f.replace(/\\\(/g, '$');
      f = f.replace(/\\\)/g, '$');
      // Replace \[ with $$ and \] with $$ for block math  
      f = f.replace(/\\\[/g, '$$');
      f = f.replace(/\\\]/g, '$$');
      return f;
    }
    
    const na = fixDelimiters(q.answer);
    const ns = fixDelimiters(q.solution);
    
    if (na !== q.answer || ns !== q.solution) {
      await sql`UPDATE public.questions SET answer=${na}, solution=${ns} WHERE id=${q.id}`;
      fixed++;
    }
  }
  
  console.log(`Fixed ${fixed} answers`);
  
  // Also fix the LPT content that has \\% (should be just \%)
  const lptQuestions = await sql`
    SELECT id, content, answer, solution
    FROM public.questions
    WHERE question_code LIKE 'V10-LPT-%'
  `;
  
  let lptFixed = 0;
  for (const q of lptQuestions) {
    function fixPercent(text) {
      if (!text) return text;
      // $15\\%$ -> $15\%$ (remove extra backslash)
      return text.replace(/\\\\\\/g, '\\');
    }
    const nc = fixPercent(q.content);
    const na = fixPercent(q.answer);
    const ns = fixPercent(q.solution);
    if (nc !== q.content || na !== q.answer || ns !== q.solution) {
      await sql`UPDATE public.questions SET content=${nc}, answer=${na}, solution=${ns} WHERE id=${q.id}`;
      lptFixed++;
    }
  }
  console.log(`Fixed ${lptFixed} LPT percent signs`);
  
  // Verify
  const samples = await sql`
    SELECT question_code, content, answer
    FROM public.questions 
    WHERE question_code IN ('V10-LPT-001', 'V10-HKG-001', 'V10-VIE-001', 'V10-HKG-012')
  `;
  
  for (const s of samples) {
    console.log(`\n=== ${s.question_code} ===`);
    console.log('Content:', JSON.stringify(s.content.substring(0, 250)));
    console.log('Answer:', JSON.stringify((s.answer||'').substring(0, 250)));
  }
})();
