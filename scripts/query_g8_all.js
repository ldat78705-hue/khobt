const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`
    SELECT c.id, c.name, COUNT(q.id) as q_count
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id
    WHERE c.grade = 8 AND c.parent_id IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 FROM public.categories sub WHERE sub.parent_id = c.id
    )
    GROUP BY c.id, c.name
    ORDER BY c.name
    LIMIT 20
  `;
  console.log(cats);
}
main();
