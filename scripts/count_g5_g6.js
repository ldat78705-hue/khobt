const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const qg = await sql`SELECT grade, COUNT(*)::int as cnt FROM public.questions WHERE grade IN (5, 6) GROUP BY grade ORDER BY grade`;
  console.log('=== QUESTIONS PER GRADE ===');
  for (const r of qg) console.log(`G${r.grade}: ${r.cnt} questions`);
}

main().catch(console.error);
