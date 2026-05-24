const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== GRADE 5 CHAPTERS ===');
  const chapters = await sql`SELECT id, name FROM public.categories WHERE grade = 5 AND parent_id IS NULL ORDER BY sort_order`;
  for (const ch of chapters) {
    console.log(`[${ch.id}] ${ch.name}`);
  }

  if (chapters.length > 0) {
    const firstChId = chapters[0].id;
    console.log(`\n=== QUESTIONS IN ${chapters[0].name} (LIMIT 3) ===`);
    const qs = await sql`
      SELECT q.id, q.question_code, q.content, q.answer, q.solution 
      FROM public.questions q
      JOIN public.categories c ON q.category_id = c.id
      WHERE c.parent_id = ${firstChId}
      ORDER BY q.id
      LIMIT 3
    `;
    for (const q of qs) {
      console.log(`\n--- ${q.question_code} (ID: ${q.id}) ---`);
      console.log('CONTENT:', q.content);
      console.log('ANSWER:', q.answer);
      console.log('SOLUTION:', q.solution.substring(0, 200) + (q.solution.length > 200 ? '...' : ''));
    }
  }
}

main().catch(console.error);
