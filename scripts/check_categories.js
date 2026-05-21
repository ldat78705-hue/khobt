const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`
    SELECT c.id, c.name, c.grade, c.sort_order,
      (SELECT COUNT(*)::int FROM public.questions q WHERE q.category_id = c.id) as qcount
    FROM public.categories c
    WHERE c.grade IN (6,7,8,9)
    ORDER BY c.grade, c.sort_order
  `;
  console.log(JSON.stringify(cats, null, 2));
}
main();
