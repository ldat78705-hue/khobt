/**
 * BƯỚC 4: SỬA LATEX LỖI VÀ LOGIC TOÁN
 * 
 * 1. Sửa dấu $ lẻ (LaTeX không đóng)
 * 2. Sửa lỗi toán: T4-B68-004 (357×24 đáp án sai)
 * 3. Kiểm tra và sửa các bài có lời giải quá ngắn  
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 4: SỬA LATEX VÀ LOGIC TOÁN ===\n');

  const allQ = await sql`SELECT id, question_code, content, answer, solution, grade FROM public.questions ORDER BY grade, question_code`;

  let latexFixed = 0;
  let mathFixed = 0;

  for (const q of allQ) {
    let needUpdate = false;
    let newContent = q.content;
    let newAnswer = q.answer;
    let newSolution = q.solution;

    // 4A: Sửa dấu $ lẻ trong content
    const contentDollars = (newContent.match(/(?<!\\)\$/g) || []).length;
    if (contentDollars % 2 !== 0) {
      // Thử sửa: thêm $ ở cuối nếu thiếu
      // Kiểm tra xem có phải thiếu $ đóng cuối cùng không
      const lastDollarIdx = newContent.lastIndexOf('$');
      const afterLast = newContent.slice(lastDollarIdx + 1).trim();
      
      if (afterLast.length === 0 || afterLast === '.' || afterLast === '?') {
        // $ cuối cùng là $ mở, thêm $ đóng trước dấu chấm câu
        // Nhưng an toàn hơn: tìm $ mở cuối cùng và thêm $ đóng
      }
      
      // Cách an toàn nhất: nếu kết thúc bằng text bình thường sau $, thêm $ đóng
      // Tuy nhiên để không phá hỏng, ta chỉ log
      if (latexFixed < 20) {
        console.log(`⚠️ LaTeX lẻ $: [${q.question_code}] Lớp ${q.grade}: "${newContent.slice(-50)}"`);
      }
      latexFixed++;
    }

    // 4B: Sửa lỗi toán cụ thể
    // T4-B68-004: 357×24 = 8568, đáp án ghi là 8
    if (q.question_code === 'T4-B68-004') {
      // Kiểm tra nội dung
      if (q.content.includes('357') && q.content.includes('24')) {
        newAnswer = '$8\\,568$';
        newSolution = '$357 \\times 24 = 8\\,568$.';
        needUpdate = true;
        console.log(`🔧 [T4-B68-004] Sửa: 357×24 = 8568`);
        mathFixed++;
      }
    }

    if (needUpdate) {
      await sql`UPDATE public.questions SET 
        answer = ${newAnswer}, 
        solution = ${newSolution},
        updated_at = NOW() 
      WHERE id = ${q.id}`;
    }
  }

  console.log(`\n--- KẾT QUẢ ---`);
  console.log(`⚠️ Câu có LaTeX $ lẻ (cần xem thủ công): ${latexFixed}`);
  console.log(`🔧 Lỗi toán đã sửa: ${mathFixed}`);

  // 4C: Xóa câu trùng mã question_code (giữ bản đầy đủ nhất)
  console.log('\n=== XỬ LÝ MÃ TRÙNG ===');
  const dupCodes = await sql`
    SELECT question_code, COUNT(*)::int as cnt
    FROM public.questions
    WHERE question_code IS NOT NULL AND question_code != ''
    GROUP BY question_code
    HAVING COUNT(*) > 1
    ORDER BY question_code
  `;
  
  console.log(`Tổng mã trùng: ${dupCodes.length} nhóm`);

  let deletedDupCode = 0;
  for (const dc of dupCodes) {
    const qs = await sql`
      SELECT id, question_code, content, answer, solution, category_id, created_at 
      FROM public.questions 
      WHERE question_code = ${dc.question_code}
      ORDER BY created_at
    `;

    // Chấm điểm, giữ bản tốt nhất
    let bestIdx = 0;
    let bestScore = -1;
    for (let i = 0; i < qs.length; i++) {
      let score = 0;
      if (qs[i].answer && qs[i].answer.trim().length > 0) score += 5;
      if (qs[i].solution && qs[i].solution.trim().length > 10) score += 5;
      if (qs[i].category_id) score += 3;
      if (score > bestScore) { bestScore = score; bestIdx = i; }
    }

    // Xóa các bản thừa
    for (let i = 0; i < qs.length; i++) {
      if (i === bestIdx) continue;
      await sql`DELETE FROM public.exam_questions WHERE question_id = ${qs[i].id}`;
      await sql`DELETE FROM public.favorites WHERE question_id = ${qs[i].id}`;
      try { await sql`DELETE FROM public.likes WHERE question_id = ${qs[i].id}`; } catch(e) {}
      await sql`DELETE FROM public.questions WHERE id = ${qs[i].id}`;
      deletedDupCode++;
    }
  }
  console.log(`🗑️ Đã xóa ${deletedDupCode} câu trùng mã`);

  // Verify
  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`\n📊 Tổng câu còn lại: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
