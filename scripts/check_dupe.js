const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Check the duplicate
  const dupes = await sql`
    SELECT question_code, content, answer 
    FROM public.questions 
    WHERE question_code IN ('V10-VIE-019', 'V10-VIE-020')
    ORDER BY question_code
  `;
  
  for (const d of dupes) {
    console.log(`\n=== ${d.question_code} ===`);
    console.log('Content:', d.content);
    console.log('Answer:', (d.answer || '').substring(0, 200));
  }
  
  // Check if they are truly duplicates
  const same = dupes[0].content.substring(0,100) === dupes[1].content.substring(0,100);
  console.log(`\nFirst 100 chars match: ${same}`);
})();
