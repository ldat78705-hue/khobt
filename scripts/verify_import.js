const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Count by category
  const counts = await sql`
    SELECT c.name as category, q.difficulty, COUNT(*) as count
    FROM public.questions q
    JOIN public.categories c ON q.category_id = c.id
    WHERE q.question_code LIKE 'V10-%'
    GROUP BY c.name, q.difficulty
    ORDER BY c.name, q.difficulty
  `;
  
  console.log('=== Import Summary ===');
  counts.forEach(r => console.log(`  ${r.category} | ${r.difficulty} | ${r.count} questions`));
  
  // Check a sample question for LaTeX quality
  const samples = await sql`
    SELECT question_code, content, answer 
    FROM public.questions 
    WHERE question_code LIKE 'V10-%' 
    ORDER BY question_code 
    LIMIT 3
  `;
  
  console.log('\n=== Sample Questions ===');
  samples.forEach(s => {
    console.log(`\n${s.question_code}:`);
    console.log(`  Content: ${s.content.substring(0, 200)}...`);
    console.log(`  Answer: ${(s.answer || 'N/A').substring(0, 150)}...`);
  });
  
  // Total
  const total = await sql`SELECT COUNT(*) as total FROM public.questions WHERE question_code LIKE 'V10-%'`;
  console.log(`\nTOTAL: ${total[0].total} questions imported`);
})();
