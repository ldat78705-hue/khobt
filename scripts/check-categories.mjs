import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  const categories = await sql`SELECT id, name, parent_id, grade, sort_order FROM categories WHERE name ILIKE '%SỐ HỮU TỈ%'`;
  console.log(JSON.stringify(categories, null, 2));
}

run();
