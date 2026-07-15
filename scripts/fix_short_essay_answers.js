/**
 * SỬA 45 CÂU TỰ LUẬN ĐÁP ÁN NGẮN (< 3 KÝ TỰ)
 * Trích đáp án từ solution hoặc tính toán
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== SỬA CÂU TỰ LUẬN ĐÁP ÁN NGẮN ===\n');
  
  const shortAns = await sql`
    SELECT id, question_code, content, answer, solution, grade, question_type
    FROM public.questions
    WHERE LENGTH(TRIM(answer)) < 3 AND question_type NOT IN ('trac_nghiem', 'dung_sai')
    ORDER BY grade, question_code
  `;
  
  console.log(`Tổng: ${shortAns.length} câu\n`);
  
  let fixed = 0;
  let needManual = 0;
  
  for (const q of shortAns) {
    const content = q.content || '';
    const sol = q.solution || '';
    const oldAns = q.answer || '';
    let newAns = null;
    
    // Try to extract answer from solution
    // Look for: Đáp số:, Kết quả:, Vậy, = 
    const patterns = [
      /Đáp\s*(?:số|án)[:\s]*([^\n.]+)/i,
      /Vậy[:\s,]*([^\n.]+)/i,
      /\\boxed\{([^}]+)\}/,
      /kết\s*quả[:\s]*([^\n.]+)/i,
    ];
    
    for (const p of patterns) {
      const m = sol.match(p);
      if (m && m[1] && m[1].trim().length > 2) {
        newAns = m[1].trim();
        break;
      }
    }
    
    // Special cases
    if (!newAns) {
      // DT HCN = dài × rộng 
      const hcnM = content.match(/chiều dài\s*\$\s*([\d,]+)\s*(?:\\text\{[^}]*\})?\$.*chiều rộng\s*\$\s*([\d,]+)/i);
      if (hcnM) {
        const a = parseFloat(hcnM[1].replace(',', '.'));
        const b = parseFloat(hcnM[2].replace(',', '.'));
        newAns = `$${(a * b).toString().replace('.', ',')}$ ($\\text{đơn vị}^2$).`;
      }
      
      // 1 dm² = ? cm²
      if (content.includes('dm}^2') && content.includes('cm}^2')) {
        newAns = '$100 \\text{ cm}^2$.';
      }
      if (content.includes('1 ha') || content.includes('ha $=')) {
        newAns = '$10\\,000 \\text{ m}^2$.';
      }
    }
    
    if (newAns && newAns.length > 2) {
      // Clean up
      newAns = newAns.replace(/^\s*[:=]\s*/, '').trim();
      if (!newAns.endsWith('.')) newAns += '.';
      
      await sql`UPDATE public.questions SET answer = ${newAns}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed++;
      console.log(`✅ [${q.question_code}] L${q.grade}: "${oldAns}" → "${newAns.slice(0,50)}"`);
    } else {
      needManual++;
      console.log(`⚠️ [${q.question_code}] L${q.grade}: "${oldAns}" — cần xem thủ công`);
      console.log(`   Đề: "${content.slice(0, 80)}"`);
      console.log(`   Sol: "${sol.slice(0, 80)}"`);
    }
  }
  
  console.log(`\n📊 Đã sửa: ${fixed} | Cần xem thêm: ${needManual}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
