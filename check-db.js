const fs = require('fs');
const { neon } = require('@neondatabase/serverless');
const lines = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/);
let u = '';
for (const l of lines) {
  if (l.startsWith('DATABASE_URL=')) {
    let v = l.substring(13).trim();
    if (v[0] === '"') v = v.slice(1, -1);
    u = v;
  }
}
const sql = neon(u);

async function check() {
  const [e, q, hn, us] = await Promise.all([
    sql`SELECT COUNT(*) as c FROM public.exams`,
    sql`SELECT COUNT(*) as c FROM public.questions`,
    sql`SELECT COUNT(*) as c FROM public.exams WHERE title LIKE '%Hà Nội%'`,
    sql`SELECT COUNT(*) as c FROM public.users`,
  ]);
  console.log('Exams:', e[0].c, '| Questions:', q[0].c, '| HN exams:', hn[0].c, '| Users:', us[0].c);
  
  // Check users table structure for is_active/approved
  const cols = await sql`SELECT column_name FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position`;
  console.log('User columns:', cols.map(c => c.column_name).join(', '));
}
check().catch(console.error);
