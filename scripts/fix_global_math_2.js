const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  const codes = ['V10-HKG-024', 'V10-HKG-023', 'V10-HKG-022'];
  
  // Actually let's just query all questions that have $$ at the beginning of a line and fix them
  // Because $$ at the beginning without a matching $$ at the end is a syntax error in inline math
  const allQs = await sql`SELECT id, content, answer, solution FROM questions`;
  let fixed = 0;
  
  const applyFixes = (text) => {
    if (!text) return text;
    let t = text;
    const lines = t.split('\n');
    const newLines = lines.map(line => {
       let l = line;
       // Replace starting $$ with $
       if (l.startsWith('$$') && !l.endsWith('$$')) {
           l = '$' + l.substring(2);
       }
       // If l starts with math but has NO $ at all
       if (!l.includes('$') && (l.startsWith('\\dfrac') || l.startsWith('V_{'))) {
           l = '$' + l + '$';
       }
       // Check for unbalanced $
       const dollarCount = (l.match(/\$/g) || []).length;
       if (dollarCount % 2 !== 0) {
           if (l.endsWith('$')) {
               l = '$' + l; // add to beginning
           } else {
               l = l + '$'; // add to end
           }
       }
       return l;
    });
    return newLines.join('\n');
  };
  
  for (const q of allQs) {
    let newContent = applyFixes(q.content);
    let newAnswer = applyFixes(q.answer);
    let newSolution = applyFixes(q.solution);
    if (newContent !== q.content || newAnswer !== q.answer || newSolution !== q.solution) {
       await sql`UPDATE questions SET content = ${newContent}, answer = ${newAnswer}, solution = ${newSolution} WHERE id = ${q.id}`;
       fixed++;
    }
  }
  
  console.log("Fixed globally:", fixed);
})();
