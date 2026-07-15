/**
 * RÀ SOÁT SÂU: LỜI GIẢI ↔ ĐÁP ÁN
 * 
 * Kiểm tra các trường hợp mà lời giải kết luận (\\boxed, "Vậy", "Đáp số") 
 * mâu thuẫn với trường answer.
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function extractAllNumbers(text) {
  if (!text) return [];
  const nums = [];
  // Match numbers possibly with LaTeX formatting
  const regex = /(-?\d[\d,.\s\\]*)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const clean = m[1].replace(/\\[,;!]/g, '').replace(/\s/g, '').replace(/,/g, '');
    const n = parseFloat(clean);
    if (!isNaN(n) && n !== 0) nums.push(n);
  }
  return [...new Set(nums)];
}

async function main() {
  console.log('=== RÀ SOÁT SÂU: LỜI GIẢI ↔ ĐÁP ÁN ===\n');
  
  const issues = [];
  
  for (const grade of [4,5,6,7,8,9]) {
    // Lấy tất cả câu có \\boxed trong lời giải
    const questions = await sql`
      SELECT question_code, content, answer, solution, grade
      FROM public.questions 
      WHERE grade = ${grade} AND solution LIKE '%\\boxed%'
      ORDER BY question_code
    `;
    
    let checked = 0;
    for (const q of questions) {
      checked++;
      const sol = q.solution || '';
      const ans = q.answer || '';
      
      // Tìm tất cả \\boxed{...} trong lời giải
      const boxedAll = [];
      const regex = /\\boxed\{([^}]+)\}/g;
      let m;
      while ((m = regex.exec(sol)) !== null) {
        boxedAll.push(m[1].trim());
      }
      
      if (boxedAll.length === 0) continue;
      
      // Lấy boxed cuối cùng (thường là kết luận)
      const lastBoxed = boxedAll[boxedAll.length - 1];
      
      // So sánh số trong boxed với số trong answer
      const boxNums = extractAllNumbers(lastBoxed);
      const ansNums = extractAllNumbers(ans);
      
      if (boxNums.length > 0 && ansNums.length > 0) {
        // Kiểm tra xem có ít nhất 1 số trong boxed khớp answer
        const hasMatch = boxNums.some(bn => ansNums.some(an => Math.abs(bn - an) < 0.01));
        if (!hasMatch && boxNums.length === 1 && ansNums.length === 1) {
          // Chỉ báo lỗi khi cả 2 đều có đúng 1 số và khác nhau
          issues.push({
            code: q.question_code,
            grade: q.grade,
            boxed: lastBoxed,
            boxNum: boxNums[0],
            ansNum: ansNums[0],
            answer: ans.slice(0, 60),
          });
        }
      }
    }
    console.log(`Lớp ${grade}: ${checked} câu có \\boxed → ${issues.filter(i=>i.grade===grade).length} bất nhất quán`);
  }
  
  console.log(`\nTỔNG: ${issues.length} bất nhất quán boxed ↔ answer\n`);
  
  if (issues.length > 0) {
    console.log('CHI TIẾT:');
    for (const i of issues) {
      console.log(`  [${i.code}] L${i.grade}: \\boxed{${i.boxed}} (=${i.boxNum}) vs answer="${i.answer}" (=${i.ansNum})`);
    }
  }
}

main().catch(console.error);
