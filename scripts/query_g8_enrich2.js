const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`
    SELECT c.id, c.name 
    FROM public.categories c
    WHERE c.grade = 8 AND c.parent_id IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 FROM public.categories sub WHERE sub.parent_id = c.id
    )
    ORDER BY c.sort_order
    OFFSET 6
    LIMIT 6
  `;
  console.log(cats);
}
main();
