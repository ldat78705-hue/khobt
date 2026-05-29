const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const id = '8fcfe48c-aa90-44df-b700-ab1181fa5cb3';
  const res = await sql`SELECT id, topic, content, answer, solution FROM questions WHERE id = ${id}`;
  console.log(JSON.stringify(res, null, 2));
})();
