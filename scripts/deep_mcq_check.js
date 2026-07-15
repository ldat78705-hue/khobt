/**
 * RÀ SOÁT MCQ SÂU
 * 
 * Với mỗi câu MCQ dạng "Tính: $expr$", kiểm tra:
 * - Option đáp án đúng có chứa kết quả đúng không
 * - Các options có logic không (distractor hợp lý)
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function extractNum(text) {
  if (!text) return null;
  const m = text.match(/\$?\s*(-?\d[\d,.\s\\]*)\s*\$?/);
  if (!m) return null;
  const clean = m[1].replace(/\\[,;!]/g, '').replace(/\s/g, '').replace(/,/g, '');
  const n = parseFloat(clean);
  return isNaN(n) ? null : n;
}

async function main() {
  console.log('=== RÀ SOÁT MCQ CHI TIẾT ===\n');
  
  const issues = [];
  
  for (const grade of [4,5,6,7,8,9]) {
    const mcqs = await sql`
      SELECT question_code, content, answer, correct_answer, options, grade
      FROM public.questions 
      WHERE grade = ${grade} AND question_type = 'trac_nghiem' AND options IS NOT NULL
      ORDER BY question_code
    `;
    
    let total = 0, problems = 0;
    
    for (const q of mcqs) {
      total++;
      const opts = q.options;
      if (!Array.isArray(opts) || opts.length < 2) continue;
      
      const qIssues = [];
      
      // 1. Options trùng nhau (giá trị giống nhau)
      const vals = opts.map(o => (o.value || '').trim());
      const uniqueVals = new Set(vals.map(v => v.toLowerCase()));
      if (uniqueVals.size < vals.length) {
        qIssues.push('Options có giá trị trùng');
      }
      
      // 2. Options quá ngắn hoặc trống
      for (const opt of opts) {
        if (!opt.value || opt.value.trim().length === 0) {
          qIssues.push(`Option ${opt.key} trống`);
        }
      }
      
      // 3. Correct answer option tồn tại
      if (q.correct_answer) {
        const correctOpt = opts.find(o => o.key === q.correct_answer);
        if (!correctOpt) {
          qIssues.push(`correct_answer=${q.correct_answer} không tồn tại`);
        } else if (!correctOpt.value || correctOpt.value.trim().length === 0) {
          qIssues.push('Option đáp án đúng trống');
        }
      }
      
      // 4. Kiểm tra phép tính đơn giản trong MCQ
      const content = q.content || '';
      if (content.includes('máy tính') || content.includes('bấm')) continue;
      
      const addM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\+\s*(\d+)\s*\$/);
      if (addM) {
        const expected = parseInt(addM[1]) + parseInt(addM[2]);
        const correctOpt = opts.find(o => o.key === q.correct_answer);
        if (correctOpt) {
          const optVal = extractNum(correctOpt.value);
          if (optVal !== null && optVal !== expected) {
            qIssues.push(`${addM[1]}+${addM[2]}=${expected} nhưng đáp án đúng=${optVal}`);
          }
        }
      }
      
      const subM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*-\s*(\d+)\s*\$/);
      if (subM) {
        const expected = parseInt(subM[1]) - parseInt(subM[2]);
        const correctOpt = opts.find(o => o.key === q.correct_answer);
        if (correctOpt) {
          const optVal = extractNum(correctOpt.value);
          if (optVal !== null && optVal !== expected) {
            qIssues.push(`${subM[1]}-${subM[2]}=${expected} nhưng đáp án đúng=${optVal}`);
          }
        }
      }
      
      const mulM = content.match(/[Tt]ính[:\s]*\$\s*(\d+)\s*\\times\s*(\d+)\s*\$/);
      if (mulM) {
        const expected = parseInt(mulM[1]) * parseInt(mulM[2]);
        const correctOpt = opts.find(o => o.key === q.correct_answer);
        if (correctOpt) {
          const optVal = extractNum(correctOpt.value);
          if (optVal !== null && optVal !== expected) {
            qIssues.push(`${mulM[1]}×${mulM[2]}=${expected} nhưng đáp án đúng=${optVal}`);
          }
        }
      }
      
      if (qIssues.length > 0) {
        problems++;
        issues.push({ code: q.question_code, grade: q.grade, issues: qIssues });
        console.log(`  ❌ [${q.question_code}] L${q.grade}: ${qIssues.join(' | ')}`);
      }
    }
    
    console.log(`Lớp ${grade}: ${total} MCQ → ${problems} có vấn đề`);
  }
  
  console.log(`\n📊 TỔNG: ${issues.length} MCQ có vấn đề`);
}

main().catch(console.error);
