const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const u = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/).find(l => l.startsWith('DATABASE_URL=')).substring(13).replace(/"/g, '').trim();
const sql = neon(u);
sql`SELECT id, name FROM categories WHERE grade = 9 AND name LIKE '%Bất đẳng thức%' LIMIT 10`.then(console.log);
