const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  for (const g of [4, 5]) {
    console.log(`\n=== LỚP ${g} ===`);
    const cats = await sql`
      SELECT c.id, c.name, p.name as parent_name,
        (SELECT COUNT(*)::int FROM public.questions q WHERE q.category_id = c.id) as qcount
      FROM public.categories c
      LEFT JOIN public.categories p ON c.parent_id = p.id
      WHERE c.grade = ${g}
      ORDER BY c.sort_order, c.name`;
    for (const r of cats) {
      const indent = r.parent_name ? '  └─' : '📁';
      console.log(`${indent} ${r.name} [${r.qcount} câu] ${r.qcount === 0 && r.parent_name ? '⚠️ TRỐNG' : ''}`);
      if (!r.parent_name) continue; // skip parent
    }
  }
}
main().catch(console.error);
