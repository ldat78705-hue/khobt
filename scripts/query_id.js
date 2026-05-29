const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const id = '65582e77-dbea-41da-a9b3-d410b93b91ec';
  const q = await sql`SELECT category_id, topic, grade FROM questions WHERE id = ${id}`;
  console.log("Question:", q);
  
  if (q.length > 0 && q[0].category_id) {
     const c = await sql`SELECT id, name FROM categories WHERE id = ${q[0].category_id}`;
     console.log("Category:", c);
  }
})();
