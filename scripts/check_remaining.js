const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  // All empty leaf categories for G6-G9 (should be nearly 0)
  for (const g of [6, 7, 8, 9]) {
    const cats = await sql`
      SELECT c.id, c.name, p.name as parent_name
      FROM public.categories c
      LEFT JOIN public.categories p ON c.parent_id = p.id
      WHERE c.grade=${g} AND c.parent_id IS NOT NULL
        AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id) = 0
        AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id=c.id) = 0
      ORDER BY c.sort_order, c.name`;
    if (cats.length > 0) {
      console.log(`\n=== G${g}: ${cats.length} TRỐNG ===`);
      for (const r of cats) console.log(`'${r.id}', // ${r.parent_name} > ${r.name}`);
    } else {
      console.log(`G${g}: OK (0 trống)`);
    }
  }
}
main().catch(console.error);
