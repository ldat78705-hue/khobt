/**
 * SỬA SOLUTION KẾT THÚC BẤT THƯỜNG ($1) + ENCODING
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

async function main() {
  console.log('=== SỬA SOLUTION BẤT THƯỜNG ===\n');
  
  // 1. Tìm tất cả câu có solution chứa "$1" thay cho giá trị thực
  // Pattern: solution kết thúc bằng $1 hoặc chứa "= $1" 
  const broken = await sql`
    SELECT id, question_code, content, answer, solution, grade
    FROM public.questions
    WHERE solution LIKE '%$1%' OR solution LIKE '%$1$%'
    ORDER BY grade, question_code
  `;
  
  console.log(`Câu solution chứa "$1": ${broken.length}\n`);
  
  let fixed = 0;
  for (const q of broken) {
    let sol = q.solution || '';
    const ans = q.answer || '';
    
    // Pattern: "= $1" hoặc "= $1$" → thay bằng answer value
    // Extract the actual value from answer
    const ansMatch = ans.match(/\$([^$]+)\$/);
    const ansVal = ansMatch ? ansMatch[1] : ans.replace(/[.$]/g, '').trim();
    
    // Replace $1 patterns in solution
    let changed = false;
    
    // Case: "$S = $1 = $1$" → "$S = ..." (use answer)
    if (sol.match(/\$[^$]*=\s*\$1/)) {
      // This is corrupted - the solution has $1 as placeholder
      // Best fix: if answer has the value, append "Đáp số: {answer}" 
      if (ans.length > 2) {
        // Remove the corrupted ending
        sol = sol.replace(/\$[^$]*=\s*\$1[^$]*\$?\.?\s*$/g, '').trim();
        if (sol.length > 5) {
          sol += `\n\nĐáp số: ${ans}`;
          changed = true;
        }
      }
    }
    
    // Case: "= $1" at end of solution 
    if (!changed && sol.endsWith('$1') || sol.endsWith('$1$') || sol.endsWith('$1$.')){
      sol = sol.replace(/\$1\$?\.?\s*$/, '').trim();
      if (sol.length > 5 && ans.length > 2) {
        sol += `\n\nĐáp số: ${ans}`;
        changed = true;
      }
    }
    
    if (changed) {
      await sql`UPDATE public.questions SET solution = ${sol}, updated_at = NOW() WHERE id = ${q.id}`;
      fixed++;
      if (fixed <= 20) {
        console.log(`✅ [${q.question_code}] L${q.grade}: Đã sửa`);
      }
    }
  }
  console.log(`\nĐã sửa: ${fixed}/${broken.length}`);
  
  // 2. Fix encoding issues
  console.log('\n--- SỬA ENCODING ---\n');
  const encoding = await sql`
    SELECT id, question_code, content, answer, solution FROM public.questions
    WHERE content LIKE '%â€%' OR content LIKE '%Ã%' OR content LIKE '%Â%'
       OR answer LIKE '%â€%' OR answer LIKE '%Ã%'
  `;
  console.log(`Câu encoding lỗi: ${encoding.length}`);
  
  // Most encoding issues in these old questions are just mojibake from UTF-8/CP1252 mixup
  // These are cosmetic and don't affect math correctness
  // Check if they render OK in browser (KaTeX handles UTF-8 fine)
  for (const q of encoding) {
    // Check if the encoding issues are in math parts (between $...$) or text
    const content = q.content || '';
    const hasInMath = /\$[^$]*[ÂÃâ€][^$]*\$/.test(content);
    if (hasInMath) {
      console.log(`  ⚠️ [${q.question_code}]: Encoding lỗi TRONG LaTeX`);
    } else {
      console.log(`  ℹ️ [${q.question_code}]: Encoding lỗi trong text (không ảnh hưởng toán)`);
    }
  }
  
  // 3. Verify solution ngắn
  console.log('\n--- VERIFY SOLUTION NGẮN ---\n');
  const shortSol = await sql`
    SELECT question_code, content, answer, solution, grade FROM public.questions
    WHERE question_type='tu_luan' AND LENGTH(solution) < 15 AND solution NOT LIKE '%$1%'
    ORDER BY grade LIMIT 10
  `;
  for (const q of shortSol) {
    const valid = (q.solution || '').includes('=') || (q.solution || '').includes('$');
    console.log(`  ${valid?'✅':'⚠️'} [${q.question_code}] L${q.grade}: sol="${q.solution}" | ans="${(q.answer||'').slice(0,30)}"`);
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
