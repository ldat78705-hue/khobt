const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const res = await sql`SELECT id, content, options, correct_answer FROM questions WHERE id = 'e7b2d4c2-b8e7-47f4-8429-bec889ab22fd'`;
  console.log(JSON.stringify(res, null, 2));
})();
