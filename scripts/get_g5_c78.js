import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function getCategories() {
  const categories = await sql`
    SELECT id, name
    FROM public.categories
    WHERE grade = 5
      AND (name LIKE 'Bài 40:%' OR name LIKE 'Bài 41:%' OR name LIKE 'Bài 42:%' OR name LIKE 'Bài 43:%' OR name LIKE 'Bài 44:%' OR name LIKE 'Bài 45:%' OR name LIKE 'Bài 46:%' OR name LIKE 'Bài 47:%' OR name LIKE 'Bài 48:%')
    ORDER BY name;
  `;
  console.log(categories);
}

getCategories().catch(console.error);
