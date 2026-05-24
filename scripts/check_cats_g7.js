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
  const cats = await sql`SELECT id, name FROM categories WHERE grade = 7 AND is_active = true ORDER BY sort_order LIMIT 15`;
  console.log(cats);
}
test();
