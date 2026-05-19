import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  const parents = await sql`
    SELECT grade, name FROM categories WHERE parent_id IS NULL ORDER BY grade, sort_order
  `;
  console.log(JSON.stringify(parents, null, 2));
}

run();
