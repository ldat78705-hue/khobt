/**
 * KIỂM TRA LATEX RENDER CHẤT LƯỢNG
 * Tìm các lệnh LaTeX mà KaTeX có thể KHÔNG render:
 * - \overline, \underline (OK)
 * - \text, \textbf (OK) 
 * - \left, \right (OK)
 * - \begin{cases}, \begin{aligned} (OK)
 * - \mathbb, \mathcal (OK)
 * - Lệnh lạ: \vdots, \ddots, \cdots (OK)
 * - LỖI: \Rightarrow vs => (OK), \geq vs >= (OK)
 * - LỖI THỰC: \\text{} thiếu dấu {, \dfrac thiếu tham số
 */
const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_M5fiq0KWyCbD@ep-wandering-union-aomf3qsq.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

// Unsupported KaTeX commands (might cause render error)
const UNSUPPORTED = [
  '\\newcommand', '\\def', '\\DeclareMathOperator',
  '\\usepackage', '\\documentclass',
  '\\hfill', '\\vfill',
  '\\eqref', '\\label', '\\ref',
  '\\tag',
];

async function main() {
  console.log('=== KIỂM TRA KATEX RENDER ===\n');
  
  let issues = 0;
  
  for (const grade of [4,5,6,7,8,9]) {
    const qs = await sql`
      SELECT question_code, content, answer, solution, grade FROM public.questions
      WHERE grade = ${grade}
      ORDER BY question_code
    `;
    
    let gradeIssues = 0;
    
    for (const q of qs) {
      const fullText = (q.content || '') + ' ' + (q.answer || '') + ' ' + (q.solution || '');
      const qIssues = [];
      
      // Check unsupported commands
      for (const cmd of UNSUPPORTED) {
        if (fullText.includes(cmd)) {
          qIssues.push(`Lệnh KaTeX không hỗ trợ: ${cmd}`);
        }
      }
      
      // Check \frac without 2 args
      if (/\\frac\s*\{[^}]*\}\s*[^{]/.test(fullText) && !fullText.includes('\\frac{')) {
        qIssues.push('\\frac thiếu tham số thứ 2');
      }
      
      // Check \sqrt without arg
      if (/\\sqrt\s+[^{[\s]/.test(fullText)) {
        qIssues.push('\\sqrt thiếu {}');
      }
      
      // Check doubled $$ in inline context (usually error)
      if (/\$\$\s*\$\$/.test(fullText)) {
        qIssues.push('$$$$ liên tiếp');
      }
      
      // Check \text without braces
      if (/\\text\s+[^{]/.test(fullText)) {
        qIssues.push('\\text thiếu {}');
      }
      
      if (qIssues.length > 0) {
        gradeIssues++;
        issues++;
        if (issues <= 20) {
          console.log(`  ❌ [${q.question_code}] L${q.grade}: ${qIssues.join(' | ')}`);
        }
      }
    }
    
    console.log(`Lớp ${grade}: ${qs.length} câu → ${gradeIssues} KaTeX issues`);
  }
  
  console.log(`\nTổng KaTeX issues: ${issues}`);
  
  // Deep math check: verify fractions, equations
  console.log('\n--- KIỂM TRA TOÁN SÂU ---\n');
  
  // Check lãi suất kép lớp 9
  const interest = await sql`
    SELECT question_code, content, answer FROM public.questions
    WHERE content LIKE '%lãi suất%' AND grade = 9
    ORDER BY question_code
  `;
  console.log(`Bài lãi suất: ${interest.length}`);
  for (const q of interest) {
    // Extract: V = P × (1+r)^n
    const pMatch = q.content.match(/(\d+)\s*triệu/);
    const rMatch = q.content.match(/(\d+)\\?%/);
    const nMatch = q.content.match(/(\d+)\s*năm/);
    const ansMatch = (q.answer || '').match(/\$?([\d.,]+)/);
    
    if (pMatch && rMatch && nMatch && ansMatch) {
      const P = parseFloat(pMatch[1]);
      const r = parseFloat(rMatch[1]) / 100;
      const n = parseInt(nMatch[1]);
      const expected = P * Math.pow(1 + r, n);
      const actual = parseFloat(ansMatch[1].replace(',', '.'));
      
      if (Math.abs(expected - actual) > 0.1) {
        console.log(`  ❌ [${q.question_code}]: ${P}M × (1+${r})^${n} = ${expected.toFixed(2)}M, đáp án = ${actual}M`);
      } else {
        console.log(`  ✅ [${q.question_code}]: ${P}M × (1+${r})^${n} = ${expected.toFixed(2)}M ✓`);
      }
    }
  }
  
  // Check phương trình bậc 2 lớp 9
  console.log('\nBài phương trình bậc 2:');
  const quadratic = await sql`
    SELECT question_code, content, answer FROM public.questions
    WHERE content LIKE '%x^2%' AND content LIKE '%nghiệm%' AND grade = 9
    ORDER BY RANDOM() LIMIT 5
  `;
  for (const q of quadratic) {
    console.log(`  [${q.question_code}]: "${(q.content||'').slice(0,60)}" → "${(q.answer||'').slice(0,40)}"`);
  }
}

main().catch(console.error);
