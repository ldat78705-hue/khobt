const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  // Kiểm tra cấu trúc category: parent_id
  const cats = await sql`
    SELECT c.id, c.name, c.grade, c.parent_id, c.is_active,
           COUNT(q.id)::int as cnt,
           (SELECT COUNT(*)::int FROM public.categories c2 WHERE c2.parent_id = c.id) as child_count
    FROM public.categories c
    LEFT JOIN public.questions q ON q.category_id = c.id
    WHERE c.is_active = true
    GROUP BY c.id
    HAVING COUNT(q.id) = 0
    ORDER BY c.grade, c.name
  `;
  
  console.log(`Categories rỗng (0 bài): ${cats.length}\n`);
  
  let parentEmpty = 0, leafEmpty = 0;
  for(const c of cats){
    if(c.child_count > 0){
      parentEmpty++;
      // This is a parent category (chapter) - OK to be empty
    } else {
      leafEmpty++;
      console.log(`  ⚠️ L${c.grade}: "${c.name}" (leaf, 0 bài, 0 con)`);
    }
  }
  
  console.log(`\nParent (chương, có con): ${parentEmpty} — OK`);
  console.log(`Leaf (không con, không bài): ${leafEmpty} — cần xem`);
  
  // Kiểm tra tổng bài theo parent
  const parentWithKids = await sql`
    SELECT c.name, c.grade, 
           (SELECT SUM(cnt)::int FROM (
             SELECT COUNT(q.id) as cnt FROM public.categories c2 
             LEFT JOIN public.questions q ON q.category_id = c2.id
             WHERE c2.parent_id = c.id
             GROUP BY c2.id
           ) sub) as total_kid_questions
    FROM public.categories c
    WHERE c.parent_id IS NULL AND c.is_active = true
    ORDER BY c.grade, c.name
  `;
  
  console.log('\nBài theo chương (parent):');
  for(const c of parentWithKids){
    if(c.total_kid_questions !== null){
      console.log(`  L${c.grade}: "${c.name.slice(0,40)}" → ${c.total_kid_questions||0} bài`);
    }
  }
}
m().catch(console.error);
