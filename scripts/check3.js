const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  const r=await sql`SELECT question_code,answer,content,grade,solution FROM public.questions WHERE LENGTH(TRIM(answer))<3 AND question_type NOT IN('trac_nghiem','dung_sai') ORDER BY grade`;
  for(const q of r) console.log(`[${q.question_code}] L${q.grade}: ans="${q.answer}" | ${q.content.slice(0,60)} | sol="${(q.solution||'').slice(0,60)}"`);
}
m();
