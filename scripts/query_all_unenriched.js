const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`
    SELECT c.grade, COUNT(c.id) as category_count
    FROM public.categories c
    LEFT JOIN public.questions q ON c.id = q.category_id
    WHERE c.parent_id IS NOT NULL 
    AND NOT EXISTS (
      SELECT 1 FROM public.categories sub WHERE sub.parent_id = c.id
    )
    GROUP BY c.id, c.grade
    HAVING COUNT(q.id) < 10
  `;
  
  // Aggregate by grade
  let summary = {};
  cats.forEach(c => {
    if (!summary[c.grade]) summary[c.grade] = 0;
    summary[c.grade]++;
  });
  console.log('Number of unenriched categories (< 10 questions) by grade:', summary);
}
main();
