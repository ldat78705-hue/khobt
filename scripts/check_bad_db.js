const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const qs = await sql`SELECT id, content FROM public.questions WHERE content LIKE '%\\text{ cm}%' LIMIT 10`;
  for(const q of qs) {
    console.log(q.content);
  }
}
main().catch(console.error);
