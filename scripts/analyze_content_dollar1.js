const{neon}=require('@neondatabase/serverless');
const sql=neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main(){
  // Get all content with $1 that are likely corrupted
  const qs = await sql`
    SELECT question_code, content, answer, solution, grade FROM public.questions
    WHERE content LIKE '%$1$%' AND grade = 5
    ORDER BY question_code
  `;
  
  console.log(`Lớp 5 content chứa $1$: ${qs.length}\n`);
  
  let fixable = 0, unfixable = 0;
  
  for(const q of qs){
    const c = q.content || '';
    const sol = q.solution || '';
    const ans = q.answer || '';
    
    // Check if $1$ is a valid value (= number 1)
    // Valid: "$1$ cm", "$1$ dm", context = "bằng $1$"
    // Invalid: "diện tích $2$1$" (should be $20\,000$)
    
    const corrupt = /\$\d\$1\$/.test(c) || // "$2$1$" pattern
                    /\$\d+\$1\$/.test(c) ||
                    /\$\d+,\$1/.test(c) ||  // "$4,$1$" pattern
                    /\$\d+\\,\$1/.test(c);  // "$4\,$1$" pattern
    
    if(corrupt){
      // Try to fix from solution/answer context
      // These are mostly area/volume units that got corrupted during import
      fixable++;
      if(fixable <= 10){
        console.log(`❌ [${q.question_code}]: "${c.slice(0,80)}"`);
        console.log(`   Sol: "${sol.slice(0,60)}"`);
        console.log(`   Ans: "${ans.slice(0,40)}"`);
        console.log('');
      }
    }
  }
  
  console.log(`Corrupt: ${fixable} | Total L5 $1$: ${qs.length}`);
  console.log('\nNOTE: Các câu này bị mất dữ liệu từ import gốc.');
  console.log('Không thể khôi phục chính xác giá trị đã mất.');
  console.log('Đề xuất: Giữ nguyên (có answer + solution đúng), hoặc xóa câu nếu unreadable.');
}
main().catch(console.error);
