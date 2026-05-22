import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function getEmptyG4Categories() {
  const categories = await sql`
    SELECT c.id, c.name
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id AND q.grade = 4
    WHERE c.grade = 4 AND c.parent_id IS NOT NULL AND q.id IS NULL
    ORDER BY c.sort_order;
  `;
  console.log('Found empty categories:', categories.length);
  fs.writeFileSync('empty_g4.json', JSON.stringify(categories, null, 2));
}

getEmptyG4Categories().catch(console.error);
