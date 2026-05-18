const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const sql = neon(process.env.DATABASE_URL);
  const cats = await sql`SELECT id, slug, name, grade FROM categories WHERE grade = 7`;
  console.log('Grade 7 Cats:', cats);
}
run();
