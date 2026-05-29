const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const issues = JSON.parse(fs.readFileSync('tailieu/latex_errors.json', 'utf-8'));
  let fixedCount = 0;
  
  for (const issue of issues) {
    const qData = await sql`SELECT id, content, answer, solution, options FROM public.questions WHERE id = ${issue.id}`;
    if (!qData || qData.length === 0) continue;
    const q = qData[0];
    
    const applyFixes = (text) => {
      if (!text) return text;
      let t = text;
      
      // Fix missing closing $ after Rightarrow
      t = t.replace(/\$\\Rightarrow\s*([^$\n]+)(?=\n|$)/g, '\\Rightarrow$ $1');
      t = t.replace(/\$\\Rightarrow\s*([^$\n]+)\./g, '\\Rightarrow$ $1.');
      t = t.replace(/\$\\Rightarrow/g, '\\Rightarrow$');
      
      // Clean up weird $1$1\$2 artifacts
      t = t.replace(/\\\$2/g, '');
      t = t.replace(/\$1\$1/g, '1');
      
      // Auto-balance if there's an exact missing $ at the end of text
      const dollarCount = (t.match(/\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        if (!t.endsWith('$')) {
           // If the string ends with a number or period, it might just need a $ at the very end
           t = t + '$';
        }
      }
      
      // Second pass balancing (in case we added $ to the end but it still didn't fix it)
      const newDollarCount = (t.match(/\$/g) || []).length;
      if (newDollarCount % 2 !== 0) {
        // Find $ followed by a space, which is often a typo for just $ or means we should remove it
        t = t.replace(/\$ /g, ' ');
      }
      
      return t;
    };
    
    let newContent = applyFixes(q.content);
    let newAnswer = applyFixes(q.answer);
    let newSolution = applyFixes(q.solution);
    
    // Fix options if needed
    let newOptions = q.options;
    if (newOptions && Array.isArray(newOptions)) {
       newOptions = newOptions.map(opt => {
          if (typeof opt === 'string') return applyFixes(opt);
          if (typeof opt === 'object' && opt !== null) {
             return { ...opt, value: applyFixes(opt.value) };
          }
          return opt;
       });
    }
    
    // Double check
    const isDifferent = newContent !== q.content || newAnswer !== q.answer || newSolution !== q.solution || JSON.stringify(newOptions) !== JSON.stringify(q.options);
    
    if (isDifferent) {
      await sql`
        UPDATE public.questions
        SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution}, options = ${newOptions ? JSON.stringify(newOptions) : null}
        WHERE id = ${q.id}
      `;
      fixedCount++;
    }
  }
  
  console.log(`Đã sửa thủ công bằng AI: ${fixedCount}/${issues.length} câu hỏi.`);
})();
