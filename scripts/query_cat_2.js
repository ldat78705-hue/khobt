const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const c = await sql`SELECT id, name FROM categories WHERE id = 'c7854e13-38e0-4426-9b37-81d97ca07f62'`;
  console.log("Category:", c);
})();
