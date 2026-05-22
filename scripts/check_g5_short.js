import { neon } from '@neondatabase/serverless';

const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const codes = ['T5-B10-002', 'T5-B14-001', 'T5-B14-002', 'T5-B24-004', 'T5-B28-003', 'T5-B30-001', 'T5-B30-003', 'T5-B31-004'];
  const qs = await sql`SELECT question_code, solution FROM public.questions WHERE question_code = ANY(${codes})`;
  console.log(qs);
}

main().catch(console.error);
