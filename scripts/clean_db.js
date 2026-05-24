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
  let badIds = [];
  for (const row of q) {
    if (!Array.isArray(row.options)) continue;
    for (const opt of row.options) {
      if (!opt || typeof opt !== 'object' || typeof opt.value !== 'string') {
        badIds.push(row.id);
        break;
      }
    }
  }
  console.log(`Found ${badIds.length} bad questions`);
  if (badIds.length > 0) {
     for (const id of badIds) {
       await sql`DELETE FROM questions WHERE id = ${id}`;
     }
     console.log('Deleted bad questions.');
  }
}
test();
