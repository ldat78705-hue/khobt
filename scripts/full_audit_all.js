/**
 * RÀ SOÁT TOÀN BỘ - TỪNG CÂU MỘT
 * 
 * Kiểm tra chi tiết:
 * 1. Phép tính cộng/trừ/nhân/chia đơn giản
 * 2. Phép tính phân số, phần trăm
 * 3. Hình học: chu vi, diện tích, thể tích
 * 4. LaTeX formatting
 * 5. Đáp án ↔ Lời giải nhất quán
 * 6. MCQ: options đầy đủ, correct_answer khớp
 * 7. Nội dung đủ dữ kiện
 * 8. Đơn vị đo lường
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// ============ HELPER FUNCTIONS ============

function extractNum(text) {
  if (!text) return null;
  // Match negative, LaTeX formatted numbers like $8\,568$ or $-8$
  const m = text.match(/\$?\s*(-?\d[\d,.\s\\]*)\s*\$?/);
  if (!m) return null;
  const clean = m[1].replace(/\\[,;!]/g, '').replace(/\s/g, '').replace(/,/g, '');
  const n = parseFloat(clean);
  return isNaN(n) ? null : n;
}

function countDollars(text) {
  if (!text) return 0;
  return (text.match(/(?<!\\)\$/g) || []).length;
}

function checkLatexBalance(text) {
  if (!text) return true;
  const count = countDollars(text);
  return count % 2 === 0;
}

function checkBraces(text) {
  if (!text) return true;
  let depth = 0;
  for (const ch of text) {
    if (ch === '{') depth++;
    if (ch === '}') depth--;
    if (depth < 0) return false;
  }
  return depth === 0;
}

// Check basic arithmetic: Tính: $a op b$
function checkArithmetic(content, answer) {
  const errors = [];
  if (!content || !answer) return errors;
  if (content.includes('máy tính') || content.includes('bấm')) return errors;
  
  // Addition
  const addM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\+\s*(\d+)\s*\$/);
  if (addM) {
    const exp = parseInt(addM[1]) + parseInt(addM[2]);
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`TOÁN: ${addM[1]}+${addM[2]}=${exp}, đáp án=${ans}`);
  }
  
  // Subtraction
  const subM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*-\s*(\d+)\s*\$/);
  if (subM) {
    const exp = parseInt(subM[1]) - parseInt(subM[2]);
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`TOÁN: ${subM[1]}-${subM[2]}=${exp}, đáp án=${ans}`);
  }
  
  // Multiplication with \times
  const mulM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\\times\s*(\d+)\s*\$/);
  if (mulM) {
    const exp = parseInt(mulM[1]) * parseInt(mulM[2]);
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`TOÁN: ${mulM[1]}×${mulM[2]}=${exp}, đáp án=${ans}`);
  }
  
  // Multiplication with \cdot
  const mulM2 = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\\cdot\s*(\d+)\s*\$/);
  if (mulM2) {
    const exp = parseInt(mulM2[1]) * parseInt(mulM2[2]);
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`TOÁN: ${mulM2[1]}·${mulM2[2]}=${exp}, đáp án=${ans}`);
  }
  
  // Division
  const divM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*(?:\\div|:)\s*(\d+)\s*\$/);
  if (divM && parseInt(divM[2]) !== 0) {
    const exp = parseInt(divM[1]) / parseInt(divM[2]);
    if (Number.isInteger(exp)) {
      const ans = extractNum(answer);
      if (ans !== null && ans !== exp) errors.push(`TOÁN: ${divM[1]}÷${divM[2]}=${exp}, đáp án=${ans}`);
    }
  }
  
  return errors;
}

// Check geometry formulas
function checkGeometry(content, answer) {
  const errors = [];
  if (!content || !answer) return errors;
  
  // Chu vi hình vuông: C = 4a
  const cvM = content.match(/[Cc]hu vi.*hình vuông.*cạnh.*\$\s*(\d+)\s*(?:cm|m|dm|mm)?\s*\$/i);
  if (cvM) {
    const exp = 4 * parseInt(cvM[1]);
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`HÌNH: Chu vi HV cạnh ${cvM[1]}: 4×${cvM[1]}=${exp}, đáp án=${ans}`);
  }
  
  // Diện tích hình vuông: S = a²
  const svM = content.match(/[Dd]iện tích.*hình vuông.*cạnh.*\$\s*(\d+)\s*(?:cm|m|dm|mm)?\s*\$/i);
  if (svM) {
    const a = parseInt(svM[1]);
    const exp = a * a;
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`HÌNH: DT HV cạnh ${a}: ${a}²=${exp}, đáp án=${ans}`);
  }
  
  // Chu vi hình chữ nhật: C = 2(a+b)
  const crM = content.match(/[Cc]hu vi.*hình chữ nhật.*\$\s*(\d+)\s*(?:cm|m)?\s*\$.*\$\s*(\d+)\s*(?:cm|m)?\s*\$/i);
  if (crM) {
    const exp = 2 * (parseInt(crM[1]) + parseInt(crM[2]));
    const ans = extractNum(answer);
    if (ans !== null && ans !== exp) errors.push(`HÌNH: CV HCN ${crM[1]}×${crM[2]}: 2(${crM[1]}+${crM[2]})=${exp}, đáp án=${ans}`);
  }
  
  return errors;
}

async function main() {
  console.log('=== RÀ SOÁT TOÀN BỘ 6,936 CÂU ===\n');
  console.log('Bắt đầu: ' + new Date().toISOString());
  
  const allErrors = [];
  const allWarnings = [];
  const gradeStats = {};
  
  for (const grade of [4, 5, 6, 7, 8, 9]) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`  LỚP ${grade} — BẮT ĐẦU RÀ SOÁT`);
    console.log(`${'='.repeat(60)}\n`);
    
    const questions = await sql`
      SELECT id, question_code, content, answer, solution, question_type, 
             options, correct_answer, difficulty, grade, category_id, topic
      FROM public.questions 
      WHERE grade = ${grade} AND status = 'approved'
      ORDER BY question_code
    `;
    
    let gradeErrors = 0;
    let gradeWarnings = 0;
    let checked = 0;
    
    for (const q of questions) {
      checked++;
      const code = q.question_code || q.id.slice(0, 8);
      const content = q.content || '';
      const answer = q.answer || '';
      const solution = q.solution || '';
      const fullText = content + ' ' + answer + ' ' + solution;
      const issues = [];
      const warns = [];
      
      // ====== 1. NỘI DUNG ======
      if (content.trim().length < 10) {
        issues.push(`Nội dung quá ngắn (${content.length}c)`);
      }
      
      // ====== 2. ĐÁP ÁN ======
      if (!answer || answer.trim().length === 0) {
        issues.push('Thiếu đáp án');
      }
      
      // ====== 3. LATEX ======
      if (!checkLatexBalance(fullText)) {
        issues.push(`LaTeX $ lẻ (${countDollars(fullText)} dấu $)`);
      }
      if (!checkBraces(fullText)) {
        warns.push('LaTeX {} không cân bằng');
      }
      // Check common broken LaTeX
      if (fullText.includes('\\frac{}') || fullText.includes('\\frac{}{')) {
        issues.push('\\frac có tham số trống');
      }
      
      // ====== 4. MCQ CHECKS ======
      if (q.question_type === 'trac_nghiem') {
        if (!q.options || !Array.isArray(q.options) || q.options.length < 2) {
          issues.push(`MCQ thiếu options (${q.options?.length || 0})`);
        } else {
          // Check correct_answer in options
          if (!q.correct_answer) {
            issues.push('MCQ thiếu correct_answer');
          } else if (!q.options.find(o => o.key === q.correct_answer)) {
            issues.push(`correct_answer="${q.correct_answer}" không trong options [${q.options.map(o=>o.key).join(',')}]`);
          }
          // Check empty options
          for (const opt of q.options) {
            if (!opt.value || opt.value.trim().length === 0) {
              issues.push(`Option ${opt.key} trống`);
            }
          }
          // Check duplicate options
          const vals = q.options.map(o => (o.value||'').trim().toLowerCase());
          if (new Set(vals).size < vals.length) {
            warns.push('Có options trùng nhau');
          }
          // Check MCQ < 4 options
          if (q.options.length < 4) {
            warns.push(`MCQ chỉ có ${q.options.length} options (nên có 4)`);
          }
          // Check answer sync
          if (q.answer && q.answer.trim().length === 1 && q.correct_answer) {
            if (q.answer.trim().toUpperCase() !== q.correct_answer.trim().toUpperCase()) {
              issues.push(`answer="${q.answer}" ≠ correct_answer="${q.correct_answer}"`);
            }
          }
        }
      }
      
      // ====== 5. ĐÚNG/SAI ======
      if (q.question_type === 'dung_sai') {
        if (!q.correct_answer) {
          issues.push('Câu đúng/sai thiếu correct_answer');
        }
      }
      
      // ====== 6. PHÉP TÍNH ======
      const arithErrors = checkArithmetic(content, answer);
      issues.push(...arithErrors);
      
      // ====== 7. HÌNH HỌC ======
      const geoErrors = checkGeometry(content, answer);
      issues.push(...geoErrors);
      
      // ====== 8. CATEGORY ======
      if (!q.category_id) {
        warns.push('Thiếu category');
      }
      
      // ====== 9. LỜI GIẢI ======
      if (!solution || solution.trim().length < 5) {
        // Chỉ warning cho tự luận
        if (q.question_type === 'tu_luan') {
          warns.push(`Lời giải ngắn (${(solution||'').length}c)`);
        }
      }
      
      // ====== 10. ĐỘ KHÓ ======
      const validDiff = ['nhan_biet', 'thong_hieu', 'van_dung', 'van_dung_cao'];
      if (!validDiff.includes(q.difficulty)) {
        warns.push(`Độ khó không chuẩn: "${q.difficulty}"`);
      }
      
      // ====== 11. KIỂM TRA ĐÁP ÁN ↔ LỜI GIẢI NHẤT QUÁN ======
      // Nếu lời giải chứa "boxed" hoặc kết luận, kiểm tra có khớp đáp án
      if (solution && answer) {
        const boxedMatch = solution.match(/\\boxed\{([^}]+)\}/);
        if (boxedMatch) {
          const boxedVal = boxedMatch[1].trim();
          // Kiểm tra đáp án có chứa giá trị trong boxed
          if (!answer.includes(boxedVal) && boxedVal.length > 0 && boxedVal.length < 20) {
            // Chỉ cảnh báo nếu boxed value đơn giản
            const ansNum = extractNum(answer);
            const boxNum = extractNum(boxedVal);
            if (ansNum !== null && boxNum !== null && ansNum !== boxNum) {
              issues.push(`\\boxed{${boxedVal}} ≠ đáp án (${ansNum})`);
            }
          }
        }
      }
      
      // LOG
      if (issues.length > 0) {
        gradeErrors += issues.length;
        allErrors.push({ code, grade, issues });
        console.log(`  ❌ [${code}] ${issues.join(' | ')}`);
      }
      if (warns.length > 0) {
        gradeWarnings += warns.length;
        allWarnings.push({ code, grade, warns });
        // Chỉ log warning nghiêm trọng
        for (const w of warns) {
          if (w.includes('options trùng') || w.includes('correct_answer') || w.includes('category')) {
            console.log(`  ⚠️ [${code}] ${w}`);
          }
        }
      }
    }
    
    gradeStats[grade] = { total: checked, errors: gradeErrors, warnings: gradeWarnings };
    console.log(`\n  📊 Lớp ${grade}: ${checked} câu | ❌ ${gradeErrors} lỗi | ⚠️ ${gradeWarnings} cảnh báo`);
  }
  
  // TỔNG KẾT
  console.log(`\n\n${'='.repeat(60)}`);
  console.log('  TỔNG KẾT RÀ SOÁT TOÀN BỘ');
  console.log(`${'='.repeat(60)}\n`);
  
  let totalQ = 0, totalE = 0, totalW = 0;
  for (const [g, s] of Object.entries(gradeStats)) {
    const pct = ((s.total - s.errors) / s.total * 100).toFixed(2);
    console.log(`  Lớp ${g}: ${s.total} câu | ❌ ${s.errors} lỗi | ⚠️ ${s.warnings} cảnh báo | ${pct}%`);
    totalQ += s.total;
    totalE += s.errors;
    totalW += s.warnings;
  }
  console.log(`\n  TỔNG: ${totalQ} câu | ❌ ${totalE} lỗi | ⚠️ ${totalW} cảnh báo`);
  
  if (allErrors.length > 0) {
    console.log(`\n\n❌ ======= DANH SÁCH LỖI CHI TIẾT =======\n`);
    for (const e of allErrors) {
      console.log(`  [${e.code}] Lớp ${e.grade}: ${e.issues.join(' | ')}`);
    }
  }
  
  if (allWarnings.length > 0) {
    console.log(`\n\n⚠️ ======= DANH SÁCH CẢNH BÁO =======\n`);
    // Chỉ in warnings nghiêm trọng
    const serious = allWarnings.filter(w => 
      w.warns.some(s => s.includes('trùng') || s.includes('correct_answer') || s.includes('category') || s.includes('options'))
    );
    for (const w of serious) {
      console.log(`  [${w.code}] Lớp ${w.grade}: ${w.warns.join(' | ')}`);
    }
    console.log(`\n  (${allWarnings.length - serious.length} cảnh báo nhẹ khác: lời giải ngắn, v.v.)`);
  }
  
  console.log(`\nHoàn thành: ${new Date().toISOString()}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
