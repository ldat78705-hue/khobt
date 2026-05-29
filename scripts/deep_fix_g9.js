const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const issues = JSON.parse(fs.readFileSync('tailieu/grade9_deep_audit.json', 'utf-8'));
  let fixedCount = 0;
  
  for (const issue of issues) {
    const qData = await sql`SELECT id, content, answer, solution FROM public.questions WHERE id = ${issue.id}`;
    if (!qData || qData.length === 0) continue;
    const q = qData[0];
    
    let content = q.content || '';
    let answer = q.answer || '';
    let solution = q.solution || '';
    
    const applyFixes = (text) => {
      if (!text) return text;
      let t = text;
      // 1. Dfrac instead of frac
      t = t.replace(/\\frac{/g, '\\dfrac{');
      // 2. Remove space before punctuation
      t = t.replace(/\s+\./g, '.');
      t = t.replace(/\s+,/g, ',');
      t = t.replace(/\.\./g, '.'); // Xóa hai dấu chấm liên tiếp nếu không phải elipsis
      
      return t;
    };
    
    let newContent = applyFixes(content);
    let newAnswer = applyFixes(answer);
    let newSolution = applyFixes(solution);
    
    // Capitalize first letter of content if lowercase
    if (newContent.length > 0 && /^[a-z]/.test(newContent.charAt(0))) {
      newContent = newContent.charAt(0).toUpperCase() + newContent.slice(1);
    }
    
    if (newContent !== q.content || newAnswer !== q.answer || newSolution !== q.solution) {
      await sql`
        UPDATE public.questions
        SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution}
        WHERE id = ${issue.id}
      `;
      fixedCount++;
    }
  }
  
  console.log(`Hoàn tất sửa lỗi sâu! Đã tự động tối ưu hóa ${fixedCount}/${issues.length} câu hỏi.`);
})();
