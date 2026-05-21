const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Get categories with 0 questions for grades 6-9
  const cats = await sql`
    SELECT c.id, c.name, c.grade, c.sort_order,
      (SELECT COUNT(*)::int FROM public.questions q WHERE q.category_id = c.id) as qcount
    FROM public.categories c
    WHERE c.grade IN (6,7,8,9)
    ORDER BY c.grade, c.sort_order
  `;
  
  // Summary per grade
  for (const grade of [6, 7, 8, 9]) {
    const gradeCats = cats.filter(c => c.grade === grade);
    const empty = gradeCats.filter(c => c.qcount === 0);
    const withQ = gradeCats.filter(c => c.qcount > 0);
    console.log(`\n=== LỚP ${grade} ===`);
    console.log(`Tổng categories: ${gradeCats.length}`);
    console.log(`Có bài tập: ${withQ.length}`);
    console.log(`Chưa có bài tập: ${empty.length}`);
    
    // List categories that are "Bài" level (not chapter headers) with 0 questions
    const emptyBai = empty.filter(c => c.name.startsWith('Bài ') || c.name.startsWith('Luyện tập') || c.name.startsWith('Bài tập cuối'));
    console.log(`\nCác bài chưa có đề (${emptyBai.length}):`);
    emptyBai.forEach(c => {
      console.log(`  [${c.id}] ${c.name}`);
    });
    
    console.log(`\nCác bài ĐÃ có đề:`);
    withQ.forEach(c => {
      console.log(`  [${c.id}] ${c.name} (${c.qcount} câu)`);
    });
  }
}
main();
