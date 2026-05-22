import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const categories = await sql`
    SELECT id, name, parent_id, sort_order
    FROM categories
    WHERE grade = 9
    ORDER BY sort_order
  `;
  console.log(categories);
}
main();
