const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const id = '9630997b-e797-4029-b7a7-f9d2bd285c3d';
  const res = await sql`SELECT id, content, answer, solution FROM questions WHERE id = ${id}`;
  console.log(JSON.stringify(res, null, 2));
})();
