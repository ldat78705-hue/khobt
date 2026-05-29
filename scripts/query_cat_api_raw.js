const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const result = await sql`SELECT * FROM categories ORDER BY sort_order ASC LIMIT 5`;
  console.log(JSON.stringify(result, null, 2));
})();
