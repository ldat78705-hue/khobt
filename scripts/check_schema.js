const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  const users = await sql`SELECT id, email, role FROM public.users WHERE role = 'admin' LIMIT 3`;
  for (const u of users) console.log(`${u.id} | ${u.email} | ${u.role}`);
  
  // Cũng kiểm tra cấu trúc bảng questions
  const cols = await sql`SELECT column_name, is_nullable, data_type FROM information_schema.columns WHERE table_name = 'questions' ORDER BY ordinal_position`;
  console.log('\nColumns:');
  for (const c of cols) console.log(`  ${c.column_name} (${c.data_type}) nullable=${c.is_nullable}`);
}
main().catch(console.error);
