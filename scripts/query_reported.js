const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

(async () => {
  const sql = neon(process.env.DATABASE_URL);
  const codes = ['V10-HKG-024', 'V10-HKG-023', 'V10-HKG-022'];
  for (const code of codes) {
    const q = await sql`SELECT question_code, answer, solution FROM questions WHERE question_code = ${code}`;
    console.log("CODE:", code);
    console.log("SOLUTION:", q[0].solution);
    console.log("-----------");
  }
})();
