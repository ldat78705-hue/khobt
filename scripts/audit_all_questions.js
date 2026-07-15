/**
 * AUDIT TOÀN BỘ KHO ĐỀ TOÁN
 * Script rà soát tự động tất cả câu hỏi trong database
 * Kiểm tra: logic toán, LaTeX, đáp án, lời giải, văn phong
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('========================================');
  console.log('  RÀ SOÁT TOÀN BỘ KHO ĐỀ TOÁN');
  console.log('========================================\n');

  // 1. Thống kê tổng quan
  const allQuestions = await sql`SELECT * FROM public.questions ORDER BY grade, category_id, question_code`;
  const categories = await sql`SELECT * FROM public.categories ORDER BY grade, sort_order`;

  console.log(`📊 THỐNG KÊ TỔNG QUAN:`);
  console.log(`   Tổng số câu hỏi: ${allQuestions.length}`);
  console.log(`   Tổng số danh mục: ${categories.length}`);

  // Thống kê theo lớp
  const gradeStats = {};
  for (const q of allQuestions) {
    gradeStats[q.grade] = (gradeStats[q.grade] || 0) + 1;
  }
  console.log(`\n📈 PHÂN BỐ THEO LỚP:`);
  for (const [grade, count] of Object.entries(gradeStats).sort((a, b) => a[0] - b[0])) {
    console.log(`   Lớp ${grade}: ${count} câu`);
  }

  // Thống kê theo loại
  const typeStats = {};
  for (const q of allQuestions) {
    typeStats[q.question_type] = (typeStats[q.question_type] || 0) + 1;
  }
  console.log(`\n📋 PHÂN BỐ THEO LOẠI:`);
  for (const [type, count] of Object.entries(typeStats)) {
    console.log(`   ${type}: ${count} câu`);
  }

  // Thống kê theo status
  const statusStats = {};
  for (const q of allQuestions) {
    statusStats[q.status] = (statusStats[q.status] || 0) + 1;
  }
  console.log(`\n🏷️ PHÂN BỐ THEO TRẠNG THÁI:`);
  for (const [status, count] of Object.entries(statusStats)) {
    console.log(`   ${status}: ${count} câu`);
  }

  // 2. Rà soát lỗi
  const errors = [];
  const warnings = [];
  let checked = 0;

  for (const q of allQuestions) {
    checked++;
    const prefix = `[${q.question_code || q.id.slice(0,8)}] Lớp ${q.grade}`;

    // === CHECK 1: Content trống hoặc quá ngắn ===
    if (!q.content || q.content.trim().length < 5) {
      errors.push({ ...q, issue: 'CONTENT_EMPTY', detail: `${prefix}: Nội dung câu hỏi trống hoặc quá ngắn (${q.content?.length || 0} ký tự)` });
    }

    // === CHECK 2: Đáp án trống ===
    if (!q.answer || q.answer.trim().length === 0) {
      errors.push({ ...q, issue: 'ANSWER_EMPTY', detail: `${prefix}: Thiếu đáp án` });
    }

    // === CHECK 3: Lời giải trống hoặc quá ngắn ===
    if (!q.solution || q.solution.trim().length < 5) {
      warnings.push({ ...q, issue: 'SOLUTION_SHORT', detail: `${prefix}: Lời giải trống hoặc quá ngắn (${q.solution?.length || 0} ký tự)` });
    }

    // === CHECK 4: Trắc nghiệm thiếu options ===
    if (q.question_type === 'trac_nghiem') {
      if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
        errors.push({ ...q, issue: 'MISSING_OPTIONS', detail: `${prefix}: Câu trắc nghiệm thiếu phương án (${q.options?.length || 0} options)` });
      } else {
        // Check correct_answer exists in options
        if (!q.correct_answer) {
          errors.push({ ...q, issue: 'NO_CORRECT_ANSWER', detail: `${prefix}: Câu trắc nghiệm thiếu correct_answer` });
        } else {
          const hasCorrect = q.options.some(o => o.key === q.correct_answer);
          if (!hasCorrect) {
            errors.push({ ...q, issue: 'WRONG_CORRECT_KEY', detail: `${prefix}: correct_answer="${q.correct_answer}" không khớp với options [${q.options.map(o => o.key).join(',')}]` });
          }
        }

        // Check for duplicate option values
        const optValues = q.options.map(o => o.value?.trim().toLowerCase());
        const uniqueValues = new Set(optValues);
        if (uniqueValues.size < optValues.length) {
          warnings.push({ ...q, issue: 'DUPLICATE_OPTIONS', detail: `${prefix}: Có đáp án trùng lặp trong phương án` });
        }

        // Check empty option values
        for (const opt of q.options) {
          if (!opt.value || opt.value.trim().length === 0) {
            errors.push({ ...q, issue: 'EMPTY_OPTION', detail: `${prefix}: Phương án ${opt.key} trống` });
          }
        }
      }
    }

    // === CHECK 5: Đúng/sai thiếu correct_answer ===
    if (q.question_type === 'dung_sai') {
      if (!q.correct_answer) {
        errors.push({ ...q, issue: 'DUNG_SAI_NO_ANSWER', detail: `${prefix}: Câu đúng/sai thiếu correct_answer` });
      }
    }

    // === CHECK 6: LaTeX không hợp lệ ===
    const latexIssues = checkLatex(q.content + ' ' + (q.answer || '') + ' ' + (q.solution || ''));
    if (latexIssues.length > 0) {
      for (const issue of latexIssues) {
        warnings.push({ ...q, issue: 'LATEX_WARNING', detail: `${prefix}: ${issue}` });
      }
    }

    // === CHECK 7: Kiểm tra logic toán cơ bản ===
    const mathErrors = checkMathLogic(q);
    for (const err of mathErrors) {
      errors.push({ ...q, issue: 'MATH_ERROR', detail: `${prefix}: ${err}` });
    }

    // === CHECK 8: Category_id null ===
    if (!q.category_id) {
      warnings.push({ ...q, issue: 'NO_CATEGORY', detail: `${prefix}: Chưa phân loại danh mục` });
    }

    // === CHECK 9: Grade bất thường ===
    if (q.grade < 1 || q.grade > 12) {
      errors.push({ ...q, issue: 'INVALID_GRADE', detail: `${prefix}: Lớp không hợp lệ (${q.grade})` });
    }

    // === CHECK 10: Question code trùng ===
    // (sẽ check ở phần sau)
  }

  // Check question_code trùng
  const codeMap = {};
  for (const q of allQuestions) {
    if (q.question_code) {
      if (!codeMap[q.question_code]) codeMap[q.question_code] = [];
      codeMap[q.question_code].push(q);
    }
  }
  for (const [code, qs] of Object.entries(codeMap)) {
    if (qs.length > 1) {
      errors.push({ issue: 'DUPLICATE_CODE', detail: `Mã câu hỏi "${code}" bị trùng (${qs.length} câu)`, ids: qs.map(q => q.id) });
    }
  }

  // Check content trùng
  const contentMap = {};
  for (const q of allQuestions) {
    const normalized = q.content.trim().replace(/\s+/g, ' ').toLowerCase().slice(0, 200);
    if (!contentMap[normalized]) contentMap[normalized] = [];
    contentMap[normalized].push(q);
  }
  let dupContentCount = 0;
  for (const [content, qs] of Object.entries(contentMap)) {
    if (qs.length > 1) {
      dupContentCount++;
      warnings.push({ issue: 'DUPLICATE_CONTENT', detail: `Nội dung trùng lặp (${qs.length} câu, lớp ${qs[0].grade}): "${content.slice(0, 80)}..."`, ids: qs.map(q => q.id) });
    }
  }

  // 3. In kết quả
  console.log('\n\n========================================');
  console.log('  KẾT QUẢ RÀ SOÁT');
  console.log('========================================');
  console.log(`\n✅ Đã kiểm tra: ${checked} câu hỏi`);
  console.log(`❌ LỖI NGHIÊM TRỌNG: ${errors.length}`);
  console.log(`⚠️  CẢNH BÁO: ${warnings.length}`);
  console.log(`🔄 Nội dung trùng lặp: ${dupContentCount} nhóm`);

  // In chi tiết lỗi
  if (errors.length > 0) {
    console.log('\n\n❌ ======= CHI TIẾT LỖI NGHIÊM TRỌNG =======');
    const errorsByType = {};
    for (const e of errors) {
      if (!errorsByType[e.issue]) errorsByType[e.issue] = [];
      errorsByType[e.issue].push(e);
    }
    for (const [type, errs] of Object.entries(errorsByType)) {
      console.log(`\n--- ${type} (${errs.length} lỗi) ---`);
      for (const e of errs.slice(0, 20)) {
        console.log(`   ${e.detail}`);
      }
      if (errs.length > 20) console.log(`   ... và ${errs.length - 20} lỗi khác`);
    }
  }

  if (warnings.length > 0) {
    console.log('\n\n⚠️ ======= CẢNH BÁO =======');
    const warnByType = {};
    for (const w of warnings) {
      if (!warnByType[w.issue]) warnByType[w.issue] = [];
      warnByType[w.issue].push(w);
    }
    for (const [type, warns] of Object.entries(warnByType)) {
      console.log(`\n--- ${type} (${warns.length} cảnh báo) ---`);
      for (const w of warns.slice(0, 15)) {
        console.log(`   ${w.detail}`);
      }
      if (warns.length > 15) console.log(`   ... và ${warns.length - 15} cảnh báo khác`);
    }
  }

  // 4. Thống kê lỗi theo lớp
  console.log('\n\n📊 ======= THỐNG KÊ LỖI THEO LỚP =======');
  for (const grade of Object.keys(gradeStats).sort()) {
    const gradeErrors = errors.filter(e => e.grade == grade);
    const gradeWarnings = warnings.filter(w => w.grade == grade);
    const total = gradeStats[grade];
    const pct = ((total - gradeErrors.length) / total * 100).toFixed(1);
    console.log(`   Lớp ${grade}: ${total} câu | ❌ ${gradeErrors.length} lỗi | ⚠️ ${gradeWarnings.length} cảnh báo | Chính xác: ${pct}%`);
  }

  console.log('\n========================================');
  console.log('  HOÀN THÀNH RÀ SOÁT');
  console.log('========================================\n');
}

// ============ HELPER FUNCTIONS ============

function checkLatex(text) {
  if (!text) return [];
  const issues = [];
  
  // Check unbalanced $ signs
  const dollarCount = (text.match(/(?<!\\)\$/g) || []).length;
  if (dollarCount % 2 !== 0) {
    issues.push('Số dấu $ lẻ (LaTeX không đóng mở đúng)');
  }

  // Check common LaTeX errors
  if (text.includes('\\frac{}') || text.includes('\\frac{}{')) {
    issues.push('\\frac có tham số trống');
  }
  
  if (text.includes('\\\\\\\\') && !text.includes('\\\\,') && !text.includes('\\\\text')) {
    // Too many backslashes might indicate escaping issues
  }

  // Check for broken LaTeX commands
  const brokenCmds = text.match(/\\[a-zA-Z]+(?![a-zA-Z{])/g);
  // Not always an error - many commands don't need braces

  return issues;
}

function checkMathLogic(q) {
  const errors = [];
  const content = q.content || '';
  const answer = q.answer || '';
  const solution = q.solution || '';

  // For MCQ: check if answer matches correct_answer
  if (q.question_type === 'trac_nghiem' && q.options && q.correct_answer) {
    if (q.answer && q.answer.trim().length === 1 && q.correct_answer) {
      if (q.answer.trim().toUpperCase() !== q.correct_answer.trim().toUpperCase()) {
        errors.push(`answer="${q.answer}" không khớp correct_answer="${q.correct_answer}"`);
      }
    }
  }

  // Skip "bấm nút máy tính" questions - they ask about button sequences, not computation
  if (content.includes('máy tính') || content.includes('bấm')) return errors;

  // Helper: extract number from LaTeX answer, handling \, separators and negative signs
  function extractNumber(text) {
    if (!text) return null;
    // Match $-8$ or $8\,568$ or just $123$
    const m = text.match(/\$?\s*(-?\d[\d,.\s\\]*)\s*\$?/);
    if (!m) return null;
    // Remove LaTeX formatting: \, \; \! spaces commas dots
    const clean = m[1].replace(/\\[,;!]/g, '').replace(/\s/g, '').replace(/,/g, '');
    return parseInt(clean) || null;
  }

  // Check for basic arithmetic in simple cases
  // Pattern: "Tính: $a + b$" with answer "$c$"
  const simpleAddMatch = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\+\s*(\d+)\s*\$/);
  if (simpleAddMatch) {
    const expected = parseInt(simpleAddMatch[1]) + parseInt(simpleAddMatch[2]);
    const ansVal = extractNumber(answer);
    if (ansVal !== null && ansVal !== expected) {
      errors.push(`Phép cộng: ${simpleAddMatch[1]}+${simpleAddMatch[2]}=${expected} nhưng đáp án=${ansVal}`);
    }
  }

  // Pattern: "Tính: $a - b$" — result can be negative
  const simpleSubMatch = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*-\s*(\d+)\s*\$/);
  if (simpleSubMatch) {
    const expected = parseInt(simpleSubMatch[1]) - parseInt(simpleSubMatch[2]);
    const ansVal = extractNumber(answer);
    if (ansVal !== null && ansVal !== expected) {
      errors.push(`Phép trừ: ${simpleSubMatch[1]}-${simpleSubMatch[2]}=${expected} nhưng đáp án=${ansVal}`);
    }
  }

  // Pattern: "Tính: $a × b$" (with \times)
  const simpleMulMatch = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\\times\s*(\d+)\s*\$/);
  if (simpleMulMatch) {
    const expected = parseInt(simpleMulMatch[1]) * parseInt(simpleMulMatch[2]);
    const ansVal = extractNumber(answer);
    if (ansVal !== null && ansVal !== expected) {
      errors.push(`Phép nhân: ${simpleMulMatch[1]}×${simpleMulMatch[2]}=${expected} nhưng đáp án=${ansVal}`);
    }
  }

  return errors;
}

main().catch(err => {
  console.error('FATAL ERROR:', err);
  process.exit(1);
});
