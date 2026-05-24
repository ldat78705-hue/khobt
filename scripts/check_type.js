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
  const q = await sql`SELECT options FROM questions WHERE options IS NOT NULL LIMIT 2`;
  console.log('type:', typeof q[0].options);
  console.log('isArray:', Array.isArray(q[0].options));
  if (typeof q[0].options === 'string') {
     console.log('value:', q[0].options.substring(0, 50));
  }
}
test();
