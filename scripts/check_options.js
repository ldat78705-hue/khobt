const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
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
async function test() {
  const q = await sql`SELECT options FROM questions WHERE content LIKE '%Viète%'`;
  console.log(JSON.stringify(q.map(x => x.options), null, 2));
}
test();
