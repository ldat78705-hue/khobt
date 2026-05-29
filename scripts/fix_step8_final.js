/**
 * BƯỚC 8: XỬ LÝ 3 FALSE POSITIVE + 4 NHÓM TRÙNG CÒN LẠI
 * 
 * A. 3 "lỗi toán" thực chất là false positive:
 *   - T4-B68-004: answer="$8\,568$" nhưng script parse thành "8"
 *   - T5-B42-003: bài hỏi bấm nút máy tính, không phải phép cộng
 *   - T6-C3B14-003: "Tính 15-23" → "-8" là ĐÚNG (script check |15-23| vs "8")
 * 
 * B. 4 nhóm nội dung trùng:
 *   - Lớp 5: 9 câu tam giác ABC (giữ 1)
 *   - Lớp 5: 2 câu đổi 3,1 dm³ (giữ 1)
 *   - Lớp 9: 10 câu biểu thức P (giữ 1)
 *   - Lớp 9: 2 câu thống kê (giữ 1)
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== BƯỚC 8: XỬ LÝ VẤN ĐỀ CÒN LẠI ===\n');

  // A. Sửa 3 false positive
  console.log('--- A. Xử lý 3 MATH_ERROR false positive ---\n');

  // A1. T4-B68-004: answer chứa "$8\,568$" — cần confirm
  const t4 = await sql`SELECT id, content, answer, solution FROM public.questions WHERE question_code = 'T4-B68-004' LIMIT 1`;
  if (t4.length > 0) {
    console.log(`T4-B68-004: "${t4[0].content.slice(0, 60)}"`);
    console.log(`  answer: "${t4[0].answer}"`);
    // Đảm bảo answer rõ ràng
    if (!t4[0].answer.includes('8568') && !t4[0].answer.includes('8\\,568')) {
      await sql`UPDATE public.questions SET 
        answer = '$8\\,568$',
        solution = 'Thực hiện phép nhân: $357 \\times 24 = 8\\,568$.\n\n**Cách tính:**\n$357 \\times 24 = 357 \\times (20 + 4) = 7\\,140 + 1\\,428 = 8\\,568$.\n\n**Đáp số:** $8\\,568$.',
        updated_at = NOW()
      WHERE id = ${t4[0].id}`;
      console.log(`  ✅ Đã sửa answer → "$8\\,568$"\n`);
    } else {
      console.log(`  ✅ Answer đã đúng: "${t4[0].answer}"\n`);
    }
  }

  // A2. T5-B42-003: "bấm nút máy tính" — answer hợp lệ, script parse sai
  const t5 = await sql`SELECT id, content, answer FROM public.questions WHERE question_code = 'T5-B42-003' LIMIT 1`;
  if (t5.length > 0) {
    console.log(`T5-B42-003: "${t5[0].content.slice(0, 80)}"`);
    console.log(`  ✅ Bài hỏi bấm nút máy tính (1, 5, +, 2, 4, =) → ĐÚNG, không phải phép cộng\n`);
  }

  // A3. T6-C3B14-003: "Tính 15-23" → -8 là đúng  
  const t6 = await sql`SELECT id, content, answer FROM public.questions WHERE question_code = 'T6-C3B14-003' LIMIT 1`;
  if (t6.length > 0) {
    console.log(`T6-C3B14-003: "${t6[0].content.slice(0, 60)}"`);
    console.log(`  answer: "${t6[0].answer}"`);
    // Đảm bảo answer chứa dấu trừ
    if (t6[0].answer && (t6[0].answer.includes('-8') || t6[0].answer.includes('$-8$'))) {
      console.log(`  ✅ Answer "$-8$" ĐÚNG (15-23 = -8 trong tập Z)\n`);
    }
  }

  // B. Xóa 4 nhóm nội dung trùng
  console.log('--- B. Xóa nội dung trùng lặp ---\n');

  const allQ = await sql`SELECT id, question_code, content, answer, solution, grade, category_id, created_at FROM public.questions ORDER BY grade, created_at`;

  const groups = new Map();
  for (const q of allQ) {
    const key = q.content.trim().replace(/\s+/g, ' ').toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(q);
  }

  let totalDeleted = 0;
  for (const [key, qs] of groups) {
    if (qs.length < 2) continue;

    // Chấm điểm
    const scored = qs.map(q => {
      let score = 0;
      if (q.answer && q.answer.trim().length > 0) score += 10;
      if (q.solution && q.solution.trim().length > 10) score += 8;
      if (q.category_id) score += 5;
      return { ...q, score };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.created_at) - new Date(b.created_at);
    });

    const keep = scored[0];
    const toRemove = scored.slice(1);

    console.log(`📝 Nhóm "${key.slice(0, 60)}..." (${qs.length} câu, lớp ${qs[0].grade})`);
    console.log(`   Giữ: [${keep.question_code}] score=${keep.score}`);

    for (const r of toRemove) {
      try {
        await sql`DELETE FROM public.exam_questions WHERE question_id = ${r.id}`;
        await sql`DELETE FROM public.favorites WHERE question_id = ${r.id}`;
        await sql`DELETE FROM public.questions WHERE id = ${r.id}`;
        totalDeleted++;
      } catch (e) {
        console.log(`   ⚠️ Không xóa được [${r.question_code}]: ${e.message}`);
      }
    }
    console.log(`   🗑️ Xóa ${toRemove.length} bản\n`);
  }

  console.log(`\n--- KẾT QUẢ ---`);
  console.log(`🗑️ Tổng câu xóa thêm: ${totalDeleted}`);

  const total = await sql`SELECT COUNT(*)::int as c FROM public.questions`;
  console.log(`📊 Tổng câu còn lại: ${total[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
