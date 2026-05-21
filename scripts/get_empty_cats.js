const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  for (const g of [6,8,9]) {
    console.log('\n=== GRADE '+g+' EMPTY ===');
    const rows = await sql`
      SELECT c.id, c.name, c.slug, p.name as parent_name
      FROM public.categories c
      LEFT JOIN public.categories p ON c.parent_id = p.id
      WHERE c.grade=${g} AND c.name LIKE 'Bài %'
        AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id)=0
      ORDER BY p.name, c.name`;
    for (const r of rows) {
      console.log(`  ${r.id} | ${r.parent_name} > ${r.name} | ${r.slug}`);
    }
    console.log('Total empty: '+rows.length);
  }

  // Also check BTC (Bài tập cuối chương) for grade 6
  console.log('\n=== GRADE 6 BTC ===');
  const btc6 = await sql`
    SELECT c.id, c.name, c.slug, p.name as parent_name
    FROM public.categories c
    LEFT JOIN public.categories p ON c.parent_id = p.id
    WHERE c.grade=6 AND c.name LIKE 'Bài tập%'
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id)=0
    ORDER BY p.name, c.name`;
  for (const r of btc6) {
    console.log(`  ${r.id} | ${r.parent_name} > ${r.name} | ${r.slug}`);
  }
  console.log('Total: '+btc6.length);
}
main().catch(console.error);
