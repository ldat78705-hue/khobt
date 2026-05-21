const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  // Get 5 empty G5 categories
  const cats = await sql`
    SELECT c.id, c.name, c.grade
    FROM public.categories c
    WHERE c.parent_id IS NOT NULL
      AND c.grade = 5
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0
      AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id = c.id) = 0
    ORDER BY c.sort_order, c.name
    LIMIT 5`;
  for (const r of cats) console.log(`'${r.id}', // G5 - ${r.name}`);
}
main().catch(console.error);
