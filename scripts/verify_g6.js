const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  const r = await sql`SELECT COUNT(*)::int as total FROM public.questions WHERE grade = 6`;
  console.log('Total grade 6 questions: ' + r[0].total);
  const byDiff = await sql`SELECT difficulty, COUNT(*)::int as cnt FROM public.questions WHERE grade = 6 GROUP BY difficulty ORDER BY difficulty`;
  console.log('By difficulty:', JSON.stringify(byDiff));
  // Count categories with questions
  const cats = await sql`SELECT COUNT(DISTINCT category_id)::int as cnt FROM public.questions WHERE grade = 6 AND category_id IS NOT NULL`;
  console.log('Categories with questions: ' + cats[0].cnt);
}
main();
