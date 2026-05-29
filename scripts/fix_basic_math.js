const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const issues = require('fs').readFileSync('tailieu/missing_dollars_issues.json', 'utf8');
  const codes = JSON.parse(issues);
  
  let fixed = 0;
  for (const code of codes) {
    const qData = await sql`SELECT id, content, answer, solution FROM questions WHERE question_code = ${code}`;
    if (!qData || qData.length === 0) continue;
    const q = qData[0];
    
    const applyFixes = (text) => {
      if (!text) return text;
      let t = text;
      
      // Fix \Rightarrow$ issue
      t = t.replace(/\\Rightarrow\$/g, '$\\Rightarrow');
      
      // Fix .$1$. issue
      t = t.replace(/\.\$1\$\./g, '.');
      t = t.replace(/\.\$1\$/g, '.');
      
      // Fix \dfrac without $ if it follows a colon
      t = t.split('\n').map(line => {
         if (line.includes('$')) return line;
         // If line has no $ but has math
         if (line.includes('\\dfrac') || line.includes('\\frac') || line.includes('\\times') || line.includes('\\approx')) {
            // Check if it's in the format "Text: Math"
            const parts = line.split(':');
            if (parts.length === 2 && !/[áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/i.test(parts[1])) {
               return parts[0] + ': $' + parts[1].trim() + '$';
            }
         }
         return line;
      }).join('\n');
      
      return t;
    };
    
    let newContent = applyFixes(q.content);
    let newAnswer = applyFixes(q.answer);
    let newSolution = applyFixes(q.solution);
    
    if (newContent !== q.content || newAnswer !== q.answer || newSolution !== q.solution) {
      await sql`UPDATE questions SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution} WHERE id = ${q.id}`;
      fixed++;
    }
  }
  
  console.log(`Fixed ${fixed} questions with basic regex.`);
})();
