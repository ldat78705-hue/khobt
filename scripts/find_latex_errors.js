const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const questions = await sql`SELECT id, question_code, content, answer, solution, options FROM public.questions`;
  const errors = [];
  
  for (const q of questions) {
    let issueFlags = [];
    
    // Hàm phân tích latex
    const checkLatex = (text) => {
      if (!text) return [];
      const flags = [];
      const dollarCount = (text.match(/\$/g) || []).length;
      if (dollarCount % 2 !== 0) {
        flags.push("Lẻ thẻ $ (Chắc chắn vỡ UI)");
      }
      if (text.includes('$\\Rightarrow') && !text.includes('\\Rightarrow$')) {
        flags.push("Thẻ $\\Rightarrow bị thiếu đóng");
      }
      return flags;
    };
    
    const contentFlags = checkLatex(q.content);
    const answerFlags = checkLatex(q.answer);
    const solutionFlags = checkLatex(q.solution);
    
    // Check options if it's an array of strings or objects
    const optionsFlags = [];
    if (q.options && Array.isArray(q.options)) {
       for (const opt of q.options) {
          if (typeof opt === 'string') {
             optionsFlags.push(...checkLatex(opt));
          } else if (typeof opt === 'object' && opt !== null && typeof opt.value === 'string') {
             optionsFlags.push(...checkLatex(opt.value));
          }
       }
    }
    
    const allFlags = [...new Set([...contentFlags, ...answerFlags, ...solutionFlags, ...optionsFlags])];
    
    if (allFlags.length > 0) {
       errors.push({
         id: q.id,
         code: q.question_code || `ID:${q.id}`,
         issues: allFlags,
         content: q.content,
         answer: q.answer,
         solution: q.solution,
         options: q.options
       });
    }
  }
  
  fs.writeFileSync('tailieu/latex_errors.json', JSON.stringify(errors, null, 2), 'utf-8');
  console.log(`Đã quét xong toàn bộ DB. Tìm thấy ${errors.length} bài tập có rủi ro vỡ LaTeX.`);
})();
