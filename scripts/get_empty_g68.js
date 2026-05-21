const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  // Grade 6 - also check "Bài tập" categories
  console.log('=== GRADE 6 ALL EMPTY (Bài + BTC) ===');
  const g6 = await sql`
    SELECT c.id, c.name, p.name as parent_name
    FROM public.categories c
    LEFT JOIN public.categories p ON c.parent_id = p.id
    WHERE c.grade=6 AND (c.name LIKE 'Bài %' OR c.name LIKE 'Bài tập%')
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id)=0
    ORDER BY p.name, c.name`;
  for (const r of g6) console.log(`  ${r.id} | ${r.parent_name} > ${r.name}`);
  console.log('Total: '+g6.length);

  // Grade 8 - list all empty
  console.log('\n=== GRADE 8 ALL EMPTY ===');
  const g8 = await sql`
    SELECT c.id, c.name, p.name as parent_name
    FROM public.categories c
    LEFT JOIN public.categories p ON c.parent_id = p.id
    WHERE c.grade=8 AND (c.name LIKE 'Bài %' OR c.name LIKE 'Bài tập%')
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id)=0
    ORDER BY p.name, c.name`;
  for (const r of g8) console.log(`  ${r.id} | ${r.parent_name} > ${r.name}`);
  console.log('Total: '+g8.length);
}
main().catch(console.error);
