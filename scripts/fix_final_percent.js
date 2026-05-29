const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Fix remaining \\% -> \% in all V10 questions
  // In JSON output \\\\% means actual stored string is \\% but KaTeX only needs \%
  // Actually in the DB, the actual bytes are: \ \ % 
  // KaTeX MathRenderer already escapes % via: latex.replace(/(^|[^\\])%/g, '$1\\%')
  // So the doubled backslash will cause issues. Let's check what's actually in DB
  
  const questions = await sql`
    SELECT id, question_code, content, answer, solution
    FROM public.questions
    WHERE question_code LIKE 'V10-%'
    AND (content LIKE '%\\\\%' OR answer LIKE '%\\\\%' OR solution LIKE '%\\\\%')
  `;
  
  console.log(`Questions with double-backslash-percent: ${questions.length}`);
  
  // The DB stores literal \\ before % but KaTeX only needs single \
  // MathRenderer already adds \% for bare %, so we should store just %
  // Actually KaTeX handles % fine with \%, so single backslash is correct
  // The issue is: DB has \\% (two backslashes), needs \%
  
  let fixed = 0;
  for (const q of questions) {
    function fixDoubleBS(text) {
      if (!text) return text;
      // Replace \\% with \% everywhere (not just inside $)
      return text.replace(/\\\\%/g, '\\%');
    }
    
    const nc = fixDoubleBS(q.content);
    const na = fixDoubleBS(q.answer);
    const ns = fixDoubleBS(q.solution);
    
    if (nc !== q.content || na !== q.answer || ns !== q.solution) {
      await sql`UPDATE public.questions SET content=${nc}, answer=${na}, solution=${ns} WHERE id=${q.id}`;
      fixed++;
    }
  }
  console.log(`Fixed: ${fixed}`);
  
  // Final verify
  const s = await sql`SELECT content, answer FROM public.questions WHERE question_code='V10-LPT-001'`;
  console.log('\nV10-LPT-001 content (first 200):', JSON.stringify(s[0].content.substring(0,200)));
  console.log('V10-LPT-001 answer (first 200):', JSON.stringify(s[0].answer.substring(0,200)));
  
  const s2 = await sql`SELECT content, answer FROM public.questions WHERE question_code='V10-VIE-001'`;
  console.log('\nV10-VIE-001 content:', JSON.stringify(s2[0].content));
  console.log('V10-VIE-001 answer (first 300):', JSON.stringify(s2[0].answer.substring(0,300)));
  
  const s3 = await sql`SELECT content, answer FROM public.questions WHERE question_code='V10-HKG-012'`;
  console.log('\nV10-HKG-012 answer:', JSON.stringify(s3[0].answer));
})();
