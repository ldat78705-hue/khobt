const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const sql = neon(process.env.DATABASE_URL);
  
  // Delete garbage category where name is suspiciously long
  const result = await sql`DELETE FROM categories WHERE length(name) > 60`;
  console.log('Cleaned up long categories!');
}
run();
