const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // View full content + solution of 3 remaining corrupt
  for(const code of ['T5-B16-NEW2','T5-B48-009','Q93515']){
    const r=await sql`SELECT content,answer,solution FROM public.questions WHERE question_code=${code}`;
    if(!r.length) continue;
    console.log(`\n=== ${code} ===`);
    console.log('CONTENT:', r[0].content);
    console.log('ANSWER:', r[0].answer);
    console.log('SOLUTION:', r[0].solution);
  }
}
main();
