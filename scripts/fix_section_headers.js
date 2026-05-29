const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Find and fix section headers accidentally merged into question content
  const questions = await sql`
    SELECT id, question_code, content
    FROM public.questions
    WHERE question_code LIKE 'V10-VIE-%'
    ORDER BY question_code
  `;
  
  const sectionHeaders = [
    /\nDạng \d+:.*/g,
    /\nPHẦN [A-Z]:.*/g,
    /\n\(Dạng .*/g,
    /\nPhương pháp giải:.*/g,
    /\n\(Yêu cầu:.*/g,
  ];
  
  let fixed = 0;
  for (const q of questions) {
    let content = q.content;
    let changed = false;
    
    for (const re of sectionHeaders) {
      const newContent = content.replace(re, '');
      if (newContent !== content) {
        content = newContent;
        changed = true;
      }
    }
    
    if (changed) {
      content = content.trim();
      await sql`UPDATE public.questions SET content = ${content} WHERE id = ${q.id}`;
      fixed++;
      console.log(`✅ Fixed ${q.question_code}: removed section headers`);
    }
  }
  
  console.log(`\nFixed ${fixed} questions with section header contamination`);
  
  // Also fix HKG content that has "• Đáp số:" hint lines in LPT
  // Check LPT for "Đáp số:" lines that should be separated
  const lptQuestions = await sql`
    SELECT id, question_code, content
    FROM public.questions
    WHERE question_code LIKE 'V10-LPT-%'
    AND content LIKE '%Đáp số:%'
    ORDER BY question_code
  `;
  
  console.log(`\nLPT questions with embedded "Đáp số:": ${lptQuestions.length}`);
  // These are fine as hints - the "Đáp số:" is part of the problem statement
  // showing expected answer. We'll keep them.
  
  // Run final count
  const total = await sql`SELECT COUNT(*) as c FROM public.questions WHERE question_code LIKE 'V10-%'`;
  console.log(`\nTotal V10 questions in DB: ${total[0].c}`);
})();
