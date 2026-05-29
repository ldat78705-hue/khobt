const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Check for remaining issues
  const questions = await sql`
    SELECT id, question_code, content, answer, solution
    FROM public.questions
    WHERE question_code LIKE 'V10-%'
  `;
  
  let fixCount = 0;
  for (const q of questions) {
    function fixExtra(text) {
      if (!text) return text;
      let f = text;
      // Fix double-escaped backslashes inside $...$ math
      // \\\\frac -> \\frac, \\\\cdot -> \\cdot, etc.
      // Actually we need to fix \\\\ -> \\ inside math blocks
      f = f.replace(/\\\\\\\\/g, '\\\\');
      return f;
    }
    
    const nc = fixExtra(q.content);
    const na = fixExtra(q.answer);
    const ns = fixExtra(q.solution);
    
    if (nc !== q.content || na !== q.answer || ns !== q.solution) {
      await sql`UPDATE public.questions SET content=${nc}, answer=${na}, solution=${ns} WHERE id=${q.id}`;
      fixCount++;
    }
  }
  
  console.log(`Fixed double-escaped backslashes: ${fixCount} questions`);
  
  // Verify multiple samples
  const samples = await sql`
    SELECT question_code, content, answer
    FROM public.questions 
    WHERE question_code IN ('V10-LPT-001', 'V10-HKG-001', 'V10-VIE-001')
  `;
  
  for (const s of samples) {
    console.log(`\n=== ${s.question_code} ===`);
    console.log('Content:', JSON.stringify(s.content.substring(0, 200)));
    console.log('Answer:', JSON.stringify((s.answer||'').substring(0, 200)));
  }
})();
