const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // Check 32 answer = "$1$" — is "1" the real answer?
  const qs = await sql`
    SELECT question_code, content, answer, solution, grade FROM public.questions
    WHERE answer LIKE '%$1$%' AND LENGTH(TRIM(answer)) < 8
      AND answer NOT LIKE '%$10%' AND answer NOT LIKE '%$100%'
      AND answer NOT LIKE '%$1$ cm%' AND answer NOT LIKE '%$1$ dm%'
      AND answer NOT LIKE '%$1$ m%'
    ORDER BY grade, question_code
  `;
  
  console.log(`Kiểm tra ${qs.length} câu answer ~ "$1$"\n`);
  
  let trueOne = 0, corrupt = 0;
  const fixes = [];
  
  for(const q of qs){
    const sol = q.solution || '';
    const content = q.content || '';
    
    // Try to determine if "1" is the real answer from solution
    // Look for: "= 1", "kết quả là 1", etc
    const solHasOne = /=\s*1[^0-9]/.test(sol) || /kết quả.*\b1\b/.test(sol) || /đáp.*số.*\b1\b/.test(sol);
    
    // Also check: if content has $1$ as a corrupted number placeholder
    const contentCorrupt = /\$\d\$1\$/.test(content); // "$2$1$" = corrupted number
    
    if(solHasOne && !contentCorrupt){
      trueOne++;
      console.log(`✅ [${q.question_code}] L${q.grade}: "$1$" ĐÚNG — sol xác nhận`);
    } else {
      corrupt++;
      // Extract real answer from solution
      const boxed = sol.match(/\\boxed\{([^}]+)\}/);
      const dapso = sol.match(/Đáp số:\s*([^\n]+)/);
      const equals = sol.match(/=\s*(\$[^$]+\$)\s*[.)\n]/);
      
      const extracted = (boxed?.[1] || dapso?.[1] || equals?.[1] || '').trim();
      
      console.log(`❌ [${q.question_code}] L${q.grade}: ans="${q.answer}" | đề="${content.slice(0,50)}" | trích="${extracted.slice(0,30)}"`);
      
      if(extracted.length > 1){
        fixes.push({id: q.id, code: q.question_code, newAns: extracted});
      }
    }
  }
  
  console.log(`\nĐúng "1": ${trueOne} | Corrupt: ${corrupt}`);
  
  // Fix corrupt answers
  let fixed = 0;
  for(const f of fixes){
    let ans = f.newAns;
    if(!ans.endsWith('.')) ans += '.';
    await sql`UPDATE public.questions SET answer = ${ans}, updated_at = NOW() WHERE id = ${f.id}`;
    fixed++;
    console.log(`  → Sửa [${f.code}]: "${ans.slice(0,40)}"`);
  }
  console.log(`\nĐã sửa answer: ${fixed}`);
}
main().catch(console.error);
