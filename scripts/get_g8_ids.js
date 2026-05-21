const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
const U = '8316c34e-765d-4b8c-9364-b683a17e33f8', G = 8;
// Get all empty category IDs for grade 8
async function main() {
  const cats = await sql`
    SELECT c.id, c.name, c.sort_order FROM public.categories c
    WHERE c.grade = 8 AND c.name LIKE 'Bài %'
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0
    ORDER BY c.sort_order
  `;
  cats.forEach(c => console.log(`${c.sort_order}|${c.name}|${c.id}`));
}
main();
