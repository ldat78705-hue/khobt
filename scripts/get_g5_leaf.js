const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`SELECT c.id, c.name, p.name as parent_name FROM public.categories c JOIN public.categories p ON c.parent_id = p.id WHERE c.grade = 5 ORDER BY p.sort_order, c.sort_order LIMIT 3`;
  console.log(cats);
}

main().catch(console.error);
