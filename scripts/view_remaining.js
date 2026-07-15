const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  const qs = await sql`
    SELECT question_code, content, answer, solution, grade FROM public.questions
    WHERE content ~ '\\$[0-9]+\\$1\\$'
    ORDER BY grade, question_code
  `;
  
  for(const q of qs){
    console.log(`\n[${q.question_code}] L${q.grade}:`);
    console.log(`  Đề: ${q.content.slice(0,100)}`);
    console.log(`  Ans: ${(q.answer||'').slice(0,50)}`);
    console.log(`  Sol: ${(q.solution||'').slice(0,80)}`);
  }
}
main();
