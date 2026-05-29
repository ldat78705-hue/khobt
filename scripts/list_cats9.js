const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const cats = await sql`SELECT id, name, parent_id, grade, sort_order FROM public.categories WHERE grade = 9 AND is_active = true ORDER BY sort_order`;
  
  // Build tree
  const map = {};
  cats.forEach(c => { map[c.id] = { ...c, children: [] }; });
  
  const roots = [];
  cats.forEach(c => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children.push(map[c.id]);
    } else if (!c.parent_id) {
      roots.push(map[c.id]);
    }
  });
  
  roots.forEach(ch => {
    console.log(`\n[${ch.id}] ${ch.name}`);
    ch.children.sort((a, b) => a.sort_order - b.sort_order).forEach(lesson => {
      console.log(`  [${lesson.id}] ${lesson.name}`);
      lesson.children.sort((a, b) => a.sort_order - b.sort_order).forEach(sub => {
        console.log(`    [${sub.id}] ${sub.name}`);
      });
    });
  });
})();
