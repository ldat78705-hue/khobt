const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  
  // Find all questions that contain \dfrac or \pi but have suspicious $ placement
  const questions = await sql`
    SELECT id, content, answer, solution 
    FROM questions 
    WHERE content LIKE '%\\Rightarrow$%' OR answer LIKE '%\\Rightarrow$%' OR solution LIKE '%\\Rightarrow$%'
       OR content LIKE '%\\dfrac%' OR answer LIKE '%\\dfrac%' OR solution LIKE '%\\dfrac%'
  `;
  
  let fixed = 0;
  
  const fixText = (text) => {
    if (!text) return text;
    let t = text;
    
    // The broken pattern we observed: \dfrac{2}{3}\pi \approx 0,667\pi < 0,7\pi$ \Rightarrow$ Không đủ.$
    // Let's just fix any line that contains \dfrac or \frac but doesn't start with $ by wrapping the math part.
    // Actually, simpler: replace `\Rightarrow$ Không đủ.$` with `\Rightarrow \text{Không đủ}.$`
    // Or just wrap the whole thing in one $ if it's currently broken.
    
    // Remove the bad $ that were added
    if (t.includes('\\dfrac{2}{3}\\pi \\approx 0,667\\pi < 0,7\\pi$ \\Rightarrow$ Không đủ.$')) {
       t = t.replace('\\dfrac{2}{3}\\pi \\approx 0,667\\pi < 0,7\\pi$ \\Rightarrow$ Không đủ.$', '$\\dfrac{2}{3}\\pi \\approx 0,667\\pi < 0,7\\pi \\Rightarrow$ Không đủ.');
    }
    
    // Fix similar issues where a line starts with \dfrac or \frac or V_{...} but doesn't have a starting $
    const lines = t.split('\n');
    const newLines = lines.map(line => {
       if ((line.trim().startsWith('\\dfrac') || line.trim().startsWith('V_{') || line.trim().startsWith('\\pi')) && !line.includes('$\\dfrac') && !line.includes('$V_{')) {
          // It starts with math but has no $. Let's see if there's a $ later in the line.
          const dollarCount = (line.match(/\$/g) || []).length;
          if (dollarCount === 1) {
              // Only 1 dollar? Maybe it was at the end. Wrap the whole line from the start.
              return '$' + line.replace(/\$$/, '') + '$';
          }
          if (dollarCount > 1) {
              // It has multiple dollars, let's just make sure the beginning is wrapped
              // Wait, if it has 2 dollars like \dfrac...$ \Rightarrow$ ...
              if (line.includes('$ \\Rightarrow$')) {
                  return '$' + line.replace(/\$ \\Rightarrow\$/g, '\\Rightarrow$');
              }
          }
          if (dollarCount === 0) {
             // No dollars at all, but it's clearly math
             // If it has \Rightarrow, wrap it around
             if (line.includes('\\Rightarrow')) {
                 const parts = line.split('\\Rightarrow');
                 return '$' + parts[0] + '\\Rightarrow$ ' + parts[1];
             }
          }
       }
       return line;
    });
    
    return newLines.join('\n');
  };
  
  for (const q of questions) {
    const newC = fixText(q.content);
    const newA = fixText(q.answer);
    const newS = fixText(q.solution);
    
    if (newC !== q.content || newA !== q.answer || newS !== q.solution) {
      await sql`UPDATE questions SET content = ${newC}, answer = ${newA}, solution = ${newS} WHERE id = ${q.id}`;
      fixed++;
    }
  }
  console.log(`Fixed ${fixed} questions with missing starting $.`);
})();
