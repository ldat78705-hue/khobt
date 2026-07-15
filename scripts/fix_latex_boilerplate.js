/**
 * SỬA 18 CÂU LATEX HỎNG TRONG LỜI GIẢI + 13 CÂU BOILERPLATE ONLY
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

function fixBraces(text) {
  if (!text) return text;
  // Count { and }
  let opens = 0, closes = 0;
  for (const ch of text) {
    if (ch === '{') opens++;
    if (ch === '}') closes++;
  }
  // Add missing closing braces at the end
  if (opens > closes) {
    text += '}'.repeat(opens - closes);
  }
  return text;
}

function fixDollars(text) {
  if (!text) return text;
  const count = (text.match(/(?<!\\)\$/g) || []).length;
  if (count % 2 !== 0) {
    // Add closing $ at the end
    text += '$';
  }
  return text;
}

async function main() {
  console.log('=== SỬA LATEX HỎNG & BOILERPLATE ===\n');

  // 1. Fix 18 câu LaTeX hỏng trong solution
  console.log('--- 1. SỬA LATEX TRONG LỜI GIẢI ---\n');
  
  const latexBroken = await sql`
    SELECT id, question_code, solution, grade FROM public.questions
    WHERE question_code IN (
      '7-9-021', 'G9-AUTO-0015', 'G9-AUTO-0017', 'G9-AUTO-0021',
      'G9-AUTO-0031', 'G9-AUTO-0042', 'G9-AUTO-0044', 'G9-AUTO-0045',
      'G9-AUTO-0067', 'G9-AUTO-0110', 'G9-AUTO-0116', 'G9-AUTO-0119',
      'G9-AUTO-0130', 'G9-AUTO-0138', 'G9-AUTO-0157', 'G9-AUTO-0163',
      'G9-AUTO-0166', 'G9-AUTO-0175'
    )
  `;
  
  let fixed = 0;
  for (const q of latexBroken) {
    let sol = q.solution;
    const origSol = sol;
    
    // Fix braces
    sol = fixBraces(sol);
    // Fix dollars
    sol = fixDollars(sol);
    
    if (sol !== origSol) {
      await sql`UPDATE public.questions SET solution = ${sol}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed++;
      console.log(`  ✅ [${q.question_code}] L${q.grade}: LaTeX đã sửa`);
    } else {
      console.log(`  ℹ️ [${q.question_code}] L${q.grade}: Không cần sửa (false positive)`);
    }
  }
  console.log(`\n  Đã sửa: ${fixed}/${latexBroken.length}`);

  // 2. Fix 13 câu boilerplate-only
  console.log('\n--- 2. XÁC MINH CÂU BOILERPLATE ---\n');
  
  const boilerplateOnly = await sql`
    SELECT id, question_code, content, answer, solution, grade FROM public.questions
    WHERE question_code IN (
      'T4-AUTO-4950c969-1', 'T4-B17-004',
      'T5-B15-002', 'T5-B16-003', 'T5-B29-004', 'T5-B33-003',
      'T5-B41-007', 'T5-B43-009', 'T5-B46-009', 'T5-B50-009',
      'T5-B54-010', 'T5-B71-003', 'T5-B71-004'
    )
  `;
  
  let realProblems = 0;
  for (const q of boilerplateOnly) {
    const ans = q.answer || '';
    const sol = q.solution || '';
    
    // Check if solution has real content (even if answer is just boilerplate)
    const solHasContent = sol.length > 30 && !sol.includes('Bước giải toán trên được thực hiện');
    
    // Remove boilerplate from answer to see what's left
    const cleaned = ans
      .replace(/Thực hiện phép tính theo yêu cầu bài toán:\s*/g, '')
      .replace(/Như vậy, kết quả chính xác của phép tính là đáp án đã cho\.\s*/g, '')
      .replace(/Bước giải toán trên được thực hiện chi tiết từng bước.*$/s, '')
      .trim();
    
    if (cleaned.length < 3) {
      realProblems++;
      console.log(`  ⚠️ [${q.question_code}] L${q.grade}: Đáp án chỉ boilerplate`);
      console.log(`     Đề: "${(q.content||'').slice(0, 80)}"`);
      console.log(`     Sol: ${solHasContent ? '✅ Có lời giải' : '❌ Lời giải cũng boilerplate'}`);
      
      // If solution has the real answer, extract and set as answer
      if (solHasContent) {
        // Try extracting answer from solution
        const ansFromSol = sol.match(/(?:=\s*|Đáp\s*(?:số|án)[:\s]*)([\$\d][^.\n]*)/);
        if (ansFromSol) {
          console.log(`     → Trích đáp án từ lời giải: "${ansFromSol[1].trim().slice(0,50)}"`);
        }
      }
    } else {
      console.log(`  ✅ [${q.question_code}] L${q.grade}: Có đáp án thực: "${cleaned.slice(0,60)}"`);
    }
  }
  console.log(`\n  Câu thực sự thiếu đáp án: ${realProblems}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
