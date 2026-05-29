const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const code = 'T6-B3-NEN5';
  const q = await sql`SELECT category_id, topic, grade FROM questions WHERE question_code = ${code}`;
  console.log("Question:", q);
  
  if (q.length > 0 && q[0].category_id) {
     const c = await sql`SELECT id, name FROM categories WHERE id = ${q[0].category_id}`;
     console.log("Category:", c);
  }
})();
