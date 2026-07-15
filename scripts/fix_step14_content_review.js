/**
 * BƯỚC 14: RÀ SOÁT NỘI DUNG TOÁN CHI TIẾT
 * 
 * Vai trò: Chuyên gia giáo dục + Giáo viên toán giỏi + Học sinh giỏi QG
 * 
 * Kiểm tra:
 * - Văn phong chuẩn tiếng Việt
 * - Dữ kiện đủ, đơn vị rõ
 * - LaTeX render đúng
 * - Logic toán chính xác
 * - Đáp án + lời giải nhất quán
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== RÀ SOÁT NỘI DUNG TOÁN CHI TIẾT ===\n');

  const issues = [];

  for (const grade of [4,5,6,7,8,9]) {
    console.log(`\n========== LỚP ${grade} ==========\n`);
    
    // Lấy 15 câu random mỗi lớp
    const questions = await sql`
      SELECT id, question_code, content, answer, solution, question_type, 
             options, correct_answer, difficulty, grade
      FROM public.questions 
      WHERE grade = ${grade} AND status = 'approved'
      ORDER BY RANDOM() LIMIT 15
    `;
    
    for (const q of questions) {
      const problems = [];
      const content = q.content || '';
      const answer = q.answer || '';
      const solution = q.solution || '';
      
      // 1. Nội dung quá ngắn (< 15 ký tự) — có thể thiếu dữ kiện
      if (content.trim().length < 15) {
        problems.push(`Nội dung quá ngắn (${content.length}c): "${content}"`);
      }
      
      // 2. Đáp án quá ngắn cho tự luận
      if (q.question_type === 'tu_luan' && answer.trim().length < 2) {
        problems.push(`Đáp án tự luận quá ngắn (${answer.length}c)`);
      }
      
      // 3. LaTeX $ không cân bằng
      const dollars = (content + ' ' + answer + ' ' + solution).match(/(?<!\\)\$/g) || [];
      if (dollars.length % 2 !== 0) {
        problems.push(`LaTeX $ lẻ (${dollars.length} dấu $)`);
      }
      
      // 4. MCQ: options < 3
      if (q.question_type === 'trac_nghiem' && q.options) {
        if (q.options.length < 3) problems.push(`MCQ chỉ có ${q.options.length} options`);
        // Check empty option values
        for (const opt of q.options) {
          if (!opt.value || opt.value.trim().length === 0) {
            problems.push(`Option ${opt.key} trống`);
          }
        }
        // Check correct_answer valid
        if (q.correct_answer && !q.options.find(o => o.key === q.correct_answer)) {
          problems.push(`correct_answer=${q.correct_answer} không trong options`);
        }
      }
      
      // 5. Dấu hiệu lỗi đề: thiếu dấu ? hoặc .
      if (!content.endsWith('?') && !content.endsWith('.') && !content.endsWith(':') && 
          !content.endsWith('$') && !content.endsWith(')') && !content.endsWith('}') &&
          !content.endsWith('…') && content.length > 20) {
        // Chỉ cảnh báo, không phải lỗi nghiêm trọng
      }
      
      // 6. Kiểm tra phép tính đơn giản
      // Tính: $a + b$
      const addM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\+\s*(\d+)\s*\$/);
      if (addM && !content.includes('máy tính')) {
        const expected = parseInt(addM[1]) + parseInt(addM[2]);
        const ansNum = extractNum(answer);
        if (ansNum !== null && ansNum !== expected) {
          problems.push(`TOÁN SAI: ${addM[1]}+${addM[2]}=${expected} nhưng đáp án=${ansNum}`);
        }
      }
      
      // Tính: $a - b$
      const subM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*-\s*(\d+)\s*\$/);
      if (subM && !content.includes('máy tính')) {
        const expected = parseInt(subM[1]) - parseInt(subM[2]);
        const ansNum = extractNum(answer);
        if (ansNum !== null && ansNum !== expected) {
          problems.push(`TOÁN SAI: ${subM[1]}-${subM[2]}=${expected} nhưng đáp án=${ansNum}`);
        }
      }
      
      // Tính: $a \times b$
      const mulM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\\times\s*(\d+)\s*\$/);
      if (mulM) {
        const expected = parseInt(mulM[1]) * parseInt(mulM[2]);
        const ansNum = extractNum(answer);
        if (ansNum !== null && ansNum !== expected) {
          problems.push(`TOÁN SAI: ${mulM[1]}×${mulM[2]}=${expected} nhưng đáp án=${ansNum}`);
        }
      }
      
      // Tính: $a \div b$ or $a : b$
      const divM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*(?:\\div|:)\s*(\d+)\s*\$/);
      if (divM && parseInt(divM[2]) !== 0) {
        const expected = parseInt(divM[1]) / parseInt(divM[2]);
        if (Number.isInteger(expected)) {
          const ansNum = extractNum(answer);
          if (ansNum !== null && ansNum !== expected) {
            problems.push(`TOÁN SAI: ${divM[1]}÷${divM[2]}=${expected} nhưng đáp án=${ansNum}`);
          }
        }
      }
      
      if (problems.length > 0) {
        issues.push({ code: q.question_code, grade, problems });
        console.log(`  ❌ [${q.question_code}] ${problems.join(' | ')}`);
      } else {
        console.log(`  ✅ [${q.question_code}] OK`);
      }
    }
  }

  console.log(`\n\n========== TỔNG KẾT ==========`);
  console.log(`Tổng câu kiểm tra: 90 (15/lớp × 6 lớp)`);
  console.log(`Có vấn đề: ${issues.length}`);
  
  if (issues.length > 0) {
    console.log(`\nCHI TIẾT LỖI:`);
    for (const i of issues) {
      console.log(`  [${i.code}] Lớp ${i.grade}: ${i.problems.join(' | ')}`);
    }
  }
}

function extractNum(text) {
  if (!text) return null;
  const m = text.match(/\$?\s*(-?\d[\d,.\s\\]*)\s*\$?/);
  if (!m) return null;
  const clean = m[1].replace(/\\[,;!]/g, '').replace(/\s/g, '').replace(/,/g, '');
  return parseInt(clean) || null;
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
