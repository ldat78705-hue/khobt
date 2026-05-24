const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const ec = await sql`
    SELECT c.grade, COUNT(*)::int as empty
    FROM public.categories c
    WHERE c.parent_id IS NOT NULL
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0
      AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id = c.id) = 0
    GROUP BY c.grade ORDER BY c.grade`;
  console.log('=== EMPTY LEAF CATEGORIES ===');
  for (const r of ec) console.log(`G${r.grade}: ${r.empty} empty`);
}

main().catch(console.error);
