const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  const users = await sql`SELECT id, full_name, role FROM public.users WHERE role = 'admin' LIMIT 5`;
  console.log(JSON.stringify(users, null, 2));
}
main();
