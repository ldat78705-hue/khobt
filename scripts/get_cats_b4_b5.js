const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const u = fs.readFileSync('d:/khode/.env.local', 'utf8').split(/\r?\n/).find(l => l.startsWith('DATABASE_URL=')).substring(13).replace(/"/g, '').trim();
const sql = neon(u);
sql`SELECT id, name FROM categories WHERE grade = 6 AND (name LIKE 'Bài 4.%' OR name LIKE 'Bài 5.%')`.then(console.log);
