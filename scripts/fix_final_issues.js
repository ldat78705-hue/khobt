const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // 1. Fix 7-22-015: chuyển lại tu_luan vì parse options sai
  await sql`UPDATE public.questions SET question_type='tu_luan', options=NULL, correct_answer=NULL, answer=${'C. Ánh sáng.'} WHERE question_code='7-22-015'`;
  console.log('✅ 7-22-015: Chuyển lại tu_luan, đáp án "C. Ánh sáng"');
  
  // 2. Fix 52 $ lẻ trong lớp 4-5
  const broken = await sql`
    SELECT id, question_code, content, answer, solution FROM public.questions
    WHERE question_code IN (
      'T4-B17-003','T4-B17-008',
      'T5-B26-004','T5-B26-007','T5-B33-002','T5-B33-005','T5-B33-007','T5-B33-008',
      'T5-B18-006','T5-B18-007','T5-B18-008','T5-B54-005','T5-B54-009',
      'T5-B21-007','T5-B47-004'
    )
  `;
  
  let fixed = 0;
  for(const q of broken){
    for(const field of ['content','answer','solution']){
      let text = q[field]||'';
      const count = (text.match(/(?<!\\)\$/g)||[]).length;
      if(count%2!==0){
        text+='$';
        if(field==='content') await sql`UPDATE public.questions SET content=${text} WHERE id=${q.id}`;
        if(field==='answer') await sql`UPDATE public.questions SET answer=${text} WHERE id=${q.id}`;
        if(field==='solution') await sql`UPDATE public.questions SET solution=${text} WHERE id=${q.id}`;
        fixed++;
        console.log(`✅ ${q.question_code}: Sửa $ trong ${field}`);
      }
    }
  }
  
  // Fix ALL remaining $ lẻ in grade 5
  const allBroken = await sql`
    SELECT id, question_code, content, answer, solution FROM public.questions
    WHERE grade = 5
  `;
  for(const q of allBroken){
    const full = (q.content||'')+(q.answer||'')+(q.solution||'');
    const count = (full.match(/(?<!\\)\$/g)||[]).length;
    if(count%2!==0){
      // Check each field
      for(const field of ['solution','answer','content']){
        let text = q[field]||'';
        const fc = (text.match(/(?<!\\)\$/g)||[]).length;
        if(fc%2!==0){
          text+='$';
          if(field==='content') await sql`UPDATE public.questions SET content=${text} WHERE id=${q.id}`;
          if(field==='answer') await sql`UPDATE public.questions SET answer=${text} WHERE id=${q.id}`;
          if(field==='solution') await sql`UPDATE public.questions SET solution=${text} WHERE id=${q.id}`;
          fixed++;
          break; // Fix one field should be enough
        }
      }
    }
  }
  
  console.log(`\nTổng sửa $: ${fixed}`);
}
main().catch(console.error);
