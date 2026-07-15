/**
 * KIỂM TRA THỦ CÔNG 30 BÀI TOÁN KHÓ NHẤT (Lớp 8-9)
 * In nội dung + đáp án + lời giải để verify logic
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== KIỂM TRA THỦ CÔNG 30 BÀI KHÓ ===\n');
  
  // Lấy 15 bài vận dụng cao lớp 8 + 15 bài lớp 9
  for (const grade of [8, 9]) {
    const qs = await sql`
      SELECT question_code, content, answer, solution, difficulty
      FROM public.questions 
      WHERE grade = ${grade} AND difficulty = 'van_dung_cao' AND question_type = 'tu_luan'
      ORDER BY RANDOM() LIMIT 15
    `;
    
    console.log(`\n========== LỚP ${grade} — VẬN DỤNG CAO ==========\n`);
    
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      console.log(`--- [${q.question_code}] (#${i+1}) ---`);
      console.log(`ĐỀ: ${(q.content || '').slice(0, 200)}`);
      console.log(`ĐA: ${(q.answer || '').slice(0, 100)}`);
      
      // Kiểm tra logic cơ bản
      const issues = [];
      const content = q.content || '';
      const answer = q.answer || '';
      const sol = q.solution || '';
      
      // Có đủ dữ kiện (>30 ký tự)
      if (content.length < 30) issues.push('Đề ngắn');
      // Có đáp án
      if (answer.trim().length < 2) issues.push('Đáp án quá ngắn');
      // Có lời giải
      if (sol.trim().length < 20) issues.push('Lời giải ngắn');
      // LaTeX balance
      const fullText = content + answer + sol;
      const dollars = (fullText.match(/(?<!\\)\$/g) || []).length;
      if (dollars % 2 !== 0) issues.push('$ lẻ');
      
      if (issues.length > 0) {
        console.log(`⚠️ ${issues.join(', ')}`);
      } else {
        console.log('✅ OK');
      }
      console.log('');
    }
  }
}

main().catch(console.error);
