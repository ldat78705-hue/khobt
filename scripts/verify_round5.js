/**
 * RÀ SOÁT LẦN 5 — VERIFICATION CUỐI CÙNG
 * 
 * 1. Solution bị cắt ngắn sau dọn boilerplate
 * 2. question_code unique
 * 3. MCQ mới chuyển type có options OK
 * 4. Encoding issues
 * 5. Orphaned references
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== RÀ SOÁT LẦN 5 — VERIFICATION CUỐI ===\n');
  console.log('Bắt đầu:', new Date().toISOString());

  // ===== 1. SOLUTION BỊ CẮT =====
  console.log('\n--- 1. SOLUTION BỊ CẮT NGẮN ---\n');
  const shortSol = await sql`
    SELECT question_code, grade, question_type, LENGTH(solution) as len, solution
    FROM public.questions
    WHERE question_type = 'tu_luan' AND (LENGTH(solution) < 15 OR solution IS NULL)
    ORDER BY grade, question_code
  `;
  console.log(`Câu tự luận lời giải < 15c: ${shortSol.length}`);
  for (const q of shortSol.slice(0, 10)) {
    console.log(`  [${q.question_code}] L${q.grade}: ${q.len}c "${(q.solution||'').slice(0,40)}"`);
  }
  
  // Kiểm tra solution kết thúc đột ngột (không có dấu chấm/đóng ngoặc)
  const truncated = await sql`
    SELECT question_code, grade, RIGHT(TRIM(solution), 20) as ending
    FROM public.questions
    WHERE question_type = 'tu_luan' AND LENGTH(solution) > 30
      AND RIGHT(TRIM(solution), 1) NOT IN ('.', ')', '}', '$', '!', '"', '。', '。')
      AND RIGHT(TRIM(solution), 1) != E'\\n'
    ORDER BY grade, question_code
    LIMIT 20
  `;
  console.log(`\nSolution kết thúc bất thường: ${truncated.length}`);
  for (const q of truncated) {
    console.log(`  [${q.question_code}] L${q.grade}: ...${q.ending}`);
  }

  // ===== 2. QUESTION_CODE UNIQUE =====
  console.log('\n--- 2. QUESTION_CODE TRÙNG ---\n');
  const dupCodes = await sql`
    SELECT question_code, COUNT(*)::int as cnt
    FROM public.questions
    WHERE question_code IS NOT NULL
    GROUP BY question_code
    HAVING COUNT(*) > 1
    ORDER BY cnt DESC
  `;
  console.log(`Question codes trùng: ${dupCodes.length}`);
  for (const d of dupCodes.slice(0, 10)) {
    console.log(`  "${d.question_code}" × ${d.cnt}`);
  }

  // ===== 3. MCQ MỚI CHUYỂN =====
  console.log('\n--- 3. MCQ MỚI CHUYỂN TYPE ---\n');
  const newMCQ = await sql`
    SELECT question_code, options, correct_answer, grade
    FROM public.questions
    WHERE question_code IN ('7-12-010','7-16-007','7-17-002','7-17-010','7-22-015','7-4-004','7-7-001','7-8-004','7-9-003')
  `;
  let mcqOK = 0;
  for (const q of newMCQ) {
    if (q.options && Array.isArray(q.options) && q.options.length >= 2 && q.correct_answer) {
      mcqOK++;
    } else if (q.correct_answer === null) {
      // Converted back to tu_luan — OK
      mcqOK++;
    } else {
      console.log(`  ❌ [${q.question_code}] L${q.grade}: options=${JSON.stringify(q.options)?.slice(0,50)}, ca=${q.correct_answer}`);
    }
  }
  console.log(`MCQ mới chuyển: ${mcqOK}/${newMCQ.length} OK`);

  // ===== 4. ENCODING ISSUES =====
  console.log('\n--- 4. ENCODING / KÝ TỰ LẠ ---\n');
  const encoding = await sql`
    SELECT question_code, grade FROM public.questions
    WHERE content LIKE '%â€%' OR content LIKE '%Ã%' OR content LIKE '%Â%'
       OR answer LIKE '%â€%' OR answer LIKE '%Ã%'
  `;
  console.log(`Câu có ký tự encoding lỗi: ${encoding.length}`);
  for (const q of encoding.slice(0, 5)) {
    console.log(`  [${q.question_code}] L${q.grade}`);
  }

  // ===== 5. ORPHANED CATEGORY_ID =====
  console.log('\n--- 5. ORPHANED CATEGORY_ID ---\n');
  const orphaned = await sql`
    SELECT q.question_code, q.category_id, q.grade
    FROM public.questions q
    LEFT JOIN public.categories c ON q.category_id = c.id
    WHERE q.category_id IS NOT NULL AND c.id IS NULL
  `;
  console.log(`Câu có category_id không tồn tại: ${orphaned.length}`);

  // ===== 6. THỐNG KÊ PHÂN BỐ THEO DIFFICULTY =====
  console.log('\n--- 6. PHÂN BỐ THEO ĐỘ KHÓ ---\n');
  const diffDist = await sql`
    SELECT grade, difficulty, COUNT(*)::int as cnt
    FROM public.questions
    GROUP BY grade, difficulty
    ORDER BY grade, difficulty
  `;
  const grid = {};
  for (const d of diffDist) {
    if (!grid[d.grade]) grid[d.grade] = {};
    grid[d.grade][d.difficulty] = d.cnt;
  }
  console.log('         NB    TH    VD    VDC');
  for (const g of [4,5,6,7,8,9]) {
    const r = grid[g] || {};
    console.log(`  L${g}: ${String(r.nhan_biet||0).padStart(5)} ${String(r.thong_hieu||0).padStart(5)} ${String(r.van_dung||0).padStart(5)} ${String(r.van_dung_cao||0).padStart(5)}`);
  }

  // ===== 7. VERIFY TỔNG TOÀN BỘ =====
  console.log('\n--- 7. TỔNG KẾT ---\n');
  const total = await sql`SELECT COUNT(*)::int as cnt FROM public.questions`;
  const approved = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE status='approved'`;
  const withCode = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE question_code IS NOT NULL`;
  const withCat = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE category_id IS NOT NULL`;
  const withAnswer = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE answer IS NOT NULL AND LENGTH(TRIM(answer)) > 0`;
  const withSol = await sql`SELECT COUNT(*)::int as cnt FROM public.questions WHERE solution IS NOT NULL AND LENGTH(TRIM(solution)) > 0`;
  
  console.log(`Tổng:       ${total[0].cnt}`);
  console.log(`Approved:   ${approved[0].cnt}`);
  console.log(`Có code:    ${withCode[0].cnt}`);
  console.log(`Có cat:     ${withCat[0].cnt}`);
  console.log(`Có answer:  ${withAnswer[0].cnt}`);
  console.log(`Có sol:     ${withSol[0].cnt}`);

  console.log('\n\nHoàn thành:', new Date().toISOString());
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
