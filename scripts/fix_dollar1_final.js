const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  const qs = await sql`
    SELECT id, question_code, solution, answer, grade FROM public.questions
    WHERE solution LIKE '%$1%'
  `;
  
  let fixed = 0;
  for (const q of qs) {
    let sol = q.solution || '';
    const ans = q.answer || '';
    
    // Only fix clear "= $1" patterns (where $1 is NOT followed by digit/text/unit)
    // Pattern: something = $1 (not $10, $100, $1\text, $1$km, $1/2)
    if (/=\s*\$1([^0-9\\\/,.]|$)/.test(sol) && ans.length > 2) {
      // Remove the corrupted "= $1..." ending and add proper answer
      // Find last complete sentence before the $1 error
      const errorIdx = sol.search(/=\s*\$1([^0-9\\\/,.]|$)/);
      if (errorIdx > 10) {
        // Keep everything before the error pattern, add answer
        const beforeError = sol.substring(0, errorIdx).trim();
        const newSol = beforeError + `\n\nĐáp số: ${ans}`;
        
        // Verify it's actually shorter (we're removing corrupted data)
        if (newSol.length < sol.length + 30) {
          await sql`UPDATE public.questions SET solution = ${newSol}, updated_at = NOW() WHERE id = ${q.id}`;
          fixed++;
        }
      }
    }
  }
  
  console.log(`Đã sửa: ${fixed} lỗi "= $1" rõ ràng`);
  
  // Verify remaining
  const remaining = await sql`
    SELECT COUNT(*)::int as cnt FROM public.questions
    WHERE solution LIKE '%=$1%' OR solution LIKE '%$1$' OR (solution LIKE '%$1' AND solution NOT LIKE '%$1$%' AND solution NOT LIKE '%$10%')
  `;
  console.log(`Còn suspicious: ${remaining[0].cnt}`);
}
main().catch(console.error);
