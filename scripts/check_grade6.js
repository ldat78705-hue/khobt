const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`
    SELECT c.id, c.name, c.grade, c.sort_order, c.parent_id,
      (SELECT COUNT(*)::int FROM public.questions q WHERE q.category_id = c.id) as qcount
    FROM public.categories c
    WHERE c.grade = 6
    ORDER BY c.sort_order, c.name
  `;
  
  cats.forEach(c => {
    const indent = c.parent_id ? '  ' : '';
    console.log(`${indent}[${c.sort_order}] ${c.name} | id=${c.id} | parent=${c.parent_id || 'ROOT'} | q=${c.qcount}`);
  });
}
main();
