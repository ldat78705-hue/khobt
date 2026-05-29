const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const questions = await sql`SELECT id, question_code, content, answer, solution FROM questions`;
  
  const issues = [];
  
  const hasMissingMathTags = (text) => {
    if (!text) return false;
    // Remove all properly wrapped math to see what's left
    const withoutMath = text.replace(/\$[^$]+\$/g, '');
    
    // Check if what's left contains math keywords
    const mathKeywords = ['\\Rightarrow', '\\approx', '\\pi', '\\cdot', '\\dfrac', '\\frac', 'V_{', 'S_{', '\\sqrt'];
    for (const kw of mathKeywords) {
      if (withoutMath.includes(kw)) {
        return true;
      }
    }
    return false;
  };

  for (const q of questions) {
    if (hasMissingMathTags(q.content) || hasMissingMathTags(q.answer) || hasMissingMathTags(q.solution)) {
      issues.push(q.question_code);
    }
  }
  
  console.log("Total issues:", issues.length);
  fs.writeFileSync('tailieu/missing_dollars_issues.json', JSON.stringify(issues, null, 2));
})();
