const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');
async function m(){
  // 7-21-005: XS = 24/30 = 4/5
  await sql`UPDATE public.questions SET answer = ${'$P = \\dfrac{24}{30} = \\dfrac{4}{5}$.'} WHERE question_code = '7-21-005'`;
  console.log('✅ 7-21-005: XS = 4/5');
  
  // G8-C123-5EAF: (x+1)² = x²+2x+1
  await sql`UPDATE public.questions SET answer = ${'$x^2 + 2x + 1$.'} WHERE question_code = 'G8-C123-5EAF'`;
  console.log('✅ G8-C123-5EAF: x²+2x+1');
  
  // G8-C123-7636: (2x³+3x²)÷x² = 2x+3
  await sql`UPDATE public.questions SET answer = ${'$2x + 3$.'} WHERE question_code = 'G8-C123-7636'`;
  console.log('✅ G8-C123-7636: 2x+3');
  
  const r = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE LENGTH(TRIM(answer))<3 AND question_type NOT IN('trac_nghiem','dung_sai')`;
  console.log(`\nCòn: ${r[0].cnt} câu tự luận đáp án ngắn`);
}
m();
