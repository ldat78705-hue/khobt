const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const issues = JSON.parse(fs.readFileSync('tailieu/missing_dollars_issues.json', 'utf8'));
  const sample = issues.slice(0, 5);
  
  for (const code of sample) {
    const q = await sql`SELECT question_code, answer, solution FROM questions WHERE question_code = ${code}`;
    console.log("CODE:", code);
    console.log("ANSWER:", q[0].answer);
    console.log("SOLUTION:", q[0].solution);
    console.log("-----------");
  }
})();
