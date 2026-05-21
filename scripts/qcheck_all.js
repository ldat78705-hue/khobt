const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  for (const g of [4, 5, 6, 7, 8, 9]) {
    const qr = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE grade=${g}`;
    const er = await sql`
      SELECT COUNT(*)::int as cnt FROM public.categories c
      WHERE c.grade=${g} AND c.parent_id IS NOT NULL
        AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id) = 0
        AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id=c.id) = 0`;
    console.log(`G${g}: ${qr[0].cnt} qs, ${er[0].cnt} empty leaf cats`);
  }
  const total = await sql`SELECT COUNT(*)::int as cnt FROM public.questions`;
  console.log(`\nTOTAL: ${total[0].cnt} questions`);
}
main().catch(console.error);
