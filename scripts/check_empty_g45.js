const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const cats = await sql`
    SELECT c.id, c.name, c.grade, p.name as parent_name 
    FROM public.categories c 
    LEFT JOIN public.categories p ON c.parent_id = p.id 
    WHERE c.grade IN (4, 5) 
      AND c.parent_id IS NOT NULL 
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0 
      AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id = c.id) = 0 
    ORDER BY c.grade, p.name, c.name
  `;
  
  console.log('=== EMPTY LEAF CATEGORIES G4 & G5 ===');
  console.log('Total:', cats.length);
  
  let currentGrade = 0;
  for (const c of cats) {
    if (c.grade !== currentGrade) {
      currentGrade = c.grade;
      console.log('\n--- GRADE', c.grade, '---');
    }
    console.log(`  [${c.id}] ${c.parent_name} > ${c.name}`);
  }
}

main().catch(console.error);
