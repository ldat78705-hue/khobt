const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function main() {
  // 1. Grades in system
  const grades = await sql`SELECT DISTINCT grade FROM public.categories ORDER BY grade`;
  console.log('=== GRADES IN SYSTEM ===');
  for (const g of grades) console.log('Grade:', g.grade);

  // 2. Questions per grade  
  const qg = await sql`SELECT grade, COUNT(*)::int as cnt FROM public.questions GROUP BY grade ORDER BY grade`;
  console.log('\n=== QUESTIONS PER GRADE ===');
  for (const r of qg) console.log(`G${r.grade}: ${r.cnt} questions`);

  // 3. Empty categories per grade
  const ec = await sql`
    SELECT c.grade, COUNT(*)::int as empty
    FROM public.categories c
    WHERE c.parent_id IS NOT NULL
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0
      AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id = c.id) = 0
    GROUP BY c.grade ORDER BY c.grade`;
  console.log('\n=== EMPTY LEAF CATEGORIES ===');
  for (const r of ec) console.log(`G${r.grade}: ${r.empty} empty`);

  // 4. Question count per difficulty
  const diff = await sql`SELECT difficulty, COUNT(*)::int as cnt FROM public.questions GROUP BY difficulty ORDER BY difficulty`;
  console.log('\n=== BY DIFFICULTY ===');
  for (const r of diff) console.log(`${r.difficulty}: ${r.cnt}`);

  // 5. Spot-check: find questions missing units in geometry (hình học)
  const noUnit = await sql`
    SELECT question_code, LEFT(content, 80) as snippet
    FROM public.questions 
    WHERE topic = 'hinh_hoc' 
      AND content LIKE '%=%' 
      AND content NOT LIKE '%cm%' 
      AND content NOT LIKE '%m %'
      AND content NOT LIKE '%°%'
      AND grade >= 6
    LIMIT 20`;
  console.log('\n=== GEOMETRY WITHOUT UNITS (sample) ===');
  for (const r of noUnit) console.log(`${r.question_code}: ${r.snippet}`);

  // 6. Check questions with potential math errors (answer/solution mismatch patterns)
  const total = await sql`SELECT COUNT(*)::int as cnt FROM public.questions`;
  console.log('\n=== TOTAL QUESTIONS ===', total[0].cnt);
}
main().catch(console.error);
