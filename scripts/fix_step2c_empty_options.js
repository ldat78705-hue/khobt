/**
 * BƯỚC 2C: XEM CHI TIẾT VÀ SỬA CÂU MCQ CÓ OPTIONS TRỐNG
 * 
 * 463 câu có options = [{key:"", value:""}, ...] - tất cả đều trống
 * => Câu này thực chất là câu tự luận được đánh nhãn MCQ nhầm,
 *    hoặc dữ liệu bị hỏng hoàn toàn.
 * 
 * Giải pháp:
 * - Nếu có answer text dài → chuyển thành tự luận (tu_luan)
 * - Nếu correct_answer chứa nội dung → dùng nó làm answer cho tự luận
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 2C: XỬ LÝ CÂU MCQ CÓ OPTIONS HOÀN TOÀN TRỐNG ===\n');

  const broken = await sql`
    SELECT id, question_code, content, answer, correct_answer, options, grade, solution, question_type
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
    ORDER BY grade, question_code
  `;

  let emptyOptionsCount = 0;
  let convertedToTuLuan = 0;
  let fixedWithCA = 0;

  for (const q of broken) {
    if (!q.options || !Array.isArray(q.options)) continue;
    
    // Kiểm tra xem tất cả options có trống không
    const allEmpty = q.options.every(o => {
      if (!o) return true;
      const k = (o.key || '').trim();
      const v = (o.value || '').trim();
      return k.length === 0 && v.length === 0;
    });

    if (!allEmpty) continue;
    emptyOptionsCount++;

    // Câu này có correct_answer chứa nội dung → chuyển thành tự luận
    const ca = (q.correct_answer || '').trim();
    const ans = (q.answer || '').trim();
    
    if (ca.length > 0 || ans.length > 0) {
      const newAnswer = ca.length > 0 ? ca : ans;
      await sql`UPDATE public.questions SET 
        question_type = 'tu_luan',
        answer = ${newAnswer},
        options = NULL,
        correct_answer = NULL,
        updated_at = NOW()
      WHERE id = ${q.id}`;
      convertedToTuLuan++;
      if (convertedToTuLuan <= 10) {
        console.log(`🔄 [${q.question_code}] Lớp ${q.grade}: MCQ → Tự luận | Đáp án: "${newAnswer.slice(0,50)}"`);
      }
    } else {
      // Không có đáp án nào cả → vẫn chuyển tự luận nhưng đánh dấu
      await sql`UPDATE public.questions SET 
        question_type = 'tu_luan',
        options = NULL,
        correct_answer = NULL,
        updated_at = NOW()
      WHERE id = ${q.id}`;
      convertedToTuLuan++;
    }
  }

  // Xử lý câu MCQ có options = null hoặc mảng rỗng
  const noOptions = await sql`
    SELECT id, question_code, grade, answer, correct_answer, solution
    FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (options IS NULL OR options::text = '[]' OR options::text = 'null')
  `;

  console.log(`\nCâu MCQ không có options: ${noOptions.length}`);
  for (const q of noOptions) {
    const ca = (q.correct_answer || '').trim();
    const ans = (q.answer || '').trim();
    const newAnswer = ca.length > 0 ? ca : (ans.length > 0 ? ans : '');
    
    await sql`UPDATE public.questions SET 
      question_type = 'tu_luan',
      answer = ${newAnswer || null},
      options = NULL,
      correct_answer = NULL,
      updated_at = NOW()
    WHERE id = ${q.id}`;
    convertedToTuLuan++;
  }

  console.log(`\n--- KẾT QUẢ ---`);
  console.log(`📊 Câu MCQ options toàn trống: ${emptyOptionsCount}`);
  console.log(`🔄 Đã chuyển thành tự luận: ${convertedToTuLuan}`);

  // Verify
  const remaining = await sql`
    SELECT question_type, COUNT(*)::int as c 
    FROM public.questions 
    GROUP BY question_type 
    ORDER BY question_type
  `;
  console.log(`\n📊 Phân bố loại câu hỏi sau sửa:`);
  for (const r of remaining) {
    console.log(`   ${r.question_type}: ${r.c}`);
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
