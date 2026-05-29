const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Get all V10 questions
  const questions = await sql`
    SELECT id, question_code, content, answer, solution
    FROM public.questions
    WHERE question_code LIKE 'V10-%'
  `;
  
  console.log(`Found ${questions.length} questions to fix`);
  
  let fixed = 0;
  for (const q of questions) {
    let content = q.content || '';
    let answer = q.answer || '';
    let solution = q.solution || '';
    
    // Fix: \\( → $ and \\) → $ (inline math)
    // In DB they are stored as \\\\( which means the actual string is \\(
    // We need to replace \\( with $ and \\) with $
    function fixLatex(text) {
      if (!text) return text;
      
      // Replace \\( and \\) with $ for inline math
      let fixed = text.replace(/\\\\\(/g, '$');
      fixed = fixed.replace(/\\\\\)/g, '$');
      
      // Replace \\[ and \\] with $$ for block math
      fixed = fixed.replace(/\\\\\[/g, '$$');
      fixed = fixed.replace(/\\\\\]/g, '$$');
      
      // Also handle the • bullet points - clean up
      // Remove "• " prefix (was from HTML li elements)
      // Keep as-is, the Đáp số line is fine
      
      return fixed;
    }
    
    const newContent = fixLatex(content);
    const newAnswer = fixLatex(answer);
    const newSolution = fixLatex(solution);
    
    if (newContent !== content || newAnswer !== answer || newSolution !== solution) {
      await sql`
        UPDATE public.questions 
        SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution}
        WHERE id = ${q.id}
      `;
      fixed++;
    }
  }
  
  console.log(`Fixed ${fixed} questions`);
  
  // Verify
  const sample = await sql`
    SELECT question_code, content 
    FROM public.questions 
    WHERE question_code = 'V10-LPT-001'
    LIMIT 1
  `;
  console.log('\nVerify V10-LPT-001:');
  console.log(JSON.stringify(sample[0].content.substring(0, 200)));
})();
