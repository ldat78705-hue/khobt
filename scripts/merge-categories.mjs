import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  const badParentId = '708de9f2-1db8-4472-ad12-c2cc766c4475';
  const goodParentId = '8548a37d-28e6-4047-aca8-32182c2ef629';

  const badChildren = await sql`SELECT * FROM categories WHERE parent_id = ${badParentId}`;
  const goodChildren = await sql`SELECT * FROM categories WHERE parent_id = ${goodParentId}`;

  for (const bc of badChildren) {
    const gc = goodChildren.find(c => c.name.toLowerCase().trim() === bc.name.toLowerCase().trim());
    if (gc) {
      await sql`UPDATE questions SET category_id = ${gc.id} WHERE category_id = ${bc.id}`;
      console.log(`Moved questions from ${bc.name} to ${gc.name}`);
      await sql`DELETE FROM categories WHERE id = ${bc.id}`;
      console.log(`Deleted duplicate category ${bc.name}`);
    } else {
      console.log(`No matching good child for ${bc.name}, moving to good parent`);
      await sql`UPDATE categories SET parent_id = ${goodParentId} WHERE id = ${bc.id}`;
    }
  }

  // Delete bad parent
  await sql`DELETE FROM categories WHERE id = ${badParentId}`;
  console.log('Deleted bad parent');
}

run();
