const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  // Đếm solution kết thúc bất thường sau fix
  const r = await sql`
    SELECT question_code, grade, RIGHT(TRIM(solution), 20) as ending
    FROM public.questions
    WHERE question_type = 'tu_luan' AND LENGTH(solution) > 30
      AND RIGHT(TRIM(solution), 1) NOT IN ('.', ')', '}', '!', '"', ':', ';')
      AND TRIM(solution) NOT LIKE '%$'
    ORDER BY grade LIMIT 20
  `;
  console.log('Solution kết thúc bất thường:', r.length);
  for(const q of r) console.log(`  [${q.question_code}] L${q.grade}: ...${q.ending}`);
  
  // Đếm solution có $1 
  const s = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE solution LIKE '%$1%'`;
  console.log('\nSolution chứa $1:', s[0].cnt);
}
m();
