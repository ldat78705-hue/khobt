import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function getCategories() {
  const categories = await sql`
    SELECT id, name
    FROM public.categories
    WHERE grade = 5
      AND name ~ '^Bài (49|5[0-9]|6[0-9]|7[0-5]):'
    ORDER BY string_to_array(name, ' ')::text[];
  `;
  console.log(categories);
}

getCategories().catch(console.error);
