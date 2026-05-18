import { Pool } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
    const match = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/);
    if (match) DATABASE_URL = match[1];
  } catch {}
}

const pool = new Pool({ connectionString: DATABASE_URL });

async function check() {
  const result = await pool.query(`
    SELECT c1.name as parent_name, c1.grade, c2.name as child_name 
    FROM categories c1
    LEFT JOIN categories c2 ON c2.parent_id = c1.id
    WHERE c1.parent_id IS NULL
    ORDER BY c1.grade, c1.sort_order, c2.sort_order;
  `);

  const grades = {};
  for (const row of result.rows) {
    if (!grades[row.grade]) grades[row.grade] = {};
    if (!grades[row.grade][row.parent_name]) grades[row.grade][row.parent_name] = [];
    if (row.child_name) {
      grades[row.grade][row.parent_name].push(row.child_name);
    }
  }

  for (const grade of [6, 7, 8, 9]) {
    console.log(`\n=== LỚP ${grade} ===`);
    const topics = grades[grade] || {};
    let count = 0;
    for (const [parent, children] of Object.entries(topics)) {
      count++;
      console.log(`${count}. ${parent} (${children.length} dạng bài)`);
      /* Optional: print children 
      for (const child of children) {
        console.log(`   - ${child}`);
      }
      */
    }
  }

  await pool.end();
}

check().catch(console.error);
