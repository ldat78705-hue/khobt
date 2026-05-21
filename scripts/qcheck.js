const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  for (const g of [6,7,8,9]) {
    const r = await sql`SELECT COUNT(*)::int as t FROM public.questions WHERE grade=${g}`;
    const e = await sql`SELECT COUNT(*)::int as t FROM public.categories c WHERE c.grade=${g} AND c.name LIKE 'Bài %' AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id=c.id)=0`;
    console.log('G'+g+': '+r[0].t+' qs, '+e[0].t+' empty cats');
  }
}
main();
