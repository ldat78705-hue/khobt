const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const id = '9630997b-e797-4029-b7a7-f9d2bd285c3d';
  
  // Replace missing closing $
  // Original text contains: $14130 > 13750$ $\Rightarrow Có đủ.
  // We'll replace it with: $14130 > 13750 \Rightarrow$ Có đủ.
  
  const res = await sql`SELECT answer, solution FROM questions WHERE id = ${id}`;
  if (res && res.length > 0) {
    const q = res[0];
    const fixLatex = (text) => {
      if (!text) return text;
      return text.replace(/\$\\Rightarrow Có đủ\./g, '\\Rightarrow$ Có đủ.');
    };
    
    const newAnswer = fixLatex(q.answer);
    const newSolution = fixLatex(q.solution);
    
    await sql`UPDATE questions SET answer = ${newAnswer}, solution = ${newSolution} WHERE id = ${id}`;
    console.log("Đã sửa lỗi LaTeX cho bài V10-HKG-021.");
  }
})();
