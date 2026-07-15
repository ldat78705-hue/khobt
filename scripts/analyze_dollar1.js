/**
 * PHÂN TÍCH $1 TRONG SOLUTION ĐỂ XÁC ĐỊNH LỖI HAY HỢP LỆ
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  const qs = await sql`
    SELECT question_code, solution, answer, grade FROM public.questions
    WHERE solution LIKE '%$1%'
    ORDER BY grade, question_code
  `;
  
  // Pattern analysis
  let realError = 0, ambiguous = 0, likelyOK = 0;
  
  for (const q of qs) {
    const sol = q.solution || '';
    
    // Check patterns of $1 usage
    // Likely error: "= $1" or "$1$" where $1 is a corrupted number
    const pattern1 = /=\s*\$1([^0-9]|$)/g; // "= $1" not followed by digit
    const pattern2 = /\$1\$/g; // "$1$" as standalone value
    const pattern3 = /\$1\b/g; // "$1" at word boundary
    
    // Check if $1 appears as "$1 cm" or "$1 dm" etc - might be valid
    const validPattern = /\$1\s*(?:cm|dm|m|kg|lít|giờ|phút|ngày)/gi;
    const validCount = (sol.match(validPattern) || []).length;
    
    // Count total $1 occurrences
    const total1 = (sol.match(/\$1(?!\d)/g) || []).length;
    
    if (validCount > 0 && validCount === total1) {
      likelyOK++;
    } else if (total1 > validCount) {
      // Has non-valid $1
      const isError = /=\s*\$1[^0-9]/.test(sol) || sol.endsWith('$1') || sol.endsWith('$1$');
      if (isError) realError++;
      else ambiguous++;
    }
  }
  
  console.log(`Tổng câu có $1: ${qs.length}`);
  console.log(`  Lỗi rõ ràng (= $1): ${realError}`);
  console.log(`  Mơ hồ: ${ambiguous}`);
  console.log(`  Hợp lệ ($1 cm, $1 m): ${likelyOK}`);
  
  // Xử lý: với lỗi rõ ràng, nối thêm "Đáp số: answer"
  // Với mơ hồ - để nguyên (không gây hại render)
  console.log('\nMẫu ambiguous:');
  let shown = 0;
  for (const q of qs) {
    const sol = q.solution || '';
    const total1 = (sol.match(/\$1(?!\d)/g) || []).length;
    const validPattern = /\$1\s*(?:cm|dm|m|kg|lít|giờ|phút|ngày)/gi;
    const validCount = (sol.match(validPattern) || []).length;
    
    if (total1 > validCount && !/=\s*\$1[^0-9]/.test(sol) && !sol.endsWith('$1')) {
      if (shown < 5) {
        // Find context of $1
        const idx = sol.indexOf('$1');
        const ctx = sol.substring(Math.max(0, idx-20), Math.min(sol.length, idx+20));
        console.log(`  [${q.question_code}] L${q.grade}: ...${ctx}...`);
        shown++;
      }
    }
  }
}
main().catch(console.error);
