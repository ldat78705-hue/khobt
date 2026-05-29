const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Check actual stored content
  const samples = await sql`
    SELECT question_code, content, answer
    FROM public.questions 
    WHERE question_code LIKE 'V10-%'
    LIMIT 3
  `;
  
  for (const s of samples) {
    console.log(`\n=== ${s.question_code} ===`);
    console.log('Content (first 300 chars):');
    console.log(JSON.stringify(s.content.substring(0, 300)));
    console.log('\nAnswer (first 300 chars):');
    console.log(JSON.stringify((s.answer || '').substring(0, 300)));
  }
})();
