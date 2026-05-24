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
  const q = await sql`SELECT options FROM questions WHERE id = '2ef6292c-0067-4919-b578-fb4e53e04062'`;
  console.log(JSON.stringify(q[0].options, null, 2));
}
test();
