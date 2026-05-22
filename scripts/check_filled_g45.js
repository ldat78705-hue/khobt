const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  // Categories that already have questions
  const filled = await sql`
    SELECT c.id, c.name, c.grade, p.name as parent_name, 
           (SELECT COUNT(*)::int FROM public.questions q WHERE q.category_id = c.id) as qcount
    FROM public.categories c 
    LEFT JOIN public.categories p ON c.parent_id = p.id 
    WHERE c.grade IN (4, 5) 
      AND c.parent_id IS NOT NULL 
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) > 0 
    ORDER BY c.grade, p.name, c.name
  `;
  
  console.log('=== FILLED CATEGORIES G4 & G5 ===');
  for (const c of filled) {
    console.log(`G${c.grade} [${c.id}] ${c.parent_name} > ${c.name} (${c.qcount} qs)`);
  }
  
  // All parent categories (chapters) for G5
  console.log('\n=== ALL PARENT CATEGORIES (CHAPTERS) G5 ===');
  const g5parents = await sql`
    SELECT id, name, grade FROM public.categories 
    WHERE grade = 5 AND parent_id IS NULL 
    ORDER BY name
  `;
  for (const p of g5parents) {
    console.log(`[${p.id}] ${p.name}`);
  }

  // First 5 empty G5 cats with IDs for insertion
  console.log('\n=== FIRST 10 EMPTY G5 CATS ===');
  const first10 = await sql`
    SELECT c.id, c.name, c.grade, p.name as parent_name, p.id as parent_id
    FROM public.categories c 
    LEFT JOIN public.categories p ON c.parent_id = p.id 
    WHERE c.grade = 5 
      AND c.parent_id IS NOT NULL 
      AND (SELECT COUNT(*) FROM public.questions q WHERE q.category_id = c.id) = 0 
      AND (SELECT COUNT(*) FROM public.categories sub WHERE sub.parent_id = c.id) = 0 
    ORDER BY p.name, c.name
    LIMIT 10
  `;
  for (const c of first10) {
    console.log(`[${c.id}] parent=[${c.parent_id}] ${c.parent_name} > ${c.name}`);
  }
}

main().catch(console.error);
