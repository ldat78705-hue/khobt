/**
 * BƯỚC 2B: PHÂN TÍCH VÀ SỬA CÂU MCQ BỊ HỎNG OPTIONS
 * 
 * Vấn đề: Nhiều câu MCQ có options = [{key: "correct_answer_content"}, {key: "wrong1"}, ...]
 * tức là đáp án được lưu vào KEY thay vì VALUE.
 * 
 * Script này:
 * 1. Phân tích cấu trúc options thực tế
 * 2. Nếu key chứa nội dung, value trống → hoán đổi key thành A/B/C/D, value = nội dung
 * 3. Xác định correct_answer dựa trên nội dung gốc
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 2B: PHÂN TÍCH & SỬA OPTIONS BỊ HỎNG ===\n');

  // Lấy tất cả câu MCQ có vấn đề
  const mcqs = await sql`
    SELECT id, question_code, content, answer, correct_answer, options, grade, solution
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
    ORDER BY grade, question_code
  `;

  let type1 = 0; // Options key=A/B/C/D, value hợp lệ → OK
  let type2 = 0; // Options key = nội dung, value trống → cần sửa
  let type3 = 0; // Options trống/null hoàn toàn → cần xem xét
  let type4 = 0; // Khác
  let fixedCount = 0;

  for (const q of mcqs) {
    if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
      type3++;
      continue;
    }

    // Kiểm tra cấu trúc option đầu tiên
    const firstOpt = q.options[0];
    
    if (!firstOpt) {
      type3++;
      continue;
    }

    // Type 1: key ngắn (A-H), value có nội dung → OK
    if (firstOpt.key && /^[A-Ha-h]$/.test(firstOpt.key.trim()) && firstOpt.value && firstOpt.value.trim().length > 0) {
      type1++;
      
      // Nhưng vẫn cần kiểm tra correct_answer có phải key hợp lệ không
      if (q.correct_answer && !/^[A-Ha-h]$/.test(q.correct_answer.trim())) {
        // correct_answer là nội dung, cần map sang key
        const caNorm = q.correct_answer.trim().toLowerCase().replace(/\s+/g, ' ');
        let matched = null;
        for (const opt of q.options) {
          if (opt.value && opt.value.trim().toLowerCase().replace(/\s+/g, ' ') === caNorm) {
            matched = opt.key;
            break;
          }
        }
        if (matched) {
          await sql`UPDATE public.questions SET correct_answer = ${matched}, answer = ${matched}, updated_at = NOW() WHERE id = ${q.id}`;
          fixedCount++;
        }
      }
      continue;
    }

    // Type 2: key chứa nội dung dài, value trống/undefined → cần hoán đổi
    if (firstOpt.key && firstOpt.key.trim().length > 2 && (!firstOpt.value || firstOpt.value.trim().length === 0)) {
      type2++;
      
      // Sửa: tạo options mới với key=A/B/C/D, value = nội dung từ key gốc
      const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const newOptions = [];
      let newCorrectAnswer = null;
      const originalCA = (q.correct_answer || '').trim();

      for (let i = 0; i < q.options.length; i++) {
        const opt = q.options[i];
        if (!opt) continue;
        const content = (opt.key || '').trim();
        if (content.length === 0) continue;
        
        const newKey = labels[newOptions.length] || labels[0];
        newOptions.push({ key: newKey, value: content });
        
        // So khớp correct_answer
        if (originalCA && content.toLowerCase().replace(/\s+/g, ' ') === originalCA.toLowerCase().replace(/\s+/g, ' ')) {
          newCorrectAnswer = newKey;
        }
      }

      if (newOptions.length >= 2) {
        // Cập nhật database
        const updateData = {
          options: newOptions,
          correct_answer: newCorrectAnswer || newOptions[0].key,
          answer: newCorrectAnswer || newOptions[0].key,
        };
        
        await sql`UPDATE public.questions SET 
          options = ${JSON.stringify(updateData.options)}::jsonb, 
          correct_answer = ${updateData.correct_answer}, 
          answer = ${updateData.answer},
          updated_at = NOW() 
        WHERE id = ${q.id}`;
        
        fixedCount++;
        if (fixedCount <= 15) {
          console.log(`✅ [${q.question_code}] Lớp ${q.grade}: Sửa ${q.options.length} options → ${newOptions.length} | CA="${newCorrectAnswer || '?'}"`);
        }
      }
      continue;
    }

    type4++;
    if (type4 <= 5) {
      console.log(`❓ [${q.question_code}] Lớp ${q.grade}: Cấu trúc lạ - key="${(firstOpt.key||'').slice(0,30)}" value="${(firstOpt.value||'').slice(0,30)}"`);
    }
  }

  console.log(`\n--- THỐNG KÊ ---`);
  console.log(`✅ Type 1 (OK): ${type1}`);
  console.log(`🔧 Type 2 (key=nội dung, đã sửa): ${type2}`);
  console.log(`⚠️ Type 3 (options trống): ${type3}`);
  console.log(`❓ Type 4 (cấu trúc lạ): ${type4}`);
  console.log(`\n📊 Tổng đã sửa: ${fixedCount} câu`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
