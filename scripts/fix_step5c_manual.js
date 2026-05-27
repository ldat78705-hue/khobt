/**
 * BƯỚC 5C: GIẢI VÀ CẬP NHẬT 18 CÂU MCQ LỚP 8
 * 
 * Đã đọc kỹ từng câu, giải toán, xác định đáp án đúng:
 * 
 * L8-mpccc5v7-64: (x²-4x+4)/(x²-4) = (x-2)²/((x-2)(x+2)) = (x-2)/(x+2) → B
 * L8-mpccc5wi-65: (x+1)/(2x)=1 → x=1 → C
 * L8-mpccc8y9-140: (2x-1)² câu 1 = 4x²-4x+1 → A; câu 2 rút gọn = -2y³ → C (bài 2 options) → C
 * L8-mpccc9p9-159: x²-4x+4 tại x=-1 = (-1-2)² = 9 → D
 * L8-mpccc9xt-165: (x+1/3)(x-2)=0 → x=-1/3 hoặc x=2 → D
 * L8-mpccca0n-167: Phân giác AM, cần hình → không xác định chắc chắn → bỏ qua (chuyển tự luận)
 * L8-mpccca22-168: OM/4 = 12/8 → OM = 6 → A
 * L8-mpcccamh-182: PT bậc nhất 1 ẩn: 5-(2/3)x=0 → B
 * L8-mpcccanw-183: ĐKXĐ: x≠0 VÀ x≠1/2 → C
 * L8-mpcccapa-184: 2x²-2x=0 → x=0 hoặc x=1 → S={0;1} → B
 * L8-mpcccaqk-185: 2(3)+m=3-1 → 6+m=2 → m=-4 → C
 * L8-mpcccarz-186: DB/DC=AB/AC → DB/2=5/10=1/2 → DB=1 → A
 * L8-mpcccate-187: S = ab/2 → C
 * L8-mpcccbag-199: PT bậc nhất: (3/2)x+1=0 → D
 * L8-mpcccbbv-200: ĐKXĐ: x≠3/2 VÀ x≠5/3 → D
 * L8-mpcccbeo-202: (x+5)²=25 → x=0 hoặc x=-10 → S={0;-10} → A
 * L8-mpccccp7-235: ĐKXĐ: x≠3 và x≠-2 → C
 * L8-mpccccqr-236: 7x+1=2x → 5x=-1 → A
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

const ANSWERS = {
  'L8-mpccc5v7-64': 'B',   // (x-2)/(x+2)
  'L8-mpccc5wi-65': 'C',   // x = 1
  'L8-mpccc8y9-140': 'C',  // -2y³ (câu 2 trong bài tổng hợp)
  'L8-mpccc9p9-159': 'D',  // 9
  'L8-mpccc9xt-165': 'D',  // {-1/3; 2}
  'L8-mpccca0n-167': null,  // Thiếu hình → chuyển tự luận
  'L8-mpccca22-168': 'A',  // OM = 6cm
  'L8-mpcccamh-182': 'B',  // 5-(2/3)x=0
  'L8-mpcccanw-183': 'C',  // x≠0 và x≠1/2
  'L8-mpcccapa-184': 'B',  // S={0;1}
  'L8-mpcccaqk-185': 'C',  // m=-4
  'L8-mpcccarz-186': 'A',  // DB=1cm
  'L8-mpcccate-187': 'C',  // ab/2
  'L8-mpcccbag-199': 'D',  // (3/2)x+1=0
  'L8-mpcccbbv-200': 'D',  // x≠3/2 và x≠5/3
  'L8-mpcccbeo-202': 'A',  // S={0;-10}
  'L8-mpccccp7-235': 'C',  // x≠3 và x≠-2
  'L8-mpccccqr-236': 'A',  // 5x=-1
};

async function main() {
  console.log('=== BƯỚC 5C: CẬP NHẬT ĐÁP ÁN 18 CÂU LỚP 8 ===\n');

  let updated = 0;
  let converted = 0;

  for (const [code, answer] of Object.entries(ANSWERS)) {
    const rows = await sql`SELECT id FROM public.questions WHERE question_code = ${code} LIMIT 1`;
    if (rows.length === 0) {
      console.log(`⚠️ [${code}] Không tìm thấy trong DB`);
      continue;
    }

    const id = rows[0].id;

    if (answer === null) {
      // Chuyển sang tự luận vì thiếu dữ kiện (hình)
      await sql`UPDATE public.questions SET 
        question_type = 'tu_luan',
        options = NULL,
        correct_answer = NULL,
        updated_at = NOW()
      WHERE id = ${id}`;
      converted++;
      console.log(`🔄 [${code}] → Chuyển tự luận (thiếu hình)`);
    } else {
      await sql`UPDATE public.questions SET 
        correct_answer = ${answer},
        answer = ${answer},
        updated_at = NOW()
      WHERE id = ${id}`;
      updated++;
      console.log(`✅ [${code}] → correct_answer = "${answer}"`);
    }
  }

  console.log(`\n--- KẾT QUẢ ---`);
  console.log(`✅ Đã cập nhật đáp án: ${updated}`);
  console.log(`🔄 Chuyển tự luận: ${converted}`);

  // Verify
  const remaining = await sql`
    SELECT COUNT(*)::int as c FROM public.questions
    WHERE question_type = 'trac_nghiem'
      AND (correct_answer IS NULL OR correct_answer = '')
  `;
  console.log(`📊 Còn MCQ thiếu correct_answer: ${remaining[0].c}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
