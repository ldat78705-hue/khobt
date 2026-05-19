import { neon } from '@neondatabase/serverless';
import { CATEGORIES } from './src/lib/demo-data';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  const sql = neon(process.env.DATABASE_URL!);
  const catMapping: Record<string, string> = {};
  
  const sortedCats = [...CATEGORIES].sort((a, b) => {
    if (!a.parent_id && b.parent_id) return -1;
    if (a.parent_id && !b.parent_id) return 1;
    return 0;
  });

  let count = 0;
  for (const cat of sortedCats) {
    const parentUuid = cat.parent_id ? catMapping[cat.parent_id] : null;
    try {
      const res = await sql`
        INSERT INTO categories (name, slug, description, grade, parent_id, icon, color, sort_order)
        VALUES (${cat.name}, ${cat.slug}, ${cat.description}, ${cat.grade}, ${parentUuid}, ${cat.icon}, ${cat.color}, ${cat.sort_order})
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name,
          parent_id = EXCLUDED.parent_id,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `;
      catMapping[cat.id] = res[0].id;
      count++;
    } catch (err: any) {
      console.log('Failed to insert cat:', cat.slug, err.message);
    }
  }
  console.log('Seeded', count, 'categories');
}

run();
