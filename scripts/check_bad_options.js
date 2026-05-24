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
  const q = await sql`SELECT id, options FROM questions WHERE options IS NOT NULL`;
  for (const row of q) {
    if (!Array.isArray(row.options)) {
      console.log('Not array:', row.id, typeof row.options);
      continue;
    }
    for (const opt of row.options) {
      if (!opt || typeof opt !== 'object' || !opt.value || typeof opt.value !== 'string') {
        console.log('Bad option:', row.id, opt);
      }
    }
  }
  console.log('Done');
}
test();
