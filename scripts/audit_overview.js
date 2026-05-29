const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Get full overview by grade, chapter, lesson
  const overview = await sql`
    SELECT 
      q.grade,
      c.name as category,
      c.id as category_id,
      c.parent_id,
      q.difficulty,
      COUNT(*) as count
    FROM public.questions q
    JOIN public.categories c ON q.category_id = c.id
    WHERE q.grade = 9
    GROUP BY q.grade, c.name, c.id, c.parent_id, q.difficulty
    ORDER BY c.name, q.difficulty
  `;
  
  console.log(`=== LỚP 9: TỔNG QUAN ===`);
  console.log(`Tổng danh mục có câu hỏi: ${new Set(overview.map(r => r.category_id)).size}`);
  console.log(`Tổng câu hỏi: ${overview.reduce((s, r) => s + parseInt(r.count), 0)}\n`);
  
  overview.forEach(r => {
    console.log(`  ${r.category} | ${r.difficulty} | ${r.count} câu`);
  });

  // Total by grade
  const byGrade = await sql`
    SELECT grade, COUNT(*) as count 
    FROM public.questions 
    GROUP BY grade 
    ORDER BY grade DESC
  `;
  console.log('\n=== TỔNG THEO LỚP ===');
  byGrade.forEach(r => console.log(`  Lớp ${r.grade}: ${r.count} câu`));
  
  // Total questions
  const total = await sql`SELECT COUNT(*) as c FROM public.questions`;
  console.log(`\nTỔNG TOÀN BỘ: ${total[0].c} câu`);
})();
