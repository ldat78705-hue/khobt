const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // Fix all $ lẻ in solution by adding closing $
  const all = await sql`SELECT id, question_code, solution FROM public.questions WHERE solution IS NOT NULL`;
  let fixed = 0;
  
  for(const q of all){
    let sol = q.solution || '';
    const count = (sol.match(/(?<!\\)\$/g)||[]).length;
    if(count % 2 !== 0){
      sol += '$';
      await sql`UPDATE public.questions SET solution=${sol} WHERE id=${q.id}`;
      fixed++;
    }
  }
  
  // Fix all $ lẻ in content  
  const allC = await sql`SELECT id, content FROM public.questions WHERE content IS NOT NULL`;
  let fixedC = 0;
  for(const q of allC){
    let c = q.content || '';
    const count = (c.match(/(?<!\\)\$/g)||[]).length;
    if(count % 2 !== 0){
      c += '$';
      await sql`UPDATE public.questions SET content=${c} WHERE id=${q.id}`;
      fixedC++;
    }
  }
  
  // Fix all $ lẻ in answer
  const allA = await sql`SELECT id, answer FROM public.questions WHERE answer IS NOT NULL`;
  let fixedA = 0;
  for(const q of allA){
    let a = q.answer || '';
    const count = (a.match(/(?<!\\)\$/g)||[]).length;
    if(count % 2 !== 0){
      a += '$';
      await sql`UPDATE public.questions SET answer=${a} WHERE id=${q.id}`;
      fixedA++;
    }
  }
  
  console.log(`Sửa $ lẻ: solution=${fixed}, content=${fixedC}, answer=${fixedA}`);
}
main().catch(console.error);
