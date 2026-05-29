const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const code = 'V10-HKG-024';
  const res = await sql`SELECT id, topic, content, answer, solution FROM questions WHERE question_code = ${code}`;
  console.log(JSON.stringify(res, null, 2));
})();
