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
      
      const lines = t.split('\n');
      const newLines = lines.map(line => {
         let l = line;
         // Case 1: $\Rightarrow Số thập phân hữu hạn.
         // Replace $\Rightarrow with $\Rightarrow$ 
         l = l.replace(/\$\\Rightarrow(?!\$)/g, '$\\Rightarrow$');
         
         // Case 2: dfrac without \ and ending in $$
         if (l.includes('dfrac') && !l.includes('\\dfrac') && l.endsWith('$$')) {
             l = l.replace(/dfrac/g, '\\dfrac').replace(/\$\$$/, '$');
             // ensure it starts with $
             const parts = l.split(':');
             if (parts.length === 2 && !parts[1].includes('$')) {
                 l = parts[0] + ': $' + parts[1].trim();
             } else if (parts.length === 2) {
                 l = parts[0] + ': $' + parts[1].replace(/^\s*/, '');
             }
         }
         
         // Fix cases where a line has odd number of $
         const dollarCount = (l.match(/\$/g) || []).length;
         if (dollarCount % 2 !== 0) {
             if (!l.endsWith('$')) {
                 l = l + '$';
             }
         }
         
         // Case 3: x < 11$$x < 5{,}5
         l = l.replace(/\$\$/g, '$');
         
         return l;
      });
      
      return newLines.join('\n');
    };
    
    let newContent = applyFixes(q.content);
    let newAnswer = applyFixes(q.answer);
    let newSolution = applyFixes(q.solution);
    
    if (newContent !== q.content || newAnswer !== q.answer || newSolution !== q.solution) {
      await sql`UPDATE questions SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution} WHERE id = ${q.id}`;
      fixed++;
    }
  }
  
  console.log(`Fixed ${fixed} questions with advanced regex.`);
})();
