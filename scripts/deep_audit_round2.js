/**
 * RÀ SOÁT SÂU LẦN 2 — CHẤT LƯỢNG NỘI DUNG
 *
 * 1. LaTeX hỏng trong solution ($ lẻ, \\begin không \\end)
 * 2. Đáp án/lời giải boilerplate (filler text vô nghĩa)
 * 3. Near-duplicates (nội dung gần giống >80%)
 * 4. KaTeX render lỗi tiềm ẩn
 * 5. Category distribution
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// ======= HELPERS =======

function checkLatexIssues(text) {
  if (!text) return [];
  const issues = [];
  
  // $ balance
  const dollars = (text.match(/(?<!\\)\$/g) || []).length;
  if (dollars % 2 !== 0) issues.push(`$ lẻ (${dollars})`);
  
  // \\begin without \\end
  const begins = text.match(/\\begin\{(\w+)\}/g) || [];
  const ends = text.match(/\\end\{(\w+)\}/g) || [];
  if (begins.length !== ends.length) issues.push(`\\begin(${begins.length}) ≠ \\end(${ends.length})`);
  
  // \\frac{} with empty
  if (text.includes('\\frac{}')) issues.push('\\frac{} trống');
  
  // Unclosed { }
  let depth = 0;
  for (const ch of text) {
    if (ch === '{') depth++;
    if (ch === '}') depth--;
    if (depth < 0) { issues.push('{} không cân'); break; }
  }
  if (depth > 0) issues.push(`{} không đóng (thừa ${depth})`);
  
  return issues;
}

function isBoilerplate(text) {
  if (!text) return false;
  const t = text.trim();
  const patterns = [
    /^Thực hiện phép tính theo yêu cầu bài toán/,
    /^Như vậy, kết quả chính xác của phép tính là đáp án đã cho/,
    /Bước giải toán trên được thực hiện chi tiết từng bước/,
    /kết hợp cùng các công thức cơ bản giúp học sinh/,
    /giúp học sinh dễ dàng theo dõi và nắm bắt phương pháp/,
  ];
  return patterns.some(p => p.test(t));
}

function normalize(text) {
  return (text || '').replace(/\s+/g, ' ').replace(/\$[^$]*\$/g, 'MATH').toLowerCase().trim();
}

async function main() {
  console.log('=== RÀ SOÁT SÂU LẦN 2 ===\n');
  console.log('Bắt đầu:', new Date().toISOString());
  
  // ===== 1. LaTeX hỏng trong solution =====
  console.log('\n--- 1. LATEX HỎNG TRONG LỜI GIẢI ---\n');
  let latexIssueCount = 0;
  const latexIssueList = [];
  
  for (const grade of [4,5,6,7,8,9]) {
    const qs = await sql`
      SELECT question_code, solution, grade FROM public.questions 
      WHERE grade = ${grade} AND solution IS NOT NULL AND LENGTH(solution) > 0
      ORDER BY question_code
    `;
    for (const q of qs) {
      const issues = checkLatexIssues(q.solution);
      if (issues.length > 0) {
        latexIssueCount++;
        latexIssueList.push({ code: q.question_code, grade: q.grade, issues });
        if (latexIssueCount <= 30) {
          console.log(`  ❌ [${q.question_code}] L${q.grade}: ${issues.join(' | ')}`);
        }
      }
    }
  }
  console.log(`\n  Tổng: ${latexIssueCount} câu có LaTeX hỏng trong lời giải`);

  // ===== 2. Đáp án boilerplate =====
  console.log('\n--- 2. ĐÁP ÁN BOILERPLATE ---\n');
  const boilerplate = await sql`
    SELECT question_code, answer, grade FROM public.questions 
    WHERE answer LIKE '%Thực hiện phép tính theo yêu cầu%'
    OR answer LIKE '%kết quả chính xác của phép tính%'
    OR solution LIKE '%Bước giải toán trên được thực hiện chi tiết từng bước%'
    ORDER BY grade, question_code
  `;
  console.log(`  Câu có đáp án/lời giải boilerplate: ${boilerplate.length}`);
  
  // Check if boilerplate answers still have actual answer
  let boilerplateOnlyCount = 0;
  for (const q of boilerplate) {
    const ans = q.answer || '';
    // Remove boilerplate text and check if real answer remains
    const cleaned = ans
      .replace(/Thực hiện phép tính theo yêu cầu bài toán:\s*/g, '')
      .replace(/Như vậy, kết quả chính xác của phép tính là đáp án đã cho\.\s*/g, '')
      .trim();
    if (cleaned.length < 3 || cleaned === '.') {
      boilerplateOnlyCount++;
      console.log(`  ⚠️ [${q.question_code}] L${q.grade}: Chỉ có boilerplate, không có đáp án thực`);
    }
  }
  console.log(`  Chỉ boilerplate (thiếu đáp án thực): ${boilerplateOnlyCount}`);

  // ===== 3. Category distribution =====
  console.log('\n--- 3. PHÂN BỐ BÀI THEO CATEGORY ---\n');
  const catDist = await sql`
    SELECT c.name, c.grade, COUNT(q.id)::int as cnt
    FROM public.categories c
    LEFT JOIN public.questions q ON q.category_id = c.id
    WHERE c.is_active = true
    GROUP BY c.id, c.name, c.grade
    HAVING COUNT(q.id) < 3
    ORDER BY c.grade, COUNT(q.id)
  `;
  console.log(`  Categories có < 3 bài: ${catDist.length}`);
  for (const c of catDist) {
    console.log(`    L${c.grade}: "${c.name}" → ${c.cnt} bài`);
  }

  // ===== 4. Kiểm tra content quá ngắn =====
  console.log('\n--- 4. NỘI DUNG QUÁ NGẮN ---\n');
  const shortContent = await sql`
    SELECT question_code, content, grade, answer FROM public.questions 
    WHERE LENGTH(TRIM(content)) < 15
    ORDER BY LENGTH(content), grade
  `;
  console.log(`  Câu nội dung < 15 ký tự: ${shortContent.length}`);
  for (const q of shortContent) {
    console.log(`    [${q.question_code}] L${q.grade}: "${q.content}" → đáp án: "${(q.answer||'').slice(0,30)}"`);
  }

  // ===== 5. Kiểm tra content quá dài (>3000 ký tự) - có thể lỗi copy =====
  console.log('\n--- 5. NỘI DUNG QUÁ DÀI ---\n');
  const longContent = await sql`
    SELECT question_code, LENGTH(content) as len, grade FROM public.questions 
    WHERE LENGTH(content) > 3000
    ORDER BY LENGTH(content) DESC
    LIMIT 10
  `;
  console.log(`  Câu nội dung > 3000 ký tự: ${longContent.length}`);
  for (const q of longContent) {
    console.log(`    [${q.question_code}] L${q.grade}: ${q.len} ký tự`);
  }

  console.log('\n\nHoàn thành:', new Date().toISOString());
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
