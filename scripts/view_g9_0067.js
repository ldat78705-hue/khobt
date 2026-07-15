const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  const r=await sql`SELECT question_code,content,answer,solution FROM public.questions WHERE question_code='G9-AUTO-0067'`;
  const q=r[0];
  console.log('ĐỀ:',q.content);
  console.log('\nĐÁP ÁN:',q.answer);
  console.log('\nLỜI GIẢI:',q.solution);
}
m();
