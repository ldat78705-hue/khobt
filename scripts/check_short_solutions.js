const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== CÂU TỰ LUẬN CÓ LỜI GIẢI NGẮN ===\n');
  
  // Tìm tất cả tự luận có solution ngắn < 5 ký tự
  const short = await sql`
    SELECT question_code, content, answer, solution, grade
    FROM public.questions 
    WHERE question_type = 'tu_luan' AND (solution IS NULL OR LENGTH(TRIM(solution)) < 5)
    ORDER BY grade, question_code
  `;
  
  console.log(`Tổng: ${short.length} câu tự luận lời giải ngắn\n`);
  
  // Phân loại
  const byGrade = {};
  for (const q of short) {
    byGrade[q.grade] = (byGrade[q.grade] || 0) + 1;
  }
  for (const [g, c] of Object.entries(byGrade).sort()) {
    console.log(`  Lớp ${g}: ${c} câu`);
  }
  
  // In mẫu 5 câu xem có vấn đề gì không
  console.log('\nMẪU 5 CÂU:');
  for (const q of short.slice(0, 5)) {
    console.log(`\n[${q.question_code}] L${q.grade}:`);
    console.log(`  Đề: ${(q.content||'').slice(0, 80)}`);
    console.log(`  ĐA: ${(q.answer||'').slice(0, 80)}`);
    console.log(`  Giải: "${q.solution || ''}"`);
  }
}

main().catch(console.error);
