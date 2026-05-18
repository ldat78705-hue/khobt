const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function run() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Check if foreign key allows delete
    // Or just clear out old ones matching specific names
    await sql`DELETE FROM categories WHERE slug LIKE '%toan-%' AND length(name) > 50`;
    
    // Instead of deleting everything, just delete categories not in our new demo-data
    // For now, let's just delete the root "Toán lớp X" categories
    await sql`DELETE FROM categories WHERE slug IN ('toan-9', 'toan-8', 'toan-7', 'toan-5', 'toan-4')`;
    
    console.log('Cleaned up old categories');
  } catch (err) {
    console.log(err.message);
  }
}
run();
