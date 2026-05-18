require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  
  const questions = await sql`
    SELECT q.content
    FROM questions q
    JOIN exam_questions eq ON q.id = eq.question_id
    WHERE eq.exam_id = '50055d2e-3366-4e6b-a2f5-e64c2b717bd1'
  `;
  
  console.log(JSON.stringify(questions, null, 2));
}

main().catch(console.error);
