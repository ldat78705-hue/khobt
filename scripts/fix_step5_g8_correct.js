/**
 * BƯỚC 5: SỬA 21 CÂU MCQ LỚP 8 THIẾU CORRECT_ANSWER
 * 
 * Các câu mã L8-mpccc* có options nhưng không có correct_answer
 * → Đọc solution, content để xác định đáp án đúng
 * → Nếu solution chứa "Đáp án: X" hoặc "Chọn X" → dùng X
 * → Nếu không xác định được → đánh dấu cần review
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 5: SỬA CÂU MCQ LỚP 8 THIẾU CORRECT_ANSWER ===\n');

  const broken = await sql`
    SELECT id, question_code, content, answer, correct_answer, options, solution, grade
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (correct_answer IS NULL OR correct_answer = '')
    ORDER BY grade, question_code
  `;

  console.log(`Tổng câu MCQ thiếu correct_answer: ${broken.length}\n`);

  let fixed = 0;
  let needReview = 0;

  for (const q of broken) {
    const sol = (q.solution || '').trim();
    const ans = (q.answer || '').trim();
    
    let detectedKey = null;
    
    // 1. Nếu answer là key A-H → dùng luôn
    if (/^[A-Ha-h]$/.test(ans)) {
      detectedKey = ans.toUpperCase();
    }
    
    // 2. Tìm trong solution: "Đáp án: A", "Chọn A", "→ A"
    if (!detectedKey && sol) {
      const patterns = [
        /[Đđ]áp\s*án[:\s]*([A-Ha-h])/i,
        /[Cc]họn\s*([A-Ha-h])/i,
        /→\s*([A-Ha-h])\b/,
        /[Cc]hính\s*xác[:\s]*([A-Ha-h])/i,
        /\b([A-Ha-h])\s*(?:đúng|là đáp án)/i,
      ];
      for (const p of patterns) {
        const m = sol.match(p);
        if (m) { detectedKey = m[1].toUpperCase(); break; }
      }
    }

    // 3. Nếu solution chứa nội dung đáp án, so khớp với options
    if (!detectedKey && sol && q.options && Array.isArray(q.options)) {
      // Tìm option nào xuất hiện trong solution
      for (const opt of q.options) {
        if (!opt || !opt.value || opt.value.trim().length < 2) continue;
        const optVal = opt.value.trim().toLowerCase();
        if (sol.toLowerCase().includes(optVal) && optVal.length > 3) {
          detectedKey = opt.key;
          break;
        }
      }
    }

    if (detectedKey) {
      await sql`UPDATE public.questions SET 
        correct_answer = ${detectedKey}, 
        answer = ${detectedKey},
        updated_at = NOW()
      WHERE id = ${q.id}`;
      fixed++;
      console.log(`✅ [${q.question_code}] Lớp ${q.grade}: correct_answer = "${detectedKey}"`);
    } else {
      needReview++;
      console.log(`❓ [${q.question_code}] Lớp ${q.grade}: Không xác định được → xem solution: "${sol.slice(0,80)}..."`);
    }
  }

  console.log(`\n--- KẾT QUẢ ---`);
  console.log(`✅ Đã sửa: ${fixed}`);
  console.log(`❓ Cần review thủ công: ${needReview}`);

  // Verify
  const remaining = await sql`
    SELECT COUNT(*)::int as c FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (correct_answer IS NULL OR correct_answer = '')
  `;
  console.log(`📊 Còn MCQ thiếu correct_answer: ${remaining[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
