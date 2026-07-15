/**
 * RÀ SOÁT CÂU ĐÚNG/SAI
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== RÀ SOÁT CÂU ĐÚNG/SAI ===\n');
  
  const allTF = await sql`
    SELECT question_code, content, answer, correct_answer, options, grade, solution
    FROM public.questions 
    WHERE question_type = 'dung_sai'
    ORDER BY grade, question_code
  `;
  
  console.log(`Tổng câu đúng/sai: ${allTF.length}\n`);
  
  let issues = 0;
  
  for (const q of allTF) {
    const problems = [];
    
    // 1. Phải có correct_answer
    if (!q.correct_answer || q.correct_answer.trim().length === 0) {
      problems.push('Thiếu correct_answer');
    }
    
    // 2. Nội dung đủ
    if (!q.content || q.content.trim().length < 15) {
      problems.push(`Nội dung ngắn (${(q.content||'').length}c)`);
    }
    
    // 3. Đáp án phải có
    if (!q.answer || q.answer.trim().length === 0) {
      problems.push('Thiếu đáp án');
    }
    
    // 4. Correct_answer phải chứa pattern hợp lệ (a, b, c, d hoặc Đ/S)
    if (q.correct_answer) {
      const ca = q.correct_answer.trim().toUpperCase();
      // Có thể là dạng "a) Đ  b) S  c) Đ  d) S" hoặc "ĐSĐS" v.v.
      const hasValidPattern = /[ĐSĐÚNGAI0-9ABCD]/i.test(ca);
      if (!hasValidPattern) {
        problems.push(`correct_answer format lạ: "${q.correct_answer.slice(0,30)}"`);
      }
    }
    
    // 5. LaTeX $ balance
    const fullText = (q.content || '') + ' ' + (q.answer || '') + ' ' + (q.solution || '');
    const dollars = (fullText.match(/(?<!\\)\$/g) || []).length;
    if (dollars % 2 !== 0) {
      problems.push(`LaTeX $ lẻ (${dollars})`);
    }
    
    if (problems.length > 0) {
      issues++;
      console.log(`  ❌ [${q.question_code}] L${q.grade}: ${problems.join(' | ')}`);
    }
  }
  
  console.log(`\n📊 Kết quả: ${allTF.length} câu đúng/sai | ${issues} có vấn đề`);
  
  // Phân bố theo lớp
  const byGrade = {};
  for (const q of allTF) {
    byGrade[q.grade] = (byGrade[q.grade] || 0) + 1;
  }
  console.log('\nPhân bố:');
  for (const [g, c] of Object.entries(byGrade).sort()) {
    console.log(`  Lớp ${g}: ${c} câu`);
  }
}

main().catch(console.error);
