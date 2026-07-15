const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  // Show suspicious endings
  const r = await sql`
    SELECT question_code, RIGHT(TRIM(solution), 40) as ending, grade FROM public.questions
    WHERE (TRIM(solution) LIKE '%$1' AND TRIM(solution) NOT LIKE '%$10%' AND TRIM(solution) NOT LIKE '%$1$%')
    ORDER BY grade LIMIT 15
  `;
  console.log('Còn kết thúc $1:',r.length);
  for(const q of r) console.log(`  [${q.question_code}] L${q.grade}: ...${q.ending}`);
}
m();
