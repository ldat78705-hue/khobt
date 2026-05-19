import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
async function main() {
  const sql = neon(process.env.DATABASE_URL);
  const cats = await sql`SELECT id, name, slug FROM categories WHERE grade = 7 ORDER BY name`;
  cats.forEach(c => console.log(c.name, '|||', c.id));
}
main();
