const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const tsCode = fs.readFileSync('src/lib/demo-data.ts', 'utf8');

// A very hacky way to extract CATEGORIES from tsCode since we just want the array of objects
const categoriesMatch = tsCode.match(/export const CATEGORIES: Category\[\] = (\[[\s\S]*?\]);\n\nexport const SAMPLE_QUESTIONS/);
if (!categoriesMatch) {
  console.log('Could not parse CATEGORIES');
  process.exit(1);
}

let catsStr = categoriesMatch[1];
// We'll replace keys with quotes so JSON.parse can read it, or just eval it
let cats;
try {
  cats = eval(catsStr);
} catch (e) {
  console.log('Error parsing categories:', e);
  process.exit(1);
}

async function run() {
  const sql = neon(process.env.DATABASE_URL);
  const catMapping = {};
  
  const sortedCats = [...cats].sort((a, b) => {
    if (!a.parent_id && b.parent_id) return -1;
    if (a.parent_id && !b.parent_id) return 1;
    return 0;
  });

  let count = 0;
  for (const cat of sortedCats) {
    const parentUuid = cat.parent_id ? catMapping[cat.parent_id] : null;
    try {
      const res = await sql`
        INSERT INTO categories (name, slug, description, grade, parent_id, icon, color, sort_order)
        VALUES (${cat.name}, ${cat.slug}, ${cat.description}, ${cat.grade}, ${parentUuid}, ${cat.icon}, ${cat.color}, ${cat.sort_order})
        ON CONFLICT (slug) DO UPDATE SET 
          name = EXCLUDED.name,
          parent_id = EXCLUDED.parent_id,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `;
      catMapping[cat.id] = res[0].id;
      count++;
    } catch (err) {
      console.log('Failed to insert cat:', cat.slug, err.message);
    }
  }
  console.log('Seeded', count, 'categories');
}

run();
