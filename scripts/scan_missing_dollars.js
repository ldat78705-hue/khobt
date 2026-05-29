const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const questions = await sql`SELECT id, question_code, content, answer, solution FROM questions`;
  
  let issues = 0;
  for (const q of questions) {
    const checkText = (text) => {
      if (!text) return false;
      const lines = text.split('\n');
      for (const line of lines) {
         if ((line.trim().startsWith('\\dfrac') || line.trim().startsWith('\\frac') || line.trim().startsWith('V_{') || line.trim().startsWith('\\pi')) && !line.includes('$\\dfrac') && !line.includes('$\\frac') && !line.includes('$V_{') && !line.includes('$\\pi')) {
             return true;
         }
      }
      return false;
    };
    if (checkText(q.content) || checkText(q.answer) || checkText(q.solution)) {
       issues++;
       console.log("Issue in:", q.question_code);
    }
  }
  console.log("Total issues:", issues);
})();
