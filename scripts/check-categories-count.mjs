import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

async function run() {
  const result = await sql`
    SELECT c.id, c.name, c.parent_id, COUNT(q.id) as question_count
    FROM categories c
    LEFT JOIN questions q ON c.id = q.category_id
    WHERE c.grade = 7
    GROUP BY c.id, c.name, c.parent_id
    ORDER BY c.name
  `;
  const withQuestions = result.filter(r => r.question_count > 0);
  console.log('Categories with questions:', withQuestions.length);
  if (withQuestions.length > 0) {
    console.log(withQuestions.slice(0, 5));
  }
}

run();
