const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // Tìm tất cả solution có "Đáp số:" mà kết thúc bất thường ($1, $2, v.v.)
  const qs = await sql`
    SELECT id, question_code, solution, answer, grade FROM public.questions
    WHERE solution LIKE '%Đáp số:%'
      AND RIGHT(TRIM(solution), 2) ~ '\\$[0-9]'
  `;
  
  console.log(`Câu có Đáp số kết thúc bất thường: ${qs.length}`);
  
  let fixed = 0;
  for (const q of qs) {
    let sol = q.solution || '';
    const ans = q.answer || '';
    
    if (ans.length < 2) continue;
    
    // Replace the corrupted "Đáp số: ..." with "Đáp số: {answer}"
    sol = sol.replace(/Đáp số:[^\n]*$/s, `Đáp số: ${ans}`);
    
    await sql`UPDATE public.questions SET solution = ${sol}, updated_at = NOW() WHERE id = ${q.id}`;
    fixed++;
  }
  
  console.log(`Đã sửa: ${fixed}`);
  
  // Also fix solutions ending with "= $1" (not in Đáp số line)
  const qs2 = await sql`
    SELECT id, question_code, solution, answer FROM public.questions
    WHERE TRIM(solution) LIKE '%$1' AND TRIM(solution) NOT LIKE '%Đáp số%'
      AND TRIM(solution) NOT LIKE '%$10%' AND TRIM(solution) NOT LIKE '%$1$%'
      AND TRIM(solution) NOT LIKE '%$1 %'
  `;
  
  console.log(`\nCâu kết thúc $1 (không có Đáp số): ${qs2.length}`);
  
  let fixed2 = 0;
  for (const q of qs2) {
    let sol = q.solution || '';
    const ans = q.answer || '';
    if (ans.length < 2) continue;
    
    sol = sol.trim() + `\n\nĐáp số: ${ans}`;
    await sql`UPDATE public.questions SET solution = ${sol}, updated_at = NOW() WHERE id = ${q.id}`;
    fixed2++;
  }
  console.log(`Đã sửa: ${fixed2}`);
}
main().catch(console.error);
