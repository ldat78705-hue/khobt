const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const q = await sql`SELECT COUNT(*) FROM questions`;
  console.log("Total questions:", q[0].count);
})();
